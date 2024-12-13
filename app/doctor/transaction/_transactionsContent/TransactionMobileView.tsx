import { Transactions } from "@/app/lib/types";
import { formatDate } from "@/src/helper/helper";

interface TransactionMobileViewProps {
  filteredTransactions: Transactions[];
}

function TransactionMobileView({
  filteredTransactions
}: TransactionMobileViewProps) {
  return (
    <div className="md:hidden">
      {filteredTransactions.map((transaction) => (
        <div
          key={transaction.transaction_id}
          className="p-4 hover:bg-primary_color/10 border-b"
        >
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium text-base py-1">
              Transaction Id
            </span>
            <span className="text-sm text-gray-900">
              {transaction.transaction_id}
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-gray-600 font-medium text-base py-1 capitalize">
                  {transaction.type}
                </span>
              </div>
              <span className="text-sm font-medium">
                ${transaction.amount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium text-base py-1">
                Date
              </span>
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
