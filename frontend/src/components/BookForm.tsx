import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChefHat, Check } from "lucide-react";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

// Import schema and types
import {
  reservationSchema,
  type ReservationFormData,
} from "../schemas/reservationSchema";

// Import component sections
import { BookingHeader } from "./booking/BookingHeader";
import { PersonalInfoSection } from "./booking/PersonalInfoSection";
import { BookingDetailsSection } from "./booking/BookingDetailsSection";
import { SpecialRequestsSection } from "./booking/SpecialRequestsSection";
import { TableSelectionSection } from "./booking/TableSelectionSection";

import { createReservation } from "@/api/reservation.api";

const BookForm = () => {
  const [selectedTable, setSelectedTable] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "12:00",
      guests: "2",
      specialRequests: "",
      tableType: "",
    },
    mode: "onChange",
  });

  const reservationMutation = useMutation({
    mutationFn: async (payload: any) => await createReservation(payload),
    onSuccess: () => {
      toast.success("Reservation submitted successfully!");
      reset();
      setSelectedTable("");
    },
    onError: (err: any) => {
      toast.error("Failed to submit reservation: " + err.message);
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
        guests: Number(data.guests),
        tableType: data.tableType,
        specialRequests: data.specialRequests,
      },
    };

    reservationMutation.mutate(payload);
  };

  return (
    <section id="book" className="bg-background py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <BookingHeader />

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Booking Form */}
            <div className="bg-black/40 backdrop-blur-sm border border-border/50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <ChefHat className="w-6 h-6 text-primary" />
                <h3 className="text-2xl font-bold text-white">
                  Reservation Details
                </h3>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Information */}
                <PersonalInfoSection register={register} errors={errors} />

                {/* Booking Details */}
                <BookingDetailsSection register={register} errors={errors} />

                {/* Special Requests */}
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
            </div>

            {/* Table Selection */}
            <div>
              <TableSelectionSection
                selectedTable={selectedTable}
                onTableSelect={handleTableSelect}
                error={errors.tableType?.message}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookForm;
