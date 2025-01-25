"use client";

import React, { useState } from "react";

import { ProfileSection } from "./_settingsContent/ProfileSection";
import { SettingsNavigation } from "./_settingsContent/SettingsNavigation";
import { SecuritySection } from "./_settingsContent/SecuritySection";
import { NotificationsSection } from "./_settingsContent/NotificationSection";
import { FeesSection } from "./_settingsContent/FeesSection";
import { TemplatesSection } from "./_settingsContent/TemplateSection";

// Main Settings Page Component
const DoctorSettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSection />;

      case "fees":
        return <FeesSection />;
      case "templates":
        return <TemplatesSection />;
      case "notifications":
        return <NotificationsSection />;

      case "security":
        return <SecuritySection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-stone-800">Doctor Settings</h1>
          <p className="text-stone-500">
            Manage your professional profile and preferences
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

export default DoctorSettingsPage;
