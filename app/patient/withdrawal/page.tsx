"use client";

import WithdrawalPage from "./_withdrawalContent/WithdrawalPage";

const Page = () => {
  const data = {
    balance: 5000,
    // withdrawalAccount: {
    //   bank: "Example Bank",
    //   accountNumber: "****1234"
    // },
    withdrawalHistory: [
      {
        id: "1",
        amount: 1000,
        status: "completed",
        date: "2024-03-28"
      },
      {
        id: "2",
        amount: 500,
        status: "pending",
        date: "2024-03-29"
      },
      {
        id: "3",
        amount: 750,
        status: "failed",
        date: "2024-03-30"
      }
    ],
    stats: {
      total: 10000,
      successful: 7500,
      pending: 1500,
      failed: 1000
    }
  };

  return <WithdrawalPage {...data} />;
};
export default Page;
