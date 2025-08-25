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
  Activity,
} from "lucide-react";

const CountryPage = () => {
  const [countries, setCountries] = useState([
    {
      id: 1,
      name: "Serengeti National Park",
      slug: "serengeti-national-park",
      location: "Northern Tanzania",
      type: "National Park",
      photos: ["/placeholder.svg?height=200&width=300"],
      overview:
        "World-famous national park known for the Great Migration and abundant wildlife including the Big Five.",
      activities: [
        "Game Drives",
        "Hot Air Balloon",
        "Walking Safari",
        "Photography",
        "Bird Watching",
      ],
      status: "active",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Mount Kilimanjaro",
      slug: "mount-kilimanjaro",
      location: "Northern Tanzania",
      type: "Mountain",
      photos: ["/placeholder.svg?height=200&width=300"],
      overview:
        "Africa's highest peak and the world's tallest free-standing mountain, offering multiple climbing routes.",
      activities: [
        "Trekking",
        "Mountain Climbing",
        "Photography",
        "Camping",
        "Sunrise Viewing",
      ],
      status: "active",
      createdAt: "2024-01-16",
    },
    {
      id: 3,
      name: "Zanzibar Island",
      slug: "zanzibar-island",
      location: "Indian Ocean, Tanzania",
      type: "Island",
      photos: ["/placeholder.svg?height=200&width=300"],
      overview:
        "Tropical paradise with pristine beaches, rich cultural heritage, and historic Stone Town.",
      activities: [
        "Beach Relaxation",
        "Snorkeling",
        "Diving",
        "Spice Tours",
        "Cultural Tours",
        "Dhow Sailing",
      ],
      status: "active",
      createdAt: "2024-01-17",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    location: "",
    type: "",
    photos: [],
    overview: "",
    activities: [""],
    status: "active",
  });

  const countryTypes = [
    "National Park",
    "Mountain",
    "Island",
    "City",
    "Beach",
    "Desert",
    "Forest",
    "Lake",
    "Cultural Site",
    "Historical Site",
  ];

  const columns = [
    {key: "country",
      label: "Country",
      render: (dest) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden">
            <img
              src={
                dest.photos && dest.photos.length > 0
                  ? dest.photos[0]
                  : "/placeholder.svg"
              }
              alt={dest.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-semibold text-gray-900 font-quicksand">
              {dest.name}
            </div>
            <div className="text-sm text-gray-500 flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {dest.location}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "type",
      label: "Type",
      render: (dest) => (
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
          {dest.type}
        </span>
      ),
    },
    {
      key: "activities",
      label: "Activities",
      render: (dest) => (
        <div className="flex items-center space-x-1">
          <Activity className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">
            {dest.activities ? dest.activities.length : 0} activities
          </span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (dest) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            dest.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {dest.status}
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
      type: "",
      photos: [],
      overview: "",
      activities: [""],
      status: "active",
    });
    setSelectedCountry(null);
    setShowModal(true);
  };

  const handleEdit = (dest) => {
    setModalMode("edit");
    setSelectedCountry(dest);
    setFormData({
      name: dest.name || "",
      slug: dest.slug || "",
      location: dest.location || "",
      type: dest.type || "",
      photos: dest.photos || [],
      overview: dest.overview || "",
      activities: dest.activities || [""],
      status: dest.status || "active",
    });
    setShowModal(true);
  };

  const handleView = (dest) => {
    setModalMode("view");
    setSelectedCountry(dest);
    setShowModal(true);
  };

  const handleDelete = (dest) => {
    if (window.confirm(`Are you sure you want to delete "${dest.name}"?`)) {
      setCountries(countries.filter((d) => d.id !== dest.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalMode === "add") {
      const newCountry = {
        ...formData,
        id: Math.max(...countries.map((d) => d.id), 0) + 1,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setCountries([...countries, newCountry]);
    } else if (modalMode === "edit") {
      setCountries(
        countries.map((d) =>
          d.id === selectedCountry.id
            ? { ...formData, id: selectedCountry.id }
            : d
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
              Countries
            </h1>
            <p className="text-gray-600 font-quicksand">
              Manage countries and locations
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl hover:from-primary/90 hover:to-primary/70 transition-all duration-200 font-quicksand font-medium shadow-lg hover:shadow-xl"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Country
          </button>
        </div>

        {/* Data Table */}
        <div className="w-full overflow-hidden">
          <DataTable
            data={countries}
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
                ? "Country Details"
                : modalMode === "add"
                  ? "Add New Country"
                  : "Edit Country"
            }
            size="lg"
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
                        {selectedCountry?.overview}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 font-jua mb-4">
                        Activities
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {selectedCountry?.activities?.map(
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

                    {selectedCountry?.photos &&
                      selectedCountry.photos.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 font-jua mb-4">
                            Photos
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {selectedCountry.photos.map((photo, index) => (
                              <img
                                key={index}
                                src={photo || "/placeholder.svg"}
                                alt={`${selectedCountry.name} ${index + 1}`}
                                className="w-full h-32 object-cover rounded-xl"
                              />
                            ))}
                          </div>
                        </div>
                      )}
                  </div>

                  <div className="space-y-6">
                    <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                      <div className="text-center">
                        <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                        <h4 className="font-semibold text-gray-900 font-jua">
                          {selectedCountry?.name}
                        </h4>
                        <p className="text-gray-600 font-quicksand">
                          {selectedCountry?.location}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 font-quicksand">
                          Type
                        </h4>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {selectedCountry?.type}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 font-quicksand">
                          Status
                        </h4>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            selectedCountry?.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {selectedCountry?.status}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 font-quicksand">
                          Created
                        </h4>
                        <p className="text-gray-700 font-quicksand">
                          {selectedCountry?.createdAt &&
                            new Date(
                              selectedCountry.createdAt
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
                      Country Name *
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
                      placeholder="Enter country name"
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
                      placeholder="country-url-slug"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      Type *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand"
                      required
                    >
                      <option value="">Select Type</option>
                      {countryTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                    placeholder="Enter country overview"
                    required
                  />
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
                      className="flex items-center px-3 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors text-sm"
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
                      Upload destination photos
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
                      ? "Create Destination"
                      : "Update Destination"}
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

export default DestinationsPage;
