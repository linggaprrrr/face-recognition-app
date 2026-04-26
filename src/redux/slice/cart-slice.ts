import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CART_STORAGE_KEY = 'CART_STORAGE_KEY';


const initialState: CartState = {
  items: [],
  loading: false,
};

const saveCartToStorage = async (items: CartItem[]) => {
  await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

export const loadCartFromStorage = createAsyncThunk<CartItem[]>(
  'cart/loadCartFromStorage',
  async () => {
    const stored = await AsyncStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const exists = state.items.some(item => item.photo_id === action.payload.photo_id);
      if (!exists) {
        state.items.push(action.payload);
        saveCartToStorage(state.items);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.photo_id !== action.payload);
      saveCartToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      AsyncStorage.removeItem(CART_STORAGE_KEY);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCartFromStorage.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
