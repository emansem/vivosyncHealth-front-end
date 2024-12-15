import { Specialty } from "@/src/hooks/useFetchGeneralData";
import { ChevronRight } from "lucide-react";

import * as LucideIcons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { CircleDashed } from "lucide-react";

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

const DynamicIcon = ({ name, size = 24, color, className }: IconProps) => {
  // Get the icon component from Lucide with proper typing
  const IconComponent = LucideIcons[
    name as keyof typeof LucideIcons
  ] as LucideIcon;

  // If icon not found, return fallback icon
  if (!IconComponent) {
    // console.warn(`Icon "${name}" not found in Lucide icons, using fallback`);
    return <CircleDashed size={size} color={color} className={className} />;
  }

  return <IconComponent size={size} color={color} className={className} />;
};

export const generateRandomGradient = (): string => {
  const gradients = [
    "bg-gradient-to-br from-green-50 to-green-100",
    "bg-gradient-to-br from-blue-50 to-blue-100",
    "bg-gradient-to-br from-purple-50 to-purple-100",
    "bg-gradient-to-br from-orange-50 to-orange-100",
    "bg-gradient-to-br from-pink-50 to-pink-100",
    "bg-gradient-to-br from-yellow-50 to-yellow-100",
    "bg-gradient-to-br from-red-50 to-red-100",
    "bg-gradient-to-br from-indigo-50 to-indigo-100",
    "bg-gradient-to-br from-teal-50 to-teal-100",
    "bg-gradient-to-br from-cyan-50 to-cyan-100",
    "bg-gradient-to-br from-violet-50 to-violet-100",
    "bg-gradient-to-br from-sky-50 to-sky-100"
  ];

  return gradients[Math.floor(Math.random() * gradients.length)];
};

interface SpecialityCardProps {
  handleGetSpecialty: (specialty: string) => void;
  specialty: Specialty;
}

// Specialty card component
export const SpecialtyCard = ({
  specialty,
  handleGetSpecialty
}: SpecialityCardProps) => {
  return (
    <div
      onClick={() => handleGetSpecialty(specialty.title)}
      className={`rounded-xl p-6 ${generateRandomGradient()} hover:shadow-lg transition-all cursor-pointer border border-gray-100`}
    >
      <div className="flex justify-between items-start mb-4">
        <div
          className={`${specialty.icon_color} p-3 rounded-xl bg-white/90 shadow-sm`}
        >
          <DynamicIcon name={specialty.icon} />
        </div>
      </div>
      <h3 className="text-lg  capitalize font-semibold text-stone-700 mb-1">
        {specialty.title}
      </h3>
      <button className="text-sm  text-primary_color hover:text-secondary_color font-medium flex items-center gap-1">
        View Doctors <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
