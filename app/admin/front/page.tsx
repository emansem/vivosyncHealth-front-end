"use client";

import { useState } from "react";
import { Card } from "@/src/components/utils/Card";
import { Button } from "@/src/components/utils/Button";
import Input from "@/src/components/ui/forms/Input";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import SearchInput from "@/src/components/ui/forms/searchInput";
import {
  MessageCircle,
  PlusCircle,
  X,
  Send,
  Clock,
  AlertCircle
} from "lucide-react";
import { colors } from "@/app/lib/constant";

// Constants for ticket creation and management
const TICKET_CATEGORIES = [
  { value: "technical", label: "Technical Issue" },
  { value: "billing", label: "Billing Question" },
  { value: "account", label: "Account Management" },
  { value: "other", label: "Other" }
];

// Status badge component with color coding
const StatusBadge = ({ status }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case "open":
        return { bg: colors.secondary, text: colors.primary };
      case "inProgress":
        return { bg: "#FEF3C7", text: "#D97706" };
      case "resolved":
        return { bg: "#DCFCE7", text: "#059669" };
      default:
        return { bg: colors.stone[200], text: colors.stone[600] };
    }
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

// New Ticket Modal Component
const NewTicketModal = ({ onClose, onSubmit }) => {
  const [ticketData, setTicketData] = useState({
    subject: "",
    category: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(ticketData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2
              className="text-xl font-semibold"
              style={{ color: colors.stone[800] }}
            >
              Create New Support Ticket
            </h2>
            <button onClick={onClose} className="p-1">
              <X size={20} style={{ color: colors.stone[500] }} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Subject"
              name="subject"
              inputType="text"
              value={ticketData.subject}
              onChange={(e) =>
                setTicketData((prev) => ({
                  ...prev,
                  subject: e.target.value
                }))
              }
              required
            />

            <SelectInput
              id="category"
              name="category"
              label="Category"
              value={ticketData.category}
              options={TICKET_CATEGORIES}
              onChange={(e) =>
                setTicketData((prev) => ({
                  ...prev,
                  category: e.target.value
                }))
              }
            />

            <div>
              <label
                className="block mb-2 font-medium"
                style={{ color: colors.stone[700] }}
              >
                Message
              </label>
              <textarea
                className="w-full p-3 rounded-lg border"
                style={{
                  borderColor: colors.stone[200],
                  minHeight: "150px"
                }}
                value={ticketData.message}
                onChange={(e) =>
                  setTicketData((prev) => ({
                    ...prev,
                    message: e.target.value
                  }))
                }
                required
              />
            </div>

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
                type="submit"
                style={{
                  backgroundColor: colors.primary,
                  color: "white"
                }}
              >
                Submit Ticket
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

// Main Support Interface Component
const UserSupportInterface = () => {
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [searchValue, setSearchValue] = useState("");

  // Example tickets data - would normally come from API
  const tickets = [
    {
      id: "TKT-001",
      subject: "Video Call Issues",
      category: "technical",
      status: "open",
      lastUpdate: "2 hours ago",
      messages: [
        {
          id: 1,
          sender: "You",
          message:
            "I'm having trouble with the video call feature. The screen keeps freezing.",
          timestamp: "10:30 AM",
          isUser: true
        },
        {
          id: 2,
          sender: "Support Team",
          message:
            "Hello! Could you please tell us which browser you're using?",
          timestamp: "10:35 AM",
          isUser: false
        }
      ]
    }
  ];

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId);

  const handleNewTicket = (ticketData) => {
    // Here you would typically make an API call to create the ticket
    console.log("Creating new ticket:", ticketData);
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    // Here you would typically make an API call to send the reply
    console.log("Sending reply:", replyText);
    setReplyText("");
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: colors.primary }}
          >
            Support Center
          </h1>
          <p style={{ color: colors.stone[600] }}>
            Get help with any issues or questions you have
          </p>
        </div>
        <Button
          onClick={() => setShowNewTicketModal(true)}
          style={{
            backgroundColor: colors.primary,
            color: "white"
          }}
          className="flex items-center gap-2"
        >
          <PlusCircle size={20} />
          New Ticket
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tickets List */}
        <div className="lg:col-span-1">
          <Card>
            <div
              className="p-4 border-b"
              style={{ borderColor: colors.stone[200] }}
            >
              <SearchInput
                name="searchValue"
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                placeholder="Search your tickets"
              />
            </div>

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

                  <h3
                    className="font-medium mb-2"
                    style={{ color: colors.stone[800] }}
                  >
                    {ticket.subject}
                  </h3>

                  <div
                    className="flex items-center gap-2 text-sm"
                    style={{ color: colors.stone[500] }}
                  >
                    <Clock size={14} />
                    <span>Last updated {ticket.lastUpdate}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Chat Interface */}
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
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedTicket.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.isUser ? "bg-blue-50" : "bg-gray-50"
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
                  <div className="flex gap-2">
                    <textarea
                      className="flex-1 p-3 rounded-lg border resize-none"
                      style={{
                        borderColor: colors.stone[200],
                        minHeight: "50px"
                      }}
                      placeholder="Type your message..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <Button
                      onClick={handleSendReply}
                      disabled={!replyText.trim()}
                      style={{
                        backgroundColor: colors.primary,
                        color: "white"
                      }}
                    >
                      <Send size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
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

      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <NewTicketModal
          onClose={() => setShowNewTicketModal(false)}
          onSubmit={handleNewTicket}
        />
      )}
    </div>
  );
};

export default UserSupportInterface;
