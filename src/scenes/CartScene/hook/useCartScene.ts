import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import {
    clearCart,
    loadCartFromStorage,
    removeFromCart,
} from "@redux/slice/cart-slice";
import { useApplyPromoCodeMutation, useCreateTransactionMutation, useCreateTransactionPayMutation } from '@redux/services/transaction';
import Toast from 'react-native-toast-message';
import { Alert } from 'react-native';
import { Navigation } from '@navigations';

function useCartScene() {
    const dispatch = useDispatch<AppDispatch>();
    const items = useSelector((state: RootState) => state.cart.items);
    const loading = useSelector((state: RootState) => state.cart.loading);
    const [createTransaction, { isLoading: isCreating }] = useCreateTransactionMutation();
    const [createTransactionPay, { isLoading: isCreatingPay }] = useCreateTransactionPayMutation();
    const [applyPromoCodeMutation, { isLoading: isApplyingPromo }] = useApplyPromoCodeMutation();
    const user = useSelector((state: RootState) => state.user);
    const home = useSelector((state: RootState) => state.home);
    const [isLoadingCheckout, setIsLoadingCheckout] = useState(false);

    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [promoCode, setPromoCode] = useState('');
    const [appliedPromo, setAppliedPromo] = useState<Transaction.PromoCodeResponse['data'] | null>(null);

    function toggleSelect(photo_id: string) {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            next.has(photo_id) ? next.delete(photo_id) : next.add(photo_id);
            return next;
        });
    }

    function toggleSelectAll() {
        if (selectedIds.size === items.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(items.map((item) => item.photo_id)));
        }
    }

    function deleteSelected() {
        selectedIds.forEach((id) => {
            dispatch(removeFromCart(id));
        });
        setSelectedIds(new Set());
    }

    async function onRefreshList() {
        setIsRefreshing(true);
        try {
            await dispatch(loadCartFromStorage()).unwrap();
        } finally {
            setIsRefreshing(false);
        }
    }

    // async function requestStoragePermission(): Promise<boolean> {
    //     if (Platform.OS === 'android') {
    //         if (Platform.Version >= 33) {
    //             const granted = await PermissionsAndroid.request(
    //                 PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    //                 {
    //                     title: "Izin Akses Gambar",
    //                     message: "Aplikasi membutuhkan akses untuk membaca gambar.",
    //                     buttonNeutral: "Nanti",
    //                     buttonNegative: "Tolak",
    //                     buttonPositive: "Izinkan"
    //                 }
    //             );
    //             return granted === PermissionsAndroid.RESULTS.GRANTED;
    //         } else {
    //             const granted = await PermissionsAndroid.request(
    //                 PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //                 {
    //                     title: "Izin Akses Penyimpanan",
    //                     message: "Aplikasi membutuhkan akses untuk menyimpan foto.",
    //                     buttonNeutral: "Nanti",
    //                     buttonNegative: "Tolak",
    //                     buttonPositive: "Izinkan"
    //                 }
    //             );
    //             return granted === PermissionsAndroid.RESULTS.GRANTED;
    //         }
    //     }
    //     return true;
    // }

    async function applyPromoCode() {
        const code = promoCode.trim();
        if (!code) return;

        const selectedItems = items.filter(i => selectedIds.has(i.photo_id));
        const orderAmount = (selectedItems.length > 0 ? selectedItems : items)
            .reduce((sum, i) => sum + (i.photo_price ?? 0), 0);

        try {
            const result = await applyPromoCodeMutation({
                promo_code: code,
                order_amount: orderAmount,
                unit_id: home.unit_id,
            }).unwrap();
            if (result.success && result.data) {
                setAppliedPromo(result.data);
                Toast.show({ type: 'success', text1: result.message });
            } else {
                setAppliedPromo(null);
                Toast.show({ type: 'error', text1: result.message });
            }
        } catch {
            setAppliedPromo(null);
            Toast.show({ type: 'error', text1: 'Gagal menerapkan kode promo' });
        }
    }

    async function handleDownload() {
        const selectedItems = items.filter((t) => selectedIds.has(t.photo_id));
        const subtotal = selectedItems.reduce((sum, item) => sum + item.photo_price, 0);
        const discountAmount = appliedPromo?.discount_amount ?? 0;
        const totalPrice = Math.max(0, subtotal - discountAmount);


        // const hasPermission = await requestStoragePermission();
        // if (!hasPermission) {
        //     Toast.show({
        //         type: 'error',
        //         text1: 'Izin penyimpanan dibutuhkan untuk mengunduh foto.',
        //     });
        //     return;
        // }

        setIsLoadingCheckout(true)

        const now = new Date().toISOString();

        const payload: Transaction.TransactionPayload = {
            user_id: user.id,
            photos: selectedItems.map(item => ({
                photo_id: item.photo_id,
                price: item.photo_price,
            })),
            paid: false,
            discount_id: null,
            discount_amount: discountAmount,
            promo_code_used: appliedPromo?.promo_code ?? "",
            final_price: totalPrice,
            status: "pending",
            created_at: now,
            paid_at: now,
            unit_id: home.unit_id,
        };

        try {
            // await createTransaction(payload).unwrap();

            // for (const item of selectedItems) {
            //     const originalUrl = item.original_path;
            //     const fileName = item.original_filename;

            //     const downloadDest =
            //         Platform.OS === 'android'
            //             ? `${RNFS.DownloadDirectoryPath}/${fileName}`
            //             : `${RNFS.DocumentDirectoryPath}/${fileName}`; // iOS


            //     try {
            //         const res = await RNBlobUtil.config({
            //             fileCache: true,
            //             addAndroidDownloads: {
            //                 useDownloadManager: true,
            //                 notification: true,
            //                 path: downloadDest,
            //                 description: 'Mengunduh foto...',
            //                 title: fileName,
            //                 mime: 'image/jpeg',
            //                 mediaScannable: true,
            //             }
            //         }).fetch('GET', originalUrl);

            //         console.log('Download selesai ke:', res.path());
            //     } catch (downloadError) {
            //         console.log(`Gagal mengunduh ${originalUrl}:`, downloadError);
            //     }
            // }

            const response = await createTransactionPay(payload).unwrap();


            if (response.payment_url) {
                Navigation.paymentScene({
                    webViewUrl: response.payment_url,
                    fromPage: 'payment',
                    transactionId: response.transaction.id
                })
                dispatch(clearCart());
                setSelectedIds(new Set());
            }

            setIsLoadingCheckout(false)
        } catch (err: any) {
            console.log('Gagal membuat transaksi:', err);
            setIsLoadingCheckout(false);

            if (err?.status === 400 && err?.data?.detail?.includes('transaction in progress')) {
                Alert.alert(
                    'Transaksi Belum Selesai',
                    'Kamu masih memiliki transaksi yang belum diselesaikan. Harap selesaikan atau batalkan transaksi tersebut terlebih dahulu.',
                    [{ text: 'OK' }],
                );
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Gagal membuat transaksi',
                });
            }
        }
    }

    return {
        state: {
            user,
            transactions: items,
            isLoading: loading || isCreating || isLoadingCheckout,
            isApplyingPromo,
            selectedIds,
            isRefreshing,
            promoCode,
            appliedPromo,
        },
        method: {
            toggleSelect,
            toggleSelectAll,
            deleteSelected,
            onRefreshList,
            handleDownload,
            setPromoCode,
            applyPromoCode,
        },
    };
}

export default useCartScene;
