"use client";
import { useState, useEffect, useCallback } from "react";
import { 
  getGalleryImages, 
  getGalleryImagesByCategory,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage 
} from "@/firebase/databaseOperations";

export default function useGallery() {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all gallery images
  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await getGalleryImages();
      
      if (result.didSucceed) {
        setImages(result.images);
        
        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(
          result.images
            .map(img => img.category)
            .filter(Boolean)
        )];
        setCategories(uniqueCategories);
      } else {
        setError(result.message || 'Failed to fetch images');
        setImages([]);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      setImages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter images based on category and search term
  const filterImages = useCallback(() => {
    let filtered = images;

    // Filter by category
    if (activeCategory !== 'All') {
      filtered = filtered.filter(img => img.category === activeCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(img => 
        img.title?.toLowerCase().includes(term) ||
        img.description?.toLowerCase().includes(term) ||
        img.location?.toLowerCase().includes(term) ||
        img.tags?.some(tag => tag.toLowerCase().includes(term))
      );
    }

    setFilteredImages(filtered);
  }, [images, activeCategory, searchTerm]);

  // Handle category change
  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
  }, []);

  // Handle search
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  // Add new image
  const addImage = useCallback(async (imageData) => {
    try {
      const result = await createGalleryImage(imageData);
      
      if (result.didSucceed) {
        // Refresh images after adding
        await fetchImages();
        return { success: true, message: result.message };
      } else {
        return { success: false, message: result.message };
      }
    } catch (err) {
      return { success: false, message: 'Failed to add image' };
    }
  }, [fetchImages]);

  // Update image
  const updateImage = useCallback(async (docId, imageData) => {
    try {
      const result = await updateGalleryImage(docId, imageData);
      
      if (result.didSucceed) {
        // Refresh images after updating
        await fetchImages();
        return { success: true, message: result.message };
      } else {
        return { success: false, message: result.message };
      }
    } catch (err) {
      return { success: false, message: 'Failed to update image' };
    }
  }, [fetchImages]);

  // Delete image
  const removeImage = useCallback(async (docId) => {
    try {
      const result = await deleteGalleryImage(docId);
      
      if (result.didSucceed) {
        // Refresh images after deleting
        await fetchImages();
        return { success: true, message: result.message };
      } else {
        return { success: false, message: result.message };
      }
    } catch (err) {
      return { success: false, message: 'Failed to delete image' };
    }
  }, [fetchImages]);

  // Reset filters
  const resetFilters = useCallback(() => {
    setActiveCategory('All');
    setSearchTerm('');
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // Apply filters when dependencies change
  useEffect(() => {
    filterImages();
  }, [filterImages]);

  return {
    // Data
    images: filteredImages,
    allImages: images,
    categories,
    activeCategory,
    searchTerm,
    
    // State
    loading,
    error,
    
    // Actions
    fetchImages,
    handleCategoryChange,
    handleSearch,
    addImage,
    updateImage,
    removeImage,
    resetFilters,
    
    // Computed
    hasImages: filteredImages.length > 0,
    totalImages: images.length,
    filteredCount: filteredImages.length,
  };
}