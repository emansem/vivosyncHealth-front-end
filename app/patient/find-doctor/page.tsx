"use client";
import React, { useState, useEffect } from "react";
import { useGetAllDoctors } from "@/src/hooks/patient/useDoctorData";
import { SpecialtyCard } from "./_findDoctorContents/SpecialityCard";
import { DoctorCard } from "./_findDoctorContents/DoctorCard";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import DoctorFilter from "./_findDoctorContents/DoctorFilter";
import { useFetchApplicationMetadata } from "@/src/hooks/useFetchGeneralData";

// Main component
const DoctorFinder: React.FC = () => {
  // State for handling responsive design
  const [isMobile, setIsMobile] = useState(false);
  const {
    doctors: doctorData,
    handleOnselectValue,
    handleGetSpecialty
  } = useGetAllDoctors();

  const { specialties } = useFetchApplicationMetadata();
  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-2 md:p-6 rounded-md  bg-white">
      {/* Header Section */}
      <DoctorFilter handleOnselectValue={handleOnselectValue} />

      {/* Specialties Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Specialties</h2>
        </div>

        <div className="w-full">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={3}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false
            }}
            loop={true}
            pagination={{
              clickable: true,
              dynamicBullets: true
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 10
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 10
              }
            }}
          >
            {specialties?.map((specialty) => (
              <SwiperSlide key={specialty.id}>
                <SpecialtyCard
                  handleGetSpecialty={handleGetSpecialty}
                  specialty={specialty}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Doctors Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Available Doctors
          </h2>
        </div>
        {/* Responsive grid: 1 column on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6">
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
