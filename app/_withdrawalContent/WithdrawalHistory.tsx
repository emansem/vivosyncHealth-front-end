import { formatDate } from "@/src/helper/helper";
import { WithdrawalHistory } from "@/src/hooks/withdrawalAccount/useWithdrawalAccount";
import {
  CheckCircle,
  Clock,
  XCircle,
  ArrowDownCircle,
  ChevronRight
} from "lucide-react";

interface WithdrawalHistoryProps {
  withdrawalHistory: WithdrawalHistory[];
}

function WithdrawalHistorySection({
  withdrawalHistory
}: WithdrawalHistoryProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      {/* Header Section */}
      <div className="flex items-center gap-2 mb-6">
        <ArrowDownCircle className="w-6 h-6 text-gray-600" />
        <h2 className="text-xl font-semibold text-gray-800">
          Withdrawal History
        </h2>
      </div>

      {withdrawalHistory?.length > 0 ? (
        <div className="space-y-3">
          {/* Column Headers - Hidden on Mobile */}
          <div className="hidden sm:grid sm:grid-cols-5 text-sm text-gray-500 px-4 mb-2">
            <span>Transaction ID</span>
            <span>Amount</span>
            <span>Status</span>
            <span>Date</span>
            <span></span>
          </div>

          {/* Transaction List */}
          {withdrawalHistory.map((withdrawal) => (
            <div
              key={withdrawal.id}
              className="flex flex-col sm:grid sm:grid-cols-5 sm:items-center p-4 
                       bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors 
                       duration-200 gap-2 sm:gap-0"
            >
              {/* Transaction ID */}
              <div className="flex items-center justify-between sm:justify-start gap-2">
                <span className="text-sm font-medium text-gray-900 sm:hidden">
                  Trx:
                </span>
                <span className="text-sm text-gray-600">
                  {withdrawal.transaction_id}
                </span>
              </div>

              {/* Amount */}
              <div className="flex items-center justify-between sm:justify-start gap-2">
                <span className="text-sm font-medium text-gray-900 sm:hidden">
                  Amount:
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  ${withdrawal.amount.toFixed(2)}
                </span>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between sm:justify-start gap-2">
                <span className="text-sm font-medium text-gray-900 sm:hidden">
                  Status:
                </span>
                <div className="flex items-center gap-2">
                  {withdrawal.status === "success" ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : withdrawal.status === "pending" ? (
                    <Clock className="w-4 h-4 text-orange-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium capitalize
                      ${
                        withdrawal.status === "success"
                          ? "bg-green-100 text-green-700"
                          : withdrawal.status === "pending"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {withdrawal.status}
                  </span>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center justify-between sm:justify-start gap-2">
                <span className="text-sm font-medium text-gray-900 sm:hidden">
                  Date:
                </span>
                <span className="text-sm text-gray-600">
                  {formatDate(withdrawal.created_at)}
                </span>
              </div>

              {/* Action Button */}
              <div className="flex justify-end">
                <button
                  className="flex items-center text-sm text-gray-600 hover:text-gray-900 
                           transition-colors group"
                >
                  Details
                  <ChevronRight
                    className="w-4 h-4 ml-1 group-hover:translate-x-1 
                                         transition-transform"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">No withdrawal history</p>
          <p className="text-sm text-gray-500 mt-1">
            Your recent withdrawals will appear here
          </p>
        </div>
      )}
    </div>
  );
}

export default WithdrawalHistorySection;
