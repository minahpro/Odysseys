"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminProtectedRoute from "@/components/admin/AdminProtectedRoute";
import {
  LayoutDashboard,
  Package,
  MapPin,
  Home,
  FileText,
  ImageIcon,
  HelpCircle,
  Shield,
  Settings,
  Users,
  Calendar,
  MessageSquare,
  Mail,
  Tags,
  Menu,
  X,
  LogOut,
  ChevronDown,
  User,
  Bell,
  Flag,
} from "lucide-react";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("");
  const pathname = usePathname();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin",
    },
    {
      id: "packages",
      label: "Packages",
      icon: Package,
      href: "/admin/packages",
    },
    {
      id: "destinations",
      label: "Destinations",
      icon: MapPin,
      href: "/admin/destinations",
    },
    {
      id: "countries",
      label: "Countries",
      icon: Flag,
      href: "/admin/countries",
    },
    {
      id: "accommodations",
      label: "Accommodations",
      icon: Home,
      href: "/admin/accommodations",
    },
    { id: "blogs", label: "Blogs", icon: FileText, href: "/admin/blogs" },
    {
      id: "gallery",
      label: "Gallery",
      icon: ImageIcon,
      href: "/admin/gallery",
    },
    { id: "faqs", label: "FAQs", icon: HelpCircle, href: "/admin/faqs" },
    {
      id: "privacy",
      label: "Privacy Policy",
      icon: Shield,
      href: "/admin/privacy",
    },
    {
      id: "bookings",
      label: "Bookings",
      icon: Calendar,
      href: "/admin/bookings",
    },
    {
      id: "messages",
      label: "Messages",
      icon: MessageSquare,
      href: "/admin/messages",
    },
    {
      id: "subscribers",
      label: "Subscribers",
      icon: Mail,
      href: "/admin/subscribers",
    },
    { id: "users", label: "Users", icon: Users, href: "/admin/users" },
    {
      id: "attributes",
      label: "Attributes",
      icon: Tags,
      href: "/admin/attributes",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: "/admin/settings",
    },
  ];

  const getCurrentPageTitle = () => {
    const currentItem = menuItems.find((item) => item.href === pathname);
    if (currentItem) return currentItem.label;

    // Check submenu items
    for (const item of menuItems) {
      if (item.submenu) {
        const subItem = item.submenu.find((sub) => sub.href === pathname);
        if (subItem) return subItem.label;
      }
    }

    return "Dashboard";
  };

  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-primary text-accent transition-all duration-300 flex flex-col fixed h-full z-30`}
      >
        {/* Header */}
        <div className="p-4 border-b border-white/20">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h1 className="font-jua text-xl text-secondary">
                  Wild Odysseys
                </h1>
                <p className="font-quicksand text-sm text-accent">
                  Admin Panel
                </p>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-accent/10 rounded-xl transition-colors"
            >
              {sidebarOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-scroll h-[calc(100vh-160px)] space-y-2">
          {menuItems.map((item) => (
            <div key={item.id}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() =>
                      setActiveMenu(activeMenu === item.id ? "" : item.id)
                    }
                    className={`w-full flex items-center p-3 rounded-xl transition-colors hover:bg-accent/10 ${
                      activeMenu === item.id ? "bg-accent/10" : ""
                    }`}
                  >
                    <item.icon
                      className={`${sidebarOpen ? "w-5 h-5" : "w-6 h-6"} flex-shrink-0`}
                    />
                    {sidebarOpen && (
                      <>
                        <span className="ml-3 font-quicksand">
                          {item.label}
                        </span>
                        <ChevronDown
                          className={`ml-auto w-4 h-4 transform transition-transform ${activeMenu === item.id ? "rotate-180" : ""}`}
                        />
                      </>
                    )}
                  </button>

                  {/* Submenu */}
                  {item.submenu && activeMenu === item.id && sidebarOpen && (
                    <div className="ml-8 mt-2 space-y-1">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.id}
                          href={subitem.href}
                          className="block p-2 text-sm font-quicksand text-highlight hover:text-secondary transition-colors rounded"
                        >
                          {subitem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={`w-full flex items-center p-3 rounded-xl transition-colors hover:bg-accent/10 ${
                    pathname === item.href ? "bg-secondary" : ""
                  }`}
                >
                  <item.icon
                    className={`${sidebarOpen ? "w-5 h-5" : "w-6 h-6"} flex-shrink-0`}
                  />
                  {sidebarOpen && (
                    <span className="ml-3 font-quicksand">{item.label}</span>
                  )}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col ${sidebarOpen ? "ml-64" : "ml-20"} transition-all duration-300`}
      >
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 p-4 sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <h2 className="font-jua text-2xl text-primary">
              {getCurrentPageTitle()}
            </h2>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></span>
              </button>
              <Link
                href="/admin/profile"
                className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="font-quicksand text-sm text-gray-700">
                  Admin
                </span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="container mx-auto px-4 py-4 ">{children}</main>
      </div>
    </div>
    </AdminProtectedRoute>
  );
};

export default AdminLayout;
