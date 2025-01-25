"use client";

import React from "react";
import { Card } from "@/src/components/utils/Card";
import Input from "@/src/components/ui/forms/Input";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import { Button } from "@/src/components/utils/Button";
import { colors } from "@/app/lib/constant";

interface TicketData {
  id: string;
  title: string;
  status: string;
  priority: string;
  category: string;
  created_at: string;
  user_name: string;
  response_count: number;
  sla_status: "within" | "warning" | "breached";
}

const DEMO_TICKETS: TicketData[] = [
  {
    id: "TKT-2024-001",
    title: "Unable to access patient records",
    status: "open",
    priority: "high",
    category: "Technical",
    created_at: "2024-02-15T10:30:00",
    user_name: "Dr. Smith",
    response_count: 2,
    sla_status: "within"
  },
  {
    id: "TKT-2024-002",
    title: "Billing system error",
    status: "pending",
    priority: "medium",
    category: "Billing",
    created_at: "2024-02-14T09:15:00",
    user_name: "Jane Doe",
    response_count: 1,
    sla_status: "warning"
  }
];

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");
  const [priorityFilter, setPriorityFilter] = React.useState("");
  const [tickets, setTickets] = React.useState(DEMO_TICKETS);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    setTickets((currentTickets) =>
      currentTickets.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
      )
    );
  };

  const handleViewDetails = (ticketId: string) => {
    console.log(`Navigating to ticket ${ticketId}`);
  };

  const filteredTickets = React.useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesSearch =
        searchQuery === "" ||
        ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.user_name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "" || ticket.status === statusFilter;
      const matchesPriority =
        priorityFilter === "" || ticket.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tickets, searchQuery, statusFilter, priorityFilter]);

  const stats = React.useMemo(
    () => ({
      openTickets: tickets.filter((t) => t.status === "open").length,
      highPriority: tickets.filter((t) => t.priority === "high").length,
      responseRate: "98%",
      avgResponse: "2.3h"
    }),
    [tickets]
  );

  return (
    <div className="min-h-screen bg-stone-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-stone-800">
            Support Dashboard
          </h1>
          <p className="text-stone-500 mt-2 text-lg">
            Manage and track support tickets
          </p>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <Card className="p-4 md:p-6">
            <h3 className="text-stone-500 text-sm md:text-base">
              Open Tickets
            </h3>
            <p
              className="text-2xl md:text-3xl font-semibold mt-2"
              style={{ color: colors.primary }}
            >
              {stats.openTickets}
            </p>
          </Card>

          <Card className="p-4 md:p-6">
            <h3 className="text-stone-500 text-sm md:text-base">
              High Priority
            </h3>
            <p className="text-2xl md:text-3xl font-semibold mt-2 text-red-600">
              {stats.highPriority}
            </p>
          </Card>

          <Card className="p-4 md:p-6">
            <h3 className="text-stone-500 text-sm md:text-base">
              Response Rate
            </h3>
            <p className="text-2xl md:text-3xl font-semibold mt-2 text-blue-600">
              {stats.responseRate}
            </p>
          </Card>

          <Card className="p-4 md:p-6">
            <h3 className="text-stone-500 text-sm md:text-base">
              Average Response
            </h3>
            <p className="text-2xl md:text-3xl font-semibold mt-2 text-green-600">
              {stats.avgResponse}
            </p>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4 lg:space-y-0 lg:flex lg:gap-6">
          <div className="flex-1">
            <Input
              label="Search Tickets"
              inputType="text"
              inputPlaceholder="Search by title, ID, or user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              id="search-tickets"
              name="search-tickets"
            />
          </div>

          <div className="w-full lg:w-56">
            <SelectInput
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "", label: "All Statuses" },
                { value: "open", label: "Open" },
                { value: "pending", label: "Pending" },
                { value: "closed", label: "Closed" }
              ]}
              id="status-filter"
              name="status-filter"
            />
          </div>

          <div className="w-full lg:w-56">
            <SelectInput
              label="Priority"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              options={[
                { value: "", label: "All Priorities" },
                { value: "high", label: "High" },
                { value: "medium", label: "Medium" },
                { value: "low", label: "Low" }
              ]}
              id="priority-filter"
              name="priority-filter"
            />
          </div>
        </div>

        {/* Tickets Table */}
        <div className="space-y-4">
          {filteredTickets.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-stone-500 text-lg">
                No tickets found matching your criteria
              </p>
            </Card>
          ) : (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-stone-50 border-b border-stone-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-stone-500">
                      Ticket ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-stone-500">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-stone-500">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-stone-500">
                      Priority
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-stone-500">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-stone-500">
                      Created
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-stone-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-stone-50">
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-stone-900">
                          {ticket.id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-stone-900">
                          {ticket.title}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-stone-600">
                          {ticket.user_name}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                            ticket.priority
                          )}`}
                        >
                          {ticket.priority.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <SelectInput
                          label=""
                          value={ticket.status}
                          onChange={(e) =>
                            handleStatusChange(ticket.id, e.target.value)
                          }
                          options={[
                            { value: "open", label: "Open" },
                            { value: "pending", label: "Pending" },
                            { value: "closed", label: "Closed" }
                          ]}
                          id={`status-${ticket.id}`}
                          name={`status-${ticket.id}`}
                          className="w-32"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-stone-600">
                          {formatDate(ticket.created_at)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          variant="primary"
                          onClick={() => handleViewDetails(ticket.id)}
                          className="bg-[#269c65] hover:bg-[#1a724a] text-sm px-4"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
