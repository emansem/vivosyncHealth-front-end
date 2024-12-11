import React from "react";
import { FileQuestion } from "lucide-react";

interface NoResultsProps {
  heading?: string;
  message?: string;
  className?: string;
}

const NoResults = ({
  heading = "No Results Found",
  message = `We couldn't find what you're looking for.`,
  className = ""
}: NoResultsProps) => {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center p-8 ${className}`}
    >
      <FileQuestion className="w-12 h-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{heading}</h3>
      <p className="text-gray-600 text-center">{message}</p>
    </div>
  );
};

export default NoResults;
