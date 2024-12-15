"use client";

import React, { useState } from "react";
import {
  Settings,
  ArrowDown,
  ArrowUp,
  Plus,
  Calendar,
  Users,
  ClipboardList,
  AlertCircle,
  X
} from "lucide-react";
import { CardLayout } from "@/src/components/ui/layout/CardLayout";
import { PaymentForm } from "../checkout/[planId]/_planidContent/PaymentForm";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { paymentMethods, primary_color } from "@/app/lib/constant";
import { useOpenAndClose } from "@/app/lib/hooks";
import { useGetUser } from "@/src/hooks/serviceHook";
import ImageComponent from "@/src/components/utils/Image";
import { useAddAccountBalance } from "@/src/hooks/useAccountBalance";

// Color constants
const colors = {
  primary: "#269c65",
  secondary: "#e8f5e9",
  stone: {
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917"
  }
};

const ProfileHeader = () => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-6 bg-white rounded-3xl">
    <div className="flex items-center gap-4">
      <ImageComponent
        imageStyle="w-20 h-20 min-h-20 min-w-20"
        altAttribute="patientName"
        imageUrl=""
      />
      <div>
        <h1 className="text-2xl font-bold text-stone-800">John Doe</h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
          <p className="text-stone-500 text-sm">ID: #123456</p>
          <span className="hidden sm:block text-stone-300">•</span>
          <p className="text-stone-500 text-sm">Member since 2023</p>
        </div>
      </div>
    </div>

    <button
      className="flex items-center gap-2 px-5 py-2.5 rounded-xl border font-medium transition-colors hover:bg-secondary"
      style={{ borderColor: colors.primary, color: colors.primary }}
    >
      <Settings className="w-4 h-4" />
      Edit profile
    </button>
  </div>
);

const StatsSection = () => {
  const stats = [
    {
      title: "Total Subscriptions",
      value: "12",
      icon: ClipboardList,
      trend: "+2 this month"
    },
    {
      title: "Active Doctors",
      value: "8",
      icon: Users,
      trend: "4 specialists"
    },
    {
      title: "Active Subscriptions",
      value: "3",
      icon: Calendar,
      trend: "Renews in 15 days"
    },
    {
      title: "Expired Subscriptions",
      value: "2",
      icon: AlertCircle,
      trend: "Last month"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div>
              <span
                className="inline-block p-3 rounded-xl"
                style={{ backgroundColor: colors.secondary }}
              >
                <stat.icon
                  className="w-6 h-6"
                  style={{ color: colors.primary }}
                />
              </span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-stone-800">{stat.value}</h3>
            <p className="text-stone-600 font-medium mt-1">{stat.title}</p>
            <p className="text-sm text-stone-500 mt-2">{stat.trend}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const BalanceSection = ({ balance }: { balance: number }) => {
  const { open, handle0pen, handleClose } = useOpenAndClose();

  return (
    <div
      className="rounded-3xl p-8"
      style={{
        background: `linear-gradient(to bottom right, ${colors.primary}, #1a724a)`
      }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <p className="text-stone-100 text-sm font-medium">
            Available Balance
          </p>
          <div className="flex items-baseline gap-3 mt-2">
            <h2 className="text-4xl font-bold text-white">
              ${balance.toFixed(2)}
            </h2>
            <span className="text-stone-100">USD</span>
          </div>
          <p className="text-stone-100 text-sm mt-2">
            Last updated: Today at 12:45 PM
          </p>
        </div>
        <button
          onClick={handle0pen}
          className="bg-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-stone-50 transition-colors"
          style={{ color: colors.primary }}
        >
          <Plus className="w-4 h-4" />
          Add Balance
        </button>
      </div>
      {open && <RechargeAccountForm handleClose={handleClose} />}
    </div>
  );
};

const TransactionItem = ({ title, date, amount, type, status }) => (
  <div className="flex items-center justify-between p-4 hover:bg-stone-50 rounded-xl transition-colors">
    <div className="flex gap-4 items-center">
      <div
        className={`p-3 rounded-xl ${
          amount > 0 ? "bg-secondary" : "bg-stone-100"
        }`}
      >
        {amount > 0 ? (
          <ArrowDown className="w-5 h-5" style={{ color: colors.primary }} />
        ) : (
          <ArrowUp className="w-5 h-5 text-stone-600" />
        )}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <p className="font-medium text-stone-800">{title}</p>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              status === "Completed" ? "bg-secondary" : "bg-stone-100"
            }`}
            style={{
              color: status === "Completed" ? colors.primary : colors.stone[600]
            }}
          >
            {status}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-stone-500">{type}</span>
          <span className="w-1 h-1 rounded-full bg-stone-300" />
          <span className="text-sm text-stone-500">{date}</span>
        </div>
      </div>
    </div>
    <p
      className={`font-medium ${amount > 0 ? "" : "text-stone-800"}`}
      style={{ color: amount > 0 ? colors.primary : undefined }}
    >
      {amount > 0 ? "+" : ""}${Math.abs(amount).toFixed(2)}
    </p>
  </div>
);

// Rest of the components remain the same, just updated with stone colors
const RechargeAccountForm = ({ handleClose }) => {
  const [selectedMethod, setSelectedMethod] = useState("mtn");
  const { handelOnChangeFormData, handleAddBalance, isPending, formData } =
    useAddAccountBalance(selectedMethod);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-stone-900/50">
      <CardLayout>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-medium text-stone-700">
            Add Money to your account
          </h1>
          <button
            onClick={handleClose}
            className="text-stone-500 hover:text-stone-700"
          >
            <X size={24} />
          </button>
        </div>

        <PaymentForm
          handleGetPhoneNumber={handelOnChangeFormData}
          amountInput
          amountValue={formData.amount}
          phoneNumberValue={formData.phone_number}
          paymentMethods={paymentMethods}
          selectedMethod={selectedMethod}
          setSelectedMethod={setSelectedMethod}
        />

        <div className="py-3">
          <PrimaryButton
            isSubmitting={isPending}
            onClick={handleAddBalance}
            backgroud
            color="text-white"
          >
            {isPending ? "Processing..." : "Add Balance"}
          </PrimaryButton>
        </div>
      </CardLayout>
    </div>
  );
};

const PatientDashboard = () => {
  const { data, isLoading } = useGetUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div
          className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent"
          style={{ borderColor: colors.primary }}
        ></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        <ProfileHeader />
        <StatsSection />
        <BalanceSection balance={(data?.data.user.balance as number) || 0} />

        <div className="bg-white rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-stone-800">
                Recent Transactions
              </h2>
              <p className="text-stone-500 text-sm">Your latest activities</p>
            </div>
            <button
              className="font-medium transition-colors hover:text-stone-700"
              style={{ color: colors.primary }}
            >
              View All
            </button>
          </div>
          <div className="space-y-2">
            {[
              {
                title: "Video Consultation",
                type: "Service",
                amount: -80,
                date: "2 mins ago",
                status: "Processing"
              },
              {
                title: "Account Top Up",
                type: "Deposit",
                amount: 500,
                date: "2 hours ago",
                status: "Completed"
              },
              {
                title: "Chat Session",
                type: "Service",
                amount: -40,
                date: "Yesterday",
                status: "Completed"
              }
            ].map((tx, i) => (
              <TransactionItem key={i} {...tx} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
