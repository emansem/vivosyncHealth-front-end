"use client";

import React from "react";
import { Card } from "@/src/components/utils/Card";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import { Button } from "@/src/components/utils/Button";

// Types for our component
interface TicketResponse {
  id: string;
  content: string;
  created_at: string;
  user_name: string;
  user_type: "admin" | "user";
  attachments?: Array<{
    name: string;
    url: string;
  }>;
}

interface TicketDetails {
  id: string;
  title: string;
  status: string;
  priority: string;
  category: string;
  created_at: string;
  description: string;
  user_name: string;
  responses: TicketResponse[];
}

// Sample data for demonstration
const DEMO_TICKET: TicketDetails = {
  id: "TKT-2024-001",
  title: "Unable to access patient records",
  status: "open",
  priority: "high",
  category: "Technical",
  created_at: "2024-02-15T10:30:00",
  description:
    "Getting error 404 when trying to access patient history. This is preventing me from viewing critical patient information.",
  user_name: "Dr. Smith",
  responses: [
    {
      id: "RSP-001",
      content:
        "Thank you for reporting this issue. Could you please provide your browser version and a screenshot of the error?",
      created_at: "2024-02-15T11:00:00",
      user_name: "Support Team",
      user_type: "admin"
    },
    {
      id: "RSP-002",
      content:
        "I'm using Chrome version 121.0.6167.160. Here's the screenshot of the error.",
      created_at: "2024-02-15T11:30:00",
      user_name: "Dr. Smith",
      user_type: "user",
      attachments: [
        {
          name: "error-screenshot.png",
          url: "#"
        }
      ]
    }
  ]
};

const TicketResponsePage = () => {
  // State for managing response input and attachments
  const [response, setResponse] = React.useState("");
  const [attachments, setAttachments] = React.useState<File[]>([]);
  const [newStatus, setNewStatus] = React.useState(DEMO_TICKET.status);
  const [newPriority, setNewPriority] = React.useState(DEMO_TICKET.priority);

  // Function to format dates consistently
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // Handler for sending the response
  const handleSendResponse = () => {
    // Here you would typically make an API call to submit the response
    console.log("Sending response:", { response, attachments });
  };

  // Handler for clearing the form
  const handleClearForm = () => {
    setResponse("");
    setAttachments([]);
  };

  return (
    <div className="min-h-screen bg-stone-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Ticket Overview Card */}
        <Card className="mb-6">
          <div className="p-4 md:p-6">
            {/* Header with Actions */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <div>
                <h1 className="text-xl md:text-2xl font-semibold text-stone-800 mb-2">
                  {DEMO_TICKET.title}
                </h1>
                <div className="flex flex-wrap gap-2 text-sm text-stone-500">
                  <span>{DEMO_TICKET.id}</span>
                  <span>•</span>
                  <span>{DEMO_TICKET.user_name}</span>
                  <span>•</span>
                  <span>{formatDate(DEMO_TICKET.created_at)}</span>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={() => {}}
                className="text-stone-600 border-stone-300"
              >
                Back to Dashboard
              </Button>
            </div>

            {/* Ticket Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <SelectInput
                label="Status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                options={[
                  { value: "open", label: "Open" },
                  { value: "pending", label: "Pending" },
                  { value: "closed", label: "Closed" }
                ]}
                id="ticket-status"
                name="ticket-status"
              />

              <SelectInput
                label="Priority"
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
                options={[
                  { value: "high", label: "High" },
                  { value: "medium", label: "Medium" },
                  { value: "low", label: "Low" }
                ]}
                id="ticket-priority"
                name="ticket-priority"
              />
            </div>

            {/* Original Description */}
            <div className="bg-stone-50 rounded-lg p-4">
              <h3 className="font-medium text-stone-800 mb-2">
                Original Description
              </h3>
              <p className="text-stone-600 whitespace-pre-wrap">
                {DEMO_TICKET.description}
              </p>
            </div>
          </div>
        </Card>

        {/* Conversation Thread */}
        <div className="space-y-4 mb-6">
          {DEMO_TICKET.responses.map((response) => (
            <Card
              key={response.id}
              className={`${
                response.user_type === "admin"
                  ? "border-l-4 border-l-[#269c65]"
                  : ""
              }`}
            >
              <div className="p-4 md:p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-stone-800">
                      {response.user_name}
                    </span>
                    {response.user_type === "admin" && (
                      <span className="bg-[#e8f5e9] text-[#269c65] text-xs px-2 py-1 rounded">
                        Support Team
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-stone-500">
                    {formatDate(response.created_at)}
                  </span>
                </div>

                <p className="text-stone-600 whitespace-pre-wrap mb-4">
                  {response.content}
                </p>

                {response.attachments && response.attachments.length > 0 && (
                  <div className="mt-3">
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
              </div>
            </Card>
          ))}
        </div>

        {/* Response Form */}
        <Card className="mb-6">
          <div className="p-4 md:p-6">
            <h3 className="font-medium text-stone-800 mb-4">Add Response</h3>

            <div className="mb-4">
              <textarea
                id="response-content"
                name="response-content"
                rows={4}
                className="w-full px-3 py-2 border border-stone-300 rounded-md shadow-sm 
                  focus:outline-none focus:ring-2 focus:ring-[#269c65] focus:border-transparent resize-none"
                placeholder="Type your response..."
                value={response}
                onChange={(e) => setResponse(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Attachments
              </label>
              <input
                type="file"
                id="response-attachments"
                name="response-attachments"
                multiple
                onChange={(e) =>
                  setAttachments(Array.from(e.target.files || []))
                }
                className="block w-full text-sm text-stone-500 
                  file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 
                  file:text-sm file:font-medium file:bg-[#e8f5e9] file:text-[#269c65] 
                  hover:file:bg-[#c8e6c9]"
              />
            </div>

            <div className="flex flex-col md:flex-row justify-end gap-3">
              <Button
                variant="outline"
                onClick={handleClearForm}
                className="w-full md:w-auto text-stone-600 border-stone-300"
              >
                Clear
              </Button>
              <Button
                variant="primary"
                onClick={handleSendResponse}
                className="w-full md:w-auto bg-[#269c65] hover:bg-[#1a724a]"
              >
                Send Response
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TicketResponsePage;
