import { apiSlice } from './apiSlice';
import type{ User, Product } from '../types';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => ({ url: '/api/users' }),
      providesTags: ['User'],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation<{ message: string }, string>({
      query: (userId) => ({
        url: `/api/users/${userId}`,
        method: 'DELETE',
      }),
    }),
    // Add new query to get a single user's details
    getUserDetails: builder.query<User, string>({
      query: (userId) => ({
        url: `/api/users/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    // Add new mutation to update a user
    updateUser: builder.mutation<User, Partial<User>>({
      query: (data) => ({
        url: `/api/users/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    getWishlist: builder.query<Product[], void>({
      query: () => '/api/users/wishlist',
      providesTags: ['Wishlist'],
    }),
    addToWishlist: builder.mutation<{ message: string }, { productId: string }>({
      query: ({ productId }) => ({
        url: '/api/users/wishlist',
        method: 'POST',
        body: { productId },
      }),
      invalidatesTags: ['Wishlist'],
    }),
    removeFromWishlist: builder.mutation<{ message: string }, { productId: string }>({
      query: ({ productId }) => ({
        url: `/api/users/wishlist/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Wishlist'],
    }),
    forgotPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (data) => ({
        url: '/api/users/forgot-password',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation<{ message: string }, { token: string; password: string }>({
      query: (data) => ({
        url: `/api/users/reset-password/${data.token}`,
        method: 'PUT',
        body: { password: data.password },
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery, // Export new hook
  useUpdateUserMutation,   // Export new hook
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useForgotPasswordMutation, 
  useResetPasswordMutation
} = usersApiSlice;