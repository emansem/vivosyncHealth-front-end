"use client";
import React from "react";
import { Card } from "@/src/components/utils/Card";
import { StatsCard } from "./_dashboardContent/StateSection";
import { useGetAllAdminDashboardDetails } from "@/src/hooks/admin/useDashboard";
import { InnerPageLoader } from "@/src/components/ui/loading/InnerPageLoader";
import RecentPatientsAndDoctors from "./_dashboardContent/RecentUsers";
import TransactionList from "./_dashboardContent/RecentTransactions";
import NoResults from "@/src/components/ui/noFound/EmptyResult";

// Dashboard Component
const Dashboard = () => {
  const { isLoading, stats, recentTransactions, recentDoctorsAndPatients } =
    useGetAllAdminDashboardDetails();
  // Stats data with type-safe StatType

  if (isLoading) return <InnerPageLoader />;

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Activity Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-stone-800 mb-4">
            Recent Transactions
          </h3>
          <div>
            {recentTransactions.length == 0 && (
              <NoResults
                heading="No Transactions Found"
                message="You donot have any transactions yet"
              />
            )}
            {recentTransactions.length !== 0 &&
              recentTransactions.map((transaction, index) => (
                <TransactionList key={index} {...transaction} />
              ))}
          </div>
        </Card>
        {/* Recent Registrations */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-stone-800 mb-4">
            Recent Registrations
          </h3>
          <div>
            {recentDoctorsAndPatients.length == 0 && (
              <NoResults
                heading="No User Found"
                message="You donot have any user yet"
              />
            )}
            {recentDoctorsAndPatients.length !== 0 &&
              recentDoctorsAndPatients?.map((user, index) => (
                <RecentPatientsAndDoctors key={index} {...user} />
              ))}
          </div>
        </Card>
        {/* Recent Support Tickets
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-stone-800 mb-4">
            Recent Support Tickets
          </h3>
          <div className="space-y-4">
            {recentTickets.map((ticket, index) => (
              <ActivityItem key={index} {...ticket} />
            ))}
          </div>
        </Card> */}
      </div>
    </div>
  );
};

export default Dashboard;
