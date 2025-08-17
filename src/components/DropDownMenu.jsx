"use client";

import {
  ChevronDown,
  BookOpen,
  Handshake,
  Heart,
  Mountain,
  TelescopeIcon as Binoculars,
  Waves,
  TreePine,
  Bird,
  Car,
  Footprints,
  Shield,
  Users,
  MapPin,
  Star,
  Crown,
  Tent,
  Truck,
  Zap,
  User,
  Gift,
  Camera,
  Phone,
  FileText,
  HelpCircle,
  ImageIcon,
  Lock,
  UserCheck,
} from "lucide-react";
import { PrimaryButton } from "@/components/buttons";
import {
  CampsDropDown,
  DestinationsDropDown,
  ExperiencesDropDown,
} from "./menuLink";
import Link from "next/link";

// Icon mapping
const iconMap = {
  BookOpen,
  Handshake,
  Heart,
  Mountain,
  Binoculars,
  Waves,
  TreePine,
  Bird,
  Car,
  Footprints,
  Shield,
  Users,
  MapPin,
  Star,
  Crown,
  Tent,
  Truck,
  Zap,
  User,
  Gift,
  Camera,
  Phone,
  FileText,
  HelpCircle,
  Image: ImageIcon,
  Lock,
  UserCheck,
};

export function DropDownMenu({ activeDropdown, fullWidthMenus, menuItems }) {
  return (
    <>
      {fullWidthMenus.includes(activeDropdown) ? (
        <div className="max-w-6xl mx-auto px-8 py-12">
          <div className="mb-12 flex justify-between items-center flex-wrap gap-4">
            <div className="space-y-1">
              <h3 className="font-jua text-3xl text-primary">
                {activeDropdown}
              </h3>
              <p className="text-primary text-sm max-w-2xl mx-auto">
                {activeDropdown === "Destinations" &&
                  "Explore the most spectacular wildlife destinations across East Africa"}
                {activeDropdown === "Experiences" &&
                  "Discover unique safari adventures and wildlife encounters"}
                {activeDropdown === "Camps" &&
                  "Choose from our carefully selected accommodations"}
              </p>
            </div>

            <Link
              href={
                activeDropdown === "Destinations"
                  ? "/destinations"
                  : activeDropdown === "Experiences"
                    ? "/experiences"
                    : activeDropdown === "Camps"
                      ? "/camps"
                      : "/contact"
              }
            >
              <PrimaryButton className="bg-secondary text-white text-sm hover:bg-accent hover:text-primary">
                {activeDropdown === "Destinations"
                  ? "View Destinations"
                  : activeDropdown === "Experiences"
                    ? "All Experiences"
                    : activeDropdown === "Camps"
                      ? "Explore Camps"
                      : "Contact Us"}
              </PrimaryButton>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems
              .find((m) => m.name === activeDropdown)
              ?.items.map((item, index) => {
                const IconComponent = iconMap[item.icon];
                return (
                  <div key={index}>
                    {activeDropdown === "Destinations" && (
                      <DestinationsDropDown item={item} index={index} />
                    )}
                    {activeDropdown === "Experiences" && (
                      <ExperiencesDropDown
                        item={item}
                        index={index}
                        IconComponent={IconComponent}
                      />
                    )}
                    {activeDropdown === "Camps" && (
                      <CampsDropDown item={item} index={index} />
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <div className="px-6 py-6">
          <h3 className="font-jua text-lg text-primary mb-4 pb-2 border-b border-secondary/20">
            {activeDropdown}
          </h3>
          <div className="space-y-2">
            {menuItems
              .find((m) => m.name === activeDropdown)
              ?.items.map((item) => {
                const IconComponent = iconMap[item.icon];
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/20 transition-colors duration-200 group"
                  >
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center group-hover:bg-secondary transition-colors duration-300 flex-shrink-0">
                      {IconComponent && (
                        <IconComponent className="h-4 w-4 text-accent" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-primary group-hover:text-secondary transition-colors duration-300">
                          {item.name}
                        </span>
                        {item.badge && (
                          <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronDown className="h-3 w-3 text-secondary rotate-[-90deg] group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}

//   {/* Mobile Menu */}
//       <div
//         className={`lg:hidden bg-white border-t border-secondary/20 transition-all duration-500 ${
//           isMenuOpen
//             ? "max-h-screen opacity-100"
//             : "max-h-0 opacity-0 overflow-hidden"
//         }`}
//       >
//         <div className="px-6 py-8 space-y-8">
//           {menuItems.map((menu) => (
//             <div key={menu.name} className="text-center">
//               <h3 className="font-jua text-xl text-primary mb-6">
//                 {menu.name}
//               </h3>
//               <div className="space-y-4">
//                 {menu.items.map((item) => {
//                   const IconComponent = iconMap[item.icon];
//                   return (
//                     <a
//                       key={item.name}
//                       href={item.href}
//                       className="flex items-center space-x-4 p-4 bg-accent/10 rounded-xl hover:bg-accent/20 transition-colors duration-200"
//                     >
//                       <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
//                         {IconComponent && (
//                           <IconComponent className="h-5 w-5 text-accent" />
//                         )}
//                       </div>
//                       <div className="flex-1 text-left">
//                         <div className="flex items-center space-x-2">
//                           <span className="font-medium text-primary">
//                             {item.name}
//                           </span>
//                           {item.badge && (
//                             <span className="bg-secondary text-white text-xs px-2 py-1 rounded-full">
//                               {item.badge}
//                             </span>
//                           )}
//                         </div>
//                         <p className="text-sm text-secondary/80 mt-1">
//                           {item.description}
//                         </p>
//                       </div>
//                     </a>
//                   );
//                 })}
//               </div>
//               <div className="w-16 h-0.5 bg-secondary/30 mx-auto mt-6"></div>
//             </div>
//           ))}
//           <div className="pt-4">
//             <PrimaryButton className="w-full justify-center rounded-full py-4">
//               Enquire Now
//             </PrimaryButton>
//           </div>
//         </div>
//       </div>
