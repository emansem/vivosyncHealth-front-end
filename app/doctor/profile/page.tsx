"use client";

import LoadingState from "@/src/components/ui/loading/LoadingState";
import { useGetUser } from "@/src/hooks/serviceHook";
import { Users, Star } from "lucide-react";

interface DoctorInternalStats {
  totalPatients: number;
  totalAppointments: number;
  averageRating: number;
  reviewCount: number;
  completionRate: number;
}

const DoctorInternalProfile = () => {
  const doctorStats: DoctorInternalStats = {
    totalPatients: 1234,
    totalAppointments: 5678,
    averageRating: 4.8,
    reviewCount: 156,
    completionRate: 98
  };

  const { data, isLoading, isError } = useGetUser();
  if (isLoading) return <LoadingState />;

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Profile Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <div className="relative">
            <img
              src={data?.data.user.profile_photo}
              alt="Doctor Avatar"
              className="w-24 h-24 rounded-xl object-cover min-h-24 min-w-24"
            />
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="mb-2">
              <h1 className="text-xl font-semibold text-gray-900">
                Dr. {data?.data?.user?.name}
              </h1>
              <p className="text-gray-600">{data?.data?.user?.speciality}</p>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                {data?.data?.user?.years_of_experience} Years Experience
              </span>
              <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Patients
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {doctorStats.totalPatients}
              </p>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rating</p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-2xl font-bold text-gray-900">
                  {data?.data?.user?.rating || 0.5}
                </p>
                <p className="text-sm text-gray-500">
                  ({data?.data?.user?.num_reviews || 0} reviews)
                </p>
              </div>
            </div>
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          About Dr. {data?.data?.user?.name}
        </h2>
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            {data?.data?.user?.about.slice(0, 200)}...
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Personal Information
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Email</p>
              <p className="text-gray-900">{data?.data?.user?.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Phone</p>
              <p className="text-gray-900">{data?.data?.user?.phone_number}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Address</p>
              <p className="text-gray-900">
                {data?.data?.user?.hospital_address}
              </p>
            </div>
            <div className="pt-2">
              <button className="text-sm text-primary hover:text-primary/80">
                Edit Information
              </button>
            </div>
          </div>
        </div>

        {/* Professional Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Professional Details
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Specialization
              </p>
              <p className="text-gray-900">{data?.data?.user?.speciality}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">
                License Number
              </p>
              <p className="text-gray-900">
                {data?.data?.user?.medical_license}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Experience</p>
              <p className="text-gray-900">
                {data?.data?.user?.years_of_experience} Years
              </p>
            </div>
            <div className="pt-2">
              <button className="text-sm text-primary hover:text-primary/80">
                View Credentials
              </button>
            </div>
          </div>
        </div>

        {/* Schedule Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Schedule Overview
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Working days</p>
              <p className="text-gray-900">{data?.data?.user?.working_days}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Languages</p>
              <p className="text-gray-900">{data?.data?.user?.languages}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Hospital Name</p>
              <p className="text-gray-900">{data?.data?.user?.hospital_name}</p>
            </div>
            <div className="pt-2">
              <button className="text-sm text-primary hover:text-primary/80">
                Edit Information
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorInternalProfile;
