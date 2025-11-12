import React, { useEffect, useState } from "react";
import {
  Users,
  Calendar,
  UtensilsCrossed,
  Menu,
  Filter,
  RotateCcw,
} from "lucide-react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { getAllReservations } from "@/api/reservation.api";
import { getAllMenus } from "@/api/menu.api";
import { getAllCategories } from "@/api/category.api";
import { useNavigate } from "react-router-dom";
import AddMenuPopup from "./AddMenuPopup";
import AddCategoryPopup from "./AddCategoryPopup";
import AddReservationPopup from "./ReservationComponents/AddReservationPopup";

const DashboardOverview = () => {
  const [reservations, setReservations] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddReservation, setShowAddReservation] = useState(false);
  const navigate = useNavigate();
  const [isUpdate, setIsUpdate] = useState(false);

  // ✅ Lấy danh sách reservation thật
  const getAllReservationsMutation = useMutation({
    mutationFn: async () => await getAllReservations(),
    onSuccess: (data) => {
      const res = data.data.reservations;
      setReservations(res);
    },
    onError: () => toast.error("Failed to load reservations"),
  });
  // ✅ Lấy danh sách menu thật
  const getAllMenusMutation = useMutation({
    mutationFn: async () => await getAllMenus(),
    onSuccess: (data) => {
      const res = data.data.menuItems;
      setMenuItems(res);
    },
    onError: () => toast.error("Failed to load reservations"),
  });

  // ✅ Lấy danh sách category thật
  const getAllCategoriesMutation = useMutation({
    mutationFn: async () => await getAllCategories(),
    onSuccess: (data) => {
      const res = data.data.categories;
      setCategories(res);
    },
    onError: () => toast.error("Failed to load reservations"),
  });

  useEffect(() => {
    getAllReservationsMutation.mutate();
    getAllMenusMutation.mutate();
    getAllCategoriesMutation.mutate();
  }, [isUpdate]);

  // ✅ Tính toán số liệu thống kê thật
  const stats = [
    {
      id: 1,
      title: "Total Reservations",
      value: reservations.length.toLocaleString(),
      icon: Calendar,
      color: "text-blue-400",
    },
    {
      id: 2,
      title: "Menu Items",
      value: menuItems.length ? menuItems.length.toLocaleString() : "—",
      icon: UtensilsCrossed,
      color: "text-green-400",
    },
    {
      id: 3,
      title: "Categories",
      value: categories.length ? categories.length.toLocaleString() : "—",
      icon: Menu,
      color: "text-purple-400",
    },
  ];

  // ✅ Lấy 4 đơn đặt bàn gần nhất
  const recentReservations = reservations
    .slice(-4)
    .reverse()
    .map((r) => ({
      id: r._id,
      customer: r.customerInfo.name,
      phone: r.customerInfo.phone,
      time: r.reservationDetails.time,
      date: new Date(r.reservationDetails.date).toLocaleDateString(),
      guests: r.reservationDetails.guests,
    }));

  return (
    <div className="p-6 space-y-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-400">
          Welcome back! Here’s the latest overview of your restaurant activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:bg-gray-750 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-2 rounded-lg bg-gray-700 ${stat.color} flex items-center justify-center`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-400 text-sm">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reservations */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">
              Recent Reservations
            </h2>
            <button
              onClick={() => navigate("/admin/dashboard/reservations")}
              className="text-black text-sm font-medium hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentReservations.length > 0 ? (
              recentReservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="flex items-center justify-between p-4 bg-gray-700 rounded-lg border border-gray-600 hover:bg-gray-650 transition-all"
                >
                  <div>
                    <p className="text-white font-medium">
                      {reservation.customer}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {reservation.date} • {reservation.time} •{" "}
                      {reservation.guests} guests
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">
                No recent reservations found.
              </p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">
            Quick Actions
          </h2>

          <div className="space-y-4">
            <button
              onClick={() => setShowAddReservation(true)}
              className="w-full flex items-center gap-3 p-4 bg-primary/10 border border-primary/20 rounded-lg text-primary hover:bg-primary/20 transition-all duration-200"
            >
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Add New Reservation</span>
            </button>

            <button
              onClick={() => setShowAddMenu(true)}
              className="w-full flex items-center gap-3 p-4 bg-gray-700 border border-gray-600 rounded-lg text-white hover:bg-gray-600 transition-all duration-200"
            >
              <UtensilsCrossed className="w-5 h-5" />
              <span className="font-medium">Add New Menu</span>
            </button>

            <button
              onClick={() => setShowAddCategory(true)}
              className="w-full flex items-center gap-3 p-4 bg-gray-700 border border-gray-600 rounded-lg text-white hover:bg-gray-600 transition-all duration-200"
            >
              <Users className="w-5 h-5" />
              <span className="font-medium">Add New Category</span>
            </button>
          </div>
        </div>
      </div>
      {showAddMenu && (
        <AddMenuPopup
          setIsUpdate={setIsUpdate}
          isUpdate={isUpdate}
          setOpen={setShowAddMenu}
        />
      )}
      {showAddCategory && (
        <AddCategoryPopup
          setIsUpdate={setIsUpdate}
          isUpdate={isUpdate}
          setOpen={setShowAddCategory}
        />
      )}
      {showAddReservation && (
        <AddReservationPopup
          setIsUpdate={setIsUpdate}
          isUpdate={isUpdate}
          setOpen={setShowAddReservation}
          isOpen={showAddReservation}
        />
      )}
    </div>
  );
};

export default DashboardOverview;
