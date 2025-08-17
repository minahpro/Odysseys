"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
      <div
        className={`bg-secondary transitions text-white py-2 px-4 hidden md:block`}
      >
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
          <div className="hidden md:flex items-center space-x-3">
            <PrimaryButton className="text-sm py-5">
              <Link href="/contact">Contact Us</Link>
            </PrimaryButton>
          </div>

          {/* Mobile Menu */}
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

// <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
//             <SheetTrigger asChild>
//               <Button variant="ghost" size="icon" className="lg:hidden">
//                 <Menu className="h-6 w-6 text-primary" />
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="right" className="w-80">
//               <div className="flex flex-col h-full">
//                 <div className="flex items-center justify-between mb-8">
//                   <Image
//                     src="/black2.png"
//                     alt="Wild Odysseys Tanzania"
//                     width={150}
//                     height={50}
//                     className="h-10 w-auto"
//                   />
//                 </div>

//                 <div className="flex flex-col space-y-1 flex-1">
//                   {menuLink?.map((item) =>
//                     item.dropdown ? (
//                       <div
//                         key={item.name}
//                         className="py-2 border-b border-gray-100"
//                       >
//                         <div className="font-medium text-primary mb-3 text-lg">
//                           {item.name}
//                         </div>
//                         <div className="space-y-3">
//                           {item.dropdown.items.map((subItem) => (
//                             <Link
//                               key={subItem.name}
//                               href={subItem.href}
//                               className="flex items-center space-x-3 p-3 rounded-xl hover:bg-highlight transition-colors"
//                               onClick={() => setIsMobileMenuOpen(false)}
//                             >
//                               <div className="relative w-12 h-10 rounded-md overflow-hidden flex-shrink-0">
//                                 <Image
//                                   src={subItem.image || "/placeholder.svg"}
//                                   alt={subItem.name}
//                                   fill
//                                   className="object-cover"
//                                 />
//                               </div>
//                               <div className="flex-1 min-w-0">
//                                 <div className="font-medium text-primary text-sm">
//                                   {subItem.name}
//                                 </div>
//                                 <div className="text-xs text-gray-600 truncate">
//                                   {subItem.description}
//                                 </div>
//                               </div>
//                             </Link>
//                           ))}
//                         </div>
//                       </div>
//                     ) : (
//                       <Link
//                         key={item.name}
//                         href={item.href}
//                         className="text-primary hover:text-accent transition-colors font-medium py-3 border-b border-gray-100"
//                         onClick={() => setIsMobileMenuOpen(false)}
//                       >
//                         {item.name}
//                       </Link>
//                     )
//                   )}
//                 </div>

//                 <div className="space-y-4 mt-8">
//                   <Button className="w-full justify-center bg-primary hover:bg-primary/90">
//                     <Phone className="h-4 w-4 mr-2" /> Call Us
//                   </Button>
//                   <Button className="w-full justify-center bg-green-600 hover:bg-green-700">
//                     <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp
//                   </Button>
//                 </div>
//               </div>
//             </SheetContent>
//           </Sheet>
