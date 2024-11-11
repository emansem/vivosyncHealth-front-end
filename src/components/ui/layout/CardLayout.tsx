"use client";
import React from "react";
interface CardLayoutProps {
  children: React.ReactNode;
}
interface PageHeadingProps {
  title: string;
  subTitle?: string;
}

export const PageHeading = ({ title, subTitle }: PageHeadingProps) => {
  return (
    <div>
      <h1 className="text-xl w-full md:text-3xl font-semibold text-stone-700  my-3">
        {title}
      </h1>
      <p className="text-base md:text-xl font-normal text-stone-400 mb-3 md:mb-6">
        {subTitle}
      </p>
    </div>
  );
};

export function CardLayout({ children }: CardLayoutProps) {
  return (
    <div className="min-h-[80vh] w-full overflow-hidden flex items-center justify-center px-4 py-8 md:py-12">
      <div
        className="w-full max-w-[530px] bg-white rounded-md shadow-shadow1 
                   p-6 md:p-8 lg:p-10"
      >
        {children}
      </div>
    </div>
  );
}
