"use client";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { useGetWwithdrawalAccount } from "@/src/hooks/withdrawalAccount/useWithdrawalAccount";
import { Landmark } from "lucide-react";
import React from "react";
import { UpdateWithdrawalAccount } from "./UpdateBankAccount";
import { useOpenAndClose } from "@/app/lib/hooks";

function WithdrawalAccount() {
  const { data } = useGetWwithdrawalAccount();
  const { handle0pen, open, handleClose } = useOpenAndClose();
  console.log(data);
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Bank Account</h2>
        <button onClick={handle0pen} className="text-primary_color text-sm">
          Change Bank
        </button>
      </div>
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
        <Landmark className="w-6 h-6 text-gray-600" />
        <div>
          <p className="font-medium">{data?.data.account.bank_name}</p>
          <p className="text-sm text-gray-600">
            {data?.data.account.account_number.toString().slice(0, 4)} **** ****
          </p>
        </div>
      </div>
      {open && <UpdateWithdrawalAccount handleClose={handleClose} />}
    </div>
  );
}

export function NoWithdrawalAccount({
  handleOPen
}: {
  handleOPen: () => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center flex-col gap-4  mb-4">
        <h2 className="text-xl  font-semibold">Add new withdrawal account</h2>
        <p className="text-base text-center text-text_color2">
          To request a withdrawal, you need to set up your withdrawal account
        </p>
      </div>
      <div
        onClick={handleOPen}
        className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
      >
        <PrimaryButton color="text-white" backgroud>
          Add account
        </PrimaryButton>
      </div>
    </div>
  );
}

export default WithdrawalAccount;
