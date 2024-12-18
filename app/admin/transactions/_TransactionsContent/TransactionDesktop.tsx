import { Card } from "@/src/components/utils/Card";
import { FileText } from "lucide-react";
import React from "react";
import { StatusBadge } from "./StatusBadge";
import { TypeBadge } from "./TypeBadge";
import { Transactions } from "@/app/lib/types";
import PaginationButton from "@/src/components/utils/table/Pagination";
interface TransactionDesktopProps {
  transactions: Transactions[];
  handlePrevButton: () => void;
  getPageNumber: (page: number) => void;
  handleNextButton: () => void;
  endIndex: number;
  pageNumber: number;
  totalResult: number;
  startIndex: number;
  pages: number[];
}

function TransactionDesktop({
  transactions,
  handleNextButton,
  handlePrevButton,
  endIndex,
  pages,
  totalResult,
  getPageNumber,
  pageNumber
}: TransactionDesktopProps) {
  const ADMIN_TRANSACTION_TABLE_HEADER = [
    {
      label: "Transaction ID",
      className: "text-left py-4 px-6 text-stone-600 font-medium"
    },
    {
      label: "Type",
      className: "text-left py-4 px-6 text-stone-600 font-medium"
    },
    // {
    //   label: "Customer",
    //   className: "text-left py-4 px-6 text-stone-600 font-medium"
    // },
    {
      label: "Amount",
      className: "text-right py-4 px-6 text-stone-600 font-medium" // Note: this one has text-right alignment
    },
    {
      label: "Status",
      className: "text-left py-4 px-6 text-stone-600 font-medium"
    },
    {
      label: "Date",
      className: "text-left py-4 px-6 text-stone-600 font-medium"
    },
    {
      label: "Actions",
      className: "text-center py-4 px-6 text-stone-600 font-medium" // Note: this one has text-center alignment
    }
  ];
  return (
    <div className="hidden md:block">
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                {ADMIN_TRANSACTION_TABLE_HEADER.map((iteam, index) => (
                  <th key={index} className={iteam.className}>
                    {iteam.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {transactions?.map((transaction, index) => (
                <tr key={index} className="hover:bg-stone-50">
                  <td className="py-4 px-6 font-medium text-stone-800">
                    {transaction.transaction_id}
                  </td>
                  <td className="py-4 px-6">
                    <TypeBadge type={transaction.type} />
                  </td>
                  {/* <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-stone-800">
                        {transaction.customer.name}
                      </div>
                      <div className="text-sm text-stone-500">
                        ID: {transaction.customer.id}
                      </div>
                    </div>
                  </td> */}
                  <td className="py-4 px-6 text-right">
                    <span
                      className={`font-medium ${
                        transaction.type === "refund" ||
                        transaction.type === "withdrawal"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {transaction.type === "refund" ||
                      transaction.type === "withdrawal"
                        ? "-"
                        : "+"}
                      ${transaction.amount.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={transaction.status || "completed"} />
                  </td>
                  <td className="py-4 px-6 text-stone-600">
                    {new Date(transaction.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        // onClick={() => viewTransactionDetail(transaction)}
                        className="p-2 hover:bg-stone-100 rounded-lg transition-colors"
                      >
                        <FileText size={18} className="text-stone-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-6">
            <PaginationButton
              pageNumber={pageNumber}
              totalResult={totalResult}
              result={endIndex}
              handlePrevButton={handlePrevButton}
              handleNextButton={handleNextButton}
              getPageNumber={getPageNumber}
              pages={pages}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default TransactionDesktop;
