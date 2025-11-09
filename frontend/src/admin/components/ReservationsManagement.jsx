import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Calendar,
  Clock,
  Users,
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import toast from "react-hot-toast";

const ReservationsManagement = () => {
  const [reservations, setReservations] = useState([
    {
      id: 1,
      customerName: "John Doe",
      email: "john@example.com",
      phone: "+1 234-567-8900",
      date: "2024-11-10",
      time: "19:00",
      guests: 4,
      status: "confirmed",
      specialRequests: "Window table preferred",
      createdAt: "2024-11-08T10:30:00Z",
    },
    {
      id: 2,
      customerName: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 234-567-8901",
      date: "2024-11-10",
      time: "20:30",
      guests: 2,
      status: "pending",
      specialRequests: "",
      createdAt: "2024-11-09T14:15:00Z",
    },
    {
      id: 3,
      customerName: "Mike Johnson",
      email: "mike@example.com",
      phone: "+1 234-567-8902",
      date: "2024-11-11",
      time: "18:00",
      guests: 6,
      status: "confirmed",
      specialRequests: "Birthday celebration",
      createdAt: "2024-11-07T16:45:00Z",
    },
    {
      id: 4,
      customerName: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+1 234-567-8903",
      date: "2024-11-09",
      time: "19:30",
      guests: 3,
      status: "cancelled",
      specialRequests: "",
      createdAt: "2024-11-06T09:20:00Z",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const statusOptions = [
    "all",
    "pending",
    "confirmed",
    "cancelled",
    "completed",
  ];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      setReservations(reservations.filter((res) => res.id !== id));
      toast.success("Reservation deleted successfully!");
    }
  };

  const handleStatusUpdate = (id, newStatus) => {
    setReservations(
      reservations.map((res) =>
        res.id === id ? { ...res, status: newStatus } : res
      )
    );
    toast.success(`Reservation ${newStatus}!`);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-400" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-blue-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "text-green-400 bg-green-400/10";
      case "pending":
        return "text-yellow-400 bg-yellow-400/10";
      case "cancelled":
        return "text-red-400 bg-red-400/10";
      case "completed":
        return "text-blue-400 bg-blue-400/10";
      default:
        return "text-gray-400 bg-gray-400/10";
    }
  };

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.customerName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      reservation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reservation.phone.includes(searchTerm);
    const matchesStatus =
      statusFilter === "all" || reservation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2024-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Reservations Management
          </h1>
          <p className="text-gray-400">Manage customer reservations</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--primary)] text-black font-semibold rounded-xl hover:scale-105 transition-all duration-200">
          <Plus className="w-4 h-4" />
          Add Reservation
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search reservations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
          />
        </div>

        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status} className="bg-black">
                {status === "all"
                  ? "All Status"
                  : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reservations List */}
      <div className="space-y-4">
        {filteredReservations.map((reservation) => (
          <div
            key={reservation.id}
            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-200"
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Customer Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-white">
                    {reservation.customerName}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(
                      reservation.status
                    )}`}
                  >
                    {getStatusIcon(reservation.status)}
                    {reservation.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3" />
                    {reservation.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {formatDate(reservation.date)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    {formatTime(reservation.time)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3" />
                    {reservation.guests} guests
                  </div>
                </div>

                {reservation.specialRequests && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">
                      <span className="font-medium">Special requests:</span>{" "}
                      {reservation.specialRequests}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2">
                {reservation.status === "pending" && (
                  <>
                    <button
                      onClick={() =>
                        handleStatusUpdate(reservation.id, "confirmed")
                      }
                      className="px-4 py-2 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg hover:bg-green-500/20 transition-all duration-200"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() =>
                        handleStatusUpdate(reservation.id, "cancelled")
                      }
                      className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 transition-all duration-200"
                    >
                      Cancel
                    </button>
                  </>
                )}

                {reservation.status === "confirmed" && (
                  <button
                    onClick={() =>
                      handleStatusUpdate(reservation.id, "completed")
                    }
                    className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-all duration-200"
                  >
                    Complete
                  </button>
                )}

                <button className="px-4 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200 flex items-center gap-2">
                  <Edit className="w-3 h-3" />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(reservation.id)}
                  className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 transition-all duration-200"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredReservations.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            No reservations found
          </h3>
          <p className="text-gray-400">
            Try adjusting your search terms or add a new reservation.
          </p>
        </div>
      )}
    </div>
  );
};

export default ReservationsManagement;
