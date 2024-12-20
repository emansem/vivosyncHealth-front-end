import { colors } from "@/app/lib/constant";
import { Card } from "@/src/components/utils/Card";
import {
  UserCog,
  Users,
  BadgeCheck,
  XCircle,
  Clock,
  CreditCard
} from "lucide-react";
import React from "react";

// Utility types to ensure type safety
export type StatType =
  | "totalDoctors"
  | "totalPatients"
  | "activeSubscriptions"
  | "cancelledSubscriptions"
  | "expiredSubscriptions"
  | "adminBalance";

// Utility functions to get icons and styles based on types
const getStatIcon = (type: StatType): React.ReactNode => {
  switch (type) {
    case "totalDoctors":
      return <UserCog />;
    case "totalPatients":
      return <Users />;
    case "activeSubscriptions":
      return <BadgeCheck />;
    case "cancelledSubscriptions":
      return <XCircle />;
    case "expiredSubscriptions":
      return <Clock />;
    case "adminBalance":
      return <CreditCard />;
  }
};

const getStatColors = (type: StatType): { color: string; bgColor: string } => {
  switch (type) {
    case "totalDoctors":
      return { color: "#2196F3", bgColor: "#E3F2FD" };
    case "totalPatients":
      return { color: "#9C27B0", bgColor: "#F3E5F5" };
    case "activeSubscriptions":
      return { color: colors.primary, bgColor: colors.secondary };
    case "cancelledSubscriptions":
      return { color: "#F44336", bgColor: "#FFEBEE" };
    case "expiredSubscriptions":
      return { color: "#FF9800", bgColor: "#FFF3E0" };
    case "adminBalance":
      return { color: "#FF6900", bgColor: colors.stone[100] };
  }
};

// Stats Card Component
interface StatsCardProps {
  title: string;
  value: string | number;
  type: StatType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatsCard = ({ title, value, type, trend }: StatsCardProps) => {
  const icon = getStatIcon(type);
  const { color, bgColor } = getStatColors(type);

  return (
    <Card className="p-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-stone-600 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-stone-800">{value}</h3>
          {trend && (
            <p
              className={`text-sm mt-2 ${
                trend.isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)} from last
              month
            </p>
          )}
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: bgColor }}>
          {React.cloneElement(icon as React.ReactElement, {
            size: 24,
            color: color
          })}
        </div>
      </div>
    </Card>
  );
};
