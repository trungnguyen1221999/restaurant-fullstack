import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, ChefHat, Check } from "lucide-react";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import {
  reservationSchema,
  type ReservationFormData,
} from "@/schemas/reservationSchema";
import {
  getReservationById,
  updateReservationById,
} from "@/api/reservation.api";
import { PersonalInfoSection } from "@/components/booking/PersonalInfoSection";
import { BookingDetailsSection } from "@/components/booking/BookingDetailsSection";
import { SpecialRequestsSection } from "@/components/booking/SpecialRequestsSection";
import { TableSelectionSection } from "@/components/booking/TableSelectionSection";

interface EditReservationPopupProps {
  reservationId: string;
  setOpen: (open: boolean) => void;
  setIsUpdate: (b: boolean) => void;
  isUpdate: boolean;
}

const EditReservationPopup: React.FC<EditReservationPopupProps> = ({
  reservationId,
  setOpen,
  setIsUpdate,
  isUpdate,
}) => {
  const [selectedTable, setSelectedTable] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "12:00",
      guests: "2",
      tablePreference: "Standard Table",
      notes: "",
    },
    mode: "onChange",
  });

  // 🔹 Load reservation details
  const getReservationMutation = useMutation({
    mutationFn: async () => await getReservationById(reservationId),
    onSuccess: (data) => {
      const res = data.data.reservation;
      reset({
        name: res.customerInfo.name,
        email: res.customerInfo.email,
        phone: res.customerInfo.phone,
        date: res.reservationDetails.date.split("T")[0],
        time: res.reservationDetails.time,
        guests: res.reservationDetails.guests.toString(),
        tablePreference:
          res.reservationDetails.tablePreference || "Standard Table",
        notes: res.reservationDetails.notes || "",
      });
      setSelectedTable(
        res.reservationDetails.tablePreference || "Standard Table"
      );
    },
    onError: (err: any) => {
      toast.error("Failed to fetch reservation details: " + err.message);
    },
  });

  useEffect(() => {
    if (!reservationId) return;
    getReservationMutation.mutate();
  }, [reservationId]);

  // 🔹 Mutation update reservation
  const updateReservationMutation = useMutation({
    mutationFn: async (payload: any) =>
      updateReservationById(reservationId, payload),
    onSuccess: () => {
      toast.success("Reservation updated successfully");
      setIsUpdate(!isUpdate);
      setOpen(false);
    },
    onError: (err: any) => {
      toast.error("Failed to update reservation: " + err.message);
    },
  });

  const handleTableSelect = (tableId: string) => {
    setSelectedTable(tableId);
    setValue(
      "tablePreference",
      tableId as
        | "Intimate Corner"
        | "Standard Table"
        | "Family Table"
        | "Premium Booth",
      { shouldValidate: true }
    );
  };

  const onSubmit = (data: ReservationFormData) => {
    const payload = {
      customerInfo: {
        name: data.name,
        email: data.email,
        phone: data.phone,
      },
      reservationDetails: {
        date: data.date,
        time: data.time,
        guests: Number(data.guests),
        tablePreference: data.tablePreference,
      },
      notes: data.notes,
    };
    updateReservationMutation.mutate(payload);
  };

  // 🔹 Prevent scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex md:items-center justify-center max-h-screen overflow-y-auto"
      onClick={() => setOpen(false)}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-black/30 backdrop-blur-sm border border-border/50 rounded-2xl shadow-2xl w-full max-w-6xl mx-4 p-8 z-10 animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <ChefHat className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-white">Edit Reservation</h2>
          </div>
          <div
            onClick={() => setOpen(false)}
            className="p-2 hover:bg-gray-700/50 rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5 text-red-500" />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <PersonalInfoSection register={register} errors={errors} />
            <BookingDetailsSection register={register} errors={errors} />
            <SpecialRequestsSection register={register} errors={errors} />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-semibold py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                isSubmitting
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-lg hover:shadow-primary/25"
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Check className="w-5 h-5" />
                  Update Reservation
                </>
              )}
            </button>
          </form>

          {/* Table Section */}
          <TableSelectionSection
            selectedTable={selectedTable}
            onTableSelect={handleTableSelect}
            error={errors.tablePreference?.message}
          />
        </div>
      </div>
    </div>
  );
};

export default EditReservationPopup;
