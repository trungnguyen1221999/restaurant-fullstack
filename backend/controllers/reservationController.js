import Reservation from "../models/Reservation.js";

export const createReservation = async (req, res) => {
  try {
    const { customerInfo, reservationDetails, note } = req.body;

    // Check if the selected date/time is available
    const existingReservation = await Reservation.findOne({
      customerInfo , reservationDetails
    });

    if (existingReservation) {
      return res.status(400).json({
        success: false,
        message:
          "You already have a reservation for this time slot.",
      });
    }

    const reservation = new Reservation({
      customerInfo,
      reservationDetails,
      note
    });

    await reservation.save();

    res.status(201).json({
      success: true,
      message: "Reservation created successfully",
      data: { reservation },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create reservation",
      error: error.message,
    });
  }
};

export const getReservationById = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findById(id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found",
      });
    }

    res.json({
      success: true,
      message: "Reservation fetched successfully",
      data: { reservation },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reservation",
      error: error.message,
    });
  }
};

export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
          .sort({ createdAt: -1 });
      if (!reservations || reservations.length === 0) {
          return res.status(404).json({
                success: false,
                message: "No reservations found",
              });
    }
    res.json({
        success: true,
        message: "Reservations fetched successfully",
      data: {
        reservations,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch reservations",
      error: error.message,
    });
  }
};


export const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const reservation = await Reservation.findByIdAndDelete(id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found",
      });
    }

    res.json({
      success: true,
      message: "Reservation deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete reservation",
      error: error.message,
    });
  }
};

export const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerInfo, reservationDetails, note } = req.body;

    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { customerInfo, reservationDetails, note },
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found",
      });
    }

    res.json({
      success: true,
      message: "Reservation updated successfully",
      data: { reservation },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update reservation",
      error: error.message,
    });
  }
};