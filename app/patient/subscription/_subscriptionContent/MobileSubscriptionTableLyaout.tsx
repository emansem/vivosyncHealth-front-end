import { SubscriptionData } from "@/app/lib/types";
import { capitalizeFirstLetter, formatDate } from "@/src/helper/helper";
// import Link from "next/link";
import { getStatusColor, styles } from "./SubscriptionTable";
// Update the MobileTableProps interface to include align
interface MobileTableProps {
  data: SubscriptionData[];
  fields: {
    key: keyof SubscriptionData;
    label: string;
  }[];
}

function MobileSubscriptionTableLyaout({ data, fields }: MobileTableProps) {
  return (
    <div className="w-full md:hidden space-y-4">
      {data?.map((subscription, index) => (
        <div
          key={subscription.id || index}
          className="bg-white rounded-lg shadow-sm border overflow-hidden"
        >
          {/* Each info row */}
          <div className="divide-y">
            {fields.map((field, fieldIndex) => (
              <div
                key={fieldIndex}
                className="flex justify-between p-4 hover:bg-gray-50"
              >
                <span className="text-gray-600 font-medium">{field.label}</span>

                {field.key === "subscription_status" ? (
                  <span
                    className={`${getStatusColor(
                      subscription.subscription_status
                    )} ${styles.status.badge}`}
                  >
                    {capitalizeFirstLetter(subscription.subscription_status)}
                  </span>
                ) : (
                  <span className="capitalize">
                    {field.key === "expire_date" || field.key === "created_at"
                      ? formatDate(subscription[field.key])
                      : subscription[field.key]}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MobileSubscriptionTableLyaout;
