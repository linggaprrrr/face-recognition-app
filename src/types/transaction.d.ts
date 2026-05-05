declare namespace Transaction {

    interface PromoCodeResponse {
        success: boolean;
        message: string;
        data?: {
            promo_code: string;
            discount_type: string;
            discount_value: number;
            discount_amount: number;
        };
        error_code?: string;
    }

    interface GetPayload {
        page?: number;
        limit?: number;
        search?: string;
    }

    interface TransactionPayload {
        user_id: string;
        photos: {
            photo_id: string;
            price: number;
        }[];
        paid: boolean;
        discount_id: string | null;
        discount_amount: number;
        promo_code_used: string;
        final_price: number;
        status: 'pending' | 'completed' | 'failed' | string;
        created_at: string;
        paid_at: string;
        unit_id: string;
    }

    interface TransactionPayPayload {
        user_id: string;
        photos: {
            photo_id: string;
        }[];
        promo_code_used?: string;
        discount_amount?: number;
        final_price?: number;
        unit_id?: string;
    }

    interface User {
        id: string;
        name: string;
        email: string;
    }

    interface Photo {
        id: string;
        filename: string;
        original_url: string;
    }

    interface Unit {
        id: string;
        name: string;
        location: string;
    }

    interface TransactionItem {
        id: string;
        user: User;
        photos: Photo[];
        unit: Unit;
        price: number;
        paid: boolean;
        paid_at: string | null;
        discount_id: string | null;
        discount_amount: number;
        promo_code_used: string;
        final_price: number;
        status: string;
        created_at: string;
    }

    interface Pagination {
        total: number;
        page: number;
        limit: number;
    }

    interface PaginatedTransactions {
        total: number;
        page: number;
        limit: number;
        data: TransactionItem[];
    }

    interface TransactionHistoryPhoto {
        id: string;
        filename: string;
        original_path: string;
        unit: Unit; 
    }

    interface TransactionHistoryEntry {
        id: string;
        user: User; 
        trx_code: string; 
        photos: TransactionHistoryPhoto[];
        paid: boolean;
        paid_at: string; 
        discount_id: string | null;
        discount_amount: number;
        promo_code_used: string;
        final_price: number;
        status: string;
        created_at: string; 
    }

    interface ITransactionHistory extends PaginatedTransactions {
        data: TransactionHistoryEntry[];
    }

    
    interface TransactionPayResponseTransaction {
        id: string;
        trx_code: string; 
        user: User;
        photos: TransactionHistoryPhoto[]; 
        paid: boolean;
        paid_at: string | null;
        discount_id: string | null;
        discount_amount: number;
        promo_code_used: string | null; 
        final_price: number;
        status: 'pending' | 'completed' | 'failed' | string;
        created_at: string;
    }

    interface TransactionPayResponse {
        transaction: TransactionPayResponseTransaction;
        payment_url: string;
        token_id: string;
    }

    interface TransactionDetailResponse extends TransactionPayResponseTransaction {
        payment_url: string;
    }
}
