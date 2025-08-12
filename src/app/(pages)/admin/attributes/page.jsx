"use client";

import { useState } from "react";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Tag,
  Save,
  Type,
  MapPin,
  Home,
  Calendar,
  BookOpen,
} from "lucide-react";

const AttributesPage = () => {
  const [activeTab, setActiveTab] = useState("tour-types");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    color: "#3B82F6",
    status: "active",
  });

  // Sample data for different attribute types
  const [tourTypes, setTourTypes] = useState([
    {
      id: 1,
      name: "Safari",
      slug: "safari",
      description: "Wildlife viewing tours",
      color: "#10B981",
      status: "active",
    },
    {
      id: 2,
      name: "Trekking",
      slug: "trekking",
      description: "Mountain climbing adventures",
      color: "#F59E0B",
      status: "active",
    },
    {
      id: 3,
      name: "Beach",
      slug: "beach",
      description: "Coastal relaxation tours",
      color: "#3B82F6",
      status: "active",
    },
    {
      id: 4,
      name: "Cultural",
      slug: "cultural",
      description: "Cultural immersion experiences",
      color: "#8B5CF6",
      status: "active",
    },
  ]);

  const [destinationTypes, setDestinationTypes] = useState([
    {
      id: 1,
      name: "National Park",
      slug: "national-park",
      description: "Protected wildlife areas",
      color: "#059669",
      status: "active",
    },
    {
      id: 2,
      name: "Mountain",
      slug: "mountain",
      description: "High altitude destinations",
      color: "#7C3AED",
      status: "active",
    },
    {
      id: 3,
      name: "Island",
      slug: "island",
      description: "Island destinations",
      color: "#0EA5E9",
      status: "active",
    },
    {
      id: 4,
      name: "City",
      slug: "city",
      description: "Urban destinations",
      color: "#DC2626",
      status: "active",
    },
  ]);

  const [accommodationTypes, setAccommodationTypes] = useState([
    {
      id: 1,
      name: "Lodge",
      slug: "lodge",
      description: "Safari lodges and camps",
      color: "#16A34A",
      status: "active",
    },
    {
      id: 2,
      name: "Hotel",
      slug: "hotel",
      description: "Standard hotels",
      color: "#2563EB",
      status: "active",
    },
    {
      id: 3,
      name: "Resort",
      slug: "resort",
      description: "Beach and luxury resorts",
      color: "#7C2D12",
      status: "active",
    },
    {
      id: 4,
      name: "Guesthouse",
      slug: "guesthouse",
      description: "Budget accommodations",
      color: "#B45309",
      status: "active",
    },
  ]);

  const [blogCategories, setBlogCategories] = useState([
    {
      id: 1,
      name: "Travel Tips",
      slug: "travel-tips",
      description: "Helpful travel advice",
      color: "#0891B2",
      status: "active",
    },
    {
      id: 2,
      name: "Wildlife",
      slug: "wildlife",
      description: "Wildlife and nature content",
      color: "#15803D",
      status: "active",
    },
    {
      id: 3,
      name: "Culture",
      slug: "culture",
      description: "Cultural insights",
      color: "#C2410C",
      status: "active",
    },
    {
      id: 4,
      name: "Adventure",
      slug: "adventure",
      description: "Adventure stories",
      color: "#9333EA",
      status: "active",
    },
  ]);

  const [tourCategories, setTourCategories] = useState([
    {
      id: 1,
      name: "Family",
      slug: "family",
      description: "Family-friendly tours",
      color: "#DC2626",
      status: "active",
    },
    {
      id: 2,
      name: "Luxury",
      slug: "luxury",
      description: "High-end experiences",
      color: "#7C2D12",
      status: "active",
    },
    {
      id: 3,
      name: "Budget",
      slug: "budget",
      description: "Affordable options",
      color: "#059669",
      status: "active",
    },
    {
      id: 4,
      name: "Adventure",
      slug: "adventure",
      description: "Thrilling experiences",
      color: "#7C3AED",
      status: "active",
    },
  ]);

  const [tourTags, setTourTags] = useState([
    {
      id: 1,
      name: "Big Five",
      slug: "big-five",
      description: "Tours featuring the Big Five animals",
      color: "#B45309",
      status: "active",
    },
    {
      id: 2,
      name: "Photography",
      slug: "photography",
      description: "Photography-focused tours",
      color: "#0891B2",
      status: "active",
    },
    {
      id: 3,
      name: "Honeymoon",
      slug: "honeymoon",
      description: "Romantic getaways",
      color: "#BE185D",
      status: "active",
    },
    {
      id: 4,
      name: "Group Tour",
      slug: "group-tour",
      description: "Group travel experiences",
      color: "#059669",
      status: "active",
    },
  ]);

  const tabs = [
    {
      id: "tour-types",
      label: "Tour Types",
      icon: Type,
      data: tourTypes,
      setter: setTourTypes,
    },
    {
      id: "destination-types",
      label: "Destination Types",
      icon: MapPin,
      data: destinationTypes,
      setter: setDestinationTypes,
    },
    {
      id: "accommodation-types",
      label: "Accommodation Types",
      icon: Home,
      data: accommodationTypes,
      setter: setAccommodationTypes,
    },
    {
      id: "blog-categories",
      label: "Blog Categories",
      icon: BookOpen,
      data: blogCategories,
      setter: setBlogCategories,
    },
    {
      id: "tour-categories",
      label: "Tour Categories",
      icon: Calendar,
      data: tourCategories,
      setter: setTourCategories,
    },
    {
      id: "tour-tags",
      label: "Tour Tags",
      icon: Tag,
      data: tourTags,
      setter: setTourTags,
    },
  ];

  const getCurrentData = () => {
    const currentTab = tabs.find((tab) => tab.id === activeTab);
    return currentTab ? currentTab.data : [];
  };

  const getCurrentSetter = () => {
    const currentTab = tabs.find((tab) => tab.id === activeTab);
    return currentTab ? currentTab.setter : () => {};
  };

  const columns = [
    {
      key: "attribute",
      label: "Attribute",
      render: (item) => (
        <div className="flex items-center space-x-3">
          <div
            className="w-4 h-4 rounded-full border border-gray-300"
            style={{ backgroundColor: item?.color || "#3B82F6" }}
          ></div>
          <div>
            <div className="font-semibold text-gray-900 font-quicksand">
              {item?.name || "N/A"}
            </div>
            <div className="text-sm text-gray-500">{item?.slug || "N/A"}</div>
          </div>
        </div>
      ),
    },
    {
      key: "description",
      label: "Description",
      render: (item) => (
        <span className="text-gray-700 font-quicksand">
          {item?.description || "No description"}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (item) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            item?.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {item?.status || "inactive"}
        </span>
      ),
    },
  ];

  const handleAdd = () => {
    setModalMode("add");
    setFormData({
      name: "",
      slug: "",
      description: "",
      color: "#3B82F6",
      status: "active",
    });
    setSelectedItem(null);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setModalMode("edit");
    setSelectedItem(item);
    setFormData({
      name: item?.name || "",
      slug: item?.slug || "",
      description: item?.description || "",
      color: item?.color || "#3B82F6",
      status: item?.status || "active",
    });
    setShowModal(true);
  };

  const handleView = (item) => {
    setModalMode("view");
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleDelete = (item) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${item?.name || "this item"}"?`
      )
    ) {
      const currentData = getCurrentData();
      const setter = getCurrentSetter();
      setter(currentData.filter((i) => i.id !== item.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentData = getCurrentData();
    const setter = getCurrentSetter();

    if (modalMode === "add") {
      const newItem = {
        ...formData,
        id: Math.max(...currentData.map((item) => item?.id || 0), 0) + 1,
      };
      setter([...currentData, newItem]);
    } else if (modalMode === "edit") {
      setter(
        currentData.map((item) =>
          item.id === selectedItem.id
            ? { ...formData, id: selectedItem.id }
            : item
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

  const currentTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 font-jua">
              Attributes
            </h1>
            <p className="text-gray-600 font-quicksand">
              Manage tour types, categories, and tags
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl hover:from-primary/90 hover:to-primary/70 transition-all duration-200 font-quicksand font-medium shadow-lg hover:shadow-xl"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add {currentTabData?.label.slice(0, -1) || "Attribute"}
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-primary text-primary bg-primary/5"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <DataTable
              data={getCurrentData()}
              columns={columns}
              actions={actions}
              searchable={true}
              exportable={true}
            />
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={
              modalMode === "view"
                ? `${currentTabData?.label.slice(0, -1) || "Attribute"} Details`
                : modalMode === "add"
                  ? `Add New ${currentTabData?.label.slice(0, -1) || "Attribute"}`
                  : `Edit ${currentTabData?.label.slice(0, -1) || "Attribute"}`
            }
            size="md"
          >
            {modalMode === "view" ? (
              <div className="space-y-6">
                {/* View Mode Content */}
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
                      style={{
                        backgroundColor: selectedItem?.color || "#3B82F6",
                      }}
                    ></div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 font-jua">
                        {selectedItem?.name}
                      </h3>
                      <p className="text-gray-600 font-quicksand">
                        {selectedItem?.slug}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 font-quicksand mb-2">
                      Description
                    </h4>
                    <p className="text-gray-700 font-quicksand">
                      {selectedItem?.description || "No description provided"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 font-quicksand mb-2">
                        Color
                      </h4>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-6 h-6 rounded-full border border-gray-300"
                          style={{
                            backgroundColor: selectedItem?.color || "#3B82F6",
                          }}
                        ></div>
                        <span className="text-gray-700 font-quicksand font-mono text-sm">
                          {selectedItem?.color || "#3B82F6"}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 font-quicksand mb-2">
                        Status
                      </h4>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          selectedItem?.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {selectedItem?.status || "inactive"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form Mode Content */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                    Name *
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
                    placeholder="Enter name"
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
                    placeholder="url-slug"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400 resize-none"
                    placeholder="Enter description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                      Color
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={formData.color}
                        onChange={(e) =>
                          setFormData({ ...formData, color: e.target.value })
                        }
                        className="w-12 h-12 border-2 border-gray-200 rounded-xl cursor-pointer"
                      />
                      <input
                        type="text"
                        value={formData.color}
                        onChange={(e) =>
                          setFormData({ ...formData, color: e.target.value })
                        }
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand font-mono text-sm"
                        placeholder="#3B82F6"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
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
                    {modalMode === "add" ? "Create" : "Update"}{" "}
                    {currentTabData?.label.slice(0, -1) || "Attribute"}
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

export default AttributesPage;
