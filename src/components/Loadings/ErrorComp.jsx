import { AlertCircle, CheckCircle } from "lucide-react";
import React from "react";
const NoDataFound = ({ text }) => {
  return (
    <div className="flex-all rounded bg-primary/20 text-xl font-medium w-full h-32 border border-primary/30">
      <h1 className="text-white">{text}</h1>
    </div>
  );
};

const InlineError = ({ error }) => {
  return (
    error && (
      <div
        className={`flex items-center p-4 rounded-xl ${
          error.type === "success"
            ? "bg-green-600/10 border border-green-600/40"
            : "bg-red-600/10 border border-red-600/40"
        }`}
      >
        {error.type === "success" ? (
          <CheckCircle className="w-5 h-5 text-green-500 mr-3" color="green" />
        ) : (
          <AlertCircle className="w-5 h-5 text-red-500 mr-3" color="red" />
        )}
        <p
          className={`text-sm font-medium ${
            error.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {error.message}
        </p>
      </div>
    )
  );
};

export { NoDataFound, InlineError };
