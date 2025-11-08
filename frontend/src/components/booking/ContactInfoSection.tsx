import { Phone, Mail, Clock } from "lucide-react";
import { RESTAURANT_INFO } from "../../constants/bookingConstants";

export const ContactInfoSection = () => {
  return (
    <div className="bg-black/40 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Phone className="w-5 h-5 text-primary" />
        Need Help?
      </h3>
      <div className="space-y-3 text-white/70">
        <div className="flex items-center gap-3">
          <Phone className="w-4 h-4 text-primary" />
          <span>Call us: {RESTAURANT_INFO.phone}</span>
        </div>
        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-primary" />
          <span>Email: {RESTAURANT_INFO.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <Clock className="w-4 h-4 text-primary" />
          <span>{RESTAURANT_INFO.bookingHours}</span>
        </div>
      </div>
    </div>
  );
};
