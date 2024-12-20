"use client";

import { useState } from "react";
import { Card } from "@/src/components/utils/Card";
import { Button } from "@/src/components/utils/Button";
import Input from "@/src/components/ui/forms/Input";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import { HelpCircle, Info, AlertCircle } from "lucide-react";
import { colors } from "@/app/lib/constant";
import SubmittingLoader from "@/src/components/ui/loading/SubmittingLoader";

// Constants for select options with enhanced descriptions
const SUBSCRIPTION_DURATION_OPTIONS = [
  { value: "monthly", label: "Monthly - Flexible short-term commitment" },
  { value: "yearly", label: "Yearly - Save 20% with annual billing" }
];

const USER_STATUS_OPTIONS = [
  { value: "active", label: "Active - System fully operational" },
  {
    value: "maintenance",
    label: "Maintenance - Scheduled updates in progress"
  },
  { value: "suspended", label: "Suspended - Temporarily disabled" }
];

// Information tooltips for each section
const SECTION_INFO = {
  websiteInfo: "Basic information displayed across your platform",
  seo: "Improve your website's visibility on search engines",
  payment: "Configure your platform's financial settings",
  support: "Contact information for user assistance",
  status: "Control your website's operational status"
};

// Helper component for section headers with tooltips
const SectionHeader = ({ title, info, className = "" }) => (
  <div className={`flex items-center gap-2 mb-4 ${className}`}>
    <h2 className="text-xl font-semibold" style={{ color: colors.stone[700] }}>
      {title}
    </h2>
    <div className="cursor-help" title={info} style={{ color: colors.primary }}>
      <HelpCircle size={18} />
    </div>
  </div>
);

// Helper component for input description
const InputDescription = ({ text }) => (
  <p className="text-sm mt-1" style={{ color: colors.stone[500] }}>
    {text}
  </p>
);

const GeneralSettings = () => {
  const [settingsData, setSettingsData] = useState({
    websiteName: "",
    tagline: "",
    metaDescription: "",
    metaKeywords: "",
    patientFee: "",
    doctorCommission: "",
    subscriptionDuration: "monthly",
    status: "active",
    supportEmail: "",
    supportPhone: ""
  });

  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettingsData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear any existing messages when user makes changes
    setMessage({ type: "", text: "" });
  };

  const handleUpdateSettings = async () => {
    setIsPending(true);
    try {
      // Validate required fields
      const requiredFields = ["websiteName", "supportEmail", "supportPhone"];
      const missingFields = requiredFields.filter(
        (field) => !settingsData[field]
      );

      if (missingFields.length > 0) {
        throw new Error(
          `Please fill in all required fields: ${missingFields.join(", ")}`
        );
      }

      // Add your API call here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage({
        type: "success",
        text: "Settings updated successfully!"
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to update settings"
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div
      className="max-w-4xl mx-auto p-6"
      style={{ backgroundColor: colors.stone[50] }}
    >
      {/* Page Header */}
      <div className="mb-8">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: colors.primary }}
        >
          General Settings
        </h1>
        <p style={{ color: colors.stone[600] }}>
          Configure your platform&apos;s core settings and preferences
        </p>
      </div>

      {/* Status Message */}
      {message.text && (
        <div
          className="mb-6 p-4 rounded-lg flex items-center gap-2"
          style={{
            backgroundColor:
              message.type === "success" ? colors.secondary : "#FEE2E2",
            color: message.type === "success" ? colors.primary : "#DC2626"
          }}
        >
          {message.type === "success" ? (
            <Info size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          {message.text}
        </div>
      )}

      <Card className="space-y-8 p-8">
        {/* Website Information Section */}
        <section>
          <SectionHeader
            title="Website Information"
            info={SECTION_INFO.websiteInfo}
          />
          <div className="space-y-6">
            <div>
              <Input
                label="Website Name"
                onChange={handleInputChange}
                value={settingsData.websiteName}
                inputType="text"
                name="websiteName"
                required
              />
              <InputDescription text="The name that appears in the header and official communications" />
            </div>
            <div>
              <Input
                label="Website Tagline"
                onChange={handleInputChange}
                value={settingsData.tagline}
                inputType="text"
                name="tagline"
              />
              <InputDescription text="A brief description of your platform's purpose" />
            </div>
          </div>
        </section>

        {/* SEO Settings */}
        <section>
          <SectionHeader title="SEO Settings" info={SECTION_INFO.seo} />
          <div className="space-y-6">
            <div>
              <Input
                label="Meta Description"
                onChange={handleInputChange}
                value={settingsData.metaDescription}
                inputType="text"
                name="metaDescription"
              />
              <InputDescription text="Brief description for search engines (150-160 characters)" />
            </div>
            <div>
              <Input
                label="Meta Keywords"
                onChange={handleInputChange}
                value={settingsData.metaKeywords}
                inputType="text"
                name="metaKeywords"
              />
              <InputDescription text="Comma-separated keywords relevant to your platform" />
            </div>
          </div>
        </section>

        {/* Payment Settings */}
        <section>
          <SectionHeader title="Payment Settings" info={SECTION_INFO.payment} />
          <div className="space-y-6">
            <div>
              <Input
                label="Patient Base Fee"
                onChange={handleInputChange}
                value={settingsData.patientFee}
                inputType="number"
                name="patientFee"
              />
              <InputDescription text="Base consultation fee for patients (in your local currency)" />
            </div>
            <div>
              <Input
                label="Doctor Commission (%)"
                onChange={handleInputChange}
                value={settingsData.doctorCommission}
                inputType="number"
                name="doctorCommission"
              />
              <InputDescription text="Percentage of fee that goes to doctors (0-100)" />
            </div>
            <div>
              <SelectInput
                onChange={handleInputChange}
                label="Subscription Duration"
                value={settingsData.subscriptionDuration}
                options={SUBSCRIPTION_DURATION_OPTIONS}
                id="subscriptionDuration"
                name="subscriptionDuration"
              />
              <InputDescription text="Default billing cycle for new subscriptions" />
            </div>
          </div>
        </section>

        {/* Support Contact */}
        <section>
          <SectionHeader title="Support Contact" info={SECTION_INFO.support} />
          <div className="space-y-6">
            <div>
              <Input
                label="Support Email"
                onChange={handleInputChange}
                value={settingsData.supportEmail}
                inputType="email"
                name="supportEmail"
                required
              />
              <InputDescription text="Primary email address for user support inquiries" />
            </div>
            <div>
              <Input
                label="Support Phone"
                onChange={handleInputChange}
                value={settingsData.supportPhone}
                inputType="tel"
                name="supportPhone"
                required
              />
              <InputDescription text="Contact number for urgent support needs" />
            </div>
          </div>
        </section>

        {/* Status Settings */}
        <section>
          <SectionHeader title="System Status" info={SECTION_INFO.status} />
          <div>
            <SelectInput
              onChange={handleInputChange}
              label="Website Status"
              value={settingsData.status}
              options={USER_STATUS_OPTIONS}
              id="status"
              name="status"
            />
            <InputDescription text="Current operational status of your platform" />
          </div>
        </section>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            onClick={handleUpdateSettings}
            disabled={isPending}
            className="w-full md:w-[50%]"
            style={{
              backgroundColor: colors.primary,
              color: colors.stone[50]
            }}
          >
            {isPending ? <SubmittingLoader /> : "Save Changes"}
          </Button>
          <p className="mt-2 text-sm" style={{ color: colors.stone[500] }}>
            All changes will be automatically saved and applied immediately
          </p>
        </div>
      </Card>
    </div>
  );
};

export default GeneralSettings;
