import { Transactions } from "@/app/lib/types";
import { formatDate } from "@/src/helper/helper";
import { ArrowDown, ArrowUp, CreditCard } from "lucide-react";
interface TransactionItemProps {
  transactions: Transactions[];
}

const GetTransactionIcon = (type: string) => {
  switch (type) {
    case "subscription":
      return <CreditCard className="text-secondary_color" />;

    case "deposit":
      return <ArrowUp className="text-blue-600" />;
    case "withdrawal":
      return <ArrowDown className="text-red-600" />;
    default:
      break;
  }
};

export const TransactionItem = ({ transactions }: TransactionItemProps) => {
  return (
    <>
      {transactions.map((transaction, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 hover:bg-stone-50 rounded-xl transition-colors"
        >
          <div className="flex gap-4 items-center">
            <div
              className={`p-3 rounded-xl 
         bg-secondary bg-stone-100
        `}
            >
              {GetTransactionIcon(transaction.type)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className=" capitalize font-medium text-stone-800">
                  {transaction.transaction_id}
                </p>
                {/* <span
            className={`text-xs px-2 py-1 rounded-full ${
              status === "Completed" ? "bg-secondary" : "bg-stone-100"
            }`}
            style={{
              color: status === "Completed" ? colors.primary : colors.stone[600]
            }}
          >
            {status}
          </span> */}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm capitalize text-stone-500">
                  {transaction.type}
                </span>
                <span className="w-1 h-1 rounded-full bg-stone-300" />
                <span className="text-sm text-stone-500">
                  {formatDate(transaction.created_at)}
                </span>
              </div>
            </div>
          </div>
          <p className={`font-medium `}>{transaction.amount.toFixed(2)}</p>
        </div>
      ))}
    </>
  );
};
