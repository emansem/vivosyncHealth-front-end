"use client";

import React from "react";
import { Card } from "@/src/components/utils/Card";
import Input from "@/src/components/ui/forms/Input";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import { Button } from "@/src/components/utils/Button";
import { colors } from "@/app/lib/constant";

// Sample data to demonstrate the dashboard
const DEMO_TICKETS = [
  {
    id: "TKT-2024-001",
    title: "Unable to access patient records",
    status: "open",
    priority: "high",
    created_at: "2024-02-15T10:30:00",
    last_updated: "2024-02-15T14:20:00",
    category: "Technical Support",
    description: "Getting error 404 when trying to access patient history"
  },
  {
    id: "TKT-2024-002",
    title: "Billing system showing incorrect amounts",
    status: "pending",
    priority: "medium",
    created_at: "2024-02-14T09:15:00",
    last_updated: "2024-02-15T11:45:00",
    category: "Billing",
    description: "Insurance calculations seem incorrect"
  },
  {
    id: "TKT-2024-003",
    title: "Need help with appointment scheduling",
    status: "closed",
    priority: "low",
    created_at: "2024-02-13T15:20:00",
    last_updated: "2024-02-14T10:30:00",
    category: "General",
    description: "Calendar sync issues resolved"
  }
];

// Demo filter state
const DEMO_FILTERS = {
  status: "",
  priority: "",
  searchQuery: ""
};

interface TicketDashboardProps {
  tickets?: Array<{
    id: string;
    title: string;
    status: string;
    priority: string;
    created_at: string;
    last_updated: string;
    category: string;
    description: string;
  }>;
  onFilterChange?: (filters: unknown) => void;
  onClearFilter?: () => void;
  currentFilters?: {
    status: string;
    priority: string;
    searchQuery: string;
  };
  onTicketClick?: (ticketId: string) => void;
}

const UserSupportDashboard = ({
  tickets = DEMO_TICKETS,
  onFilterChange = () => console.log("Filter changed"),
  onClearFilter = () => console.log("Filters cleared"),
  currentFilters = DEMO_FILTERS,
  onTicketClick = (id) => console.log("Ticket clicked:", id)
}: TicketDashboardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return `text-[${colors.primary}]`;
      case "closed":
        return "text-stone-500";
      case "pending":
        return "text-yellow-600";
      default:
        return "text-stone-500";
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header with Create Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-stone-800">
            Support Dashboard
          </h1>
          <p className="text-stone-500 mt-1">
            Manage and track your support tickets
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => onTicketClick("new")}
          className="w-full md:w-auto bg-[#269c65] hover:bg-[#1a724a]"
        >
          Create New Ticket
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Tickets", value: tickets.length },
          {
            label: "Open Tickets",
            value: tickets.filter((t) => t.status === "open").length
          },
          {
            label: "Pending",
            value: tickets.filter((t) => t.status === "pending").length
          },
          {
            label: "Closed",
            value: tickets.filter((t) => t.status === "closed").length
          }
        ].map((stat, index) => (
          <Card key={index} className="p-4">
            <h3 className="text-stone-500 text-sm">{stat.label}</h3>
            <p className="text-2xl font-semibold text-stone-800">
              {stat.value}
            </p>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
        <div className="md:col-span-6">
          <Input
            label=""
            inputType="text"
            inputPlaceholder="Search by ticket ID or title..."
            value={currentFilters.searchQuery}
            onChange={(e) =>
              onFilterChange({
                ...currentFilters,
                searchQuery: e.target.value
              })
            }
          />
        </div>
        <div className="md:col-span-3">
          <SelectInput
            id=""
            label=""
            value={currentFilters.status}
            onChange={(e) =>
              onFilterChange({
                ...currentFilters,
                status: e.target.value
              })
            }
            options={[
              { value: "", label: "All Statuses" },
              { value: "open", label: "Open" },
              { value: "closed", label: "Closed" },
              { value: "pending", label: "Pending" }
            ]}
          />
        </div>
        <div className="md:col-span-3">
          <SelectInput
            id=""
            label=""
            value={currentFilters.priority}
            onChange={(e) =>
              onFilterChange({
                ...currentFilters,
                priority: e.target.value
              })
            }
            options={[
              { value: "", label: "All Priorities" },
              { value: "high", label: "High" },
              { value: "medium", label: "Medium" },
              { value: "low", label: "Low" }
            ]}
          />
        </div>
      </div>

      {/* Active Filters */}
      {(currentFilters.status ||
        currentFilters.priority ||
        currentFilters.searchQuery) && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {currentFilters.status && (
              <span className="bg-stone-100 text-stone-800 px-3 py-1 rounded-full text-sm">
                Status: {currentFilters.status}
              </span>
            )}
            {currentFilters.priority && (
              <span className="bg-stone-100 text-stone-800 px-3 py-1 rounded-full text-sm">
                Priority: {currentFilters.priority}
              </span>
            )}
            {currentFilters.searchQuery && (
              <span className="bg-stone-100 text-stone-800 px-3 py-1 rounded-full text-sm">
                Search: {currentFilters.searchQuery}
              </span>
            )}
          </div>
          <Button
            onClick={onClearFilter}
            variant="outline"
            className="text-stone-600 border-stone-300 hover:bg-stone-50"
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Tickets List */}
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <Card
            key={ticket.id}
            // onClick={() => onTicketClick(ticket.id)}
            className="cursor-pointer hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-4">
              <div className="flex flex-col md:flex-row justify-between mb-3">
                <div className="flex flex-wrap gap-2 items-center mb-2 md:mb-0">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                      ticket.priority
                    )}`}
                  >
                    {ticket.priority.toUpperCase()}
                  </span>
                  <span className="text-sm text-stone-500 font-mono">
                    #{ticket.id}
                  </span>
                </div>
                <div className="text-sm text-stone-500">
                  Created: {formatDate(ticket.created_at)}
                </div>
              </div>

              <h3 className="font-medium text-stone-800 mb-2 text-lg">
                {ticket.title}
              </h3>
              <p className="text-stone-600 mb-3 line-clamp-2">
                {ticket.description}
              </p>

              <div className="flex flex-wrap gap-4 text-sm">
                <span className="text-stone-500">
                  Category: {ticket.category}
                </span>
                <span className={getStatusStyle(ticket.status)}>
                  Status:{" "}
                  {ticket.status.charAt(0).toUpperCase() +
                    ticket.status.slice(1)}
                </span>
                <span className="text-stone-500">
                  Last Updated: {formatDate(ticket.last_updated)}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {tickets.length === 0 && (
        <div className="text-center py-12 bg-stone-50 rounded-lg">
          <h3 className="text-lg font-medium text-stone-800 mb-2">
            No Tickets Found
          </h3>
          <p className="text-stone-500 mb-4">
            Create your first support ticket to get started
          </p>
          <Button
            variant="primary"
            onClick={() => onTicketClick("new")}
            className="bg-[#269c65] hover:bg-[#1a724a]"
          >
            Create Your First Ticket
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserSupportDashboard;
