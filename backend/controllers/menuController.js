import { uploadMultipleImages } from "../helpers/uploadImage.js";
import MenuItem from "../models/MenuItem.js";


export const getMenuItems = async (req, res) => {
  try {
   const menuItems = await MenuItem.find().sort({ createdAt: -1 });

    if (!menuItems || menuItems.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Menu is empty",
      });
    }

    res.json({
      success: true,
      data: { menuItems },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch menu items",
      error: error.message,
    });
  }
};


export const getMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    if(!id) return res.status(400).json({
      success: false,
      message: "Menu item ID is required",
    });
    const menuItem = await MenuItem.findById(id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.json({
      success: true,
      data: { menuItem },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch menu item",
      error: error.message,
    });
  }
};


export const createMenuItem = async (req, res) => {
  try {

    const { name, description, price, category, ingredients } = req.body;
    if (!name || !description || !price || !category || !ingredients) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
      }

      const  images  = req.files;
      if(!images || images.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Image file is required",
        });
      }
      const imageUrls = await uploadMultipleImages(images);
      const newMenuItem = await MenuItem.create({
        name,
        description,
        price,
        category,
        ingredients,
        images: imageUrls,
      });


    res.status(201).json({
      success: true,
      message: "Menu item created successfully",
      data: { newMenuItem },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create menu item",
      error: error.message,
    });
  }
};


export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const menuItem = await MenuItem.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.json({
      success: true,
      message: "Menu item updated successfully",
      data: { menuItem },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update menu item",
      error: error.message,
    });
  }
};


export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    const menuItem = await MenuItem.findByIdAndDelete(id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.json({
      success: true,
      message: "Menu item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete menu item",
      error: error.message,
    });
  }
};

