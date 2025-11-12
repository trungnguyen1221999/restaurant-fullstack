import { uploadMultipleImages, deleteImage } from "../helpers/uploadImage.js";
import MenuItem from "../models/MenuItem.js";
import Category from "../models/Category.js";

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
    if (!id)
      return res.status(400).json({
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
    const { name, description, price, categoryName, ingredients } = req.body;
    if (!name || !description || !price || !categoryName || !ingredients) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const images = req.files;
    if (!images || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }
    let category = await Category.findOne({ name: categoryName });
    if (!category) {
      category = await Category.create({ name: categoryName });
    }
    const imageUrls = await uploadMultipleImages(images);
    const newMenuItem = await MenuItem.create({
      name,
      description,
      price,
      category: category._id,
      categoryName,
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

    // Parse deletedImages từ FormData
    let deletedImagesArray = [];
    if (req.body.deletedImages) {
      try {
        deletedImagesArray = JSON.parse(req.body.deletedImages);
      } catch {
        deletedImagesArray = Array.isArray(req.body.deletedImages)
          ? req.body.deletedImages
          : [];
      }
    }

    const menuItem = await MenuItem.findById(id);
    if (!menuItem) {
      return res.status(404).json({ success: false, message: "Menu item not found" });
    }

    // 1️⃣ Xóa ảnh cũ khỏi Cloudinary + DB
    if (deletedImagesArray.length > 0) {
      for (let public_id of deletedImagesArray) {
        await deleteImage(public_id);
        menuItem.images = menuItem.images.filter(img => img.public_id !== public_id);
      }
    }

    // 2️⃣ Upload ảnh mới (nếu có) và append vào images hiện tại
    if (req.files && req.files.length > 0) {
      const newImages = await uploadMultipleImages(req.files);
      menuItem.images.push(...newImages);
    }

    // 3️⃣ Cập nhật các field khác
    const { name, description, price, categoryName, ingredients } = req.body;
    if (name) menuItem.name = name;
    if (description) menuItem.description = description;
    if (price) menuItem.price = price;
    if (categoryName) menuItem.categoryName = categoryName;
    if (ingredients) menuItem.ingredients = ingredients;

    await menuItem.save();

    res.json({ success: true, message: "Menu item updated successfully", data: menuItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
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
