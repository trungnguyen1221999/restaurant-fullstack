import { Calendar, Star, Clock, MapPin } from "lucide-react";
import { RESTAURANT_INFO } from "../../constants/bookingConstants";

export const BookingHeader = () => {
  return (
    <div className="text-center mb-16">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Calendar className="w-8 h-8 text-primary" />
        <h2 className="text-5xl font-bold text-primary">Reserve Your Table</h2>
        <Calendar className="w-8 h-8 text-primary" />
      </div>
      <p className="text-white text-lg max-w-2xl mx-auto">
        Experience exceptional dining at KAI Restaurant. Book your table for an
        unforgettable culinary journey.
      </p>

      {/* Quick Stats */}
      <div className="flex flex-wrap justify-center gap-8 mt-8">
        <div className="flex items-center gap-2 text-white/60">
          <Star className="w-5 h-5 text-primary fill-current" />
          <span className="font-semibold">{RESTAURANT_INFO.rating}</span>
          <span className="text-sm">{RESTAURANT_INFO.reviewCount}</span>
        </div>
        <div className="flex items-center gap-2 text-white/60">
          <Clock className="w-5 h-5 text-primary" />
          <span className="text-sm">{RESTAURANT_INFO.averageDining}</span>
        </div>
        <div className="flex items-center gap-2 text-white/60">
          <MapPin className="w-5 h-5 text-primary" />
          <span className="text-sm">{RESTAURANT_INFO.location}</span>
        </div>
      </div>
    </div>
  );
};
