"use client";

import { ReviewSection } from "./_doctorPublicProfileContent/ReviewSection";
import PricingPlanSection from "./_doctorPublicProfileContent/PricingPlanSection";
import {
  LocationGrid,
  ProfileSection
} from "./_doctorPublicProfileContent/ShareSectionUx";
import { useParams } from "next/navigation";
import { useGetDoctorData } from "@/src/hooks/patient/useDoctorData";
import { UserType } from "@/src/hooks/serviceHook";
import { SubscriptionPlanDataType } from "@/app/lib/types";

// Design tokens
export const THEME = {
  colors: {
    primary: "#269c65",
    secondary: "#1a4d8c",
    accent: "#fbbf24",
    success: "#22c55e",
    background: "#f9fafb",
    surfacePrimary: "#ffffff",
    surfaceSecondary: "#f3f4f6",
    textPrimary: "#111827",
    textSecondary: "#4b5563"
  },
  spacing: {
    base: "1rem",
    tight: "0.5rem",
    loose: "1.5rem",
    wide: "2rem"
  },
  borderRadius: {
    base: "0.75rem",
    full: "9999px"
  },
  transitions: {
    base: "all 0.3s ease"
  }
};

// Data structure for provider info
export const doctorInfo = {
  personalInfo: {
    name: "Dr. Eman sem",
    tagline: "Making Clients Reimagine Their Online Presence",
    rating: 5.0,
    reviews: 123,
    experience: 16
  },
  locationInfo: {
    country: "Cameroon",
    city: "Yaoundé",
    specialty: "Integrative Medicine",
    languages: ["English", "French", "German"],
    availability: ["Mon", "Tue", "Wed", "Sat"]
  },
  background: `My expertise lies in integrative medicine, where I blend traditional medical practices with holistic approaches to ensure comprehensive care. Trained at Johns Hopkins, with further specialization in neurology and functional medicine at Harvard. I've seen first-hand the limitations of conventional treatments. This led me to explore and integrate alternative therapies like acupuncture, dietary therapy, and mindfulness, tailoring treatments to not only heal the body but also nurture the mind and spirit.`
};

// Subscription plan configurations
export const subscriptionPlans = [
  {
    id: "basic",
    name: "Basic",
    price: 2000,
    discount: "20%",
    features: [
      "24/7 Customer Support",
      "Up to 50 Patient Records",
      "Basic Appointment Scheduling",
      "Email Notifications",
      "Patient History Access"
    ]
  },
  {
    id: "standard",
    name: "Standard",
    price: 3000,
    discount: "25%",
    popular: true,
    features: [
      "All Basic features",
      "Up to 200 Patient Records",
      "Advanced Scheduling",
      "Priority Support",
      "Analytics Dashboard"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    price: 4000,
    discount: "30%",
    features: [
      "All Standard features",
      "Unlimited Records",
      "Custom Integration",
      "API Access",
      "Dedicated Support"
    ]
  }
];

export default function DoctorProfile() {
  const { "doctor-id": doctorId } = useParams();
  const { doctor, planDetails, isLoading } = useGetDoctorData(
    doctorId as string
  );
  if (isLoading) return <div>Loading..</div>;
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Layout */}
      <div className="max-w-7xl mx-auto px-4 py-8 lg:flex gap-8">
        {/* Main Content Column */}
        <div className="flex-1 space-y-6">
          {/* Profile Card */}
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <ProfileSection doctor={doctor as UserType} />
            <LocationGrid doctor={doctor as UserType} />
          </section>

          {/* About Section */}
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <p className="text-gray-600 leading-relaxed">{doctor?.about}</p>
          </section>

          {/* Reviews Section */}
          <ReviewSection />
        </div>

        {/* Pricing Column */}
        {planDetails?.length !== 0 && (
          <PricingPlanSection
            plans={planDetails as SubscriptionPlanDataType[]}
          />
        )}
      </div>
    </div>
  );
}
