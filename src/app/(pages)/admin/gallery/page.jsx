"use client";

import { useState } from "react";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
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
} from "lucide-react";

const GalleryPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("view"); // view, add, edit
  const [selectedImage, setSelectedImage] = useState(null);

  // Sample gallery data
  const gallery = [
    {
      id: 1,
      title: "Serengeti Sunset",
      description:
        "A breathtaking sunset over the Serengeti plains with acacia trees silhouetted against the sky.",
      image: "/placeholder.svg?height=300&width=400",
      thumbnail: "/placeholder.svg?height=100&width=100",
      location: "Serengeti National Park",
      category: "Landscapes",
      tags: ["Sunset", "Safari", "Wildlife"],
      featured: true,
      views: 1245,
      likes: 328,
      photographer: "John Smith",
      uploadDate: "2024-01-15",
      status: "active",
    },
    {
      id: 2,
      title: "Kilimanjaro Summit",
      description:
        "The view from Uhuru Peak, the highest point on Mount Kilimanjaro, at sunrise.",
      image: "/placeholder.svg?height=300&width=400",
      thumbnail: "/placeholder.svg?height=100&width=100",
      location: "Mount Kilimanjaro",
      category: "Mountains",
      tags: ["Trekking", "Summit", "Sunrise"],
      featured: true,
      views: 982,
      likes: 245,
      photographer: "Sarah Johnson",
      uploadDate: "2024-01-16",
      status: "active",
    },
    {
      id: 3,
      title: "Zanzibar Beach",
      description:
        "Crystal clear turquoise waters and white sand beaches of Nungwi, Zanzibar.",
      image: "/placeholder.svg?height=300&width=400",
      thumbnail: "/placeholder.svg?height=100&width=100",
      location: "Nungwi, Zanzibar",
      category: "Beaches",
      tags: ["Island", "Ocean", "Relaxation"],
      featured: false,
      views: 876,
      likes: 201,
      photographer: "David Wilson",
      uploadDate: "2024-01-17",
      status: "active",
    },
    {
      id: 4,
      title: "Maasai Village",
      description:
        "Traditional Maasai village with colorful dressed warriors performing the jumping dance.",
      image: "/placeholder.svg?height=300&width=400",
      thumbnail: "/placeholder.svg?height=100&width=100",
      location: "Ngorongoro Conservation Area",
      category: "Culture",
      tags: ["Maasai", "Traditional", "Culture"],
      featured: false,
      views: 654,
      likes: 187,
      photographer: "Emma Thompson",
      uploadDate: "2024-01-18",
      status: "active",
    },
    {
      id: 5,
      title: "Lion Pride",
      description:
        "A pride of lions resting under an acacia tree in the afternoon sun.",
      image: "/placeholder.svg?height=300&width=400",
      thumbnail: "/placeholder.svg?height=100&width=100",
      location: "Serengeti National Park",
      category: "Wildlife",
      tags: ["Lions", "Big Cats", "Safari"],
      featured: true,
      views: 1432,
      likes: 356,
      photographer: "Michael Brown",
      uploadDate: "2024-01-19",
      status: "active",
    },
    {
      id: 6,
      title: "Stone Town Streets",
      description:
        "The narrow, winding streets of Stone Town with their characteristic carved wooden doors.",
      image: "/placeholder.svg?height=300&width=400",
      thumbnail: "/placeholder.svg?height=100&width=100",
      location: "Stone Town, Zanzibar",
      category: "Architecture",
      tags: ["Historical", "Urban", "Cultural"],
      featured: false,
      views: 543,
      likes: 132,
      photographer: "Lisa Garcia",
      uploadDate: "2024-01-20",
      status: "draft",
    },
  ];

  // Image categories
  const categories = [
    "Landscapes",
    "Wildlife",
    "Mountains",
    "Beaches",
    "Culture",
    "Architecture",
    "People",
    "Food",
    "Adventure",
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

  const getStatusIcon = (status) => {
    const option = statusOptions.find((opt) => opt.value === status);
    if (!option) return null;
    const Icon = option.icon;
    return <Icon className={`w-4 h-4 ${option.color}`} />;
  };

  const columns = [
    {
      key: "image",
      label: "Image",
      render: (img) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden">
            <img
              src={img.thumbnail || img.image}
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
            <span>{img.views.toLocaleString()}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Heart className="w-4 h-4 mr-1 text-red-500" />
            <span>{img.likes.toLocaleString()}</span>
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
          <span className="text-sm text-gray-700">{img.uploadDate}</span>
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
      category: categories[0],
      tags: [],
      featured: false,
      views: 0,
      likes: 0,
      photographer: "",
      uploadDate: new Date().toISOString().split("T")[0],
      status: "draft",
    });
    setShowModal(true);
  };

  const handleEdit = (img) => {
    setModalMode("edit");
    setSelectedImage({ ...img });
    setShowModal(true);
  };

  const handleView = (img) => {
    setModalMode("view");
    setSelectedImage(img);
    setShowModal(true);
  };

  const handleDelete = (img) => {
    if (
      window.confirm(
        `Are you sure you want to delete the image: "${img.title}"?`
      )
    ) {
      // Delete logic would go here
      console.log("Deleting image:", img.id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save logic would go here
    console.log("Saving image:", selectedImage);
    setShowModal(false);
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
      value: gallery.reduce((sum, img) => sum + img.views, 0).toLocaleString(),
      icon: Eye,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Total Likes",
      value: gallery.reduce((sum, img) => sum + img.likes, 0).toLocaleString(),
      icon: Heart,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
  ];

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

      {/* Gallery Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 font-jua">
                Image Gallery
              </h2>
              <p className="text-gray-600 font-quicksand mt-1">
                Manage your website's image gallery
              </p>
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
        <DataTable data={gallery} columns={columns} actions={actions} />
      </div>

      {/* Modal for View/Add/Edit */}
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
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
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Title
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
                    Location
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
                  Description
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

              {/* Category, Photographer, Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category
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
                    >
                      {categories.map((category) => (
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
                    Photographer
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

              {/* Image Upload */}
              {modalMode !== "view" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Drag and drop an image here, or click to select a file
                      </p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" />
                    <button
                      type="button"
                      className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                      Upload Image
                    </button>
                  </div>
                </div>
              )}

              {/* Featured Toggle */}
              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedImage.featured}
                    onChange={(e) =>
                      setSelectedImage({
                        ...selectedImage,
                        featured: e.target.checked,
                      })
                    }
                    className="sr-only"
                    disabled={modalMode === "view"}
                  />
                  <div
                    className={`relative w-10 h-5 rounded-full transition-colors ${
                      selectedImage.featured ? "bg-primary" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${
                        selectedImage.featured
                          ? "translate-x-5"
                          : "translate-x-0"
                      }`}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    Featured Image
                  </span>
                </label>
              </div>

              {/* Tags */}
              {modalMode === "view" &&
                selectedImage.tags &&
                selectedImage.tags.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {selectedImage.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {/* Stats */}
              {modalMode === "view" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center space-x-2">
                      <Eye className="w-5 h-5 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Views
                      </span>
                    </div>
                    <div className="mt-2 text-2xl font-bold text-gray-900">
                      {selectedImage.views.toLocaleString()}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Likes
                      </span>
                    </div>
                    <div className="mt-2 text-2xl font-bold text-gray-900">
                      {selectedImage.likes.toLocaleString()}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              {modalMode === "view" && (
                <button
                  type="button"
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-quicksand font-medium shadow-lg hover:shadow-xl"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Image</span>
                </button>
              )}
              {modalMode !== "view" && (
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl hover:from-primary/90 hover:to-primary/70 transition-all duration-200 font-quicksand font-medium shadow-lg hover:shadow-xl"
                >
                  {modalMode === "add" ? "Add Image" : "Update Image"}
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-quicksand font-medium"
              >
                {modalMode === "view" ? "Close" : "Cancel"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default GalleryPage;
