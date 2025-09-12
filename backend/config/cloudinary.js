import { v2 as cloudinary } from 'cloudinary';

// console.log('API Key from .env:', process.env.CLOUDINARY_API_KEY);
// console.log('API Secret from .env:', process.env.CLOUDINARY_API_SECRET);
// console.log('Cloud Name from .env:', process.env.CLOUDINARY_CLOUD_NAME);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;