import Reservation from "../models/Reservation.js";

// @desc    Create new reservation
// @route   POST /api/reservations
// @access  Public
export const createReservation = async (req, res) => {
  try {
    const { customerInfo, reservationDetails, specialRequests } = req.body;

    // Check if the selected date/time is available
    const existingReservation = await Reservation.findOne({
      "reservationDetails.date": reservationDetails.date,
      "reservationDetails.time": reservationDetails.time,
    });

    if (existingReservation) {
      return res.status(400).json({
        success: false,
        message:
          "This time slot is already booked. Please choose a different time.",
      });
    }

    const reservation = new Reservation({
      customerInfo,
      reservationDetails,
      specialRequests,
      createdBy: req.user?.userId || null,
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

// @desc    Get all reservations (Admin only)
// @route   GET /api/reservations
// @access  Private/Admin
export const getAllReservations = async (req, res) => {
  try {
    const { status, date, limit = 10, page = 1 } = req.query;

    const query = {};
    if (status) query.status = status;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query["reservationDetails.date"] = {
        $gte: startDate,
        $lt: endDate,
      };
    }

    const reservations = await Reservation.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate("createdBy", "username email");

    const total = await Reservation.countDocuments(query);

    res.json({
      success: true,
      data: {
        reservations,
        pagination: {
          current: page,
          total: Math.ceil(total / limit),
          count: reservations.length,
          totalRecords: total,
        },
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



// @desc    Delete reservation
// @route   DELETE /api/reservations/:id
// @access  Private/Admin
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
