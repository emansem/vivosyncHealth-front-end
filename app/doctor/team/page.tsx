"use client";
import { useState } from "react";
import {
  Search,
  Filter,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Star,
  UserCheck
} from "lucide-react";
import Image from "next/image";

const TeamPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Doctors"
          value="45"
          icon={<UserCheck className="w-5 h-5" />}
        />
        <StatCard
          title="Active Today"
          value="28"
          icon={<Calendar className="w-5 h-5" />}
        />
        <StatCard
          title="Top Rated"
          value="15"
          icon={<Star className="w-5 h-5" />}
        />
        <StatCard
          title="New This Month"
          value="8"
          icon={<UserCheck className="w-5 h-5" />}
        />
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search doctors by name or specialization..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary_color"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <Filter className="w-5 h-5" />
          Filter
        </button>
      </div>

      {/* Team Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} {...member} />
        ))}
      </div>
    </div>
  );
};

// Reusable Components
const StatCard = ({
  title,
  value,
  icon
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) => (
  <div className="bg-white rounded-lg shadow-sm p-4">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-xl font-bold mt-1">{value}</p>
      </div>
      <div className="text-primary_color">{icon}</div>
    </div>
  </div>
);

const TeamMemberCard = ({
  name,
  role,
  photo,
  specialization,
  location,
  rating,
  patients,
  experience,
  contact
}: {
  name: string;
  role: string;
  photo: string;
  specialization: string;
  location: string;
  rating: number;
  patients: number;
  experience: string;
  contact: {
    email: string;
    phone: string;
  };
}) => (
  <div className="bg-white rounded-lg shadow-sm overflow-hidden">
    {/* Top Section with Background */}
    <div className="bg-primary_color/10 p-6">
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20">
          <Image
            src={photo}
            alt={name}
            fill
            className="rounded-full object-cover border-4 border-white"
          />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-gray-600">{role}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
      </div>
    </div>

    {/* Info Section */}
    <div className="p-6 space-y-4">
      {/* Specialization & Location */}
      <div className="space-y-2">
        <div className="inline-block px-3 py-1 bg-primary_color/10 rounded-full text-sm">
          {specialization}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          {location}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 py-2 border-y">
        <div className="text-center">
          <p className="text-lg font-semibold">{patients}</p>
          <p className="text-xs text-gray-600">Patients</p>
        </div>
        <div className="text-center border-x">
          <p className="text-lg font-semibold">{experience}</p>
          <p className="text-xs text-gray-600">Experience</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold">{rating}</p>
          <p className="text-xs text-gray-600">Rating</p>
        </div>
      </div>

      {/* Contact */}
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4" />
          {contact.email}
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          {contact.phone}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button className="flex-1 px-4 py-2 bg-primary_color text-white rounded-lg hover:bg-primary_color/90">
          View Profile
        </button>
        <button className="flex-1 px-4 py-2 border border-primary_color text-primary_color rounded-lg hover:bg-primary_color/10">
          Message
        </button>
      </div>
    </div>
  </div>
);

// Sample Data
const teamMembers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Senior Cardiologist",
    photo: "/api/placeholder/150/150",
    specialization: "Cardiology",
    location: "Central Hospital, NYC",
    rating: 4.8,
    patients: 1200,
    experience: "15 yrs",
    contact: {
      email: "sarah.j@hospital.com",
      phone: "+1 234-567-8900"
    }
  }
  // Add more team members...
];

export default TeamPage;
