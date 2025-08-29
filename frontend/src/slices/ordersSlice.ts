import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../store';

export interface OrderState {
  loading: boolean;
  error: string | null;
  order: unknown | null;
}

const initialState: OrderState = {
  loading: false,
  error: null,
  order: null,
};

export const createOrder = createAsyncThunk<
  unknown,
  object,
  { state: RootState; rejectValue: string }
>(
  'orders/create',
  async (order, { getState, rejectWithValue }) => {
    try {
      const { auth: { userInfo } } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...(userInfo?.token && { Authorization: `Bearer ${userInfo.token}` }),
        },
      };

      const { data } = await axios.post('/api/orders', order, config);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'An error occurred');
      }
      return rejectWithValue('An error occurred');
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'An error occurred';
      });
  },
});

export default orderSlice.reducer;