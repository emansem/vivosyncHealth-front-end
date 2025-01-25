"use client";

import React from "react";
import { Card } from "@/src/components/utils/Card";
import Input from "@/src/components/ui/forms/Input";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import { Button } from "@/src/components/utils/Button";

// Type definitions for ticket response data structure
interface TicketResponse {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  user_name: string;
  user_type: "admin" | "user";
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
  }>;
}

// Type definition for the complete ticket details
interface TicketDetails {
  id: string;
  title: string;
  status: "open" | "closed" | "pending";
  priority: "high" | "medium" | "low";
  category: string;
  created_at: string;
  last_updated: string;
  description: string;
  responses: TicketResponse[];
}

// Props interface for the TicketResponsePage component
interface TicketResponsePageProps {
  ticketDetails: TicketDetails;
  onResponseSubmit: (content: string, attachments?: File[]) => void;
  onStatusChange: (newStatus: string) => void;
  onPriorityChange: (newPriority: string) => void;
  isAdmin?: boolean;
  currentUserId: string;
  isLoading?: boolean;
}

// Demo data for development and testing purposes
const DEMO_TICKET: TicketDetails = {
  id: "TKT-2024-001",
  title: "Unable to access patient records",
  status: "open",
  priority: "high",
  category: "Technical Support",
  created_at: "2024-02-15T10:30:00",
  last_updated: "2024-02-15T14:20:00",
  description:
    "Getting error 404 when trying to access patient history. This is preventing me from viewing critical patient information.",
  responses: [
    {
      id: "RSP-001",
      content:
        "Thank you for reporting this issue. Could you please provide your browser version and screenshot of the error?",
      created_at: "2024-02-15T11:00:00",
      user_id: "ADMIN-001",
      user_name: "Support Team",
      user_type: "admin"
    },
    {
      id: "RSP-002",
      content:
        "I'm using Chrome version 121.0.6167.160. Here's the screenshot of the error.",
      created_at: "2024-02-15T11:30:00",
      user_id: "USR-001",
      user_name: "Dr. Smith",
      user_type: "user",
      attachments: [
        {
          name: "error-screenshot.png",
          url: "#",
          type: "image/png"
        }
      ]
    }
  ]
};

/**
 * TicketResponsePage Component
 *
 * A comprehensive ticket management interface that displays ticket details,
 * conversation history, and allows users to submit responses with attachments.
 * Administrators have additional controls for managing ticket status and priority.
 */
const TicketResponsePage = ({
  ticketDetails = DEMO_TICKET,
  onResponseSubmit = (content) => console.log("Response submitted:", content),
  onStatusChange = (status) => console.log("Status changed:", status),
  onPriorityChange = (priority) => console.log("Priority changed:", priority),
  isAdmin = false,
  currentUserId = "USR-001",
  isLoading = false
}: TicketResponsePageProps) => {
  // State management for form inputs and validation
  const [newResponse, setNewResponse] = React.useState("");
  const [attachments, setAttachments] = React.useState<File[]>([]);
  const [error, setError] = React.useState("");

  /**
   * Formats a date string into a localized, human-readable format
   */
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  /**
   * Handles the submission of new responses
   * Validates input and clears form after successful submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResponse.trim()) {
      setError("Response cannot be empty");
      return;
    }
    onResponseSubmit(newResponse, attachments);
    setNewResponse("");
    setAttachments([]);
    setError("");
  };

  // Define commonly used style classes
  const primaryButtonClass = "bg-[#269c65] hover:bg-[#1a724a]";
  const adminBadgeClass = "bg-[#269c65] text-white text-xs px-2 py-1 rounded";

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Ticket Header Section */}
      <Card className="mb-6">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            {/* Ticket Title and ID */}
            <div>
              <h1 className="text-2xl font-semibold text-stone-800 mb-2">
                {ticketDetails.title}
              </h1>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="text-stone-500">#{ticketDetails.id}</span>
                <span className="text-stone-500">•</span>
                <span className="text-stone-500">{ticketDetails.category}</span>
              </div>
            </div>

            {/* Admin Controls */}
            {isAdmin && (
              <div className="flex gap-4 mt-4 md:mt-0">
                <SelectInput
                  label="Status"
                  value={ticketDetails.status}
                  onChange={(e) => onStatusChange(e.target.value)}
                  options={[
                    { value: "open", label: "Open" },
                    { value: "pending", label: "Pending" },
                    { value: "closed", label: "Closed" }
                  ]}
                  id="ticket-status"
                  name="ticket-status"
                  className="w-32"
                />
                <SelectInput
                  label="Priority"
                  value={ticketDetails.priority}
                  onChange={(e) => onPriorityChange(e.target.value)}
                  options={[
                    { value: "high", label: "High" },
                    { value: "medium", label: "Medium" },
                    { value: "low", label: "Low" }
                  ]}
                  id="ticket-priority"
                  name="ticket-priority"
                  className="w-32"
                />
              </div>
            )}
          </div>

          {/* Ticket Description */}
          <div className="bg-stone-50 rounded-lg p-4 mb-4">
            <p className="text-stone-600 whitespace-pre-wrap">
              {ticketDetails.description}
            </p>
            <div className="mt-3 text-sm text-stone-500">
              Created on {formatDate(ticketDetails.created_at)}
            </div>
          </div>
        </div>
      </Card>

      {/* Response History Section */}
      <div className="space-y-4 mb-6">
        {ticketDetails.responses.map((response) => (
          <Card
            key={response.id}
            className={`p-6 ${
              response.user_id === currentUserId ? "bg-[#e8f5e9]" : ""
            }`}
          >
            {/* Response Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="font-medium text-stone-800">
                  {response.user_name}
                </span>
                <span className="ml-2 text-sm text-stone-500">
                  {formatDate(response.created_at)}
                </span>
              </div>
              {response.user_type === "admin" && (
                <span className={adminBadgeClass}>Support Team</span>
              )}
            </div>

            {/* Response Content */}
            <p className="text-stone-600 whitespace-pre-wrap mb-4">
              {response.content}
            </p>

            {/* Attachments Section */}
            {response.attachments && response.attachments.length > 0 && (
              <div className="mt-3">
                <h4 className="text-sm font-medium text-stone-700 mb-2">
                  Attachments:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {response.attachments.map((file, index) => (
                    <a
                      key={index}
                      href={file.url}
                      className="flex items-center gap-2 text-sm text-[#269c65] hover:text-[#1a724a] bg-white px-3 py-2 rounded border border-stone-200"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        />
                      </svg>
                      {file.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* New Response Form */}
      {ticketDetails.status !== "closed" && (
        <Card className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Response Text Area */}
            <div className="mb-4">
              <label
                className="block text-stone-700 text-sm font-medium mb-2"
                htmlFor="response-content"
              >
                Your Response
              </label>
              <textarea
                id="response-content"
                name="response-content"
                rows={4}
                className={`w-full px-3 py-2 border ${
                  error ? "border-red-500" : "border-stone-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#269c65] focus:border-transparent resize-none`}
                placeholder="Type your response here..."
                value={newResponse}
                onChange={(e) => {
                  setNewResponse(e.target.value);
                  if (error) setError("");
                }}
              />
              {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>

            {/* File Attachment Input */}
            <div className="mb-4">
              <label
                className="block text-stone-700 text-sm font-medium mb-2"
                htmlFor="response-attachments"
              >
                Attachments (Optional)
              </label>
              <input
                type="file"
                id="response-attachments"
                name="response-attachments"
                multiple
                onChange={(e) =>
                  setAttachments(Array.from(e.target.files || []))
                }
                className="block w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#e8f5e9] file:text-[#269c65] hover:file:bg-[#c8e6c9]"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                className={`${primaryButtonClass} ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Response"}
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};

export default TicketResponsePage;
