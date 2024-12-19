import React from "react";
import { Search } from "lucide-react";
import { baseInputStyles } from "../../utils/css/basicInputsStyles";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  className = ""
}: // disabled = false
SearchInputProps) => {
  return (
    <div className="w-full md:w-[60%] relative">
      <Search
        className="absolute top-1/2 -translate-y-1/2 left-4 text-stone-400 pointer-events-none"
        size={20}
      />
      <input
        type="text"
        value={value}
        onChange={onChange}
        name="searchValue"
        // disabled={disabled}
        placeholder={placeholder}
        className={`
          ${baseInputStyles}
          pl-12 
          ${className}
        `}
      />
    </div>
  );
};

export default SearchInput;
