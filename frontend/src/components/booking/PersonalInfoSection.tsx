import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { User, Mail, Phone } from "lucide-react";
import type { ReservationFormData } from "../../schemas/reservationSchema";
import { ErrorMessage } from "../ui/ErrorMessage";

interface PersonalInfoSectionProps {
  register: UseFormRegister<ReservationFormData>;
  errors: FieldErrors<ReservationFormData>;
}

export const PersonalInfoSection = ({
  register,
  errors,
}: PersonalInfoSectionProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Name Field */}
      <div className="space-y-2">
        <label className="text-white font-medium flex items-center gap-2">
          <User className="w-4 h-4 text-primary" />
          Full Name *
        </label>
        <input
          type="text"
          {...register("name")}
          className={`w-full bg-black/60 border rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none transition-colors ${
            errors.name
              ? "border-red-500 focus:border-red-400"
              : "border-border focus:border-primary"
          }`}
          placeholder="Enter your full name"
        />
        <ErrorMessage message={errors.name?.message} />
      </div>

      {/* Email Field */}
      <div className="space-y-2">
        <label className="text-white font-medium flex items-center gap-2">
          <Mail className="w-4 h-4 text-primary" />
          Email Address *
        </label>
        <input
          type="email"
          {...register("email")}
          className={`w-full bg-black/60 border rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none transition-colors ${
            errors.email
              ? "border-red-500 focus:border-red-400"
              : "border-border focus:border-primary"
          }`}
          placeholder="your.email@example.com"
        />
        <ErrorMessage message={errors.email?.message} />
      </div>

      {/* Phone Field - Full Width */}
      <div className="md:col-span-2 space-y-2">
        <label className="text-white font-medium flex items-center gap-2">
          <Phone className="w-4 h-4 text-primary" />
          Phone Number *
        </label>
        <input
          type="tel"
          {...register("phone")}
          className={`w-full bg-black/60 border rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none transition-colors ${
            errors.phone
              ? "border-red-500 focus:border-red-400"
              : "border-border focus:border-primary"
          }`}
          placeholder="+1 (555) 123-4567"
        />
        <ErrorMessage message={errors.phone?.message} />
      </div>
    </div>
  );
};
