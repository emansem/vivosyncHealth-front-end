"use client";
import React from "react";
import Image from "next/image";
import { CircleCheck, Star } from "lucide-react";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { subscriptionPlans } from "@/data/demoPlansData";
import { SubscriptionPlan } from "@/src/types/general";
import { useSubscriptionPlan } from "@/src/hooks/useSubscriptionPlan";
import { patientReviews } from "@/data/demoPatientReviews";

import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import timeAgo from "@/src/helper/timeAgo";
import { PageHeading } from "@/src/components/ui/layout/CardLayout";
import DoctorMobilePublicProfile from "./_doctorPublicProfileContent/DoctorMobilePublicProfile";
import { DoctorDeskTopProfile } from "./_doctorPublicProfileContent/DoctorProfileDesktop";

function Page() {
  return (
    <div>
      <div className="hidden md:block">
        <DoctorDeskTopProfile />
      </div>
      <div className="md:hidden">
        <DoctorMobilePublicProfile />
      </div>
    </div>
  );
}

export default Page;
