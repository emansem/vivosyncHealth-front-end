"use client";
import React, { useState } from "react";
import { Card } from "@/src/components/utils/Card";
import Input from "@/src/components/ui/forms/Input";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import { Button } from "@/src/components/utils/Button";
import {
  Mail,
  MessageSquare,
  Settings,
  Send,
  CheckCircle,
  AlertCircle,
  Key,
  Lock,
  Globe,
  User,
  Server,
  Radio,
  Shield,
  X
} from "lucide-react";
import { colors } from "@/app/lib/constant";

// Toast notification component
const Toast = ({ message, type = "success", onClose }) => (
  <div
    className={`fixed bottom-4 right-4 z-50 ${
      type === "success" ? "bg-green-50" : "bg-red-50"
    } rounded-lg shadow-lg p-4`}
  >
    <div className="flex items-center gap-2">
      {type === "success" ? (
        <CheckCircle className="text-green-500" size={20} />
      ) : (
        <AlertCircle className="text-red-500" size={20} />
      )}
      <p className={type === "success" ? "text-green-700" : "text-red-700"}>
        {message}
      </p>
      <button onClick={onClose} className="ml-auto">
        <X size={16} />
      </button>
    </div>
  </div>
);

// Test Connection Modal
const TestConnectionModal = ({ type, onClose, onTest }) => {
  const [testData, setTestData] = useState({
    recipient: "",
    subject: type === "email" ? "Test Email" : "Test SMS",
    message: `This is a test ${
      type === "email" ? "email" : "message"
    } from your application.`
  });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-lg m-4">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-stone-800">
              Test {type === "email" ? "Email" : "SMS"} Configuration
            </h3>
            <button onClick={onClose}>
              <X size={24} className="text-stone-400 hover:text-stone-600" />
            </button>
          </div>

          <div className="space-y-4">
            <Input
              label={type === "email" ? "Recipient Email" : "Recipient Phone"}
              value={testData.recipient}
              onChange={(e) =>
                setTestData((prev) => ({
                  ...prev,
                  recipient: e.target.value
                }))
              }
              inputPlaceholder={
                type === "email" ? "Enter email address" : "Enter phone number"
              }
            />

            {type === "email" && (
              <Input
                label="Subject"
                value={testData.subject}
                onChange={(e) =>
                  setTestData((prev) => ({
                    ...prev,
                    subject: e.target.value
                  }))
                }
              />
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-stone-700">
                Message
              </label>
              <textarea
                value={testData.message}
                onChange={(e) =>
                  setTestData((prev) => ({
                    ...prev,
                    message: e.target.value
                  }))
                }
                className="w-full h-32 p-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => onTest(testData)}
              className="flex-1"
            >
              Send Test
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CommunicationSetup = () => {
  // State management
  const [emailConfig, setEmailConfig] = useState({
    smtp_host: "",
    smtp_port: "",
    smtp_username: "",
    smtp_password: "",
    smtp_encryption: "tls",
    from_email: "",
    from_name: "",
    enabled: false
  });

  const [smsConfig, setSmsConfig] = useState({
    provider: "twilio",
    account_sid: "",
    auth_token: "",
    from_number: "",
    enabled: false
  });

  const [activeTab, setActiveTab] = useState("email");
  const [showTestModal, setShowTestModal] = useState(false);
  const [toast, setToast] = useState(null);

  // Helper function to show notifications
  const showNotification = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Handle saving configurations
  const handleSaveEmailConfig = async () => {
    try {
      // Here you would make your API call to save the email configuration
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showNotification("Email configuration saved successfully!");
    } catch (error) {
      showNotification("Failed to save email configuration", "error");
    }
  };

  const handleSaveSMSConfig = async () => {
    try {
      // Here you would make your API call to save the SMS configuration
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showNotification("SMS configuration saved successfully!");
    } catch (error) {
      showNotification("Failed to save SMS configuration", "error");
    }
  };

  // Handle test connection
  const handleTest = async (testData) => {
    try {
      // Here you would make your API call to test the connection
      await new Promise((resolve) => setTimeout(resolve, 1000));
      showNotification(
        `Test ${activeTab === "email" ? "email" : "message"} sent successfully!`
      );
      setShowTestModal(false);
    } catch (error) {
      showNotification(
        `Failed to send test ${activeTab === "email" ? "email" : "message"}`,
        "error"
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-stone-800">
          Communication Settings
        </h1>
        <p className="text-stone-600 mt-1">
          Configure your email and SMS settings
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-stone-200">
        <button
          onClick={() => setActiveTab("email")}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === "email"
              ? "text-primary border-b-2 border-primary"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          <div className="flex items-center gap-2">
            <Mail size={18} />
            Email Configuration
          </div>
        </button>
        <button
          onClick={() => setActiveTab("sms")}
          className={`px-4 py-2 font-medium text-sm transition-colors ${
            activeTab === "sms"
              ? "text-primary border-b-2 border-primary"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          <div className="flex items-center gap-2">
            <MessageSquare size={18} />
            SMS Configuration
          </div>
        </button>
      </div>

      {/* Email Configuration */}
      {activeTab === "email" && (
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-stone-800">
                  SMTP Settings
                </h2>
                <p className="text-sm text-stone-600">
                  Configure your email server settings
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setShowTestModal(true)}
                >
                  Test Connection
                </Button>
                <Button variant="primary" onClick={handleSaveEmailConfig}>
                  Save Changes
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="SMTP Host"
                value={emailConfig.smtp_host}
                onChange={(e) =>
                  setEmailConfig((prev) => ({
                    ...prev,
                    smtp_host: e.target.value
                  }))
                }
                placeholder="smtp.example.com"
                icon={<Server size={18} />}
              />

              <Input
                label="SMTP Port"
                value={emailConfig.smtp_port}
                onChange={(e) =>
                  setEmailConfig((prev) => ({
                    ...prev,
                    smtp_port: e.target.value
                  }))
                }
                placeholder="587"
                type="number"
                icon={<Radio size={18} />}
              />

              <Input
                label="SMTP Username"
                value={emailConfig.smtp_username}
                onChange={(e) =>
                  setEmailConfig((prev) => ({
                    ...prev,
                    smtp_username: e.target.value
                  }))
                }
                inputPlaceholder="Enter username"
                icon={<User size={18} />}
              />

              <Input
                label="SMTP Password"
                value={emailConfig.smtp_password}
                onChange={(e) =>
                  setEmailConfig((prev) => ({
                    ...prev,
                    smtp_password: e.target.value
                  }))
                }
                inputType="password"
                inputPlaceholder="Enter password"
                icon={<Key size={18} />}
              />

              <SelectInput
                label="Encryption"
                value={emailConfig.smtp_encryption}
                onChange={(e) =>
                  setEmailConfig((prev) => ({
                    ...prev,
                    smtp_encryption: e.target.value
                  }))
                }
                options={[
                  { value: "tls", label: "TLS" },
                  { value: "ssl", label: "SSL" },
                  { value: "none", label: "None" }
                ]}
                icon={<Lock size={18} />}
              />

              <Input
                label="From Email"
                value={emailConfig.from_email}
                onChange={(e) =>
                  setEmailConfig((prev) => ({
                    ...prev,
                    from_email: e.target.value
                  }))
                }
                inputPlaceholder="noreply@example.com"
                icon={<Mail size={18} />}
              />

              <Input
                label="From Name"
                value={emailConfig.from_name}
                onChange={(e) =>
                  setEmailConfig((prev) => ({
                    ...prev,
                    from_name: e.target.value
                  }))
                }
                inputPlaceholder="Your Company Name"
                icon={<User size={18} />}
              />
            </div>
          </div>
        </Card>
      )}

      {/* SMS Configuration */}
      {activeTab === "sms" && (
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-stone-800">
                  SMS Gateway Settings
                </h2>
                <p className="text-sm text-stone-600">
                  Configure your SMS provider settings
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setShowTestModal(true)}
                >
                  Test Connection
                </Button>
                <Button variant="primary" onClick={handleSaveSMSConfig}>
                  Save Changes
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectInput
                label="SMS Provider"
                value={smsConfig.provider}
                onChange={(e) =>
                  setSmsConfig((prev) => ({
                    ...prev,
                    provider: e.target.value
                  }))
                }
                options={[
                  { value: "twilio", label: "Twilio" },
                  { value: "messagebird", label: "MessageBird" },
                  { value: "nexmo", label: "Nexmo/Vonage" }
                ]}
                icon={<Globe size={18} />}
              />

              <Input
                label="Account SID"
                value={smsConfig.account_sid}
                onChange={(e) =>
                  setSmsConfig((prev) => ({
                    ...prev,
                    account_sid: e.target.value
                  }))
                }
                inputPlaceholder="Enter Account SID"
                icon={<User size={18} />}
              />

              <Input
                label="Auth Token"
                value={smsConfig.auth_token}
                onChange={(e) =>
                  setSmsConfig((prev) => ({
                    ...prev,
                    auth_token: e.target.value
                  }))
                }
                inputType="password"
                placeholder="Enter Auth Token"
                icon={<Key size={18} />}
              />

              <Input
                label="From Number"
                value={smsConfig.from_number}
                onChange={(e) =>
                  setSmsConfig((prev) => ({
                    ...prev,
                    from_number: e.target.value
                  }))
                }
                inputPlaceholder="+1234567890"
                icon={<MessageSquare size={18} />}
              />
            </div>
          </div>
        </Card>
      )}

      {/* Test Connection Modal */}
      {showTestModal && (
        <TestConnectionModal
          type={activeTab}
          onClose={() => setShowTestModal(false)}
          onTest={handleTest}
        />
      )}

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default CommunicationSetup;
