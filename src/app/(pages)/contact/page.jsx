// pages/ContactUs.js
"use client";
import { PrimaryButton, SecondaryButton } from "@/components/buttons";
import { ContactInfoCard } from "@/components/cards";
import FaqsComp from "@/components/homeComponents/FaqsComp";
import {
  InputField,
  SelectField,
  TextareaField,
} from "@/components/inputField";
import { InlineError } from "@/components/Loadings/ErrorComp";
import { PageLoading } from "@/components/Loadings/LoadingComp";
import { Title } from "@/components/texties";
import TitleHeader from "@/components/titleHeader";
import { useAppContext } from "@/context/AppContext";
import { inquiryTypeOptions } from "@/data/randomData";
import { createDocument } from "@/firebase/databaseOperations";
import {
  Clock,
  Mail,
  Map,
  MapPin,
  MessageCircle,
  Phone,
  PhoneIcon,
  Send,
} from "lucide-react";
import React, { Suspense, useState } from "react";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  inquiryType: "",
  subject: "",
  message: "",
  isRead: false,
};

function ContactUs() {
  const { companyDetails, isLoading, didSucceed } = useAppContext();
  const [error, setError] = useState(null);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const CompDetails = didSucceed && companyDetails[0];
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value, { name }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showTimedError = (type, message) => {
    setError({ type, message });
    setTimeout(() => setError(null), 3000); // Clear error after 3 seconds
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.inquiryType ||
      !formData.subject ||
      !formData.message
    ) {
      showTimedError("error", "Please fill in all required fields.");
      return;
    } else {
      const createdAt = new Date();
      //saving data to database........ ....... ..............
      setIsSubmiting(true);
      const rs = await createDocument({ ...formData, createdAt }, "messages");
      if (rs.didSucceed) {
        // send data to GA4
        gtag("event", "contact_form_submit_click");
        showTimedError("success", "Message sent successfully");
        setFormData(initialFormData);
      } else {
        showTimedError("error", "Something went wrong");
      }
      setIsSubmiting(false);
    }
  };

  return (
    <>
      <TitleHeader
        first={"Contact "}
        last={"Us."}
        sub="    Ready to start your Tanzania adventure? We're here to help you plan
            the perfect trip. Contact our expert team for personalized
            assistance."
        image={"/images/bg/3.png"}
        link={{
          text: "Browser Our Packages",
          href: "/tour",
        }}
      />

      <section className="sm:py-28 py-10 bg-accent/40">
        <div className="respons flex-all flex-col">
          <span
            data-aos="fade-up"
            className={`bg-primary text-accent h-14 w-14 flex-all rounded-full text-xs font-bold border border-secondary/20 inline-block mb-6`}
          >
            <PhoneIcon />
          </span>
          <h2
            data-aos="fade-up"
            data-aos-delay="100"
            className="md:text-4xl text-3xl text-secondary font-jua mb-4"
          >
            Get in Touch
          </h2>
          <div
            data-aos="fade-up"
            className="w-full grid grid-cols-4 mt-12 gap-4"
          >
            <ContactInfoCard
              icon={Phone}
              title="Phone"
              info={
                isLoading
                  ? "Loading..."
                  : CompDetails?.phoneNumbers?.length > 0 &&
                    CompDetails?.phoneNumbers[0]
              }
              description="Available 24/7 for emergencies"
            />

            <ContactInfoCard
              icon={Mail}
              title="Email"
              info={
                isLoading
                  ? "Loading..."
                  : CompDetails?.emails?.length > 0 && CompDetails?.emails[0]
              }
              description="We'll respond within 24 hours"
            />

            <ContactInfoCard
              icon={MapPin}
              title="Office"
              info={isLoading ? "Loading..." : CompDetails?.address || "---"}
              description="Visit us for in-person consultation"
            />
            <ContactInfoCard
              icon={Clock}
              title="Business Hours"
              info="Mon - Fri: 8AM - 6PM"
              description="EAT (East Africa Time)"
            />
          </div>
        </div>
      </section>
      <section className="sm:py-28 py-10">
        <div className="respons">
          <Title
            badge={<Send />}
            title={"  Send us a Message"}
            subHeading={
              "Get in touch with our expert travel consultants who will help you create the perfect itinerary tailored to your interests and budget."
            }
          />
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 py-12 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Name Fields */}
            <InputField
              label="First Name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <InputField
              label="Last Name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />

            {/* Contact Fields */}
            <InputField
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <InputField
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />

            {/* Inquiry Type */}

            <SelectField
              label="Inquiry Type"
              isLoading={false}
              Icon={MessageCircle}
              placeholder={"Select inquiry type"}
              handleSingleSelectChange={(value) =>
                handleSelectChange(value, { name: "inquiryType" })
              }
              options={inquiryTypeOptions}
            />

            {/* Subject */}
            <InputField
              label="Subject"
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
            />

            {/* Message */}
            <div className="col-span-3">
              <TextareaField
                label="Message"
                placeholder="Tell us more about your travel plans, dates, group size, and any specific requirements..."
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
              />
            </div>

            {/* Submit Button */}
            <div className="grid grid-cols-2 gap-4 col-span-3 ">
              <PrimaryButton
                disabled={isSubmiting}
                type="submit"
                className="flex-1"
              >
                {isSubmiting ? "Sending..." : "Send Message"}
              </PrimaryButton>
              <SecondaryButton
                disabled={isSubmiting}
                type="button"
                onClick={() => setFormData(initialFormData)}
              >
                Clear Form
              </SecondaryButton>
            </div>
            {/* Error Message */}
            <InlineError error={error} />
          </form>
        </div>
      </section>
      {/* Contact Information */}
      <section className="sm:py-28 bg-accent py-10">
        <div className="respons">
          <Title
            badge={<Map />}
            title={"   Where to find us?"}
            subHeading={
              "Map showing the location of our office and travel consultants. You can click on the map to zoom in and view the location of our office and travel consultants."
            }
          />

          <iframe
            data-aos="fade-up"
            data-aos-delay="100"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.915276200846!2d36.68354927509755!3d-3.3708857414582303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18371d91a478c9d3%3A0x7f22ff0dd5d85aa1!2sSerengeti%20Wildlife%20Safaris!5e0!3m2!1sen!2stz!4v1724917546063!5m2!1sen!2stz"
            width="100%"
            height="500"
            allowFullScreen=""
            loading="lazy"
            className="border border-secondary/50 p-4 rounded-xl bg-white"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* faqs */}
      <FaqsComp />
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<PageLoading />}>
      <ContactUs />
    </Suspense>
  );
}
