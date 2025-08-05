"use client";
import { useState } from "react";
import { GlassButton, PrimaryButton } from "../buttons";
import { PlayCircle } from "lucide-react";
import VideoPreviewPopUp from "../Popups/VideoPopUp";

export default function ActivitiesSection() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section className="sm:py-28 py-10 text-white text-center">
      <div className="respons flex-all flex-col gap-6">
        <GlassButton
          className="w-24 h-24 rounded-full p-0 flex-all text-sm"
          onClick={() => setShowVideo(true)}
        >
          <PlayCircle />
        </GlassButton>
        <h2 className="text-4xl md:text-6xl font-black font-jua uppercase tracking-wider">
          Our <span className="text-secondary">Promise</span>
        </h2>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          To provide you with the most authentic, breathtaking, and
          unforgettable Tanzanian adventures, crafted with local expertise and a
          commitment to excellence.
        </p>
        <PrimaryButton>Discover Our Story</PrimaryButton>
      </div>

      {showVideo && (
        <VideoPreviewPopUp
          handleOpen={showVideo}
          handleClose={() => setShowVideo(false)}
          video={"/images/hero.mp4"}
        />
      )}
    </section>
  );
}
