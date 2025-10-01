"use client";

import { useState, useEffect } from "react";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
import { FormTextEditor } from "@/components/FormTextEditor";
import ImageUploadGallerySelection from "@/components/admin/ImageUploadGallerySelection";
import { 
  createDocument, 
  updateDocument, 
  deleteDocument, 
  fetchDocuments,
  getGalleryImages,
  createGalleryImage
} from "@/firebase/databaseOperations";
import { uploadFile } from "@/firebase/fileOperations";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  MapPin,
  X,
  Save,
  ImageIcon,
  Activity
} from "lucide-react";

const DestinationsPage = () => {
  const [destinations, setDestinations] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [selectedDestination, setSelectedDestination] = useState(null);
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

  // Image handling states
  const [selectedImages, setSelectedImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [gallerySearchTerm, setGallerySearchTerm] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load destinations from Firebase
  const loadDestinations = async () => {
    try {
      setLoading(true);
      const result = await fetchDocuments("destinations");
      if (result.didSucceed) {
        setDestinations(result.items || []);
      } else {
        setError("Failed to load destinations");
        setDestinations([]);
      }
    } catch (error) {
      console.error("Error loading destinations:", error);
      setError("Error loading destinations");
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  };

  // Load gallery images for selection
  const loadGalleryImages = async () => {
    try {
      const result = await getGalleryImages();
      if (result.didSucceed) {
        setGalleryImages(result.images || []);
      }
    } catch (error) {
      console.error("Error loading gallery images:", error);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadDestinations();
    loadGalleryImages();
  }, []);

  // Image upload handler
  const handleImageUpload = async (files) => {
    if (!files || files.length === 0) return;
    
    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const imageUrl = await uploadFile(file, 'gallery');
        
        // Also save to gallery collection
        const galleryData = {
          title: file.name.split('.')[0],
          description: `Uploaded for destination: ${formData.name}`,
          imageUrl,
          category: 'destination',
          tags: ['destination', 'uploaded'],
          photographer: 'Admin',
          uploadDate: new Date(),
          status: 'active',
        };
        
        await createGalleryImage(galleryData);
        return imageUrl;
      });
      
      const uploadedUrls = await Promise.all(uploadPromises);
      setSelectedImages(prev => [...prev, ...uploadedUrls]);
      await loadGalleryImages(); // Refresh gallery
    } catch (error) {
      console.error('Error uploading images:', error);
      setError('Error uploading images');
    } finally {
      setUploading(false);
    }
  };

  // Image selection handlers
  const handleImageSelect = (imageUrl) => {
    setSelectedImages(prev => {
      if (prev.includes(imageUrl)) {
        return prev.filter(url => url !== imageUrl);
      } else {
        return [...prev, imageUrl];
      }
    });
  };

  const handleRemoveSelectedImage = (imageUrl) => {
    setSelectedImages(prev => prev.filter(url => url !== imageUrl));
  };

  const handleSetFeaturedImage = (imageUrl) => {
    setFormData(prev => ({ ...prev, featuredImage: imageUrl }));
  };

  // Form validation
  const validateForm = () => {
    const errors = [];
    
    if (!formData.name.trim()) {
      errors.push("Destination name is required");
    }
    
    if (!formData.slug.trim()) {
      errors.push("Slug is required");
    }
    
    if (!formData.location.trim()) {
      errors.push("Location is required");
    }
    
    if (!formData.type) {
      errors.push("Destination type is required");
    }
    
    if (!formData.overview.trim()) {
      errors.push("Overview is required");
    }
    
    if (formData.activities.length === 0 || formData.activities.every(activity => !activity.trim())) {
      errors.push("At least one activity is required");
    }
    
    if (selectedImages.length === 0) {
      errors.push("At least one photo is required");
    }
    
    return errors;
  };

  const destinationTypes = [
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
    {
      key: "destination",
      label: "Destination",
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
      featuredImage: "",
      overview: "",
      activities: [""],
      status: "active",
    });
    setSelectedImages([]);
    setSelectedDestination(null);
    setError("");
    setShowModal(true);
  };

  const handleEdit = (dest) => {
    setModalMode("edit");
    setSelectedDestination(dest);
    setFormData({
      name: dest.name || "",
      slug: dest.slug || "",
      location: dest.location || "",
      type: dest.type || "",
      photos: dest.photos || [],
      featuredImage: dest.featuredImage || "",
      overview: dest.overview || "",
      activities: dest.activities || [""],
      status: dest.status || "active",
    });
    setSelectedImages(dest.photos || []);
    setError("");
    setShowModal(true);
  };

  const handleView = (dest) => {
    setModalMode("view");
    setSelectedDestination(dest);
    setShowModal(true);
  };

  const handleDelete = async (dest) => {
    if (window.confirm(`Are you sure you want to delete "${dest.name}"?`)) {
      setLoading(true);
      setError("");
      
      try {
        const result = await deleteDocument("destinations", dest.id);
        
        if (result.success) {
          await loadDestinations(); // Reload data
        } else {
          setError(result.error || "Failed to delete destination");
        }
      } catch (error) {
        console.error("Error deleting destination:", error);
        setError("An unexpected error occurred while deleting");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate form
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(", "));
      setLoading(false);
      return;
    }

    try {
      // Prepare destination data with selected images
      const destinationData = {
        ...formData,
        photos: selectedImages,
        updatedAt: new Date(),
      };

      if (modalMode === "add") {
        destinationData.createdAt = new Date();
        const result = await createDocument("destinations", destinationData);
        
        if (result.didSucceed) {
          await loadDestinations(); // Reload data
          setShowModal(false);
          // Reset form
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
          setSelectedImages([]);
        } else {
          setError(result.message || "Failed to create destination");
        }
      } else if (modalMode === "edit") {
        const result = await updateDocument("destinations", selectedDestination.id, destinationData);
        
        if (result.didSucceed) {
          await loadDestinations(); // Reload data
          setShowModal(false);
        } else {
          setError(result.message || "Failed to update destination");
        }
      }
    } catch (error) {
      console.error("Error submitting destination:", error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
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
              Destinations
            </h1>
            <p className="text-gray-600 font-quicksand">
              Manage travel destinations and locations
            </p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl hover:from-primary/90 hover:to-primary/70 transition-all duration-200 font-quicksand font-medium shadow-lg hover:shadow-xl"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Destination
          </button>
        </div>

        {/* Data Table */}
        <div className="w-full overflow-hidden">
          <DataTable
            data={destinations}
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
                ? "Destination Details"
                : modalMode === "add"
                  ? "Add New Destination"
                  : "Edit Destination"
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
                        {selectedDestination?.overview}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 font-jua mb-4">
                        Activities
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {selectedDestination?.activities?.map(
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

                    {selectedDestination?.photos &&
                      selectedDestination.photos.length > 0 && (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 font-jua mb-4">
                            Photos
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {selectedDestination.photos.map((photo, index) => (
                              <img
                                key={index}
                                src={photo || "/placeholder.svg"}
                                alt={`${selectedDestination.name} ${index + 1}`}
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
                          {selectedDestination?.name}
                        </h4>
                        <p className="text-gray-600 font-quicksand">
                          {selectedDestination?.location}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 font-quicksand">
                          Type
                        </h4>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {selectedDestination?.type}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 font-quicksand">
                          Status
                        </h4>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            selectedDestination?.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {selectedDestination?.status}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 font-quicksand">
                          Created
                        </h4>
                        <p className="text-gray-700 font-quicksand">
                          {selectedDestination?.createdAt &&
                            new Date(
                              selectedDestination.createdAt
                            ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Display */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <p className="text-red-600 text-sm font-quicksand">{error}</p>
                  </div>
                )}

                {/* Form Mode Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                      Destination Name *
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
                      placeholder="Enter destination name"
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
                      placeholder="destination-url-slug"
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
                      {destinationTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <FormTextEditor
                  label="Overview *"
                  value={formData.overview}
                  onChange={(content) => {
                    setFormData({ ...formData, overview: content });
                  }}
                  placeholder="Enter destination overview"
                  minHeight="150px"
                  required
                />

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
                  <ImageUploadGallerySelection
                    selectedImages={selectedImages}
                    galleryImages={galleryImages}
                    gallerySearchTerm={gallerySearchTerm}
                    onGallerySearchChange={setGallerySearchTerm}
                    onImageUpload={handleImageUpload}
                    onImageSelect={handleImageSelect}
                    onRemoveSelectedImage={handleRemoveSelectedImage}
                    onSetFeaturedImage={handleSetFeaturedImage}
                    featuredImage={formData.featuredImage}
                    uploading={uploading}
                    maxImages={10}
                    allowFeatured={true}
                  />
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
