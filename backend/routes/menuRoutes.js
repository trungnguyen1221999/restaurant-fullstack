import express from "express";
import {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability,
} from "../controllers/menuController.js";
import { authenticate, requireAdmin } from "../helpers/authMiddleware.js";

const router = express.Router();

// @route   GET /api/menu
// @desc    Get all menu items
// @access  Public
router.get("/", getMenuItems);

// @route   GET /api/menu/:id
// @desc    Get single menu item
// @access  Public
router.get("/:id", getMenuItem);

// @route   POST /api/menu
// @desc    Create menu item
// @access  Private/Admin
router.post("/", authenticate, requireAdmin, createMenuItem);

// @route   PUT /api/menu/:id
// @desc    Update menu item
// @access  Private/Admin
router.put("/:id", authenticate, requireAdmin, updateMenuItem);

// @route   DELETE /api/menu/:id
// @desc    Delete menu item
// @access  Private/Admin
router.delete("/:id", authenticate, requireAdmin, deleteMenuItem);

// @route   PATCH /api/menu/:id/availability
// @desc    Toggle menu item availability
// @access  Private/Admin
router.patch(
  "/:id/availability",
  authenticate,
  requireAdmin,
  toggleAvailability
);

export default router;
