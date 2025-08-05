import { FetchTags } from "@/components/Loadings/LoadingComp";
import React from "react";

function TagsFilter({ isFetchingTags, tags, selectedTag, handleChange }) {
  const allClass =
    "p-1 rounded hover:bg-primary transitions text-[13px] font-light hover:text-black px-3";
  const selectedClass = "bg-primary text-black";

  return isFetchingTags ? (
    <FetchTags />
  ) : (
    <div className=" flex flex-wrap gap-2">
      {tags?.map((tag, index) => (
        <button
          key={index}
          onClick={() => handleChange(tag?.title)}
          type="button"
          className={`${allClass} ${
            selectedTag === tag.title
              ? selectedClass
              : "bg-primary/10  text-primary"
          }`}
        >
          {tag?.title}
        </button>
      ))}
    </div>
  );
}

export default TagsFilter;
