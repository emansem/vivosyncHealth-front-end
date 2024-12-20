import { Card } from "@/src/components/utils/Card";
import { CheckCircle, XCircle } from "lucide-react";
import { StatusBadge } from "./SatausBadge";
import { SubscriptionData } from "@/app/lib/types";
import { formatDate } from "@/src/helper/helper";
interface SubscriptionMobileViewProps {
  subscriptions: SubscriptionData[];
}

function SubscriptionMobileView({
  subscriptions
}: SubscriptionMobileViewProps) {
  return (
    <div className="md:hidden space-y-4">
      {subscriptions.map((subscription) => (
        <Card key={subscription.id} className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                {/* <h3 className="font-medium text-stone-800">
                  {subscription.customerName}
                </h3>
                <p className="text-sm text-stone-500">{subscription.id}</p> */}
              </div>
              <StatusBadge status={subscription.subscription_status} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-stone-500">Plan</p>
                <p className="font-medium text-stone-800">
                  {subscription.plan_type}
                </p>
              </div>
              <div>
                <p className="text-sm text-stone-500">Amount</p>
                <p className="font-medium text-stone-800">
                  {subscription.amount}
                </p>
              </div>
              <div>
                <p className="text-sm text-stone-500">Start Date</p>
                <p className="text-stone-600">
                  {formatDate(subscription.created_at as string)}
                </p>
              </div>
              <div>
                <p className="text-sm text-stone-500">End Date</p>
                <p className="text-stone-600">
                  {formatDate(subscription.expire_date as string)}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-stone-200">
              <div className="flex items-center gap-2">
                <span className="text-sm text-stone-500">Auto Renewal:</span>
                {subscription.auto_renew ? (
                  <CheckCircle size={18} className="text-green-500" />
                ) : (
                  <XCircle size={18} className="text-red-500" />
                )}
              </div>
              {/* <div className="flex gap-2">
                <button className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
                  <RefreshCcw size={18} className="text-stone-400" />
                </button>
                <button className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
                  <AlertCircle size={18} className="text-stone-400" />
                </button>
              </div> */}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default SubscriptionMobileView;
