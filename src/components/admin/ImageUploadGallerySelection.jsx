"use client";

import { useRef } from "react";
import {
  Upload,
  Check,
  X,
  Star,
  Loader2,
} from "lucide-react";

const ImageUploadGallerySelection = ({
  selectedImages,
  galleryImages,
  gallerySearchTerm,
  uploading,
  onImageUpload,
  onImageSelect,
  onRemoveSelectedImage,
  onSetFeaturedImage,
  onGallerySearchChange,
}) => {
  const fileInputRef = useRef(null);

  return (
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
          onChange={(e) => onImageUpload(e.target.files)}
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
            onChange={(e) => onGallerySearchChange(e.target.value)}
            className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
          />
        </div>
        {galleryImages.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm">No gallery images available</p>
            <p className="text-xs">Upload images using the button above or add images in the Gallery section</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
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
                  onClick={() => onImageSelect(image.imageUrl)}
                />
                <div className="absolute top-1 right-1 flex space-x-1">
                  {selectedImages.includes(image.imageUrl) && (
                    <div className="bg-primary text-white rounded-full p-1">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => onSetFeaturedImage(image.imageUrl)}
                    className="bg-yellow-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Set as featured image"
                  >
                    <Star className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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
                  onClick={() => onRemoveSelectedImage(imageUrl)}
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
  );
};

export default ImageUploadGallerySelection;