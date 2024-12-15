"use client";

import { useState } from "react";
import { LanguageSection } from "./_updateProfile/LanguageSection";
import { MedicalProfileSection } from "./_updateProfile/MedicalProfileSection";
import { NotificationsSection } from "./_updateProfile/NotificationSection";
import { PaymentMethodsSection } from "./_updateProfile/PaymentMethodSection";
import { PersonalInfoSection } from "./_updateProfile/PersonalProfileDetails";
import { SecuritySection } from "./_updateProfile/SecuritySection";
import { SettingsNavigation } from "./_updateProfile/SettngsNavigation";

// Main Settings Page Component
const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("personal");

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return <PersonalInfoSection />;
      case "medical":
        return <MedicalProfileSection />;
      case "security":
        return <SecuritySection />;
      case "notifications":
        return <NotificationsSection />;
      case "payment":
        return <PaymentMethodsSection />;
      case "language":
        return <LanguageSection />;
      default:
        return <PersonalInfoSection />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-stone-800">Settings</h1>
          <p className="text-stone-500">
            Manage your account preferences and settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <div className="sticky top-6">
              <SettingsNavigation
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>
          </div>
          <div className="lg:col-span-9">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
