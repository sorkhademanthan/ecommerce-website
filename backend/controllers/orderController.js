import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    // Ensure authenticated user exists
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Validate items and normalize product id
    const normalizedItems = orderItems.map((item) => {
      if (!item) {
        throw new Error('Invalid order item');
      }
      const productId = item.product || item._id; // accept either field from client
      if (!productId) {
        throw new Error('Order item is missing product/_id');
      }
      return {
        name: item.name,
        qty: item.qty,
        image: item.image,
        price: item.price,
        product: productId,
      };
    });

    const order = new Order({
      orderItems: normalizedItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (err) {
    const message = err?.message || 'Failed to create order';
    res.status(500).json({ message });
  }
};

// @desc    Get all orders (admin)
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err?.message || 'Failed to fetch orders' });
  }
};

const updateOrderToDelivered = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};

const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};


// @desc    Get order summary for dashboard
// @route   GET /api/orders/summary
// @access  Private/Admin
const getOrderSummary = async (req, res) => {
  try {
    // Sales data aggregation
    const salesData = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          totalSales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Total orders
    const totalOrders = await Order.countDocuments();

    // Total products
    const totalProducts = await Product.countDocuments();

    // Total users
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      salesData,
      totalOrders,
      totalProducts,
      totalUsers,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


export { addOrderItems, getOrders, getOrderById, updateOrderToDelivered, getOrderSummary };
