import React from "react";

export function DashBoardHeading({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-xl capitalize font-medium text-stone-700 mb-2">
      {children}
    </h1>
  );
}
