import { Card } from "@/src/components/utils/Card";
import { CheckCircle, XCircle } from "lucide-react";
import React from "react";
import { subscriptions } from "../page";
import { StatusBadge } from "./SatausBadge";
const tableColumns = [
  {
    key: "customer",
    title: "Customer",
    align: "left",
    className: "text-left py-4 px-6 text-stone-600 font-medium"
  },
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
  //   {
  //     key: "actions",
  //     title: "Actions",
  //     align: "left",
  //     className: "text-left py-4 px-6 text-stone-600 font-medium"
  //   }
];

function SubscriptionDesktopView() {
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
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-stone-800">
                        {subscription.customerName}
                      </div>
                      <div className="text-sm text-stone-500">
                        {subscription.id}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-stone-600">
                    {subscription.planName}
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge status={subscription.status} />
                  </td>
                  <td className="py-4 px-6 text-stone-600">
                    {new Date(subscription.startDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-stone-600">
                    {new Date(subscription.endDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 font-medium text-stone-800">
                    {subscription.amount}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {subscription.autoRenewal ? (
                      <CheckCircle
                        size={20}
                        className="text-green-500 mx-auto"
                      />
                    ) : (
                      <XCircle size={20} className="text-red-500 mx-auto" />
                    )}
                  </td>
                  {/* <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button className="text-stone-400 hover:text-primary transition-colors">
                        <RefreshCcw size={18} />
                      </button>
                      <button className="text-stone-400 hover:text-primary transition-colors">
                        <AlertCircle size={18} />
                      </button>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default SubscriptionDesktopView;
