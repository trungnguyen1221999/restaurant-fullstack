import express from "express";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  toggleCategoryStatus,
} from "../controllers/categoryController.js";
import { authenticate, requireAdmin } from "../helpers/authMiddleware.js";

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
router.post("/", authenticate, requireAdmin, createCategory);

// @route   PUT /api/categories/:id
// @desc    Update category
// @access  Private/Admin
router.put("/:id", authenticate, requireAdmin, updateCategory);

// @route   DELETE /api/categories/:id
// @desc    Delete category
// @access  Private/Admin
router.delete("/:id", authenticate, requireAdmin, deleteCategory);

// @route   PATCH /api/categories/:id/toggle
// @desc    Toggle category active status
// @access  Private/Admin
router.patch("/:id/toggle", authenticate, requireAdmin, toggleCategoryStatus);

export default router;
