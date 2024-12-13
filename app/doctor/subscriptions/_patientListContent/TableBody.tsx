import {
  getStatusColor,
  styles
} from "@/app/patient/subscription/_subscriptionContent/SubscriptionTable";
import { formatDate } from "@/src/helper/helper";
import { TableBodyProps } from "@/src/types/general";

export const TableBody = ({ subscriptionData }: TableBodyProps) => {
  return (
    <tbody>
      {subscriptionData?.map((item, index) => (
        <tr className="cursor-pointer hover:bg-gray-50" key={index}>
          <td className="capitalize">{item.plan_type}</td>
          <td>{item.amount.toFixed(2)}</td>
          <td>{formatDate(item.created_at)}</td>
          <td>{formatDate(item.expire_date)}</td>
          <td>
            <span
              className={`${getStatusColor(item.subscription_status)} ${
                styles.status.badge
              }`}
            >
              {item.subscription_status}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
