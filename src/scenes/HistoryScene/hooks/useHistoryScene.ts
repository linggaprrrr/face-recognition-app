import { useGetTransactionHistoryQuery } from '@redux/services/transaction';
import { RootState } from '@redux/store';
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

const ITEMS_PER_PAGE = 10;

interface UseHistorySceneProps {
    transactionId?: string;
}

export const useHistoryScene = ({ transactionId }: UseHistorySceneProps) => {
    const user = useSelector((state:RootState) => state.user)
    const [page, setPage] = useState(1);
    const [allTransactions, setAllTransactions] = useState<Transaction.TransactionHistoryEntry[]>([]);
    const [isRefreshingState, setIsRefreshingState] = useState(false);
    const [isPhotoModalVisible, setIsPhotoModalVisible] = useState(false);
    const [selectedTransactionId, setSelectedTransactionId] = useState<
        string | undefined>(undefined);

    const { data, error, isLoading, isFetching, refetch } = useGetTransactionHistoryQuery({
        user_id: user.id,
        page,
        limit: ITEMS_PER_PAGE,
    });

    useEffect(() => {
        if (transactionId) {
            setSelectedTransactionId(transactionId);
            setIsPhotoModalVisible(true);
        }
    }, [transactionId]);

    useEffect(() => {
        if (data?.data) {
            if (page === 1 || isRefreshingState) {
                setAllTransactions(data.data);
            } else {
                setAllTransactions(prevTransactions => {
                    const newItems = data.data.filter(
                        newItem => !prevTransactions.some(prevItem => prevItem.id === newItem.id)
                    );
                    return [...prevTransactions, ...newItems];
                });
            }
            if (isRefreshingState) {
                setIsRefreshingState(false);
            }
        }
    }, [data, page, isRefreshingState]);

    const handleRefresh = useCallback(async () => {
        setIsRefreshingState(true);
        if (page === 1) {
            await refetch();
        } else {
            setPage(1);
        }
    }, [page, refetch]);

    const handleLoadMore = () => {
    
        if (data && allTransactions.length < data.total && !isFetching) {
            setPage(prevPage => prevPage + 1);
        }
    };

    const handleItemPress = (item: Transaction.TransactionHistoryEntry) => {
        setSelectedTransactionId(item.id);
        setIsPhotoModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsPhotoModalVisible(false);
        setSelectedTransactionId(undefined);
    };

    const initialLoading = isLoading && page === 1 && allTransactions.length === 0;
    const loadingMore = isFetching && page > 1;
    const isListRefreshing = isFetching && isRefreshingState;

    return {
        state: {
            transactions: allTransactions,
            initialLoading,
            loadingMore,
            isListRefreshing,
            error,
            hasMore: data ? allTransactions.length < data.total : true,
            isPhotoModalVisible,
            selectedTransactionId,
        },
        methods: {
            handleRefresh,
            handleLoadMore,
            handleItemPress,
            handleCloseModal,
        }
    };
};