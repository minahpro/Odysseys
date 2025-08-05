import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { safarisIdea as allSafariIdeas } from "@/data/randomData";

function SimpleCustomization({ onHandleUpdateSafariIdeas }) {
  const [selectedIdeas, setSelectedIdeas] = useState([]);

  const isIdeaSelected = (idea) => {
    return selectedIdeas.includes(idea);
  };

  const handleToggleSafariIdea = (safariIdea) => {
    let newList = [];

    if (isIdeaSelected(safariIdea)) {
      //we remove safari idea................
      newList = selectedIdeas.filter((item) => item !== safariIdea);
    } else {
      newList = [...selectedIdeas, safariIdea];
    }
    setSelectedIdeas(newList);
    onHandleUpdateSafariIdeas(newList);
  };

  const handleClick = (value) => {
    handleToggleSafariIdea(value);
  };

  useEffect(() => {
    onHandleUpdateSafariIdeas([]);
    return () => {
      onHandleUpdateSafariIdeas([]);
    };
  }, []);

  return (
    <div className="space-y-8 sm:py-10 py-6">
      <div className="space-y-2">
        <h4 className="font-semibold text-lg text-white">Safari Ideas</h4>
        <p className="text-sm text-textcolor">
          Involves selection of safari idea combinations that is perfect for you
        </p>
      </div>
      {/* checkbox */}
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {allSafariIdeas.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border border-highlight rounded p-4"
          >
            <Checkbox onHandleClick={handleClick} value={item?.name} />
            <p className="text-sm font-medium text-textcolor">{item?.name}</p>
          </div>
        ))}
      </div>
      {/* form */}
    </div>
  );
}
export default SimpleCustomization;
