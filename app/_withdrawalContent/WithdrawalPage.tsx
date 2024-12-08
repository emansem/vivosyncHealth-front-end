"use client";

import React from "react";
import { Wallet, Clock, CheckCircle, XCircle } from "lucide-react";
import { useOpenAndClose } from "@/app/lib/hooks";
import { StatCard } from "./StateCardSection";
import WithdrawalHistorySection from "./WithdrawalHistory";
import { useGetWwithdrawalAccount } from "@/src/hooks/withdrawalAccount/useWithdrawalAccount";
import { WithdrawalAccountData } from "@/app/lib/types";
import BalanceCardSection from "./BalanceCard";

export interface WithdrawalHistory {
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

export interface WithdrawalAccount {
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
  const { open, handle0pen, handleClose } = useOpenAndClose();
  const { data, noAccount } = useGetWwithdrawalAccount();
  console.log(data);

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
        <BalanceCardSection
          noAccount={noAccount}
          handle0penModal={handle0pen}
          handleCloseModal={handleClose}
          isOpen={open}
          withdrawalAccount={data?.data?.account as WithdrawalAccountData}
          balance={balance}
        />
        <WithdrawalHistorySection withdrawalHistory={withdrawalHistory} />
      </div>
    </div>
  );
};

export default WithdrawalPage;
