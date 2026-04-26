import { useCancelTransactionMutation, useGetTransactionDetailQuery } from '@redux/services/transaction';
import { useCallback, useState } from 'react';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import RNFS from 'react-native-fs';
import RNBlobUtil from 'react-native-blob-util';
import Toast from 'react-native-toast-message';

interface UseTransactionDetailProps {
    transaction_id?: string;
    onClose?: () => void;
}

export const useTransactionDetail = ({ transaction_id, onClose }: UseTransactionDetailProps) => {
    const {
        data: transactionDetail,
        error,
        isLoading,
        isFetching,
        refetch,
    } = useGetTransactionDetailQuery(
        { transaction_id: transaction_id || '' },
        {
            skip: !transaction_id,
            refetchOnMountOrArgChange: true,
        }
    );
    const [isDownloading, setIsDownloading] = useState(false);
    const [cancelTransaction, { isLoading: isCancelling }] = useCancelTransactionMutation();

    const handleRefresh = useCallback(async () => {
        await refetch();
    }, [refetch]);

    const handleCancel = async () => {
        if (!transaction_id) return;

        Alert.alert(
            "Konfirmasi Pembatalan",
            "Apakah Anda yakin ingin membatalkan transaksi ini?",
            [
                {
                    text: "Tidak",
                    style: "cancel",
                },
                {
                    text: "Ya, Batalkan",
                    onPress: async () => {
                        try {
                            await cancelTransaction({ transaction_id }).unwrap();
                            Toast.show({ type: 'success', text1: 'Transaksi berhasil dibatalkan.' });
                            await refetch();
                            onClose?.();
                        } catch (err) {
                            console.error('Gagal membatalkan transaksi:', err);
                            Toast.show({ type: 'error', text1: 'Gagal membatalkan transaksi.' });
                        }
                    },
                    style: "destructive",
                },
            ]
        );
    };

    const requestStoragePermission = async () => {
        if (Platform.OS !== 'android') return true;

        try {
            // Untuk Android 13+, tidak perlu izin spesifik untuk menyimpan ke folder umum seperti Downloads
            if (Platform.Version >= 33) {
                return true;
            }

            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Izin Penyimpanan',
                    message: 'Aplikasi ini memerlukan izin untuk menyimpan foto ke perangkat Anda.',
                    buttonNeutral: 'Tanya Nanti',
                    buttonNegative: 'Batal',
                    buttonPositive: 'OK',
                },
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    };

    const handleDownload = async (selectedPhotos: Transaction.TransactionHistoryPhoto[]) => {
        const hasPermission = await requestStoragePermission();
        if (!hasPermission) {
            Alert.alert('Izin Ditolak', 'Tidak dapat mengunduh foto tanpa izin penyimpanan.');
            return;
        }

        setIsDownloading(true);
        Toast.show({ type: 'info', text1: 'Memulai unduhan...' });

        try {
            for (const photo of selectedPhotos) {
                const fileName = photo.filename;
                const originalUrl = photo.original_url;

                const configOptions = Platform.select({
                    ios: {
                        fileCache: true,
                        path: `${RNFS.DocumentDirectoryPath}/${fileName}`,
                    },
                    android: {
                        fileCache: true,
                        addAndroidDownloads: {
                            useDownloadManager: true,
                            notification: true,
                            path: `${RNFS.DownloadDirectoryPath}/${fileName}`,
                            description: 'Mengunduh foto...',
                            title: fileName,
                            mime: 'image/jpeg',
                            mediaScannable: true,
                        },
                    },
                });

                if (configOptions) {
                    await RNBlobUtil.config(configOptions).fetch('GET', originalUrl);
                }
            }
            Toast.show({ type: 'success', text1: 'Semua foto terpilih telah diunduh.' });
        } catch (err) {
            console.error('Gagal mengunduh:', err);
            Toast.show({ type: 'error', text1: 'Gagal mengunduh foto.' });
        } finally {
            setIsDownloading(false);
        }
    };

    return {
        state: {
            transactionDetail,
            isLoading: isLoading || isFetching ,
            isDownloading,
            isCancelling,
            error,
        },
        methods: {
            handleRefresh,
            handleDownload,
            handleCancel,
        },
    };
};