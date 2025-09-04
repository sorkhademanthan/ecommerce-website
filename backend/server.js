import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'; // Import product routes
import userRoutes from './routes/userRoutes.js'; // Import user routes
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes); // Mount the routes
app.use('/api/users', userRoutes); // Mount the routes
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});