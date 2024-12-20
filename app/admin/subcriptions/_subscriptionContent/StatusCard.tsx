import { Card } from "@/src/components/utils/Card";
import React from "react";
import {
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  TrendingDown
} from "lucide-react";

// Helper function to get icon based on stat type
const getStatIcon = (type: string) => {
  switch (type) {
    case "revenue":
      return <DollarSign />;
    case "activeSubscriptions":
      return <CheckCircle />;
    case "expiringSoon":
      return <Clock />;
    case "cancelled":
      return <XCircle />;
    case "trending_up":
      return <TrendingUp />;
    case "trending_down":
      return <TrendingDown />;
    default:
      return <DollarSign />;
  }
};

// Helper function to get color scheme based on stat type
const getStatColors = (type: string): { color: string; bgColor: string } => {
  switch (type) {
    case "revenue":
      return { color: "#2196F3", bgColor: "#E3F2FD" };
    case "activeSubscriptions":
      return { color: "#4CAF50", bgColor: "#E8F5E9" };
    case "expiringSoon":
      return { color: "#FF9800", bgColor: "#FFF3E0" };
    case "cancelled":
      return { color: "#F44336", bgColor: "#FFEBEE" };
    default:
      return { color: "#2196F3", bgColor: "#E3F2FD" };
  }
};

// Enhanced StatsCard component using the helper functions
export const StatsCard = ({ title, value, type }) => {
  const icon = getStatIcon(type);
  const { color, bgColor } = getStatColors(type);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-stone-600 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-stone-800">{value}</h3>
          {/* {subValue && (
            <p className="text-sm text-stone-500 mt-1">{subValue}</p>
          )} */}
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: bgColor }}>
          {React.cloneElement(icon, { size: 24, color: color })}
        </div>
      </div>
    </Card>
  );
};
