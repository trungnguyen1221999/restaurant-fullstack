import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChefHat, Check, X } from "lucide-react";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import { createReservation } from "@/api/reservation.api";
import { PersonalInfoSection } from "@/components/booking/PersonalInfoSection";
import { BookingDetailsSection } from "@/components/booking/BookingDetailsSection";
import { SpecialRequestsSection } from "@/components/booking/SpecialRequestsSection";
import { TableSelectionSection } from "@/components/booking/TableSelectionSection";
import {
  reservationSchema,
  type ReservationFormData,
} from "@/schemas/reservationSchema";

interface AddReservationPopupProps {
  setOpen: (open: boolean) => void;
  setIsUpdate: (b: boolean) => void;
  isUpdate: boolean;
}

const AddReservationPopup: React.FC<AddReservationPopupProps> = ({
  setOpen,
  setIsUpdate,
  isUpdate,
}) => {
  const [selectedTable, setSelectedTable] = useState<string>("");

  // 🟢 useForm chuẩn TS
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
      date: "", // string, để rỗng
      time: "12:00", // mặc định hợp lệ HH:MM
      guests: "2",
      tableType: "",
      specialRequests: "",
    },
    mode: "onChange",
  });

  // 🟢 Mutation tạo reservation
  const reservationMutation = useMutation({
    mutationFn: (payload: any) => createReservation(payload),
    onSuccess: () => {
      toast.success("Reservation created successfully");
      setIsUpdate(!isUpdate);
      reset();
      setSelectedTable("");
      setOpen(false);
    },
    onError: (err: any) => {
      toast.error("Failed to create reservation: " + err.message);
    },
  });

  const handleTableSelect = (tableId: string) => {
    setSelectedTable(tableId);
    setValue("tableType", tableId, { shouldValidate: true });
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
        guests: data.guests,
        tableType: data.tableType,
        specialRequests: data.specialRequests,
      },
    };
    reservationMutation.mutate(payload);
  };

  // 🔹 Ngăn scroll khi popup mở
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // 🔹 Click ra ngoài để đóng popup
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Popup */}
      <div className="relative bg-black/30 backdrop-blur-sm border border-border/50 rounded-2xl shadow-2xl w-full max-w-6xl mx-4 p-8 z-10 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <ChefHat className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-white">
              Reservation Details
            </h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-2 hover:text-red-500 hover:bg-gray-700/50 rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5 text-white" />
          </button>
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
                  Confirm Reservation
                </>
              )}
            </button>
          </form>

          {/* Table Selection */}
          <TableSelectionSection
            selectedTable={selectedTable}
            onTableSelect={handleTableSelect}
            error={errors.tableType?.message}
          />
        </div>
      </div>
    </div>
  );
};

export default AddReservationPopup;
