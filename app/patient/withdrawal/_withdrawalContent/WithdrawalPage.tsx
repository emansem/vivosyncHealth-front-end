"use client";

import React from "react";
import {
  Wallet,
  ArrowDownRight,
  Clock,
  CheckCircle,
  Plus,
  AlertCircle,
  XCircle,
  CreditCard
} from "lucide-react";

interface WithdrawalHistory {
  id: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  date: string;
}

interface WithdrawalStats {
  total: number;
  failed: number;
  pending: number;
  successful: number;
}

interface WithdrawalAccount {
  bank: string;
  accountNumber: string;
}

interface Props {
  balance: number;
  withdrawalAccount?: WithdrawalAccount;
  withdrawalHistory: WithdrawalHistory[];
  stats: WithdrawalStats;
}

const WithdrawalPage: React.FC<Props> = ({
  balance,
  withdrawalAccount,
  withdrawalHistory,
  stats
}) => {
  const handleRequestWithdrawal = () => {
    // Implement withdrawal request logic
  };

  const handleAddWithdrawalAccount = () => {
    // Implement add account logic
  };

  // Stat Card Component
  const StatCard = ({
    title,
    amount,
    icon,
    colorClass
  }: {
    title: string;
    amount: number;
    icon: React.ReactNode;
    colorClass: string;
  }) => (
    <div className=" rounded-2xl p-6 shadow-lg border bg-white">
      <div className={`flex items-center gap-3 mb-4`}>
        <div className={`${colorClass} p-3 rounded-xl`}>{icon}</div>
        <h3 className="text-gray-600 font-medium">{title}</h3>
      </div>
      <p className="text-2xl font-bold text-gray-800">
        ${amount.toLocaleString()}
      </p>
    </div>
  );

  return (
    <div className=" bg-white rounded-lg p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Withdrawn"
            amount={stats.total}
            icon={<Wallet className="w-6 h-6 text-primary_color" />}
            colorClass="bg-primary_color/10"
          />
          <StatCard
            title="Successful"
            amount={stats.successful}
            icon={<CheckCircle className="w-6 h-6 text-green-600" />}
            colorClass="bg-green-100"
          />
          <StatCard
            title="Pending"
            amount={stats.pending}
            icon={<Clock className="w-6 h-6 text-orange-600" />}
            colorClass="bg-orange-100"
          />
          <StatCard
            title="Failed"
            amount={stats.failed}
            icon={<XCircle className="w-6 h-6 text-red-600" />}
            colorClass="bg-red-100"
          />
        </div>

        {/* Balance and Account Section */}
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {/* Balance Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-40 h-40 bg-primary_color/5 rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-primary_color/10 p-3 rounded-xl">
                  <Wallet className="w-6 h-6 text-primary_color" />
                </div>
                <h2 className="text-lg font-semibold">Available Balance</h2>
              </div>
              <div className="mb-6">
                <p className="text-3xl font-bold text-primary_color">
                  ${balance.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Available for withdrawal
                </p>
              </div>
              <button
                onClick={handleRequestWithdrawal}
                disabled={!withdrawalAccount}
                className={`w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 
                 ${
                   withdrawalAccount
                     ? "bg-primary_color hover:bg-primary_color/90 text-white"
                     : "bg-gray-100 text-gray-400 cursor-not-allowed"
                 }
                 transition-all duration-200`}
              >
                <ArrowDownRight className="w-5 h-5" />
                Request Withdrawal
              </button>
            </div>
          </div>

          {/* Withdrawal Account Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-secondary_color/10 p-3 rounded-xl">
                <CreditCard className="w-6 h-6 text-secondary_color" />
              </div>
              <h2 className="text-lg font-semibold">Withdrawal Account</h2>
            </div>

            {withdrawalAccount ? (
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500">Bank Name</p>
                  <p className="font-medium">{withdrawalAccount.bank}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500">Account Number</p>
                  <p className="font-medium">
                    {withdrawalAccount.accountNumber}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">
                  No withdrawal account added
                </p>
                <button
                  onClick={handleAddWithdrawalAccount}
                  className="inline-flex items-center gap-2 py-2 px-4 rounded-lg bg-secondary_color/10 text-secondary_color hover:bg-secondary_color/20 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Withdrawal Account
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Withdrawal History */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-lg font-semibold mb-6">Withdrawal History</h2>

          {withdrawalHistory.length > 0 ? (
            <div className="space-y-4">
              {withdrawalHistory.map((withdrawal) => (
                <div
                  key={withdrawal.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    {withdrawal.status === "completed" ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : withdrawal.status === "pending" ? (
                      <Clock className="w-5 h-5 text-orange-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <div>
                      <p className="font-medium">
                        ${withdrawal.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">{withdrawal.date}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm 
                   ${
                     withdrawal.status === "completed"
                       ? "bg-green-100 text-green-700"
                       : withdrawal.status === "pending"
                       ? "bg-orange-100 text-orange-700"
                       : "bg-red-100 text-red-700"
                   }`}
                  >
                    {withdrawal.status.charAt(0).toUpperCase() +
                      withdrawal.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No withdrawal history</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WithdrawalPage;
