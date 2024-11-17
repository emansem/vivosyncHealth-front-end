import { SubscriptionTableProps } from "@/app/lib/types";

export const SubscriptionTable = ({
  subscriptions
}: SubscriptionTableProps) => {
  // Helper function to get status color classes
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100";
      case "expired":
        return "text-red-600 bg-red-100";
      case "cancelled":
        return "text-gray-600 bg-gray-100";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Subscription History</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Doctor Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Doctor ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Plan
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                End Date
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                Amount
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">
                Auto Renew
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {subscriptions.map((subscription) => (
              <tr key={subscription.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {subscription.doctorName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {subscription.doctorId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                  {subscription.plan}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(subscription.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(subscription.endDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`${getStatusColor(
                      subscription.status
                    )} px-2 py-1 rounded-full`}
                  >
                    {subscription.status.charAt(0).toUpperCase() +
                      subscription.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                  ${subscription.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <span
                    className={
                      subscription.autoRenew
                        ? "text-green-600"
                        : "text-gray-600"
                    }
                  >
                    {subscription.autoRenew ? "Yes" : "No"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
