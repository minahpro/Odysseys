"use client";
import MainPopup from "../Popups/MainPopup";
import React from "react";

function VideoPreviewPopUp({ handleOpen, handleClose, video }) {
  return (
    <MainPopup
      open={handleOpen}
      close={handleClose}
      title={`Wild Odysseys Video Preview`}
      contentClass="max-w-5xl"
    >
      <div className="relative w-full overflow-y-scroll md:overflow-y-auto md:h-[450px] h-[300px]">
        {/* video tag */}
        <video
          src={video}
          className="w-full h-full object-cover"
          controls
          autoPlay
          loop
        />
      </div>
    </MainPopup>
  );
}

export default VideoPreviewPopUp;
