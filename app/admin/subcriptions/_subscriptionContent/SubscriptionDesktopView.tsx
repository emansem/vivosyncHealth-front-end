import { Card } from "@/src/components/utils/Card";
import { CheckCircle, XCircle } from "lucide-react";
import React from "react";
import { StatusBadge } from "./SatausBadge";
import { SubscriptionData } from "@/app/lib/types";
import PaginationButton from "@/src/components/utils/table/Pagination";
import { formatDate } from "@/src/helper/helper";
const tableColumns = [
  {
    key: "plan",
    title: "Plan",
    align: "left",
    className: "text-left py-4 px-6 text-stone-600 font-medium"
  },
  {
    key: "status",
    title: "Status",
    align: "left",
    className: "text-left py-4 px-6 text-stone-600 font-medium"
  },
  {
    key: "startDate",
    title: "Start Date",
    align: "left",
    className: "text-left py-4 px-6 text-stone-600 font-medium"
  },
  {
    key: "endDate",
    title: "End Date",
    align: "left",
    className: "text-left py-4 px-6 text-stone-600 font-medium"
  },
  {
    key: "amount",
    title: "Amount",
    align: "left",
    className: "text-left py-4 px-6 text-stone-600 font-medium"
  },
  {
    key: "autoRenewal",
    title: "Auto Renewal",
    align: "center",
    className: "text-center py-4 px-6 text-stone-600 font-medium"
  }
];
interface SubscriptionDesktopViewProps {
  subscriptions: SubscriptionData[];
  handlePrevButton: () => void;
  getPageNumber: (page: number) => void;
  handleNextButton: () => void;
  endIndex: number;
  pageNumber: number;
  totalResult: number;
  startIndex: number;
  pages: number[];
}

function SubscriptionDesktopView({
  subscriptions,
  handleNextButton,
  handlePrevButton,
  endIndex,
  pages,
  totalResult,
  getPageNumber,
  pageNumber
}: SubscriptionDesktopViewProps) {
  return (
    <div className="hidden md:block">
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                {tableColumns.map((column) => (
                  <th key={column.key} className={column.className}>
                    {column.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {subscriptions.map((subscription) => (
                <tr key={subscription.id} className="hover:bg-stone-50">
                  <td className="py-4 capitalize px-6 text-stone-600">
                    {subscription.plan_type}
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={subscription.subscription_status} />
                  </td>
                  <td className="py-4 px-6 text-stone-600">
                    {formatDate(subscription.created_at as string)}
                  </td>
                  <td className="py-4 px-6 text-stone-600">
                    {formatDate(subscription.expire_date as string)}
                  </td>
                  <td className="py-4 px-6 font-medium text-stone-800">
                    {subscription.amount}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {subscription.auto_renew ? (
                      <CheckCircle
                        size={20}
                        className="text-green-500 mx-auto"
                      />
                    ) : (
                      <XCircle size={20} className="text-red-500 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalResult >= 11 && (
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
        )}
      </Card>
    </div>
  );
}

export default SubscriptionDesktopView;
