"use client";

import { useState } from "react";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  DollarSign,
  Eye,
  Download,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Mail,
  Phone,
  CreditCard,
  FileText,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const BookingsPage = () => {
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Sample booking data with enhanced information
  const bookings = [
    {
      id: 1,
      bookingRef: "WO-2024-001",
      customerName: "John Smith",
      customerEmail: "john.smith@email.com",
      customerPhone: "+1 234 567 8900",
      customerAvatar: "/placeholder.svg?height=40&width=40",
      packageName: "Serengeti Safari Adventure",
      destination: "Serengeti National Park",
      startDate: "2024-03-15",
      endDate: "2024-03-22",
      duration: "7 days",
      guests: 4,
      totalAmount: 8500,
      paidAmount: 4250,
      status: "confirmed",
      paymentStatus: "partial",
      bookingDate: "2024-01-15",
      specialRequests: "Vegetarian meals, ground floor accommodation",
      emergencyContact: "Jane Smith - +1 234 567 8901",
    },
    {
      id: 2,
      bookingRef: "WO-2024-002",
      customerName: "Sarah Johnson",
      customerEmail: "sarah.j@email.com",
      customerPhone: "+1 555 123 4567",
      customerAvatar: "/placeholder.svg?height=40&width=40",
      packageName: "Kilimanjaro Trekking",
      destination: "Mount Kilimanjaro",
      startDate: "2024-04-10",
      endDate: "2024-04-17",
      duration: "7 days",
      guests: 2,
      totalAmount: 6200,
      paidAmount: 6200,
      status: "confirmed",
      paymentStatus: "paid",
      bookingDate: "2024-02-01",
      specialRequests: "None",
      emergencyContact: "Mike Johnson - +1 555 987 6543",
    },
    {
      id: 3,
      bookingRef: "WO-2024-003",
      customerName: "David Wilson",
      customerEmail: "d.wilson@email.com",
      customerPhone: "+1 777 888 9999",
      customerAvatar: "/placeholder.svg?height=40&width=40",
      packageName: "Zanzibar Beach Getaway",
      destination: "Zanzibar",
      startDate: "2024-05-20",
      endDate: "2024-05-27",
      duration: "7 days",
      guests: 6,
      totalAmount: 4800,
      paidAmount: 0,
      status: "pending",
      paymentStatus: "unpaid",
      bookingDate: "2024-02-20",
      specialRequests: "Beachfront accommodation, scuba diving equipment",
      emergencyContact: "Lisa Wilson - +1 777 111 2222",
    },
  ];

  // Enhanced statistics
  const stats = [
    {
      title: "Total Bookings",
      value: "156",
      change: "+12%",
      trend: "up",
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Revenue This Month",
      value: "$45,280",
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Confirmed Bookings",
      value: "89",
      change: "+5.1%",
      trend: "up",
      icon: CheckCircle,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      title: "Pending Bookings",
      value: "23",
      change: "-2.3%",
      trend: "down",
      icon: AlertCircle,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPaymentStatusBadge = (status) => {
    const badges = {
      paid: "bg-green-100 text-green-800 border-green-200",
      partial: "bg-yellow-100 text-yellow-800 border-yellow-200",
      unpaid: "bg-red-100 text-red-800 border-red-200",
    };
    return badges[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const columns = [
    {
      key: "bookingRef",
      label: "Booking Ref",
      render: (booking) => (
        <div className="font-semibold text-primary font-quicksand">
          {booking.bookingRef}
        </div>
      ),
    },
    {
      key: "customer",
      label: "Customer",
      render: (booking) => (
        <div className="flex items-center space-x-3">
          <img
            src={booking.customerAvatar || "/placeholder.svg"}
            alt={booking.customerName}
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
          />
          <div>
            <div className="font-semibold text-gray-900 font-quicksand">
              {booking.customerName}
            </div>
            <div className="text-sm text-gray-500">{booking.customerEmail}</div>
          </div>
        </div>
      ),
    },
    {
      key: "package",
      label: "Package",
      render: (booking) => (
        <div>
          <div className="font-medium text-gray-900 font-quicksand">
            {booking.packageName}
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            {booking.destination}
          </div>
        </div>
      ),
    },
    {
      key: "dates",
      label: "Travel Dates",
      render: (booking) => (
        <div className="text-sm">
          <div className="font-medium text-gray-900">{booking.startDate}</div>
          <div className="text-gray-500">to {booking.endDate}</div>
          <div className="text-xs text-gray-400 flex items-center mt-1">
            <Clock className="w-3 h-3 mr-1" />
            {booking.duration}
          </div>
        </div>
      ),
    },
    {
      key: "guests",
      label: "Guests",
      render: (booking) => (
        <div className="flex items-center text-gray-700">
          <Users className="w-4 h-4 mr-1" />
          <span className="font-medium">{booking.guests}</span>
        </div>
      ),
    },
    {
      key: "amount",
      label: "Amount",
      render: (booking) => (
        <div>
          <div className="font-semibold text-gray-900">
            ${booking.totalAmount.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">
            Paid: ${booking.paidAmount.toLocaleString()}
          </div>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (booking) => (
        <div className="space-y-1">
          <div className="flex items-center space-x-1">
            {getStatusIcon(booking.status)}
            <span className="text-sm font-medium capitalize">
              {booking.status}
            </span>
          </div>
          <div
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPaymentStatusBadge(
              booking.paymentStatus
            )}`}
          >
            {booking.paymentStatus}
          </div>
        </div>
      ),
    },
  ];

  const handleView = (booking) => {
    setSelectedBooking(booking);
    setShowViewModal(true);
  };

  const handleDownloadInvoice = (booking) => {
    const invoiceContent = `
WILD ODYSSEYS INVOICE
=====================

Invoice #: ${booking.bookingRef}
Date: ${new Date().toLocaleDateString()}

CUSTOMER INFORMATION:
Name: ${booking.customerName}
Email: ${booking.customerEmail}
Phone: ${booking.customerPhone}

BOOKING DETAILS:
Package: ${booking.packageName}
Destination: ${booking.destination}
Travel Dates: ${booking.startDate} to ${booking.endDate}
Duration: ${booking.duration}
Number of Guests: ${booking.guests}

PAYMENT INFORMATION:
Total Amount: $${booking.totalAmount.toLocaleString()}
Amount Paid: $${booking.paidAmount.toLocaleString()}
Balance Due: $${(booking.totalAmount - booking.paidAmount).toLocaleString()}
Payment Status: ${booking.paymentStatus.toUpperCase()}

SPECIAL REQUESTS:
${booking.specialRequests}

EMERGENCY CONTACT:
${booking.emergencyContact}

Thank you for choosing Wild Odysseys!
Contact us: info@wildodysseys.com | +1 (555) 123-4567
    `;

    const blob = new Blob([invoiceContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${booking.bookingRef}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const actions = [
    {
      label: "View",
      icon: Eye,
      onClick: handleView,
      className: "text-blue-600 hover:text-blue-800",
    },
    {
      label: "Download Invoice",
      icon: Download,
      onClick: handleDownloadInvoice,
      className: "text-green-600 hover:text-green-800",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Enhanced Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300"
          >
            <div className={`h-2 bg-gradient-to-r ${stat.color}`}></div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <div className="flex items-center space-x-1">
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span
                    className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-bold text-gray-900 font-jua">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-600 font-quicksand mt-1">
                  {stat.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Data Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 font-jua">
            Recent Bookings
          </h2>
          <p className="text-gray-600 font-quicksand mt-1">
            Manage and track all customer bookings
          </p>
        </div>
        <DataTable data={bookings} columns={columns} actions={actions} />
      </div>

      {/* Enhanced View Modal */}
      {showViewModal && selectedBooking && (
        <Modal
          isOpen={showViewModal}
          onClose={() => setShowViewModal(false)}
          title=""
          size="lg"
        >
          <div className="space-y-6">
            {/* Enhanced Header with Gradient */}
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6 text-white -m-6 mb-6">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedBooking.customerAvatar || "/placeholder.svg"}
                  alt={selectedBooking.customerName}
                  className="w-16 h-16 rounded-full border-4 border-white/20 object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold font-jua">
                    {selectedBooking.customerName}
                  </h3>
                  <p className="text-white/80 font-quicksand">
                    {selectedBooking.bookingRef}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(selectedBooking.status)}
                      <span className="text-sm font-medium capitalize">
                        {selectedBooking.status}
                      </span>
                    </div>
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border-2 border-white/20 bg-white/10`}
                    >
                      {selectedBooking.paymentStatus}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Information */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h4 className="font-bold text-gray-900 font-jua mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-primary" />
                  Customer Information
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700 font-quicksand">
                      {selectedBooking.customerEmail}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700 font-quicksand">
                      {selectedBooking.customerPhone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Package Information */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h4 className="font-bold text-gray-900 font-jua mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  Package Details
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900 font-quicksand">
                      {selectedBooking.packageName}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {selectedBooking.destination}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700 font-quicksand">
                      {selectedBooking.startDate} to {selectedBooking.endDate}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-700 font-quicksand">
                      {selectedBooking.guests} guests
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h4 className="font-bold text-gray-900 font-jua mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-primary" />
                  Payment Details
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-quicksand">
                      Total Amount:
                    </span>
                    <span className="font-semibold text-gray-900">
                      ${selectedBooking.totalAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-quicksand">
                      Amount Paid:
                    </span>
                    <span className="font-semibold text-green-600">
                      ${selectedBooking.paidAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-600 font-quicksand">
                      Balance Due:
                    </span>
                    <span className="font-semibold text-red-600">
                      $
                      {(
                        selectedBooking.totalAmount - selectedBooking.paidAmount
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-gray-50 rounded-xl p-5">
                <h4 className="font-bold text-gray-900 font-jua mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-primary" />
                  Additional Information
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-600 text-sm font-quicksand">
                      Booking Date:
                    </p>
                    <p className="font-medium text-gray-900">
                      {selectedBooking.bookingDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-quicksand">
                      Special Requests:
                    </p>
                    <p className="font-medium text-gray-900">
                      {selectedBooking.specialRequests}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-quicksand">
                      Emergency Contact:
                    </p>
                    <p className="font-medium text-gray-900">
                      {selectedBooking.emergencyContact}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                onClick={() => handleDownloadInvoice(selectedBooking)}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 font-quicksand font-medium shadow-lg hover:shadow-xl"
              >
                <Download className="w-4 h-4" />
                <span>Download Invoice</span>
              </button>
              <button
                onClick={() => setShowViewModal(false)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-quicksand font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BookingsPage;
