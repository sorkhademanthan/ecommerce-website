import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, ShippingAddress } from '../types'; 
import { logout } from './authSlice';

interface CartState {
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string; 
}

// Function to get cart from localStorage
const cartItemsFromStorageString = localStorage.getItem('cart');
const cartItemsFromStorage = cartItemsFromStorageString
  ? (JSON.parse(cartItemsFromStorageString) as CartState)
  : { 
      cartItems: [], 
      shippingAddress: { address: '', city: '', postalCode: '', country: '' }, 
      paymentMethod: 'PayPal' 
    };

const initialState: CartState = cartItemsFromStorage;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    saveShippingAddress: (state, action: PayloadAction<ShippingAddress>) => {
        state.shippingAddress = action.payload;
        localStorage.setItem('cart', JSON.stringify(state));
    },
    savePaymentMethod: (state, action: PayloadAction<string>) => {
        state.paymentMethod = action.payload;
        localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCartItems: (state) => {
        state.cartItems = [];
        localStorage.setItem('cart', JSON.stringify(state));
      },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      // Clear the cart and remove it from localStorage
      state.cartItems = [];
      localStorage.removeItem('cart');
    });
  },
});

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;