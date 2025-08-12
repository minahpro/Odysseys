"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextInput, TextArea, NumberInput } from "@/components/inputFields";
import { PrimaryButton, SecondaryButton } from "@/components/buttons";
import { Plus, Trash2, Upload } from "lucide-react";

const AddAccommodationPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    type: "",
    location: "",
    category: "",
    description: "",
    rooms: "",
    pricePerNight: "",
    amenities: [""],
    activities: [""],
    photos: [],
    coordinates: { lat: "", lng: "" },
    featured: false,
  });

  const accommodationTypes = [
    "Safari Lodge",
    "Beach Resort",
    "Mountain Lodge",
    "City Hotel",
    "Tented Camp",
    "Guesthouse",
  ];
  const categories = ["Luxury", "Mid-range", "Budget"];

  const handleInputChange = (field, value) => {
    if (field === "name") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData({ ...formData, name: value, slug });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeArrayItem = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Accommodation data:", formData);
    alert("Accommodation created successfully!");
    router.push("/admin/accommodations");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <div className="mb-8">
          <h1 className="font-jua text-3xl text-primary mb-2">
            Add New Accommodation
          </h1>
          <p className="font-quicksand text-gray-600">
            Create a new accommodation for Wild Odysseys
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <h2 className="font-jua text-xl text-primary border-b border-gray-200 pb-2">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInput
                label="Accommodation Name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter accommodation name"
                required
              />
              <TextInput
                label="Slug"
                value={formData.slug}
                onChange={(e) => handleInputChange("slug", e.target.value)}
                placeholder="accommodation-slug"
                required
              />
              <div className="mb-4">
                <label className="block font-quicksand font-semibold text-primary mb-2">
                  Accommodation Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange("type", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                  required
                >
                  <option value="">Select type</option>
                  {accommodationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <TextInput
                label="Location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Enter location"
                required
              />
              <div className="mb-4">
                <label className="block font-quicksand font-semibold text-primary mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <NumberInput
                label="Number of Rooms"
                value={formData.rooms}
                onChange={(e) => handleInputChange("rooms", e.target.value)}
                placeholder="0"
                required
              />
              <NumberInput
                label="Price per Night (USD)"
                value={formData.pricePerNight}
                onChange={(e) =>
                  handleInputChange("pricePerNight", e.target.value)
                }
                placeholder="0"
                required
              />
            </div>
            <TextArea
              label="Description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe the accommodation..."
              required
            />
          </div>

          {/* Photos */}
          <div className="space-y-4">
            <h2 className="font-jua text-xl text-primary border-b border-gray-200 pb-2">
              Photos
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="font-quicksand text-gray-600 mb-2">
                Upload accommodation photos
              </p>
              <p className="font-quicksand text-sm text-gray-500">
                Drag and drop files here or click to browse
              </p>
              <input type="file" multiple accept="image/*" className="hidden" />
            </div>
          </div>

          {/* Coordinates */}
          <div className="space-y-4">
            <h2 className="font-jua text-xl text-primary border-b border-gray-200 pb-2">
              Location Coordinates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInput
                label="Latitude"
                value={formData.coordinates.lat}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    coordinates: {
                      ...formData.coordinates,
                      lat: e.target.value,
                    },
                  })
                }
                placeholder="-2.1540"
              />
              <TextInput
                label="Longitude"
                value={formData.coordinates.lng}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    coordinates: {
                      ...formData.coordinates,
                      lng: e.target.value,
                    },
                  })
                }
                placeholder="34.6857"
              />
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-jua text-xl text-primary border-b border-gray-200 pb-2">
                Amenities
              </h2>
              <button
                type="button"
                onClick={() => addArrayItem("amenities")}
                className="flex items-center px-4 py-2 bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Amenity
              </button>
            </div>
            {formData.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center space-x-4">
                <TextInput
                  value={amenity}
                  onChange={(e) =>
                    handleArrayChange("amenities", index, e.target.value)
                  }
                  placeholder="Amenity name..."
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("amenities", index)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-xl transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Activities */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-jua text-xl text-primary border-b border-gray-200 pb-2">
                Activities
              </h2>
              <button
                type="button"
                onClick={() => addArrayItem("activities")}
                className="flex items-center px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Activity
              </button>
            </div>
            {formData.activities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4">
                <TextInput
                  value={activity}
                  onChange={(e) =>
                    handleArrayChange("activities", index, e.target.value)
                  }
                  placeholder="Activity name..."
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("activities", index)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-xl transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Featured */}
          <div className="space-y-4">
            <h2 className="font-jua text-xl text-primary border-b border-gray-200 pb-2">
              Settings
            </h2>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) =>
                  handleInputChange("featured", e.target.checked)
                }
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
              />
              <label
                htmlFor="featured"
                className="ml-2 font-quicksand text-gray-700"
              >
                Mark as featured accommodation
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <SecondaryButton
              type="button"
              onClick={() => router.push("/admin/accommodations")}
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit">Create Accommodation</PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccommodationPage;
