"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
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
import 'react-quill/dist/quill.snow.css';

// Simple dynamic import for ReactQuill
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <div className="h-32 bg-gray-100 rounded animate-pulse flex items-center justify-center">Loading editor...</div>
});

// QuillJS modules and formats configuration
const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    ['link', 'image'],
    ['blockquote', 'code-block'],
    [{ 'align': [] }],
    ['clean']
  ]
};

const quillFormats = [
  'header', 'bold', 'italic', 'underline', 'strike',
  'list', 'bullet', 'indent', 'link', 'image',
  'blockquote', 'code-block', 'align'
];

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
      key: "featuredImage",
      label: "Image",
      render: (blog) => (
        <img
          src={blog.featuredImage || "/placeholder.svg"}
          alt={blog.title}
          className="w-16 h-10 object-cover rounded-xl border border-gray-200"
        />
      ),
    },
    {
      key: "title",
      label: "Title",
      render: (blog) => (
        <div>
          <h3 className="font-semibold text-gray-900 font-quicksand">
            {blog.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{blog.excerpt}</p>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (blog) => (
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
          {blog.category}
        </span>
      ),
    },
    {
      key: "author",
      label: "Author",
      render: (blog) => (
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-gray-500" />
          <span>{blog.author}</span>
        </div>
      ),
    },
    {
      key: "publishDate",
      label: "Date",
      render: (blog) => (
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span>{blog.publishDate}</span>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (blog) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
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
      title: blog.title,
      content: blog.content || "",
      excerpt: blog.excerpt,
      category: blog.category,
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags || "",
      status: blog.status,
      featuredImage: blog.featuredImage || "",
      images: blog.images || [],
      author: blog.author || "Admin",
      slug: blog.slug || "",
      isPublished: blog.isPublished || false,
      isFeatured: blog.isFeatured || false,
      createdAt: blog.createdAt,
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
      const blogData = {
        ...formData,
        slug: formData.slug || generateSlug(formData.title),
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        images: selectedImages,
        isPublished: formData.status === 'published',
        updatedAt: new Date(),
      };

      let result;
      if (selectedBlog) {
        result = await updateDocument("blogs", selectedBlog.id, blogData);
      } else {
        result = await createDocument(blogData, "blogs");
      }

      if (result.didSucceed) {
        await loadBlogs();
        setShowAddModal(false);
        setShowEditModal(false);
        setSelectedImages([]);
      } else {
        alert(result.message || "Failed to save blog post");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Error saving blog post");
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-jua">Blogs</h1>
          <p className="text-gray-600 font-quicksand">
            Manage blog posts and articles
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl hover:from-primary/80 hover:to-primary transition-all duration-200 font-quicksand font-medium shadow-lg hover:shadow-xl"
        >
          <Plus className="w-4 h-4" />
          <span>Add Blog Post</span>
        </button>
      </div>

      <DataTable data={blogs} columns={columns} actions={actions} />

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
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
              Content *
            </label>
            <div className="border-2 border-gray-200 rounded-xl">
              {typeof window !== 'undefined' && (
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(content) => {
                    setFormData({ ...formData, content });
                  }}
                  modules={quillModules}
                  formats={quillFormats}
                  style={{ minHeight: '200px' }}
                  placeholder="Write your blog content here..."
                />
              )}
            </div>
          </div>

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
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
              Content *
            </label>
            <div className="border-2 border-gray-200 rounded-xl">
              {typeof window !== 'undefined' && (
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(content) => {
                    setFormData({ ...formData, content });
                  }}
                  modules={quillModules}
                  formats={quillFormats}
                  style={{ minHeight: '200px' }}
                  placeholder="Write your blog content here..."
                />
              )}
            </div>
          </div>

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
