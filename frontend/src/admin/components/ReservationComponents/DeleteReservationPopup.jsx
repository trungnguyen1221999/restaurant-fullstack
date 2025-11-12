import React, { useEffect, useRef, useState } from "react";
import { X, Trash2, AlertTriangle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  deleteReservationById,
  getReservationById,
} from "@/api/reservation.api";

const DeleteReservationPopup = ({
  reservationId,
  isOpen,
  onClose,
  setIsUpdate,
  isUpdate,
}) => {
  const modalRef = useRef(null);
  const [reservationName, setReservationName] = useState("");

  // Get reservation details
  const getReservationMutation = useMutation({
    mutationFn: async () => await getReservationById(reservationId),
    onSuccess: (data) => {
      const name = data.data?.reservation?.customerInfo?.name || "Unknown";
      setReservationName(name);
      setIsUpdate(!isUpdate);
    },
    onError: (err) => {
      toast.error("Failed to fetch reservation details: " + err.message);
    },
  });

  // Fetch reservation when popup opens
  useEffect(() => {
    if (isOpen && reservationId) {
      getReservationMutation.mutate();
    }
  }, [isOpen, reservationId]);

  // Handle click outside modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const handleConfirm = async () => {
    try {
      await deleteReservationById(reservationId);
      toast.success(`Reservation "${reservationName}" deleted successfully`);
      setIsUpdate(!isUpdate);
      onClose();
    } catch (err) {
      toast.error("Delete failed: " + err.message);
    }
  };

  if (!isOpen || !reservationId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-red-500/30 rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/20 rounded-lg border border-red-500/30">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                Delete Reservation
              </h2>
              <p className="text-sm text-gray-400">
                This action cannot be undone
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/30">
              <Trash2 className="w-8 h-8 text-red-400" />
            </div>

            <h3 className="text-lg font-semibold text-white mb-2">
              Are you sure you want to delete this reservation?
            </h3>

            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50 mb-4">
              <p className="text-amber-400 font-medium text-lg">
                {reservationName || "Loading..."}
              </p>
            </div>

            <p className="text-red-400 text-sm">
              This will permanently delete the reservation and all associated
              data.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-gray-300 font-medium hover:bg-gray-600/50 hover:text-white transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-red-500/25"
            >
              <Trash2 className="w-4 h-4" />
              Yes, Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteReservationPopup;
