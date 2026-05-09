import { useEffect, useMemo, useState } from "react";
import { Image } from "react-native";
import Toast from "react-native-toast-message";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@redux/store";
import { useChoosenPhotoMutation, useLazyFaceGetPurchacedQuery } from "@redux/services/face-recognition";
import { Navigation } from "@navigations";
import { addToCart, removeFromCart } from '@redux/slice/cart-slice';
import RNFS from 'react-native-fs';
import { PermissionsAndroid, Platform } from 'react-native';
import RNBlobUtil from 'react-native-blob-util';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'; // Import plugin isSameOrAfter

dayjs.extend(duration);
dayjs.extend(isSameOrAfter); // Extend dayjs dengan plugin isSameOrAfter

export const usePhotoDetailScene = (item: Face.FaceSearchResult) => {
    const user = useSelector((state: RootState) => state.user);
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const [isDownload, setIsDownload] = useState(false)
    const dispatch = useDispatch();

    const [originalSize, setOriginalSize] = useState({ width: 1, height: 1 });

    const [choosenPhoto, { isLoading: loadingChoosen }] = useChoosenPhotoMutation();

    const loading = loadingChoosen;

    useEffect(() => {
        Image.getSize(item.compressed_path, (width, height) => {
            setOriginalSize({ width, height });
        });
    }, [item.compressed_path]);


  

    const handlePhotoChoice = async (choice: boolean) => {
        try {
            await choosenPhoto({ photo_id: item.photo_id, choice }).unwrap();
            Toast.show({
                type: 'success',
                text1: choice ? 'Foto dikonfirmasi' : 'Foto ditolak',
            });
        } catch {
            Toast.show({
                type: "error",
                text1: "Tidak bisa memilih foto",
            });
        }
    };

    const handleAddToCart = () => {
        const exists = cartItems.some(ci => ci.photo_id === item.photo_id);

        if (exists) {
            dispatch(removeFromCart(item.photo_id));
            Toast.show({
                type: "success",
                text1: "Konten berhasil dihapus dari keranjang.",
            });
        } else {
            const cartItem = {
                photo_id: item.photo_id,
                compressed_path: item.compressed_path,
                photo_price: item.photo_price,
                original_filename: item.original_filename,
                unit_name: item.unit_name,
                original_path: item.original_path,
            };
            dispatch(addToCart(cartItem));
            Toast.show({
                type: "success",
                text1: "Konten berhasil ditambahkan kedalam keranjang.",
            });
        }
    };

    const isInCart = cartItems.some(ci => ci.photo_id === item.photo_id);


    const requestStoragePermission = async (): Promise<boolean> => {
        if (Platform.OS === 'android') {
            if (Platform.Version >= 33) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                    {
                        title: "Izin Akses Gambar",
                        message: "Aplikasi membutuhkan akses untuk membaca gambar.",
                        buttonNeutral: "Nanti",
                        buttonNegative: "Tolak",
                        buttonPositive: "Izinkan"
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } else {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: "Izin Akses Penyimpanan",
                        message: "Aplikasi membutuhkan akses untuk menyimpan foto.",
                        buttonNeutral: "Nanti",
                        buttonNegative: "Tolak",
                        buttonPositive: "Izinkan"
                    }
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            }
        }
        return true;
    };

    const handleDownload = async () => {
        const hasPermission = await requestStoragePermission();
        if (!hasPermission) {
            Toast.show({
                type: 'error',
                text1: 'Izin dibutuhkan untuk mengunduh foto',
            });
            return;
        }
        setIsDownload(true);
        const fileName = item.original_filename;
        const originalUrl = item.original_path;

        const downloadDest =
            Platform.OS === 'android'
                ? `${RNFS.DownloadDirectoryPath}/${fileName}`
                : `${RNFS.DocumentDirectoryPath}/${fileName}`;

        try {
            const res = await RNBlobUtil.config({
                fileCache: true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path: downloadDest,
                    description: 'Mengunduh foto...',
                    title: fileName,
                    mime: 'image/jpeg',
                    mediaScannable: true,
                }
            }).fetch('GET', originalUrl);

            Toast.show({
                type: 'success',
                text1: 'Foto berhasil diunduh!',
            });
            setIsDownload(false);
        } catch (error) {
            console.log('Gagal mengunduh:', error);
            Toast.show({
                type: 'error',
                text1: 'Gagal mengunduh foto',
            });
        }
    };
    

    const [getPurchasedTransaction, {
        data: purchasedDetail,
        error,
        isLoading,
        isFetching,
      }] = useLazyFaceGetPurchacedQuery();
      
      useEffect(() => {
        if (user.id && item.photo_id) {
          getPurchasedTransaction({
            user_id: user.id,
            photo_id: item.photo_id,
          });
        }
      }, [user.id, item.photo_id]);
      

    const expirationStatus = useMemo(() => {
        if (!item.uploaded_at || item.is_purchased) {
            return ""; // Tidak ada teks kedaluwarsa jika tidak ada tgl unggah atau sudah dibeli
        }

        const uploadedDate = dayjs(item.uploaded_at);
        const expirationDate = uploadedDate.add(14, 'day');
        const now = dayjs();

        if (now.isSameOrAfter(expirationDate)) {
            return "Expired";
        } else {
            const remainingDuration = dayjs.duration(expirationDate.diff(now));
            const remainingDays = Math.floor(remainingDuration.asDays());
            const remainingHours = remainingDuration.hours(); // Bagian jam (0-23)

            if (remainingDays > 0) {
                let status = `Masa aktif foto ${remainingDays} hari`;
                if (remainingHours > 0) {
                    status += ` ${remainingHours} jam`;
                }
                return status;
            } else if (remainingHours > 0) {
                return `Masa aktif foto ${remainingHours} jam`;
            } else if (remainingDuration.asMinutes() > 0) {
                return "Masa aktif foto kurang dari 1 jam";
            } else {
                return "Expired"; // Fallback jika durasi sangat kecil
            }
        }
    }, [item.uploaded_at, item.is_purchased]);


  


    return {
        state: {
            user,
            originalSize,
            loading: loading || loadingChoosen || isDownload,
            isInCart,
            expirationStatus,
            cartItems,
            purchasedDetail
        },
        methods: {
            handlePhotoChoice,
            handleAddToCart,
            handleDownload
        },
    };
};
