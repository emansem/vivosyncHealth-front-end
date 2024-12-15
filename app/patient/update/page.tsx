"use client";

import React, { useState } from "react";
import {
  User,
  Lock,
  Bell,
  CreditCard,
  Heart,
  Languages,
  ChevronRight,
  X,
  Camera,
  Shield,
  CheckCircle2
} from "lucide-react";
import { CardLayout } from "@/src/components/ui/layout/CardLayout";
import ImageComponent from "@/src/components/utils/Image";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";

const colors = {
  primary: "#269c65",
  secondary: "#e8f5e9",
  stone: {
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917"
  }
};

// Navigation Section for Settings
const SettingsNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "personal", label: "Personal Information", icon: User },
    { id: "medical", label: "Medical Profile", icon: Heart },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
    { id: "language", label: "Language & Region", icon: Languages }
  ];

  return (
    <div className="bg-white rounded-3xl p-4">
      <nav>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center justify-between p-4 rounded-xl text-left transition-colors ${
              activeTab === tab.id ? "bg-secondary" : "hover:bg-stone-50"
            }`}
            style={{
              color: activeTab === tab.id ? colors.primary : colors.stone[700]
            }}
          >
            <div className="flex items-center gap-3">
              <tab.icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </div>
            <ChevronRight className="w-5 h-5" />
          </button>
        ))}
      </nav>
    </div>
  );
};

// Personal Information Section
const PersonalInfoSection = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white rounded-3xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-stone-800">
          Personal Information
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-sm font-medium"
          style={{ color: colors.primary }}
        >
          {isEditing ? "Save Changes" : "Edit"}
        </button>
      </div>

      <div className="space-y-6">
        {/* Profile Photo */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <ImageComponent
              imageStyle="w-24 h-24 rounded-full"
              altAttribute="Profile"
              imageUrl=""
            />
            <button
              className="absolute bottom-0 right-0 p-2 rounded-full"
              style={{ backgroundColor: colors.primary }}
            >
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          <div>
            <h3 className="font-medium text-stone-800">Profile Photo</h3>
            <p className="text-sm text-stone-500">
              JPG, GIF or PNG. Max size 2MB
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="John Doe"
              disabled={!isEditing}
              className="w-full p-3 rounded-xl border border-stone-200 disabled:bg-stone-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              defaultValue="john.doe@example.com"
              disabled={!isEditing}
              className="w-full p-3 rounded-xl border border-stone-200 disabled:bg-stone-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              defaultValue="+1 (555) 000-0000"
              disabled={!isEditing}
              className="w-full p-3 rounded-xl border border-stone-200 disabled:bg-stone-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              defaultValue="1990-01-01"
              disabled={!isEditing}
              className="w-full p-3 rounded-xl border border-stone-200 disabled:bg-stone-50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Address
          </label>
          <textarea
            rows={3}
            defaultValue="123 Medical Plaza, Suite 100, Health City, HC 12345"
            disabled={!isEditing}
            className="w-full p-3 rounded-xl border border-stone-200 disabled:bg-stone-50"
          />
        </div>
      </div>
    </div>
  );
};

// Medical Profile Section
const MedicalProfileSection = () => {
  return (
    <div className="bg-white rounded-3xl p-6">
      <h2 className="text-xl font-bold text-stone-800 mb-6">Medical Profile</h2>

      <div className="space-y-6">
        {/* Emergency Contact */}
        <div className="p-4 rounded-xl bg-stone-50">
          <h3 className="font-medium text-stone-800 mb-4">Emergency Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Contact Name
              </label>
              <input
                type="text"
                defaultValue="Jane Doe"
                className="w-full p-3 rounded-xl border border-stone-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Relationship
              </label>
              <input
                type="text"
                defaultValue="Spouse"
                className="w-full p-3 rounded-xl border border-stone-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                defaultValue="+1 (555) 000-0001"
                className="w-full p-3 rounded-xl border border-stone-200"
              />
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div>
          <h3 className="font-medium text-stone-800 mb-4">
            Medical Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Blood Type
              </label>
              <select className="w-full p-3 rounded-xl border border-stone-200">
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Allergies
              </label>
              <input
                type="text"
                placeholder="Enter any allergies"
                className="w-full p-3 rounded-xl border border-stone-200"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Current Medications
              </label>
              <textarea
                rows={3}
                placeholder="List your current medications"
                className="w-full p-3 rounded-xl border border-stone-200"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <PrimaryButton backgroud color="text-white">
            Save Medical Profile
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// Security Section
const SecuritySection = () => {
  return (
    <div className="bg-white rounded-3xl p-6">
      <h2 className="text-xl font-bold text-stone-800 mb-6">
        Security Settings
      </h2>

      <div className="space-y-6">
        {/* Password Change */}
        <div className="p-4 rounded-xl bg-stone-50">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-stone-800">Password</h3>
              <p className="text-sm text-stone-500 mt-1">
                Last changed 3 months ago
              </p>
            </div>
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ color: colors.primary }}
            >
              Change Password
            </button>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="p-4 rounded-xl bg-stone-50">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-stone-800">
                Two-Factor Authentication
              </h3>
              <p className="text-sm text-stone-500 mt-1">
                Add an extra layer of security to your account
              </p>
            </div>
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ color: colors.primary }}
            >
              Enable
            </button>
          </div>
        </div>

        {/* Active Sessions */}
        <div>
          <h3 className="font-medium text-stone-800 mb-4">Active Sessions</h3>
          <div className="space-y-3">
            {[
              {
                device: "MacBook Pro",
                location: "New York, USA",
                current: true
              },
              { device: "iPhone 12", location: "New York, USA", current: false }
            ].map((session, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-4 rounded-xl bg-stone-50"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-stone-800">
                      {session.device}
                    </p>
                    {session.current && (
                      <span
                        className="text-xs bg-secondary px-2 py-1 rounded-full font-medium"
                        style={{ color: colors.primary }}
                      >
                        Current Device
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-stone-500 mt-1">
                    {session.location}
                  </p>
                </div>
                {!session.current && (
                  <button className="text-sm font-medium text-red-600">
                    End Session
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Notifications Section
const NotificationsSection = () => {
  return (
    <div className="bg-white rounded-3xl p-6">
      <h2 className="text-xl font-bold text-stone-800 mb-6">
        Notification Preferences
      </h2>

      <div className="space-y-6">
        {[
          {
            title: "Appointment Reminders",
            description: "Get notified about upcoming appointments"
          },
          {
            title: "Medication Reminders",
            description: "Receive alerts for medication schedules"
          },
          {
            title: "Test Results",
            description: "Be notified when new test results are available"
          },
          {
            title: "Health Tips",
            description: "Receive personalized health tips and advice"
          }
        ].map((item, i) => (
          <div
            key={i}
            className="flex justify-between items-start p-4 rounded-xl bg-stone-50"
          >
            <div>
              <h3 className="font-medium text-stone-800">{item.title}</h3>
              <p className="text-sm text-stone-500 mt-1">{item.description}</p>
            </div>
            <div
              className="w-12 h-6 rounded-full relative cursor-pointer bg-secondary"
              style={{ backgroundColor: colors.primary }}
            >
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Payment Methods Section (Continued)
const PaymentMethodsSection = () => {
  return (
    <div className="bg-white rounded-3xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-stone-800">Payment Methods</h2>
        <button
          className="px-4 py-2 rounded-lg text-sm font-medium"
          style={{ color: colors.primary }}
        >
          Add New
        </button>
      </div>

      <div className="space-y-4">
        {[
          { type: "Visa", last4: "4242", expiry: "12/24" },
          { type: "Mastercard", last4: "8888", expiry: "09/25" }
        ].map((card, i) => (
          <div
            key={i}
            className="flex justify-between items-center p-4 rounded-xl bg-stone-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center">
                {card.type}
              </div>
              <div>
                <p className="font-medium text-stone-800">
                  {card.type} ending in {card.last4}
                </p>
                <p className="text-sm text-stone-500">Expires {card.expiry}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="text-sm font-medium"
                style={{ color: colors.primary }}
              >
                Edit
              </button>
              <button className="text-sm font-medium text-red-600">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Language & Region Section
const LanguageSection = () => {
  return (
    <div className="bg-white rounded-3xl p-6">
      <h2 className="text-xl font-bold text-stone-800 mb-6">
        Language & Region
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Language
          </label>
          <select className="w-full p-3 rounded-xl border border-stone-200">
            <option>English (US)</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
            <option>Arabic</option>
          </select>
          <p className="mt-2 text-sm text-stone-500">
            Choose your preferred language for the interface
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Time Zone
          </label>
          <select className="w-full p-3 rounded-xl border border-stone-200">
            <option>Eastern Time (UTC-5)</option>
            <option>Pacific Time (UTC-8)</option>
            <option>Central European Time (UTC+1)</option>
            <option>Japan Standard Time (UTC+9)</option>
          </select>
          <p className="mt-2 text-sm text-stone-500">
            Your time zone will be used for notifications and scheduling
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Date Format
          </label>
          <select className="w-full p-3 rounded-xl border border-stone-200">
            <option>MM/DD/YYYY</option>
            <option>DD/MM/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>
        </div>

        <div className="flex justify-end">
          <PrimaryButton backgroud color="text-white">
            Save Preferences
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

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
