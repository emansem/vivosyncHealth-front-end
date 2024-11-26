"use client";
import { WITHDRAWAL_ACCOUNT_FIELDS } from "@/app/lib/constant";
import { WithdrawalAccountData } from "@/app/lib/types";
import CancelButton from "@/src/components/ui/button/CancelButton";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import Input from "@/src/components/ui/forms/Input";
import { CardLayout, PageHeading } from "@/src/components/ui/layout/CardLayout";
import { useAddWithdrawalAccount } from "@/src/hooks/withdrawalAccount/useWithdrawalAccount";

function AddWithdrawalAccount({ handleClose }: { handleClose: () => void }) {
  const { registerFields, errors, isPending, handleSubmit } =
    useAddWithdrawalAccount();

  return (
    <div className="fixed inset-0 transperentBg">
      <form onSubmit={handleSubmit}>
        <CardLayout>
          <PageHeading title="Add Your Withdrawal Account" />
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
              <PrimaryButton
                isSubmitting={isPending}
                backgroud
                color="text-white"
              >
                {isPending ? "Please wait.." : "Add account"}
              </PrimaryButton>
            </div>
          </div>
        </CardLayout>
      </form>
    </div>
  );
}

export default AddWithdrawalAccount;
