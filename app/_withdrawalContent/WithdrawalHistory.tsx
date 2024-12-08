import { CheckCircle, Clock, XCircle } from "lucide-react";
import { WithdrawalHistory } from "./WithdrawalPage";
interface WithdrawalHistoryProps {
  withdrawalHistory: WithdrawalHistory[];
}
function WithdrawalHistorySection({
  withdrawalHistory
}: WithdrawalHistoryProps) {
  return (
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
  );
}

export default WithdrawalHistorySection;
