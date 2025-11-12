import express from "express";
import {
  createReservation,
  getAllReservations,

  deleteReservation,
  getReservationById,
  updateReservation,
} from "../controllers/reservationController.js";


const router = express.Router();


router.post("/", createReservation);

router.get("/", getAllReservations);

router.get("/:id", getReservationById);

router.delete("/:id",  deleteReservation);

router.put("/:id",  updateReservation);

export default router;
