import { apiSlice } from './apiSlice';
import type{ User } from '../types';

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
  }),
});

export const {
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery, // Export new hook
  useUpdateUserMutation,   // Export new hook
} = usersApiSlice;