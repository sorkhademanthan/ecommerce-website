import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type {PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import type{ Product } from '../types';

interface ProductsState {
  products: Product[];
  product: Product | null; // <-- 1. Add state for a single product
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
    products: [],
    product: null, // <-- 2. Initialize to null
    loading: false,
    error: null,
  };

export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<Product[]>('/api/products');
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'An error occurred');
      }
      return rejectWithValue('An error occurred');
    }
  }
);

export const fetchProductDetails = createAsyncThunk<Product, string>(
    'products/fetchDetails',
    async (productId, { rejectWithValue }) => {
      try {
        const { data } = await axios.get<Product>(`/api/products/${productId}`);
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(error.response?.data?.message || 'An error occurred');
        }
        return rejectWithValue('An error occurred');
      }
    }
  );

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Cases for fetchAll
        .addCase(fetchProducts.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.products = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // 4. Add cases for fetchDetails
        .addCase(fetchProductDetails.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchProductDetails.fulfilled, (state, action: PayloadAction<Product>) => {
          state.loading = false;
          state.product = action.payload;
        })
        .addCase(fetchProductDetails.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
  

export default productsSlice.reducer;
