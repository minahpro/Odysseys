"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Package,
  MapPin,
  Calendar,
  DollarSign,
  MessageSquare,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Star,
} from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 245,
    totalRevenue: 125000,
    totalUsers: 1250,
    totalPackages: 15,
    monthlyGrowth: 12.5,
    pendingMessages: 8,
    activeDestinations: 12,
    averageRating: 4.8,
  });

  const recentBookings = [
    {
      id: 1,
      customer: "John Smith",
      package: "Serengeti Safari",
      amount: 2500,
      status: "confirmed",
      date: "2024-01-15",
      avatar: "JS",
    },
    {
      id: 2,
      customer: "Emma Johnson",
      package: "Kilimanjaro Trek",
      amount: 3200,
      status: "pending",
      date: "2024-01-14",
      avatar: "EJ",
    },
    {
      id: 3,
      customer: "David Chen",
      package: "Zanzibar Beach",
      amount: 1800,
      status: "confirmed",
      date: "2024-01-13",
      avatar: "DC",
    },
    {
      id: 4,
      customer: "Sarah Wilson",
      package: "Ngorongoro Day Trip",
      amount: 350,
      status: "completed",
      date: "2024-01-12",
      avatar: "SW",
    },
  ];

  const topPackages = [
    { name: "Serengeti Safari Adventure", bookings: 45, revenue: 112500 },
    { name: "Kilimanjaro Trekking", bookings: 32, revenue: 102400 },
    { name: "Zanzibar Beach & Culture", bookings: 28, revenue: 50400 },
    { name: "Ngorongoro Crater Tour", bookings: 52, revenue: 18200 },
  ];

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
    change,
    changeType = "positive",
  }) => (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <div
            className={`flex items-center text-sm ${changeType === "positive" ? "text-green-600" : "text-red-600"}`}
          >
            {changeType === "positive" ? (
              <ArrowUpRight className="w-4 h-4" />
            ) : (
              <ArrowDownRight className="w-4 h-4" />
            )}
            <span className="font-semibold">{change}%</span>
          </div>
        )}
      </div>
      <div>
        <p className="font-quicksand text-gray-600 text-sm mb-1">{title}</p>
        <p className="font-jua text-3xl text-primary">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary via-accent to-primary rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="font-jua text-4xl mb-2">Welcome back, Admin!</h1>
          <p className="font-quicksand text-highlight text-lg mb-6">
            Here's what's happening with Wild Odysseys today.
          </p>
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="font-quicksand text-sm text-highlight">
                System Status
              </p>
              <p className="font-jua text-lg">All Systems Operational</p>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Bookings"
          value={stats.totalBookings}
          icon={Calendar}
          color="bg-blue-500"
          change={stats.monthlyGrowth}
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="bg-green-500"
          change={15.2}
        />
        <StatCard
          title="Active Users"
          value={stats.totalUsers}
          icon={Users}
          color="bg-purple-500"
          change={8.1}
        />
        <StatCard
          title="Tour Packages"
          value={stats.totalPackages}
          icon={Package}
          color="bg-orange-500"
          change={5.3}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Destinations"
          value={stats.activeDestinations}
          icon={MapPin}
          color="bg-accent"
        />
        <StatCard
          title="Pending Messages"
          value={stats.pendingMessages}
          icon={MessageSquare}
          color="bg-red-500"
        />
        <StatCard
          title="Average Rating"
          value={stats.averageRating}
          icon={Star}
          color="bg-yellow-500"
        />
        <StatCard
          title="Website Views"
          value="12.5K"
          icon={Eye}
          color="bg-indigo-500"
          change={18.7}
        />
      </div>

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-jua text-2xl text-primary">Recent Bookings</h3>
            <Link
              href="/admin/bookings"
              className="font-quicksand text-accent hover:text-primary text-sm font-semibold"
            >
              View All →
            </Link>
          </div>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                  <span className="font-jua text-secondary text-sm">
                    {booking.avatar}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-quicksand font-semibold text-primary">
                    {booking.customer}
                  </p>
                  <p className="font-quicksand text-sm text-gray-600">
                    {booking.package}
                  </p>
                  <p className="font-quicksand text-xs text-gray-500">
                    {booking.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-jua text-lg text-primary">
                    ${booking.amount}
                  </p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-quicksand ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Packages */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-jua text-2xl text-primary">Top Packages</h3>
            <Link
              href="/admin/packages"
              className="font-quicksand text-accent hover:text-primary text-sm font-semibold"
            >
              Manage →
            </Link>
          </div>
          <div className="space-y-4">
            {topPackages.map((pkg, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-secondary rounded-xl flex items-center justify-center mr-3">
                    <span className="font-jua text-primary text-sm">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p className="font-quicksand font-semibold text-primary text-sm">
                      {pkg.name}
                    </p>
                    <p className="font-quicksand text-xs text-gray-500">
                      {pkg.bookings} bookings
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-jua text-accent">
                    ${pkg.revenue.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h3 className="font-jua text-2xl text-primary mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/packages/add"
            className="p-6 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors text-center group"
          >
            <Package className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <span className="font-quicksand font-semibold">Add Package</span>
          </Link>
          <Link
            href="/admin/destinations/add"
            className="p-6 bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors text-center group"
          >
            <MapPin className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <span className="font-quicksand font-semibold">
              Add Destination
            </span>
          </Link>
          <Link
            href="/admin/users"
            className="p-6 bg-secondary text-primary rounded-xl hover:bg-secondary/90 transition-colors text-center group"
          >
            <Users className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <span className="font-quicksand font-semibold">Manage Users</span>
          </Link>
          <Link
            href="/admin/messages"
            className="p-6 bg-highlight text-accent border border-accent rounded-xl hover:bg-accent hover:text-white transition-colors text-center group"
          >
            <MessageSquare className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <span className="font-quicksand font-semibold">View Messages</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
