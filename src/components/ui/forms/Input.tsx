/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { forwardRef } from "react";
import { baseInputStyles } from "../../utils/css/basicInputsStyles";

interface InputType {
  id?: string;
  inputPlaceholder?: string;
  error?: string | any;

  inputType: string;
}

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, InputType>(
  ({ id, inputPlaceholder, error, inputType, ...props }, ref) => {
    return (
      <div className=" w-full">
        <input
          className={`${baseInputStyles} px-3 my-3
            ${error ? "border-red-500" : "border-border_color"}`}
          type={inputType}
          ref={ref}
          id={id}
          placeholder={inputPlaceholder}
          autoCorrect="off"
          spellCheck="false"
          {...props}
        />
        {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
      </div>
    );
  }
);
export default Input;
