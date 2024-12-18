"use client";
import React, { useState } from "react";
import { Card } from "@/src/components/utils/Card";
import { Button } from "@/src/components/utils/Button";
import Input from "@/src/components/ui/forms/Input";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import ImageComponent from "@/src/components/utils/Image";
import { colors } from "@/app/lib/constant";
import {
  UserCog,
  Star,
  MessageSquare,
  Shield,
  FileText,
  Clock,
  AlertCircle,
  Users,
  ChevronDown,
  XCircle,
  CheckCircle
} from "lucide-react";

const SPECIALTIES = [
  { value: "cardiology", label: "Cardiology" },
  { value: "dermatology", label: "Dermatology" },
  { value: "neurology", label: "Neurology" },
  { value: "pediatrics", label: "Pediatrics" },
  { value: "orthopedics", label: "Orthopedics" }
];

const VERIFICATION_STATUS = [
  { value: "verified", label: "Verified" },
  { value: "pending", label: "Pending" },
  { value: "rejected", label: "Rejected" }
];

const SingleDoctorView = () => {
  const [isPending, setIsPending] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState({
    id: "D001",
    first_name: "Sarah",
    last_name: "Johnson",
    email: "dr.sarah@example.com",
    specialty: "cardiology",
    verification_status: "verified",
    profile_photo: "/api/placeholder/96/96",
    education: "MD - Harvard Medical School",
    experience_years: "15",
    registration_number: "MED123456",
    bio: "Experienced cardiologist specializing in preventive cardiology and heart disease management.",
    languages: "English, Spanish",
    ratings_average: 4.8,
    total_reviews: 234,
    response_rate: "95%",
    status: "active"
  });

  const handleUpdateDoctorInfo = (e) => {
    const { name, value } = e.target;
    setDoctorInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setIsPending(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error("Error updating doctor:", error);
    } finally {
      setIsPending(false);
    }
  };

  // Stats data for quick overview
  const stats = [
    {
      title: "Total Patients",
      value: "1,234",
      icon: <Users size={20} color={colors.primary} />
    },
    {
      title: "Response Rate",
      value: "95%",
      icon: <MessageSquare size={20} color="#2196F3" />
    },
    {
      title: "Average Rating",
      value: "4.8/5",
      icon: <Star size={20} color="#FFC107" />
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800">Doctor Profile</h1>
        <div className="flex gap-4">
          <Button
            variant={doctorInfo.status === "active" ? "secondary" : "primary"}
            onClick={() =>
              setDoctorInfo((prev) => ({
                ...prev,
                status: prev.status === "active" ? "inactive" : "active"
              }))
            }
          >
            {doctorInfo.status === "active"
              ? "Deactivate Account"
              : "Activate Account"}
          </Button>
          <Button onClick={handleSubmit} variant="primary">
            {isPending ? "Saving changes.." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-stone-600 text-sm font-medium">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <div className="p-3 rounded-full bg-stone-50">{stat.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information Form */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-stone-800 mb-6">
              Doctor Information
            </h2>

            {/* Profile Photo */}
            <div className="mb-6">
              <ImageComponent
                imageStyle="w-24 h-24 rounded-full"
                altAttribute="Profile"
                imageUrl={doctorInfo.profile_photo}
              />
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                onChange={handleUpdateDoctorInfo}
                value={doctorInfo.first_name}
                inputType="text"
                name="first_name"
              />
              <Input
                label="Last Name"
                onChange={handleUpdateDoctorInfo}
                value={doctorInfo.last_name}
                inputType="text"
                name="last_name"
              />
              <Input
                label="Email"
                onChange={handleUpdateDoctorInfo}
                value={doctorInfo.email}
                inputType="email"
                name="email"
              />
              <Input
                label="Registration Number"
                onChange={handleUpdateDoctorInfo}
                value={doctorInfo.registration_number}
                inputType="text"
                name="registration_number"
              />
              <SelectInput
                label="Specialty"
                id="specialty"
                value={doctorInfo.specialty}
                onChange={handleUpdateDoctorInfo}
                name="specialty"
                options={SPECIALTIES}
              />
              <Input
                label="Experience (Years)"
                onChange={handleUpdateDoctorInfo}
                value={doctorInfo.experience_years}
                inputType="number"
                name="experience_years"
              />
              <Input
                label="Languages"
                onChange={handleUpdateDoctorInfo}
                value={doctorInfo.languages}
                inputType="text"
                name="languages"
              />
              <SelectInput
                label="Verification Status"
                id="verification_status"
                value={doctorInfo.verification_status}
                onChange={handleUpdateDoctorInfo}
                name="verification_status"
                options={VERIFICATION_STATUS}
              />
              <div className="md:col-span-2">
                <Input
                  label="Education"
                  onChange={handleUpdateDoctorInfo}
                  value={doctorInfo.education}
                  inputType="text"
                  name="education"
                />
              </div>
              <div className="md:col-span-2">
                <Input
                  label="Professional Bio"
                  onChange={handleUpdateDoctorInfo}
                  value={doctorInfo.bio}
                  inputType="text"
                  name="bio"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Information */}
        <div className="space-y-6">
          {/* Verification Status */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-stone-800 mb-4">
              Verification Status
            </h2>
            <div className="space-y-4">
              <div
                className={`flex items-center gap-3 p-4 rounded-lg ${
                  doctorInfo.verification_status === "verified"
                    ? "bg-green-50"
                    : doctorInfo.verification_status === "pending"
                    ? "bg-yellow-50"
                    : "bg-red-50"
                }`}
              >
                {doctorInfo.verification_status === "verified" ? (
                  <CheckCircle className="text-green-500" size={24} />
                ) : doctorInfo.verification_status === "pending" ? (
                  <Clock className="text-yellow-500" size={24} />
                ) : (
                  <XCircle className="text-red-500" size={24} />
                )}
                <div>
                  <p
                    className={`font-medium ${
                      doctorInfo.verification_status === "verified"
                        ? "text-green-700"
                        : doctorInfo.verification_status === "pending"
                        ? "text-yellow-700"
                        : "text-red-700"
                    }`}
                  >
                    {doctorInfo.verification_status.charAt(0).toUpperCase() +
                      doctorInfo.verification_status.slice(1)}
                  </p>
                  <p className="text-sm text-stone-600">
                    {doctorInfo.verification_status === "verified"
                      ? "All documents verified"
                      : doctorInfo.verification_status === "pending"
                      ? "Verification in progress"
                      : "Verification needed"}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Message Statistics */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-stone-800 mb-4">
              Message Statistics
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                <span className="text-stone-600">Response Rate</span>
                <span className="font-medium text-stone-800">95%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                <span className="text-stone-600">Avg. Response Time</span>
                <span className="font-medium text-stone-800">5 mins</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                <span className="text-stone-600">Messages this month</span>
                <span className="font-medium text-stone-800">342</span>
              </div>
            </div>
          </Card>

          {/* Rating Summary */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-stone-800 mb-4">
              Rating Summary
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Star className="text-yellow-400 fill-yellow-400" size={24} />
                <span className="text-2xl font-bold text-stone-800">
                  {doctorInfo.ratings_average}
                </span>
                <span className="text-stone-500">
                  ({doctorInfo.total_reviews} reviews)
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                  <span className="text-sm text-stone-600">5 star</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400"
                      style={{ width: "15%" }}
                    ></div>
                  </div>
                  <span className="text-sm text-stone-600">4 star</span>
                </div>
                {/* Add more rating bars as needed */}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SingleDoctorView;
