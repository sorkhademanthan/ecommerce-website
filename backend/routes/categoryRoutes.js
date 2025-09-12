import express from 'express';
const router = express.Router();
import {
  createCategory,
  getCategories,
  deleteCategory,
} from '../controllers/categoryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js'

router.route('/').post(protect, admin, createCategory).get(getCategories);
router.route('/:id').delete(protect, admin, deleteCategory);

export default router;