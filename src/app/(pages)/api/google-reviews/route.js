import { NextResponse } from "next/server";

export async function GET() {
  const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

  if (!placeId) {
    return NextResponse.json(
      { error: "Place ID is required" },
      { status: 400 }
    );
  }

  if (!apiKey) {
    return NextResponse.json(
      { error: "Google Places API key not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,user_ratings_total&key=${apiKey}`
    );

    const data = await response.json();

    if (data.status !== "OK") {
      return NextResponse.json(
        { error: data.error_message || "Failed to fetch reviews" },
        { status: 500 }
      );
    }

    // Transform the Google reviews data
    const transformedReviews =
      data.result.reviews?.map((review, index) => ({
        id: index + 1,
        name: review.author_name,
        location: review.author_url ? "Google User" : "Anonymous",
        rating: review.rating,
        text: review.text,
        image: review.profile_photo_url || "",
        time: review.time,
        relative_time: review.relative_time_description,
      })) || [];

    // Calculate rating distribution
    const ratingCounts = [0, 0, 0, 0, 0]; // 1-star to 5-star
    transformedReviews.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        ratingCounts[review.rating - 1]++;
      }
    });

    return NextResponse.json(
      {
        didSucceed: true,
        reviews: transformedReviews,
        placeUrl: `https://search.google.com/local/reviews?placeid=${placeId}`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching Google reviews:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
