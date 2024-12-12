import {
  getStatusColor,
  styles
} from "@/app/patient/subscription/_subscriptionContent/SubscriptionTable";
import { capitalizeFirstLetter, formatDate } from "@/src/helper/helper";
import { Patient } from "@/src/types/general";

interface MobileTableProps {
  data: Patient[];
  fields: {
    key: keyof Patient;
    label: string;
  }[];
}

export function MobileSubscriptionTableLyaout({
  data,
  fields
}: MobileTableProps) {
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
                      ? formatDate(subscription[field.key] as string)
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
