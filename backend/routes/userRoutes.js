import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';

router.post('/login', authUser);
router.post('/', registerUser);
router.post('/logout', logoutUser); // We will protect this later
router
  .route('/profile')
  .get(protect, getUserProfile)      // Added protect middleware
  .put(protect, updateUserProfile);   // Added protect middleware
  router.route('/').post(registerUser).get(protect, admin, getUsers);
  router
    .route('/:id')
    .delete(protect, admin, deleteUser)
    .get(protect, admin, getUserById)
    .put(protect, admin, updateUser);
  
export default router;