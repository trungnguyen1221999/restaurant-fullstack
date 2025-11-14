import React from "react";
import { Check, Calendar, Clock, Users, MapPin, X } from "lucide-react";

interface ReservationDetails {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  tablePreference: string;
  notes?: string;
}

interface ReservationSuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  reservationDetails: ReservationDetails;
}

const ReservationSuccessPopup: React.FC<ReservationSuccessPopupProps> = ({
  isOpen,
  onClose,
  reservationDetails,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 border border-primary/30 rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in-95 duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center mb-4">
            <Check className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Reservation Confirmed!
          </h2>
          <p className="text-gray-300 text-sm">
            Your table has been successfully reserved
          </p>
        </div>

        {/* Reservation Details */}
        <div className="space-y-4 mb-6">
          <div className="bg-black/30 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Date & Time</p>
                <p className="text-white font-semibold">
                  {new Date(reservationDetails.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })} at {reservationDetails.time}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Party Size</p>
                <p className="text-white font-semibold">
                  {reservationDetails.guests} {reservationDetails.guests === 1 ? 'Guest' : 'Guests'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-gray-400 text-xs">Table Preference</p>
                <p className="text-white font-semibold">{reservationDetails.tablePreference}</p>
              </div>
            </div>
          </div>

          <div className="bg-black/30 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">Customer Information</h4>
            <div className="space-y-1 text-sm">
              <p className="text-gray-300">
                <span className="text-gray-400">Name:</span> {reservationDetails.name}
              </p>
              <p className="text-gray-300">
                <span className="text-gray-400">Email:</span> {reservationDetails.email}
              </p>
              <p className="text-gray-300">
                <span className="text-gray-400">Phone:</span> {reservationDetails.phone}
              </p>
            </div>
          </div>

          {reservationDetails.notes && (
            <div className="bg-black/30 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2">Special Requests</h4>
              <p className="text-gray-300 text-sm">{reservationDetails.notes}</p>
            </div>
          )}
        </div>

        {/* Important Notice */}
        <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <h4 className="text-white font-semibold mb-1">Important Reminder</h4>
              <p className="text-gray-300 text-sm">
                Please arrive <span className="text-primary font-semibold">10 minutes before</span> your reservation time to ensure a smooth seating process.
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full bg-primary hover:bg-primary/90 text-black font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
        >
          Got it, thanks!
        </button>
      </div>
    </div>
  );
};

export default ReservationSuccessPopup;
