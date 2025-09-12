import Category from '../models/categoryModel.js';

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req, res) => {
  const { name } = req.body;
  const categoryExists = await Category.findOne({ name });

  if (categoryExists) {
    res.status(400).json({ message: 'Category already exists' });
    return;
  }

  const category = new Category({ name });
  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
};

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public (so users can filter by them)
const getCategories = async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    await Category.deleteOne({ _id: category._id });
    res.json({ message: 'Category removed' });
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
};

export { createCategory, getCategories, deleteCategory };