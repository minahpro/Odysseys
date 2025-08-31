"use client";

import { useState, useEffect, useRef } from "react";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
import { PageLoading } from "@/components/Loadings/LoadingComp";
import {
  Edit,
  Trash,
  Eye,
  Plus,
  ImageIcon,
  MapPin,
  Tag,
  Calendar,
  User,
  Heart,
  Download,
  Star,
  Check,
  X,
  AlertCircle,
  Grid3X3,
  List,
  Upload,
  Search,
  Filter,
  MoreHorizontal,
  Camera,
  FileImage,
  Loader2,
} from "lucide-react";
import {
  getGalleryImages,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
  getGalleryImagesByCategory,
} from "@/firebase/databaseOperations";
import { uploadFile, deleteFile } from "@/firebase/fileOperations";

const GalleryPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("view"); // view, add, edit
  const [selectedImage, setSelectedImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [viewMode, setViewMode] = useState("list"); // list, grid
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedImages, setSelectedImages] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Image categories
  const categories = [
    "All",
    "Landscapes",
    "Wildlife",
    "Mountains",
    "Beaches",
    "Culture",
    "Architecture",
    "People",
    "Food",
    "Adventure",
    "Safari",
    "Trekking",
  ];

  // Status options
  const statusOptions = [
    { value: "active", label: "Active", icon: Check, color: "text-green-600" },
    {
      value: "draft",
      label: "Draft",
      icon: AlertCircle,
      color: "text-yellow-600",
    },
    { value: "inactive", label: "Inactive", icon: X, color: "text-red-600" },
  ];

  // Load gallery images on component mount
  useEffect(() => {
    loadGalleryImages();
  }, []);

  const loadGalleryImages = async () => {
    try {
      setLoading(true);
      const response = await getGalleryImages();
      if (response.didSucceed) {
        setGallery(response.images || []);
      } else {
        setGallery([]);
      }
    } catch (error) {
      console.error("Error loading gallery images:", error);
      setGallery([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter gallery based on search and filters
  const filteredGallery = (gallery || []).filter((img) => {
    const matchesSearch = img.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
      img.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.photographer?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === "All" || img.category === filterCategory;
    const matchesStatus = filterStatus === "All" || img.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusIcon = (status) => {
    const option = statusOptions.find((opt) => opt.value === status);
    if (!option) return null;
    const Icon = option.icon;
    return <Icon className={`w-4 h-4 ${option.color}`} />;
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Upload image to Firebase Storage
  const uploadImageFile = async (file) => {
    try {
      const fileName = `gallery/${Date.now()}_${file.name}`;
      const downloadURL = await uploadFile(file, fileName);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const columns = [
    {
      key: "select",
      label: (
        <input
          type="checkbox"
          checked={selectedImages.length === filteredGallery.length && filteredGallery.length > 0}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedImages(filteredGallery.map(img => img.id));
            } else {
              setSelectedImages([]);
            }
          }}
          className="rounded border-gray-300"
        />
      ),
      render: (img) => (
        <input
          type="checkbox"
          checked={selectedImages.includes(img.id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedImages([...selectedImages, img.id]);
            } else {
              setSelectedImages(selectedImages.filter(id => id !== img.id));
            }
          }}
          className="rounded border-gray-300"
        />
      ),
    },
    {
      key: "image",
      label: "Image",
      render: (img) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden">
            <img
              src={img.thumbnail || img.image || "/placeholder.svg"}
              alt={img.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium text-gray-900 font-quicksand flex items-center">
              {img.title}
              {img.featured && <Star className="w-4 h-4 text-amber-500 ml-1" />}
            </div>
            <div className="text-xs text-gray-500 flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {img.location}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (img) => (
        <div className="flex flex-wrap gap-1">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {img.category}
          </span>
        </div>
      ),
    },
    {
      key: "stats",
      label: "Stats",
      render: (img) => (
        <div className="space-y-1">
          <div className="flex items-center text-sm text-gray-600">
            <Eye className="w-4 h-4 mr-1 text-gray-500" />
            <span>{(img.views || 0).toLocaleString()}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Heart className="w-4 h-4 mr-1 text-red-500" />
            <span>{(img.likes || 0).toLocaleString()}</span>
          </div>
        </div>
      ),
    },
    {
      key: "photographer",
      label: "Photographer",
      render: (img) => (
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">{img.photographer}</span>
        </div>
      ),
    },
    {
      key: "uploadDate",
      label: "Upload Date",
      render: (img) => (
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">
            {img.uploadDate ? new Date(img.uploadDate).toLocaleDateString() : 'N/A'}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (img) => (
        <div className="flex items-center space-x-1">
          {getStatusIcon(img.status)}
          <span className="text-sm font-medium capitalize">{img.status}</span>
        </div>
      ),
    },
  ];

  const handleAdd = () => {
    setModalMode("add");
    setSelectedImage({
      title: "",
      description: "",
      image: "",
      thumbnail: "",
      location: "",
      category: categories[1], // Skip "All"
      tags: [],
      featured: false,
      views: 0,
      likes: 0,
      photographer: "",
      uploadDate: new Date().toISOString().split("T")[0],
      status: "draft",
      altText: "",
      cameraSettings: {
        camera: "",
        lens: "",
        aperture: "",
        shutterSpeed: "",
        iso: "",
      },
    });
    setImageFile(null);
    setImagePreview(null);
    setShowModal(true);
  };

  const handleEdit = (img) => {
    setModalMode("edit");
    setSelectedImage({ ...img });
    setImageFile(null);
    setImagePreview(null);
    setShowModal(true);
  };

  const handleView = (img) => {
    setModalMode("view");
    setSelectedImage(img);
    setShowModal(true);
  };

  const handleDelete = async (img) => {
    if (
      window.confirm(
        `Are you sure you want to delete the image: "${img.title}"?`
      )
    ) {
      try {
        setLoading(true);
        await deleteGalleryImage(img.id);
        
        // Delete image from Firebase Storage if it exists
        if (img.image && img.image.includes('firebase')) {
          try {
            await deleteFile(img.image);
          } catch (error) {
            console.warn("Error deleting image file:", error);
          }
        }
        
        await loadGalleryImages();
      } catch (error) {
        console.error("Error deleting image:", error);
        alert("Error deleting image. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      
      let imageUrl = selectedImage.image;
      let thumbnailUrl = selectedImage.thumbnail;
      
      // Upload new image if file is selected
      if (imageFile) {
        imageUrl = await uploadImageFile(imageFile);
        thumbnailUrl = imageUrl; // Use same URL for thumbnail for now
      }
      
      const imageData = {
        ...selectedImage,
        image: imageUrl,
        thumbnail: thumbnailUrl,
        tags: Array.isArray(selectedImage.tags) ? selectedImage.tags : 
               typeof selectedImage.tags === 'string' ? selectedImage.tags.split(',').map(tag => tag.trim()) : [],
        uploadDate: modalMode === "add" ? new Date().toISOString() : selectedImage.uploadDate,
        updatedAt: new Date().toISOString(),
      };
      
      if (modalMode === "add") {
        await createGalleryImage(imageData);
      } else {
        await updateGalleryImage(selectedImage.id, imageData);
      }
      
      await loadGalleryImages();
      setShowModal(false);
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error saving image:", error);
      alert("Error saving image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedImages.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedImages.length} selected images?`)) {
      try {
        setLoading(true);
        await Promise.all(selectedImages.map(id => {
          const img = gallery.find(g => g.id === id);
          return deleteGalleryImage(id);
        }));
        setSelectedImages([]);
        await loadGalleryImages();
      } catch (error) {
        console.error("Error deleting images:", error);
        alert("Error deleting images. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBulkStatusChange = async (newStatus) => {
    if (selectedImages.length === 0) return;
    
    try {
      setLoading(true);
      await Promise.all(selectedImages.map(id => {
        const img = gallery.find(g => g.id === id);
        return updateGalleryImage(id, { ...img, status: newStatus });
      }));
      setSelectedImages([]);
      await loadGalleryImages();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const actions = [
    {
      label: "View",
      icon: Eye,
      onClick: handleView,
      className: "text-blue-600 hover:text-blue-800",
    },
    {
      label: "Edit",
      icon: Edit,
      onClick: handleEdit,
      className: "text-amber-600 hover:text-amber-800",
    },
    {
      label: "Delete",
      icon: Trash,
      onClick: handleDelete,
      className: "text-red-600 hover:text-red-800",
    },
  ];

  // Stats for the dashboard
  const stats = [
    {
      title: "Total Images",
      value: gallery.length,
      icon: ImageIcon,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Featured Images",
      value: gallery.filter((img) => img.featured).length,
      icon: Star,
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "Total Views",
      value: gallery.reduce((sum, img) => sum + (img.views || 0), 0).toLocaleString(),
      icon: Eye,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Total Likes",
      value: gallery.reduce((sum, img) => sum + (img.likes || 0), 0).toLocaleString(),
      icon: Heart,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
  ];

  if (loading && gallery.length === 0) {
    return <PageLoading />;
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
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

      {/* Gallery Management */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 font-jua">
                Image Gallery Management
              </h2>
              <p className="text-gray-600 font-quicksand mt-1">
                Manage your website's image gallery with comprehensive tools
              </p>
            </div>
            <div className="flex items-center space-x-3">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-white text-primary shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-white text-primary shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
              </div>
              
              <button
                onClick={handleAdd}
                className="flex items-center px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                <span className="font-quicksand">Add New Image</span>
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search images by title, description, location, or photographer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Status Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              >
                <option value="All">All Status</option>
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedImages.length > 0 && (
            <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
              <span className="text-sm font-medium text-blue-900">
                {selectedImages.length} image(s) selected
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleBulkStatusChange('active')}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm hover:bg-green-200 transition-colors"
                >
                  Mark Active
                </button>
                <button
                  onClick={() => handleBulkStatusChange('draft')}
                  className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-lg text-sm hover:bg-yellow-200 transition-colors"
                >
                  Mark Draft
                </button>
                <button
                  onClick={() => handleBulkStatusChange('inactive')}
                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                >
                  Mark Inactive
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-3 py-1 bg-red-100 text-red-800 rounded-lg text-sm hover:bg-red-200 transition-colors"
                >
                  Delete Selected
                </button>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="text-sm text-gray-600 mb-4">
            Showing {filteredGallery.length} of {gallery.length} images
            {filterCategory !== "All" && ` in ${filterCategory}`}
            {filterStatus !== "All" && ` with status ${filterStatus}`}
            {searchTerm && ` matching "${searchTerm}"`}
          </div>
        </div>

        {/* Gallery Content */}
        {viewMode === "list" ? (
          <DataTable data={filteredGallery} columns={columns} actions={actions} />
        ) : (
          <div className="p-6">
            {filteredGallery.length === 0 ? (
              <div className="text-center py-12">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No images found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm || filterCategory !== "All" || filterStatus !== "All"
                    ? "Try adjusting your search or filters"
                    : "Get started by adding your first image"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGallery.map((img) => (
                  <div
                    key={img.id}
                    className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* Selection Checkbox */}
                    <div className="absolute top-3 left-3 z-10">
                      <input
                        type="checkbox"
                        checked={selectedImages.includes(img.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedImages([...selectedImages, img.id]);
                          } else {
                            setSelectedImages(selectedImages.filter(id => id !== img.id));
                          }
                        }}
                        className="rounded border-gray-300 bg-white/80 backdrop-blur-sm"
                      />
                    </div>
                    
                    {/* Image */}
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={img.thumbnail || img.image || "/placeholder.svg"}
                        alt={img.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-gray-900 text-sm line-clamp-1 flex items-center">
                          {img.title}
                          {img.featured && <Star className="w-3 h-3 text-amber-500 ml-1" />}
                        </h3>
                        <div className="flex items-center space-x-1">
                          {getStatusIcon(img.status)}
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                        {img.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {img.location}
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {img.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {(img.views || 0).toLocaleString()}
                          </span>
                          <span className="flex items-center">
                            <Heart className="w-3 h-3 mr-1" />
                            {(img.likes || 0).toLocaleString()}
                          </span>
                        </div>
                        <span className="flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          {img.photographer}
                        </span>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <button
                          onClick={() => handleView(img)}
                          className="flex items-center text-blue-600 hover:text-blue-800 text-xs"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </button>
                        <button
                          onClick={() => handleEdit(img)}
                          className="flex items-center text-amber-600 hover:text-amber-800 text-xs"
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(img)}
                          className="flex items-center text-red-600 hover:text-red-800 text-xs"
                        >
                          <Trash className="w-3 h-3 mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal for View/Add/Edit */}
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setImageFile(null);
            setImagePreview(null);
          }}
          title={
            modalMode === "view"
              ? "Image Details"
              : modalMode === "add"
                ? "Add New Image"
                : "Edit Image"
          }
          size="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Preview (View Mode) */}
            {modalMode === "view" && (
              <div className="mb-6">
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={selectedImage.image || "/placeholder.svg"}
                    alt={selectedImage.title}
                    className="w-full h-auto max-h-96 object-contain"
                  />
                </div>
              </div>
            )}

            <div className="space-y-4">
              {/* Image Upload (Add/Edit Mode) */}
              {modalMode !== "view" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Upload
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary transition-colors">
                    {imagePreview ? (
                      <div className="space-y-4">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="mx-auto max-h-48 rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview(null);
                            if (fileInputRef.current) {
                              fileInputRef.current.value = '';
                            }
                          }}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Remove Image
                        </button>
                      </div>
                    ) : selectedImage.image && modalMode === "edit" ? (
                      <div className="space-y-4">
                        <img
                          src={selectedImage.image}
                          alt="Current"
                          className="mx-auto max-h-48 rounded-lg"
                        />
                        <p className="text-sm text-gray-500">Current image - upload a new one to replace</p>
                      </div>
                    ) : (
                      <div>
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Drag and drop an image here, or click to select a file
                          </p>
                        </div>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileSelect}
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {imagePreview || (selectedImage.image && modalMode === "edit") ? "Change Image" : "Select Image"}
                    </button>
                  </div>
                </div>
              )}

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={selectedImage.title}
                    onChange={(e) =>
                      setSelectedImage({
                        ...selectedImage,
                        title: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-gray-300 bg-white py-2.5 px-3 text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter image title"
                    disabled={modalMode === "view"}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      id="location"
                      value={selectedImage.location}
                      onChange={(e) =>
                        setSelectedImage({
                          ...selectedImage,
                          location: e.target.value,
                        })
                      }
                      className="pl-10 w-full rounded-xl border border-gray-300 bg-white py-2.5 px-3 text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Enter location"
                      disabled={modalMode === "view"}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description *
                </label>
                <textarea
                  id="description"
                  value={selectedImage.description}
                  onChange={(e) =>
                    setSelectedImage({
                      ...selectedImage,
                      description: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-300 bg-white py-2.5 px-3 text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter image description"
                  rows={3}
                  disabled={modalMode === "view"}
                  required
                ></textarea>
              </div>

              {/* Alt Text */}
              <div>
                <label
                  htmlFor="altText"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Alt Text (for accessibility)
                </label>
                <input
                  type="text"
                  id="altText"
                  value={selectedImage.altText || ''}
                  onChange={(e) =>
                    setSelectedImage({
                      ...selectedImage,
                      altText: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-300 bg-white py-2.5 px-3 text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Describe the image for screen readers"
                  disabled={modalMode === "view"}
                />
              </div>

              {/* Category, Photographer, Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category *
                  </label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <select
                      id="category"
                      value={selectedImage.category}
                      onChange={(e) =>
                        setSelectedImage({
                          ...selectedImage,
                          category: e.target.value,
                        })
                      }
                      className="pl-10 w-full rounded-xl border border-gray-300 bg-white py-2.5 px-3 text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                      disabled={modalMode === "view"}
                      required
                    >
                      {categories.filter(cat => cat !== 'All').map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="photographer"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Photographer *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      id="photographer"
                      value={selectedImage.photographer}
                      onChange={(e) =>
                        setSelectedImage({
                          ...selectedImage,
                          photographer: e.target.value,
                        })
                      }
                      className="pl-10 w-full rounded-xl border border-gray-300 bg-white py-2.5 px-3 text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Enter photographer name"
                      disabled={modalMode === "view"}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    value={selectedImage.status}
                    onChange={(e) =>
                      setSelectedImage({
                        ...selectedImage,
                        status: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-gray-300 bg-white py-2.5 px-3 text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                    disabled={modalMode === "view"}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  id="tags"
                  value={Array.isArray(selectedImage.tags) ? selectedImage.tags.join(', ') : selectedImage.tags || ''}
                  onChange={(e) =>
                    setSelectedImage({
                      ...selectedImage,
                      tags: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-300 bg-white py-2.5 px-3 text-gray-900 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="e.g. wildlife, safari, sunset, nature"
                  disabled={modalMode === "view"}
                />
              </div>

              {/* Featured Toggle */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={selectedImage.featured}
                  onChange={(e) =>
                    setSelectedImage({
                      ...selectedImage,
                      featured: e.target.checked,
                    })
                  }
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                  disabled={modalMode === "view"}
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                  Featured Image
                </label>
                <Star className="w-4 h-4 text-amber-500" />
              </div>

              {/* Camera Settings (Optional) */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Camera Settings (Optional)</h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Camera</label>
                    <input
                      type="text"
                      value={selectedImage.cameraSettings?.camera || ''}
                      onChange={(e) =>
                        setSelectedImage({
                          ...selectedImage,
                          cameraSettings: {
                            ...selectedImage.cameraSettings,
                            camera: e.target.value,
                          },
                        })
                      }
                      className="w-full rounded-lg border border-gray-300 py-1.5 px-2 text-sm"
                      placeholder="Canon EOS R5"
                      disabled={modalMode === "view"}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Lens</label>
                    <input
                      type="text"
                      value={selectedImage.cameraSettings?.lens || ''}
                      onChange={(e) =>
                        setSelectedImage({
                          ...selectedImage,
                          cameraSettings: {
                            ...selectedImage.cameraSettings,
                            lens: e.target.value,
                          },
                        })
                      }
                      className="w-full rounded-lg border border-gray-300 py-1.5 px-2 text-sm"
                      placeholder="24-70mm"
                      disabled={modalMode === "view"}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Aperture</label>
                    <input
                      type="text"
                      value={selectedImage.cameraSettings?.aperture || ''}
                      onChange={(e) =>
                        setSelectedImage({
                          ...selectedImage,
                          cameraSettings: {
                            ...selectedImage.cameraSettings,
                            aperture: e.target.value,
                          },
                        })
                      }
                      className="w-full rounded-lg border border-gray-300 py-1.5 px-2 text-sm"
                      placeholder="f/2.8"
                      disabled={modalMode === "view"}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Shutter</label>
                    <input
                      type="text"
                      value={selectedImage.cameraSettings?.shutterSpeed || ''}
                      onChange={(e) =>
                        setSelectedImage({
                          ...selectedImage,
                          cameraSettings: {
                            ...selectedImage.cameraSettings,
                            shutterSpeed: e.target.value,
                          },
                        })
                      }
                      className="w-full rounded-lg border border-gray-300 py-1.5 px-2 text-sm"
                      placeholder="1/250s"
                      disabled={modalMode === "view"}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">ISO</label>
                    <input
                      type="text"
                      value={selectedImage.cameraSettings?.iso || ''}
                      onChange={(e) =>
                        setSelectedImage({
                          ...selectedImage,
                          cameraSettings: {
                            ...selectedImage.cameraSettings,
                            iso: e.target.value,
                          },
                        })
                      }
                      className="w-full rounded-lg border border-gray-300 py-1.5 px-2 text-sm"
                      placeholder="400"
                      disabled={modalMode === "view"}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            {modalMode !== "view" && (
              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={uploading}
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {modalMode === "add" ? "Adding..." : "Updating..."}
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 h-4 mr-2" />
                      {modalMode === "add" ? "Add Image" : "Update Image"}
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </Modal>
      )}
    </div>
  );
};

export default GalleryPage;
