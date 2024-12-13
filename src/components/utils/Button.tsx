import { colors } from "@/app/lib/constant";
import { ReactNode } from "react";

// Reusable Custom Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  children: ReactNode;
  fullWidth?: boolean;
}

export const Button = ({
  variant = "primary",
  children,
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "px-4 py-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantStyles = {
    primary: `bg-[${colors.primary}] text-white hover:opacity-90 focus:ring-[${colors.primary}]`,
    secondary: `bg-[${colors.secondary}] text-[${colors.primary}] hover:bg-opacity-80 focus:ring-[${colors.secondary}]`,
    outline: `border border-[${colors.stone[300]}] bg-white hover:bg-[${colors.stone[50]}] focus:ring-[${colors.stone[200]}]`
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
