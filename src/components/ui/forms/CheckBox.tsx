/* eslint-disable react/display-name */
"use client";
import React, { forwardRef } from "react";
import Link from "next/link";

interface CheckBox {
  checked?: boolean;
  error?: string;
}

const CheckBox = forwardRef<HTMLInputElement, CheckBox>(
  ({ checked, error, ...props }, ref) => {
    return (
      <>
        <div className="mb-6 mt-2">
          <div>
            <label className="relative flex items-center cursor-pointer select-none pl-7">
              <input
                checked={checked}
                ref={ref}
                type="checkbox"
                className="peer sr-only"
                {...props}
              />
              <span className="checkmark" />
            </label>
            <label className="ml-8 text-md text-stone-500">
              I accept the{" "}
              <Link href="/">
                <span className="text-primary_color font-medium hover:text-secondary_color duration-200 transition-all">
                  Terms and Conditions
                </span>
              </Link>
            </label>
          </div>
          {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
        </div>
      </>
    );
  }
);

export default CheckBox;
