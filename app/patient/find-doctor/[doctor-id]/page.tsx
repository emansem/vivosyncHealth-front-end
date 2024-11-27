"use client";

import React, { useState } from "react";
import {
  Star,
  Check,
  Globe2,
  Calendar,
  Languages,
  Stethoscope,
  Building2,
  Clock,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";

// Design tokens
const THEME = {
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
const doctorInfo = {
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
const subscriptionPlans = [
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
  // State management
  const [selectedPlan, setSelectedPlan] = useState(subscriptionPlans[0].id);
  const [isLoading, setIsLoading] = useState(false);

  // Handlers
  const handleSubscribe = async () => {
    setIsLoading(true);
    // TODO: Implement subscription logic
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  // Shared UI Components
  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-lg bg-green-50">
        <Icon className="w-5 h-5" style={{ color: THEME.colors.primary }} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );

  const ProfileSection = () => (
    <div className="flex flex-col md:flex-row items-start gap-6">
      <div className="relative w-24 h-24">
        <img
          src="/api/placeholder/96/96"
          alt={doctorInfo.personalInfo.name}
          className="rounded-full object-cover w-full h-full"
        />
        <div className="absolute -bottom-2 -right-2 bg-green-50 p-1.5 rounded-full">
          <Award className="w-5 h-5" style={{ color: THEME.colors.primary }} />
        </div>
      </div>
      <div className="flex-1">
        <h1 className="text-2xl font-semibold text-gray-900">
          {doctorInfo.personalInfo.name}
        </h1>
        <p className="text-gray-600 mt-1">{doctorInfo.personalInfo.tagline}</p>
        <div className="flex flex-wrap items-center gap-4 mt-3">
          <div className="flex items-center">
            <Star
              className="w-5 h-5"
              style={{ color: THEME.colors.accent }}
              fill="currentColor"
            />
            <span className="ml-2 font-medium">
              {doctorInfo.personalInfo.rating}
            </span>
            <span className="text-gray-500 ml-1">
              ({doctorInfo.personalInfo.reviews})
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-gray-400" />
            <span className="ml-2 text-gray-600">
              {doctorInfo.personalInfo.experience} Years Experience
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const LocationGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <InfoItem
        icon={Globe2}
        label="Country"
        value={doctorInfo.locationInfo.country}
      />
      <InfoItem
        icon={Building2}
        label="City"
        value={doctorInfo.locationInfo.city}
      />
      <InfoItem
        icon={Stethoscope}
        label="Specialty"
        value={doctorInfo.locationInfo.specialty}
      />
      <InfoItem
        icon={Languages}
        label="Languages"
        value={doctorInfo.locationInfo.languages.join(", ")}
      />
      <InfoItem
        icon={Calendar}
        label="Available"
        value={doctorInfo.locationInfo.availability.join(", ")}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Layout */}
      <div className="max-w-7xl mx-auto px-4 py-8 lg:flex gap-8">
        {/* Main Content Column */}
        <div className="flex-1 space-y-6">
          {/* Profile Card */}
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <ProfileSection />
            <LocationGrid />
          </section>

          {/* About Section */}
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">About</h2>
            <p className="text-gray-600 leading-relaxed">
              {doctorInfo.background}
            </p>
          </section>

          {/* Reviews Section */}
          <section className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Patient Reviews</h2>
              <button className="text-primary font-medium hover:underline">
                View all
              </button>
            </div>
            <div className="space-y-6">
              {/* TODO: Map through actual reviews */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                  <span
                    className="font-medium"
                    style={{ color: THEME.colors.primary }}
                  >
                    ES
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="font-medium">Eman sem</span>
                    <span className="text-sm text-gray-500">Just now</span>
                  </div>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4"
                        style={{ color: THEME.colors.accent }}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-gray-600">
                    Dr. Anderson was incredibly thorough during my annual
                    check-up. She took the time to explain all my test results
                    in detail and answered every question...
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Pricing Column */}
        <div className="lg:w-[400px] mt-6 lg:mt-0">
          <div className="bg-white rounded-xl p-6 shadow-sm sticky top-8">
            <div className="flex gap-2 p-1 bg-gray-100 rounded-lg mb-6">
              {subscriptionPlans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all
                    ${
                      selectedPlan === plan.id
                        ? "bg-white text-primary shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  {plan.name}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {subscriptionPlans.map(
                (plan) =>
                  plan.id === selectedPlan && (
                    <motion.div
                      key={plan.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-2xl font-semibold">
                            {plan.name}
                          </h3>
                          <p className="text-green-600">
                            save up to {plan.discount}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold">
                            ${plan.price}
                          </div>
                          <div className="text-gray-500">/month</div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {plan.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-3">
                            <Check
                              className="w-5 h-5 shrink-0"
                              style={{ color: THEME.colors.success }}
                            />
                            <span className="text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <PrimaryButton
                        onClick={handleSubscribe}
                        backgroud
                        color="text-white"
                      >
                        Subscribe Now
                      </PrimaryButton>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
