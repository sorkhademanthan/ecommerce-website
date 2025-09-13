import { apiSlice } from './apiSlice';
import type{ Product } from '../types';

interface GetProductsParams {
  keyword?: string;
  category?: string;
}

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], GetProductsParams>({
      query: ({ keyword, category }) => {
        const params = new URLSearchParams();
        if (keyword) params.append('keyword', keyword);
        if (category) params.append('category', category);
        return {
          url: `/api/products?${params.toString()}`,
        };
      },
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
    createReview: builder.mutation<{ message: string }, { productId: string; rating: number; comment: string }>({
      query: (data) => ({
        url: `/api/products/${data.productId}/reviews`,
        method: 'POST',
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
  useCreateReviewMutation,
} = productsApiSlice;