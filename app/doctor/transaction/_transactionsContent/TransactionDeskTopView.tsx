import { Transactions } from "@/app/lib/types";
import { TransactionType } from "../page";
import { formatDate } from "@/src/helper/helper";

interface TransactionDeskTopViewProps {
  filteredTransactions: Transactions[];

  getTransactionIcon: (type: TransactionType) => React.JSX.Element;
}
function TransactionDeskTopView({
  filteredTransactions,

  getTransactionIcon
}: TransactionDeskTopViewProps) {
  return (
    <div className="hidden md:block">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Transaction ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredTransactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {transaction.transaction_id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {getTransactionIcon(transaction.type)}
                  <span className="ml-2 text-sm text-gray-900 capitalize">
                    {transaction.type}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${transaction.amount.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDate(transaction.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionDeskTopView;
