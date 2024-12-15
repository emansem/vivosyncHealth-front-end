"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Dialog } from "@/src/components/utils/Dialog";
import Input from "@/src/components/ui/forms/Input";
import SubmittingLoader from "@/src/components/ui/loading/SubmittingLoader";
import { Button } from "@/src/components/utils/Button";
import { Card } from "@/src/components/utils/Card";
import { Menu, X } from "lucide-react";

// Types for our data structures
interface Profile {
  name: string;
  email: string;
  phone: string;
  photoUrl: string;
  bloodType?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  language: string;
  timeZone: string;
}

interface MedicalCondition {
  id: string;
  name: string;
  diagnosedDate: string;
  notes?: string;
}

interface MedicationReminder {
  id: string;
  name: string;
  time: string;
  frequency: "daily" | "weekly" | "custom";
  customDays?: string[];
  notes?: string;
}

interface NotificationPreferences {
  appointments: boolean;
  medications: boolean;
  generalUpdates: boolean;
}

interface ConnectedDevice {
  id: string;
  name: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

interface PasswordChangeForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface EmailChangeForm {
  newEmail: string;
  password: string;
}

// Medical Profile Tab Component
const MedicalProfileTab = ({
  conditions,
  reminders,
  onAddCondition,
  onAddReminder,
  onDeleteCondition,
  onDeleteReminder,
  isSubmitting
}: {
  conditions: MedicalCondition[];
  reminders: MedicationReminder[];
  onAddCondition: () => void;
  onAddReminder: () => void;
  onDeleteCondition: (id: string) => Promise<void>;
  onDeleteReminder: (id: string) => Promise<void>;
  isSubmitting: boolean;
}) => {
  return (
    <div className="space-y-4 md:space-y-8">
      {/* Medical Conditions Section */}
      <Card>
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 md:mb-0">
              Medical Conditions
            </h2>
            <Button
              onClick={onAddCondition}
              disabled={isSubmitting}
              className="w-full md:w-auto"
            >
              Add Condition
            </Button>
          </div>

          <div className="space-y-4">
            {conditions.map((condition) => (
              <div
                key={condition.id}
                className="flex flex-col md:flex-row justify-between items-start p-4 bg-gray-50 rounded-lg space-y-2 md:space-y-0"
              >
                <div className="w-full md:w-auto">
                  <h3 className="font-medium text-gray-900">
                    {condition.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Diagnosed:{" "}
                    {new Date(condition.diagnosedDate).toLocaleDateString()}
                  </p>
                  {condition.notes && (
                    <p className="mt-2 text-sm text-gray-600">
                      {condition.notes}
                    </p>
                  )}
                </div>
                <Button
                  variant="outline"
                  onClick={() => onDeleteCondition(condition.id)}
                  disabled={isSubmitting}
                  className="w-full md:w-auto"
                >
                  Remove
                </Button>
              </div>
            ))}
            {conditions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-sm text-gray-500">No conditions added yet</p>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Medication Reminders Section */}
      <Card>
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 md:mb-0">
              Medication Reminders
            </h2>
            <Button
              onClick={onAddReminder}
              disabled={isSubmitting}
              className="w-full md:w-auto"
            >
              Add Reminder
            </Button>
          </div>

          <div className="space-y-4">
            {reminders.map((reminder) => (
              <div
                key={reminder.id}
                className="flex flex-col md:flex-row justify-between items-start p-4 bg-gray-50 rounded-lg space-y-2 md:space-y-0"
              >
                <div className="w-full md:w-auto">
                  <h3 className="font-medium text-gray-900">{reminder.name}</h3>
                  <p className="text-sm text-gray-500">Time: {reminder.time}</p>
                  <p className="text-sm text-gray-500">
                    Frequency:{" "}
                    {reminder.frequency === "custom"
                      ? `Custom (${reminder.customDays?.join(", ")})`
                      : reminder.frequency}
                  </p>
                  {reminder.notes && (
                    <p className="mt-2 text-sm text-gray-600">
                      {reminder.notes}
                    </p>
                  )}
                </div>
                <Button
                  variant="outline"
                  onClick={() => onDeleteReminder(reminder.id)}
                  disabled={isSubmitting}
                  className="w-full md:w-auto"
                >
                  Remove
                </Button>
              </div>
            ))}
            {reminders.length === 0 && (
              <div className="text-center py-8">
                <p className="text-sm text-gray-500">No reminders added yet</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

// Preferences Tab Component with improved mobile responsiveness
const PreferencesTab = ({
  preferences,
  profile,
  onUpdatePreferences,
  isSubmitting
}: {
  preferences: NotificationPreferences;
  profile: Profile;
  onUpdatePreferences: (prefs: NotificationPreferences) => Promise<void>;
  isSubmitting: boolean;
}) => {
  return (
    <Card>
      <div className="p-4 md:p-6 space-y-6 md:space-y-8">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Notification Preferences
          </h2>
          <div className="space-y-4">
            {Object.entries(preferences).map(([key, enabled]) => (
              <div
                key={key}
                className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0"
              >
                <div className="flex-grow">
                  <h3 className="text-sm font-medium text-gray-900">
                    {key.charAt(0).toUpperCase() +
                      key.slice(1).replace(/([A-Z])/g, " $1")}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {/* {getNotificationDescription(key)} */}
                  </p>
                </div>
                <div
                  role="checkbox"
                  aria-checked={enabled}
                  tabIndex={0}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                    ${enabled ? "bg-green-500" : "bg-gray-200"}
                    ${
                      isSubmitting
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  onClick={() => {
                    if (!isSubmitting) {
                      onUpdatePreferences({
                        ...preferences,
                        [key]: !enabled
                      });
                    }
                  }}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                      ${enabled ? "translate-x-6" : "translate-x-1"}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Regional Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Language
              </label>
              <select
                className="w-full p-2 border rounded-md"
                value={profile.language}
                disabled={isSubmitting}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Chinese">Chinese</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Time Zone
              </label>
              <select
                className="w-full p-2 border rounded-md"
                value={profile.timeZone}
                disabled={isSubmitting}
              >
                <option value="UTC-5">Eastern Time (UTC-5)</option>
                <option value="UTC-6">Central Time (UTC-6)</option>
                <option value="UTC-7">Mountain Time (UTC-7)</option>
                <option value="UTC-8">Pacific Time (UTC-8)</option>
              </select>
            </div>
          </div>
        </section>
      </div>
    </Card>
  );
};

// Security Tab Component with improved mobile responsiveness
const SecurityTab = ({
  devices,
  onChangePassword,
  onChangeEmail,
  onLogoutDevice,
  isSubmitting
}: {
  devices: ConnectedDevice[];
  onChangePassword: () => void;
  onChangeEmail: () => void;
  onLogoutDevice: (id: string) => Promise<void>;
  isSubmitting: boolean;
}) => {
  return (
    <div className="space-y-4 md:space-y-6">
      {/* Password & Email Section */}
      <Card>
        <div className="p-4 md:p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Password</h3>
              <p className="mt-1 text-sm text-gray-500">
                Update your password regularly to keep your account secure
              </p>
            </div>
            <Button
              onClick={onChangePassword}
              disabled={isSubmitting}
              className="w-full md:w-auto"
            >
              Change Password
            </Button>
          </div>

          <div className="border-t pt-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Email Address
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Change the email address associated with your account
                </p>
              </div>
              <Button
                onClick={onChangeEmail}
                disabled={isSubmitting}
                className="w-full md:w-auto"
              >
                Change Email
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Connected Devices Section */}
      <Card>
        <div className="p-4 md:p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Connected Devices
          </h3>
          <div className="space-y-4">
            {devices.map((device) => (
              <div
                key={device.id}
                className="flex flex-col md:flex-row justify-between items-start p-4 bg-gray-50 rounded-lg space-y-4 md:space-y-0"
              >
                <div>
                  <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2">
                    <h4 className="font-medium text-gray-900">{device.name}</h4>
                    {device.isCurrent && (
                      <span className="inline-block px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                        Current Device
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Last active: {new Date(device.lastActive).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    Location: {device.location}
                  </p>
                </div>
                {!device.isCurrent && (
                  <Button
                    variant="outline"
                    onClick={() => onLogoutDevice(device.id)}
                    disabled={isSubmitting}
                    className="w-full md:w-auto"
                  >
                    Logout Device
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

// Dialog components remain largely the same but with improved mobile styling
// Add Condition Dialog
const AddConditionDialog = ({
  isOpen,
  onClose,
  onSave,
  isSubmitting
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (condition: Omit<MedicalCondition, "id">) => Promise<void>;
  isSubmitting: boolean;
}) => {
  const [form, setForm] = useState<Omit<MedicalCondition, "id">>({
    name: "",
    diagnosedDate: "",
    notes: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    if (!form.name.trim()) {
      setErrors((prev) => ({ ...prev, name: "Condition name is required" }));
      return;
    }
    if (!form.diagnosedDate) {
      setErrors((prev) => ({
        ...prev,
        diagnosedDate: "Diagnosis date is required"
      }));
      return;
    }

    try {
      await onSave(form);
      onClose();
    } catch (error) {
      setErrors((prev) => ({ ...prev, submit: "Failed to add condition" }));
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Add Medical Condition">
      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        <Input
          inputType="text"
          name="name"
          label="Condition Name"
          value={form.name}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, name: e.target.value }))
          }
          error={errors.name}
          className="w-full"
        />

        <Input
          inputType="date"
          name="diagnosedDate"
          label="Diagnosis Date"
          value={form.diagnosedDate}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, diagnosedDate: e.target.value }))
          }
          error={errors.diagnosedDate}
          className="w-full"
        />

        <Input
          inputType="textarea"
          name="notes"
          label="Notes (Optional)"
          value={form.notes || ""}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, notes: e.target.value }))
          }
          className="w-full"
        />

        {errors.submit && (
          <p className="text-sm text-red-600">{errors.submit}</p>
        )}

        <div className="flex flex-col-reverse md:flex-row justify-end space-y-4 space-y-reverse md:space-y-0 md:space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-full md:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto"
          >
            {isSubmitting ? <SubmittingLoader /> : "Add Condition"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

// Main Settings Page Component
const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<
    "personal" | "medical" | "preferences" | "security"
  >("personal");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initial demo data states
  const [profile, setProfile] = useState<Profile>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1-234-567-8900",
    photoUrl: "/placeholder.jpg",
    bloodType: "O+",
    language: "English",
    timeZone: "UTC-5"
  });

  const [conditions, setConditions] = useState<MedicalCondition[]>([
    {
      id: "1",
      name: "Hypertension",
      diagnosedDate: "2023-06-15",
      notes: "Under medication and regular monitoring"
    }
  ]);

  const [reminders, setReminders] = useState<MedicationReminder[]>([
    {
      id: "1",
      name: "Blood Pressure Medicine",
      time: "09:00",
      frequency: "daily",
      notes: "Take with breakfast"
    }
  ]);

  const [preferences, setPreferences] = useState<NotificationPreferences>({
    appointments: true,
    medications: true,
    generalUpdates: false
  });

  const [devices, setDevices] = useState<ConnectedDevice[]>([
    {
      id: "1",
      name: "Chrome on MacBook Pro",
      location: "New York, USA",
      lastActive: new Date().toISOString(),
      isCurrent: true
    }
  ]);

  // Tab navigation component
  const TabButton = ({
    label,
    value
  }: {
    label: string;
    value: typeof activeTab;
  }) => (
    <button
      onClick={() => {
        setActiveTab(value);
        setMobileMenuOpen(false);
      }}
      className={`w-full text-left px-4 py-3 rounded-lg transition md:w-auto
        ${
          activeTab === value
            ? "bg-green-600 text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
    >
      {label}
    </button>
  );

  // Handler functions with simulated API calls
  const handleAddCondition = async (
    condition: Omit<MedicalCondition, "id">
  ) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setConditions((prev) => [
        ...prev,
        { ...condition, id: Math.random().toString() }
      ]);
      setActiveDialog(null);
    } catch (error) {
      setError("Failed to add condition");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCondition = async (id: string) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setConditions((prev) => prev.filter((condition) => condition.id !== id));
    } catch (error) {
      setError("Failed to delete condition");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdatePreferences = async (
    newPreferences: NotificationPreferences
  ) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPreferences(newPreferences);
    } catch (error) {
      setError("Failed to update preferences");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 md:hidden">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-gray-900">Settings</h1>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg">
            <div className="p-2 space-y-1">
              <TabButton label="Personal Information" value="personal" />
              <TabButton label="Medical Profile" value="medical" />
              <TabButton label="Preferences" value="preferences" />
              <TabButton label="Security" value="security" />
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Desktop Header - Hidden on Mobile */}
        <div className="hidden md:block mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Desktop Tab Navigation - Hidden on Mobile */}
        <div className="hidden md:flex space-x-4 mb-6 border-b border-gray-200">
          <TabButton label="Personal Information" value="personal" />
          <TabButton label="Medical Profile" value="medical" />
          <TabButton label="Preferences" value="preferences" />
          <TabButton label="Security" value="security" />
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="flex-shrink-0 text-red-700 hover:text-red-600"
              >
                <span className="sr-only">Dismiss</span>
                <X size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Render appropriate tab content based on activeTab */}
          {activeTab === "personal" && (
            <Card>
              <div className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between space-y-4 md:space-y-0">
                  <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-4 md:space-y-0">
                    {/* Profile Photo */}
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden">
                        <Image
                          src={profile.photoUrl}
                          alt="Profile"
                          width={96}
                          height={96}
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Basic Info */}
                    <div className="text-center md:text-left">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {profile.name}
                      </h3>
                      <div className="mt-1 space-y-1">
                        <p className="text-sm text-gray-500">{profile.email}</p>
                        <p className="text-sm text-gray-500">{profile.phone}</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => setActiveDialog("editProfile")}
                    disabled={isSubmitting}
                    className="w-full md:w-auto"
                  >
                    Edit Profile
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === "medical" && (
            <MedicalProfileTab
              conditions={conditions}
              reminders={reminders}
              onAddCondition={() => setActiveDialog("addCondition")}
              onAddReminder={() => setActiveDialog("addReminder")}
              onDeleteCondition={handleDeleteCondition}
              onDeleteReminder={() => {}}
              isSubmitting={isSubmitting}
            />
          )}

          {activeTab === "preferences" && (
            <PreferencesTab
              preferences={preferences}
              profile={profile}
              onUpdatePreferences={handleUpdatePreferences}
              isSubmitting={isSubmitting}
            />
          )}

          {activeTab === "security" && (
            <SecurityTab
              devices={devices}
              onChangePassword={() => setActiveDialog("changePassword")}
              onChangeEmail={() => setActiveDialog("changeEmail")}
              onLogoutDevice={() => {}}
              isSubmitting={isSubmitting}
            />
          )}
        </div>

        {/* Dialogs */}
        <AddConditionDialog
          isOpen={activeDialog === "addCondition"}
          onClose={() => setActiveDialog(null)}
          onSave={handleAddCondition}
          isSubmitting={isSubmitting}
        />

        {/* Add other dialogs here... */}
      </div>
    </div>
  );
};

export default SettingsPage;
