"use client";

import { useState } from "react";
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
} from "lucide-react";

const BlogsPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    tags: "",
    status: "draft",
    featuredImage: "",
  });

  const blogs = [
    {
      id: 1,
      title: "Best Safari Destinations in Tanzania",
      excerpt: "Discover the most amazing wildlife destinations in Tanzania...",
      category: "Safari",
      tags: ["safari", "wildlife", "tanzania"],
      author: "Admin",
      publishDate: "2024-02-15",
      status: "published",
      featuredImage: "/placeholder.svg?height=60&width=100",
    },
    {
      id: 2,
      title: "Climbing Kilimanjaro: A Complete Guide",
      excerpt:
        "Everything you need to know about climbing Africa's highest peak...",
      category: "Trekking",
      tags: ["kilimanjaro", "trekking", "adventure"],
      author: "Admin",
      publishDate: "2024-02-10",
      status: "published",
      featuredImage: "/placeholder.svg?height=60&width=100",
    },
    {
      id: 3,
      title: "Zanzibar Beach Paradise",
      excerpt: "Explore the beautiful beaches and culture of Zanzibar...",
      category: "Beach",
      tags: ["zanzibar", "beach", "culture"],
      author: "Admin",
      publishDate: "2024-02-05",
      status: "draft",
      featuredImage: "/placeholder.svg?height=60&width=100",
    },
  ];

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
    });
    setShowAddModal(true);
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content || "",
      excerpt: blog.excerpt,
      category: blog.category,
      tags: blog.tags.join(", "),
      status: blog.status,
      featuredImage: blog.featuredImage,
    });
    setShowEditModal(true);
  };

  const handleView = (blog) => {
    setSelectedBlog(blog);
    setShowViewModal(true);
  };

  const handleDelete = (blog) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      console.log("Delete blog:", blog.id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
    setShowAddModal(false);
    setShowEditModal(false);
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
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                placeholder="Enter blog post title"
              />
            </div>
            <div className="md:col-span-2">
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
                placeholder="Brief description of the blog post"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand"
              >
                <option value="">Select Category</option>
                <option value="Safari">Safari</option>
                <option value="Trekking">Trekking</option>
                <option value="Beach">Beach</option>
                <option value="Culture">Culture</option>
                <option value="Adventure">Adventure</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                Tags
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                placeholder="Enter tags separated by commas"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                Featured Image URL
              </label>
              <input
                type="url"
                value={formData.featuredImage}
                onChange={(e) =>
                  setFormData({ ...formData, featuredImage: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                placeholder="https://example.com/image.jpg"
              />
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
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                Content *
              </label>
              <textarea
                rows={8}
                required
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400 resize-none"
                placeholder="Write your blog post content here..."
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-quicksand font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl hover:from-primary/80 hover:to-primary transition-all duration-200 font-quicksand font-medium shadow-lg hover:shadow-xl"
            >
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
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                placeholder="Enter blog post title"
              />
            </div>
            <div className="md:col-span-2">
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
                placeholder="Brief description of the blog post"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand"
              >
                <option value="">Select Category</option>
                <option value="Safari">Safari</option>
                <option value="Trekking">Trekking</option>
                <option value="Beach">Beach</option>
                <option value="Culture">Culture</option>
                <option value="Adventure">Adventure</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                Tags
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                placeholder="Enter tags separated by commas"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                Featured Image URL
              </label>
              <input
                type="url"
                value={formData.featuredImage}
                onChange={(e) =>
                  setFormData({ ...formData, featuredImage: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                placeholder="https://example.com/image.jpg"
              />
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
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2 font-quicksand">
                Content *
              </label>
              <textarea
                rows={8}
                required
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400 resize-none"
                placeholder="Write your blog post content here..."
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-quicksand font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-primary to-primary/80 text-white rounded-xl hover:from-primary/80 hover:to-primary transition-all duration-200 font-quicksand font-medium shadow-lg hover:shadow-xl"
            >
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
