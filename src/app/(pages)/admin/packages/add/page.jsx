"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Plus, Trash2, Save, Eye } from "lucide-react";

const AddPackagePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const isEditing = !!editId;

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    type: "",
    duration: "",
    maxGuests: "",
    price: "",
    location: "",
    description: "",
    highlights: [""],
    inclusions: [""],
    exclusions: [""],
    itinerary: [{ day: 1, title: "", description: "" }],
    featured: false,
    status: "active",
  });

  const packageTypes = [
    "Safari",
    "Trekking",
    "Beach",
    "Culture",
    "Adventure",
    "Wildlife",
  ];

  useEffect(() => {
    if (isEditing) {
      // In a real app, fetch package data by ID
      setFormData({
        name: "Serengeti Safari Adventure",
        slug: "serengeti-safari-adventure",
        type: "Safari",
        duration: "7 days",
        maxGuests: "8",
        price: "2500",
        location: "Serengeti National Park",
        description:
          "Experience the ultimate safari adventure in the world-famous Serengeti National Park.",
        highlights: ["Great Migration", "Big Five", "Hot Air Balloon"],
        inclusions: ["Accommodation", "Meals", "Game Drives", "Park Fees"],
        exclusions: ["International Flights", "Visa", "Personal Items"],
        itinerary: [
          {
            day: 1,
            title: "Arrival in Arusha",
            description: "Meet and greet at airport, transfer to hotel",
          },
          {
            day: 2,
            title: "Arusha to Serengeti",
            description: "Drive to Serengeti, afternoon game drive",
          },
        ],
        featured: true,
        status: "active",
      });
    }
  }, [isEditing]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field, defaultValue = "") => {
    setFormData({ ...formData, [field]: [...formData[field], defaultValue] });
  };

  const removeArrayItem = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const addItineraryDay = () => {
    const newDay = {
      day: formData.itinerary.length + 1,
      title: "",
      description: "",
    };
    setFormData({ ...formData, itinerary: [...formData.itinerary, newDay] });
  };

  const removeItineraryDay = (index) => {
    const newItinerary = formData.itinerary.filter((_, i) => i !== index);
    setFormData({ ...formData, itinerary: newItinerary });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Package data:", formData);
    alert(`Package ${isEditing ? "updated" : "created"} successfully!`);
    router.push("/admin/packages");
  };

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="font-jua text-2xl text-primary">
              {isEditing ? "Edit Package" : "Add New Package"}
            </h1>
            <p className="font-quicksand text-gray-600">
              {isEditing
                ? "Update package information"
                : "Create a new tour package"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            type="button"
            className="flex items-center px-4 py-2 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-quicksand font-semibold"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </button>
          <button
            form="package-form"
            type="submit"
            className="flex items-center px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all duration-200 font-quicksand font-semibold shadow-lg hover:shadow-xl"
          >
            <Save className="w-4 h-4 mr-2" />
            {isEditing ? "Update Package" : "Create Package"}
          </button>
        </div>
      </div>

      {/* Form */}
      <form id="package-form" onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h2 className="font-jua text-xl text-primary mb-6">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-quicksand font-semibold text-primary mb-3">
                Package Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  handleInputChange("name", e.target.value);
                  handleInputChange("slug", generateSlug(e.target.value));
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                placeholder="Enter package name..."
                required
              />
            </div>
            <div>
              <label className="block font-quicksand font-semibold text-primary mb-3">
                URL Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => handleInputChange("slug", e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                placeholder="package-url-slug"
                required
              />
            </div>
            <div>
              <label className="block font-quicksand font-semibold text-primary mb-3">
                Package Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand bg-white"
                required
              >
                <option value="">Select Type</option>
                {packageTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-quicksand font-semibold text-primary mb-3">
                Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                placeholder="e.g., 7 days"
                required
              />
            </div>
            <div>
              <label className="block font-quicksand font-semibold text-primary mb-3">
                Max Guests
              </label>
              <input
                type="number"
                min="1"
                value={formData.maxGuests}
                onChange={(e) => handleInputChange("maxGuests", e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                placeholder="Maximum number of guests"
                required
              />
            </div>
            <div>
              <label className="block font-quicksand font-semibold text-primary mb-3">
                Price (USD)
              </label>
              <input
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                placeholder="Package price"
                required
              />
            </div>
          </div>
          <div className="mt-6">
            <label className="block font-quicksand font-semibold text-primary mb-3">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
              placeholder="Package location"
              required
            />
          </div>
          <div className="mt-6">
            <label className="block font-quicksand font-semibold text-primary mb-3">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400 resize-vertical"
              placeholder="Describe the package..."
              required
            />
          </div>
        </div>

        {/* Highlights */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-jua text-xl text-primary">
              Package Highlights
            </h2>
            <button
              type="button"
              onClick={() => addArrayItem("highlights")}
              className="flex items-center px-4 py-2 bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors font-quicksand"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Highlight
            </button>
          </div>
          <div className="space-y-4">
            {formData.highlights.map((highlight, index) => (
              <div key={index} className="flex items-center space-x-3">
                <input
                  type="text"
                  value={highlight}
                  onChange={(e) =>
                    handleArrayChange("highlights", index, e.target.value)
                  }
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                  placeholder="Enter highlight..."
                />
                {formData.highlights.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayItem("highlights", index)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Inclusions & Exclusions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inclusions */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-jua text-xl text-primary">Inclusions</h2>
              <button
                type="button"
                onClick={() => addArrayItem("inclusions")}
                className="flex items-center px-3 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-quicksand text-sm"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add
              </button>
            </div>
            <div className="space-y-3">
              {formData.inclusions.map((inclusion, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={inclusion}
                    onChange={(e) =>
                      handleArrayChange("inclusions", index, e.target.value)
                    }
                    className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400 text-sm"
                    placeholder="What's included..."
                  />
                  {formData.inclusions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("inclusions", index)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Exclusions */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-jua text-xl text-primary">Exclusions</h2>
              <button
                type="button"
                onClick={() => addArrayItem("exclusions")}
                className="flex items-center px-3 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-quicksand text-sm"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add
              </button>
            </div>
            <div className="space-y-3">
              {formData.exclusions.map((exclusion, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={exclusion}
                    onChange={(e) =>
                      handleArrayChange("exclusions", index, e.target.value)
                    }
                    className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400 text-sm"
                    placeholder="What's not included..."
                  />
                  {formData.exclusions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem("exclusions", index)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Itinerary */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-jua text-xl text-primary">Itinerary</h2>
            <button
              type="button"
              onClick={addItineraryDay}
              className="flex items-center px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-quicksand"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Day
            </button>
          </div>
          <div className="space-y-6">
            {formData.itinerary.map((day, index) => (
              <div
                key={index}
                className="border-2 border-gray-100 rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-jua text-lg text-primary">
                    Day {day.day}
                  </h3>
                  {formData.itinerary.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItineraryDay(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block font-quicksand font-semibold text-gray-700 mb-2">
                      Day Title
                    </label>
                    <input
                      type="text"
                      value={day.title}
                      onChange={(e) => {
                        const newItinerary = [...formData.itinerary];
                        newItinerary[index].title = e.target.value;
                        setFormData({ ...formData, itinerary: newItinerary });
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400"
                      placeholder="Day title..."
                    />
                  </div>
                  <div>
                    <label className="block font-quicksand font-semibold text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={day.description}
                      onChange={(e) => {
                        const newItinerary = [...formData.itinerary];
                        newItinerary[index].description = e.target.value;
                        setFormData({ ...formData, itinerary: newItinerary });
                      }}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand placeholder-gray-400 resize-vertical"
                      placeholder="Describe the day's activities..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h2 className="font-jua text-xl text-primary mb-6">
            Package Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-quicksand font-semibold text-primary mb-3">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 font-quicksand bg-white"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) =>
                  handleInputChange("featured", e.target.checked)
                }
                className="w-5 h-5 text-primary bg-gray-100 border-2 border-gray-200 rounded focus:ring-primary/20 focus:ring-2"
              />
              <label
                htmlFor="featured"
                className="ml-3 font-quicksand font-semibold text-primary"
              >
                Featured Package
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPackagePage;
