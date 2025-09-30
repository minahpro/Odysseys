"use client";
import React, { useState } from "react";
import MainPopup from "./MainPopup";
import { createDocument } from "@/firebase/databaseOperations";
import { InputField, TextareaField } from "../inputField";
import { FormTextEditor } from "../FormTextEditor";
import { PrimaryButton, SecondaryButton } from "../buttons";
import { AlertCircle, CheckCircle, CheckIcon } from "lucide-react";
import { Sendemail } from "@/lib/hooks/sendEmail";
import { InlineError } from "../Loadings/ErrorComp";

//booking form sumbission................................
const initialFormData = {
  fullName: "",
  email: "",
  phone: "",
  adults: 0,
  kids: 0,
  arrivalDate: "",
  depatureDate: "",
  duration: 0,
  safariIdeas: [],
  additionalDetails: "",
};

function BookingPopup({ handleOpen, handleClose, datas }) {
  // ********* STATE *********
  const [bookingData, setBookingData] = useState(initialFormData);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // ************ SUBMIT FORM ***********
  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setBookingData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const showTimedError = (type, message) => {
    setError({ type, message });
    setTimeout(() => setError(null), 3000); // Clear error after 3 seconds
  };

  const handleSubmitBooking = async () => {
    const bookingInfo = {
      //customer details..............................................
      fullName: bookingData?.fullName,
      email: bookingData?.email,
      phone: bookingData?.phone,
      adultsNumber: bookingData?.adults,
      kidsNumber: bookingData?.kids,
      //tour details..................................................
      safariIdeas: [],
      additionalDetails: bookingData?.additionalDetails,
      arrivalDate: bookingData?.arrivalDate,
      depatureDate: bookingData?.depatureDate,
      //tour itinerary details........................................
      advCustomizationData: null,
      bookingCategory: datas?.status,
      tourId: datas?.id,
    };

    // validation
    if (
      !bookingData?.fullName ||
      !bookingData?.email ||
      !bookingData?.phone ||
      !bookingData?.adults ||
      !bookingData?.arrivalDate ||
      !bookingData?.depatureDate ||
      !bookingData?.additionalDetails
    ) {
      showTimedError("error", "Please fill all the fields");
    } else {
      setIsLoading(true);
      const createdAt = new Date();
      const rs = await createDocument(
        {
          ...bookingInfo,
          createdAt,
          bookingStatus: "requested",
        },
        "bookings"
      );

      if (rs.didSucceed) {
        // send data to GA4
        gtag("event", `${datas?.status}_booking`);
        // Show success message with email notification
        showTimedError(
          "success",
          "Booking request submitted successfully! You will receive a confirmation email shortly."
        );
        setBookingData(initialFormData);

        // Send email in background with proper data structure
        const emailData = {
          bookingId: datas?.id || `BK-${Date.now()}`, // Use the created document ID or generate one
          packageName: datas?.title,
          fullName: bookingData.fullName,
          email: bookingData.email,
          phone: bookingData.phone,
          adults: bookingData.adults,
          kids: bookingData.kids,
          travelDate: `${bookingData.arrivalDate} to ${bookingData.depatureDate}`,
          message: bookingData.additionalDetails,
          slug: datas?.slug,
        };

        Sendemail({
          bookingDataToUse: emailData,
          type: datas?.status,
        }).catch((error) => {
          console.error("Email sending failed:", error);
          showTimedError(
            "error",
            "Booking saved but email notification failed. We'll contact you soon."
          );
        });
      } else {
        showTimedError("error", "Something went wrong");
      }
      setIsLoading(false);
    }
  };
  return (
    <MainPopup
      open={handleOpen}
      close={handleClose}
      title={`Book: ${datas?.title}`}
      contentClass="max-w-4xl"
    >
      <div className="space-y-6 w-full max-h-[400px] pb-6 overflow-hidden overflow-y-scroll">
        {/* inputs */}

        <InputField
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          name="fullName"
          value={bookingData.fullName}
          onChange={handleChange}
        />
        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Information */}

          <InputField
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={bookingData.email}
            onChange={handleChange}
          />
          <InputField
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone number"
            name="phone"
            value={bookingData.phone}
            onChange={handleChange}
          />

          {/* Travel Details */}
          <InputField
            label="Number of Adults"
            type="number"
            placeholder="Number of adults"
            name="adults"
            value={bookingData.adults}
            onChange={handleChange}
          />
          <InputField
            label="Number of Children"
            type="number"
            placeholder="Number of children"
            name="kids"
            value={bookingData.kids}
            onChange={handleChange}
          />
          <InputField
            label="Arrival Date"
            type="date"
            name="arrivalDate"
            value={bookingData.arrivalDate}
            onChange={handleChange}
          />
          <InputField
            label="Departure Date"
            type="date"
            name="depatureDate"
            value={bookingData.depatureDate}
            onChange={handleChange}
          />
        </div>

        {/* Additional Details */}
        <FormTextEditor
          label="Additional Information"
          placeholder="Tell us more about your preferences or special requirements"
          value={bookingData.additionalDetails}
          onChange={(content) => {
            setBookingData(prev => ({ ...prev, additionalDetails: content }));
          }}
          minHeight="120px"
        />

        {/* Error Message */}
        {error && <InlineError error={error} />}

        {/* Submit Button */}
        <div className="grid md:grid-cols-2 px-6 pt-4 gap-6">
          <PrimaryButton
            disabled={isLoading}
            className="py-4 text-base"
            onClick={handleSubmitBooking}
          >
            {isLoading ? "Submitting..." : "Submit Booking"}
          </PrimaryButton>
          <SecondaryButton
            disabled={isLoading}
            className="py-4 text-base"
            onClick={() => setBookingData(initialFormData)}
          >
            Clear Form
          </SecondaryButton>
        </div>
      </div>
    </MainPopup>
  );
}

export default BookingPopup;
