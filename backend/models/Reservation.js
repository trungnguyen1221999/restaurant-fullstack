import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    customerInfo: {
      name: {
        type: String,
        required: [true, "Customer name is required"],
        trim: true,
        maxlength: [100, "Name cannot exceed 100 characters"],
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        match: [
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          "Please enter a valid email",
        ],
      },
      phone: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true,
        match: [/^[\d\s\-\+\(\)]+$/, "Please enter a valid phone number"],
      },
    },
    reservationDetails: {
      date: {
        type: Date,
        required: [true, "Reservation date is required"],
      },
      time: {
        type: String,
        required: [true, "Reservation time is required"],
        match: [
          /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
          "Please enter time in HH:MM format",
        ],
      },
      guests: {
        type: Number,
        required: [true, "Number of guests is required"],
        min: [1, "At least 1 guest is required"],
        max: [20, "Maximum 20 guests allowed"],
      },
      tablePreference: {
        type: String,
        enum: ["Intimate Corner", "Standard Table", "Family Table", "Premium Booth"],
      },
    },
    
    notes: {
      type: String,
      maxlength: [1000, "Notes cannot exceed 1000 characters"],
    },
  },
  {
    timestamps: true,
  }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

export default Reservation;
