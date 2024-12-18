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
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import SubmittingLoader from "@/src/components/ui/loading/SubmittingLoader";
import NoResults from "@/src/components/ui/noFound/EmptyResult";
import { InnerPageLoader } from "@/src/components/ui/loading/InnerPageLoader";

// Main component
const DoctorFinder: React.FC = () => {
  // State for handling responsive design
  const [isMobile, setIsMobile] = useState(false);
  const {
    doctors: doctorData,
    isLoading,
    handleOnselectValue,
    handleGetSpecialty,
    handlePageNumber,
    isPending,
    totalResult
  } = useGetAllDoctors();

  const { specialties, isLoadingSpecialty } = useFetchApplicationMetadata();
  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // First, let's store totalResult in state to preserve it during refetching
  const [preservedTotalResult, setPreservedTotalResult] = useState(0);

  // Update preserved total whenever totalResult has a valid value
  useEffect(() => {
    if (totalResult && totalResult > preservedTotalResult) {
      setPreservedTotalResult(totalResult);
    }
  }, [preservedTotalResult, totalResult]);
  console.log("totoal result", preservedTotalResult);
  return (
    <div className="max-w-7xl mx-auto p-2 md:p-6 rounded-md  bg-white">
      {/* Header Section */}
      <DoctorFilter handleOnselectValue={handleOnselectValue} />

      {/* Specialties Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Specialties</h2>
        </div>

        {isLoadingSpecialty && <InnerPageLoader />}

        {!isLoadingSpecialty && (
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
        )}
      </div>

      {/* Doctors Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Available Doctors : ({totalResult || 0})
          </h2>
        </div>
        {/* Shows loader on initial fetch only if not in "pending" state */}
        {isLoading && !isPending && <InnerPageLoader />}

        {/* Shows "no results" if no data and not in initial loading */}
        {doctorData.length === 0 && !isLoading && <NoResults />}

        {/* Shows the doctor grid when either */}
        {((!isLoading && !isPending) ||
          (isPending && doctorData.length !== 0)) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6">
            {doctorData.map((doctor) => (
              <DoctorCard
                key={doctor.user_id}
                doctor={doctor}
                isMobile={isMobile}
              />
            ))}
          </div>
        )}
        {!totalResult ||
          (totalResult > 10 && (
            <div className="my-6 p-4 w-full md:w-[20%]">
              <PrimaryButton
                backgroud
                color="text-white"
                onClick={handlePageNumber}
                // Optionally disable the button while loading to prevent double-clicks
                isSubmitting={isPending}
              >
                {isPending ? <SubmittingLoader /> : "See more doctors"}
              </PrimaryButton>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DoctorFinder;
