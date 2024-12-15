"use client";

import React, { useState } from "react";
import {
  User,
  Calendar,
  DollarSign,
  MessageSquare,
  Bell,
  Award,
  Shield,
  ChevronRight,
  Camera,
  X
} from "lucide-react";
import { CardLayout } from "@/src/components/ui/layout/CardLayout";
import ImageComponent from "@/src/components/utils/Image";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";

// Colors constants
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

// Navigation Types
type TabId =
  | "profile"
  | "schedule"
  | "fees"
  | "templates"
  | "notifications"
  | "certificates"
  | "security";

interface NavigationTab {
  id: TabId;
  label: string;
  icon: React.ElementType;
}

// Profile Types
interface DoctorProfile {
  id: string;
  photoUrl: string;
  personalInfo: PersonalInfo;
  professionalInfo: ProfessionalInfo;
  languages: Language[];
  contactInfo: ContactInfo;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: "male" | "female" | "other";
}

interface ProfessionalInfo {
  title: string;
  specialization: string;
  licenseNumber: string;
  experience: number;
  qualifications: string[];
  biography: string;
}

interface Language {
  id: string;
  name: string;
  proficiency: "basic" | "intermediate" | "fluent" | "native";
}

interface ContactInfo {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

// Schedule Types
interface WeeklySchedule {
  [key: string]: DaySchedule;
}

interface DaySchedule {
  isWorking: boolean;
  shifts: TimeSlot[];
  breaks: TimeSlot[];
}

interface TimeSlot {
  start: string;
  end: string;
}

interface EmergencyAvailability {
  isAvailable: boolean;
  responseTime: "15" | "30" | "60";
  additionalFee: number;
}

interface AppointmentSettings {
  defaultDuration: 15 | 30 | 45 | 60;
  bufferTime: 5 | 10 | 15 | 20;
  maxDailyAppointments: number;
}

// Fees Types
interface ConsultationFees {
  videoConsultation: Fee;
  inPerson: Fee;
  emergency: Fee;
  followUp: Fee;
}

interface Fee {
  amount: number;
  currency: string;
  description?: string;
}

interface Discount {
  id: string;
  name: string;
  type: "percentage" | "fixed";
  value: number;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  applicableTo: ("video" | "inPerson" | "emergency" | "followUp")[];
}

interface Package {
  id: string;
  name: string;
  sessions: number;
  validityDays: number;
  price: number;
  savings: number;
  isActive: boolean;
}

// Message Template Types
interface MessageTemplate {
  id: string;
  title: string;
  content: string;
  type: "appointment" | "reminder" | "followUp" | "prescription" | "custom";
  variables: string[];
  isActive: boolean;
}

// Notification Types
interface NotificationPreferences {
  appointments: NotificationChannel;
  reminders: NotificationChannel;
  payments: NotificationChannel;
  reviews: NotificationChannel;
  emergencies: NotificationChannel;
}

interface NotificationChannel {
  email: boolean;
  sms: boolean;
  push: boolean;
  whatsapp: boolean;
}

// Certificate Types
interface Certificate {
  id: string;
  name: string;
  issuedBy: string;
  issuedDate: string;
  expiryDate?: string;
  documentUrl: string;
  verificationUrl?: string;
  type: "degree" | "license" | "certification" | "award";
  status: "active" | "expired" | "pending";
}

// Security Types
interface SecuritySettings {
  password: {
    lastChanged: string;
    requiresChange: boolean;
  };
  twoFactorAuth: {
    isEnabled: boolean;
    method: "app" | "sms" | "email";
    lastVerified: string;
  };
  sessions: Session[];
  loginHistory: LoginRecord[];
}

interface Session {
  id: string;
  device: string;
  browser: string;
  location: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
}

interface LoginRecord {
  id: string;
  timestamp: string;
  status: "success" | "failed";
  ip: string;
  location: string;
  device: string;
}

// File Upload Types
interface FileUpload {
  file: File;
  progress: number;
  error?: string;
  uploadedUrl?: string;
}

// Response Types for API Integration
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

// Form States
interface FormState {
  isEditing: boolean;
  isSubmitting: boolean;
  hasChanges: boolean;
  error?: string;
}

// Export all types
export type {
  TabId,
  NavigationTab,
  DoctorProfile,
  PersonalInfo,
  ProfessionalInfo,
  Language,
  ContactInfo,
  WeeklySchedule,
  DaySchedule,
  TimeSlot,
  EmergencyAvailability,
  AppointmentSettings,
  ConsultationFees,
  Fee,
  Discount,
  Package,
  MessageTemplate,
  NotificationPreferences,
  NotificationChannel,
  Certificate,
  SecuritySettings,
  Session,
  LoginRecord,
  FileUpload,
  ApiResponse,
  FormState
};

("use client");

import React, { useState, useRef } from "react";
import {
  User,
  Calendar,
  DollarSign,
  MessageSquare,
  Bell,
  Award,
  Shield,
  ChevronRight,
  Camera,
  X,
  Plus,
  Check
} from "lucide-react";
import { CardLayout } from "@/src/components/ui/layout/CardLayout";
import ImageComponent from "@/src/components/utils/Image";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";

// [Previous types remain the same...]

// Reusable Components
const Input = ({
  label,
  value,
  onChange,
  disabled,
  type = "text",
  error,
  required = false
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  type?: string;
  error?: string;
  required?: boolean;
}) => (
  <div>
    <label className="block text-sm font-medium text-stone-700 mb-2">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`w-full p-3 rounded-xl border ${
        error ? "border-red-300" : "border-stone-200"
      } disabled:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-primary/20`}
      style={{ borderColor: error ? undefined : "#e7e5e4" }}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

// Profile Photo Component
const ProfilePhoto = ({
  currentPhotoUrl,
  onPhotoChange,
  disabled
}: {
  currentPhotoUrl: string;
  onPhotoChange: (file: File) => void;
  disabled?: boolean;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState(currentPhotoUrl);
  const [error, setError] = useState("");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validation
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB");
      return;
    }

    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setError("");
    onPhotoChange(file);

    // Cleanup
    return () => URL.revokeObjectURL(objectUrl);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <ImageComponent
            imageStyle="w-full h-full object-cover"
            altAttribute="Profile"
            imageUrl={previewUrl || "/placeholder-profile.png"}
          />
        </div>
        {!disabled && (
          <>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 p-2 rounded-full"
              style={{ backgroundColor: colors.primary }}
            >
              <Camera className="w-4 h-4 text-white" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileSelect}
            />
          </>
        )}
      </div>
      <div>
        <h3 className="font-medium text-stone-800">Profile Photo</h3>
        {error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : (
          <p className="text-sm text-stone-500">JPG, PNG or GIF (max. 5MB)</p>
        )}
      </div>
    </div>
  );
};

// Language Selection Component
const LanguageSelector = ({
  languages,
  onAdd,
  onRemove,
  disabled
}: {
  languages: Language[];
  onAdd: (language: Language) => void;
  onRemove: (id: string) => void;
  disabled?: boolean;
}) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newLanguage, setNewLanguage] = useState<Partial<Language>>({
    name: "",
    proficiency: "intermediate"
  });

  const handleAdd = () => {
    if (!newLanguage.name || !newLanguage.proficiency) return;

    onAdd({
      id: Date.now().toString(),
      name: newLanguage.name,
      proficiency: newLanguage.proficiency!
    });

    setNewLanguage({ name: "", proficiency: "intermediate" });
    setShowAddDialog(false);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-2">
        Languages
      </label>
      <div className="flex flex-wrap gap-2">
        {languages.map((lang) => (
          <div
            key={lang.id}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-100"
          >
            <span className="text-sm text-stone-600">{lang.name}</span>
            <span className="text-xs text-stone-500">({lang.proficiency})</span>
            {!disabled && (
              <button
                onClick={() => onRemove(lang.id)}
                className="text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        {!disabled && (
          <button
            onClick={() => setShowAddDialog(true)}
            className="px-3 py-1.5 rounded-full border border-dashed border-stone-300 text-sm text-stone-500 hover:border-stone-400"
          >
            + Add Language
          </button>
        )}
      </div>

      {showAddDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-stone-800 mb-4">
              Add Language
            </h3>
            <div className="space-y-4">
              <Input
                label="Language Name"
                value={newLanguage.name || ""}
                onChange={(value) =>
                  setNewLanguage({ ...newLanguage, name: value })
                }
                required
              />
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Proficiency Level
                </label>
                <select
                  value={newLanguage.proficiency}
                  onChange={(e) =>
                    setNewLanguage({
                      ...newLanguage,
                      proficiency: e.target.value as Language["proficiency"]
                    })
                  }
                  className="w-full p-3 rounded-xl border border-stone-200"
                >
                  <option value="basic">Basic</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="fluent">Fluent</option>
                  <option value="native">Native</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setShowAddDialog(false)}
                  className="px-4 py-2 text-stone-600"
                >
                  Cancel
                </button>
                <PrimaryButton
                  onClick={handleAdd}
                  disabled={!newLanguage.name}
                  backgroud
                  color="text-white"
                >
                  Add Language
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Profile Section Component
const ProfileSection = () => {
  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState<{
    personalInfo: PersonalInfo;
    professionalInfo: ProfessionalInfo;
    languages: Language[];
    contactInfo: ContactInfo;
    photoUrl: string;
  }>({
    personalInfo: {
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      dateOfBirth: "1980-01-01",
      gender: "male"
    },
    professionalInfo: {
      title: "Dr.",
      specialization: "Cardiologist",
      licenseNumber: "MD12345",
      experience: 15,
      qualifications: ["MBBS", "MD Cardiology"],
      biography:
        "Board-certified cardiologist with over 15 years of experience..."
    },
    languages: [
      { id: "1", name: "English", proficiency: "native" },
      { id: "2", name: "Spanish", proficiency: "fluent" }
    ],
    contactInfo: {
      address: "123 Medical Plaza",
      city: "New York",
      state: "NY",
      country: "USA",
      postalCode: "10001"
    },
    photoUrl: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handlers
  const handlePhotoChange = (file: File) => {
    // Handle photo upload
    // For now, just create an object URL
    const url = URL.createObjectURL(file);
    setFormState((prev) => ({ ...prev, photoUrl: url }));
  };

  const handleInputChange = (
    section: keyof typeof formState,
    field: string,
    value: any
  ) => {
    setFormState((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    // Clear error for this field if exists
    if (errors[`${section}.${field}`]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[`${section}.${field}`];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    const requiredFields = {
      "personalInfo.firstName": "First name is required",
      "personalInfo.lastName": "Last name is required",
      "personalInfo.email": "Email is required",
      "professionalInfo.title": "Title is required",
      "professionalInfo.specialization": "Specialization is required",
      "professionalInfo.licenseNumber": "License number is required"
    };

    Object.entries(requiredFields).forEach(([field, message]) => {
      const [section, key] = field.split(".");
      if (!formState[section as keyof typeof formState][key]) {
        newErrors[field] = message;
      }
    });

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      formState.personalInfo.email &&
      !emailRegex.test(formState.personalInfo.email)
    ) {
      newErrors["personalInfo.email"] = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    // Save changes
    setIsEditing(false);
    // Here you would typically make an API call to save the changes
  };

  return (
    <div className="bg-white rounded-3xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-stone-800">
          Professional Profile
        </h2>
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="text-sm font-medium"
          style={{ color: colors.primary }}
        >
          {isEditing ? "Save Changes" : "Edit"}
        </button>
      </div>

      <div className="space-y-8">
        {/* Profile Photo */}
        <ProfilePhoto
          currentPhotoUrl={formState.photoUrl}
          onPhotoChange={handlePhotoChange}
          disabled={!isEditing}
        />

        {/* Personal Information */}
        <div>
          <h3 className="font-medium text-stone-800 mb-4">
            Personal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={formState.personalInfo.firstName}
              onChange={(value) =>
                handleInputChange("personalInfo", "firstName", value)
              }
              disabled={!isEditing}
              error={errors["personalInfo.firstName"]}
              required
            />
            <Input
              label="Last Name"
              value={formState.personalInfo.lastName}
              onChange={(value) =>
                handleInputChange("personalInfo", "lastName", value)
              }
              disabled={!isEditing}
              error={errors["personalInfo.lastName"]}
              required
            />
            <Input
              label="Email"
              type="email"
              value={formState.personalInfo.email}
              onChange={(value) =>
                handleInputChange("personalInfo", "email", value)
              }
              disabled={!isEditing}
              error={errors["personalInfo.email"]}
              required
            />
            <Input
              label="Phone"
              type="tel"
              value={formState.personalInfo.phone}
              onChange={(value) =>
                handleInputChange("personalInfo", "phone", value)
              }
              disabled={!isEditing}
              error={errors["personalInfo.phone"]}
            />
          </div>
        </div>

        {/* Professional Information */}
        <div>
          <h3 className="font-medium text-stone-800 mb-4">
            Professional Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Title"
              value={formState.professionalInfo.title}
              onChange={(value) =>
                handleInputChange("professionalInfo", "title", value)
              }
              disabled={!isEditing}
              error={errors["professionalInfo.title"]}
              required
            />
            <Input
              label="Specialization"
              value={formState.professionalInfo.specialization}
              onChange={(value) =>
                handleInputChange("professionalInfo", "specialization", value)
              }
              disabled={!isEditing}
              error={errors["professionalInfo.specialization"]}
              required
            />
            <Input
              label="License Number"
              value={formState.professionalInfo.licenseNumber}
              onChange={(value) =>
                handleInputChange("professionalInfo", "licenseNumber", value)
              }
              disabled={!isEditing}
              error={errors["professionalInfo.licenseNumber"]}
              required
            />
            <Input
              label="Years of Experience"
              type="number"
              value={formState.professionalInfo.experience.toString()}
              onChange={(value) =>
                handleInputChange(
                  "professionalInfo",
                  "experience",
                  parseInt(value) || 0
                )
              }
              disabled={!isEditing}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-stone-700 mb-2">
              Professional Biography
            </label>
            <textarea
              value={formState.professionalInfo.biography}
              onChange={(e) =>
                handleInputChange(
                  "professionalInfo",
                  "biography",
                  e.target.value
                )
              }
              disabled={!isEditing}
              rows={4}
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
            <div className="md:col-span-2">
              <Input
                label="Address"
                value={formState.contactInfo.address}
                onChange={(value) =>
                  handleInputChange("contactInfo", "address", value)
                }
                disabled={!isEditing}
              />
            </div>
            <Input
              label="City"
              value={formState.contactInfo.city}
              onChange={(value) =>
                handleInputChange("contactInfo", "city", value)
              }
              disabled={!isEditing}
            />
            <Input
              label="State/Province"
              value={formState.contactInfo.state}
              onChange={(value) =>
                handleInputChange("contactInfo", "state", value)
              }
              disabled={!isEditing}
            />
            <Input
              label="Country"
              value={formState.contactInfo.country}
              onChange={(value) =>
                handleInputChange("contactInfo", "country", value)
              }
              disabled={!isEditing}
            />
            <Input
              label="Postal Code"
              value={formState.contactInfo.postalCode}
              onChange={(value) =>
                handleInputChange("contactInfo", "postalCode", value)
              }
              disabled={!isEditing}
            />
          </div>
        </div>

        {/* Languages */}
        <div>
          <LanguageSelector
            languages={formState.languages}
            onAdd={(language) =>
              setFormState((prev) => ({
                ...prev,
                languages: [...prev.languages, language]
              }))
            }
            onRemove={(id) =>
              setFormState((prev) => ({
                ...prev,
                languages: prev.languages.filter((lang) => lang.id !== id)
              }))
            }
            disabled={!isEditing}
          />
        </div>

        {/* Form Actions */}
        {isEditing && (
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setIsEditing(false);
                setErrors({});
              }}
              className="px-6 py-2 rounded-xl text-stone-600 hover:bg-stone-50"
            >
              Cancel
            </button>
            <PrimaryButton onClick={handleSave} backgroud color="text-white">
              Save Changes
            </PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Settings Page Component
const DoctorSettingsPage = () => {
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileSection />;
      // Add other sections here
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
                onTabChange={setActiveTab}
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
