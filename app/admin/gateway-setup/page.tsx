"use client";

import { useState } from "react";
import { Card } from "@/src/components/utils/Card";
import { Button } from "@/src/components/utils/Button";
import Input from "@/src/components/ui/forms/Input";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import {
  Eye,
  EyeOff,
  CreditCard,
  Wallet,
  Settings,
  AlertCircle,
  Plus,
  X
} from "lucide-react";
import { colors } from "@/app/lib/constant";

// Constants for payment methods and configuration
const DEFAULT_PAYMENT_METHODS = [
  {
    id: "stripe",
    name: "Stripe",
    icon: CreditCard,
    fields: [
      { key: "publishableKey", label: "Publishable Key", type: "text" },
      { key: "secretKey", label: "Secret Key", type: "password" },
      { key: "webhookKey", label: "Webhook Secret", type: "password" }
    ]
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: Wallet,
    fields: [
      { key: "clientId", label: "Client ID", type: "text" },
      { key: "secretKey", label: "Secret Key", type: "password" }
    ]
  }
];

const FIELD_TYPES = [
  { value: "text", label: "Text Field" },
  { value: "password", label: "Password Field" },
  { value: "number", label: "Number Field" },
  { value: "url", label: "URL Field" }
];

// Secure field component for handling sensitive inputs
const SecureField = ({ field, value, onChange, disabled }) => {
  const [showSecret, setShowSecret] = useState(false);

  return (
    <div className="relative">
      <Input
        label={field.label}
        inputType={showSecret ? "text" : field.type}
        name={field.key}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {field.type === "password" && (
        <button
          type="button"
          onClick={() => setShowSecret(!showSecret)}
          className="absolute right-3 top-[38px]"
          style={{ color: colors.stone[400] }}
        >
          {showSecret ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
};

// Modal for adding new payment gateway
const AddGatewayModal = ({ onClose, onAdd }) => {
  const [step, setStep] = useState(1);
  const [gatewayData, setGatewayData] = useState({
    name: "",
    id: "",
    fields: []
  });

  const [newField, setNewField] = useState({
    key: "",
    label: "",
    type: "text"
  });

  const generateId = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]/g, "");
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setGatewayData((prev) => ({
      ...prev,
      name,
      id: generateId(name)
    }));
  };

  const addField = () => {
    if (newField.key && newField.label) {
      setGatewayData((prev) => ({
        ...prev,
        fields: [...prev.fields, { ...newField }]
      }));
      setNewField({ key: "", label: "", type: "text" });
    }
  };

  const removeField = (keyToRemove) => {
    setGatewayData((prev) => ({
      ...prev,
      fields: prev.fields.filter((field) => field.key !== keyToRemove)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2
              className="text-xl font-semibold"
              style={{ color: colors.stone[800] }}
            >
              {step === 1
                ? "Add New Payment Gateway"
                : "Configure Gateway Fields"}
            </h2>
            <button onClick={onClose} className="p-1">
              <X size={20} style={{ color: colors.stone[500] }} />
            </button>
          </div>

          {step === 1 ? (
            <div className="space-y-6">
              <Input
                label="Gateway Name"
                inputType="text"
                name="name"
                value={gatewayData.name}
                onChange={handleNameChange}
                required
              />

              <Input
                label="Gateway ID"
                inputType="text"
                name="id"
                value={gatewayData.id}
                disabled
                required
              />

              <div className="flex justify-end gap-3">
                <Button
                  onClick={onClose}
                  style={{
                    backgroundColor: colors.stone[200],
                    color: colors.stone[700]
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setStep(2)}
                  disabled={!gatewayData.name}
                  style={{
                    backgroundColor: colors.primary,
                    color: "white"
                  }}
                >
                  Next: Add Fields
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="space-y-4 mb-6">
                {gatewayData.fields.map((field) => (
                  <div
                    key={field.key}
                    className="flex items-center justify-between p-3 rounded"
                    style={{ backgroundColor: colors.stone[100] }}
                  >
                    <div>
                      <p
                        className="font-medium"
                        style={{ color: colors.stone[700] }}
                      >
                        {field.label}
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: colors.stone[500] }}
                      >
                        Key: {field.key} • Type: {field.type}
                      </p>
                    </div>
                    <button
                      onClick={() => removeField(field.key)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <div
                className="p-4 rounded mb-6"
                style={{ backgroundColor: colors.stone[50] }}
              >
                <h3
                  className="font-medium mb-4"
                  style={{ color: colors.stone[700] }}
                >
                  Add New Field
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Field Key"
                    inputType="text"
                    value={newField.key}
                    onChange={(e) =>
                      setNewField((prev) => ({
                        ...prev,
                        key: e.target.value.toLowerCase().replace(/\s+/g, "_")
                      }))
                    }
                  />
                  <Input
                    label="Field Label"
                    inputType="text"
                    value={newField.label}
                    onChange={(e) =>
                      setNewField((prev) => ({
                        ...prev,
                        label: e.target.value
                      }))
                    }
                  />
                  <SelectInput
                    id="fieldType"
                    label="Field Type"
                    name="type"
                    value={newField.type}
                    options={FIELD_TYPES}
                    onChange={(e) =>
                      setNewField((prev) => ({
                        ...prev,
                        type: e.target.value
                      }))
                    }
                  />
                </div>
                <Button
                  onClick={addField}
                  disabled={!newField.key || !newField.label}
                  className="mt-4"
                  style={{
                    backgroundColor: colors.secondary,
                    color: colors.primary
                  }}
                >
                  <Plus size={18} className="mr-2" />
                  Add Field
                </Button>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  onClick={() => setStep(1)}
                  style={{
                    backgroundColor: colors.stone[200],
                    color: colors.stone[700]
                  }}
                >
                  Back
                </Button>
                <Button
                  onClick={() => onAdd(gatewayData)}
                  disabled={gatewayData.fields.length === 0}
                  style={{
                    backgroundColor: colors.primary,
                    color: "white"
                  }}
                >
                  Create Gateway
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

// Payment method card component
const PaymentMethodCard = ({ method, onUpdate, onToggle, settings }) => {
  const [formData, setFormData] = useState(settings || {});
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    onUpdate(method.id, formData);
    setIsEditing(false);
  };

  const IconComponent = method.icon || Settings;

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <IconComponent size={24} style={{ color: colors.primary }} />
            <div>
              <h3
                className="text-xl font-semibold"
                style={{ color: colors.stone[800] }}
              >
                {method.name}
              </h3>
              <p className="text-sm" style={{ color: colors.stone[600] }}>
                {settings?.isActive ? "Active" : "Inactive"}
              </p>
            </div>
          </div>

          <Button
            onClick={() => onToggle(method.id)}
            style={{
              backgroundColor: settings?.isActive
                ? colors.stone[200]
                : colors.primary,
              color: settings?.isActive ? colors.stone[700] : "white"
            }}
          >
            {settings?.isActive ? "Deactivate" : "Activate"}
          </Button>
        </div>

        <div className="space-y-4">
          {method.fields.map((field) => (
            <SecureField
              key={field.key}
              field={field}
              value={formData[field.key] || ""}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          {isEditing ? (
            <>
              <Button
                onClick={() => setIsEditing(false)}
                style={{
                  backgroundColor: colors.stone[200],
                  color: colors.stone[700]
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                style={{
                  backgroundColor: colors.primary,
                  color: "white"
                }}
              >
                Save Changes
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              style={{
                backgroundColor: colors.secondary,
                color: colors.primary
              }}
            >
              Edit Settings
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

// Main Payment Settings Component
const PaymentSettings = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState(DEFAULT_PAYMENT_METHODS);
  const [successMessage, setSuccessMessage] = useState("");

  // Example settings - would typically come from your API
  const [settings, setSettings] = useState({
    stripe: {
      isActive: true,
      publishableKey: "pk_test_...",
      secretKey: "sk_test_...",
      webhookKey: "whsec_..."
    },
    paypal: {
      isActive: false,
      clientId: "",
      secretKey: ""
    }
  });

  const handleAddGateway = (newGateway) => {
    setPaymentMethods((prev) => [...prev, newGateway]);
    setSettings((prev) => ({
      ...prev,
      [newGateway.id]: {
        isActive: false,
        ...Object.fromEntries(newGateway.fields.map((f) => [f.key, ""]))
      }
    }));
    showSuccessMessage("New payment gateway added successfully");
  };

  const handleUpdateSettings = async (methodId, newSettings) => {
    try {
      // Here you would typically make an API call to update the settings
      setSettings((prev) => ({
        ...prev,
        [methodId]: {
          ...prev[methodId],
          ...newSettings
        }
      }));
      showSuccessMessage("Payment settings updated successfully");
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  const handleToggleMethod = async (methodId) => {
    try {
      // Here you would typically make an API call to toggle the method
      setSettings((prev) => ({
        ...prev,
        [methodId]: {
          ...prev[methodId],
          isActive: !prev[methodId].isActive
        }
      }));

      showSuccessMessage(
        `Payment method ${
          settings[methodId].isActive ? "deactivated" : "activated"
        } successfully`
      );
    } catch (error) {
      console.error("Error toggling method:", error);
    }
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: colors.primary }}
          >
            Payment Method Settings
          </h1>
          <p style={{ color: colors.stone[600] }}>
            Configure and manage your payment gateway integrations
          </p>
        </div>
        <Button
          onClick={() => setShowAddModal(true)}
          style={{
            backgroundColor: colors.primary,
            color: "white"
          }}
          className="flex items-center gap-2"
        >
          <Plus size={20} />
          Add New Gateway
        </Button>
      </div>

      {successMessage && (
        <div
          className="mb-6 p-4 rounded-lg flex items-center gap-2"
          style={{
            backgroundColor: colors.secondary,
            color: colors.primary
          }}
        >
          <AlertCircle size={20} />
          {successMessage}
        </div>
      )}

      <div className="space-y-6">
        {paymentMethods.map((method) => (
          <PaymentMethodCard
            key={method.id}
            method={method}
            settings={settings[method.id]}
            onUpdate={handleUpdateSettings}
            onToggle={handleToggleMethod}
          />
        ))}
      </div>

      {showAddModal && (
        <AddGatewayModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddGateway}
        />
      )}
    </div>
  );
};

export default PaymentSettings;
