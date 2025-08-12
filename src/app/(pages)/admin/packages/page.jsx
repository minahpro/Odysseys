"use client";

import { useState } from "react";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  DollarSign,
  Star,
  Clock,
  X,
  Save,
} from "lucide-react";

const PackagesPage = () => {
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: "Serengeti Safari Adventure",
      slug: "serengeti-safari-adventure",
      price: 2500,
      duration: "7 days",
      overview:
        "Experience the ultimate African safari in the world-famous Serengeti National Park with luxury accommodations and expert guides.",
      photos: ["/placeholder.svg?height=200&width=300"],
      types: { id: 1, title: "Safari" },
      itineraries: [
        {
          title: "Day 1: Arrival in Arusha",
          description: "Meet and greet at airport, transfer to hotel",
          destination: "Arusha",
          accommodation: "Arusha Coffee Lodge",
        },
        {
          title: "Day 2: Serengeti National Park",
          description: "Drive to Serengeti, afternoon game drive",
          destination: "Serengeti",
          accommodation: "Serengeti Safari Camp",
        },
      ],
      include_excluded: {
        included: [
          "All meals",
          "Accommodation",
          "Game drives",
          "Park fees",
          "Professional guide",
        ],
        excluded: [
          "International flights",
          "Travel insurance",
          "Personal expenses",
          "Tips",
        ],
      },
      map: "https://maps.google.com/embed?pb=!1m18!1m12!1m3!1d3048.5",
      status: "active",
      featured: true,
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Kilimanjaro Trekking Expedition",
      slug: "kilimanjaro-trekking-expedition",
      price: 3200,
      duration: "8 days",
      overview:
        "Conquer Africa's highest peak via the scenic Machame Route with experienced guides and comprehensive support.",
      photos: ["/placeholder.svg?height=200&width=300"],
      types: { id: 2, title: "Trekking" },
      itineraries: [
        {
          title: "Day 1: Machame Gate to Machame Camp",
          description: "Begin trek through rainforest to first camp",
          destination: "Machame Gate",
          accommodation: "Machame Camp",
        },
      ],
      include_excluded: {
        included: [
          "All meals during trek",
          "Camping equipment",
          "Park fees",
          "Professional guides",
          "Porters",
        ],
        excluded: ["Flights", "Travel insurance", "Personal gear", "Tips"],
      },
      map: "https://maps.google.com/embed?pb=!1m18!1m12!1m3!1d3048.5",
      status: "active",
      featured: true,
      createdAt: "2024-01-16",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("view"); // view, add, edit
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    price: "",
    duration: "",
    overview: "",
    photos: [],
    types: { id: "", title: "" },
    itineraries: [
      { title: "", description: "", destination: "", accommodation: "" },
    ],
    include_excluded: { included: [""], excluded: [""] },
    map: "",
    status: "active",
    featured: false,
  });

  const packageTypes = [
    { id: 1, title: "Safari" },
    { id: 2, title: "Trekking" },
    { id: 3, title: "Beach" },
    { id: 4, title: "Cultural" },
    { id: 5, title: "Adventure" },
  ];

  const columns = [
    {
      key: "package",
      label: "Package",
      render: (pkg) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden">
            <img
              src={
                pkg.photos && pkg.photos.length > 0
                  ? pkg.photos[0]
                  : "/placeholder.svg"
              }
              alt={pkg.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-semibold text-gray-900 font-quicksand flex items-center">
              {pkg.name}
              {pkg.featured && (
                <Star className="w-4 h-4 text-amber-500 ml-1 fill-current" />
              )}
            </div>
            <div className="text-sm text-gray-500">{pkg.slug}</div>
          </div>
        </div>
      ),
    },
    {
      key: "details",
      label: "Details",
      render: (pkg) => (
        <div className="space-y-1">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-1" />
            <span>{pkg.duration}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              {pkg.types?.title || "No Type"}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: "price",
      label: "Price",
      render: (pkg) => (
        <div className="flex items-center">
          <DollarSign className="w-4 h-4 text-green-600" />
          <span className="font-semibold text-gray-900">
            ${pkg.price?.toLocaleString()}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (pkg) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            pkg.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {pkg.status}
        </span>
      ),
    },
  ];

  const handleAdd = () => {
    setModalMode("add");
    setFormData({
      name: "",
      slug: "",
      price: "",
      duration: "",
      overview: "",
      photos: [],
      types: { id: "", title: "" },
      itineraries: [
        { title: "", description: "", destination: "", accommodation: "" },
      ],
      include_excluded: { included: [""], excluded: [""] },
      map: "",
      status: "active",
      featured: false,
    });
    setSelectedPackage(null);
    setShowModal(true);
  };

  const handleEdit = (pkg) => {
    setModalMode("edit");
    setSelectedPackage(pkg);
    setFormData({
      name: pkg.name || "",
      slug: pkg.slug || "",
      price: pkg.price?.toString() || "",
      duration: pkg.duration || "",
      overview: pkg.overview || "",
      photos: pkg.photos || [],
      types: pkg.types || { id: "", title: "" },
      itineraries: pkg.itineraries || [
        { title: "", description: "", destination: "", accommodation: "" },
      ],
      include_excluded: pkg.include_excluded || {
        included: [""],
        excluded: [""],
      },
      map: pkg.map || "",
      status: pkg.status || "active",
      featured: pkg.featured || false,
    });
    setShowModal(true);
  };

  const handleView = (pkg) => {
    setModalMode("view");
    setSelectedPackage(pkg);
    setShowModal(true);
  };

  const handleDelete = (pkg) => {
    if (window.confirm(`Are you sure you want to delete "${pkg.name}"?`)) {
      setPackages(packages.filter((p) => p.id !== pkg.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalMode === "add") {
      const newPackage = {
        ...formData,
        id: Math.max(...packages.map((p) => p.id), 0) + 1,
        price: Number.parseFloat(formData.price),
        createdAt: new Date().toISOString().split("T")[0],
      };
      setPackages([...packages, newPackage]);
    } else if (modalMode === "edit") {
      setPackages(
        packages.map((p) =>
          p.id === selectedPackage.id
            ? {
                ...formData,
                id: selectedPackage.id,
                price: Number.parseFloat(formData.price),
              }
            : p
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

  const addItinerary = () => {
    setFormData({
      ...formData,
      itineraries: [
        ...formData.itineraries,
        { title: "", description: "", destination: "", accommodation: "" },
      ],
    });
  };

  const removeItinerary = (index) => {
    setFormData({
      ...formData,
      itineraries: formData.itineraries.filter((_, i) => i !== index),
    });
  };

  const updateItinerary = (index, field, value) => {
    const updated = formData.itineraries.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setFormData({ ...formData, itineraries: updated });
  };

  const addIncluded = () => {
    setFormData({
      ...formData,
      include_excluded: {
        ...formData.include_excluded,
        included: [...formData.include_excluded.included, ""],
      },
    });
  };

  const addExcluded = () => {
    setFormData({
      ...formData,
      include_excluded: {
        ...formData.include_excluded,
        excluded: [...formData.include_excluded.excluded, ""],
      },
    });
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
              Tour Packages
            </h1>
            <p className="text-gray-600 font-quicksand">
              Manage your tour packages and offerings
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl hover:from-primary/90 hover:to-primary/70 transition-all duration-200 font-quicksand font-medium shadow-lg hover:shadow-xl"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Package
          </button>
        </div>

        {/* Data Table */}
        <div className="w-full overflow-hidden">
          <DataTable
            data={packages}
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
                ? "Package Details"
                : modalMode === "add"
                  ? "Add New Package"
                  : "Edit Package"
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
                        {selectedPackage?.overview}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 font-jua mb-4">
                        Itinerary
                      </h3>
                      <div className="space-y-4">
                        {selectedPackage?.itineraries?.map((item, index) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-xl p-4"
                          >
                            <h4 className="font-semibold text-gray-900 font-quicksand">
                              {item.title}
                            </h4>
                            <p className="text-gray-600 font-quicksand mt-1">
                              {item.description}
                            </p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span>📍 {item.destination}</span>
                              <span>🏨 {item.accommodation}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 font-jua mb-3">
                          Included
                        </h3>
                        <ul className="space-y-1">
                          {selectedPackage?.include_excluded?.included?.map(
                            (item, index) => (
                              <li
                                key={index}
                                className="flex items-center text-green-700 font-quicksand"
                              >
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                {item}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 font-jua mb-3">
                          Excluded
                        </h3>
                        <ul className="space-y-1">
                          {selectedPackage?.include_excluded?.excluded?.map(
                            (item, index) => (
                              <li
                                key={index}
                                className="flex items-center text-red-700 font-quicksand"
                              >
                                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                {item}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">
                          ${selectedPackage?.price?.toLocaleString()}
                        </div>
                        <p className="text-gray-600 font-quicksand">
                          per person
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 font-quicksand">
                          Duration
                        </h4>
                        <p className="text-gray-700">
                          {selectedPackage?.duration}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 font-quicksand">
                          Type
                        </h4>
                        <p className="text-gray-700">
                          {selectedPackage?.types?.title}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 font-quicksand">
                          Status
                        </h4>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            selectedPackage?.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {selectedPackage?.status}
                        </span>
                      </div>
                    </div>

                    {selectedPackage?.photos &&
                      selectedPackage.photos.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 font-quicksand mb-3">
                            Photos
                          </h4>
                          <div className="grid grid-cols-2 gap-2">
                            {selectedPackage.photos.map((photo, index) => (
                              <img
                                key={index}
                                src={photo || "/placeholder.svg"}
                                alt={`Package ${index + 1}`}
                                className="w-full h-20 object-cover rounded-xl"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form Mode Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                      Package Name *
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
                      placeholder="Enter package name"
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
                      placeholder="package-url-slug"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                      placeholder="Enter price"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                      Duration *
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) =>
                        setFormData({ ...formData, duration: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                      placeholder="e.g., 7 days"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                      Type *
                    </label>
                    <select
                      value={formData.types.id}
                      onChange={(e) => {
                        const selectedType = packageTypes.find(
                          (t) => t.id.toString() === e.target.value
                        );
                        setFormData({
                          ...formData,
                          types: selectedType || { id: "", title: "" },
                        });
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand"
                      required
                    >
                      <option value="">Select Type</option>
                      {packageTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.title}
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
                    placeholder="Enter package overview"
                    required
                  />
                </div>

                {/* Itinerary Section */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 font-jua">
                      Itinerary
                    </h3>
                    <button
                      type="button"
                      onClick={addItinerary}
                      className="flex items-center px-3 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors text-sm"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Day
                    </button>
                  </div>
                  <div className="space-y-4">
                    {formData.itineraries.map((item, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-xl p-4"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900 font-quicksand">
                            Day {index + 1}
                          </h4>
                          {formData.itineraries.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeItinerary(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Title
                            </label>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) =>
                                updateItinerary(index, "title", e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand"
                              placeholder="Day title"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Destination
                            </label>
                            <input
                              type="text"
                              value={item.destination}
                              onChange={(e) =>
                                updateItinerary(
                                  index,
                                  "destination",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand"
                              placeholder="Destination"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <textarea
                              value={item.description}
                              onChange={(e) =>
                                updateItinerary(
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
                              rows={2}
                              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand resize-none"
                              placeholder="Day description"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Accommodation
                            </label>
                            <input
                              type="text"
                              value={item.accommodation}
                              onChange={(e) =>
                                updateItinerary(
                                  index,
                                  "accommodation",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand"
                              placeholder="Accommodation name"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Include/Exclude Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 font-jua">
                        Included
                      </h3>
                      <button
                        type="button"
                        onClick={addIncluded}
                        className="flex items-center px-2 py-1 bg-green-500 text-white rounded text-sm"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add
                      </button>
                    </div>
                    <div className="space-y-2">
                      {formData.include_excluded.included.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => {
                              const updated =
                                formData.include_excluded.included.map(
                                  (i, idx) =>
                                    idx === index ? e.target.value : i
                                );
                              setFormData({
                                ...formData,
                                include_excluded: {
                                  ...formData.include_excluded,
                                  included: updated,
                                },
                              });
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand text-sm"
                            placeholder="What's included"
                          />
                          {formData.include_excluded.included.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const updated =
                                  formData.include_excluded.included.filter(
                                    (_, idx) => idx !== index
                                  );
                                setFormData({
                                  ...formData,
                                  include_excluded: {
                                    ...formData.include_excluded,
                                    included: updated,
                                  },
                                });
                              }}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 font-jua">
                        Excluded
                      </h3>
                      <button
                        type="button"
                        onClick={addExcluded}
                        className="flex items-center px-2 py-1 bg-red-500 text-white rounded text-sm"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add
                      </button>
                    </div>
                    <div className="space-y-2">
                      {formData.include_excluded.excluded.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="text"
                            value={item}
                            onChange={(e) => {
                              const updated =
                                formData.include_excluded.excluded.map(
                                  (i, idx) =>
                                    idx === index ? e.target.value : i
                                );
                              setFormData({
                                ...formData,
                                include_excluded: {
                                  ...formData.include_excluded,
                                  excluded: updated,
                                },
                              });
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand text-sm"
                            placeholder="What's excluded"
                          />
                          {formData.include_excluded.excluded.length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const updated =
                                  formData.include_excluded.excluded.filter(
                                    (_, idx) => idx !== index
                                  );
                                setFormData({
                                  ...formData,
                                  include_excluded: {
                                    ...formData.include_excluded,
                                    excluded: updated,
                                  },
                                });
                              }}
                              className="text-red-600 hover:text-red-800"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Map URL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                    Map Embed URL
                  </label>
                  <input
                    type="url"
                    value={formData.map}
                    onChange={(e) =>
                      setFormData({ ...formData, map: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                    placeholder="https://maps.google.com/embed?pb=..."
                  />
                </div>

                {/* Status and Featured */}
                <div className="flex items-center justify-between">
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
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      className="w-5 h-5 text-primary border-2 border-gray-200 rounded focus:ring-primary focus:ring-2"
                    />
                    <label
                      htmlFor="featured"
                      className="ml-3 text-sm font-semibold text-gray-700 font-quicksand"
                    >
                      Featured Package
                    </label>
                  </div>
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
                    {modalMode === "add" ? "Create Package" : "Update Package"}
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

export default PackagesPage;
