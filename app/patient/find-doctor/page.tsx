"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  Star,
  ChevronRight,
  Heart,
  Brain,
  Activity,
  Stethoscope
} from "lucide-react";

// Type definitions for better type safety and documentation
interface Doctor {
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
const DoctorCard: React.FC<{ doctor: Doctor; isMobile: boolean }> = ({
  doctor,
  isMobile
}) => {
  // Mobile layout version of the card
  if (isMobile) {
    return (
      <div className="bg-white rounded-xl p-4 flex items-start gap-4 border border-gray-100">
        {/* Doctor's profile image section */}
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-blue-50">
            <img
              src="/api/placeholder/80/80"
              alt={doctor.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Online status indicator */}
          {doctor.isOnline && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
          )}
        </div>

        {/* Doctor's information section */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
              <p className="text-green-500 text-base">{doctor.title}</p>
              <p className="text-gray-500 text-sm mt-1">
                License N°: {doctor.licenseNo}
              </p>
            </div>
            <ChevronRight className="w-8 h-8 text-blue-500 bg-blue-100 rounded-full p-1" />
          </div>

          {/* Rating section */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center bg-orange-100 rounded-lg px-3 py-1">
              <span className="text-gray-800 font-semibold">
                {doctor.rating}
              </span>
              <Star className="w-4 h-4 text-orange-400 ml-1" />
            </div>
            <span className="text-gray-500">{doctor.reviews} reviews</span>
          </div>

          {/* Experience and consultation counts */}
          <div className="flex items-center gap-6 mt-2 text-gray-600">
            <div>
              <span className="text-gray-800 font-medium">
                {doctor.yearsExperience} Yrs
              </span>
              <span className="text-gray-500"> Experience</span>
            </div>
            <div>
              <span className="text-gray-800 font-medium">
                {doctor.consultations}+
              </span>
              <span className="text-gray-500"> Consultations</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop layout version of the card
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all">
      {/* Doctor's profile section */}
      <div className="flex flex-col items-center mb-4">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-xl overflow-hidden bg-blue-50">
            <img
              src="/api/placeholder/96/96"
              alt={doctor.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Online status indicator */}
          {doctor.isOnline && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
          )}
        </div>

        {/* Doctor's basic information */}
        <h3 className="text-xl font-bold text-gray-900 text-center mb-1">
          {doctor.name}
        </h3>
        <p className="text-green-500 text-base mb-1">{doctor.title}</p>
        <p className="text-gray-500 text-sm mb-3">
          License N°: {doctor.licenseNo}
        </p>

        {/* Specialties tags */}
        <div className="flex flex-wrap gap-2 justify-center mb-3">
          {doctor.specialties.map((specialty, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full"
            >
              {specialty}
            </span>
          ))}
        </div>

        {/* Rating section */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-orange-100 rounded-lg px-3 py-1">
            <span className="text-gray-800 font-semibold">{doctor.rating}</span>
            <Star className="w-4 h-4 text-orange-400 ml-1" />
          </div>
          <span className="text-gray-500">{doctor.reviews} reviews</span>
        </div>
      </div>

      {/* Stats and booking section */}
      <div className="border-t pt-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <span className="block text-gray-800 font-medium">
              {doctor.yearsExperience} Yrs
            </span>
            <span className="text-sm text-gray-500">Experience</span>
          </div>
          <div className="text-center">
            <span className="block text-gray-800 font-medium">
              {doctor.consultations}+
            </span>
            <span className="text-sm text-gray-500">Consultations</span>
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white rounded-lg py-2.5 hover:bg-blue-700 transition-colors font-medium">
          Book Appointment
        </button>
      </div>
    </div>
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

  // Sample doctors data
  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Fon Phyllis",
      title: "Generalist",
      licenseNo: "8853",
      rating: 4.4,
      reviews: 21,
      yearsExperience: 7,
      consultations: 300,
      imageUrl: "/doctors/doctor1.jpg",
      isOnline: true,
      specialties: ["General Medicine", "Family Medicine"]
    },
    {
      id: "2",
      name: "Dr. Ngoula Charlotte",
      title: "Generalist",
      licenseNo: "10049",
      rating: 4.7,
      reviews: 46,
      yearsExperience: 6,
      consultations: 500,
      imageUrl: "/doctors/doctor2.jpg",
      isOnline: true,
      specialties: ["General Medicine", "Pediatrics"]
    },
    {
      id: "3",
      name: "Dr. Yoyo",
      title: "Generalist | Sexologist | Proctologist",
      licenseNo: "6659",
      rating: 4.4,
      reviews: 39,
      yearsExperience: 13,
      consultations: 400,
      imageUrl: "/doctors/doctor3.jpg",
      specialties: ["General Medicine", "Sexology", "Proctology"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto min-h-screen p-6 bg-gray-50">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorFinder;
