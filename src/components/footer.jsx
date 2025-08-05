"use client";
import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa6";
import SubscribeSection from "./homeComponents/SubscribeHome";

function Footer() {
  const { companyDetails, isLoading, didSucceed } = useAppContext();
  const socialMediaData = didSucceed && companyDetails[0]?.socialMedia;
  const CompDetails = didSucceed && companyDetails[0];

  const socialMediaFooter = [
    {
      icon: FaWhatsapp,
      link: socialMediaData?.whatsapp,
    },
    {
      icon: FaTiktok,
      link: socialMediaData?.tiktok,
    },
    {
      icon: FaInstagram,
      link: socialMediaData?.instagram,
    },
    {
      icon: FaFacebook,
      link: socialMediaData?.facebook,
    },
    {
      icon: FaTwitter,
      link: socialMediaData?.twitter,
    },
  ];
  return (
    <>
      {/* <SubscribeSection /> */}
      <footer className="text-white bg-primary sm:py-20 py-16">
        <div className="respons">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Go<span className="text-primary">Africa</span>
              </h3>
              <p className="text-white/80 mb-4 leading-relaxed">
                Your gateway to authentic Tanzania. Creating unforgettable
                safari experiences since 2015.
              </p>
              <div className="flex gap-4">
                {socialMediaFooter?.map((item, index) => (
                  <Link
                    key={index}
                    href={item.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-primary cursor-pointer transitions"
                  >
                    <item.icon />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/"
                    className="text-white/80 hover:text-primary transitions"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-white/80 hover:text-primary transitions"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/destinations"
                    className="text-white/80 hover:text-primary transitions"
                  >
                    Destinations
                  </a>
                </li>
                <li>
                  <a
                    href="/accommodations"
                    className="text-white/80 hover:text-primary transitions"
                  >
                    Accommodations
                  </a>
                </li>
              </ul>
            </div>

            {/* Tours */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Our Tours</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-white/80 hover:text-primary transitions"
                  >
                    All Packages
                  </a>
                </li>
                <li>
                  <a
                    href="/tours/climbing-trips"
                    className="text-white/80 hover:text-primary transitions"
                  >
                    Trekking Trips
                  </a>
                </li>
                <li>
                  <a
                    href="/tours/zanzibar-trips"
                    className="text-white/80 hover:text-primary transitions"
                  >
                    Zanzibar Tours
                  </a>
                </li>
                <li>
                  <a
                    href="/tours/day-trips"
                    className="text-white/80 hover:text-primary transitions"
                  >
                    Day Trips
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-accent" />
                  <span className="text-white/80">
                    {isLoading
                      ? "Loading..."
                      : CompDetails?.phoneNumbers?.length > 0 &&
                        CompDetails?.phoneNumbers[0]}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-accent" />
                  <span className="text-white/80 truncate">
                    {isLoading
                      ? "Loading..."
                      : CompDetails?.emails?.length > 0 &&
                        CompDetails?.emails[0]}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-accent" />
                  <span className="text-white/80">
                    {isLoading ? "Loading..." : CompDetails?.address || "---"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-white/60">
              &copy; {new Date().getFullYear()} Wild Odysseys. All rights
              reserved. | Designed with ❤️{" "}
              <Link
                onClick={() => {
                  // send data to GA4
                  gtag("event", "prodesign_link_click");
                }}
                target="_blank"
                className="underline"
                href="https://prodesign.co.tz/"
              >
                Pro-Design
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
