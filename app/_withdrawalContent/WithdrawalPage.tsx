"use client";

import React from "react";
import { Wallet, Clock, CheckCircle, XCircle } from "lucide-react";
import { useOpenAndClose } from "@/app/lib/hooks";
import { StatCard } from "./StateCardSection";
import WithdrawalHistorySection from "./WithdrawalHistory";
import {
  useGetWwithdrawalAccount,
  WithdrawalHistory
} from "@/src/hooks/withdrawalAccount/useWithdrawalAccount";
import { WithdrawalAccountData } from "@/app/lib/types";
import BalanceCardSection from "./BalanceCard";
import LoadingState from "@/src/components/ui/loading/LoadingState";

const WithdrawalPage = () => {
  const { open, handle0pen, handleClose } = useOpenAndClose();
  const { data, isLoading } = useGetWwithdrawalAccount();
  console.log("Withdrawal account and states", data);

  const totalWithdrawal = data?.data.withdrawal_details.withdrawal_data.reduce(
    (total, withdrawal) => total + withdrawal.amount,
    0
  );

  if (isLoading) return <LoadingState />;
  return (
    <div className=" bg-white rounded-lg p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Withdrawn"
            amount={totalWithdrawal?.toFixed(2) || 0}
            icon={<Wallet className="w-6 h-6 text-primary_color" />}
            colorClass="bg-primary_color/10"
          />
          <StatCard
            title="Successful"
            amount={
              data?.data?.withdrawal_details?.successWithdrawal.toFixed(2) || 0
            }
            icon={<CheckCircle className="w-6 h-6 text-green-600" />}
            colorClass="bg-green-100"
          />
          <StatCard
            title="Pending"
            amount={
              data?.data?.withdrawal_details?.pendingWithdrawal.toFixed(2) || 0
            }
            icon={<Clock className="w-6 h-6 text-orange-600" />}
            colorClass="bg-orange-100"
          />
          <StatCard
            title="Rejected"
            amount={
              data?.data?.withdrawal_details?.rejectedWithdrawal.toFixed(2) || 0
            }
            icon={<XCircle className="w-6 h-6 text-red-600" />}
            colorClass="bg-red-100"
          />
        </div>

        {/* Balance and Account Section */}
        <BalanceCardSection
          handle0penModal={handle0pen}
          handleCloseModal={handleClose}
          isOpen={open}
          withdrawalAccount={data?.data?.account as WithdrawalAccountData}
          balance={data?.data?.withdrawal_details?.totalBalance || 0}
        />
        <WithdrawalHistorySection
          withdrawalHistory={
            data?.data.withdrawal_details.withdrawal_data as WithdrawalHistory[]
          }
        />
      </div>
    </div>
  );
};

export default WithdrawalPage;
