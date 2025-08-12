"use client";

import { useState } from "react";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
import { Save } from "lucide-react";

const TourTagsPage = () => {
  const [tourTags, setTourTags] = useState([
    {
      id: 1,
      name: "Wildlife",
      slug: "wildlife",
      description: "Tours featuring wildlife viewing",
      color: "#10B981",
      isActive: true,
      tourCount: 15,
      createdAt: "2024-01-01",
    },
    {
      id: 2,
      name: "Adventure",
      slug: "adventure",
      description: "High-energy adventure activities",
      color: "#F59E0B",
      isActive: true,
      tourCount: 12,
      createdAt: "2024-01-01",
    },
    {
      id: 3,
      name: "Photography",
      slug: "photography",
      description: "Tours designed for photography enthusiasts",
      color: "#8B5CF6",
      isActive: true,
      tourCount: 8,
      createdAt: "2024-01-01",
    },
    {
      id: 4,
      name: "Luxury",
      slug: "luxury",
      description: "Premium luxury experiences",
      color: "#EF4444",
      isActive: true,
      tourCount: 6,
      createdAt: "2024-01-01",
    },
    {
      id: 5,
      name: "Budget",
      slug: "budget",
      description: "Affordable tour options",
      color: "#06B6D4",
      isActive: true,
      tourCount: 10,
      createdAt: "2024-01-01",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    color: "#10B981",
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
      key: "tourCount",
      label: "Tours",
      render: (tourCount) => (
        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-quicksand">
          {tourCount} tours
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
    setEditingTag(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      color: "#10B981",
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (tag) => {
    setEditingTag(tag);
    setFormData({
      name: tag.name,
      slug: tag.slug,
      description: tag.description,
      color: tag.color,
      isActive: tag.isActive,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (tag) => {
    if (confirm("Are you sure you want to delete this tour tag?")) {
      setTourTags(tourTags.filter((t) => t.id !== tag.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingTag) {
      setTourTags(
        tourTags.map((t) =>
          t.id === editingTag.id ? { ...t, ...formData } : t
        )
      );
    } else {
      setTourTags([
        ...tourTags,
        {
          id: Date.now(),
          ...formData,
          tourCount: 0,
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
        title="Tour Tags"
        data={tourTags}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTag ? "Edit Tour Tag" : "Add Tour Tag"}
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
              {editingTag ? "Update" : "Create"} Tour Tag
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TourTagsPage;
