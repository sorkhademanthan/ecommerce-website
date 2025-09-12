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

export type User = {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    token?: string; // Token is optional
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

export type OrderUser = {
  name: string;
  email: string;
};

export type OrderItem = {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: string;
};

export type Order = {
  _id: string;
  user?: OrderUser;
  createdAt?: string;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  paymentMethod: string;
  orderItems: OrderItem[];
  shipping_address?: {
    address: string;
    city: string;
    postal_code: string;
    country: string;
  };
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
};

// Payload used when creating an order
export type CreateOrderInput = {
  orderItems: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
};

export type Coupon = {
  _id: string;
  code: string;
  discount: number;
  expiry: Date;
  isActive: boolean;
};

export type Category = {
  _id: string;
  name: string;
};