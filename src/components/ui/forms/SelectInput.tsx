import { ChangeEventHandler } from "react";
import { baseInputStyles } from "../../utils/css/basicInputsStyles";

interface SelectProps {
  id: string;
  value?: string;
  label?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  options: {
    value: string | number;
    label: string | number;
  }[];
}

function SelectInput({ value, onChange, options }: SelectProps) {
  return (
    <>
      {/* <label htmlFor={id}>{label}</label> */}
      <select
        className={`${baseInputStyles} px-3 bg-transparent appearance-none cursor-pointer`}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}

export default SelectInput;
