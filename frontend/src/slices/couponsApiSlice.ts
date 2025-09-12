import { apiSlice } from './apiSlice';
import type { Coupon } from '../types';

export const couponsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoupons: builder.query<Coupon[], void>({
      query: () => ({ url: '/api/coupons' }),
      providesTags: ['Coupon'],
      keepUnusedDataFor: 5,
    }),
    createCoupon: builder.mutation<Coupon, Partial<Coupon>>({
      query: (data) => ({
        url: '/api/coupons',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Coupon'],
    }),
    deleteCoupon: builder.mutation<{ message: string }, string>({
      query: (couponId) => ({
        url: `/api/coupons/${couponId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Coupon'],
    }),
  }),
});

export const {
  useGetCouponsQuery,
  useCreateCouponMutation,
  useDeleteCouponMutation,
} = couponsApiSlice;