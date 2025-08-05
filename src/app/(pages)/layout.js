"use client";

import "../globals.css";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

export default function RootLayout({ children }) {
  return (
    <div className="bg-bgcolor">
      <NavBar />

      {children}
      <Footer />
    </div>
  );
}
