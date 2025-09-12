import { apiSlice } from './apiSlice';
import type { Category } from '../types';

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({ url: '/api/categories' }),
      providesTags: ['Category'],
      keepUnusedDataFor: 5,
    }),
    createCategory: builder.mutation<Category, { name: string }>({
      query: (data) => ({
        url: '/api/categories',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Category'],
    }),
    deleteCategory: builder.mutation<{ message: string }, string>({
      query: (categoryId) => ({
        url: `/api/categories/${categoryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApiSlice;