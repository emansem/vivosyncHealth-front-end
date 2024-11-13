"use client";

import { Wallet, Clock, CheckCircle } from "lucide-react";
import { accountBalance } from "@/app/lib/constant";
import RequestWithdrawalLayout from "./_withdrawalContent/RequestWithdrawalLayout";
import { BalanceCard } from "./_withdrawalContent/BalanceCard";
import RecentWithdrawalSection from "./_withdrawalContent/RecentWithdrawalSection";

const WithdrawalPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* Balance Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <BalanceCard
          title="Available Balance"
          amount={accountBalance}
          icon={<Wallet className="w-6 h-6" />}
        />
        <BalanceCard
          title="Pending Withdrawal"
          amount={45000}
          icon={<Clock className="w-6 h-6" />}
        />
        <BalanceCard
          title="Total Withdrawn"
          amount={850000}
          icon={<CheckCircle className="w-6 h-6" />}
        />
      </div>

      {/* Withdrawal Form and Bank Info */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Side - Withdrawal Form */}
        <WithdrawalSection />
      </div>
    </div>
  );
};

export default WithdrawalPage;

const WithdrawalSection = () => {
  return (
    <>
      <RequestWithdrawalLayout />
      {/* Right Side - Recent Withdrawals */}
      <RecentWithdrawalSection />
    </>
  );
};
