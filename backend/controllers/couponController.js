import Coupon from '../models/couponModel.js';

// @desc    Create a coupon
// @route   POST /api/coupons
// @access  Private/Admin
const createCoupon = async (req, res) => {
  const { code, discount, expiry } = req.body;
  const coupon = new Coupon({
    code: code.toUpperCase(),
    discount,
    expiry,
  });
  const createdCoupon = await coupon.save();
  res.status(201).json(createdCoupon);
};

// @desc    Get all coupons
// @route   GET /api/coupons
// @access  Private/Admin
const getCoupons = async (req, res) => {
  const coupons = await Coupon.find({});
  res.json(coupons);
};

// @desc    Delete a coupon
// @route   DELETE /api/coupons/:id
// @access  Private/Admin
const deleteCoupon = async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  if (coupon) {
    await Coupon.deleteOne({ _id: coupon._id });
    res.json({ message: 'Coupon removed' });
  } else {
    res.status(404).json({ message: 'Coupon not found' });
  }
};

export { createCoupon, getCoupons, deleteCoupon };