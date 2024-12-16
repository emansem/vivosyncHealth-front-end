import { Loader2 } from "lucide-react";
import React from "react";

interface LoadingStateProps {
  message?: string;
  className?: string;
}

function LoadingState({
  message = "Loading...",
  className = ""
}: LoadingStateProps) {
  return (
    <div
      className={`min-h-[80vh] flex justify-center items-center ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-4 animate-fadeIn">
        {/* Loader Container */}
        <div className="relative">
          {/* Main Loader */}
          <Loader2 size={32} className="animate-spin  text-primary_color" />
        </div>

        {/* Loading Message */}
        <div className="space-y-2 text-center">
          <p className="text-base text-center font-medium text-gray-700">
            {message}
          </p>
          <p className="text-sm text-gray-500">
            Please wait while we process your request
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoadingState;
