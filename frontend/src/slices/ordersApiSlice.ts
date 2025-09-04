import { apiSlice } from './apiSlice';
import type{ Order, CreateOrderInput } from '../types'; // 1. Import the specific Order type

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({ // 2. Use Order[] instead of any[]
      query: () => ({
        url: '/api/orders',
      }),
      keepUnusedDataFor: 5,
    }),
    getOrderDetails: builder.query<Order, string>({
      query: (orderId) => ({
        url: `/api/orders/${orderId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation<Order, string>({
      query: (orderId) => ({
        url: `/api/orders/${orderId}/deliver`,
        method: 'PUT',
      }),
    }),
    createOrder: builder.mutation<Order, CreateOrderInput>({
      query: (orderPayload) => ({
        url: '/api/orders',
        method: 'POST',
        body: orderPayload,
      }),
    }),
  }),
});

export const { useGetOrdersQuery, useGetOrderDetailsQuery, useDeliverOrderMutation, useCreateOrderMutation } = ordersApiSlice;