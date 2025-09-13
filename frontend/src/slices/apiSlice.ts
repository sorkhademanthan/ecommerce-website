import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store'; // Make sure to export RootState from your store

const baseQuery = fetchBaseQuery({
  baseUrl: '',
  prepareHeaders: (headers, { getState }) => {
    // Get the userInfo from the Redux state
    const { userInfo } = (getState() as RootState).auth;

    // If we have a token, add it to the headers
    if (userInfo && userInfo.token) {
      headers.set('Authorization', `Bearer ${userInfo.token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'User', 'Coupon', 'Category', 'Wishlist'],
  endpoints: () => ({}),
});