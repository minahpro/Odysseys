// Function to generate PDF and send via email
export const Sendemail = async ({ bookingDataToUse, type }) => {
  try {
    // Send PDF via email
    const response = await fetch("/api/send-booking-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookingData: bookingDataToUse,
        clientEmail: bookingDataToUse.email,
        type: type,
      }),
    });

    const result = await response.json();

    if (result?.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};
