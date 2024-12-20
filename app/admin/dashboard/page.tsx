"use client";
import React from "react";
import { Card } from "@/src/components/utils/Card";
import { StatsCard, StatType } from "./_dashboardContent/StateSection";
import {
  ActivityItem,
  ActivityType
} from "./_dashboardContent/ActivitySection";

// Dashboard Component
const Dashboard = () => {
  // Stats data with type-safe StatType
  const stats = [
    {
      type: "totalDoctors" as StatType,
      title: "Total Doctors",
      value: "1,234",
      trend: { value: 12, isPositive: true }
    },
    {
      type: "totalPatients" as StatType,
      title: "Total Patients",
      value: "5,678",
      trend: { value: 8, isPositive: true }
    },
    {
      type: "activeSubscriptions" as StatType,
      title: "Active Subscriptions",
      value: "892",
      trend: { value: 5, isPositive: true }
    },
    {
      type: "cancelledSubscriptions" as StatType,
      title: "Cancelled Subscriptions",
      value: "234",
      trend: { value: 2, isPositive: false }
    },
    {
      type: "expiredSubscriptions" as StatType,
      title: "Expired Subscriptions",
      value: "567",
      trend: { value: 3, isPositive: false }
    }
  ];

  // Activity data with type-safe ActivityType
  const recentTransactions = [
    {
      type: "premiumSubscription" as ActivityType,
      title: "Premium Plan Subscription",
      description: "Dr. Sarah Johnson - $299",
      time: "2 hours ago"
    },
    {
      type: "basicSubscription" as ActivityType,
      title: "Basic Plan Renewal",
      description: "Dr. Michael Chen - $199",
      time: "5 hours ago"
    }
  ];

  const recentRegistrations = [
    {
      type: "doctorRegistration" as ActivityType,
      title: "New Doctor Registration",
      description: "Dr. Emily Williams - Cardiologist",
      time: "1 hour ago"
    },
    {
      type: "patientRegistration" as ActivityType,
      title: "New Patient Registration",
      description: "Robert Wilson",
      time: "3 hours ago"
    }
  ];

  const recentTickets = [
    {
      type: "technicalSupport" as ActivityType,
      title: "Technical Support",
      description: "Login issues - High Priority",
      time: "30 minutes ago"
    },
    {
      type: "billingSupport" as ActivityType,
      title: "Billing Support",
      description: "Payment verification pending",
      time: "2 hours ago"
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
