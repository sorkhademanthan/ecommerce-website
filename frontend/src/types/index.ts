// src/types/index.ts
export type Product = {
    _id: string;
    name: string;
    image: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
  };

export type CartItem = {
  _id: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
};

export type ShippingAddress = {
  address: string;
  city: string;
  postalCode: string;
  country: string;
};