"use client";

import { useState, useEffect, useRef } from "react";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
import { FormTextEditor } from "@/components/FormTextEditor";
import ImageUploadGallerySelection from "@/components/admin/ImageUploadGallerySelection";
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
import {
  createDocument,
  updateDocument,
  deleteDocument,
  fetchDocuments,
} from "@/firebase/databaseOperations";
import {
  getGalleryImages,
  createGalleryImage,
} from "@/firebase/databaseOperations";
import { uploadFile } from "@/firebase/fileOperations";

const AccommodationsPage = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [countries, setCountries] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [gallerySearchTerm, setGallerySearchTerm] = useState("");
  const [showImageSelector, setShowImageSelector] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    destinationId: "",
    countryId: "",
    category: "",
    photos: [],
    featuredImage: "",
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

  // Load data on component mount
  useEffect(() => {
    loadAccommodations();
    loadDestinations();
    loadCountries();
    loadGalleryImages();
  }, []);

  const loadAccommodations = async () => {
    try {
      setLoading(true);
      const result = await fetchDocuments('accommodations');
      if (result.didSucceed) {
        setAccommodations(result.items || []);
      } else {
        console.error('Error loading accommodations:', result.message);
      }
    } catch (error) {
      console.error('Error loading accommodations:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadDestinations = async () => {
    try {
      const result = await fetchDocuments('destinations');
      if (result.didSucceed) {
        setDestinations(result.items || []);
      } else {
        console.error('Error loading destinations:', result.message);
      }
    } catch (error) {
      console.error('Error loading destinations:', error);
    }
  };

  const loadCountries = async () => {
    try {
      const result = await fetchDocuments('countries');
      if (result.didSucceed) {
        setCountries(result.items || []);
      } else {
        console.error('Error loading countries:', result.message);
      }
    } catch (error) {
      console.error('Error loading countries:', error);
    }
  };

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
          description: `Uploaded for accommodation: ${formData.name}`,
          imageUrl,
          category: 'accommodation',
          tags: ['accommodation', 'uploaded'],
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
      alert('Error uploading images');
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
      destinationId: "",
      countryId: "",
      category: "",
      photos: [],
      featuredImage: "",
      overview: "",
      where: "outPark",
      hotel_website_url: "",
      hotel_phone_number: "",
      amenities: [""],
      activities: [""],
      status: "active",
    });
    setSelectedImages([]);
    setSelectedAccommodation(null);
    setShowModal(true);
  };

  const handleEdit = (acc) => {
    setModalMode("edit");
    setSelectedAccommodation(acc);
    setFormData({
      name: acc.name || "",
      slug: acc.slug || "",
      destinationId: acc.destinationId || "",
      countryId: acc.countryId || "",
      category: acc.category || "",
      photos: acc.photos || [],
      featuredImage: acc.featuredImage || "",
      overview: acc.overview || "",
      where: acc.where || "outPark",
      hotel_website_url: acc.hotel_website_url || "",
      hotel_phone_number: acc.hotel_phone_number || "",
      amenities: acc.amenities || [""],
      activities: acc.activities || [""],
      status: acc.status || "active",
    });
    setSelectedImages(acc.photos || []);
    setShowModal(true);
  };

  const handleView = (acc) => {
    setModalMode("view");
    setSelectedAccommodation(acc);
    setShowModal(true);
  };

  const handleDelete = async (acc) => {
    if (window.confirm(`Are you sure you want to delete "${acc.name}"?`)) {
      setLoading(true);
      try {
        const result = await deleteDocument('accommodations', acc.id);
        if (result.didSucceed) {
          console.log('Accommodation deleted successfully');
          await loadAccommodations(); // Reload data from database
        } else {
          console.error('Error deleting accommodation:', result.message);
          alert('Error deleting accommodation: ' + result.message);
        }
      } catch (error) {
        console.error('Error deleting accommodation:', error);
        alert('Error deleting accommodation: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const accommodationData = {
        ...formData,
        photos: selectedImages || [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      if (modalMode === "add") {
        const result = await createDocument('accommodations', accommodationData);
        if (result.didSucceed) {
          console.log('Accommodation created successfully');
          await loadAccommodations(); // Reload data from database
        } else {
          console.error('Error creating accommodation:', result.message);
          alert('Error creating accommodation: ' + result.message);
        }
      } else if (modalMode === "edit") {
        const result = await updateDocument('accommodations', selectedAccommodation.id, accommodationData);
        if (result.didSucceed) {
          console.log('Accommodation updated successfully');
          await loadAccommodations(); // Reload data from database
        } else {
          console.error('Error updating accommodation:', result.message);
          alert('Error updating accommodation: ' + result.message);
        }
      }

      setSelectedImages([]);
      setShowModal(false);
    } catch (error) {
      console.error('Error submitting accommodation:', error);
      alert('Error submitting accommodation: ' + error.message);
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                      Country *
                    </label>
                    <select
                      value={formData.countryId}
                      onChange={(e) =>
                        setFormData({ ...formData, countryId: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand"
                      required
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                      Destination *
                    </label>
                    <select
                      value={formData.destinationId}
                      onChange={(e) =>
                        setFormData({ ...formData, destinationId: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand"
                      required
                    >
                      <option value="">Select Destination</option>
                      {destinations.map((destination) => (
                        <option key={destination.id} value={destination.id}>
                          {destination.name}
                        </option>
                      ))}
                    </select>
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

                <FormTextEditor
                  label="Overview *"
                  value={formData.overview}
                  onChange={(content) => {
                    setFormData({ ...formData, overview: content });
                  }}
                  placeholder="Enter accommodation overview"
                  minHeight="150px"
                  required
                />

                {/* Gallery Images Section */}
            
               <ImageUploadGallerySelection
                selectedImages={selectedImages}
                galleryImages={galleryImages}
                gallerySearchTerm={gallerySearchTerm}
                uploading={uploading}
                onImageUpload={handleImageUpload}
                onImageSelect={handleImageSelect}
                onRemoveSelectedImage={handleRemoveSelectedImage}
                onSetFeaturedImage={handleSetFeaturedImage}
                onGallerySearchChange={setGallerySearchTerm}
              />

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

        {/* Image Selector Modal */}
        {showImageSelector && (
          <Modal
            isOpen={showImageSelector}
            onClose={() => setShowImageSelector(false)}
            title="Select Images from Gallery"
            size="4xl"
          >
            <div className="space-y-6">
              {/* Search */}
              <div>
                <input
                  type="text"
                  placeholder="Search images..."
                  value={gallerySearchTerm}
                  onChange={(e) => setGallerySearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand"
                />
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-h-96 overflow-y-auto">
                {galleryImages
                  .filter((image) =>
                    image.name
                      ?.toLowerCase()
                      .includes(gallerySearchTerm.toLowerCase())
                  )
                  .map((image) => (
                    <div
                      key={image.id}
                      className="relative group cursor-pointer"
                    >
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-24 object-cover rounded-lg border-2 border-gray-200 hover:border-primary transition-colors"
                        onClick={() => handleImageSelect(image.url)}
                      />
                      {selectedImages.includes(image.url) && (
                        <div className="absolute inset-0 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Check className="w-6 h-6 text-primary" />
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSetFeaturedImage(image.url);
                        }}
                        className={`absolute top-1 right-1 p-1 rounded-full transition-all ${
                          formData.featuredImage === image.url
                            ? "bg-yellow-500 text-white"
                            : "bg-white/80 text-gray-600 hover:bg-yellow-500 hover:text-white"
                        }`}
                        title="Set as featured image"
                      >
                        <Star className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-sm text-gray-600 font-quicksand">
                  {selectedImages.length} image(s) selected
                </span>
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowImageSelector(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-quicksand"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowImageSelector(false)}
                    className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-quicksand"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AccommodationsPage;
