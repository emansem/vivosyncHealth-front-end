import { subscriptionTableHeaders } from "@/app/lib/constant";
import { SubscriptionData } from "@/app/lib/types";
import PaginationButton from "@/src/components/utils/table/Pagination";
import { formatDate, capitalizeFirstLetter } from "@/src/helper/helper";
import { ChevronRight } from "lucide-react";

interface SubscriptionTableProps {
  handlePrevButton: () => void;
  getPageNumber: (page: number) => void;
  handleNextButton: () => void;
  endIndex: number;
  pageNumber: number;
  totalResult: number;
  pages: number[];
  subscriptions: SubscriptionData[];
}

// Centralized styles object for the component
export const styles = {
  icon: "w-8 h-8 cursor-pointer text-secondary_color  hover:bg-secondary_color hover:text-white duration-200 transition-all ease-in-out bg-primary_color/10 rounded-full p-1",
  container: "bg-white p-6 rounded-lg shadow",
  title: "text-xl font-bold mb-4",
  tableWrapper: "overflow-x-auto",
  table: "w-full",
  tableHead: "bg-gray-50",
  tableBody: "divide-y divide-gray-200",
  tableRow: "hover:bg-gray-50",
  cell: {
    base: "px-6 py-4 whitespace-nowrap  text-sm",
    header: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500",
    content: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
    right: "px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right"
  },
  status: {
    active: "text-green-600 bg-green-100",
    expired: "text-red-600 bg-red-100",
    cancelled: "text-gray-600 bg-gray-100",
    badge: "px-2 py-1 rounded-full"
  },
  autoRenew: {
    active: "text-green-600",
    inactive: "text-gray-600"
  }
};

// Returns the appropriate color classes for subscription status
export const getStatusColor = (status: string) => {
  const statusColors = {
    active: styles.status.active,
    expired: styles.status.expired,
    cancelled: styles.status.cancelled
  };
  return statusColors[status as keyof typeof statusColors] || "";
};
export const SubscriptionTable = ({
  subscriptions,
  handleNextButton,
  handlePrevButton,
  endIndex,
  pages,

  totalResult,
  getPageNumber,
  pageNumber
}: SubscriptionTableProps) => {
  const showPagination = totalResult > 11;
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Subscription History</h2>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              {subscriptionTableHeaders.map((header) => (
                <th
                  key={header.key}
                  className={`${styles.cell.header} text-${header.align}`}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className={styles.tableBody}>
            {subscriptions?.map((subscription) => (
              <tr key={subscription.id} className={styles.tableRow}>
                <td className={styles.cell.content}>
                  {subscription.doctor_name}
                </td>
                <td className={styles.cell.content}>
                  {subscription.doctor_id}
                </td>
                <td className={`capitalize ${styles.cell.content}`}>
                  {subscription.plan_type}
                </td>
                <td className={styles.cell.content}>
                  {formatDate(subscription.created_at)}
                </td>
                <td className={styles.cell.content}>
                  {formatDate(subscription.expire_date as string)}
                </td>
                <td className={styles.cell.base}>
                  <span
                    className={`${getStatusColor(
                      subscription.subscription_status
                    )} ${styles.status.badge}`}
                  >
                    {capitalizeFirstLetter(subscription.subscription_status)}
                  </span>
                </td>
                <td className={styles.cell.right}>${subscription.amount}</td>
                <td className={styles.cell.base}>
                  <a
                    className="flex justify-end"
                    href={`/patient/subscription/${subscription.id}`}
                  >
                    <ChevronRight className={styles.icon} />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showPagination && (
          <PaginationButton
            pageNumber={pageNumber}
            totalResult={totalResult}
            result={endIndex}
            handlePrevButton={handlePrevButton}
            handleNextButton={handleNextButton}
            getPageNumber={getPageNumber}
            pages={pages}
          />
        )}
      </div>
    </div>
  );
};
