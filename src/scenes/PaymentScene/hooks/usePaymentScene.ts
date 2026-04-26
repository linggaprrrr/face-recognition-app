import { useLazyGetTransactionDetailQuery } from '@redux/services/transaction';
import { Navigation } from '@navigations';
import { WebViewNavigation } from 'react-native-webview';
import { useCallback } from 'react';

interface UsePaymentSceneProps {
    fromPage: 'payment' | 'detail';
    transactionId: string;
}

export const usePaymentScene = ({ fromPage, transactionId }: UsePaymentSceneProps) => {
    const [getTransactionDetail, { isLoading }] = useLazyGetTransactionDetailQuery();

    const handleNavigation = async () => {
        // Hentikan webview dari navigasi lebih lanjut
        if (fromPage === 'detail') {
            Navigation.pop();
            return false;
        }

        try {
            // Periksa status transaksi sebelum navigasi
            const data = await getTransactionDetail({ transaction_id: transactionId }).unwrap();

            Navigation.homeScene(Navigation.RESET);

            if (data?.status === 'paid') {
                // Jika lunas, navigasi ke riwayat dan tampilkan modal detail
                setTimeout(() => {
                    Navigation.historyScene({ transactionId });
                }, 500);
            } else {
                // Jika belum lunas (pending, dll.), navigasi ke daftar riwayat saja
                setTimeout(() => {
                    Navigation.historyScene({}); // Tanpa transactionId
                }, 500);
            }
        } catch (error) {
            console.error("Gagal mendapatkan status transaksi:", error);
            // Fallback: navigasi ke daftar riwayat
            Navigation.homeScene(Navigation.RESET);
            setTimeout(() => {
                Navigation.historyScene({});
            }, 500);
        }
    }

    return {
        state: { isLoading },
        methods: { handleNavigation },
    };
};