import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChefHat, Check } from "lucide-react";

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

const BookForm = () => {
  const [selectedTable, setSelectedTable] = useState("");

  // React Hook Form setup
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
      time: "",
      guests: "2",
      specialRequests: "",
      tableType: "",
    },
    mode: "onChange", // Validate on change for real-time feedback
  });

  // Handle table selection
  const handleTableSelect = (tableId: string) => {
    setSelectedTable(tableId);
    setValue("tableType", tableId, { shouldValidate: true });
  };

  // Form submission handler
  const onSubmit = async (data: ReservationFormData) => {
    try {
      console.log("Reservation submitted:", data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Success notification (you can replace with toast)
      alert("Reservation submitted successfully!");

      // Reset form
      reset();
      setSelectedTable("");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit reservation. Please try again.");
    }
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
