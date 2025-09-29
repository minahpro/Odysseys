import Image from "next/image";
import React from "react";

function SingleMap() {
  return (
    <Image
      src="https://storage.googleapis.com/support-forums-api/attachment/thread-311121232-12633085076850476787.png"
      alt="map"
      width={1000}
      height={1000}
      className="w-full h-full object-cover"
    />
  );
}

export default SingleMap;
