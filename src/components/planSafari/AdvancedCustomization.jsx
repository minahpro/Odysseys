import React, { useState } from "react";
import StartFromScratch from "./StartFromScratch";
import ReadyMadeTour from "./ReadyMadeTour";

function AdvancedCustomization() {
  const [tab, setTab] = useState(1);

  // onchange tab
  const onChangeTab = (value) => {
    setTab(value);
  };

  const active = "bg-primary text-black";
  const inActive = "text-white";
  const sharedClass =
    "w-full py-3 border border-primary font-medium rounded px-2 text-sm hover:scale-105 transitions hover:shadow";

  return (
    <div className="space-y-8 pb-10 sm:p-6 p-2">
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 items-start">
        <div className="lg:col-span-1 rounded sm:px-12 sm:py-12 py-8 px-4 bg-primary/20 border border-primary/30 space-y-2 shadow">
          <p className="text-sm leading-6 pb-4 text-white">
            At Safari Customization, our goal is to create an unforgettable
            adventure tailored just for you. Once you submit this form, Our
            dedicated.
          </p>

          <button
            onClick={() => onChangeTab(1)}
            className={`${sharedClass} ${tab === 1 ? active : inActive}`}
          >
            Ready made tour
          </button>
          <button
            onClick={() => onChangeTab(2)}
            className={`${sharedClass} ${tab === 2 ? active : inActive}`}
          >
            Start from the beginning
          </button>
        </div>
        <div className="lg:col-span-2 rounded sm:p-12 p-4 bg-highlight/30 space-y-2">
          {tab === 1 ? <ReadyMadeTour /> : <StartFromScratch />}
        </div>
      </div>
    </div>
  );
}

export default AdvancedCustomization;
