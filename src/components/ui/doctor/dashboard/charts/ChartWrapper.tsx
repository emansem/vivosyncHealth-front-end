import React from "react";

interface ChartWrapperProps {
  children: React.ReactNode;
}

export default function ChartWrapper({ children }: ChartWrapperProps) {
  return (
    <div className="bg-white rounded-lg p-2 shadow-shadow3 w-full h-96 pb-10">
      {children}
    </div>
  );
}
