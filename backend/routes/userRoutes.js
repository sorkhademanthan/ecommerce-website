import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';

router.post('/login', authUser);
router.post('/', registerUser);
router.post('/logout', logoutUser); // We will protect this later
router
  .route('/profile')
  .get(protect, getUserProfile)      // Added protect middleware
  .put(protect, updateUserProfile);   // Added protect middleware

export default router;