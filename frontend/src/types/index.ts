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

  // in src/types/index.ts
export type CartItem = {
  _id: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
};