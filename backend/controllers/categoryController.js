import Category from "../models/Category.js";
import MenuItem from "../models/MenuItem.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    if (!categories || categories.length === 0)
      return res.status(404).json({
        message: "Category List is empty",
        success: false,
        error: true,
      });
    return res.status(200).json({
      success: true,
      data: { categories },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name)
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category with this name already exists",
      });
    }
    const category = await Category.create({ name });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: { category },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create category",
      error: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
      const { id } = req.params;
      const { name } = req.body;
     if (!id) 
        return res.status(400).json({
          success: false,
          message: "Category ID is required",
        });
        if(!name)
          return res.status(400).json({
            success: false,
            message: "Category name is required",
          });
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({
          success: false,
          message: "Category with this name already exists",
        });
      }
    const category = await Category.findByIdAndUpdate(id, { name }, {
      new: true,
    });
      
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.json({
      success: true,
      message: "Category updated successfully",
      data: { category },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update category",
      error: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) 
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    // Check if category has menu items
    const itemCount = await MenuItem.countDocuments({ category: id });
    if (itemCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category. It has ${itemCount} menu items. Please move or delete the menu items first.`,
      });
    }

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete category",
      error: error.message,
    });
  }
};
