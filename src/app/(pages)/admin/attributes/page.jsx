"use client";

import { useState, useEffect } from "react";
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
  Loader2,
} from "lucide-react";
import {
  getAttributes,
  createAttribute,
  updateAttribute,
  deleteAttribute,
} from "../../../../firebase/databaseOperations";

const AttributesPage = () => {
  const [activeTab, setActiveTab] = useState("tour-types");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    color: "#3B82F6",
    status: "active",
  });

  // Data for different attribute types
  const [tourTypes, setTourTypes] = useState([]);

  const [destinationTypes, setDestinationTypes] = useState([]);

  const [accommodationTypes, setAccommodationTypes] = useState([]);
  const [blogCategories, setBlogCategories] = useState([]);
  const [tourCategories, setTourCategories] = useState([]);
  const [tourTags, setTourTags] = useState([]);

  const tabs = [
    {
      id: "tour-types",
      label: "Tour Types",
      icon: Type,
      data: tourTypes,
      setter: setTourTypes,
      attributeType: "tour-types",
    },
    {
      id: "destination-types",
      label: "Destination Types",
      icon: MapPin,
      data: destinationTypes,
      setter: setDestinationTypes,
      attributeType: "destination-types",
    },
    {
      id: "accommodation-types",
      label: "Accommodation Types",
      icon: Home,
      data: accommodationTypes,
      setter: setAccommodationTypes,
      attributeType: "accommodation-types",
    },
    {
      id: "blog-categories",
      label: "Blog Categories",
      icon: BookOpen,
      data: blogCategories,
      setter: setBlogCategories,
      attributeType: "blog-categories",
    },
    {
      id: "tour-categories",
      label: "Tour Categories",
      icon: Calendar,
      data: tourCategories,
      setter: setTourCategories,
      attributeType: "tour-categories",
    },
    {
      id: "tour-tags",
      label: "Tour Tags",
      icon: Tag,
      data: tourTags,
      setter: setTourTags,
      attributeType: "tour-tags",
    },
  ];

  // Load data from Firebase
  useEffect(() => {
    const loadAttributes = async () => {
      setLoading(true);
      try {
        const promises = tabs.map(async (tab) => {
          const result = await getAttributes(tab.attributeType);
          if (result.didSucceed) {
            tab.setter(result.items);
          }
        });
        await Promise.all(promises);
      } catch (error) {
        console.error("Error loading attributes:", error);
        setMessage("Failed to load attributes");
      } finally {
        setLoading(false);
      }
    };

    loadAttributes();
  }, []);

  // Clear message after 3 seconds
   useEffect(() => {
     if (message) {
       const timer = setTimeout(() => setMessage(""), 3000);
       return () => clearTimeout(timer);
     }
   }, [message]);

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

  const handleDelete = async (item) => {
     if (
       window.confirm(
         `Are you sure you want to delete "${item?.name || "this item"}"`
       )
     ) {
      setSaving(true);
      setMessage("");
      
      const currentTab = tabs.find((tab) => tab.id === activeTab);
      if (currentTab) {
        try {
          const result = await deleteAttribute(currentTab.attributeType, item.id);
          
          if (result.didSucceed) {
            const currentData = getCurrentData();
            const setter = getCurrentSetter();
            setter(currentData.filter((i) => i.id !== item.id));
            setMessage("Attribute deleted successfully!");
          } else {
            setMessage(result.message || "Failed to delete attribute");
          }
        } catch (error) {
          console.error("Error deleting attribute:", error);
          setMessage("Failed to delete attribute");
        } finally {
          setSaving(false);
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    
    const currentTab = tabs.find((tab) => tab.id === activeTab);
    if (!currentTab) {
      setSaving(false);
      return;
    }

    try {
      if (modalMode === "add") {
        const result = await createAttribute(currentTab.attributeType, formData);
        
        if (result.didSucceed) {
          const currentData = getCurrentData();
          const setter = getCurrentSetter();
          setter([...currentData, result.item]);
          setMessage("Attribute added successfully!");
          setShowModal(false);
        } else {
          setMessage(result.message || "Failed to add attribute");
        }
      } else if (modalMode === "edit") {
        const result = await updateAttribute(currentTab.attributeType, selectedItem.id, formData);
        
        if (result.didSucceed) {
          const currentData = getCurrentData();
          const setter = getCurrentSetter();
          setter(
            currentData.map((item) =>
              item.id === selectedItem.id
                ? { ...formData, id: selectedItem.id }
                : item
            )
          );
          setMessage("Attribute updated successfully!");
          setShowModal(false);
        } else {
          setMessage(result.message || "Failed to update attribute");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("An error occurred while saving");
    } finally {
      setSaving(false);
    }
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
            disabled={loading || saving}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl hover:from-primary/90 hover:to-primary/70 transition-all duration-200 font-quicksand font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Plus className="w-4 h-4 mr-2" />
            )}
            Add {currentTabData?.label.slice(0, -1) || "Attribute"}
          </button>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`p-4 rounded-lg ${message.includes('success') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
            {message}
          </div>
        )}

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
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-2 text-gray-600">Loading attributes...</span>
              </div>
            ) : (
              <DataTable
                data={getCurrentData()}
                columns={columns}
                actions={actions}
                searchable={true}
                exportable={true}
              />
            )}
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
                    disabled={saving}
                    className="flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl hover:from-primary/90 hover:to-primary/70 transition-all duration-200 font-quicksand font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    {saving ? "Saving..." : modalMode === "add" ? "Create" : "Update"}{" "}
                    {!saving && (currentTabData?.label.slice(0, -1) || "Attribute")}
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
