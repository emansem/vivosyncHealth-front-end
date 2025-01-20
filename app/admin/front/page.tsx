"use client";

import React from "react";
import { Card } from "@/src/components/utils/Card";
import Input from "@/src/components/ui/forms/Input";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import { Button } from "@/src/components/utils/Button";

interface TicketDashboardProps {
  tickets: Array<{
    id: string;
    title: string;
    status: string;
    priority: string;
    created_at: string;
    last_updated: string;
    category: string;
  }>;
  onFilterChange: (filters: unknown) => void;
  onClearFilter: () => void;
  currentFilters: {
    status: string;
    priority: string;
    searchQuery: string;
  };
  onTicketClick: (ticketId: string) => void;
}

const UserSupportDashboard = ({
  tickets,
  onFilterChange,
  onClearFilter,
  currentFilters,
  onTicketClick
}: TicketDashboardProps) => {
  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  // Helper function for priority color
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

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-semibold text-stone-800">
          Support Tickets
        </h1>
        <Button
          variant="primary"
          onClick={() => onTicketClick("new")}
          className="w-full md:w-auto"
        >
          Create New Ticket
        </Button>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
        <div className="md:col-span-6">
          <Input
            label=""
            inputType="text"
            inputPlaceholder="Search tickets..."
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
              { value: "", label: "Filter by Status" },
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
              { value: "", label: "Filter by Priority" },
              { value: "high", label: "High" },
              { value: "medium", label: "Medium" },
              { value: "low", label: "Low" }
            ]}
          />
        </div>
      </div>

      {/* Clear Filters Button */}
      {(currentFilters.status ||
        currentFilters.priority ||
        currentFilters.searchQuery) && (
        <Button onClick={onClearFilter} variant="outline" className="mb-6">
          Clear Filters
        </Button>
      )}

      {/* Tickets List */}
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <Card
            key={ticket.id}
            // onClick={() => onTicketClick(ticket.id)}
            className="cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="p-4">
              <div className="flex flex-col md:flex-row justify-between mb-3">
                <div className="flex flex-wrap gap-2 items-center mb-2 md:mb-0">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(
                      ticket.priority
                    )}`}
                  >
                    {ticket.priority.toUpperCase()}
                  </span>
                  <span className="text-sm text-stone-500">#{ticket.id}</span>
                </div>
                <div className="text-sm text-stone-500">
                  Created: {formatDate(ticket.created_at)}
                </div>
              </div>

              <h3 className="font-medium text-stone-800 mb-2">
                {ticket.title}
              </h3>

              <div className="flex flex-wrap gap-4 text-sm">
                <span className="text-stone-500">
                  Category: {ticket.category}
                </span>
                <span
                  className={`${
                    ticket.status === "open"
                      ? "text-green-600"
                      : ticket.status === "closed"
                      ? "text-stone-500"
                      : "text-yellow-600"
                  }`}
                >
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
        <div className="text-center py-12">
          <p className="text-stone-500 mb-4">No tickets found</p>
          <Button variant="primary" onClick={() => onTicketClick("new")}>
            Create Your First Ticket
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserSupportDashboard;
