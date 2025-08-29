import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice'; // 1. Import cart reducer
import productsReducer from './slices/productsSlice'; // 1. Import
import ordersReducer from './slices/ordersSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer, // 2. Add cart reducer
    products: productsReducer, // 2. Add
    orders: ordersReducer
  },
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;