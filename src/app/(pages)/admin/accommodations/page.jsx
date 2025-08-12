"use client";

import { useState } from "react";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  MapPin,
  X,
  Save,
  ImageIcon,
  Phone,
  Globe,
  Home,
  Activity,
} from "lucide-react";

const AccommodationsPage = () => {
  const [accommodations, setAccommodations] = useState([
    {
      id: 1,
      name: "Serengeti Safari Lodge",
      slug: "serengeti-safari-lodge",
      location: "Serengeti National Park",
      category: "Luxury",
      photos: ["/placeholder.svg?height=200&width=300"],
      overview:
        "Luxury safari lodge with stunning views of the Serengeti plains, offering world-class amenities and exceptional wildlife viewing opportunities.",
      where: "inPark",
      hotel_website_url: "https://serengetisafarilodge.com",
      hotel_phone_number: "+255 123 456 789",
      amenities: [
        "WiFi",
        "Restaurant",
        "Pool",
        "Spa",
        "Game Drives",
        "Bar",
        "Laundry",
      ],
      activities: [
        "Game Drives",
        "Bush Walks",
        "Cultural Visits",
        "Sundowners",
        "Photography",
      ],
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Kilimanjaro View Hotel",
      slug: "kilimanjaro-view-hotel",
      location: "Moshi, Tanzania",
      category: "Mid-range",
      photos: ["/placeholder.svg?height=200&width=300"],
      overview:
        "Modern hotel with spectacular views of Mount Kilimanjaro, perfect for trekkers and business travelers.",
      where: "outPark",
      hotel_website_url: "https://kilimanjaroviewhotel.com",
      hotel_phone_number: "+255 987 654 321",
      amenities: [
        "WiFi",
        "Restaurant",
        "Gym",
        "Conference Room",
        "Airport Transfer",
        "Bar",
      ],
      activities: [
        "City Tours",
        "Coffee Farm Visits",
        "Cultural Tours",
        "Shopping",
      ],
      status: "active",
      createdAt: "2024-01-16",
    },
    {
      id: 3,
      name: "Zanzibar Beach Resort",
      slug: "zanzibar-beach-resort",
      location: "Stone Town, Zanzibar",
      category: "Luxury",
      photos: ["/placeholder.svg?height=200&width=300"],
      overview:
        "Beachfront resort with pristine white sand beaches, offering luxury accommodations and water sports.",
      where: "outPark",
      hotel_website_url: "https://zanzibarbeachresort.com",
      hotel_phone_number: "+255 456 789 123",
      amenities: [
        "WiFi",
        "Restaurant",
        "Beach Access",
        "Water Sports",
        "Spa",
        "Pool",
        "Bar",
      ],
      activities: [
        "Snorkeling",
        "Diving",
        "Spice Tours",
        "Dhow Sailing",
        "Cultural Tours",
      ],
      status: "active",
      createdAt: "2024-01-17",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    location: "",
    category: "",
    photos: [],
    overview: "",
    where: "outPark",
    hotel_website_url: "",
    hotel_phone_number: "",
    amenities: [""],
    activities: [""],
    status: "active",
  });

  const categories = ["Budget", "Mid-range", "Luxury", "Premium"];
  const whereOptions = [
    { value: "inPark", label: "In Park" },
    { value: "outPark", label: "Out of Park" },
  ];

  const columns = [
    {
      key: "accommodation",
      label: "Accommodation",
      render: (acc) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden">
            <img
              src={
                acc.photos && acc.photos.length > 0
                  ? acc.photos[0]
                  : "/placeholder.svg"
              }
              alt={acc.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-semibold text-gray-900 font-quicksand">
              {acc.name}
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {acc.location}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (acc) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            acc.category === "Luxury"
              ? "bg-purple-100 text-purple-800"
              : acc.category === "Premium"
                ? "bg-indigo-100 text-indigo-800"
                : acc.category === "Mid-range"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800"
          }`}
        >
          {acc.category}
        </span>
      ),
    },
    {
      key: "location_type",
      label: "Location",
      render: (acc) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            acc.where === "inPark"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {acc.where === "inPark" ? "In Park" : "Out of Park"}
        </span>
      ),
    },
    {
      key: "amenities",
      label: "Amenities",
      render: (acc) => (
        <div className="flex items-center space-x-1">
          <Home className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            {acc.amenities ? acc.amenities.length : 0} amenities
          </span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (acc) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            acc.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {acc.status}
        </span>
      ),
    },
  ];

  const handleAdd = () => {
    setModalMode("add");
    setFormData({
      name: "",
      slug: "",
      location: "",
      category: "",
      photos: [],
      overview: "",
      where: "outPark",
      hotel_website_url: "",
      hotel_phone_number: "",
      amenities: [""],
      activities: [""],
      status: "active",
    });
    setSelectedAccommodation(null);
    setShowModal(true);
  };

  const handleEdit = (acc) => {
    setModalMode("edit");
    setSelectedAccommodation(acc);
    setFormData({
      name: acc.name || "",
      slug: acc.slug || "",
      location: acc.location || "",
      category: acc.category || "",
      photos: acc.photos || [],
      overview: acc.overview || "",
      where: acc.where || "outPark",
      hotel_website_url: acc.hotel_website_url || "",
      hotel_phone_number: acc.hotel_phone_number || "",
      amenities: acc.amenities || [""],
      activities: acc.activities || [""],
      status: acc.status || "active",
    });
    setShowModal(true);
  };

  const handleView = (acc) => {
    setModalMode("view");
    setSelectedAccommodation(acc);
    setShowModal(true);
  };

  const handleDelete = (acc) => {
    if (window.confirm(`Are you sure you want to delete "${acc.name}"?`)) {
      setAccommodations(accommodations.filter((a) => a.id !== acc.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalMode === "add") {
      const newAccommodation = {
        ...formData,
        id: Math.max(...accommodations.map((a) => a.id), 0) + 1,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setAccommodations([...accommodations, newAccommodation]);
    } else if (modalMode === "edit") {
      setAccommodations(
        accommodations.map((a) =>
          a.id === selectedAccommodation.id
            ? { ...formData, id: selectedAccommodation.id }
            : a
        )
      );
    }

    setShowModal(false);
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const addAmenity = () => {
    setFormData({
      ...formData,
      amenities: [...formData.amenities, ""],
    });
  };

  const removeAmenity = (index) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.filter((_, i) => i !== index),
    });
  };

  const updateAmenity = (index, value) => {
    const updated = formData.amenities.map((item, i) =>
      i === index ? value : item
    );
    setFormData({ ...formData, amenities: updated });
  };

  const addActivity = () => {
    setFormData({
      ...formData,
      activities: [...formData.activities, ""],
    });
  };

  const removeActivity = (index) => {
    setFormData({
      ...formData,
      activities: formData.activities.filter((_, i) => i !== index),
    });
  };

  const updateActivity = (index, value) => {
    const updated = formData.activities.map((item, i) =>
      i === index ? value : item
    );
    setFormData({ ...formData, activities: updated });
  };

  const actions = [
    {
      label: "View",
      icon: Eye,
      onClick: handleView,
      className: "text-blue-600 hover:text-blue-800 hover:bg-blue-50",
    },
    {
      label: "Edit",
      icon: Edit,
      onClick: handleEdit,
      className: "text-amber-600 hover:text-amber-800 hover:bg-amber-50",
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: handleDelete,
      className: "text-red-600 hover:text-red-800 hover:bg-red-50",
    },
  ];

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-jua">
              Accommodations
            </h1>
            <p className="text-gray-600 font-quicksand">
              Manage hotels, lodges, and resorts
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl hover:from-primary/90 hover:to-primary/70 transition-all duration-200 font-quicksand font-medium shadow-lg hover:shadow-xl"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Accommodation
          </button>
        </div>

        {/* Data Table */}
        <div className="w-full overflow-hidden">
          <DataTable
            data={accommodations}
            columns={columns}
            actions={actions}
            searchable={true}
            exportable={true}
          />
        </div>

        {/* Modal */}
        {showModal && (
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={
              modalMode === "view"
                ? "Accommodation Details"
                : modalMode === "add"
                  ? "Add New Accommodation"
                  : "Edit Accommodation"
            }
            size="xl"
          >
            {modalMode === "view" ? (
              <div className="space-y-6">
                {/* View Mode Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 font-jua mb-2">
                        Overview
                      </h3>
                      <p className="text-gray-700 font-quicksand">
                        {selectedAccommodation?.overview}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 font-jua mb-4">
                          Amenities
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {selectedAccommodation?.amenities?.map(
                            (amenity, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2 bg-gray-50 rounded-xl p-3"
                              >
                                <Home className="w-4 h-4 text-primary" />
                                <span className="text-sm font-quicksand">
                                  {amenity}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 font-jua mb-4">
                          Activities
                        </h3>
                        <div className="grid grid-cols-1 gap-3">
                          {selectedAccommodation?.activities?.map(
                            (activity, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2 bg-gray-50 rounded-xl p-3"
                              >
                                <Activity className="w-4 h-4 text-primary" />
                                <span className="text-sm font-quicksand">
                                  {activity}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    {selectedAccommodation?.photos &&
                      selectedAccommodation.photos.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 font-jua mb-4">
                            Photos
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {selectedAccommodation.photos.map(
                              (photo, index) => (
                                <img
                                  key={index}
                                  src={photo || "/placeholder.svg"}
                                  alt={`${selectedAccommodation.name} ${index + 1}`}
                                  className="w-full h-32 object-cover rounded-xl"
                                />
                              )
                            )}
                          </div>
                        </div>
                      )}
                  </div>

                  <div className="space-y-6">
                    <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                      <div className="text-center">
                        <Home className="w-8 h-8 text-primary mx-auto mb-2" />
                        <h4 className="font-semibold text-gray-900 font-jua">
                          {selectedAccommodation?.name}
                        </h4>
                        <p className="text-gray-600 font-quicksand">
                          {selectedAccommodation?.location}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 font-quicksand">
                          Category
                        </h4>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            selectedAccommodation?.category === "Luxury"
                              ? "bg-purple-100 text-purple-800"
                              : selectedAccommodation?.category === "Premium"
                                ? "bg-indigo-100 text-indigo-800"
                                : selectedAccommodation?.category ===
                                    "Mid-range"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                          }`}
                        >
                          {selectedAccommodation?.category}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 font-quicksand">
                          Location Type
                        </h4>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            selectedAccommodation?.where === "inPark"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {selectedAccommodation?.where === "inPark"
                            ? "In Park"
                            : "Out of Park"}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 font-quicksand">
                          Status
                        </h4>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            selectedAccommodation?.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {selectedAccommodation?.status}
                        </span>
                      </div>
                      {selectedAccommodation?.hotel_website_url && (
                        <div>
                          <h4 className="font-semibold text-gray-900 font-quicksand">
                            Website
                          </h4>
                          <a
                            href={selectedAccommodation.hotel_website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-primary hover:text-primary/80 font-quicksand"
                          >
                            <Globe className="w-4 h-4 mr-1" />
                            Visit Website
                          </a>
                        </div>
                      )}
                      {selectedAccommodation?.hotel_phone_number && (
                        <div>
                          <h4 className="font-semibold text-gray-900 font-quicksand">
                            Phone
                          </h4>
                          <a
                            href={`tel:${selectedAccommodation.hotel_phone_number}`}
                            className="flex items-center text-primary hover:text-primary/80 font-quicksand"
                          >
                            <Phone className="w-4 h-4 mr-1" />
                            {selectedAccommodation.hotel_phone_number}
                          </a>
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-gray-900 font-quicksand">
                          Created
                        </h4>
                        <p className="text-gray-700 font-quicksand">
                          {selectedAccommodation?.createdAt &&
                            new Date(
                              selectedAccommodation.createdAt
                            ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form Mode Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                      Accommodation Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          name: e.target.value,
                          slug: generateSlug(e.target.value),
                        });
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                      placeholder="Enter accommodation name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) =>
                        setFormData({ ...formData, slug: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                      placeholder="accommodation-url-slug"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                      Location *
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                      placeholder="Enter location"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                      Location Type *
                    </label>
                    <select
                      value={formData.where}
                      onChange={(e) =>
                        setFormData({ ...formData, where: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand"
                      required
                    >
                      {whereOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                    Overview *
                  </label>
                  <textarea
                    value={formData.overview}
                    onChange={(e) =>
                      setFormData({ ...formData, overview: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400 resize-none"
                    placeholder="Enter accommodation overview"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                      Website URL
                    </label>
                    <input
                      type="url"
                      value={formData.hotel_website_url}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hotel_website_url: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.hotel_phone_number}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          hotel_phone_number: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                      placeholder="+255 123 456 789"
                    />
                  </div>
                </div>

                {/* Amenities Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 font-jua">
                      Amenities
                    </h3>
                    <button
                      type="button"
                      onClick={addAmenity}
                      className="flex items-center px-3 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors text-sm"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Amenity
                    </button>
                  </div>
                  <div className="space-y-3">
                    {formData.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <input
                          type="text"
                          value={amenity}
                          onChange={(e) => updateAmenity(index, e.target.value)}
                          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                          placeholder="Enter amenity"
                        />
                        {formData.amenities.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeAmenity(index)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xl transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activities Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 font-jua">
                      Activities
                    </h3>
                    <button
                      type="button"
                      onClick={addActivity}
                      className="flex items-center px-3 py-2 bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors text-sm"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Activity
                    </button>
                  </div>
                  <div className="space-y-3">
                    {formData.activities.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <input
                          type="text"
                          value={activity}
                          onChange={(e) =>
                            updateActivity(index, e.target.value)
                          }
                          className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                          placeholder="Enter activity"
                        />
                        {formData.activities.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeActivity(index)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-xl transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                    Photos
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-quicksand mb-2">
                      Upload accommodation photos
                    </p>
                    <p className="text-sm text-gray-500 font-quicksand">
                      Drag and drop files here or click to browse
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-quicksand"
                    >
                      Choose Files
                    </button>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-3 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-quicksand font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl hover:from-primary/90 hover:to-primary/70 transition-all duration-200 font-quicksand font-medium shadow-lg hover:shadow-xl"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {modalMode === "add"
                      ? "Create Accommodation"
                      : "Update Accommodation"}
                  </button>
                </div>
              </form>
            )}
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AccommodationsPage;
