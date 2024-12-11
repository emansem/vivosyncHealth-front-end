"use client";
import { Star, MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";
interface TeamMemberCardProps {
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
}

export const TeamMemberCard = ({
  name,
  role,
  photo,
  specialization,
  location,
  rating,
  patients,
  experience,
  contact
}: TeamMemberCardProps) => (
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
