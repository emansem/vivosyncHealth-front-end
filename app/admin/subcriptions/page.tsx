"use client";
import React, { useState } from "react";
import { Card } from "@/src/components/utils/Card";
import Input from "@/src/components/ui/forms/Input";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import { Button } from "@/src/components/utils/Button";
import {
  CreditCard,
  DollarSign,
  Users,
  TrendingUp,
  Clock,
  AlertCircle,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  RefreshCcw
} from "lucide-react";
import { colors } from "@/app/lib/constant";

// Status badges with consistent styling
const StatusBadge = ({ status }) => {
  const statusStyles = {
    active: { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
    expired: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
    pending: {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      dot: "bg-yellow-500"
    },
    cancelled: {
      bg: "bg-stone-50",
      text: "text-stone-700",
      dot: "bg-stone-500"
    }
  };

  const style = statusStyles[status] || statusStyles.pending;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${style.bg} ${style.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Stats Card Component
const StatsCard = ({ title, value, subValue, icon, color, bgColor }) => (
  <Card className="p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-stone-600 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-stone-800">{value}</h3>
        {subValue && <p className="text-sm text-stone-500 mt-1">{subValue}</p>}
      </div>
      <div className="p-3 rounded-full" style={{ backgroundColor: bgColor }}>
        {React.cloneElement(icon, { size: 24, color: color })}
      </div>
    </div>
  </Card>
);

const SubscriptionManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Sample subscription data
  const subscriptions = [
    {
      id: "SUB001",
      customerName: "Dr. Sarah Johnson",
      planName: "Premium Plan",
      status: "active",
      startDate: "2024-01-15",
      endDate: "2025-01-15",
      amount: "$299/year",
      lastPayment: "2024-01-15",
      autoRenewal: true
    },
    {
      id: "SUB002",
      customerName: "Dr. Michael Chen",
      planName: "Basic Plan",
      status: "pending",
      startDate: "2024-02-01",
      endDate: "2025-02-01",
      amount: "$199/year",
      lastPayment: "2024-02-01",
      autoRenewal: true
    }
  ];

  const stats = [
    {
      title: "Total Revenue",
      value: "$52,420",
      subValue: "+12% from last month",
      icon: <DollarSign />,
      color: colors.primary,
      bgColor: colors.secondary
    },
    {
      title: "Active Subscriptions",
      value: "842",
      subValue: "92% renewal rate",
      icon: <CheckCircle />,
      color: "#2196F3",
      bgColor: "#E3F2FD"
    },
    {
      title: "Expiring Soon",
      value: "45",
      subValue: "Next 30 days",
      icon: <Clock />,
      color: "#FF9800",
      bgColor: "#FFF3E0"
    },
    {
      title: "Cancelled",
      value: "23",
      subValue: "This month",
      icon: <XCircle />,
      color: "#F44336",
      bgColor: "#FFEBEE"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800">
          Subscription Management
        </h1>
        <Button variant="primary">Create New Plan</Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
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
              placeholder="Search subscriptions..."
              className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <SelectInput
              id=""
              name="plan"
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              options={[
                { value: "all", label: "All Plans" },
                { value: "premium", label: "Premium Plan" },
                { value: "basic", label: "Basic Plan" }
              ]}
            />
            <SelectInput
              id=""
              name="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              options={[
                { value: "all", label: "All Status" },
                { value: "active", label: "Active" },
                { value: "pending", label: "Pending" },
                { value: "expired", label: "Expired" },
                { value: "cancelled", label: "Cancelled" }
              ]}
            />
          </div>
        </div>
      </Card>

      {/* Subscription Table - Desktop */}
      <div className="hidden md:block">
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="text-left py-4 px-6 text-stone-600 font-medium">
                    Customer
                  </th>
                  <th className="text-left py-4 px-6 text-stone-600 font-medium">
                    Plan
                  </th>
                  <th className="text-left py-4 px-6 text-stone-600 font-medium">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-stone-600 font-medium">
                    Start Date
                  </th>
                  <th className="text-left py-4 px-6 text-stone-600 font-medium">
                    End Date
                  </th>
                  <th className="text-left py-4 px-6 text-stone-600 font-medium">
                    Amount
                  </th>
                  <th className="text-center py-4 px-6 text-stone-600 font-medium">
                    Auto Renewal
                  </th>
                  <th className="text-left py-4 px-6 text-stone-600 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {subscriptions.map((subscription) => (
                  <tr key={subscription.id} className="hover:bg-stone-50">
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-stone-800">
                          {subscription.customerName}
                        </div>
                        <div className="text-sm text-stone-500">
                          {subscription.id}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-stone-600">
                      {subscription.planName}
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge status={subscription.status} />
                    </td>
                    <td className="py-4 px-6 text-stone-600">
                      {new Date(subscription.startDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-stone-600">
                      {new Date(subscription.endDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 font-medium text-stone-800">
                      {subscription.amount}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {subscription.autoRenewal ? (
                        <CheckCircle
                          size={20}
                          className="text-green-500 mx-auto"
                        />
                      ) : (
                        <XCircle size={20} className="text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className="text-stone-400 hover:text-primary transition-colors">
                          <RefreshCcw size={18} />
                        </button>
                        <button className="text-stone-400 hover:text-primary transition-colors">
                          <AlertCircle size={18} />
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

      {/* Subscription Cards - Mobile */}
      <div className="md:hidden space-y-4">
        {subscriptions.map((subscription) => (
          <Card key={subscription.id} className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-stone-800">
                    {subscription.customerName}
                  </h3>
                  <p className="text-sm text-stone-500">{subscription.id}</p>
                </div>
                <StatusBadge status={subscription.status} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-stone-500">Plan</p>
                  <p className="font-medium text-stone-800">
                    {subscription.planName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-stone-500">Amount</p>
                  <p className="font-medium text-stone-800">
                    {subscription.amount}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-stone-500">Start Date</p>
                  <p className="text-stone-600">
                    {new Date(subscription.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-stone-500">End Date</p>
                  <p className="text-stone-600">
                    {new Date(subscription.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-stone-200">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-stone-500">Auto Renewal:</span>
                  {subscription.autoRenewal ? (
                    <CheckCircle size={18} className="text-green-500" />
                  ) : (
                    <XCircle size={18} className="text-red-500" />
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
                    <RefreshCcw size={18} className="text-stone-400" />
                  </button>
                  <button className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
                    <AlertCircle size={18} className="text-stone-400" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionManagement;
