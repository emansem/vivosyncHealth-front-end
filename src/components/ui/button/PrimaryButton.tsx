"use client";
import React from "react";

export interface ButtonInterface {
  children: React.ReactNode;
  backgroud: boolean;
  color?: string;
  isSubmitting?: boolean;
  type?: "reset" | "button" | "submit" | undefined;
  // Additional props if needed
  onClick?: () => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
export default function PrimaryButton({
  children,
  color,
  type,
  isSubmitting,
  onClick,
  backgroud
}: ButtonInterface) {
  const isBackGround = backgroud
    ? "bg-primary_color"
    : `shadow-shadow1 bg-gray-200 border-[1px]`;
  const backgroudHover = backgroud
    ? "hover:bg-secondary_color"
    : `hover:shadow-shadow3`;

  return (
    <button
      onClick={onClick}
      type={type}
      className={` font-medium shadow-shadow1 w-full ${color} ${
        isSubmitting ? "cursor-not-allowed" : " cursor-pointer"
      } ${isBackGround} ${backgroudHover} text-base md:text-[18px] transition-all ease-linear duration-200 h-10 md:h-12 rounded-md`}
      disabled={isSubmitting}
    >
      <span>{children}</span>
    </button>
  );
}
