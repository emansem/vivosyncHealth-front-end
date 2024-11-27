"use client";
import React, { useState, useEffect } from "react";
import { Search, ChevronRight, Heart, Brain, Activity } from "lucide-react";
import DesktopCardLayout from "./_findDoctorContents/DesktopCardLayout";
import MobileCardLayout from "./_findDoctorContents/MobileCardLayout";
import { useGetAllDoctors } from "@/src/hooks/patient/useDoctorData";
import { UserType } from "@/src/hooks/serviceHook";

// Type definitions for better type safety and documentation
export interface Doctor {
  id: string;
  name: string;
  title: string;
  licenseNo: string;
  rating: number;
  reviews: number;
  yearsExperience: number;
  consultations: number;
  imageUrl: string;
  isOnline?: boolean;
  specialties: string[];
}

interface Specialty {
  id: string;
  icon: React.ReactNode;
  title: string;
  activeCount: number;
  totalDoctors: number;
  gradient: string;
  iconColor: string;
}

// Component for individual doctor cards with responsive design
const DoctorCard: React.FC<{ doctor: UserType; isMobile: boolean }> = ({
  doctor
}) => {
  // Mobile layout version of the card
  return (
    <>
      <div className="md:hidden">
        <MobileCardLayout doctor={doctor} />
      </div>
      <div className="hidden md:block">
        <DesktopCardLayout doctor={doctor} />
      </div>
    </>
  );
};

// Specialty card component
const SpecialtyCard: React.FC<{ specialty: Specialty }> = ({ specialty }) => (
  <div
    className={`rounded-xl p-6 ${specialty.gradient} hover:shadow-lg transition-all cursor-pointer border border-gray-100`}
  >
    <div className="flex justify-between items-start mb-4">
      <div
        className={`${specialty.iconColor} p-3 rounded-xl bg-white/90 shadow-sm`}
      >
        {specialty.icon}
      </div>
      <div className="text-right">
        <span className="text-sm font-medium text-gray-600">
          {specialty.activeCount} Active
        </span>
        <p className="text-xs text-gray-500">out of {specialty.totalDoctors}</p>
      </div>
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-1">
      {specialty.title}
    </h3>
    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
      View Doctors <ChevronRight className="w-4 h-4" />
    </button>
  </div>
);

// Main component
const DoctorFinder: React.FC = () => {
  // State for handling responsive design
  const [isMobile, setIsMobile] = useState(false);
  const { doctors: doctorData } = useGetAllDoctors();
  console.log("All doctors fetched from the database", doctorData);

  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sample specialty data
  const specialties: Specialty[] = [
    {
      id: "1",
      icon: <Heart className="w-8 h-8" />,
      title: "Cardiology",
      activeCount: 42,
      totalDoctors: 48,
      gradient: "bg-gradient-to-br from-rose-50 to-rose-100",
      iconColor: "text-rose-500"
    },
    {
      id: "2",
      icon: <Brain className="w-8 h-8" />,
      title: "Neurology",
      activeCount: 32,
      totalDoctors: 36,
      gradient: "bg-gradient-to-br from-blue-50 to-blue-100",
      iconColor: "text-blue-500"
    },
    {
      id: "3",
      icon: <Activity className="w-8 h-8" />,
      title: "General Medicine",
      activeCount: 48,
      totalDoctors: 52,
      gradient: "bg-gradient-to-br from-green-50 to-green-100",
      iconColor: "text-green-500"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-2 md:p-6 rounded-md  bg-white">
      {/* Header Section */}
      <div className="max-w-2xl mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Find Your Doctor
        </h1>
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by doctor name, specialty, or condition..."
            className="w-full pl-11 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Specialties Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Popular Specialties
          </h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            View All Specialties
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {specialties.map((specialty) => (
            <SpecialtyCard key={specialty.id} specialty={specialty} />
          ))}
        </div>
      </div>

      {/* Doctors Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Available Doctors
          </h2>
          <div className="flex items-center gap-4">
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              View All
            </button>
          </div>
        </div>
        {/* Responsive grid: 1 column on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-6">
          {doctorData.map((doctor) => (
            <DoctorCard
              key={doctor.user_id}
              doctor={doctor}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorFinder;
