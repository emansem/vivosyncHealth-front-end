"use client";
import React from "react";
import { Card } from "@/src/components/utils/Card";
import {
  Users,
  UserCog,
  BadgeCheck,
  XCircle,
  Clock,
  AlertCircle,
  Wallet,
  HeadphonesIcon,
  UserPlus
} from "lucide-react";

// Import colors from your theme
const colors = {
  primary: "#269c65",
  secondary: "#e8f5e9",
  stone: {
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917"
  }
};

// Stats Card Component
interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color: string;
  bgColor: string;
}

const StatsCard = ({
  title,
  value,
  icon,
  trend,
  color,
  bgColor
}: StatsCardProps) => (
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
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% from last
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

// Activity Item Component
interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  color: string;
  bgColor: string;
}

const ActivityItem = ({
  icon,
  title,
  description,
  time,
  color,
  bgColor
}: ActivityItemProps) => (
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

// Dashboard Component
const Dashboard = () => {
  const stats = [
    {
      title: "Total Doctors",
      value: "1,234",
      icon: <UserCog />,
      trend: { value: 12, isPositive: true },
      color: "#2196F3",
      bgColor: "#E3F2FD"
    },
    {
      title: "Total Patients",
      value: "5,678",
      icon: <Users />,
      trend: { value: 8, isPositive: true },
      color: "#9C27B0",
      bgColor: "#F3E5F5"
    },
    {
      title: "Active Subscriptions",
      value: "892",
      icon: <BadgeCheck />,
      trend: { value: 5, isPositive: true },
      color: colors.primary,
      bgColor: colors.secondary
    },
    {
      title: "Cancelled Subscriptions",
      value: "234",
      icon: <XCircle />,
      trend: { value: 2, isPositive: false },
      color: "#F44336",
      bgColor: "#FFEBEE"
    },
    {
      title: "Expired Subscriptions",
      value: "567",
      icon: <Clock />,
      trend: { value: 3, isPositive: false },
      color: "#FF9800",
      bgColor: "#FFF3E0"
    }
  ];

  const recentTransactions = [
    {
      icon: <Wallet />,
      title: "Premium Plan Subscription",
      description: "Dr. Sarah Johnson - $299",
      time: "2 hours ago",
      color: "#2196F3",
      bgColor: "#E3F2FD"
    },
    {
      icon: <Wallet />,
      title: "Basic Plan Renewal",
      description: "Dr. Michael Chen - $199",
      time: "5 hours ago",
      color: "#2196F3",
      bgColor: "#E3F2FD"
    }
  ];

  const recentRegistrations = [
    {
      icon: <UserPlus />,
      title: "New Doctor Registration",
      description: "Dr. Emily Williams - Cardiologist",
      time: "1 hour ago",
      color: colors.primary,
      bgColor: colors.secondary
    },
    {
      icon: <UserPlus />,
      title: "New Patient Registration",
      description: "Robert Wilson",
      time: "3 hours ago",
      color: "#9C27B0",
      bgColor: "#F3E5F5"
    }
  ];

  const recentTickets = [
    {
      icon: <HeadphonesIcon />,
      title: "Technical Support",
      description: "Login issues - High Priority",
      time: "30 minutes ago",
      color: "#F44336",
      bgColor: "#FFEBEE"
    },
    {
      icon: <HeadphonesIcon />,
      title: "Billing Support",
      description: "Payment verification pending",
      time: "2 hours ago",
      color: "#FF9800",
      bgColor: "#FFF3E0"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Activity Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-stone-800 mb-4">
            Recent Transactions
          </h3>
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <ActivityItem key={index} {...transaction} />
            ))}
          </div>
        </Card>

        {/* Recent Registrations */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-stone-800 mb-4">
            Recent Registrations
          </h3>
          <div className="space-y-4">
            {recentRegistrations.map((registration, index) => (
              <ActivityItem key={index} {...registration} />
            ))}
          </div>
        </Card>

        {/* Recent Support Tickets */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-stone-800 mb-4">
            Recent Support Tickets
          </h3>
          <div className="space-y-4">
            {recentTickets.map((ticket, index) => (
              <ActivityItem key={index} {...ticket} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
