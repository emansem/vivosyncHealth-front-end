import { getStatusColor } from "@/src/components/utils/getStatusColor";
import { formatDate } from "@/src/helper/helper";
import { TableBodyProps } from "@/src/types/general";

export const TableBody = ({
  subscriptionData,
  startIndex,
  endIndex
}: TableBodyProps) => {
  return (
    <tbody>
      {subscriptionData?.slice(startIndex, endIndex).map((item, index) => (
        <tr className="cursor-pointer hover:bg-gray-50" key={index}>
          <td className="capitalize">{item.plan_type}</td>
          <td>{item.amount.toFixed(2)}</td>
          <td>{formatDate(item.created_at)}</td>
          <td>{formatDate(item.expire_date)}</td>
          <td>
            <span
              className={`
              px-3 py-1 rounded-full text-sm font-medium
              ${getStatusColor(item.subscription_status)}
            `}
            >
              {item.subscription_status}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
