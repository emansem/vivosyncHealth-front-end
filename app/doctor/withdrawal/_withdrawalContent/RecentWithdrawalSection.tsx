import { recentWithdrawals } from "@/data/recentWithdrawal";
import { WithdrawalCard } from "./WithdrawalCard";

function RecentWithdrawalSection() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Withdrawals</h2>
      <div className="space-y-4">
        {recentWithdrawals.map((withdrawal) => (
          <WithdrawalCard key={withdrawal.id} {...withdrawal} />
        ))}
      </div>
    </div>
  );
}

export default RecentWithdrawalSection;
