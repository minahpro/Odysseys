"use client";
import { useState } from "react";
import { Mail, Send, Check, Gift, Bell } from "lucide-react";
import { PrimaryButton } from "../buttons";
import { createDocument } from "@/firebase/databaseOperations";

export default function SubscribeSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showTime = () => {
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    const createdAt = new Date();
    //saving data to database........ ....... ............. .
    setIsLoading(true);
    const rs = await createDocument({ email, createdAt }, "mailing_list");

    if (rs?.didSucceed) {
      setIsLoading(false);
      showTime();
      setEmail("");
    } else {
      setIsLoading(false);
    }
  };
  return (
    <section className="py-20 bg-gradient-to-r from-primary via-secondary to-primary relative overflow-hidden">
      {/* Floating Icons */}
      <div className="absolute top-20 right-10 animate-bounce">
        <div className="bg-black/10 backdrop-blur-sm rounded-full p-4">
          <Bell className="w-8 h-8 text-black" />
        </div>
      </div>
      <div className="absolute bottom-20 left-10 animate-bounce">
        <div className="bg-black/10 backdrop-blur-sm rounded-full p-4">
          <Gift className="w-8 h-8 text-black" />
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div data-aos="fade-down" className="mb-12">
          <div className="bg-black/10 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-black" />
          </div>
          <h1
            className={`text-4xl md:text-5xl font-jua font-black text-black mb-6`}
          >
            Stay Updated with Tanzania Adventures
          </h1>

          <p className="text-xl text-black/80 mb-8 leading-relaxed">
            Subscribe to our newsletter and be the first to know about exclusive
            deals, new destinations, travel tips, and special offers. Plus, get
            10% off your first booking!
          </p>
        </div>

        {/* Subscription Form */}
        {!isSubscribed ? (
          <form
            data-aos="fade-up"
            onSubmit={handleSubmit}
            className="max-w-md mx-auto"
          >
            <div className="bg-white rounded-2xl p-2 border border-primary">
              <div className="flex gap-2 flex-wrap">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-transparent text-black placeholder-black/50 pl-12 pr-4 py-4 rounded-xl"
                    required
                  />
                </div>
                <PrimaryButton
                  type="submit"
                  disabled={isLoading}
                  className="bg-black h-full rounded-xl text-primary hover:bg-black/80 disabled:opacity-50 px-8"
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </PrimaryButton>
              </div>
            </div>
          </form>
        ) : (
          <div className="bg-green-600/30  rounded-2xl p-8 border border-white/20 max-w-md mx-auto">
            <div className="bg-green-500/20 p-4 rounded-full inline-block mb-4">
              <Check className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold  mb-2">Thank You!</h3>
            <p className="">
              You've successfully subscribed to our newsletter. Get ready for
              amazing Tanzania adventures!
            </p>
          </div>
        )}

        {/* Benefits */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 my-12">
          <div
            data-aos="fade-up"
            className="bg-black/10 backdrop-blur-sm rounded-2xl p-6"
          >
            <div className="mb-4 flex-all">
              <Bell className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Exclusive Offers</h3>
            <p className="text-black/80 text-sm">
              Get notified about special offers and discounts
            </p>
          </div>
          <div
            data-aos="fade-up"
            className="bg-black/10 backdrop-blur-sm rounded-2xl p-6"
          >
            <div className="mb-4 flex-all">
              <Gift className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">10% Off First Trip</h3>
            <p className="text-black/80 text-sm">
              Welcome bonus for new subscribers
            </p>
          </div>
          <div
            data-aos="fade-up"
            className="bg-black/10 backdrop-blur-sm rounded-2xl p-6"
          >
            <div className="mb-4 flex-all">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold mb-2">Travel Tips</h3>
            <p className="text-black/80 text-sm">
              Expert advice and destination guides
            </p>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mt-4 text-black/60">
          <p className="text-sm">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
