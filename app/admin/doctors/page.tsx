"use client";
import React, { useState } from "react";
import { Card } from "@/src/components/utils/Card";

import { User, CheckCircle, Clock } from "lucide-react";

import { colors } from "@/app/lib/constant";
import DeskTopView from "./_doctorContents/DeskTopView";
import MobileView from "./_doctorContents/MobileView";
import FilterSection from "./_doctorContents/FilterSection";

// Stats Card Component
const StatsCard = ({ title, value, icon, color, bgColor }) => (
  <Card className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-stone-600 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-stone-800">{value}</h3>
      </div>
      <div className="p-3 rounded-full" style={{ backgroundColor: bgColor }}>
        {React.cloneElement(icon, { size: 24, color: color })}
      </div>
    </div>
  </Card>
);

export const doctors = [
  {
    id: "D001",
    name: "Dr. Sarah Johnson",
    photo: "/api/placeholder/40/40",
    specialty: "Cardiology",
    rating: 4.8,
    status: "online",
    verificationStatus: "verified",
    totalPatients: 1250,
    responseTime: "~5 min",
    lastActive: "2 min ago",
    unreadMessages: 3
  },
  {
    id: "D002",
    name: "Dr. Michael Chen",
    photo: "/api/placeholder/40/40",
    specialty: "Neurology",
    rating: 4.9,
    status: "busy",
    verificationStatus: "verified",
    totalPatients: 980,
    responseTime: "~10 min",
    lastActive: "Active now",
    unreadMessages: 0
  }
];

const DoctorsList = () => {
  const stats = [
    {
      title: "Total Doctors",
      value: "248",
      icon: <User />,
      color: colors.primary,
      bgColor: colors.secondary
    },
    {
      title: "Online Now",
      value: "52",
      icon: <CheckCircle />,
      color: "#2196F3",
      bgColor: "#E3F2FD"
    },
    {
      title: "Pending Verification",
      value: "12",
      icon: <Clock />,
      color: "#FF9800",
      bgColor: "#FFF3E0"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800">Doctor Management</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>
      {/* Search and filter section */}
      <FilterSection />

      {/* Desktop View */}
      <DeskTopView />

      {/* Mobile  View */}
      <MobileView />
    </div>
  );
};

export default DoctorsList;
