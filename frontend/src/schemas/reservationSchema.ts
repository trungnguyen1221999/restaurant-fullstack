import * as z from "zod";

/**
 * Zod validation schema for restaurant reservation
 */
export const reservationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  guests: z.string().min(1, "Please select number of guests"),
  specialRequests: z
    .string()
    .max(500, "Special requests must be less than 500 characters")
    .optional(),
  tableType: z.string().min(1, "Please select a table type"),
});

export type ReservationFormData = z.infer<typeof reservationSchema>;
