/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ChangeEvent, forwardRef } from "react";
import { baseInputStyles } from "../../utils/css/basicInputsStyles";

interface InputType {
  id?: string;
  inputPlaceholder?: string;
  error?: string | any;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  inputType: string;
}

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, InputType>(
  (
    { id, inputPlaceholder, error, onChange, name, value, inputType, ...props },
    ref
  ) => {
    return (
      <div className=" w-full">
        <input
          className={`${baseInputStyles} px-3 my-3
            ${error ? "border-red-500" : "border-border_color"}`}
          type={inputType}
          ref={ref}
          id={id}
          value={value}
          onChange={onChange}
          name={name}
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
