import { apiSlice } from './apiSlice';
import type{ Product } from '../types';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: '/api/products',
      }),
      providesTags: ['Product'],
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query<Product, string>({
      query: (productId) => ({
        url: `/api/products/${productId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Product'],
    }),
    createProduct: builder.mutation<Product, void>({
      query: () => ({
        url: '/api/products',
        method: 'POST',
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation<{ message: string }, string>({
      query: (productId) => ({
        url: `/api/products/${productId}`,
        method: 'DELETE',
      }),
    }),
    updateProduct: builder.mutation<Product, Partial<Product>>({
        query: (data) => ({
          url: `/api/products/${data._id}`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['Product'],
    }),
    uploadProductImage: builder.mutation<{ imageUrl: string; message: string }, FormData>({
        query: (data) => ({
          url: `/api/upload`,
          method: 'POST',
          body: data,
        }),
      }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} = productsApiSlice;