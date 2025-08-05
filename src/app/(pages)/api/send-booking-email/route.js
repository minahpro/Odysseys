import { Resend } from "resend";

export async function POST(request) {
  try {
    const data = await request.json();
    const { bookingData, clientEmail, type } = data;

    // Initialize Resend with API key
    const resend = new Resend(process.env.RESEND_API_KEY);
    const reservationEmail = process.env.NEXT_PUBLIC_RESERVATION_EMAIL;
    // Get frontend URL from environment variables
    const frontendUrl =
      process.env.NEXT_PUBLIC_WEBSITE_LINK || process.env.WEBSITE_LINK;

    // Construct item link based on type
    const itemPath =
      type === "destination"
        ? "destinations"
        : type === "day-trip"
        ? "tours/day-trips"
        : "tours";
    const itemLink = `${frontendUrl}/${itemPath}/${bookingData.slug}`;

    // Simplified email content (faster rendering)
    const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #fffef0; padding: 15px; border-radius: 5px; text-align: center; margin-bottom: 20px;">
        <h1 style="color: #FFD825; margin-bottom: 10px;">Wild Odysseys</h1>
        <p style="color: #666;">Your ${
          type === "destination"
            ? "Destination"
            : type === "day-trip"
            ? "Day-trip"
            : "Tour Package"
        } Booking Confirmation</p>
      </div>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
        <h2 style="margin-top: 0;">Booking Details</h2>
        <p><strong>${
          type === "destination" ? "Destination" : "Package"
        }:</strong> ${bookingData.packageName || "N/A"}</p>
        <p><strong>Booking ID:</strong> ${bookingData.bookingId || "N/A"}</p>
        <p><strong>Travel Date:</strong> ${bookingData.travelDate || "N/A"}</p>
      </div>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-bottom: 20px; text-align: center;">
        <h3 style=" margin-top: 0;">View ${
          type === "destination" ? "Destination" : "Package"
        } Details</h3>
        <a href="${itemLink}" style="display: inline-block; background-color: #FFD825; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">View ${
      type === "destination" ? "Destination" : "Package"
    }</a>
        <p style="margin-top: 10px; font-size: 12px; color: #666;">Click the button above to view full details.</p>
      </div>
      
      <div style="margin-bottom: 20px;">
        <h2>Guest Information</h2>
        <p><strong>Name:</strong> ${bookingData.fullName || "N/A"}</p>
        <p><strong>Email:</strong> ${bookingData.email || "N/A"}</p>
        <p><strong>Phone:</strong> ${bookingData.phone || "N/A"}</p>
        <p><strong>Guests:</strong> ${bookingData.adults || 0} Adults, ${
      bookingData.kids || 0
    } Children</p>
        <p><strong>Message:</strong> ${
          bookingData.message || "No additional message"
        }</p>
      </div>
      
      <div style="background-color: #FFD825; color: white; padding: 15px; border-radius: 5px; text-align: center;">
        <p>Thank you for choosing Wild Odysseys for your adventure!</p>
        <p>We look forward to providing you with an exceptional experience.</p>
      </div>
    </div>
  `;

    // Prepare email data
    const emailData = {
      from: `Wild Odysseys Reservation <${reservationEmail}>`,
      subject: `Booking Confirmation: ${
        bookingData.bookingId || "New Booking"
      }`,
      html: emailContent,
    };

    // Send emails in parallel for faster processing
    const emailPromises = [
      // Send to owner
      resend.emails.send({
        ...emailData,
        to: reservationEmail,
        subject: `New Booking: ${bookingData.bookingId || "Unknown ID"}`,
      }),
      // Send to client
      resend.emails.send({
        ...emailData,
        to: clientEmail || bookingData.email,
        subject: `Your Booking Confirmation: ${
          bookingData.bookingId || "New Booking"
        }`,
      }),
    ];

    // Wait for both emails to send
    await Promise.all(emailPromises);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Email sending error:", error);
    return new Response(
      JSON.stringify({
        error: error.message,
        success: false,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
