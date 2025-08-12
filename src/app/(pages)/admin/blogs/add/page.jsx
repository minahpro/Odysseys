"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextInput, TextArea } from "@/components/inputFields";
import { PrimaryButton, SecondaryButton } from "@/components/buttons";
import { Plus, Trash2, Upload } from "lucide-react";

const AddBlogPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    tags: [""],
    status: "draft",
    featured: false,
    featuredImage: null,
  });

  const categories = [
    "Wildlife",
    "Adventure",
    "Culture",
    "Travel Tips",
    "Destinations",
    "Photography",
  ];
  const statuses = ["draft", "published", "archived"];

  const handleInputChange = (field, value) => {
    if (field === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData({ ...formData, title: value, slug });
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
    console.log("Blog data:", formData);
    alert("Blog post created successfully!");
    router.push("/admin/blogs");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <div className="mb-8">
          <h1 className="font-jua text-3xl text-primary mb-2">
            Add New Blog Post
          </h1>
          <p className="font-quicksand text-gray-600">
            Create a new blog post for Wild Odysseys
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
                label="Blog Title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter blog title"
                required
              />
              <TextInput
                label="Slug"
                value={formData.slug}
                onChange={(e) => handleInputChange("slug", e.target.value)}
                placeholder="blog-post-slug"
                required
              />
              <TextInput
                label="Author"
                value={formData.author}
                onChange={(e) => handleInputChange("author", e.target.value)}
                placeholder="Author name"
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
            </div>
            <TextArea
              label="Excerpt"
              value={formData.excerpt}
              onChange={(e) => handleInputChange("excerpt", e.target.value)}
              placeholder="Brief description of the blog post..."
              required
            />
          </div>

          {/* Featured Image */}
          <div className="space-y-4">
            <h2 className="font-jua text-xl text-primary border-b border-gray-200 pb-2">
              Featured Image
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="font-quicksand text-gray-600 mb-2">
                Upload featured image
              </p>
              <p className="font-quicksand text-sm text-gray-500">
                Drag and drop an image here or click to browse
              </p>
              <input type="file" accept="image/*" className="hidden" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h2 className="font-jua text-xl text-primary border-b border-gray-200 pb-2">
              Content
            </h2>
            <TextArea
              label="Blog Content"
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              placeholder="Write your blog content here..."
              className="min-h-[300px]"
              required
            />
          </div>

          {/* Tags */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-jua text-xl text-primary border-b border-gray-200 pb-2">
                Tags
              </h2>
              <button
                type="button"
                onClick={() => addArrayItem("tags")}
                className="flex items-center px-4 py-2 bg-accent text-white rounded-xl hover:bg-accent/90 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Tag
              </button>
            </div>
            {formData.tags.map((tag, index) => (
              <div key={index} className="flex items-center space-x-4">
                <TextInput
                  value={tag}
                  onChange={(e) =>
                    handleArrayChange("tags", index, e.target.value)
                  }
                  placeholder="Tag name..."
                  className="flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem("tags", index)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-xl transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <h2 className="font-jua text-xl text-primary border-b border-gray-200 pb-2">
              Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-4">
                <label className="block font-quicksand font-semibold text-primary mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-quicksand"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center pt-8">
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
                  Mark as featured post
                </label>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <SecondaryButton
              type="button"
              onClick={() => router.push("/admin/blogs")}
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton type="submit">Create Blog Post</PrimaryButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogPage;
