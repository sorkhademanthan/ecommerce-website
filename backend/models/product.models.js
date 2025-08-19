import mongoose from 'mongoose';

// A sub-document for reviews
const reviewSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    name: { type: String, required: true }, // Name of the reviewer
    rating: { type: Number, required: true }, // 1-5 stars
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    // New, more advanced fields
    images: [
      {
        type: String, // An array for multiple image URLs
      },
    ],
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema], // An array of review sub-documents
    rating: {
      // The average rating, calculated from reviews
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    // Optional advanced fields
    sku: { type: String, unique: true }, // Stock Keeping Unit
    salePrice: { type: Number }, // To handle discounts
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;