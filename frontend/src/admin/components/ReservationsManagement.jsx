import React, { useEffect, useState } from "react";
import {
  Plus,
  Calendar,
  Clock,
  Users,
  Phone,
  Edit,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { getAllReservations } from "@/api/reservation.api";
import DeleteReservationPopup from "./ReservationComponents/DeleteReservationPopup";
import AddReservationPopup from "./ReservationComponents/AddReservationPopup";

const ReservationsManagement = () => {
  const [reservations, setReservations] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState("All");
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);

  const getAllReservationsMutaion = useMutation({
    mutationFn: async () => await getAllReservations(),
    onSuccess: (data) => {
      setReservations(data.data.reservations);
      toast.success("Reservations loaded successfully");
    },
    onError: (error) => {
      toast.error("Failed to load reservations");
    },
  });

  useEffect(() => {
    getAllReservationsMutaion.mutate();
  }, [isUpdate]);

  return (
    <div className="p-6 space-y-8 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">
            Reservations Management
          </h1>
          <p className="text-gray-400 text-sm">
            Manage customer reservations efficiently
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2 bg-[var(--primary)] text-black font-semibold rounded-lg shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-200"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden md:inline">Add Reservation</span>
        </button>
      </div>

      {/* Reservations List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reservations.map((reservation) => (
          <div
            key={reservation._id}
            className="bg-gray-800 border border-gray-700 rounded-lg p-5 hover:bg-gray-700 transition-colors duration-200 relative"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              {/* Customer Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-semibold text-white">
                    {reservation.customerInfo.name}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    {reservation.customerInfo.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    {new Date(
                      reservation.reservationDetails.date
                    ).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    {reservation.reservationDetails.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    {reservation.reservationDetails.guests} guests
                  </div>
                </div>

                {reservation.reservationDetails.tablePreference && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-400">
                      <span className="font-medium text-gray-300">
                        Table preference:
                      </span>{" "}
                      {reservation.reservationDetails.tablePreference}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 absolute top-5 right-5">
                <button
                  onClick={() => {
                    setSelectedReservation(reservation._id);
                    setShowEditPopup(true);
                  }}
                  className="flex items-center gap-1 px-3 py-2 bg-primary text-black text-sm font-medium rounded-lg hover:opacity-90 transition-colors duration-200"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    setSelectedReservation(reservation._id);
                    setShowDeletePopup(true);
                  }}
                  className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {reservations.length === 0 && (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-10 h-10 text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-3">
            No reservations found
          </h3>
          <p className="text-gray-400">
            Try adjusting your search terms or add a new reservation.
          </p>
        </div>
      )}
      {/* Modals */}
      {showDeletePopup && (
        <DeleteReservationPopup
          reservationId={selectedReservation}
          isOpen={showDeletePopup}
          onClose={() => setShowDeletePopup(false)}
          setIsUpdate={setIsUpdate}
          isUpdate={isUpdate}
        />
      )}
      {showAddModal && (
        <AddReservationPopup
          setIsUpdate={setIsUpdate}
          isUpdate={isUpdate}
          setOpen={setShowAddModal}
          isOpen={showAddModal}
        />
      )}
      {/* {showEditPopup && (
        <EditReservationPopup
          setIsUpdate={setIsUpdate}
          isUpdate={isUpdate}
          setOpen={setShowEditPopup}
          reservationId={selectedReservation}
        />
      )}  */}
    </div>
  );
};

export default ReservationsManagement;
