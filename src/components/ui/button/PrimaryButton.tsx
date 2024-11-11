"use client";
import React from "react";

interface ButtonInterface {
  children: React.ReactNode;
  backgroud: boolean;
  color?: string;
  isSubmitting?: boolean;
  // Additional props if needed
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
export default function PrimaryButton({
  children,
  color,
  isSubmitting,
  backgroud
}: ButtonInterface) {
  const isBackGround = backgroud
    ? "bg-primary_color"
    : `shadow-shadow1 border-[1px]`;
  const backgroudHover = backgroud
    ? "hover:bg-secondary_color"
    : `hover:shadow-shadow3`;

  return (
    <button
      type="submit"
      className={` font-medium shadow-shadow1 w-full ${color}  ${isBackGround} ${backgroudHover} text-base md:text-xl transition-all ease-linear duration-200 cursor-pointer h-12 md:h-14 rounded-md`}
      disabled={isSubmitting}
    >
      <span>{children}</span>
    </button>
  );
}
