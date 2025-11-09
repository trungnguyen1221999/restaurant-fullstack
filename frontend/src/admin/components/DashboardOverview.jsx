import React from "react";
import {
  Users,
  Calendar,
  UtensilsCrossed,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Menu
} from "lucide-react";

const DashboardOverview = () => {
  const stats = [
    {
      id: 1,
      title: "Total Reservations",
      value: "248",
      change: "+12%",
      trend: "up",
      icon: Calendar,
      color: "text-blue-400",
    },
    {
      id: 2,
      title: "Menu Items",
      value: "89",
      change: "+5%",
      trend: "up",
      icon: UtensilsCrossed,
      color: "text-green-400",
    },
    {
      id: 3,
      title: "Categories",
      value: "1,234",
      change: "+8%",
      trend: "up",
      icon: Menu,
      color: "text-purple-400",
    },
    
  ];

  const recentReservations = [
    {
      id: 1,
      customer: "John Doe",
      time: "7:00 PM",
      date: "Today",
      guests: 4,
    },
    {
      id: 2,
      customer: "Jane Smith",
      time: "8:30 PM",
      date: "Today",
      guests: 2,
    },
    {
      id: 3,
      customer: "Mike Johnson",
      time: "6:00 PM",
      date: "Tomorrow",
      guests: 6,
    },
    {
      id: 4,
      customer: "Sarah Wilson",
      time: "7:30 PM",
      date: "Tomorrow",
      guests: 3,
    },
  ];



  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-400">
          Welcome back! Here's what's happening at your restaurant.
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
                <div className={`p-2 rounded-lg bg-gray-700 ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-green-400 text-sm font-medium">
                  {stat.change}
                </span>
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
            <button className="text-black text-sm font-medium hover:underline">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="flex items-center justify-between p-4 bg-gray-700 rounded-lg border border-gray-600"
              >
                <div className="flex items-center gap-3">
               
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
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">
            Quick Actions
          </h2>

          <div className="space-y-4">
            <button className="w-full flex items-center gap-3 p-4 bg-primary/10 border border-primary/20 rounded-lg text-primary hover:bg-primary/20 transition-all duration-200">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Add New Reservation</span>
            </button>

            <button className="w-full flex items-center gap-3 p-4 bg-gray-700 border border-gray-600 rounded-lg text-white hover:bg-gray-600 transition-all duration-200">
              <UtensilsCrossed className="w-5 h-5" />
              <span className="font-medium">Add Menu Item</span>
            </button>

            <button className="w-full flex items-center gap-3 p-4 bg-gray-700 border border-gray-600 rounded-lg text-white hover:bg-gray-600 transition-all duration-200">
              <Users className="w-5 h-5" />
              <span className="font-medium">Manage Users</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
