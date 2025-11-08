import express from "express";
import {
  createReservation,
  getAllReservations,
  getReservationByCode,
  updateReservationStatus,
  deleteReservation,
} from "../controllers/reservationController.js";
import {
  authenticate,
  requireAdmin,
  optionalAuth,
} from "../helpers/authMiddleware.js";
import { validateReservation } from "../helpers/validation.js";

const router = express.Router();

// @route   POST /api/reservations
// @desc    Create a new reservation
// @access  Public (with optional auth)
router.post("/", optionalAuth, validateReservation, createReservation);

// @route   GET /api/reservations
// @desc    Get all reservations (Admin only)
// @access  Private/Admin
router.get("/", authenticate, requireAdmin, getAllReservations);

// @route   GET /api/reservations/:confirmationCode
// @desc    Get reservation by confirmation code
// @access  Public
router.get("/:confirmationCode", getReservationByCode);

// @route   PUT /api/reservations/:id/status
// @desc    Update reservation status
// @access  Private/Admin
router.put("/:id/status", authenticate, requireAdmin, updateReservationStatus);

// @route   DELETE /api/reservations/:id
// @desc    Delete a reservation
// @access  Private/Admin
router.delete("/:id", authenticate, requireAdmin, deleteReservation);

export default router;
