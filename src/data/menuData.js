import { demoDataBase } from "./Demo-database";

export const menuData = {
  destinations: demoDataBase?.mainDestinations?.slice(0, 6).map((dest) => ({
    name: dest?.title,
    slug: dest?.id,
    description: `(${dest?.subDestinations?.length || 0}) Destinations`,
    image: dest?.photos?.[0],
  })),
  experiences: demoDataBase?.experiances?.slice(0, 6).map((dest) => ({
    name: dest?.title,
    slug: dest?.id,
    description: dest?.overview,
    icon: dest?.icon,
    total: `(${dest?.packages?.length || 0}) journeys`,
  })),

  camps: demoDataBase?.camps?.slice(0, 3).map((dest) => ({
    name: dest?.title,
    slug: dest?.id,
    description: dest?.overview,
    image: dest?.photos?.[0],
  })),

  journeys: [
    {
      name: "Couple",
      href: "/journeys/couple",
      icon: "Heart",
      description: "Romantic safaris for two",
      badge: "Romantic",
      image: "/placeholder.svg?height=80&width=120",
    },
    {
      name: "Family",
      href: "/journeys/family",
      icon: "Users",
      description: "Kid-friendly adventures for all ages",
      image: "/placeholder.svg?height=80&width=120",
    },
    {
      name: "Group",
      href: "/journeys/group",
      icon: "UserCheck",
      description: "Shared experiences with fellow travelers",
      image: "/placeholder.svg?height=80&width=120",
    },
    {
      name: "Adventure",
      href: "/journeys/adventure",
      icon: "Zap",
      description: "Thrilling expeditions and challenges",
      badge: "Adrenaline",
      image: "/placeholder.svg?height=80&width=120",
    },
    {
      name: "Solo",
      href: "/journeys/solo",
      icon: "User",
      description: "Personal discovery and wildlife encounters",
      image: "/placeholder.svg?height=80&width=120",
    },
    {
      name: "Honeymoon",
      href: "/journeys/honeymoon",
      icon: "Gift",
      description: "Unforgettable romantic getaways",
      badge: "Special",
      image: "/placeholder.svg?height=80&width=120",
    },
    {
      name: "Photography",
      href: "/journeys/photography",
      icon: "Camera",
      description: "Capture Africa's stunning wildlife",
      image: "/placeholder.svg?height=80&width=120",
    },
  ],
  others: [
    {
      name: "Contact Us",
      href: "/contact",
      icon: "Phone",
      description: "Get in touch with our safari experts",
      image: "/placeholder.svg?height=80&width=120",
    },
    {
      name: "Blogs",
      href: "/blog",
      icon: "FileText",
      description: "Stories and insights from the wild",
      badge: "Updated",
      image: "/placeholder.svg?height=80&width=120",
    },
    {
      name: "FAQs",
      href: "/faqs",
      icon: "HelpCircle",
      description: "Common questions about safari travel",
      image: "/placeholder.svg?height=80&width=120",
    },
    {
      name: "Gallery",
      href: "/gallery",
      icon: "Image",
      description: "Stunning photos from our expeditions",
      image: "/placeholder.svg?height=80&width=120",
    },

    {
      name: "Privacy Policies",
      href: "/privacy",
      icon: "Lock",
      description: "Your privacy and data protection",
      image: "/placeholder.svg?height=80&width=120",
    },
  ],
};

export const allMenuDatas = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About Us",
    link: "/about",
  },
  {
    name: "Destinations",
    link: "/destinations",
  },
  {
    name: "Experiences",
    link: "/experiences",
  },
  {
    name: "Journeys",
    link: "/journeys",
  },
  {
    name: "Camps",
    link: "/accommodations",
  },
  {
    name: "Contact Us",
    link: "/contact",
  },
  {
    name: "Blogs",
    link: "/blog",
  },
  {
    name: "FAQs",
    link: "/faqs",
  },
  {
    name: "Gallery",
    link: "/gallery",
  },
  {
    name: "Privacy Policies",
    link: "/privacy",
  },
];
