import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { MessageSquare } from "lucide-react";
import type { ReservationFormData } from "../../schemas/reservationSchema";
import { ErrorMessage } from "../ui/ErrorMessage";

interface SpecialRequestsSectionProps {
  register: UseFormRegister<ReservationFormData>;
  errors: FieldErrors<ReservationFormData>;
}

export const SpecialRequestsSection = ({
  register,
  errors,
}: SpecialRequestsSectionProps) => {
  return (
    <div className="space-y-2">
      <label className="text-white font-medium flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-primary" />
        Special Requests (Optional)
      </label>
      <textarea
        {...register("specialRequests")}
        rows={3}
        className={`w-full bg-black/60 border rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none transition-colors resize-none ${
          errors.specialRequests
            ? "border-red-500 focus:border-red-400"
            : "border-border focus:border-primary"
        }`}
        placeholder="Dietary restrictions, celebrations, accessibility needs..."
      />
      <ErrorMessage message={errors.specialRequests?.message} />
    </div>
  );
};
