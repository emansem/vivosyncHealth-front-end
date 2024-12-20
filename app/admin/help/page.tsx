"use client";

import { useState } from "react";
import { Card } from "@/src/components/utils/Card";
import { Button } from "@/src/components/utils/Button";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import SearchInput from "@/src/components/ui/forms/searchInput";
import { MessageCircle, User, Clock, AlertCircle } from "lucide-react";
import { colors } from "@/app/lib/constant";

// These options help categorize and filter tickets
const TICKET_STATUS_OPTIONS = [
  { value: "all", label: "All Tickets" },
  { value: "open", label: "Open" },
  { value: "inProgress", label: "In Progress" },
  { value: "resolved", label: "Resolved" }
];

// This component shows the status of a ticket with appropriate styling
const StatusBadge = ({ status }) => {
  const getStatusStyle = (status) => {
    const styles = {
      open: { bg: colors.secondary, text: colors.primary },
      inProgress: { bg: "#FEF3C7", text: "#D97706" },
      resolved: { bg: "#DCFCE7", text: "#059669" }
    };
    return styles[status] || styles.open;
  };

  const style = getStatusStyle(status);
  return (
    <span
      className="px-3 py-1 rounded-full text-sm font-medium"
      style={{
        backgroundColor: style.bg,
        color: style.text
      }}
    >
      {status === "inProgress"
        ? "In Progress"
        : status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Main component for the tickets page
const SupportTickets = () => {
  // State management for filters and selected ticket
  const [filterValues, setFilterValues] = useState({
    searchValue: "",
    status: "all"
  });

  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [replyText, setReplyText] = useState("");

  // Example ticket data structure
  const tickets = [
    {
      id: "TKT-001",
      userName: "Dr. Sarah Johnson",
      userType: "Doctor",
      subject: "Video Call Connection Issue",
      status: "open",
      lastMessage: "The video call keeps disconnecting during consultations.",
      timestamp: "10:30 AM",
      messages: [
        {
          id: 1,
          sender: "Dr. Sarah Johnson",
          message:
            "The video call keeps disconnecting during consultations. This is happening with every patient appointment today.",
          timestamp: "10:30 AM",
          isAdmin: false
        },
        {
          id: 2,
          sender: "Support Admin",
          message:
            "Hello Dr. Johnson, I understand you're having connection issues. Could you please confirm if this happens with all browsers you've tried?",
          timestamp: "10:35 AM",
          isAdmin: true
        }
      ]
    }
    // Add more tickets as needed
  ];

  // Handler for filter changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFilterValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler for sending replies
  const handleSendReply = () => {
    if (!replyText.trim()) return;

    // Here you would typically make an API call to save the reply
    console.log("Sending reply:", replyText);
    setReplyText("");
  };

  // Find the currently selected ticket
  const selectedTicket = tickets.find((t) => t.id === selectedTicketId);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="mb-6">
        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: colors.primary }}
        >
          Support Tickets
        </h1>
        <p style={{ color: colors.stone[600] }}>
          Manage support requests from doctors and patients
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Filters and Ticket List */}
        <div className="lg:col-span-1">
          <Card>
            <div
              className="p-4 border-b"
              style={{ borderColor: colors.stone[200] }}
            >
              <SearchInput
                name="searchValue"
                onChange={handleOnChange}
                value={filterValues.searchValue}
                placeholder="Search by ticket ID or name"
              />

              <div className="mt-4">
                <SelectInput
                  id="ticketStatus"
                  name="status"
                  label="Filter by Status"
                  value={filterValues.status}
                  options={TICKET_STATUS_OPTIONS}
                  onChange={handleOnChange}
                />
              </div>
            </div>

            {/* Ticket List */}
            <div
              className="divide-y"
              style={{ borderColor: colors.stone[200] }}
            >
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedTicketId === ticket.id
                      ? "bg-gray-50"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedTicketId(ticket.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span
                      className="text-sm font-medium"
                      style={{ color: colors.stone[500] }}
                    >
                      {ticket.id}
                    </span>
                    <StatusBadge status={ticket.status} />
                  </div>

                  <div className="mb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <User size={14} style={{ color: colors.stone[400] }} />
                      <span
                        className="font-medium"
                        style={{ color: colors.stone[700] }}
                      >
                        {ticket.userName}
                      </span>
                    </div>
                    <h3
                      className="font-medium"
                      style={{ color: colors.stone[800] }}
                    >
                      {ticket.subject}
                    </h3>
                  </div>

                  <div
                    className="flex items-center gap-2 text-sm"
                    style={{ color: colors.stone[500] }}
                  >
                    <Clock size={14} />
                    <span>{ticket.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Chat Interface */}
        <div className="lg:col-span-2">
          <Card>
            {selectedTicket ? (
              <div className="h-[calc(100vh-12rem)] flex flex-col">
                {/* Ticket Header */}
                <div
                  className="p-4 border-b"
                  style={{ borderColor: colors.stone[200] }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span
                        className="text-sm font-medium block mb-1"
                        style={{ color: colors.stone[500] }}
                      >
                        {selectedTicket.id}
                      </span>
                      <h2
                        className="text-xl font-semibold"
                        style={{ color: colors.stone[800] }}
                      >
                        {selectedTicket.subject}
                      </h2>
                    </div>
                    <StatusBadge status={selectedTicket.status} />
                  </div>

                  <div
                    className="flex items-center gap-2 text-sm"
                    style={{ color: colors.stone[600] }}
                  >
                    <User size={14} />
                    <span>
                      {selectedTicket.userName} ({selectedTicket.userType})
                    </span>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedTicket.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.isAdmin ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.isAdmin ? "bg-blue-50" : "bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="font-medium"
                            style={{ color: colors.stone[700] }}
                          >
                            {message.sender}
                          </span>
                          <span
                            className="text-sm"
                            style={{ color: colors.stone[500] }}
                          >
                            {message.timestamp}
                          </span>
                        </div>
                        <p style={{ color: colors.stone[700] }}>
                          {message.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reply Area */}
                <div
                  className="border-t p-4"
                  style={{ borderColor: colors.stone[200] }}
                >
                  <textarea
                    className="w-full p-3 rounded-lg border mb-3 resize-none"
                    style={{
                      borderColor: colors.stone[200],
                      minHeight: "100px"
                    }}
                    placeholder="Type your reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={handleSendReply}
                      disabled={!replyText.trim()}
                      className="px-6"
                      style={{
                        backgroundColor: colors.primary,
                        color: "white"
                      }}
                    >
                      Send Reply
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              // Empty state when no ticket is selected
              <div className="h-[calc(100vh-12rem)] flex items-center justify-center">
                <div
                  className="text-center"
                  style={{ color: colors.stone[500] }}
                >
                  <MessageCircle size={48} className="mx-auto mb-4" />
                  <p>Select a ticket to view the conversation</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SupportTickets;
