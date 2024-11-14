import { minWithdrawal } from "@/app/lib/constant";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import Input from "@/src/components/ui/forms/Input";
import React from "react";

function RequestWithdrawal() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Request Withdrawal</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <Input inputType="number" inputPlaceholder="Enter amount" />
          <Input
            inputType="password"
            inputPlaceholder="Enter withdrawal password"
          />
          <p className="text-sm text-gray-500 mt-1">
            Minimum withdrawal: {minWithdrawal.toLocaleString()}
          </p>
        </div>
        <div>
          <PrimaryButton backgroud color="text-white">
            Request Withdrawal
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default RequestWithdrawal;
