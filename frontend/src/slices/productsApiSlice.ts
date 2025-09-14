import { apiSlice } from './apiSlice';
import type{ Product } from '../types';

interface GetProductsParams {
  keyword?: string;
  category?: string;
  pageNumber?: number; // Add pageNumber
}

// Define the shape of the paginated response
interface PaginatedProducts {
  products: Product[];
  page: number;
  pages: number;
}

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<PaginatedProducts, GetProductsParams>({
      query: ({ keyword, category, pageNumber } = {}) => {
        const params = new URLSearchParams();
        if (keyword) params.append('keyword', keyword);
        if (category) params.append('category', category);
        if (pageNumber) params.append('pageNumber', String(pageNumber));
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
    getProductRecommendations: builder.query<Product[], string>({
      query: (productId) => ({
        url: `/api/products/${productId}/recommendations`,
      }),
      keepUnusedDataFor: 5,
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
  useGetProductRecommendationsQuery,
} = productsApiSlice;