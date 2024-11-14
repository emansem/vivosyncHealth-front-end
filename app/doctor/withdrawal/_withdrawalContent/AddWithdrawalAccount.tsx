"use client";
import { WITHDRAWAL_ACCOUNT_FIELDS } from "@/app/lib/constant";
import { useWithdrawalAccount } from "@/app/lib/hooks";
import { WithdrawalAccountData } from "@/app/lib/types";
import CancelButton from "@/src/components/ui/button/CancelButton";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import Input from "@/src/components/ui/forms/Input";
import { CardLayout } from "@/src/components/ui/layout/CardLayout";

function AddWithdrawalAccount({ handleClose }: { handleClose: () => void }) {
  const { registerFields, errors, handleSubmit } = useWithdrawalAccount();

  return (
    <div className="fixed inset-0 transperentBg">
      <form onSubmit={handleSubmit}>
        <CardLayout>
          {WITHDRAWAL_ACCOUNT_FIELDS.map((field) => (
            <Input
              {...registerFields[field.name as keyof WithdrawalAccountData]}
              key={field.name}
              name={field.name}
              error={errors[field.name as keyof WithdrawalAccountData]?.message}
              inputType={field.type}
              inputPlaceholder={field.placehoder}
            />
          ))}
          <div className="flex justify-end mt-4 gap-4">
            <div className="w-1/2">
              <CancelButton handleClick={handleClose}>Cancel</CancelButton>
            </div>
            <div className="w-1/2">
              <PrimaryButton backgroud color="text-white">
                Add account
              </PrimaryButton>
            </div>
          </div>
        </CardLayout>
      </form>
    </div>
  );
}

export default AddWithdrawalAccount;
