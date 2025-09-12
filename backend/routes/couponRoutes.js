import express from 'express';
const router = express.Router();
import {
  createCoupon,
  getCoupons,
  deleteCoupon,
} from '../controllers/couponController.js';
import { protect} from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

router.route('/').post(protect, admin, createCoupon).get(protect, admin, getCoupons);
router.route('/:id').delete(protect, admin, deleteCoupon);

export default router;