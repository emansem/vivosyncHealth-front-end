import { ChevronRight, Star } from "lucide-react";
import React from "react";
import ImageComponent from "@/src/components/utils/Image";
import { UserType } from "@/src/hooks/serviceHook";

const MobileCardLayout: React.FC<{ doctor: UserType }> = ({ doctor }) => {
  const imageStyle = "w-16 h-16 min-w-16 min-h-16";
  return (
    <div className="bg-white rounded-xl p-4 w-full flex items-start gap-4 border border-gray-100">
      {/* Doctor's profile image section */}
      <div className="relative flex-shrink-0">
        <div className="rounded-full overflow-hidden bg-blue-50">
          <ImageComponent
            imageUrl=""
            imageStyle={imageStyle}
            altAttribute={doctor.name}
          />
        </div>
        {/* Online status indicator */}
        {/* {doctor.isOnline && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
        )} */}
      </div>

      {/* Doctor's information section */}
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-stone-700">{doctor.name}</h3>
            {/* Specialties tags */}
            <div className="flex flex-wrap gap-2  mb-3">
              <span className="text-xs px-2 py-1 bg-primary_color/10 text-secondary_color rounded-full">
                {doctor.speciality}
              </span>
            </div>
            <p className="text-text_color2 text-sm mb-1">Cameroon | Yaounde</p>
          </div>
          <a href="">
            <ChevronRight className="w-8 h-8 text-secondary_color cursor-pointer hover:bg-secondary_color hover:text-white duration-200 transition-all ease-in-out bg-primary_color/10 rounded-full p-1" />
          </a>
        </div>

        {/* Rating section */}
        <div className="flex items-center gap-2 mt-3">
          <div className="flex items-center bg-orange-100 rounded-lg px-3 py-1">
            <span className="text-gray-800 font-semibold">{doctor.rating}</span>
            <Star className="w-4 h-4 text-orange-400 ml-1" />
          </div>
          <span className="text-gray-500">{doctor.num_reviews} reviews</span>
        </div>

        {/* Experience and consultation counts */}
        <div className="flex items-center gap-6 mt-2 text-gray-600">
          <div>
            <span className="text-gray-800 font-medium">
              {doctor.years_of_experience} Yrs
            </span>
            <span className="text-gray-500 text-sm"> Experience</span>
          </div>
          <div>
            <span className="text-gray-800 font-medium">800+</span>
            <span className="text-gray-500 text-sm"> Patients</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileCardLayout;
