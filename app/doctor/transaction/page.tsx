"use client";
import { useState } from "react";
export const statusStyles = {
  active: "bg-green-100 text-green-700",
  expired: "bg-red-100 text-red-700",
  pending: "bg-yellow-100 text-yellow-700",
  failed: "bg-red-100 text-red-700"
};
import { transactions } from "@/data/transaction";
import { StatCard } from "./_transactionsContent/StateCard";
import { TransactionCard } from "./_transactionsContent/TransactionCard";

type TabType = "all" | "subscriptions" | "withdrawals";

const TransactionsPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>("all");

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/*  Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Revenue" value="₦2,450,000" />
        <StatCard title="Active Plans" value="156" />
        <StatCard title="Expired Plans" value="23" />
        <StatCard title="Withdrawals" value="₦850,000" />
      </div>

      {/*  Tabs */}
      <div className="flex gap-4 border-b border-gray-200 pb-2">
        {["all", "subscriptions", "withdrawals"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as TabType)}
            className={`px-4 py-2 rounded-lg ${
              activeTab === tab
                ? "bg-primary_color text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Transaction List */}
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <TransactionCard key={transaction.id} {...transaction} />
        ))}
      </div>
    </div>
  );
};

export default TransactionsPage;
