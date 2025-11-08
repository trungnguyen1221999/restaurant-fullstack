import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { Calendar, Clock, Users, ChevronDown } from "lucide-react";
import type { ReservationFormData } from "../../schemas/reservationSchema";
import { ErrorMessage } from "../ui/ErrorMessage";
import {
  generateAvailableDates,
  generateTimeSlots,
} from "../../utils/dateUtils";
import { GUEST_OPTIONS } from "../../constants/bookingConstants";

interface BookingDetailsSectionProps {
  register: UseFormRegister<ReservationFormData>;
  errors: FieldErrors<ReservationFormData>;
}

export const BookingDetailsSection = ({
  register,
  errors,
}: BookingDetailsSectionProps) => {
  const availableDates = generateAvailableDates();
  const timeSlots = generateTimeSlots();

  return (
    <>
      {/* Date and Time Selection */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Date Selection */}
        <div className="space-y-2">
          <label className="text-white font-medium flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            Select Date *
          </label>
          <div className="relative">
            <select
              {...register("date")}
              className={`w-full bg-black/60 border rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 appearance-none cursor-pointer hover:border-primary/50 ${
                errors.date
                  ? "border-red-500 focus:border-red-400"
                  : "border-border focus:border-primary"
              }`}
            >
              <option value="" className="bg-black text-white/60">
                Choose a date
              </option>
              {availableDates.map((date) => (
                <option
                  key={date.value}
                  value={date.value}
                  className="bg-black text-white"
                >
                  {date.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary pointer-events-none" />
          </div>
          <ErrorMessage message={errors.date?.message} />
        </div>

        {/* Time Selection */}
        <div className="space-y-2">
          <label className="text-white font-medium flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Select Time *
          </label>
          <div className="relative">
            <select
              {...register("time")}
              className={`w-full bg-black/60 border rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 appearance-none cursor-pointer hover:border-primary/50 ${
                errors.time
                  ? "border-red-500 focus:border-red-400"
                  : "border-border focus:border-primary"
              }`}
            >
              <option value="" className="bg-black text-white/60">
                Choose time
              </option>
              {timeSlots.map((time) => (
                <option key={time} value={time} className="bg-black text-white">
                  {time}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary pointer-events-none" />
          </div>
          <ErrorMessage message={errors.time?.message} />
        </div>
      </div>

      {/* Guests Selection */}
      <div className="space-y-2">
        <label className="text-white font-medium flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          Number of Guests *
        </label>
        <div className="relative">
          <select
            {...register("guests")}
            className={`w-full bg-black/60 border rounded-lg px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300 appearance-none cursor-pointer hover:border-primary/50 ${
              errors.guests
                ? "border-red-500 focus:border-red-400"
                : "border-border focus:border-primary"
            }`}
          >
            {GUEST_OPTIONS.map((num) => (
              <option key={num} value={num} className="bg-black text-white">
                {num} {num === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary pointer-events-none" />
        </div>
        <ErrorMessage message={errors.guests?.message} />
      </div>
    </>
  );
};
