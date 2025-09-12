import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

router.route('/').get(getProducts).post(protect, admin, createProduct);
// router.route('/top').get(getTopProducts); // Example of specific route
router
  .route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;