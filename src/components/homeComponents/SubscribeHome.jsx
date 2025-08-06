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
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-5xl relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div data-aos="fade-down" className="mb-12 bg-primary p-12 rounded-xl">
          <div className="bg-accent w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-10 h-10 text-primary" />
          </div>

          <h2 className="md:text-4xl text-3xl text-accent font-jua mb-4">
            Stay Connected with Wild Odysseys
          </h2>

          <p className="text-base text-highlight font-medium mb-8 leading-relaxed">
            Join our community of adventurers and never miss an opportunity to
            explore Tanzania
          </p>
          <div className="absolute top-8 left-8 w-20 h-20 bg-secondary/20 rounded-full"></div>
          <div className="absolute bottom-8 right-8 w-16 h-16 bg-accent/20 rounded-full"></div>
          <div className="absolute top-1/2 right-16 w-12 h-12 bg-white/10 rounded-full"></div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 my-14">
          <div data-aos="fade-up" className="p-8">
            <div className="mb-4 flex-all">
              <Bell className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-lg font-bold mb-2">Exclusive Offers</h3>
            <p className="text-primary text-sm">
              Get notified about special offers and discounts
            </p>
          </div>
          <div data-aos="fade-up" className="p-8">
            <div className="mb-4 flex-all">
              <Gift className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-lg font-bold mb-2">10% Off First Trip</h3>
            <p className="text-primary text-sm">
              Welcome bonus for new subscribers
            </p>
          </div>
          <div data-aos="fade-up" className="p-8">
            <div className="mb-4 flex-all">
              <Mail className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-lg font-bold mb-2">Travel Tips</h3>
            <p className="text-primary text-sm">
              Expert advice and destination guides
            </p>
          </div>
        </div>

        {/* Subscription Form */}
        {!isSubscribed ? (
          <form
            data-aos="fade-up"
            onSubmit={handleSubmit}
            className="max-w-md mx-auto"
          >
            <div className="bg-accent/40 rounded-2xl p-2 border border-secondary/30">
              <div className="flex gap-2 flex-wrap items-center">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 text-primary -translate-y-1/2 h-5 w-5" />
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
                  className="bg-secondary h-full rounded-xl text-white hover:bg-secondary/80 disabled:opacity-50 px-8"
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

        {/* Social Proof */}
        <div className="mt-8 text-black/60">
          <p className="text-sm">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
