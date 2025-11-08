import express from "express";
import {
  createReservation,
  getAllReservations,

  deleteReservation,
} from "../controllers/reservationController.js";


const router = express.Router();

// @route   POST /api/reservations
// @desc    Create a new reservation
// @access  Public (with optional auth)
router.post("/", createReservation);

// @route   GET /api/reservations
// @desc    Get all reservations (Admin only)

router.get("/", getAllReservations);



// @route   DELETE /api/reservations/:id
// @desc    Delete a reservation

router.delete("/:id",  deleteReservation);

export default router;
