"use client";

import React, { useState } from "react";
import {
  User,
  Clock,
  Calendar,
  DollarSign,
  Bell,
  MessageSquare,
  Shield,
  Award,
  Settings,
  Plus,
  X,
  Camera,
  AlertCircle,
  ChevronRight
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

// Navigation tabs for doctor settings
const SettingsNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "profile", label: "Professional Profile", icon: User },
    { id: "schedule", label: "Schedule & Availability", icon: Calendar },
    { id: "fees", label: "Fees & Discounts", icon: DollarSign },
    { id: "templates", label: "Message Templates", icon: MessageSquare },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "credentials", label: "Credentials", icon: Award },
    { id: "security", label: "Security", icon: Shield }
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

// Schedule Management Section
const ScheduleSection = () => {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  const [workingDays, setWorkingDays] = useState({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: false,
    Sunday: false
  });
  const [timeSlots, setTimeSlots] = useState({
    Monday: {
      start: "09:00",
      end: "17:00",
      breakStart: "13:00",
      breakEnd: "14:00"
    },
    Tuesday: {
      start: "09:00",
      end: "17:00",
      breakStart: "13:00",
      breakEnd: "14:00"
    },
    Wednesday: {
      start: "09:00",
      end: "17:00",
      breakStart: "13:00",
      breakEnd: "14:00"
    },
    Thursday: {
      start: "09:00",
      end: "17:00",
      breakStart: "13:00",
      breakEnd: "14:00"
    },
    Friday: {
      start: "09:00",
      end: "17:00",
      breakStart: "13:00",
      breakEnd: "14:00"
    },
    Saturday: { start: "09:00", end: "13:00", breakStart: "", breakEnd: "" },
    Sunday: { start: "", end: "", breakStart: "", breakEnd: "" }
  });

  return (
    <div className="bg-white rounded-3xl p-6">
      <h2 className="text-xl font-bold text-stone-800 mb-6">
        Schedule & Availability
      </h2>

      <div className="space-y-6">
        {/* Regular Schedule */}
        <div>
          <h3 className="font-medium text-stone-800 mb-4">
            Regular Working Hours
          </h3>
          <div className="space-y-4">
            {daysOfWeek.map((day) => (
              <div key={day} className="p-4 rounded-xl bg-stone-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={workingDays[day]}
                      onChange={(e) =>
                        setWorkingDays({
                          ...workingDays,
                          [day]: e.target.checked
                        })
                      }
                      className="rounded border-stone-300 text-primary"
                    />
                    <span className="font-medium text-stone-800">{day}</span>
                  </div>
                </div>

                {workingDays[day] && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-stone-700">
                        Working Hours
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="time"
                          value={timeSlots[day].start}
                          onChange={(e) =>
                            setTimeSlots({
                              ...timeSlots,
                              [day]: {
                                ...timeSlots[day],
                                start: e.target.value
                              }
                            })
                          }
                          className="p-2 rounded-lg border border-stone-200"
                        />
                        <span className="text-stone-500">to</span>
                        <input
                          type="time"
                          value={timeSlots[day].end}
                          onChange={(e) =>
                            setTimeSlots({
                              ...timeSlots,
                              [day]: { ...timeSlots[day], end: e.target.value }
                            })
                          }
                          className="p-2 rounded-lg border border-stone-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-stone-700">
                        Break Time
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="time"
                          value={timeSlots[day].breakStart}
                          onChange={(e) =>
                            setTimeSlots({
                              ...timeSlots,
                              [day]: {
                                ...timeSlots[day],
                                breakStart: e.target.value
                              }
                            })
                          }
                          className="p-2 rounded-lg border border-stone-200"
                        />
                        <span className="text-stone-500">to</span>
                        <input
                          type="time"
                          value={timeSlots[day].breakEnd}
                          onChange={(e) =>
                            setTimeSlots({
                              ...timeSlots,
                              [day]: {
                                ...timeSlots[day],
                                breakEnd: e.target.value
                              }
                            })
                          }
                          className="p-2 rounded-lg border border-stone-200"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Hours Section */}
        <div
          className="p-4 rounded-xl bg-stone-50 border-l-4"
          style={{ borderColor: colors.primary }}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-stone-800">
                Emergency Availability
              </h3>
              <p className="text-sm text-stone-500 mt-1">
                Set your availability for emergency consultations outside
                regular hours
              </p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="rounded border-stone-300 text-primary"
              />
              <span className="text-sm font-medium text-stone-700">
                Available for emergencies
              </span>
            </div>
          </div>

          <div className="mt-4 p-4 rounded-lg bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Emergency Fee (Additional)
                </label>
                <div className="flex items-center">
                  <span className="px-3 py-2 bg-stone-100 border border-stone-200 rounded-l-lg text-stone-600">
                    $
                  </span>
                  <input
                    type="number"
                    placeholder="100"
                    className="flex-1 p-2 border border-l-0 border-stone-200 rounded-r-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Response Time
                </label>
                <select className="w-full p-2 border border-stone-200 rounded-lg">
                  <option>Within 15 minutes</option>
                  <option>Within 30 minutes</option>
                  <option>Within 1 hour</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Duration */}
        <div>
          <h3 className="font-medium text-stone-800 mb-4">
            Appointment Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Default Appointment Duration
              </label>
              <select className="w-full p-3 rounded-xl border border-stone-200">
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Buffer Time Between Appointments
              </label>
              <select className="w-full p-3 rounded-xl border border-stone-200">
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
                <option value="20">20 minutes</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <PrimaryButton backgroud color="text-white">
            Save Schedule
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// Fees and Discounts Section
const FeesSection = () => {
  return (
    <div className="bg-white rounded-3xl p-6">
      <h2 className="text-xl font-bold text-stone-800 mb-6">
        Fees & Discounts
      </h2>

      <div className="space-y-6">
        {/* Regular Consultation Fees */}
        <div className="p-4 rounded-xl bg-stone-50">
          <h3 className="font-medium text-stone-800 mb-4">Consultation Fees</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Video Consultation Fee
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2 bg-stone-100 border border-stone-200 rounded-l-lg text-stone-600">
                  $
                </span>
                <input
                  type="number"
                  placeholder="100"
                  className="flex-1 p-2 border border-l-0 border-stone-200 rounded-r-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                In-Person Consultation Fee
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2 bg-stone-100 border border-stone-200 rounded-l-lg text-stone-600">
                  $
                </span>
                <input
                  type="number"
                  placeholder="150"
                  className="flex-1 p-2 border border-l-0 border-stone-200 rounded-r-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Discount Settings */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-stone-800">Discount Programs</h3>
            <button
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: colors.primary }}
            >
              <Plus className="w-4 h-4" />
              Add Discount
            </button>
          </div>

          <div className="space-y-4">
            {[
              { name: "Senior Citizens", discount: "20%", status: "active" },
              { name: "Children under 12", discount: "15%", status: "active" },
              {
                name: "New Patient Special",
                discount: "10%",
                status: "inactive"
              }
            ].map((discount, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-stone-50 flex justify-between items-center"
              >
                <div>
                  <h4 className="font-medium text-stone-800">
                    {discount.name}
                  </h4>
                  <p className="text-sm text-stone-500">
                    {discount.discount} off regular fee
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      discount.status === "active"
                        ? "bg-secondary text-primary"
                        : "bg-stone-200 text-stone-600"
                    }`}
                  >
                    {discount.status}
                  </div>
                  <button className="text-stone-400 hover:text-stone-600">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Package Rates */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-stone-800">Package Rates</h3>
            <button
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: colors.primary }}
            >
              <Plus className="w-4 h-4" />
              Add Package
            </button>
          </div>

          <div className="space-y-4">
            {[
              {
                name: "3 Sessions Package",
                price: "$250",
                savings: "Save 15%"
              },
              { name: "5 Sessions Package", price: "$400", savings: "Save 20%" }
            ].map((package_, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-stone-50 flex justify-between items-center"
              >
                <div>
                  <h4 className="font-medium text-stone-800">
                    {package_.name}
                  </h4>
                  <p className="text-sm text-stone-500">
                    {package_.price} - {package_.savings}
                  </p>
                </div>
                <button className="text-stone-400 hover:text-stone-600">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <PrimaryButton backgroud color="text-white">
            Save Fee Settings
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// Message Templates Section
const TemplatesSection = () => {
  return (
    <div className="bg-white rounded-3xl p-6">
      <h2 className="text-xl font-bold text-stone-800 mb-6">
        Message Templates
      </h2>

      <div className="space-y-6">
        {/* Appointment Templates */}
        <div>
          <h3 className="font-medium text-stone-800 mb-4">
            Appointment Messages
          </h3>
          <div className="space-y-4">
            {[
              {
                title: "Appointment Confirmation",
                template:
                  "Dear [Patient Name], Your appointment is confirmed for [Date] at [Time]."
              },
              {
                title: "Appointment Reminder",
                template:
                  "Reminder: You have an appointment tomorrow at [Time]."
              },
              {
                title: "Follow-up Message",
                template:
                  "Thank you for your visit. Here are your follow-up instructions: [Instructions]"
              }
            ].map((template, i) => (
              <div key={i} className="p-4 rounded-xl bg-stone-50">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-stone-800">
                    {template.title}
                  </h4>
                  <button
                    className="text-sm font-medium"
                    style={{ color: colors.primary }}
                  >
                    Edit
                  </button>
                </div>
                <textarea
                  defaultValue={template.template}
                  rows={3}
                  className="w-full p-3 rounded-lg border border-stone-200 bg-white"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Templates */}
        <div>
          <h3 className="font-medium text-stone-800 mb-4">
            Newsletter Templates
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-stone-50">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium text-stone-800">
                    Monthly Health Tips
                  </h4>
                  <p className="text-sm text-stone-500">
                    Sent on the 1st of every month
                  </p>
                </div>
                <button
                  className="text-sm font-medium"
                  style={{ color: colors.primary }}
                >
                  Edit
                </button>
              </div>
              <textarea
                defaultValue="Dear [Patient Name], Here are this month's health tips..."
                rows={4}
                className="w-full p-3 rounded-lg border border-stone-200 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Custom Templates */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-stone-800">Custom Templates</h3>
            <button
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: colors.primary }}
            >
              <Plus className="w-4 h-4" />
              Add Template
            </button>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-dashed border-stone-300">
            <p className="text-center text-stone-500">
              Create custom message templates for specific purposes
            </p>
          </div>
        </div>

        {/* Available Variables */}
        <div className="p-4 rounded-xl bg-stone-50">
          <h3 className="font-medium text-stone-800 mb-2">
            Available Variables
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "[Patient Name]",
              "[Date]",
              "[Time]",
              "[Doctor Name]",
              "[Clinic Name]",
              "[Instructions]"
            ].map((variable, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded-lg bg-white border border-stone-200 text-sm text-stone-600"
              >
                {variable}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <PrimaryButton backgroud color="text-white">
            Save Templates
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

// Professional Profile Section
const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="bg-white rounded-3xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-stone-800">
          Professional Profile
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
              Professional headshot recommended
            </p>
          </div>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              defaultValue="Dr. John Smith"
              disabled={!isEditing}
              className="w-full p-3 rounded-xl border border-stone-200 disabled:bg-stone-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Specialization
            </label>
            <input
              type="text"
              defaultValue="Cardiologist"
              disabled={!isEditing}
              className="w-full p-3 rounded-xl border border-stone-200 disabled:bg-stone-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              License Number
            </label>
            <input
              type="text"
              defaultValue="MD12345"
              disabled={!isEditing}
              className="w-full p-3 rounded-xl border border-stone-200 disabled:bg-stone-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Years of Experience
            </label>
            <input
              type="number"
              defaultValue="15"
              disabled={!isEditing}
              className="w-full p-3 rounded-xl border border-stone-200 disabled:bg-stone-50"
            />
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="font-medium text-stone-800 mb-4">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Email
              </label>
              <input
                type="email"
                defaultValue="dr.smith@example.com"
                disabled={!isEditing}
                className="w-full p-3 rounded-xl border border-stone-200 disabled:bg-stone-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                defaultValue="+1 (555) 123-4567"
                disabled={!isEditing}
                className="w-full p-3 rounded-xl border border-stone-200 disabled:bg-stone-50"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Office Address
              </label>
              <textarea
                rows={3}
                defaultValue="123 Medical Center Drive, Suite 100, City, State 12345"
                disabled={!isEditing}
                className="w-full p-3 rounded-xl border border-stone-200 disabled:bg-stone-50"
              />
            </div>
          </div>
        </div>

        {/* Professional Bio */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Professional Biography
          </label>
          <textarea
            rows={6}
            defaultValue="Board-certified cardiologist with over 15 years of experience..."
            disabled={!isEditing}
            className="w-full p-3 rounded-xl border border-stone-200 disabled:bg-stone-50"
          />
        </div>

        {/* Languages */}
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-2">
            Languages Spoken
          </label>
          <div className="flex flex-wrap gap-2">
            {["English", "Spanish", "French"].map((lang, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-sm bg-stone-100 text-stone-600"
              >
                {lang}
              </span>
            ))}
            {isEditing && (
              <button className="px-3 py-1 rounded-full text-sm border border-dashed border-stone-300 text-stone-500">
                + Add Language
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Settings Page Component
const DoctorSettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSection />;
      case "schedule":
        return <ScheduleSection />;
      case "fees":
        return <FeesSection />;
      case "templates":
        return <TemplatesSection />;
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
