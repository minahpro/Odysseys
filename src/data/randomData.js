import {
  MapPin,
  Star,
  Users,
  Clock,
  Camera,
  TreePine,
  Mountain,
  Waves,
} from "lucide-react";

export const zanzibarHighlights = [
  {
    id: 1,
    icon: MapPin,
    title: "Stone Town",
    desc: "UNESCO World Heritage historic center",
  },
  {
    id: 2,
    icon: Star,
    title: "Spice Tours",
    desc: "Aromatic plantations and local culture",
  },
  {
    id: 3,
    icon: Users,
    title: "Beach Paradise",
    desc: "Pristine white sand beaches",
  },
  {
    id: 4,
    icon: Clock,
    title: "Rich History",
    desc: "Centuries of Swahili culture",
  },
];

export const inquiryTypeOptions = [
  { label: "General Inquiry", value: "general" },
  { label: "Safari Booking", value: "safari" },
  { label: "Trekking Tours", value: "trekking" },
  { label: "Accommodation", value: "accommodation" },
  { label: "Day Trips", value: "day-trips" },
  { label: "Custom Package", value: "custom" },
];

// Sample gallery data
export const galleryData = [
  {
    id: 1,
    title: "Serengeti Sunset",
    image:
      "https://images.pexels.com/photos/16174518/pexels-photo-16174518.jpeg",
    category: "Safari",
    location: "Serengeti National Park",
  },
  {
    id: 2,
    title: "Kilimanjaro Summit",
    image:
      "https://images.pexels.com/photos/31107597/pexels-photo-31107597.jpeg",
    category: "Trekking",
    location: "Mount Kilimanjaro",
  },
  {
    id: 3,
    title: "Zanzibar Beach Paradise",
    image:
      "https://images.pexels.com/photos/29889194/pexels-photo-29889194.jpeg",
    category: "Beach",
    location: "Zanzibar",
  },
  {
    id: 4,
    title: "Lion Pride",
    image: "https://images.pexels.com/photos/3498323/pexels-photo-3498323.jpeg",
    category: "Wildlife",
    location: "Ngorongoro Crater",
  },
  {
    id: 5,
    title: "Maasai Culture",
    image: "https://images.pexels.com/photos/667200/pexels-photo-667200.jpeg", // Maasai village scene
    category: "Culture",
    location: "Maasai Village",
  },
  {
    id: 6,
    title: "Baobab Trees",
    image:
      "https://images.pexels.com/photos/29159068/pexels-photo-29159068.jpeg",
    category: "Landscape",
    location: "Tarangire National Park",
  },
  {
    id: 7,
    title: "Great Migration",
    image:
      "https://images.pexels.com/photos/30629757/pexels-photo-30629757.jpeg",
    category: "Wildlife",
    location: "Serengeti National Park",
  },
  {
    id: 8,
    title: "Stone Town Architecture",
    image:
      "https://images.pexels.com/photos/17931812/pexels-photo-17931812.jpeg",
    category: "Culture",
    location: "Stone Town, Zanzibar",
  },
  {
    id: 9,
    title: "Crater Lake",
    image:
      "https://images.pexels.com/photos/30630770/pexels-photo-30630770.jpeg",
    category: "Landscape",
    location: "Ngorongoro Crater",
  },
];

export const categoriesGallery = [
  { name: "All", icon: Camera },
  { name: "Safari", icon: TreePine },
  { name: "Trekking", icon: Mountain },
  { name: "Beach", icon: Waves },
  { name: "Wildlife", icon: TreePine },
  { name: "Culture", icon: Camera },
  { name: "Landscape", icon: Mountain },
];

export const policiesTour = [
  "Free cancellation up to 60 days before departure",
  "50% refund for cancellations 30-59 days before departure",
  "25% refund for cancellations 15-29 days before departure",
  "No refund for cancellations less than 15 days before departure",
  "Travel insurance is highly recommended",
  "Force majeure events may be subject to different terms",
];

export const safarisIdea = [
  {
    id: 1,
    name: "Wildlife Safari",
    value: "wildlife",
    icon: "https://cdn-icons-png.flaticon.com/512/18132/18132533.png",
  },
  {
    id: 2,
    name: "Beach Holiday",
    value: "beach",
    icon: "https://cdn-icons-png.flaticon.com/512/928/928124.png",
  },
  {
    id: 3,
    name: "Cultural Safari",
    value: "cultural",
    icon: "https://cdn-icons-png.flaticon.com/512/1534/1534959.png",
  },
  {
    id: 4,
    name: "Climbing Safari",
    value: "climbing",
    icon: "https://cdn-icons-png.flaticon.com/128/946/946942.png",
  },
  {
    id: 5,
    name: "Camping Safari",
    value: "camping",
    icon: "https://cdn-icons-png.flaticon.com/128/1020/1020586.png",
  },
  {
    id: 6,
    name: "Hiking Safari",
    value: "hiking",
    icon: "https://cdn-icons-png.flaticon.com/128/1974/1974119.png",
  },
  {
    id: 7,
    name: "Hunting Safari",
    value: "hunting",
    icon: "https://cdn-icons-png.flaticon.com/128/8570/8570981.png",
  },
  {
    id: 8,
    name: "Fishing Safari",
    value: "fishing",
    icon: "https://cdn-icons-png.flaticon.com/128/1886/1886369.png",
  },
  {
    id: 9,
    name: "Bird Watching",
    value: "birdwatching",
  },
  {
    id: 10,
    name: "Hot Air Balloon Ride",
    value: "hotairballoon",
  },
  {
    id: 11,
    name: "Night Wildlife Safari",
    value: "nightwildlife",
  },
  {
    id: 12,
    name: "Photography Safari",
    value: "photography",
  },
];

export const heroImages = [
  "/images/gallery/team6.png",
  "/images/gallery/zanzi3.png",
  "/images/gallery/team5.png",
  "/images/gallery/kili6.png",
  "/images/gallery/zanzi1.png",
  "/images/gallery/team3.png",
];

export const routesData = [
  {
    name: "Machame Route",
    duration: "7 days",
    difficulty: "Challenging",
    successRate: "85%",
    description:
      "Known as the 'Whiskey Route', this is the most popular and scenic route to the summit.",
    pros: ["Most scenic route", "Good acclimatization", "Diverse landscapes"],
    cons: ["More crowded", "Challenging terrain", "Steep sections"],
  },
  {
    name: "Lemosho Route",
    duration: "8 days",
    difficulty: "Moderate",
    successRate: "90%",
    description:
      "The newest and most beautiful route with excellent acclimatization profile.",
    pros: ["Highest success rate", "Less crowded", "Beautiful scenery"],
    cons: ["More expensive", "Longer duration", "Remote start"],
  },
  {
    name: "Marangu Route",
    duration: "5 days",
    difficulty: "Easy",
    successRate: "65%",
    description:
      "The 'Coca-Cola Route' with hut accommodation instead of camping.",
    pros: ["Hut accommodation", "Shorter duration", "Less expensive"],
    cons: ["Lower success rate", "Less scenic", "More crowded"],
  },
  {
    name: "Rongai Route",
    duration: "6 days",
    difficulty: "Moderate",
    successRate: "80%",
    description:
      "The only route from the north, offering a unique wilderness experience.",
    pros: ["Less crowded", "Unique perspective", "Good weather"],
    cons: ["Less scenic", "Limited water", "Remote location"],
  },
];
