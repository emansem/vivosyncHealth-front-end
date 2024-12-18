"use client";
import React, { useState } from "react";
import { Card } from "@/src/components/utils/Card";
import Input from "@/src/components/ui/forms/Input";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import {
  Search,
  User,
  Star,
  MessageSquare,
  Phone,
  Filter,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  Circle
} from "lucide-react";

import { colors } from "@/app/lib/constant";

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

const SPECIALTIES = [
  { value: "cardiology", label: "Cardiology" },
  { value: "dermatology", label: "Dermatology" },
  { value: "neurology", label: "Neurology" },
  { value: "pediatrics", label: "Pediatrics" },
  { value: "orthopedics", label: "Orthopedics" }
];

const STATUS_OPTIONS = [
  { value: "online", label: "Online" },
  { value: "offline", label: "Offline" },
  { value: "busy", label: "Busy" },
  { value: "pending", label: "Pending Verification" }
];

const DoctorsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Sample doctors data with communication-focused fields
  const doctors = [
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

  const getStatusIndicator = (status) => {
    const statusConfig = {
      online: {
        color: "bg-green-500",
        text: "text-green-700",
        bg: "bg-green-50"
      },
      offline: {
        color: "bg-stone-500",
        text: "text-stone-700",
        bg: "bg-stone-50"
      },
      busy: { color: "bg-red-500", text: "text-red-700", bg: "bg-red-50" },
      pending: {
        color: "bg-yellow-500",
        text: "text-yellow-700",
        bg: "bg-yellow-50"
      }
    };
    return statusConfig[status] || statusConfig.offline;
  };

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

      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search doctors by name or specialty..."
              className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <SelectInput
              id=""
              name="specialty"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              options={[
                { value: "all", label: "All Specialties" },
                ...SPECIALTIES
              ]}
            />
            <SelectInput
              id=""
              name="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              options={[
                { value: "all", label: "All Status" },
                ...STATUS_OPTIONS
              ]}
            />
          </div>
        </div>
      </Card>

      {/* Desktop View */}
      <div className="hidden md:block">
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="text-left py-4 px-6 text-stone-600 font-medium">
                    Doctor
                  </th>
                  <th className="text-left py-4 px-6 text-stone-600 font-medium">
                    Specialty
                  </th>
                  <th className="text-center py-4 px-6 text-stone-600 font-medium">
                    Rating
                  </th>
                  <th className="text-center py-4 px-6 text-stone-600 font-medium">
                    Response Time
                  </th>
                  <th className="text-center py-4 px-6 text-stone-600 font-medium">
                    Status
                  </th>
                  <th className="text-center py-4 px-6 text-stone-600 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {doctors.map((doctor) => (
                  <tr key={doctor.id} className="hover:bg-stone-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={doctor.photo}
                            alt={doctor.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <span
                            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                              getStatusIndicator(doctor.status).color
                            } ring-2 ring-white`}
                          ></span>
                        </div>
                        <div>
                          <span className="font-medium text-stone-800">
                            {doctor.name}
                          </span>
                          <p className="text-sm text-stone-500">
                            ID: {doctor.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-stone-600">
                      {doctor.specialty}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-1">
                        <Star
                          size={16}
                          className="text-yellow-400 fill-yellow-400"
                        />
                        <span className="font-medium">{doctor.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center text-stone-600">
                      {doctor.responseTime}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${
                            getStatusIndicator(doctor.status).bg
                          } ${getStatusIndicator(doctor.status).text}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              getStatusIndicator(doctor.status).color
                            }`}
                          ></span>
                          {doctor.status.charAt(0).toUpperCase() +
                            doctor.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-3">
                        <button className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                          <MessageSquare size={20} className="text-stone-400" />
                        </button>
                        <button className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                          <Phone size={20} className="text-stone-400" />
                        </button>
                        <button
                          onClick={() =>
                            (window.location.href = `/doctors/${doctor.id}`)
                          }
                          className="p-2 hover:bg-stone-100 rounded-full transition-colors"
                        >
                          <ChevronRight size={20} className="text-stone-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${
                      getStatusIndicator(doctor.status).color
                    } ring-2 ring-white`}
                  ></span>
                </div>
                <div>
                  <h3 className="font-medium text-stone-800">{doctor.name}</h3>
                  <p className="text-sm text-stone-500">{doctor.specialty}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-1">
                <p className="text-sm text-stone-500">Rating</p>
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">{doctor.rating}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-stone-500">Response Time</p>
                <p className="font-medium text-stone-700">
                  {doctor.responseTime}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-stone-500">Status</p>
                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-sm font-medium ${
                    getStatusIndicator(doctor.status).bg
                  } ${getStatusIndicator(doctor.status).text}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      getStatusIndicator(doctor.status).color
                    }`}
                  ></span>
                  {doctor.status.charAt(0).toUpperCase() +
                    doctor.status.slice(1)}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-stone-500">Last Active</p>
                <p className="font-medium text-stone-700">
                  {doctor.lastActive}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-stone-200">
              <div className="flex gap-2">
                <button className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                  <MessageSquare size={20} className="text-stone-400" />
                </button>
                <button className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                  <Phone size={20} className="text-stone-400" />
                </button>
              </div>
              <button
                onClick={() => (window.location.href = `/doctors/${doctor.id}`)}
                className="p-2 hover:bg-stone-100 rounded-full transition-colors"
              >
                <ChevronRight size={20} className="text-stone-400" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
