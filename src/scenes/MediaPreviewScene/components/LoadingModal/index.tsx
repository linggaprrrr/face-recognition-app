import Modal from "@components/Modal";
import Text from "@components/Text";
import React, { memo, useEffect, useRef } from "react";
import { ActivityIndicator, View } from "react-native";
import styles from "./styles";
import { ModalRef } from "@components/Modal/types";
import { Navigation } from "@navigations";
import { useLazyGetMeQuery } from "@redux/services/users";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { setUser } from "@redux/slice/user-slice";
import { setPhotoId } from "@redux/slice/home-slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_API } from "@constants/index";
import RNBlobUtil from "react-native-blob-util";

interface ILoadingModal {
  isLoading: boolean;
  mediaPaths?: string[];
}

const LoadingModalComponent = ({ isLoading, mediaPaths }: ILoadingModal) => {
  const modalRef = useRef<ModalRef>(null);
  const dispatch = useDispatch();
  const [trigger] = useLazyGetMeQuery();

  useEffect(() => {
    if (isLoading && mediaPaths?.length === 2) {
      modalRef.current?.openModal();
      uploadAllAndNavigate(mediaPaths);
    }
  }, [isLoading, mediaPaths]);

  async function uploadSingle(path: string, filename: string): Promise<Face.UploadResponse> {
    const token = await AsyncStorage.getItem('token');
    const baseUrl = BASE_API.replace(/\/$/, '');
    const url = `${baseUrl}/faces/register-reference?is_reference=true`;

    console.log('[Upload] BlobUtil POST', url);
    console.log('[Upload] path:', path);

    const res = await RNBlobUtil.fetch(
      'POST',
      url,
      {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'file',
          filename,
          type: 'image/jpeg',
          data: RNBlobUtil.wrap(path.replace('file://', '')),
        },
      ],
    );

    console.log('[Upload] status:', res.respInfo.status, res.data);
    const json: Face.UploadResponse = res.json();

    if (res.respInfo.status >= 200 && res.respInfo.status < 300) {
      return json;
    }
    throw new Error(json?.message ?? `HTTP ${res.respInfo.status}`);
  }

  async function uploadAllAndNavigate(paths: string[]) {
    try {
      const result = await uploadSingle(paths[0], `photo_${Date.now()}.jpg`);

      modalRef.current?.closeModal();
      dispatch(setPhotoId(result?.data?.id ?? ''));

      const authMe = await trigger();
      if (authMe.isSuccess) dispatch(setUser(authMe?.data));

      Navigation.finishScene();
    } catch (error: any) {
      console.error('[Upload] failed:', error?.message ?? error);
      Toast.show({
        type: 'error',
        text1: 'Gagal Mengunggah',
        text2: error?.message ?? 'Terjadi kesalahan. Silakan coba lagi.',
      });
      modalRef.current?.closeModal();
    }
  }

  return (
    <Modal ref={modalRef} contentStyle={styles.contentStyle}>
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.title}>Menyiapkan</Text>
        <Text style={styles.subtitle}>
          Mohon tunggu sebentar, dan jangan tutup halaman ini.
        </Text>
      </View>
    </Modal>
  );
};

const areEqual = (prevProps: ILoadingModal, nextProps: ILoadingModal) => {
  return (
    prevProps.isLoading === nextProps.isLoading &&
    JSON.stringify(prevProps.mediaPaths) ===
      JSON.stringify(nextProps.mediaPaths)
  );
};

const LoadingModal = memo(LoadingModalComponent, areEqual);
export default LoadingModal;
