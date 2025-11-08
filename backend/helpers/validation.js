// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

// Phone validation
export const validatePhone = (phone) => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.length >= 10;
};

// Password strength validation
export const validatePassword = (password) => {
  const minLength = 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);

  return {
    isValid:
      password.length >= minLength &&
      hasLowerCase &&
      (hasUpperCase || hasNumbers),
    minLength: password.length >= minLength,
    hasLowerCase,
    hasUpperCase,
    hasNumbers,
    score: [
      password.length >= minLength,
      hasLowerCase,
      hasUpperCase,
      hasNumbers,
      password.length >= 8,
    ].filter(Boolean).length,
  };
};

// Date validation (must be in the future)
export const validateFutureDate = (date) => {
  const inputDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return inputDate >= today;
};

// Time validation (HH:MM format and within business hours)
export const validateTime = (time) => {
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(time)) {
    return {
      isValid: false,
      message: "Invalid time format. Use HH:MM format.",
    };
  }

  const [hours, minutes] = time.split(":").map(Number);
  const timeInMinutes = hours * 60 + minutes;

  // Business hours: 11:00 AM to 11:00 PM
  const openTime = 11 * 60; // 11:00 AM
  const closeTime = 23 * 60; // 11:00 PM

  if (timeInMinutes < openTime || timeInMinutes > closeTime) {
    return {
      isValid: false,
      message: "Reservations are only available between 11:00 AM and 11:00 PM.",
    };
  }

  return { isValid: true };
};

// Sanitize string input
export const sanitizeString = (str) => {
  if (typeof str !== "string") return "";
  return str.trim().replace(/[<>]/g, "");
};

// Validation middleware for request body
export const validateReservation = (req, res, next) => {
  const { customerInfo, reservationDetails } = req.body;
  const errors = [];

  // Validate customer info
  if (!customerInfo?.name || customerInfo.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters long");
  }

  if (!customerInfo?.email || !validateEmail(customerInfo.email)) {
    errors.push("Valid email is required");
  }

  if (!customerInfo?.phone || !validatePhone(customerInfo.phone)) {
    errors.push("Valid phone number is required");
  }

  // Validate reservation details
  if (
    !reservationDetails?.date ||
    !validateFutureDate(reservationDetails.date)
  ) {
    errors.push("Reservation date must be today or in the future");
  }

  if (!reservationDetails?.time) {
    errors.push("Reservation time is required");
  } else {
    const timeValidation = validateTime(reservationDetails.time);
    if (!timeValidation.isValid) {
      errors.push(timeValidation.message);
    }
  }

  if (
    !reservationDetails?.guests ||
    reservationDetails.guests < 1 ||
    reservationDetails.guests > 20
  ) {
    errors.push("Number of guests must be between 1 and 20");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  // Sanitize inputs
  req.body.customerInfo.name = sanitizeString(customerInfo.name);
  req.body.customerInfo.email = customerInfo.email.toLowerCase().trim();
  req.body.customerInfo.phone = sanitizeString(customerInfo.phone);

  if (req.body.specialRequests) {
    req.body.specialRequests = sanitizeString(req.body.specialRequests);
  }

  next();
};
