"use client";
import React, { useState } from "react";
import { Card } from "@/src/components/utils/Card";
import Input from "@/src/components/ui/forms/Input";
import SelectInput from "@/src/components/ui/forms/SelectInput";
import { Button } from "@/src/components/utils/Button";
import {
  DollarSign,
  ArrowDownCircle,
  ArrowUpCircle,
  RefreshCcw,
  CreditCard,
  Search,
  Calendar,
  Download,
  FileText,
  Filter,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { colors } from "@/app/lib/constant";

// Transaction status badge component
const StatusBadge = ({ type, status }) => {
  const styles = {
    completed: {
      bg: "bg-green-50",
      text: "text-green-700",
      dot: "bg-green-500"
    },
    pending: {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      dot: "bg-yellow-500"
    },
    failed: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
    processing: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" }
  };

  const style = styles[status] || styles.pending;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${style.bg} ${style.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

// Transaction type badge component
const TypeBadge = ({ type }) => {
  const styles = {
    deposit: {
      bg: "bg-green-50",
      text: "text-green-700",
      icon: <ArrowDownCircle size={16} />
    },
    withdrawal: {
      bg: "bg-orange-50",
      text: "text-orange-700",
      icon: <ArrowUpCircle size={16} />
    },
    refund: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      icon: <RefreshCcw size={16} />
    },
    subscription: {
      bg: "bg-purple-50",
      text: "text-purple-700",
      icon: <CreditCard size={16} />
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

const TransactionManagement = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Sample transaction data
  const transactions = [
    {
      id: "TRX001",
      type: "deposit",
      amount: 299.0,
      currency: "USD",
      status: "completed",
      date: "2024-03-15T10:30:00",
      customer: {
        name: "Dr. Sarah Johnson",
        id: "DOC123"
      },
      description: "Premium Plan Subscription Payment",
      paymentMethod: "Credit Card (**** 1234)"
    },
    {
      id: "TRX002",
      type: "refund",
      amount: 199.0,
      currency: "USD",
      status: "processing",
      date: "2024-03-14T15:45:00",
      customer: {
        name: "Dr. Michael Chen",
        id: "DOC124"
      },
      description: "Service Cancellation Refund",
      paymentMethod: "Original Payment Method"
    },
    {
      id: "TRX003",
      type: "subscription",
      amount: 499.0,
      currency: "USD",
      status: "completed",
      date: "2024-03-13T09:15:00",
      customer: {
        name: "Dr. Emily Wilson",
        id: "DOC125"
      },
      description: "Annual Plan Subscription",
      paymentMethod: "Credit Card (**** 5678)"
    }
  ];

  // Calculate stats
  const stats = [
    {
      title: "Total Revenue",
      value: "$52,420",
      change: "+12%",
      period: "vs last month"
    },
    {
      title: "Pending Refunds",
      value: "$1,240",
      count: "8 requests"
    },
    {
      title: "Today's Transactions",
      value: "24",
      amount: "$4,520"
    },
    {
      title: "Failed Transactions",
      value: "3",
      amount: "$820"
    }
  ];

  const viewTransactionDetail = (transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-stone-800">
          Transaction Management
        </h1>
        <div className="flex gap-3">
          <Button variant="secondary">
            <Download size={18} className="mr-2" />
            Export Report
          </Button>
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
                {stat.change && (
                  <p className="text-sm text-green-600 mt-1">
                    {stat.change} {stat.period}
                  </p>
                )}
                {stat.count && (
                  <p className="text-sm text-stone-500 mt-1">{stat.count}</p>
                )}
                {stat.amount && (
                  <p className="text-sm text-stone-500 mt-1">{stat.amount}</p>
                )}
              </div>
              <div className="p-3 rounded-full bg-stone-50">
                <DollarSign size={24} className="text-stone-400" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <SelectInput
              id=""
              name="type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              options={[
                { value: "all", label: "All Types" },
                { value: "deposit", label: "Deposits" },
                { value: "withdrawal", label: "Withdrawals" },
                { value: "refund", label: "Refunds" },
                { value: "subscription", label: "Subscriptions" }
              ]}
            />
            <SelectInput
              id=""
              name="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              options={[
                { value: "all", label: "All Status" },
                { value: "completed", label: "Completed" },
                { value: "pending", label: "Pending" },
                { value: "failed", label: "Failed" }
              ]}
            />
            <Input
              inputType="date"
              name="startDate"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
              inputPlaceholder="Start Date"
            />
            <Input
              inputType="date"
              name="endDate"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
              inputPlaceholder="End Date"
            />
          </div>
        </div>
      </Card>

      {/* Transactions Table - Desktop */}
      <div className="hidden md:block">
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="text-left py-4 px-6 text-stone-600 font-medium">
                    Transaction ID
                  </th>
                  <th className="text-left py-4 px-6 text-stone-600 font-medium">
                    Type
                  </th>
                  <th className="text-left py-4 px-6 text-stone-600 font-medium">
                    Customer
                  </th>
                  <th className="text-right py-4 px-6 text-stone-600 font-medium">
                    Amount
                  </th>
                  <th className="text-left py-4 px-6 text-stone-600 font-medium">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-stone-600 font-medium">
                    Date
                  </th>
                  <th className="text-center py-4 px-6 text-stone-600 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-stone-50">
                    <td className="py-4 px-6 font-medium text-stone-800">
                      {transaction.id}
                    </td>
                    <td className="py-4 px-6">
                      <TypeBadge type={transaction.type} />
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-stone-800">
                          {transaction.customer.name}
                        </div>
                        <div className="text-sm text-stone-500">
                          ID: {transaction.customer.id}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span
                        className={`font-medium ${
                          transaction.type === "refund"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {transaction.type === "refund" ? "-" : "+"}$
                        {transaction.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge
                        status={transaction.status}
                        type={undefined}
                      />
                    </td>
                    <td className="py-4 px-6 text-stone-600">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => viewTransactionDetail(transaction)}
                          className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                        >
                          <FileText size={18} className="text-stone-400" />
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

      {/* Transactions List - Mobile */}
      <div className="md:hidden space-y-4">
        {transactions.map((transaction) => (
          <Card key={transaction.id} className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-stone-500">{transaction.id}</p>
                  <p className="font-medium text-stone-800 mt-1">
                    {transaction.customer.name}
                  </p>
                </div>
                <TypeBadge type={transaction.type} />
              </div>

              <div className="flex items-center justify-between">
                <StatusBadge status={transaction.status} />
                <span
                  className={`font-medium ${
                    transaction.type === "refund"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {transaction.type === "refund" ? "-" : "+"}$
                  {transaction.amount.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-stone-200">
                <span className="text-sm text-stone-500">
                  {new Date(transaction.date).toLocaleDateString()}
                </span>
                <button
                  onClick={() => viewTransactionDetail(transaction)}
                  className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                >
                  <ChevronRight size={18} className="text-stone-400" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TransactionManagement;
