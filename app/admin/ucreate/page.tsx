"use client";

import React from "react";
import { Card } from "@/src/components/utils/Card";
import Input from "@/src/components/ui/forms/Input";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import { Button } from "@/src/components/utils/Button";
import { colors } from "@/app/lib/constant";

// This interface defines the structure of our ticket data
interface TicketFormData {
  title: string;
  category: string;
  priority: string;
  description: string;
  attachments?: File[];
}

// Props interface for our CreateTicket component
interface CreateTicketProps {
  onSubmit: (ticketData: TicketFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: Partial<TicketFormData>;
}

const DEMO_CATEGORIES = [
  { value: "technical", label: "Technical Support" },
  { value: "billing", label: "Billing & Payments" },
  { value: "account", label: "Account Management" },
  { value: "general", label: "General Inquiry" }
];

const CreateTicketPage = ({
  onSubmit = (data) => console.log("Ticket submitted:", data),
  onCancel = () => console.log("Creation cancelled"),
  isLoading = false,
  initialData = {
    title: "",
    category: "",
    priority: "",
    description: ""
  }
}: CreateTicketProps) => {
  // Using state to manage form data
  const [ticketData, setTicketData] = React.useState<TicketFormData>({
    title: initialData.title || "",
    category: initialData.category || "",
    priority: initialData.priority || "",
    description: initialData.description || "",
    attachments: []
  });

  // Error state management for form validation
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof TicketFormData, string>>
  >({});

  // Handle form validation
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TicketFormData, string>> = {};

    if (!ticketData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!ticketData.category) {
      newErrors.category = "Category is required";
    }
    if (!ticketData.priority) {
      newErrors.priority = "Priority is required";
    }
    if (!ticketData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(ticketData);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <Card className="p-6">
        {/* Form Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-stone-800 mb-2">
            Create Support Ticket
          </h1>
          <p className="text-stone-500">
            Please provide detailed information about your issue to help us
            assist you better
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="mb-6">
            <Input
              label="Ticket Title"
              inputType="text"
              inputPlaceholder="Brief description of your issue"
              value={ticketData.title}
              onChange={(e) =>
                setTicketData((prev) => ({
                  ...prev,
                  title: e.target.value
                }))
              }
              required
              error={errors.title}
              id="ticket-title"
              name="ticket-title"
              className="w-full"
            />
            {errors.title && (
              <span className="text-red-500 text-sm mt-1">{errors.title}</span>
            )}
          </div>

          {/* Category and Priority Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <SelectInput
                label="Category"
                value={ticketData.category}
                onChange={(e) =>
                  setTicketData((prev) => ({
                    ...prev,
                    category: e.target.value
                  }))
                }
                options={DEMO_CATEGORIES}
                error={errors.category}
                id="ticket-category"
                name="ticket-category"
              />
              {errors.category && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.category}
                </span>
              )}
            </div>

            <div>
              <SelectInput
                label="Priority"
                value={ticketData.priority}
                onChange={(e) =>
                  setTicketData((prev) => ({
                    ...prev,
                    priority: e.target.value
                  }))
                }
                options={[
                  { value: "low", label: "Low - General inquiry" },
                  { value: "medium", label: "Medium - Minor issue" },
                  { value: "high", label: "High - Critical problem" }
                ]}
                error={errors.priority}
                id="ticket-priority"
                name="ticket-priority"
              />
              {errors.priority && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.priority}
                </span>
              )}
            </div>
          </div>

          {/* Description Textarea */}
          <div className="mb-6">
            <label
              className="block text-stone-700 text-sm font-medium mb-2"
              htmlFor="ticket-description"
            >
              Description
            </label>
            <textarea
              id="ticket-description"
              name="ticket-description"
              rows={6}
              className={`w-full px-3 py-2 border ${
                errors.description ? "border-red-500" : "border-stone-300"
              } 
                rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[${
                  colors.primary
                }] 
                focus:border-transparent resize-none`}
              placeholder="Please provide as much detail as possible about your issue..."
              value={ticketData.description}
              onChange={(e) =>
                setTicketData((prev) => ({
                  ...prev,
                  description: e.target.value
                }))
              }
            />
            {errors.description && (
              <span className="text-red-500 text-sm mt-1">
                {errors.description}
              </span>
            )}
          </div>

          {/* File Attachment Section */}
          <div className="mb-8">
            <label
              className="block text-stone-700 text-sm font-medium mb-2"
              htmlFor="ticket-attachments"
            >
              Attachments (Optional)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-stone-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-stone-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-stone-600">
                  <label
                    htmlFor="ticket-attachments"
                    className="relative cursor-pointer rounded-md font-medium text-[${colors.primary}] hover:text-[#1a724a] focus-within:outline-none"
                  >
                    <span>Upload files</span>
                    <input
                      id="ticket-attachments"
                      name="ticket-attachments"
                      type="file"
                      className="sr-only"
                      multiple
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        setTicketData((prev) => ({
                          ...prev,
                          attachments: files
                        }));
                      }}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-stone-500">
                  PNG, JPG, PDF up to 10MB each
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
            <Button
              variant="outline"
              onClick={onCancel}
              type="button"
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              className={`w-full sm:w-auto bg-[${
                colors.primary
              }] hover:bg-[#1a724a] ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Ticket"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateTicketPage;
