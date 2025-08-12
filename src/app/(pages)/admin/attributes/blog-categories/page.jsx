"use client";

import { useState } from "react";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
import { Save } from "lucide-react";

const BlogCategoriesPage = () => {
  const [blogCategories, setBlogCategories] = useState([
    {
      id: 1,
      name: "Travel Tips",
      slug: "travel-tips",
      description: "Helpful advice and tips for travelers",
      color: "#3B82F6",
      isActive: true,
      postCount: 12,
      createdAt: "2024-01-01",
    },
    {
      id: 2,
      name: "Wildlife",
      slug: "wildlife",
      description: "Articles about African wildlife and conservation",
      color: "#10B981",
      isActive: true,
      postCount: 8,
      createdAt: "2024-01-01",
    },
    {
      id: 3,
      name: "Culture",
      slug: "culture",
      description: "Local culture and traditions",
      color: "#8B5CF6",
      isActive: true,
      postCount: 5,
      createdAt: "2024-01-01",
    },
    {
      id: 4,
      name: "Adventure",
      slug: "adventure",
      description: "Adventure stories and experiences",
      color: "#F59E0B",
      isActive: true,
      postCount: 15,
      createdAt: "2024-01-01",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    color: "#3B82F6",
    isActive: true,
  });

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (name, item) => (
        <div className="flex items-center">
          <div
            className="w-4 h-4 rounded-full mr-3"
            style={{ backgroundColor: item.color }}
          ></div>
          <span className="font-quicksand font-medium">{name}</span>
        </div>
      ),
    },
    { key: "slug", label: "Slug" },
    { key: "description", label: "Description" },
    {
      key: "postCount",
      label: "Posts",
      render: (postCount) => (
        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-quicksand">
          {postCount} posts
        </span>
      ),
    },
    {
      key: "isActive",
      label: "Status",
      render: (isActive) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-quicksand ${
            isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    { key: "createdAt", label: "Created" },
  ];

  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      color: "#3B82F6",
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
      color: category.color,
      isActive: category.isActive,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (category) => {
    if (confirm("Are you sure you want to delete this blog category?")) {
      setBlogCategories(blogCategories.filter((c) => c.id !== category.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      setBlogCategories(
        blogCategories.map((c) =>
          c.id === editingCategory.id ? { ...c, ...formData } : c
        )
      );
    } else {
      setBlogCategories([
        ...blogCategories,
        {
          id: Date.now(),
          ...formData,
          postCount: 0,
          createdAt: new Date().toISOString().split("T")[0],
        },
      ]);
    }
    setIsModalOpen(false);
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (name) => {
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name),
    });
  };

  return (
    <div className="space-y-6">
      <DataTable
        title="Blog Categories"
        data={blogCategories}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? "Edit Blog Category" : "Add Blog Category"}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                Color
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                  className="w-12 h-10 border border-gray-300 rounded-xl cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-quicksand font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={formData.isActive}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    isActive: e.target.value === "true",
                  })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-quicksand"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-quicksand"
            >
              <Save className="w-4 h-4 mr-2" />
              {editingCategory ? "Update" : "Create"} Blog Category
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BlogCategoriesPage;
