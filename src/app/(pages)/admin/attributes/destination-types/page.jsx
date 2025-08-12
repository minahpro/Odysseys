"use client";

import { useState } from "react";
import DataTable from "@/components/admin/DataTable";
import Modal from "@/components/admin/Modal";
import { Save } from "lucide-react";

const DestinationTypesPage = () => {
  const [destinationTypes, setDestinationTypes] = useState([
    {
      id: 1,
      name: "National Park",
      slug: "national-park",
      description: "Protected wildlife areas with diverse ecosystems",
      color: "#059669",
      isActive: true,
      createdAt: "2024-01-01",
    },
    {
      id: 2,
      name: "Game Reserve",
      slug: "game-reserve",
      description: "Wildlife conservation areas with controlled access",
      color: "#DC2626",
      isActive: true,
      createdAt: "2024-01-01",
    },
    {
      id: 3,
      name: "Cultural Site",
      slug: "cultural-site",
      description: "Historical and cultural heritage locations",
      color: "#7C3AED",
      isActive: true,
      createdAt: "2024-01-01",
    },
    {
      id: 4,
      name: "Mountain",
      slug: "mountain",
      description: "High altitude trekking and climbing destinations",
      color: "#374151",
      isActive: true,
      createdAt: "2024-01-01",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    color: "#059669",
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
    setEditingType(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      color: "#059669",
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (type) => {
    setEditingType(type);
    setFormData({
      name: type.name,
      slug: type.slug,
      description: type.description,
      color: type.color,
      isActive: type.isActive,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (type) => {
    if (confirm("Are you sure you want to delete this destination type?")) {
      setDestinationTypes(destinationTypes.filter((t) => t.id !== type.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingType) {
      setDestinationTypes(
        destinationTypes.map((t) =>
          t.id === editingType.id ? { ...t, ...formData } : t
        )
      );
    } else {
      setDestinationTypes([
        ...destinationTypes,
        {
          id: Date.now(),
          ...formData,
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
        title="Destination Types"
        data={destinationTypes}
        columns={columns}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingType ? "Edit Destination Type" : "Add Destination Type"}
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
              {editingType ? "Update" : "Create"} Destination Type
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DestinationTypesPage;
