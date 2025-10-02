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
  Globe,
  X,
  Save,
  ImageIcon,
  Flag
} from "lucide-react";

const CountriesPage = () => {
  const [countries, setCountries] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    continent: "",
    capital: "",
    currency: "",
    language: "",
    photos: [],
    overview: "",
    attractions: [""],
    status: "active",
  });

  // Image handling states
  const [selectedImages, setSelectedImages] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [gallerySearchTerm, setGallerySearchTerm] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load countries from Firebase
  const loadCountries = async () => {
    try {
      setLoading(true);
      const result = await fetchDocuments("countries");
      if (result.didSucceed) {
        setCountries(result.items || []);
      } else {
        setError("Failed to load countries");
        setCountries([]);
      }
    } catch (error) {
      console.error("Error loading countries:", error);
      setError("Error loading countries");
      setCountries([]);
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
    loadCountries();
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
          description: `Uploaded for country: ${formData.name}`,
          imageUrl,
          category: 'country',
          tags: ['country', 'uploaded'],
          photographer: 'Admin',
          uploadDate: new Date(),
        };
        
        await createGalleryImage(galleryData);
        return imageUrl;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setSelectedImages(prev => [...prev, ...uploadedUrls]);
      await loadGalleryImages(); // Refresh gallery
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Error uploading images: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  // Image selection handler
  const handleImageSelect = (imageUrl) => {
    if (!selectedImages.includes(imageUrl)) {
      setSelectedImages(prev => [...prev, imageUrl]);
    }
  };

  // Remove selected image
  const handleRemoveSelectedImage = (imageUrl) => {
    setSelectedImages(prev => prev.filter(url => url !== imageUrl));
    // If this was the featured image, clear it
    if (formData.featuredImage === imageUrl) {
      setFormData(prev => ({ ...prev, featuredImage: '' }));
    }
  };

  // Set featured image
  const handleSetFeaturedImage = (imageUrl) => {
    setFormData(prev => ({ ...prev, featuredImage: imageUrl }));
  };

  // Table columns configuration
  const columns = [
    {
      key: "name",
      label: "Country Name",
      render: (country) => (
        <div className="flex items-center space-x-3">
          {country.photos && country.photos[0] && (
            <img
              src={country.photos[0]}
              alt={country.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
          )}
          <div>
            <div className="font-semibold text-gray-900">{country.name}</div>
            <div className="text-sm text-gray-500">{country.capital}</div>
          </div>
        </div>
      ),
    },
    {
      key: "continent",
      label: "Continent",
      render: (country) => (
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          {country.continent}
        </span>
      ),
    },
    {
      key: "currency",
      label: "Currency",
      render: (country) => (
        <span className="text-gray-700 font-medium">{country.currency}</span>
      ),
    },
    {
      key: "language",
      label: "Language",
      render: (country) => (
        <span className="text-gray-700">{country.language}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (country) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            country.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {country.status}
        </span>
      ),
    },
  ];

  const handleAdd = () => {
    setModalMode("add");
    setFormData({
      name: "",
      slug: "",
      continent: "",
      capital: "",
      currency: "",
      language: "",
      photos: [],
      overview: "",
      attractions: [""],
      status: "active",
    });
    setSelectedImages([]);
    setSelectedCountry(null);
    setShowModal(true);
  };

  const handleEdit = (country) => {
    setModalMode("edit");
    setSelectedCountry(country);
    setFormData({
      name: country.name || "",
      slug: country.slug || "",
      continent: country.continent || "",
      capital: country.capital || "",
      currency: country.currency || "",
      language: country.language || "",
      photos: country.photos || [],
      overview: country.overview || "",
      attractions: country.attractions || [""],
      status: country.status || "active",
    });
    setSelectedImages(country.photos || []);
    setShowModal(true);
  };

  const handleView = (country) => {
    setModalMode("view");
    setSelectedCountry(country);
    setShowModal(true);
  };

  const handleDelete = async (country) => {
    if (window.confirm(`Are you sure you want to delete "${country.name}"?`)) {
      setLoading(true);
      try {
        const result = await deleteDocument("countries", country.id);
        if (result.didSucceed) {
          console.log("Country deleted successfully");
          await loadCountries();
        } else {
          console.error("Error deleting country:", result.message);
          alert("Error deleting country: " + result.message);
        }
      } catch (error) {
        console.error("Error deleting country:", error);
        alert("Error deleting country: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const countryData = {
        ...formData,
        photos: selectedImages || [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      if (modalMode === "add") {
        const result = await createDocument("countries", countryData);
        if (result.didSucceed) {
          console.log("Country created successfully");
          await loadCountries();
        } else {
          console.error("Error creating country:", result.message);
          alert("Error creating country: " + result.message);
        }
      } else if (modalMode === "edit") {
        const result = await updateDocument("countries", selectedCountry.id, countryData);
        if (result.didSucceed) {
          console.log("Country updated successfully");
          await loadCountries();
        } else {
          console.error("Error updating country:", result.message);
          alert("Error updating country: " + result.message);
        }
      }

      setSelectedImages([]);
      setShowModal(false);
    } catch (error) {
      console.error("Error submitting country:", error);
      alert("Error submitting country: " + error.message);
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

  const addAttraction = () => {
    setFormData({
      ...formData,
      attractions: [...formData.attractions, ""],
    });
  };

  const removeAttraction = (index) => {
    setFormData({
      ...formData,
      attractions: formData.attractions.filter((_, i) => i !== index),
    });
  };

  const updateAttraction = (index, value) => {
    const updated = formData.attractions.map((item, i) =>
      i === index ? value : item
    );
    setFormData({ ...formData, attractions: updated });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-jua">
                Countries Management
              </h1>
              <p className="mt-2 text-gray-600 font-quicksand">
                Manage countries and their information
              </p>
            </div>
            <button
              onClick={handleAdd}
              className="flex items-center px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-quicksand font-semibold"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Country
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 font-quicksand">{error}</p>
          </div>
        )}

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <DataTable
            data={countries}
            columns={columns}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            emptyMessage="No countries found"
          />
        </div>

        {/* Modal */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={
            modalMode === "add"
              ? "Add New Country"
              : modalMode === "edit"
              ? "Edit Country"
              : "Country Details"
          }
          size="4xl"
        >
          {modalMode === "view" ? (
            <div className="space-y-6">
              {selectedCountry && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 font-jua">
                        Basic Information
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-500">Name:</span>
                          <p className="text-gray-900 font-quicksand">{selectedCountry.name}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Continent:</span>
                          <p className="text-gray-900 font-quicksand">{selectedCountry.continent}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Capital:</span>
                          <p className="text-gray-900 font-quicksand">{selectedCountry.capital}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Currency:</span>
                          <p className="text-gray-900 font-quicksand">{selectedCountry.currency}</p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500">Language:</span>
                          <p className="text-gray-900 font-quicksand">{selectedCountry.language}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 font-jua">
                        Images
                      </h3>
                      {selectedCountry.photos && selectedCountry.photos.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                          {selectedCountry.photos.slice(0, 4).map((photo, index) => (
                            <img
                              key={index}
                              src={photo}
                              alt={`${selectedCountry.name} ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 font-quicksand">No images available</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 font-jua">
                      Overview
                    </h3>
                    <div 
                      className="prose max-w-none font-quicksand"
                      dangerouslySetInnerHTML={{ __html: selectedCountry.overview }}
                    />
                  </div>

                  {selectedCountry.attractions && selectedCountry.attractions.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 font-jua">
                        Attractions
                      </h3>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedCountry.attractions.map((attraction, index) => (
                          <li key={index} className="text-gray-700 font-quicksand">
                            {attraction}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    Continent *
                  </label>
                  <select
                    value={formData.continent}
                    onChange={(e) =>
                      setFormData({ ...formData, continent: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand"
                    required
                  >
                    <option value="">Select Continent</option>
                    <option value="Africa">Africa</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="North America">North America</option>
                    <option value="South America">South America</option>
                    <option value="Australia">Australia</option>
                    <option value="Antarctica">Antarctica</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                    Capital *
                  </label>
                  <input
                    type="text"
                    value={formData.capital}
                    onChange={(e) =>
                      setFormData({ ...formData, capital: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                    placeholder="Enter capital city"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                    Currency *
                  </label>
                  <input
                    type="text"
                    value={formData.currency}
                    onChange={(e) =>
                      setFormData({ ...formData, currency: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                    placeholder="e.g., USD, EUR, TZS"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                    Primary Language *
                  </label>
                  <input
                    type="text"
                    value={formData.language}
                    onChange={(e) =>
                      setFormData({ ...formData, language: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                    placeholder="e.g., English, Swahili"
                    required
                  />
                </div>
              </div>

              <FormTextEditor
                label="Overview *"
                value={formData.overview}
                onChange={(content) => {
                  setFormData({ ...formData, overview: content });
                }}
                placeholder="Enter country overview"
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

              {/* Attractions Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 font-jua">
                    Attractions
                  </h3>
                  <button
                    type="button"
                    onClick={addAttraction}
                    className="flex items-center px-3 py-2 bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors text-sm"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Attraction
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.attractions.map((attraction, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={attraction}
                        onChange={(e) => updateAttraction(index, e.target.value)}
                        className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                        placeholder="Enter attraction"
                      />
                      {formData.attractions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeAttraction(index)}
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
                  Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-quicksand font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-quicksand font-semibold disabled:opacity-50"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? "Saving..." : modalMode === "add" ? "Create Country" : "Update Country"}
                </button>
              </div>
            </form>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default CountriesPage;