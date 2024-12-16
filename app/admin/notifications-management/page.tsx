"use client";
import React, { useState } from "react";
import { Card } from "@/src/components/utils/Card";
import Input from "@/src/components/ui/forms/Input";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import { Button } from "@/src/components/utils/Button";
import {
  Bell,
  Mail,
  MessageSquare,
  Clock,
  Search,
  Calendar,
  Settings,
  Users,
  Filter,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Send
} from "lucide-react";
import { colors } from "@/app/lib/constant";

// Status badge component with consistent styling
const StatusBadge = ({ status }) => {
  const styles = {
    sent: { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
    scheduled: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
    draft: {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      dot: "bg-yellow-500"
    },
    failed: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" }
  };

  const style = styles[status] || styles.draft;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${style.bg} ${style.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Type badge component for different notification types
const TypeBadge = ({ type }) => {
  const styles = {
    email: {
      bg: "bg-purple-50",
      text: "text-purple-700",
      icon: <Mail size={16} />
    },
    sms: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      icon: <MessageSquare size={16} />
    },
    system: {
      bg: "bg-orange-50",
      text: "text-orange-700",
      icon: <Bell size={16} />
    }
  };

  const style = styles[type];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${style.bg} ${style.text}`}
    >
      {style.icon}
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
};

const NotificationManagement = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  // Sample notification data
  const notifications = [
    {
      id: "NOT001",
      title: "Welcome Message",
      type: "email",
      status: "sent",
      recipients: "All New Users",
      sentCount: 145,
      deliveryRate: "98%",
      lastSent: "2024-03-15T10:30:00",
      template: "welcome_email",
      content: "Welcome to our platform! We're excited to have you on board..."
    },
    {
      id: "NOT002",
      title: "Payment Reminder",
      type: "sms",
      status: "scheduled",
      recipients: "Users with Pending Payments",
      sentCount: 0,
      scheduledFor: "2024-03-20T09:00:00",
      template: "payment_reminder",
      content: "Your subscription payment is due in 3 days..."
    },
    {
      id: "NOT003",
      title: "System Maintenance",
      type: "system",
      status: "draft",
      recipients: "All Users",
      template: "system_notification",
      content: "System maintenance scheduled for..."
    }
  ];

  // Statistics for the overview cards
  const stats = [
    {
      title: "Total Notifications",
      value: "2,456",
      subValue: "Last 30 days",
      icon: <Bell size={24} className="text-primary" />,
      bgColor: colors.secondary
    },
    {
      title: "Delivery Rate",
      value: "98.5%",
      subValue: "Average success rate",
      icon: <CheckCircle size={24} className="text-blue-600" />,
      bgColor: "bg-blue-50"
    },
    {
      title: "Scheduled",
      value: "12",
      subValue: "Pending notifications",
      icon: <Clock size={24} className="text-orange-600" />,
      bgColor: "bg-orange-50"
    },
    {
      title: "Active Templates",
      value: "18",
      subValue: "Across all channels",
      icon: <Mail size={24} className="text-purple-600" />,
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800">
          Notification Management
        </h1>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => setIsTemplateModalOpen(true)}
          >
            Manage Templates
          </Button>
          <Button variant="primary">Create Notification</Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-stone-600 text-sm font-medium">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold text-stone-800 mt-1">
                  {stat.value}
                </h3>
                {stat.subValue && (
                  <p className="text-sm text-stone-500 mt-1">{stat.subValue}</p>
                )}
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search notifications..."
              className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <SelectInput
              name="type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              options={[
                { value: "all", label: "All Types" },
                { value: "email", label: "Email" },
                { value: "sms", label: "SMS" },
                { value: "system", label: "System" }
              ]}
            />
            <SelectInput
              name="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              options={[
                { value: "all", label: "All Status" },
                { value: "sent", label: "Sent" },
                { value: "scheduled", label: "Scheduled" },
                { value: "draft", label: "Draft" }
              ]}
            />
          </div>
        </div>
      </Card>

      {/* Notifications Table - Desktop */}
      <div className="hidden md:block">
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="text-left py-4 px-6 text-stone-600 font-medium">
                    Title
                  </th>
                  <th className="text-left py-4 px-6 text-stone-600 font-medium">
                    Type
                  </th>
                  <th className="text-left py-4 px-6 text-stone-600 font-medium">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-stone-600 font-medium">
                    Recipients
                  </th>
                  <th className="text-left py-4 px-6 text-stone-600 font-medium">
                    Last Sent/Scheduled
                  </th>
                  <th className="text-left py-4 px-6 text-stone-600 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {notifications.map((notification) => (
                  <tr key={notification.id} className="hover:bg-stone-50">
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-stone-800">
                          {notification.title}
                        </div>
                        <div className="text-sm text-stone-500">
                          {notification.id}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <TypeBadge type={notification.type} />
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge status={notification.status} />
                    </td>
                    <td className="py-4 px-6 text-stone-600">
                      {notification.recipients}
                    </td>
                    <td className="py-4 px-6 text-stone-600">
                      {new Date(
                        notification.lastSent || notification.scheduledFor
                      ).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
                          <Edit size={18} className="text-stone-400" />
                        </button>
                        <button className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
                          <Send size={18} className="text-stone-400" />
                        </button>
                        <button className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
                          <Trash2 size={18} className="text-stone-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Notifications List - Mobile */}
      <div className="md:hidden space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-stone-800">
                    {notification.title}
                  </h3>
                  <p className="text-sm text-stone-500">{notification.id}</p>
                </div>
                <TypeBadge type={notification.type} />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-stone-500">Status</span>
                  <StatusBadge status={notification.status} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-stone-500">Recipients</span>
                  <span className="text-sm text-stone-800">
                    {notification.recipients}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-stone-500">
                    Last Sent/Scheduled
                  </span>
                  <span className="text-sm text-stone-800">
                    {new Date(
                      notification.lastSent || notification.scheduledFor
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-200">
                <button className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
                  <Edit size={18} className="text-stone-400" />
                </button>
                <button className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
                  <Send size={18} className="text-stone-400" />
                </button>
                <button className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
                  <Trash2 size={18} className="text-stone-400" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NotificationManagement;
