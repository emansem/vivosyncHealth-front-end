"use client";

import { ProfileHeader } from "./_profileContents/ProfileHeader";
import { colors } from "@/app/lib/constant";
import { BalanceSection } from "./_profileContents/BalanceSection";
import { StatsSection } from "./_profileContents/StatesSection";
import { TransactionItem } from "./_profileContents/TransactionSection";
import { useGetPatientProfileDetails } from "@/src/hooks/patient/usePatientProfile";
import { UserType } from "@/src/hooks/serviceHook";
import { Transactions } from "@/app/lib/types";

const PatientDashboard = () => {
  const { stats, isLoading, patientData, recentTransactions } =
    useGetPatientProfileDetails();

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
        <ProfileHeader patienData={patientData as UserType} />
        <StatsSection stats={stats} />
        <BalanceSection balance={patientData?.balance as number} />

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
            <TransactionItem
              transactions={recentTransactions as Transactions[]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
