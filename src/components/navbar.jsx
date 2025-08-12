"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  ChevronDown,
  Phone,
  MessageCircle,
  ArrowRight,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import { PrimaryButton } from "./buttons";
import MenuLink from "./menuLink";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to calculate dropdown position
  const getDropdownPosition = (itemName) => {
    const dropdownElement = dropdownRefs.current[itemName];
    if (!dropdownElement) return "left-1/2 transform -translate-x-1/2";

    const rect = dropdownElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const dropdownWidth = 800; // Fixed width from the component

    // Calculate if dropdown would overflow on the right
    const wouldOverflowRight =
      rect.left + dropdownWidth / 2 > viewportWidth - 20;
    // Calculate if dropdown would overflow on the left
    const wouldOverflowLeft = rect.left - dropdownWidth / 2 < 20;

    if (wouldOverflowRight) {
      return "right-0";
    } else if (wouldOverflowLeft) {
      return "left-0";
    } else {
      return "left-1/2 transform -translate-x-1/2";
    }
  };

  const handleMouseEnter = (itemName) => {
    setActiveDropdown(itemName);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const menuLink = MenuLink();
  return (
    <>
      {/* Top Bar */}
      <div className="bg-secondary text-white py-2 px-4 hidden md:block">
        <div className="respons">
          <div className="flex items-center justify-between text-sm">
            {/* Contact Info */}
            <div className="flex items-center space-x-6">
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

      {/* Main Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-lg py-2 top-0"
            : "bg-accent/95 backdrop-blur-sm py-4 top-9"
        }`}
      >
        <div className="respons">
          <div className="flex items-center justify-between">
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
            <div className="hidden lg:flex items-center space-x-6">
              {menuLink?.map((item) =>
                item.dropdown ? (
                  <div
                    key={item.name}
                    className="relative"
                    ref={(el) => (dropdownRefs.current[item.name] = el)}
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button className="flex items-center text-primary hover:text-secondary transition-colors font-semibold focus:outline-none py-2">
                      {item.name}
                      <ChevronDown
                        className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                          activeDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Large Modern Dropdown */}
                    <div
                      className={`absolute top-full mt-2 transition-all duration-300 ${
                        activeDropdown === item.name
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible translate-y-4"
                      } ${getDropdownPosition(item.name)}`}
                    >
                      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-[800px] max-w-[calc(100vw-40px)] max-h-[calc(100vh-120px)] overflow-hidden">
                        {/* Header - Fixed */}
                        <div className="p-8 pb-4 text-center border-b border-gray-100">
                          <h3 className="text-2xl font-jua text-primary mb-2">
                            {item.dropdown.title}
                          </h3>
                          <p className="text-gray-600">
                            {item.dropdown.subtitle}
                          </p>
                        </div>

                        {/* Scrollable Content */}
                        <div className="p-8 pt-4 max-h-[calc(100vh-220px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                          {/* Grid Items */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {item.dropdown.items.map((dropdownItem, index) => (
                              <Link
                                key={dropdownItem.name}
                                href={dropdownItem.href}
                                className="group relative bg-accent/20 rounded-xl p-6 hover:shadow-lg transitions hover:-translate-y-1 border border-secondary/10"
                              >
                                <div className="flex items-start space-x-4">
                                  {/* Image */}
                                  <div className="relative w-20 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                    <Image
                                      src={
                                        dropdownItem.image || "/placeholder.svg"
                                      }
                                      alt={dropdownItem.name}
                                      fill
                                      className="object-cover rounded group-hover:scale-110 transition-transform duration-300"
                                    />
                                  </div>

                                  {/* Content */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between mb-2">
                                      <h4 className="text-primary font-bold group-hover:text-secondary transition-colors">
                                        {dropdownItem.name}
                                      </h4>
                                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 duration-300" />
                                    </div>
                                    <p className="text-primary text-sm mb-3 line-clamp-2">
                                      {dropdownItem.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                      {dropdownItem.price && (
                                        <span className="text-secondary font-bold text-sm">
                                          {dropdownItem.price}
                                        </span>
                                      )}
                                      {dropdownItem.badge && (
                                        <span className="bg-accent text-primary px-2 py-1 rounded-full text-xs font-bold">
                                          {dropdownItem.badge}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-primary hover:text-secondary transition-colors font-semibold py-2"
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>

            {/* Contact Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <PrimaryButton className="text-sm py-5">
                <Link href="/contact">Contact Us</Link>
              </PrimaryButton>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6 text-primary" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <Image
                      src="/black2.png"
                      alt="Wild Odysseys Tanzania"
                      width={150}
                      height={50}
                      className="h-10 w-auto"
                    />
                  </div>

                  <div className="flex flex-col space-y-1 flex-1">
                    {menuLink?.map((item) =>
                      item.dropdown ? (
                        <div
                          key={item.name}
                          className="py-2 border-b border-gray-100"
                        >
                          <div className="font-medium text-primary mb-3 text-lg">
                            {item.name}
                          </div>
                          <div className="space-y-3">
                            {item.dropdown.items.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-highlight transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <div className="relative w-12 h-10 rounded-md overflow-hidden flex-shrink-0">
                                  <Image
                                    src={subItem.image || "/placeholder.svg"}
                                    alt={subItem.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-primary text-sm">
                                    {subItem.name}
                                  </div>
                                  <div className="text-xs text-gray-600 truncate">
                                    {subItem.description}
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="text-primary hover:text-accent transition-colors font-medium py-3 border-b border-gray-100"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      )
                    )}
                  </div>

                  <div className="space-y-4 mt-8">
                    <Button className="w-full justify-center bg-primary hover:bg-primary/90">
                      <Phone className="h-4 w-4 mr-2" /> Call Us
                    </Button>
                    <Button className="w-full justify-center bg-green-600 hover:bg-green-700">
                      <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
}
