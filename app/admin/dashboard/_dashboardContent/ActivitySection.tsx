import { colors } from "@/app/lib/constant";
import { Wallet, UserPlus, HeadphonesIcon } from "lucide-react";
import React from "react";

export type ActivityType =
  | "premiumSubscription"
  | "basicSubscription"
  | "doctorRegistration"
  | "patientRegistration"
  | "technicalSupport"
  | "billingSupport";
const getActivityIcon = (type: ActivityType): React.ReactNode => {
  switch (type) {
    case "premiumSubscription":
    case "basicSubscription":
      return <Wallet />;
    case "doctorRegistration":
    case "patientRegistration":
      return <UserPlus />;
    case "technicalSupport":
    case "billingSupport":
      return <HeadphonesIcon />;
  }
};

const getActivityColors = (
  type: ActivityType
): { color: string; bgColor: string } => {
  switch (type) {
    case "premiumSubscription":
    case "basicSubscription":
      return { color: "#2196F3", bgColor: "#E3F2FD" };
    case "doctorRegistration":
      return { color: colors.primary, bgColor: colors.secondary };
    case "patientRegistration":
      return { color: "#9C27B0", bgColor: "#F3E5F5" };
    case "technicalSupport":
      return { color: "#F44336", bgColor: "#FFEBEE" };
    case "billingSupport":
      return { color: "#FF9800", bgColor: "#FFF3E0" };
  }
};

// Activity Item Component
interface ActivityItemProps {
  type: ActivityType;
  title: string;
  description: string;
  time: string;
}

export const ActivityItem = ({
  type,
  title,
  description,
  time
}: ActivityItemProps) => {
  const icon = getActivityIcon(type);
  const { color, bgColor } = getActivityColors(type);

  return (
    <div className="flex items-start gap-4 p-4 hover:bg-stone-50 rounded-lg transition-colors">
      <div
        className="p-2 rounded-full shrink-0"
        style={{ backgroundColor: bgColor }}
      >
        {React.cloneElement(icon as React.ReactElement, {
          size: 20,
          color: color
        })}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-stone-800">{title}</p>
        <p className="text-sm text-stone-600 mt-0.5">{description}</p>
        <p className="text-xs text-stone-400 mt-1">{time}</p>
      </div>
    </div>
  );
};
