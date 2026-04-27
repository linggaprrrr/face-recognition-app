import { useLazyGetTransactionDetailQuery } from '@redux/services/transaction';
import { Navigation } from '@navigations';

interface UsePaymentSceneProps {
    fromPage: 'payment' | 'detail';
    transactionId: string;
}

export const usePaymentScene = ({ fromPage, transactionId }: UsePaymentSceneProps) => {
    const [getTransactionDetail, { isLoading }] = useLazyGetTransactionDetailQuery();

    const handleNavigation = async (url: string = '') => {
        // Cancel — just go back
        if (url.startsWith('app://payment/cancel')) {
            Navigation.pop();
            return;
        }

        // Back from detail page — just pop
        if (fromPage === 'detail') {
            Navigation.pop();
            return;
        }

        // Success or back from payment flow — check status then navigate to history
        try {
            const data = await getTransactionDetail({ transaction_id: transactionId }).unwrap();
            Navigation.homeScene(Navigation.RESET);
            setTimeout(() => {
                if (data?.status === 'paid' || data?.status === 'success' || data?.status === 'completed') {
                    Navigation.historyScene({ transactionId });
                } else {
                    Navigation.historyScene({});
                }
            }, 500);
        } catch (error) {
            console.error('Gagal mendapatkan status transaksi:', error);
            Navigation.homeScene(Navigation.RESET);
            setTimeout(() => Navigation.historyScene({}), 500);
        }
    };

    return {
        state: { isLoading },
        methods: { handleNavigation },
    };
};
