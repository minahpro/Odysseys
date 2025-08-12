"use client";

import "../globals.css";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <div className="bg-bgcolor">
      {!isAdmin && <NavBar />}
      {children}
      {!isAdmin && <Footer />}
    </div>
  );
}
