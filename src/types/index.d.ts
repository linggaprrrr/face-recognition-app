interface CartItem {
    photo_id: string;
    compressed_path: string;
    photo_price: number;
    original_filename: string;
    unit_name: string
    original_path: string
}

interface CartState {
    items: CartItem[];
    loading: boolean;
}