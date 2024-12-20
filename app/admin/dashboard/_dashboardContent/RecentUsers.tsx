import React from "react";
import { UserRound, Stethoscope } from "lucide-react";
import { UserType } from "@/src/hooks/serviceHook";
import { formatDate } from "@/src/helper/helper";
type userType = "doctor" | "patient";

// This function determines the visual styling based on user type
const getUserColors = (
  userType: userType
): { color: string; bgColor: string } => {
  switch (userType) {
    case "doctor":
      return { color: "#2196F3", bgColor: "#E3F2FD" };
    case "patient":
      return { color: "#9C27B0", bgColor: "#F3E5F5" };
  }
};

// This function selects the appropriate icon for each user type
const getUserIcon = (userType: userType) => {
  switch (userType) {
    case "doctor":
      return <Stethoscope />;
    case "patient":
      return <UserRound />;
  }
};

// Component for individual user entries (doctors or patients)
const RecentPatientsAndDoctors = ({
  name,
  user_type,
  user_id,
  speciality,
  created_at
}: UserType) => {
  const { color, bgColor } = getUserColors(user_type as userType);
  const icon = getUserIcon(user_type as userType);

  return (
    <div className="flex items-start gap-4 p-4 hover:bg-stone-50 rounded-lg transition-colors">
      <div
        className="p-2 rounded-full shrink-0"
        style={{ backgroundColor: bgColor }}
      >
        {React.cloneElement(icon, {
          size: 20,
          color: color
        })}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-stone-800">{name}</p>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{ backgroundColor: bgColor, color }}
          >
            {user_type === "doctor" ? "Doctor" : "Patient"}
          </span>
        </div>
        <p className="text-sm text-stone-600 mt-0.5">
          {user_type === "doctor" && speciality
            ? `Specialty: ${speciality}`
            : "General Patient"}
          <span className="text-stone-400 ml-2">ID: {user_id}</span>
        </p>
        <p className="text-xs text-stone-400 mt-1">
          {formatDate(created_at as string)}
        </p>
      </div>
    </div>
  );
};

export default RecentPatientsAndDoctors;
