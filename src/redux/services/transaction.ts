import { createApi } from '@reduxjs/toolkit/query/react';
import { baseService } from './_base-query';

export const transactions = createApi({
    reducerPath: 'transactions',
    baseQuery: baseService,
    tagTypes: ['Transactions', 'FaceSearch'],
    endpoints: (builder) => ({
        applyPromoCode: builder.mutation<Transaction.PromoCodeResponse, Transaction.ApplyDiscountPayload>({
            query: (body) => ({
                url: '/discounts/apply',
                method: 'POST',
                body,
            }),
        }),
        createTransaction: builder.mutation<Transaction.TransactionItem, Transaction.TransactionPayload>({
            query: (body) => ({
                url: '/transactions/',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['FaceSearch'], // Assuming FaceSearch is related to photos
        }),
        createTransactionPay: builder.mutation<Transaction.TransactionPayResponse, Transaction.TransactionPayPayload>({
            query: (body) => ({
                url: '/transactions/pay',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['FaceSearch'],
        }),
        getTransactionHistory: builder.query<Transaction.ITransactionHistory, { user_id: string, page: number, limit: number }>({
            query: ({ user_id, page, limit }) => ({
                url: `/transactions/users/${user_id}`,
                method: 'GET',
                params: { page, limit }
            })
        }),
        getTransactionDetail: builder.query<Transaction.TransactionDetailResponse, { transaction_id: string }>({
            query: ({ transaction_id }) => ({
                url: `/transactions/${transaction_id}`,
                method: 'GET'
            })
        }),
        cancelTransaction: builder.mutation<void, { transaction_id: string }>({
            query: ({ transaction_id }) => ({
                url: `/transactions/${transaction_id}/cancel`,
                method: 'PATCH',
                params: { transaction_id },
            }),
        }),
    }),
});

export const {
    useApplyPromoCodeMutation,
    useCreateTransactionMutation,
    useCreateTransactionPayMutation,
    useCancelTransactionMutation,
    useGetTransactionHistoryQuery,
    useGetTransactionDetailQuery,
    useLazyGetTransactionDetailQuery
} = transactions;
