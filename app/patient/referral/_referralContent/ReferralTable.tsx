import { ReferralTableProps } from "@/app/lib/types";
import { getStatusColor } from "./ReferralStatus";

export const ReferralTable = ({ referrals }: ReferralTableProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Referral History</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Referred User
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Joined Date
              </th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">
                Reward Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {referrals.map((referral) => (
              <tr key={referral.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {referral.referredUser}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={`${getStatusColor(
                      referral.status
                    )} px-2 py-1 rounded-full`}
                  >
                    {referral.status.charAt(0).toUpperCase() +
                      referral.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(referral.joinedDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                  ${referral.reward}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
