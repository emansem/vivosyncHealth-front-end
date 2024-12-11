import { Transactions } from "@/app/lib/types";
import { TransactionType } from "../page";
import { formatDate } from "@/src/helper/helper";

interface TransactionMobileViewProps {
  filteredTransactions: Transactions[];
  getTransactionIcon: (type: TransactionType) => React.JSX.Element;
}

function TransactionMobileView({
  filteredTransactions,
  getTransactionIcon
}: TransactionMobileViewProps) {
  return (
    <div className="md:hidden">
      {filteredTransactions.map((transaction) => (
        <div key={transaction.transaction_id} className="p-4 border-b">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-medium text-gray-900">
              {transaction.id}
            </span>
            <span
              className={`px-2 py-1 text-xs rounded-full ${
                transaction.status === "completed"
                  ? "bg-green-100 text-green-800"
                  : transaction.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {transaction.status}
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {getTransactionIcon(transaction.type)}
                <span className="ml-2 text-sm text-gray-600 capitalize">
                  {transaction.type}
                </span>
              </div>
              <span className="text-sm font-medium">
                ${transaction.amount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Date</span>
              <span className="text-sm text-gray-900">
                {formatDate(transaction.created_at)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TransactionMobileView;
