import React from "react";
import { PropagateLoader } from "react-spinners";

const TourLoading = () => {
  return (
    <div className="w-full md:h-[300px] h-[150px] bg-accent animate-pulse border rounded-lg overflow-hidden border-gray-300"></div>
  );
};

const DestinationLoading = () => {
  return <div className="w-full h-56 rounded bg-accent animate-pulse" />;
};

const FetchTags = () => {
  return (
    <div className="flex flex-wrap gap-3">
      {[...Array(5)].map((_, i) => (
        <button
          key={i}
          className="h-6 rounded w-20 bg-highlight animate-pulse"
        />
      ))}
    </div>
  );
};

const FetchCategories = () => {
  return (
    <div className="space-y-3">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="h-6 w-full rounded bg-highlight animate-pulse"
        />
      ))}
    </div>
  );
};

const SingleDetailsLoading = () => {
  return (
    <div className="w-full bg-accent md:py-12 py-4">
      <div className="w-full md:h-screen h-80 rounded flex-all">
        <PropagateLoader color={"#083633"} loading={true} size={15} />
      </div>
    </div>
  );
};

const InputLoading = () => {
  return <div className="w-full h-12 rounded bg-highlight animate-pulse" />;
};

const PageLoading = () => {
  return (
    <div className="respons">
      <div className="w-full my-6">
        <div className="w-full md:h-screen h-80 rounded flex-all">
          <PropagateLoader color={"#083633"} loading={true} size={15} />
        </div>
      </div>
    </div>
  );
};

const FaqsLoadingComp = () => {
  return (
    <div className="w-full rounded p-6 bg-accent animate-pulse border border-gray-300"></div>
  );
};
const PrivacyLoadingComp = () => {
  return (
    <div className="w-full animate-pulse space-y-3">
      <div className="h-5 w-full rounded bg-accent" />
      <div className="h-5 w-4/12 rounded bg-accent" />
      <div className="h-5 w-6/12 rounded bg-accent" />
      <div className="h-5 w-full rounded bg-accent" />
      <div className="h-5 w-5/12 rounded bg-accent" />
      <div className="h-5 w-3/12 rounded bg-accent" />
      <div className="h-5 w-9/12 rounded bg-accent" />
      <div className="h-5 w-10/12 rounded bg-accent" />
      <div className="h-5 w-full rounded bg-accent" />
      <div className="h-5 w-2/12 rounded bg-accent" />
      <div className="h-5 w-full rounded bg-accent" />
      <div className="h-5 w-4/12 rounded bg-accent" />
      <div className="h-5 w-1/12 rounded bg-accent" />
      <div className="h-5 w-full rounded bg-accent" />
    </div>
  );
};

export {
  DestinationLoading,
  TourLoading,
  FetchTags,
  FetchCategories,
  SingleDetailsLoading,
  InputLoading,
  PageLoading,
  FaqsLoadingComp,
  PrivacyLoadingComp,
};
