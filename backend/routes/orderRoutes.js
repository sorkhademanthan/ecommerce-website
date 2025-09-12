import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrders,
  getOrderById,
  updateOrderToDelivered,
  getOrderSummary, // <-- Add this here
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);

// Place specific routes like '/summary' before dynamic routes like '/:id'
router.route('/summary').get(protect, admin, getOrderSummary);

router.route('/:id').get(protect, getOrderById);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;