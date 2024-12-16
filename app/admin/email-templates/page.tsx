"use client";
import React, { useState } from "react";
import { Card } from "@/src/components/utils/Card";
import Input from "@/src/components/ui/forms/Input";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import { Button } from "@/src/components/utils/Button";
import {
  Mail,
  Send,
  Users,
  Star,
  AlertCircle,
  Filter,
  Search,
  Settings,
  Calendar,
  ChevronRight,
  Edit,
  Trash2,
  Copy,
  Clock,
  CheckCircle,
  X,
  FileText,
  PieChart
} from "lucide-react";
import { colors } from "@/app/lib/constant";

// System template categories with proper structured content
const systemTemplates = {
  authentication: [
    {
      id: "reset-password",
      name: "Password Reset",
      description: "Sent when a user requests a password reset",
      subject: "Reset Your Password",
      category: "authentication",
      content: `Hi {{user_name}},\n\nA password reset was requested for your account. Click the link below to set a new password:\n\n{{reset_link}}\n\nThis link will expire in 1 hour. If you didn't request this, please ignore this email.\n\nBest regards,\nThe Team`,
      variables: ["user_name", "reset_link"],
      status: "active"
    },
    {
      id: "email-verification",
      name: "Email Verification",
      description: "Sent to verify new user email addresses",
      subject: "Verify Your Email Address",
      category: "authentication",
      content: `Welcome {{user_name}}!\n\nPlease verify your email address by clicking the link below:\n\n{{verification_link}}\n\nThis link will expire in 24 hours.\n\nBest regards,\nThe Team`,
      variables: ["user_name", "verification_link"],
      status: "active"
    }
  ],
  billing: [
    {
      id: "payment-success",
      name: "Payment Success",
      description: "Sent after successful payment processing",
      subject: "Payment Successful - Receipt #{{receipt_number}}",
      category: "billing",
      content: `Dear {{user_name}},\n\nYour payment of {{amount}} has been successfully processed.\n\nTransaction Details:\nDate: {{transaction_date}}\nReceipt Number: {{receipt_number}}\nAmount: {{amount}}\n\nView your receipt: {{receipt_link}}\n\nThank you for your business!\n\nBest regards,\nThe Team`,
      variables: [
        "user_name",
        "amount",
        "transaction_date",
        "receipt_number",
        "receipt_link"
      ],
      status: "active"
    },
    {
      id: "payment-failed",
      name: "Payment Failed",
      description: "Sent when payment processing fails",
      subject: "Action Required: Payment Failed",
      category: "billing",
      content: `Dear {{user_name}},\n\nWe were unable to process your payment of {{amount}}.\n\nReason: {{failure_reason}}\n\nPlease update your payment method: {{payment_update_link}}\n\nIf you need assistance, please contact support.\n\nBest regards,\nThe Team`,
      variables: [
        "user_name",
        "amount",
        "failure_reason",
        "payment_update_link"
      ],
      status: "active"
    }
  ],
  notifications: [
    {
      id: "account-update",
      name: "Account Update",
      description: "Sent when important account changes are made",
      subject: "Your Account Has Been Updated",
      category: "notifications",
      content: `Hi {{user_name}},\n\nYour account information was recently updated.\n\nChange Details:\n{{change_details}}\n\nIf you didn't make these changes, please contact support immediately.\n\nBest regards,\nThe Team`,
      variables: ["user_name", "change_details"],
      status: "active"
    }
  ],
  appointments: [
    {
      id: "appointment-confirmation",
      name: "Appointment Confirmation",
      description: "Sent when an appointment is scheduled",
      subject: "Appointment Confirmation - {{appointment_date}}",
      category: "appointments",
      content: `Dear {{user_name}},\n\nYour appointment has been confirmed.\n\nDetails:\nDoctor: {{doctor_name}}\nDate: {{appointment_date}}\nTime: {{appointment_time}}\n\nNeed to reschedule? Click here: {{reschedule_link}}\n\nBest regards,\nThe Team`,
      variables: [
        "user_name",
        "doctor_name",
        "appointment_date",
        "appointment_time",
        "reschedule_link"
      ],
      status: "active"
    }
  ]
};

// Status badge component with consistent styling
const StatusBadge = ({ status }) => {
  const statusStyles = {
    active: { bg: "bg-green-50", text: "text-green-700", icon: CheckCircle },
    draft: { bg: "bg-yellow-50", text: "text-yellow-700", icon: Clock },
    inactive: { bg: "bg-red-50", text: "text-red-700", icon: X }
  };

  const style = statusStyles[status] || statusStyles.draft;
  const Icon = style.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${style.bg} ${style.text}`}
    >
      <Icon size={14} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Template editor modal component
const TemplateEditorModal = ({ template, onSave, onClose }) => {
  const [editedTemplate, setEditedTemplate] = useState(template);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto m-4">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-stone-800">
              Edit Template
            </h2>
            <button onClick={onClose}>
              <X size={24} className="text-stone-400 hover:text-stone-600" />
            </button>
          </div>

          <div className="space-y-4">
            <Input
              label="Template Name"
              value={editedTemplate.name}
              onChange={(e) =>
                setEditedTemplate((prev) => ({ ...prev, name: e.target.value }))
              }
            />

            <Input
              label="Subject Line"
              value={editedTemplate.subject}
              onChange={(e) =>
                setEditedTemplate((prev) => ({
                  ...prev,
                  subject: e.target.value
                }))
              }
            />

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Available Variables
              </label>
              <div className="flex flex-wrap gap-2 p-3 bg-stone-50 rounded-lg">
                {editedTemplate.variables.map((variable) => (
                  <span
                    key={variable}
                    className="px-2 py-1 bg-white border border-stone-200 rounded text-sm text-stone-600"
                  >
                    {`{{${variable}}}`}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-stone-700">
                Email Content
              </label>
              <textarea
                value={editedTemplate.content}
                onChange={(e) =>
                  setEditedTemplate((prev) => ({
                    ...prev,
                    content: e.target.value
                  }))
                }
                className="w-full h-96 p-4 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 font-mono text-sm"
              />
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => onSave(editedTemplate)}
                className="flex-1"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmailTemplateSystem = () => {
  // State management
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [templates, setTemplates] = useState(systemTemplates);

  // Filter templates based on search and category
  const getFilteredTemplates = () => {
    let filtered = {};

    Object.entries(templates).forEach(([category, templateList]) => {
      if (selectedCategory === "all" || selectedCategory === category) {
        const filteredList = templateList.filter(
          (template) =>
            template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        );
        if (filteredList.length > 0) {
          filtered[category] = filteredList;
        }
      }
    });

    return filtered;
  };

  // Handle template save
  const handleTemplateSave = (updatedTemplate) => {
    setTemplates((prev) => ({
      ...prev,
      [updatedTemplate.category]: prev[updatedTemplate.category].map(
        (template) =>
          template.id === updatedTemplate.id ? updatedTemplate : template
      )
    }));
    setEditingTemplate(null);
  };

  // Handle template deletion
  const handleTemplateDelete = (category, templateId) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      setTemplates((prev) => ({
        ...prev,
        [category]: prev[category].filter(
          (template) => template.id !== templateId
        )
      }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">
            System Email Templates
          </h1>
          <p className="text-stone-600 mt-1">
            Manage and customize system notification emails
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-green-50">
              <Mail className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-stone-600">Total Templates</p>
              <p className="text-xl font-semibold text-stone-800">
                {Object.values(templates).reduce(
                  (acc, curr) => acc + curr.length,
                  0
                )}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-blue-50">
              <CheckCircle className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-stone-600">Active Templates</p>
              <p className="text-xl font-semibold text-stone-800">
                {Object.values(templates).reduce(
                  (acc, curr) =>
                    acc + curr.filter((t) => t.status === "active").length,
                  0
                )}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-yellow-50">
              <Clock className="text-yellow-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-stone-600">Draft Templates</p>
              <p className="text-xl font-semibold text-stone-800">
                {Object.values(templates).reduce(
                  (acc, curr) =>
                    acc + curr.filter((t) => t.status === "draft").length,
                  0
                )}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-purple-50">
              <PieChart className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-stone-600">Categories</p>
              <p className="text-xl font-semibold text-stone-800">
                {Object.keys(templates).length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filter Section */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search templates..."
              className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <SelectInput
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            options={[
              { value: "all", label: "All Categories" },
              { value: "authentication", label: "Authentication" },
              { value: "billing", label: "Billing" },
              { value: "notifications", label: "Notifications" },
              { value: "appointments", label: "Appointments" }
            ]}
          />
        </div>
      </Card>

      {/* Templates List */}
      <div className="space-y-6">
        {Object.entries(getFilteredTemplates()).map(
          ([category, templateList]) => (
            <div key={category}>
              <h2 className="text-lg font-semibold text-stone-800 mb-3 capitalize">
                {category} Templates
              </h2>
              <div className="space-y-4">
                {templateList.map((template) => (
                  <Card key={template.id} className="p-4">
                    <div className="space-y-4">
                      {/* Completing the template card rendering */}
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="font-medium text-stone-800">
                              {template.name}
                            </h3>
                            <StatusBadge status={template.status} />
                          </div>
                          <p className="text-sm text-stone-600">
                            {template.description}
                          </p>
                          <p className="text-sm text-stone-500">
                            Subject: {template.subject}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {template.variables.map((variable) => (
                              <span
                                key={variable}
                                className="px-2 py-1 bg-stone-50 border border-stone-200 rounded text-xs text-stone-600"
                              >
                                {`{{${variable}}}`}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              const newTemplate = {
                                ...template,
                                id: `${template.id}-copy-${Date.now()}`,
                                name: `${template.name} (Copy)`,
                                status: "draft"
                              };
                              setTemplates((prev) => ({
                                ...prev,
                                [category]: [...prev[category], newTemplate]
                              }));
                            }}
                            className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                            title="Duplicate Template"
                          >
                            <Copy size={18} className="text-stone-400" />
                          </button>
                          <button
                            onClick={() => setEditingTemplate(template)}
                            className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                            title="Edit Template"
                          >
                            <Edit size={18} className="text-stone-400" />
                          </button>
                          <button
                            onClick={() =>
                              handleTemplateDelete(category, template.id)
                            }
                            className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                            title="Delete Template"
                          >
                            <Trash2 size={18} className="text-stone-400" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => {
                              setTemplates((prev) => ({
                                ...prev,
                                [category]: prev[category].map((t) =>
                                  t.id === template.id
                                    ? {
                                        ...t,
                                        status:
                                          t.status === "active"
                                            ? "inactive"
                                            : "active"
                                      }
                                    : t
                                )
                              }));
                            }}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              template.status === "active"
                                ? "bg-red-50 text-red-700 hover:bg-red-100"
                                : "bg-green-50 text-green-700 hover:bg-green-100"
                            }`}
                          >
                            {template.status === "active"
                              ? "Deactivate"
                              : "Activate"}{" "}
                            Template
                          </button>
                          <button
                            onClick={() => {
                              // Preview logic can be added here
                              console.log("Preview template:", template);
                            }}
                            className="px-4 py-2 bg-stone-50 text-stone-700 rounded-lg text-sm font-medium hover:bg-stone-100 transition-colors"
                          >
                            Preview Template
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            // Send test email logic can be added here
                            console.log("Send test email:", template);
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        >
                          <Send size={16} />
                          Send Test
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )
        )}
      </div>

      {/* Editor Modal */}
      {editingTemplate && (
        <TemplateEditorModal
          template={editingTemplate}
          onSave={handleTemplateSave}
          onClose={() => setEditingTemplate(null)}
        />
      )}
    </div>
  );
};

export default EmailTemplateSystem;
