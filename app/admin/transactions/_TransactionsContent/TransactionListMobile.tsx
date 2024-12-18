import { Card } from "@/src/components/utils/Card";
import { ChevronRight } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { TypeBadge } from "./TypeBadge";
import { Transactions } from "@/app/lib/types";
import { Button } from "@/src/components/utils/Button";
import { InnerPageLoader } from "@/src/components/ui/loading/InnerPageLoader";
import SubmittingLoader from "@/src/components/ui/loading/SubmittingLoader";
interface TransactionListMobileProps {
  transactions: Transactions[];
  handleSeeMoreBtn: () => void;
  isPending: boolean;
  totalResult: number;
}

function TransactionListMobile({
  transactions,
  isPending,
  totalResult,
  handleSeeMoreBtn
}: TransactionListMobileProps) {
  return (
    <div className="md:hidden space-y-4">
      {transactions?.map((transaction, index) => (
        <Card key={index} className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-stone-500">
                  {transaction.transaction_id}
                </p>
                {/* <p className="font-medium text-stone-800 mt-1">
                  {transaction.customer.name}
                </p> */}
              </div>
              <TypeBadge type={transaction.type} />
            </div>

            <div className="flex items-center justify-between">
              <StatusBadge status={transaction.status} />
              <span
                className={`font-medium ${
                  transaction.type === "refund"
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {transaction.type === "refund" ? "-" : "+"}$
                {transaction.amount.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-stone-200">
              <span className="text-sm text-stone-500">
                {new Date(transaction.created_at).toLocaleDateString()}
              </span>
              <button className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
                <ChevronRight size={18} className="text-stone-400" />
              </button>
            </div>
          </div>
        </Card>
      ))}
      {totalResult >= 11 && (
        <Button
          disabled={isPending}
          onClick={handleSeeMoreBtn}
          className="w-full my-4 disabled:cursor-not-allowed"
        >
          {isPending ? <SubmittingLoader text="Loading..." /> : "See More"}
        </Button>
      )}
    </div>
  );
}

export default TransactionListMobile;
