import * as z from "zod";

/**
 * Zod validation schema for restaurant reservation
 */
export const reservationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(8, "Phone number must be at least 8 digits"), // bớt strict regex
  date: z.string().min(1, "Date is required"),
  time: z
    .string()
    .regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Time must be in HH:MM format"),
  guests: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "At least one guest is required",
  }),
  tablePreference: z.enum([
    "Intimate Corner",
    "Standard Table",
    "Family Table",
    "Premium Booth",
  ]),
  notes: z.string().optional(),
});

export type ReservationFormData = z.infer<typeof reservationSchema>;
