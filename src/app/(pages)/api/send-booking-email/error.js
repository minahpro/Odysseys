"use client";

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-4">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Something went wrong!
      </h2>
      <p className="text-gray-600 mb-6">
        {error?.message || "Failed to send email. Please try again."}
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
      >
        Try again
      </button>
    </div>
  );
}
