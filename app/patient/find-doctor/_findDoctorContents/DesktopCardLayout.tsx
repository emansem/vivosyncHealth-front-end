import React from "react";
import { Star } from "lucide-react";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { UserType } from "@/src/hooks/serviceHook";

const DesktopCardLayout: React.FC<{ doctor: UserType }> = ({ doctor }) => {
  return (
    <div className="bg-white border border-gray-700/10 rounded-xl p-6  shadow-shadow2  hover:shadow-lg  transition-all">
      {/* Doctor's profile section */}
      <div className="flex flex-col items-center mb-4">
        <div className="relative mb-4">
          <div className="w-24 h-24 min-h-24 min-w-24 rounded-full overflow-hidden border border-primary_color bg-blue-50">
            <img
              src={doctor.profile_photo}
              alt={doctor.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Online status indicator */}
          {/* {doctor.isOnline && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
          )} */}
        </div>

        {/* Doctor's basic information */}
        <h3 className="text-xl font-bold text-stone-700 text-center mb-1">
          {doctor.name}
        </h3>
        <p className="text-text_color2 text-base mb-1">
          {doctor.country} | {doctor.city}
        </p>
        {/* <p className="text-gray-500 text-sm mb-3">
          License N°: {doctor.licenseNo}
        </p> */}

        {/* Specialties tags */}
        <div className="flex flex-wrap gap-2 justify-center mb-3">
          <span className="text-xs px-2 py-1 bg-primary_color/10 text-secondary_color rounded-full">
            {doctor.speciality}
          </span>
        </div>

        {/* Rating section */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-orange-100 rounded-lg px-3 py-1">
            <span className="text-gray-800 font-semibold">{doctor.rating}</span>
            <Star className="w-4 h-4 text-orange-400 ml-1" />
          </div>
          <span className="text-gray-500">
            {doctor.num_reviews || 0} reviews
          </span>
        </div>
      </div>

      {/* Stats and booking section */}
      <div className="border-t pt-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <span className="block text-gray-800 font-medium">
              {doctor.years_of_experience} Yrs
            </span>
            <span className="text-sm text-gray-500">Experience</span>
          </div>
          <div className="text-center">
            <span className="block text-gray-800 font-medium">800+</span>
            <span className="text-sm text-gray-500">Patients treated</span>
          </div>
        </div>

        <a href={`/patient/find-doctor/${doctor.user_id}`}>
          <PrimaryButton backgroud color="text-white">
            See Profile
          </PrimaryButton>
        </a>
      </div>
    </div>
  );
};

export default DesktopCardLayout;
