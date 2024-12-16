"use client";
import React, { useState } from "react";
import { Card } from "@/src/components/utils/Card";
import {
  Search,
  Users,
  UserCheck,
  UserX,
  ChevronRight,
  Filter,
  Globe2,
  CalendarDays,
  ArrowUpDown
} from "lucide-react";

// Colors from your theme
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

// Helper function for status colors
const getStatusColor = (status: string) => {
  const statusColors = {
    active: { text: "text-green-700", bg: "bg-green-50", dot: "bg-green-500" },
    inactive: { text: "text-red-700", bg: "bg-red-50", dot: "bg-red-500" },
    pending: {
      text: "text-yellow-700",
      bg: "bg-yellow-50",
      dot: "bg-yellow-500"
    }
  };
  return statusColors[status.toLowerCase()] || statusColors.pending;
};

// Stats Card Component
interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const StatsCard = ({ title, value, icon, color, bgColor }: StatsCardProps) => (
  <Card className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-stone-600 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-stone-800">{value}</h3>
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

// Patient List Component
const PatientList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Sample data - replace with your actual data
  const patients = [
    {
      id: "P001",
      name: "John Smith",
      photo: "/api/placeholder/40/40",
      country: "United States",
      joinDate: "2024-01-15",
      status: "active"
    },
    {
      id: "P002",
      name: "Sarah Johnson",
      photo: "/api/placeholder/40/40",
      country: "Canada",
      joinDate: "2024-02-01",
      status: "inactive"
    }
    // Add more sample data as needed
  ];

  const stats = [
    {
      title: "Total Patients",
      value: "5,234",
      icon: <Users />,
      color: colors.primary,
      bgColor: colors.secondary
    },
    {
      title: "Active Patients",
      value: "4,123",
      icon: <UserCheck />,
      color: "#2196F3",
      bgColor: "#E3F2FD"
    },
    {
      title: "Inactive Patients",
      value: "1,111",
      icon: <UserX />,
      color: "#F44336",
      bgColor: "#FFEBEE"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800">
          Patient Management
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Filters and Search - Desktop */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search patients..."
              className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative">
              <select
                className="appearance-none pl-10 pr-8 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="all">All Countries</option>
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                {/* Add more countries */}
              </select>
              <Globe2
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                size={20}
              />
            </div>
            <div className="relative">
              <select
                className="appearance-none pl-10 pr-8 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <Filter
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                size={20}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Patient List - Desktop */}
      <div className="hidden md:block">
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="text-left py-4 px-6 text-stone-600 font-medium">
                    Patient
                  </th>
                  <th className="text-left py-4 px-6 text-stone-600 font-medium">
                    ID
                  </th>
                  <th className="text-left py-4 px-6 text-stone-600 font-medium">
                    Country
                  </th>
                  <th className="text-left py-4 px-6 text-stone-600 font-medium">
                    Join Date
                  </th>
                  <th className="text-left py-4 px-6 text-stone-600 font-medium">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-stone-600 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {patients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-stone-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={patient.photo}
                          alt={patient.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="font-medium text-stone-800">
                          {patient.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-stone-600">{patient.id}</td>
                    <td className="py-4 px-6 text-stone-600">
                      {patient.country}
                    </td>
                    <td className="py-4 px-6 text-stone-600">
                      {new Date(patient.joinDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                          getStatusColor(patient.status).bg
                        } ${getStatusColor(patient.status).text}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            getStatusColor(patient.status).dot
                          }`}
                        ></span>
                        {patient.status.charAt(0).toUpperCase() +
                          patient.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() =>
                          (window.location.href = `/patients/${patient.id}`)
                        }
                        className="text-stone-400 hover:text-primary transition-colors"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Patient List - Mobile */}
      <div className="md:hidden space-y-4">
        {patients.map((patient) => (
          <Card key={patient.id} className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={patient.photo}
                  alt={patient.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-stone-800">{patient.name}</h3>
                  <p className="text-sm text-stone-500">{patient.id}</p>
                </div>
              </div>
              <button
                onClick={() =>
                  (window.location.href = `/patients/${patient.id}`)
                }
                className="text-stone-400 hover:text-primary transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-500">Country</span>
                <span className="text-stone-700">{patient.country}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-500">Join Date</span>
                <span className="text-stone-700">
                  {new Date(patient.joinDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-500">Status</span>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                    getStatusColor(patient.status).bg
                  } ${getStatusColor(patient.status).text}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      getStatusColor(patient.status).dot
                    }`}
                  ></span>
                  {patient.status.charAt(0).toUpperCase() +
                    patient.status.slice(1)}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientList;
