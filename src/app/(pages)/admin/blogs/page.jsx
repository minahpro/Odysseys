"use client";

import { useState, useEffect, useRef } from "react";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
import { FormTextEditor } from "@/components/FormTextEditor";
import {
  Plus,
  Eye,
  Edit,
  Trash2,
  FileText,
  Calendar,
  User,
  Tag,
  ImageIcon,
  Upload,
  X,
  Check,
  Grid3X3,
  Search,
  Loader2,
  Star,
  Filter,
  Heart,
  AlertCircle,
} from "lucide-react";
import {
  getAttributes,
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

const BlogsPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showImageSelector, setShowImageSelector] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [imageSearchTerm, setImageSearchTerm] = useState("");
  const [gallerySearchTerm, setGallerySearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    tags: "",
    status: "draft",
    featuredImage: "",
    images: [],
    author: "Admin",
    slug: "",
    isPublished: false,
    isFeatured: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Load data from Firebase
  useEffect(() => {
    loadBlogs();
    loadCategories();
    loadGalleryImages();
  }, []);

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const result = await fetchDocuments("blogs");
      if (result.didSucceed) {
        setBlogs(result.items);
      }
    } catch (error) {
      console.error("Error loading blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const result = await getAttributes("blog-categories");
      if (result.didSucceed) {
        setCategories(result.items);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
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

  // Status options
  const statusOptions = [
    { value: "published", label: "Published", icon: Check, color: "text-green-600" },
    { value: "draft", label: "Draft", icon: AlertCircle, color: "text-yellow-600" },
    { value: "archived", label: "Archived", icon: X, color: "text-red-600" },
  ];

  // Filter blogs based on search and filters
  const filteredBlogs = (blogs || []).filter((blog) => {
    const matchesSearch = blog.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
      blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === "All" || blog.category === filterCategory;
    const matchesStatus = filterStatus === "All" || blog.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Stats for the dashboard
  const stats = [
    {
      title: "Total Posts",
      value: blogs.length,
      icon: FileText,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Published Posts",
      value: blogs.filter((blog) => blog.status === "published").length,
      icon: Check,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Draft Posts",
      value: blogs.filter((blog) => blog.status === "draft").length,
      icon: AlertCircle,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    {
      title: "Featured Posts",
      value: blogs.filter((blog) => blog.isFeatured).length,
      icon: Star,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];

  // Generate slug from title
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const columns = [
    {
      key: "select",
      label: (
        <input
          type="checkbox"
          checked={selectedBlogs.length === filteredBlogs.length && filteredBlogs.length > 0}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedBlogs(filteredBlogs.map(blog => blog.id));
            } else {
              setSelectedBlogs([]);
            }
          }}
          className="rounded border-gray-300 text-primary focus:ring-primary"
        />
      ),
      render: (blog) => (
        <input
          type="checkbox"
          checked={selectedBlogs.includes(blog.id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedBlogs(prev => [...prev, blog.id]);
            } else {
              setSelectedBlogs(prev => prev.filter(id => id !== blog.id));
            }
          }}
          className="rounded border-gray-300 text-primary focus:ring-primary"
        />
      ),
    },
    {
      key: "featuredImage",
      label: "Image",
      responsive: "hidden md:table-cell",
      render: (blog) => (
        <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden">
          <img
            src={blog.featuredImage || "/placeholder.svg"}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      ),
    },
    {
      key: "title",
      label: "Blog Post",
      render: (blog) => (
        <div className="flex items-start space-x-3">
          {/* Mobile image */}
          <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden md:hidden">
            <img
              src={blog.featuredImage || "/placeholder.svg"}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-gray-900 font-quicksand text-sm md:text-base truncate">
              {blog.title}
            </div>
            <p className="text-xs md:text-sm text-gray-500 mt-1 truncate">{blog.excerpt}</p>
            {/* Mobile info */}
            <div className="flex flex-wrap items-center gap-2 mt-2 md:hidden">
              <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                {blog.category}
              </span>
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  blog.status === "published"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {blog.status}
              </span>
              <div className="flex items-center text-xs text-gray-500">
                <User className="w-3 h-3 mr-1" />
                {blog.author}
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="w-3 h-3 mr-1" />
                {blog.publishDate}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      responsive: "hidden md:table-cell",
      render: (blog) => (
        <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
          {blog.category}
        </span>
      ),
    },
    {
      key: "author",
      label: "Author",
      responsive: "hidden lg:table-cell",
      render: (blog) => (
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">{blog.author}</span>
        </div>
      ),
    },
    {
      key: "publishDate",
      label: "Date",
      responsive: "hidden lg:table-cell",
      render: (blog) => (
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700">{blog.publishDate}</span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      responsive: "hidden md:table-cell",
      render: (blog) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            blog.status === "published"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {blog.status}
        </span>
      ),
    },
  ];

  const handleAdd = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      category: "",
      tags: "",
      status: "draft",
      featuredImage: "",
      images: [],
      author: "Admin",
      slug: "",
      isPublished: false,
      isFeatured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    setSelectedImages([]);
    setShowAddModal(true);
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title || "",
      content: blog.content || "",
      excerpt: blog.excerpt || "",
      category: blog.category || "",
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags || "",
      status: blog.status || "draft",
      featuredImage: blog.featuredImage || "",
      images: blog.images || [],
      author: blog.author || "Admin",
      slug: blog.slug || "",
      isPublished: blog.isPublished || false,
      isFeatured: blog.isFeatured || false,
      createdAt: blog.createdAt || new Date(),
      updatedAt: new Date(),
    });
    setSelectedImages(blog.images || []);
    setShowEditModal(true);
  };

  const handleView = (blog) => {
    setSelectedBlog(blog);
    setShowViewModal(true);
  };

  const handleDelete = async (blog) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        setLoading(true);
        const result = await deleteDocument("blogs", blog.id);
        if (result.didSucceed) {
          await loadBlogs();
        } else {
          alert("Failed to delete blog post");
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Error deleting blog post");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Validate required fields
      if (!formData.title?.trim()) {
        alert("Title is required");
        setLoading(false);
        return;
      }

      if (!formData.content?.trim()) {
        alert("Content is required");
        setLoading(false);
        return;
      }

      // Clean and validate form data to prevent undefined values
      const cleanFormData = {
        title: formData.title.trim(),
        content: formData.content,
        excerpt: formData.excerpt?.trim() || "",
        category: formData.category || "",
        tags: formData.tags || "",
        status: formData.status || "draft",
        featuredImage: formData.featuredImage || "",
        author: formData.author || "Admin",
        slug: formData.slug || generateSlug(formData.title),
        isPublished: formData.status === 'published',
        isFeatured: Boolean(formData.isFeatured),
        publishDate: new Date().toLocaleDateString(),
      };

      // Process tags safely
      let processedTags = [];
      if (cleanFormData.tags) {
        processedTags = cleanFormData.tags
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag.length > 0);
      }

      const blogData = {
        ...cleanFormData,
        tags: processedTags,
        images: selectedImages || [],
        // Convert dates to Firestore timestamps
        createdAt: selectedBlog ? selectedBlog.createdAt : new Date(),
        updatedAt: new Date(),
      };

      console.log("Saving blog data:", blogData);

      let result;
      if (selectedBlog) {
        console.log("Updating blog with ID:", selectedBlog.id);
        result = await updateDocument("blogs", selectedBlog.id, blogData);
      } else {
        console.log("Creating new blog");
        result = await createDocument(blogData, "blogs");
      }

      console.log("Save result:", result);

      if (result.didSucceed) {
        await loadBlogs();
        setShowAddModal(false);
        setShowEditModal(false);
        setSelectedImages([]);
        setSelectedBlog(null);
        alert("Blog post saved successfully!");
      } else {
        console.error("Failed to save blog:", result);
        alert(result.message || "Failed to save blog post. Please check the console for details.");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      alert(`Error saving blog post: ${error.message}`);
    } finally {
      setLoading(false);
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
          description: `Uploaded for blog: ${formData.title}`,
          imageUrl,
          category: 'blog',
          tags: ['blog', 'uploaded'],
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

  // Bulk action handlers
  const handleBulkDelete = async () => {
    if (selectedBlogs.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedBlogs.length} selected blog posts?`)) {
      try {
        setLoading(true);
        await Promise.all(selectedBlogs.map(id => deleteDocument("blogs", id)));
        setSelectedBlogs([]);
        await loadBlogs();
      } catch (error) {
        console.error("Error deleting blog posts:", error);
        alert("Error deleting blog posts. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBulkStatusChange = async (newStatus) => {
    if (selectedBlogs.length === 0) return;
    
    try {
      setLoading(true);
      await Promise.all(selectedBlogs.map(id => {
        const blog = blogs.find(b => b.id === id);
        return updateDocument("blogs", id, { ...blog, status: newStatus });
      }));
      setSelectedBlogs([]);
      await loadBlogs();
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
      className: "text-green-600 hover:text-green-800",
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: handleDelete,
      className: "text-red-600 hover:text-red-800",
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

      {/* Blog Management */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 font-jua">
                Blog Post Management 
              </h2>
              <p className="text-gray-600 font-quicksand mt-1">
                Manage your blog posts with comprehensive tools
              </p>
            </div>
            <button
              onClick={handleAdd}
              className="flex items-center px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="font-quicksand">Add New Post</span>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts by title, content, author, or tags..."
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
                <option value="All">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
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
          {selectedBlogs.length > 0 && (
            <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
              <span className="text-sm font-medium text-blue-900">
                {selectedBlogs.length} blog post(s) selected
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleBulkStatusChange('published')}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-lg text-sm hover:bg-green-200 transition-colors"
                >
                  Mark Published
                </button>
                <button
                  onClick={() => handleBulkStatusChange('draft')}
                  className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-lg text-sm hover:bg-yellow-200 transition-colors"
                >
                  Mark Draft
                </button>
                <button
                  onClick={() => handleBulkStatusChange('archived')}
                  className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                >
                  Mark Archived
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

          {/* Results Summary */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 font-quicksand">
              Showing {filteredBlogs.length} of {blogs.length} posts
              {filterCategory !== "All" && ` in ${filterCategory}`}
              {filterStatus !== "All" && ` with status ${filterStatus}`}
            </p>
          </div>

          <DataTable data={filteredBlogs} columns={columns} actions={actions} />
        </div>
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Blog Post"
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setFormData({ 
                      ...formData, 
                      title,
                      slug: generateSlug(title)
                    });
                  }}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                  placeholder="Enter blog post title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                  Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                  placeholder="auto-generated-from-title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                  Excerpt
                </label>
                <textarea
                  rows={3}
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400 resize-none"
                  placeholder="Brief description of the blog post..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
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
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                  placeholder="travel, adventure, culture"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                  Author
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) =>
                      setFormData({ ...formData, isFeatured: e.target.checked })
                    }
                    className="mr-2"
                  />
                  Featured Post
                </label>
              </div>
            </div>

            {/* Right Column - Images */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                  Featured Image
                </label>
                {formData.featuredImage && (
                  <div className="mb-2">
                    <img
                      src={formData.featuredImage}
                      alt="Featured"
                      className="w-full h-32 object-cover rounded-xl border"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, featuredImage: "" })}
                      className="mt-1 text-sm text-red-600 hover:text-red-800"
                    >
                      Remove Featured Image
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                  Gallery Images ({selectedImages.length} selected)
                </label>
                
                {/* Upload Section */}
                <div className="mb-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files)}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary focus:outline-none focus:border-primary disabled:opacity-50"
                  >
                    {uploading ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Uploading...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Upload className="h-5 w-5 mr-2" />
                        Upload Images
                      </div>
                    )}
                  </button>
                </div>

                {/* Gallery Selection */}
                <div className="border rounded-xl p-3 max-h-64 overflow-y-auto">
                  <div className="mb-2">
                    <input
                      type="text"
                      placeholder="Search gallery..."
                      value={gallerySearchTerm}
                      onChange={(e) => setGallerySearchTerm(e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {galleryImages
                      .filter(img => 
                        img.title?.toLowerCase().includes(gallerySearchTerm.toLowerCase()) ||
                        img.tags?.some(tag => tag.toLowerCase().includes(gallerySearchTerm.toLowerCase()))
                      )
                      .map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.imageUrl}
                          alt={image.title}
                          className={`w-full h-16 object-cover rounded cursor-pointer border-2 ${
                            selectedImages.includes(image.imageUrl)
                              ? 'border-primary'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleImageSelect(image.imageUrl)}
                        />
                        <div className="absolute top-1 right-1 flex space-x-1">
                          {selectedImages.includes(image.imageUrl) && (
                            <div className="bg-primary text-white rounded-full p-1">
                              <Check className="h-3 w-3" />
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => handleSetFeaturedImage(image.imageUrl)}
                            className="bg-yellow-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Set as featured image"
                          >
                            <Star className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Images Preview */}
                {selectedImages.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-semibold text-gray-700 mb-2 font-quicksand">Selected Images:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedImages.map((imageUrl, index) => (
                        <div key={index} className="relative">
                          <img
                            src={imageUrl}
                            alt={`Selected ${index + 1}`}
                            className="w-12 h-12 object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveSelectedImage(imageUrl)}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Editor */}
          <FormTextEditor
            label="Content *"
            value={formData.content}
            onChange={(content) => {
              setFormData({ ...formData, content });
            }}
            placeholder="Write your blog content here..."
            minHeight="200px"
          />

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-quicksand font-medium"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formData.title || !formData.content}
              className="px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl hover:from-primary/80 hover:to-primary transition-all duration-200 font-quicksand font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading && (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              )}
              Add Blog Post
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Blog Post"
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setFormData({ 
                      ...formData, 
                      title,
                      slug: generateSlug(title)
                    });
                  }}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                  placeholder="Enter blog post title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                  Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                  placeholder="auto-generated-from-title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                  Excerpt
                </label>
                <textarea
                  rows={3}
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400 resize-none"
                  placeholder="Brief description of the blog post..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
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
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                  placeholder="travel, adventure, culture"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                  Author
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                />
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) =>
                      setFormData({ ...formData, isFeatured: e.target.checked })
                    }
                    className="mr-2"
                  />
                  Featured Post
                </label>
              </div>
            </div>

            {/* Right Column - Images */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                  Featured Image
                </label>
                {formData.featuredImage && (
                  <div className="mb-2">
                    <img
                      src={formData.featuredImage}
                      alt="Featured"
                      className="w-full h-32 object-cover rounded-xl border"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, featuredImage: "" })}
                      className="mt-1 text-sm text-red-600 hover:text-red-800"
                    >
                      Remove Featured Image
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                  Gallery Images ({selectedImages.length} selected)
                </label>
                
                {/* Upload Section */}
                <div className="mb-4">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files)}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-xl hover:border-primary focus:outline-none focus:border-primary disabled:opacity-50"
                  >
                    {uploading ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Uploading...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Upload className="h-5 w-5 mr-2" />
                        Upload Images
                      </div>
                    )}
                  </button>
                </div>

                {/* Gallery Selection */}
                <div className="border rounded-xl p-3 max-h-64 overflow-y-auto">
                  <div className="mb-2">
                    <input
                      type="text"
                      placeholder="Search gallery..."
                      value={gallerySearchTerm}
                      onChange={(e) => setGallerySearchTerm(e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {galleryImages
                      .filter(img => 
                        img.title?.toLowerCase().includes(gallerySearchTerm.toLowerCase()) ||
                        img.tags?.some(tag => tag.toLowerCase().includes(gallerySearchTerm.toLowerCase()))
                      )
                      .map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={image.imageUrl}
                          alt={image.title}
                          className={`w-full h-16 object-cover rounded cursor-pointer border-2 ${
                            selectedImages.includes(image.imageUrl)
                              ? 'border-primary'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleImageSelect(image.imageUrl)}
                        />
                        <div className="absolute top-1 right-1 flex space-x-1">
                          {selectedImages.includes(image.imageUrl) && (
                            <div className="bg-primary text-white rounded-full p-1">
                              <Check className="h-3 w-3" />
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => handleSetFeaturedImage(image.imageUrl)}
                            className="bg-yellow-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Set as featured image"
                          >
                            <Star className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Images Preview */}
                {selectedImages.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-semibold text-gray-700 mb-2 font-quicksand">Selected Images:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedImages.map((imageUrl, index) => (
                        <div key={index} className="relative">
                          <img
                            src={imageUrl}
                            alt={`Selected ${index + 1}`}
                            className="w-12 h-12 object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveSelectedImage(imageUrl)}
                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Editor */}
          <FormTextEditor
            label="Content *"
            value={formData.content}
            onChange={(content) => {
              setFormData({ ...formData, content });
            }}
            placeholder="Write your blog content here..."
            minHeight="200px"
          />

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-quicksand font-medium"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formData.title || !formData.content}
              className="px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl hover:from-primary/80 hover:to-primary transition-all duration-200 font-quicksand font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading && (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              )}
              Update Blog Post
            </button>
          </div>
        </form>
      </Modal>

      {/* View Modal */}
      {showViewModal && selectedBlog && (
        <Modal
          isOpen={showViewModal}
          onClose={() => setShowViewModal(false)}
          title="Blog Post Details"
          size="lg"
        >
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-6 text-white -m-6 mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold font-jua">
                    {selectedBlog.title}
                  </h3>
                  <p className="text-white/80 font-quicksand">
                    {selectedBlog.excerpt}
                  </p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-white/60">
                      By {selectedBlog.author}
                    </span>
                    <span className="text-sm text-white/60">
                      {selectedBlog.publishDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-5">
                <h4 className="font-bold text-gray-900 font-jua mb-4 flex items-center">
                  <Tag className="w-5 h-5 mr-2 text-primary" />
                  Blog Information
                </h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-600 text-sm font-quicksand">
                      Category:
                    </p>
                    <span className="inline-flex px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {selectedBlog.category}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-quicksand">
                      Status:
                    </p>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        selectedBlog.status === "published"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {selectedBlog.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm font-quicksand">
                      Tags:
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedBlog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-5">
                <h4 className="font-bold text-gray-900 font-jua mb-4 flex items-center">
                  <ImageIcon className="w-5 h-5 mr-2 text-primary" />
                  Featured Image
                </h4>
                <img
                  src={selectedBlog.featuredImage || "/placeholder.svg"}
                  alt={selectedBlog.title}
                  className="w-full h-32 object-cover rounded-xl border border-gray-200"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  handleEdit(selectedBlog);
                }}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl hover:from-primary/80 hover:to-primary transition-all duration-200 font-quicksand font-medium shadow-lg hover:shadow-xl"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => setShowViewModal(false)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-quicksand font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default BlogsPage;
