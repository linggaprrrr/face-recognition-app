import { useCallback, useState } from 'react';
import { Alert, PermissionsAndroid } from 'react-native';

import ImagePicker, { IImagePicker } from '@components/ImagePicker';
import { Navigation } from '@navigations';
import { isGrantedAndroidPermission } from '@utils/PermissionUtils';
import { Asset, ImageLibraryOptions } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { useUpdateUserMutation, useUploadPhotoUserMutation } from '@redux/services/users';
import { setUser } from '@redux/slice/user-slice';
import Toast from 'react-native-toast-message';
import { validateEmail, convertImageToBase64 } from '@utils/index';
import { isValidPhoneNumber } from 'libphonenumber-js';

const IMAGE_OPTIONS: ImageLibraryOptions = {
  quality: 0.6,
  mediaType: 'photo',
  selectionLimit: 1,
};

export function useEditProfileScene() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address || "");
  const [imageSource, setImageSource] = useState<Asset | undefined>(undefined);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [uploadPhotoUser, { isLoading: isUploadingPhoto }] = useUploadPhotoUserMutation();

  async function save() {
    if (!name.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Nama Diperlukan',
        text2: 'Mohon isi nama Anda.',
      });
      return;
    }

    if (!email.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Email Diperlukan',
        text2: 'Mohon isi alamat email Anda.',
      });
      return;
    }
    if (!validateEmail(email)) {
      Toast.show({
        type: 'error',
        text1: 'Format Email Tidak Valid',
        text2: 'Mohon masukkan alamat email yang valid.',
      });
      return;
    }


    if (phone === undefined || phone === null || !phone.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Nomor Telepon Diperlukan',
        text2: 'Mohon isi nomor telepon Anda.',
      });
      return;
    }

    if (!isValidPhoneNumber(phone, 'ID')) {
      Toast.show({
        type: 'error',
        text1: 'Format Nomor Telepon Tidak Valid',
        text2: 'contoh: 08123456789 atau +628123456789',
      });
      return;
    }

    if (!address.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Alamat Diperlukan',
        text2: 'Mohon isi alamat Anda.',
      });
      return;
    }

    const update = await updateUser({
      userId: user.id,
      data: {
        name,
        email,
        phone,
        address
      }
    })

    if ('data' in update && update.data) {
      dispatch(setUser(update?.data));
      Toast.show({
        type: 'success',
        text1: 'Profil Berhasil Diperbarui',
      });
      Navigation.pop();
    } else if ('error' in update) {

      // Tangani error dari API jika ada
      Toast.show({ type: 'error', text1: 'Update Gagal', text2: 'Terjadi kesalahan saat memperbarui profil.' });
    }
  }

  async function openGallery() {
    try {
      const isGranted = await isGrantedAndroidPermission(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      if (isGranted) {
        await ImagePicker.launchImageLibrary(IMAGE_OPTIONS, handlePickedImage);
      }
    } catch (error) {
      Alert.alert('Error', JSON.stringify(error));
    }
  }

  const handlePickedImage = useCallback(async (response: IImagePicker) => {
    if (response.didCancel) {
      return;
    }

    if (response.error) {
      return;
    }

    if (!response?.assets) {
      return;
    }

    console.log(response.assets);


    const pickedAsset = response.assets[0];
    if (pickedAsset.uri && pickedAsset.fileName) {
      setImageSource(pickedAsset); // Optimistically update UI
      try {
        const base64Image = await convertImageToBase64(pickedAsset.uri);
        if (!base64Image) {
          Toast.show({
            type: 'error',
            text1: 'Gagal Mengonversi Gambar',
            text2: 'Tidak dapat mengonversi gambar ke format yang dibutuhkan.',
          });
          setImageSource(undefined); // Revert optimistic update
          return;
        }

        const uploadResponse = await uploadPhotoUser({
          userId: user.id,
          base64: base64Image,
          filename: pickedAsset.fileName,
        }).unwrap();

        if (uploadResponse) {
          dispatch(setUser(uploadResponse)); // Update user state with new photo URL
          Toast.show({
            type: 'success',
            text1: 'Foto Profil Berhasil Diunggah',
          });
        }
      } catch (error) {
        setImageSource(undefined); // Revert optimistic update on error
        Toast.show({
          type: 'error',
          text1: 'Gagal Mengunggah Foto',
          text2: 'Terjadi kesalahan saat mengunggah foto profil.',
        });
      }
    }
  }, []);

  return {
    state: {
      user,
      name,
      email,
      phone,
      address,
      loadingUpdate: isLoading || isUploadingPhoto,
      selectedAvatar: imageSource?.uri,
    },
    method: {
      setName,
      setEmail,
      setPhone,
      save,
      openGallery,
      setAddress
    },
  };
}
