import { Mail, MessageCircle, Phone } from "lucide-react";
import React from "react";

export function QuickTipsBanner() {
  return (
    <div className="mt-12 rounded grid md:grid-cols-3 gap-6">
      <div
        data-aos="fade-up"
        data-aos-delay="300"
        className="bg-primary/20 border-primary/30 rounded-xl p-6 border border-gray-100 text-center"
      >
        <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="h-6 w-6 " />
        </div>
        <h3 className="font-semibold text-white mb-2">Email Support</h3>
        <p className="text-sm text-white/50">
          Get detailed answers within 24 hours
        </p>
      </div>
      <div
        data-aos="fade-up"
        data-aos-delay="500"
        className="bg-primary/20 border-primary/30 rounded-xl p-6 border border-gray-100 text-center"
      >
        <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="h-6 w-6" />
        </div>
        <h3 className="font-semibold text-white mb-2">Live Chat</h3>
        <p className="text-sm text-white/50">
          Instant help from our travel experts
        </p>
      </div>
      <div
        data-aos="fade-up"
        data-aos-delay="700"
        className="bg-primary/20 border-primary/30 rounded-xl p-6 border border-gray-100 text-center"
      >
        <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
          <Phone className="h-6 w-6" />
        </div>
        <h3 className="font-semibold text-white mb-2">Phone Call</h3>
        <p className="text-sm text-white/50">Speak directly with our team</p>
      </div>
    </div>
  );
}
