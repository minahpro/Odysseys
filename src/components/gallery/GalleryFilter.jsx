"use client";
import React from "react";
import { Camera, TreePine, Mountain, Waves, Users, MapPin } from "lucide-react";

const categoryIcons = {
  All: Camera,
  Safari: TreePine,
  Trekking: Mountain,
  Beach: Waves,
  Wildlife: TreePine,
  Culture: Users,
  Landscape: Mountain,
  Adventure: MapPin,
};

export default function GalleryFilter({ 
  categories, 
  activeCategory, 
  onCategoryChange, 
  className = "" 
}) {
  return (
    <div className={`flex flex-wrap gap-3 justify-center mb-8 ${className}`}>
      {categories.map((category) => {
        const Icon = categoryIcons[category] || Camera;
        const isActive = activeCategory === category;
        
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
              ${isActive 
                ? 'bg-primary text-white shadow-lg scale-105' 
                : 'bg-white/80 text-gray-700 hover:bg-primary/10 hover:text-primary'
              }
              border border-gray-200 hover:border-primary/30
            `}
            data-aos="fade-up"
            data-aos-delay={categories.indexOf(category) * 50}
          >
            <Icon className="h-4 w-4" />
            <span className="font-medium text-sm">{category}</span>
          </button>
        );
      })}
    </div>
  );
}