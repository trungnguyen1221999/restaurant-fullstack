import express from "express";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";


const router = express.Router();

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get("/", getCategories);

// @route   GET /api/categories/:id
// @desc    Get single category with menu items
// @access  Public
router.get("/:id", getCategory);

// @route   POST /api/categories
// @desc    Create category
// @access  Private/Admin
router.post("/", createCategory);

// @route   PUT /api/categories/:id
// @desc    Update category
// @access  Private/Admin
router.put("/:id", updateCategory);

// @route   DELETE /api/categories/:id
// @desc    Delete category
// @access  Private/Admin
router.delete("/:id", deleteCategory);

// @route   PATCH /api/categories/:id/toggle
// @desc    Toggle category active status
// @access  Private/Admin

export default router;
