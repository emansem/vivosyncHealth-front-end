/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ChangeEvent, forwardRef } from "react";
import { baseInputStyles } from "../../utils/css/basicInputsStyles";

interface InputType {
  id?: string;
  inputPlaceholder?: string;
  error?: string;
  label?: string;
  onKeyEvent?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  name?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  inputType: string;
  isReadOnly?: boolean;
}

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, InputType>(
  (
    {
      id,
      inputPlaceholder,
      label,
      isReadOnly = false,
      error,
      onChange,
      name,
      onKeyEvent,
      value,
      inputType,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        <label className="label" htmlFor={id}>
          {label}
        </label>
        <input
          className={`${baseInputStyles} px-3 
            ${error ? "border-red-500" : "border-border_color"} ${
            isReadOnly && "bg-stone-700/10"
          }`}
          type={inputType}
          ref={ref}
          id={id}
          readOnly={isReadOnly}
          onKeyDown={onKeyEvent}
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
