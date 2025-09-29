"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Phone,
  MessageCircle,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import { PrimaryButton } from "./buttons";
import { menuData } from "@/data/menuData";
import { DropDownMenu } from "./DropDownMenu";
import { MobileNav } from "./mobilenav";

export default function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0 });
  const timeoutRef = useRef(null);

  const handleMouseEnter = (menuName, event) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveDropdown(menuName);

    if (!fullWidthMenus.includes(menuName)) {
      const rect = event.currentTarget.getBoundingClientRect();
      const headerRect = event.currentTarget
        .closest("header")
        .getBoundingClientRect();
      setDropdownPosition({
        left: rect.left - headerRect.left - 32, // Adjust for padding
      });
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // Small delay to allow mouse movement to dropdown
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const menuItems = [
    { name: "About Us", items: [] },
    { name: "Destinations", items: menuData.destinations },
    { name: "Experiences", items: menuData.experiences },
    { name: "Camps", items: menuData.camps },
    { name: "Journeys", items: menuData.journeys },
    { name: "Others", items: menuData.others },
  ];

  const fullWidthMenus = ["Destinations", "Experiences", "Camps"];

  return (
    <header
      className={`w-full z-50 transition-all duration-300 bg-accent/95 backdrop-blur-sm relative`}
    >
      {/* Top Bar */}
      <div className={`bg-secondary transitions text-white py-2 px-4`}>
        <div className="respons">
          <div className="flex items-center md:justify-between justify-center text-sm">
            {/* Contact Info */}
            <div className="md:flex hidden items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <a
                  href="mailto:info@wild-odysseys.com"
                  className="hover:text-accent transition-colors"
                >
                  info@wild-odysseys.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <a
                  href="tel:+255753094275"
                  className="hover:text-accent transition-colors"
                >
                  +255 753 094 275
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center space-x-4">
              <span className="text-xs text-gray-300">Follow us:</span>
              <div className="flex items-center space-x-3">
                <a
                  href="https://facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="https://instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a
                  href="https://youtube.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-4 w-4" />
                </a>
                <a
                  href="https://wa.me/255753094275"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="respons">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/black2.png"
              alt="Wild Odysseys Tanzania"
              width={180}
              height={60}
              className="h-14 w-auto"
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-6">
            {menuItems.map((menu) => (
              <div
                key={menu.name}
                className="relative group"
                onMouseEnter={(e) => handleMouseEnter(menu.name, e)}
                onMouseLeave={handleMouseLeave}
              >
                {menu.name === "About Us" ? (
                  <Link href="/about">
                    <button className="flex items-center text-primary hover:text-secondary transition-colors font-semibold focus:outline-none py-2">
                      <span className="tracking-wide">{menu.name}</span>
                    </button>
                  </Link>
                ) : (
                  <button className="flex items-center text-primary hover:text-secondary transition-colors font-semibold focus:outline-none py-2">
                    <span className="tracking-wide">{menu.name}</span>
                    {menu.items.length > 0 && (
                      <ChevronDown className="h-4 ml-1 w-4 transition-transform duration-300 group-hover:rotate-180" />
                    )}
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* Contact Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <PrimaryButton className="text-sm py-5">
              <Link href="/contact">Contact Us</Link>
            </PrimaryButton>
          </div>

          {/* Mobile Menu */}
          <MobileNav />
        </div>
      </div>

      {activeDropdown &&
        menuItems.find((m) => m.name === activeDropdown)?.items.length > 0 && (
          <div
            className={`absolute bg-white shadow-2xl border-t-4 border-secondary transition-all duration-500 opacity-100 visible translate-y-0 ${
              fullWidthMenus.includes(activeDropdown) ? "left-20 right-20" : ""
            }`}
            style={{
              zIndex: 40,
              top: "100%",
              ...(fullWidthMenus.includes(activeDropdown)
                ? {}
                : {
                    left: `${dropdownPosition.left}px`,
                    width: "20rem",
                  }),
            }}
            onMouseEnter={() => handleMouseEnter(activeDropdown)}
            onMouseLeave={handleMouseLeave}
          >
            <DropDownMenu
              activeDropdown={activeDropdown}
              fullWidthMenus={fullWidthMenus}
              menuItems={menuItems}
            />
          </div>
        )}
    </header>
  );
}
