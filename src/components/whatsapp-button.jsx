"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function WhatsAppButton({}) {
  const data = {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    message: "Hello from Go-Africa! I am interested in your services.",
  };

  const whatsappUrl = `https://wa.me/${data.number}?text=${encodeURIComponent(data.message)}`;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center">
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-accent text-primary shadow-lg hover:bg-accent/90 transition-all duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
      </Link>
      <h5 className="ml-2 text-sm text-accent bg-primary/90 p-2 rounded-full">
        Chat on WhatsApp
      </h5>
    </div>
  );
}
