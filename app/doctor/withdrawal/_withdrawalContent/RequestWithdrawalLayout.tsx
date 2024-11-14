"use client";
import WithdrawalAccount from "./WithdrawalAccount";

import RequestWithdrawal from "./RequestWithdrawal";

function RequestWithdrawalLayout() {
  return (
    <div className="space-y-6">
      <RequestWithdrawal />

      {/* Bank Information */}
      <WithdrawalAccount />
    </div>
  );
}

export default RequestWithdrawalLayout;
