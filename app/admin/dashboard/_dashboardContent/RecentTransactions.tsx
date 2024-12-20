import React from "react";
import {
  RefreshCcw,
  ArrowDownCircle,
  ArrowUpCircle,
  Receipt
} from "lucide-react";
import { Transactions } from "@/app/lib/types";
import { formatDate } from "@/src/helper/helper";

// Define the possible transaction types
type TransactionType = "subscription" | "refund" | "deposit" | "withdrawal";

// Function to get styling based on transaction type
const getTransactionStyle = (
  type: TransactionType
): {
  color: string;
  bgColor: string;
  icon: React.ReactNode;
  label: string;
} => {
  switch (type) {
    case "subscription":
      return {
        color: "#2196F3",
        bgColor: "#E3F2FD",
        icon: <Receipt />,
        label: "Subscription"
      };
    case "refund":
      return {
        color: "#4CAF50",
        bgColor: "#E8F5E9",
        icon: <RefreshCcw />,
        label: "Refund"
      };
    case "deposit":
      return {
        color: "#9C27B0",
        bgColor: "#F3E5F5",
        icon: <ArrowDownCircle />,
        label: "Deposit"
      };
    case "withdrawal":
      return {
        color: "#F44336",
        bgColor: "#FFEBEE",
        icon: <ArrowUpCircle />,
        label: "Withdrawal"
      };
  }
};

// Format amount to currency
const formatAmount = (amount: number, type: TransactionType): string => {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(Math.abs(amount));

  // Add + or - prefix based on transaction type
  switch (type) {
    case "deposit":
    case "refund":
      return `+${formatted}`;
    case "withdrawal":
    case "subscription":
      return `-${formatted}`;
    default:
      return formatted;
  }
};

const TransactionList = ({
  amount,
  type,
  created_at,
  transaction_id
}: Transactions) => {
  const { color, bgColor, icon, label } = getTransactionStyle(type);
  const formattedAmount = formatAmount(amount, type);

  return (
    <div className="flex items-center gap-4 p-4 hover:bg-stone-50 rounded-lg transition-colors">
      <div
        className="p-2 rounded-full shrink-0"
        style={{ backgroundColor: bgColor }}
      >
        {React.cloneElement(icon as React.ReactElement, {
          size: 20,
          color: color
        })}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-stone-800">{label}</p>
          </div>
          <p
            className="text-sm font-medium"
            style={{
              color:
                type === "withdrawal" || type === "subscription"
                  ? "#F44336"
                  : "#4CAF50"
            }}
          >
            {formattedAmount}
          </p>
        </div>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-stone-400">ID: {transaction_id}</p>
          <p className="text-xs text-stone-400">
            {formatDate(created_at as string)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
