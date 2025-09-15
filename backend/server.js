import http from 'http'; // 1. Import http
import { Server } from 'socket.io'; // 2. Import Server from socket.io
import express from 'express';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import couponRoutes from './routes/couponRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import './config/passport.js';

connectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// 3. Create the HTTP server
const server = http.createServer(app);

// 4. Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Your frontend URL
    methods: ['GET', 'POST'],
  },
});

// 5. Set up a connection event handler
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use(cookieParser());

// Middleware to attach io instance
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/categories', categoryRoutes);

// 6. Use 'server.listen' instead of 'app.listen'
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

