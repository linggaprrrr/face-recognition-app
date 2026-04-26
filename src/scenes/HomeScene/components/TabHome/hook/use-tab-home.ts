import { Navigation } from '@navigations';
import { useLazyFaceGetInferenceQuery, useLazyFaceGetPhotoReferenceQuery } from '@redux/services/face-recognition';
import { RootState } from '@redux/store';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { setPhotoId } from '@redux/slice/home-slice';

export const useTabHome = () => {
    const { user, home } = useSelector((state: RootState) => state);
    const dispatch = useDispatch();
    const [checkFotoSelfie, { isLoading: isLoadingSelfieCheck }] = useLazyFaceGetInferenceQuery();
    const [
        triggerGetPhotoStatus,
        { isLoading: isLoadingPhotoStatusCheck }
    ] = useLazyFaceGetPhotoReferenceQuery();

    const [isPollingPhotoStatus, setIsPollingPhotoStatus] = useState(false);

    const performSelfiePresenceCheck = async () => {
        if (user && user.id) {
            try {
                console.log('Performing selfie presence check for user:', user.id);
                const responseData = await checkFotoSelfie({ user_id: user.id }).unwrap();

                if (responseData?.inference === false) {
                    Toast.show({
                        type: 'info',
                        text1: 'Pengecekan Wajah',
                        text2: 'Anda belum memiliki foto referensi wajah. Mengarahkan ke halaman upload...',
                    });
                    Navigation.selfieScene(Navigation.RESET);
                } else {
                    console.log('Selfie presence check successful, inference is true.');
                }
            } catch (error) {
                console.error('Gagal melakukan pengecekan selfie presence:', error);
                Toast.show({
                    type: 'error',
                    text1: 'Terjadi Kesalahan',
                    text2: 'Gagal melakukan pengecekan status wajah Anda.'
                });
            }
        }
    };

    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval> | null = null;
        let pollingAttempts = 0;
        const MAX_POLLING_ATTEMPTS = 12; // Batas percobaan polling (12 * 5 detik = 1 menit)

        const clearPollingInterval = () => {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
            setIsPollingPhotoStatus(false);
        };

        const handlePhotoProcessingAndSelfieCheck = async () => {
            if (home.photo_id) {
                console.log('Photo ID found:', home.photo_id, '. Starting polling for status.');
                setIsPollingPhotoStatus(true);
                pollingAttempts = 0; // Reset hitungan percobaan untuk photo_id baru

                intervalId = setInterval(async () => {
                    pollingAttempts++;
                    console.log(`Polling photo status for: ${home.photo_id}, attempt: ${pollingAttempts}`);

                    if (pollingAttempts > MAX_POLLING_ATTEMPTS) {
                        console.error('Max polling attempts reached for photo_id:', home.photo_id);
                        clearPollingInterval();
                        dispatch(setPhotoId('')); // Bersihkan photo_id untuk mencegah polling ulang
                        Toast.show({
                            type: 'error',
                            text1: 'Pengecekan Foto Gagal',
                            text2: 'Waktu tunggu habis. Foto tidak dapat diproses saat ini.',
                        });
                        return;
                    }

                    try {
                        console.log('Polling photo status for:', home.photo_id);
                        const statusResponse = await triggerGetPhotoStatus({ photo_id: home.photo_id }).unwrap();
                        console.log('Photo status from poll:', statusResponse);

                        // Asumsi status dari backend bisa: 'done', 'processing', 'failed'
                        if (statusResponse && statusResponse.status === 'done') {
                            console.log('Photo processing completed for:', home.photo_id);
                            clearPollingInterval();
                            dispatch(setPhotoId(''));
                            Toast.show({
                                type: 'success',
                                text2: 'Foto referensi Anda telah berhasil diproses.'
                            });
                            await performSelfiePresenceCheck();
                        } else if (statusResponse && statusResponse.status === 'failed') {
                            console.error('Photo processing failed for:', home.photo_id, statusResponse);
                            clearPollingInterval();
                            dispatch(setPhotoId(''));
                            Toast.show({
                                type: 'error',
                                text2: 'Gagal memproses foto',
                            });
                        } else if (statusResponse && statusResponse.status === 'processing') {
                            console.log('Foto untuk', home.photo_id, 'masih diproses. Melanjutkan polling.');
                            // Biarkan interval berjalan untuk polling berikutnya
                        } else {
                            // Status tidak dikenali atau struktur respons tidak sesuai
                            console.warn('Status foto tidak dikenali atau respons tidak sesuai:', statusResponse);
                            clearPollingInterval();
                            dispatch(setPhotoId(''));
                            Toast.show({
                                type: 'error',
                                text1: 'Pengecekan Foto Gagal',
                                text2: 'Status foto tidak dikenali. Silakan coba lagi nanti.',
                            });
                        }
                    } catch (err) {
                        console.error('Error polling photo status for:', home.photo_id, err);
                        clearPollingInterval();
                        dispatch(setPhotoId('')); 
                        Toast.show({
                            type: 'error',
                            text1: 'Pengecekan Foto Gagal',
                            text2: 'Terjadi kesalahan saat memeriksa status foto Anda.'
                        });
                    }
                }, 5000); 
            } else {
                console.log('No photo_id found, proceeding to selfie presence check.');
                await performSelfiePresenceCheck();
            }
        };

        if (user.id) {
            handlePhotoProcessingAndSelfieCheck();
        }

        return () => {
            if (intervalId) {
                console.log('Clearing photo status polling interval on cleanup.');
                clearPollingInterval(); 
            }
        };
    }, [user.id, home.photo_id, dispatch, triggerGetPhotoStatus, checkFotoSelfie]);

    return {
        state: {
            loading: isLoadingSelfieCheck || isPollingPhotoStatus || isLoadingPhotoStatusCheck,
        }
    };
};