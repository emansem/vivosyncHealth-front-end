import { colors } from "@/app/lib/constant";
import { ReactNode } from "react";

// Custom Card Component
interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={`
      bg-white rounded-lg border border-[${colors.stone[200]}]
      shadow-sm hover:shadow-md transition-shadow duration-200
      ${className}
    `}
    >
      {children}
    </div>
  );
};
