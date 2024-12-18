"use client";
import React, { useState } from "react";
import { Card } from "@/src/components/utils/Card";
import Input from "@/src/components/ui/forms/Input";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import { Button } from "@/src/components/utils/Button";
import {
  TicketIcon,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Plus,
  ChevronRight,
  Edit,
  Trash2,
  XCircle,
  User,
  Calendar,
  Tag,
  Flag,
  MailOpen
} from "lucide-react";
import { colors } from "@/app/lib/constant";

// Status badge component
const StatusBadge = ({ status }) => {
  const statusStyles = {
    open: { bg: "bg-yellow-50", text: "text-yellow-700", icon: Clock },
    "in-progress": {
      bg: "bg-blue-50",
      text: "text-blue-700",
      icon: MessageSquare
    },
    resolved: { bg: "bg-green-50", text: "text-green-700", icon: CheckCircle },
    closed: { bg: "bg-stone-50", text: "text-stone-700", icon: XCircle }
  };

  const style = statusStyles[status] || statusStyles.open;
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

// Priority badge component
const PriorityBadge = ({ priority }) => {
  const priorityStyles = {
    high: { bg: "bg-red-50", text: "text-red-700" },
    medium: { bg: "bg-orange-50", text: "text-orange-700" },
    low: { bg: "bg-green-50", text: "text-green-700" }
  };

  const style = priorityStyles[priority] || priorityStyles.medium;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text}`}
    >
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
};

// Ticket creation/edit modal
const TicketModal = ({ ticket, onSave, onClose }) => {
  const [ticketData, setTicketData] = useState(
    ticket || {
      title: "",
      description: "",
      priority: "medium",
      category: "technical",
      assignedTo: "",
      email: "",
      status: "open"
    }
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl m-4">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-stone-800">
              {ticket ? "Edit Ticket" : "Create New Ticket"}
            </h2>
            <button onClick={onClose}>
              <XCircle
                size={24}
                className="text-stone-400 hover:text-stone-600"
              />
            </button>
          </div>

          <div className="space-y-4">
            <Input
              label="Title"
              inputType="text"
              inputPlaceholder="Enter ticket title"
              value={ticketData.title}
              onChange={(e) =>
                setTicketData((prev) => ({
                  ...prev,
                  title: e.target.value
                }))
              }
              required
            />

            <div className="grid grid-cols-2 gap-4">
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
                  { value: "low", label: "Low" },
                  { value: "medium", label: "Medium" },
                  { value: "high", label: "High" }
                ]}
              />

              <SelectInput
                label="Category"
                value={ticketData.category}
                onChange={(e) =>
                  setTicketData((prev) => ({
                    ...prev,
                    category: e.target.value
                  }))
                }
                options={[
                  { value: "technical", label: "Technical Support" },
                  { value: "billing", label: "Billing" },
                  { value: "account", label: "Account" },
                  { value: "feature", label: "Feature Request" }
                ]}
              />
            </div>

            <Input
              label="Contact Email"
              inputType="email"
              inputPlaceholder="Enter contact email"
              value={ticketData.email}
              onChange={(e) =>
                setTicketData((prev) => ({
                  ...prev,
                  email: e.target.value
                }))
              }
            />

            <Input
              label="Assigned To"
              inputType="text"
              inputPlaceholder="Enter agent name or email"
              value={ticketData.assignedTo}
              onChange={(e) =>
                setTicketData((prev) => ({
                  ...prev,
                  assignedTo: e.target.value
                }))
              }
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-stone-700">
                Description
              </label>
              <textarea
                value={ticketData.description}
                onChange={(e) =>
                  setTicketData((prev) => ({
                    ...prev,
                    description: e.target.value
                  }))
                }
                className="w-full h-32 p-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Enter ticket description..."
              />
            </div>

            {ticket && (
              <SelectInput
                label="Status"
                value={ticketData.status}
                onChange={(e) =>
                  setTicketData((prev) => ({
                    ...prev,
                    status: e.target.value
                  }))
                }
                options={[
                  { value: "open", label: "Open" },
                  { value: "in-progress", label: "In Progress" },
                  { value: "resolved", label: "Resolved" },
                  { value: "closed", label: "Closed" }
                ]}
              />
            )}
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                if (!ticketData.title || !ticketData.description) {
                  alert("Please fill in all required fields");
                  return;
                }
                onSave(ticketData);
              }}
              className="flex-1"
            >
              {ticket ? "Update Ticket" : "Create Ticket"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SupportTickets = () => {
  // State management
  const [tickets, setTickets] = useState([
    {
      id: "T001",
      title: "Cannot access dashboard",
      description: "Getting error when trying to access dashboard",
      priority: "high",
      category: "technical",
      status: "open",
      email: "user@example.com",
      assignedTo: "Agent Smith",
      createdAt: "2024-03-15T10:30:00",
      updatedAt: "2024-03-15T10:30:00"
    }
  ]);

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Handle ticket save
  const handleTicketSave = (ticketData) => {
    if (selectedTicket) {
      // Update existing ticket
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === selectedTicket.id
            ? {
                ...ticketData,
                id: ticket.id,
                updatedAt: new Date().toISOString()
              }
            : ticket
        )
      );
    } else {
      // Create new ticket
      setTickets((prev) => [
        ...prev,
        {
          ...ticketData,
          id: `T${String(prev.length + 1).padStart(3, "0")}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ]);
    }
    setShowTicketModal(false);
    setSelectedTicket(null);
  };

  // Filter tickets
  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus =
      filterStatus === "all" || ticket.status === filterStatus;
    const matchesPriority =
      filterPriority === "all" || ticket.priority === filterPriority;
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  // Calculate ticket statistics
  const stats = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === "open").length,
    inProgress: tickets.filter((t) => t.status === "in-progress").length,
    resolved: tickets.filter((t) => t.status === "resolved").length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stone-800">Support Tickets</h1>
          <p className="text-stone-600 mt-1">
            Manage and track support requests
          </p>
        </div>
        <Button variant="primary" onClick={() => setShowTicketModal(true)}>
          <Plus size={18} className="mr-2" />
          New Ticket
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-stone-50">
              <TicketIcon className="text-stone-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-stone-600">Total Tickets</p>
              <p className="text-xl font-semibold text-stone-800">
                {stats.total}
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
              <p className="text-sm text-stone-600">Open Tickets</p>
              <p className="text-xl font-semibold text-stone-800">
                {stats.open}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-blue-50">
              <MessageSquare className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-stone-600">In Progress</p>
              <p className="text-xl font-semibold text-stone-800">
                {stats.inProgress}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-green-50">
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-stone-600">Resolved</p>
              <p className="text-xl font-semibold text-stone-800">
                {stats.resolved}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search tickets..."
              className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <SelectInput
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={[
              { value: "all", label: "All Status" },
              { value: "open", label: "Open" },
              { value: "in-progress", label: "In Progress" },
              { value: "resolved", label: "Resolved" },
              { value: "closed", label: "Closed" }
            ]}
          />
          <SelectInput
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            options={[
              { value: "all", label: "All Priority" },
              { value: "high", label: "High" },
              { value: "medium", label: "Medium" },
              { value: "low", label: "Low" }
            ]}
          />
        </div>
      </Card>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <Card key={ticket.id} className="p-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-medium text-stone-800">
                      {ticket.title}
                    </h3>
                    <StatusBadge status={ticket.status} />
                    <PriorityBadge priority={ticket.priority} />{" "}
                    {/* Fixed: Added missing closing tag */}
                  </div>
                  <p className="text-sm text-stone-600">{ticket.description}</p>
                  <div className="flex items-center gap-4 text-sm text-stone-500">
                    <div className="flex items-center gap-1">
                      <User size={14} />
                      <span>{ticket.assignedTo || "Unassigned"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MailOpen size={14} />
                      <span>{ticket.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Tag size={14} />
                      <span>{ticket.category}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <button
                    onClick={() => {
                      setSelectedTicket(ticket);
                      setShowTicketModal(true);
                    }}
                    className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                    title="Edit Ticket"
                  >
                    <Edit size={18} className="text-stone-400" />
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this ticket?"
                        )
                      ) {
                        setTickets((prev) =>
                          prev.filter((t) => t.id !== ticket.id)
                        );
                      }
                    }}
                    className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                    title="Delete Ticket"
                  >
                    <Trash2 size={18} className="text-stone-400" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                <div className="flex items-center gap-4">
                  {ticket.status !== "resolved" &&
                    ticket.status !== "closed" && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setTickets((prev) =>
                            prev.map((t) =>
                              t.id === ticket.id
                                ? {
                                    ...t,
                                    status: "resolved",
                                    updatedAt: new Date().toISOString()
                                  }
                                : t
                            )
                          );
                        }}
                      >
                        <CheckCircle size={16} className="mr-2" />
                        Mark as Resolved
                      </Button>
                    )}
                  {ticket.status === "resolved" && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setTickets((prev) =>
                          prev.map((t) =>
                            t.id === ticket.id
                              ? {
                                  ...t,
                                  status: "closed",
                                  updatedAt: new Date().toISOString()
                                }
                              : t
                          )
                        );
                      }}
                    >
                      <XCircle size={16} className="mr-2" />
                      Close Ticket
                    </Button>
                  )}
                  {ticket.status === "open" && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setTickets((prev) =>
                          prev.map((t) =>
                            t.id === ticket.id
                              ? {
                                  ...t,
                                  status: "in-progress",
                                  updatedAt: new Date().toISOString()
                                }
                              : t
                          )
                        );
                      }}
                    >
                      <MessageSquare size={16} className="mr-2" />
                      Start Working
                    </Button>
                  )}
                </div>
                <div className="text-sm text-stone-500">
                  Last updated: {new Date(ticket.updatedAt).toLocaleString()}
                </div>
              </div>
            </div>
          </Card>
        ))}

        {filteredTickets.length === 0 && (
          <div className="text-center py-12">
            <TicketIcon size={48} className="mx-auto text-stone-300 mb-4" />
            <h3 className="text-lg font-medium text-stone-600 mb-1">
              No tickets found
            </h3>
            <p className="text-stone-500">
              {searchTerm
                ? "Try adjusting your search or filters"
                : "Create a new ticket to get started"}
            </p>
          </div>
        )}
      </div>

      {/* Ticket Modal */}
      {showTicketModal && (
        <TicketModal
          ticket={selectedTicket}
          onSave={handleTicketSave}
          onClose={() => {
            setShowTicketModal(false);
            setSelectedTicket(null);
          }}
        />
      )}

      {/* Toast Notifications (you can add these for success/error messages) */}
      {/* Example:
<Toast
  message="Ticket updated successfully!"
  type="success"
  onClose={() => setToast(null)}
/>
*/}
    </div>
  );
};

export default SupportTickets;
