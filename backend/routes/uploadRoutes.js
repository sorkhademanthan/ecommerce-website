import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Configure multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define the POST route for '/api/upload'
router.post('/', protect, admin, upload.single('image'), async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // This Promise structure is the most reliable way to handle the upload stream
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto', folder: 'ElectroMart/avatars' },
        (error, result) => {
          if (error) {
            reject(error); // Reject the promise if Cloudinary returns an error
          } else {
            resolve(result); // Resolve the promise with the successful result
          }
        }
      );
      // Send the file buffer from multer to the Cloudinary stream
      stream.end(req.file.buffer);
    });

    // Send the secure URL from Cloudinary back to the frontend
    res.status(200).json({
      message: 'Image uploaded successfully',
      imageUrl: result.secure_url,
    });
  } catch (error) {
    // Catch any errors and send a clean 500 response
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Error uploading image' });
  }
});

export default router;