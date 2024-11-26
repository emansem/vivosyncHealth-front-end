import { UPDATE_WITHDRAWAL_ACCOUNT_FIELDS } from "@/app/lib/constant";
import CancelButton from "@/src/components/ui/button/CancelButton";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import Input from "@/src/components/ui/forms/Input";
import { CardLayout, PageHeading } from "@/src/components/ui/layout/CardLayout";
import { useUpdateWithdrawalAccount } from "@/src/hooks/withdrawalAccount/useWithdrawalAccount";
interface WithdrawalAccountApiRespone {
  //   data: {
  //     account: WithdrawalAccountData;
  //   };
  handleClose: () => void;
}

export function UpdateWithdrawalAccount({
  handleClose
}: WithdrawalAccountApiRespone) {
  const { accountData, isPending, handleSubmit, handleUpdateAccountInputs } =
    useUpdateWithdrawalAccount();
  return (
    <div className="fixed inset-0 transperentBg">
      <CardLayout>
        <PageHeading title="Add Your Withdrawal Account" />
        {UPDATE_WITHDRAWAL_ACCOUNT_FIELDS.map((field) => (
          <Input
            key={field.name}
            onChange={handleUpdateAccountInputs}
            name={field.name}
            value={accountData[field.name] || ""}
            inputType={field.type}
            inputPlaceholder={field.placeHolder}
          />
        ))}
        <div className="flex justify-end mt-4 gap-4">
          <div className="w-1/2">
            <CancelButton handleClick={handleClose}>Cancel</CancelButton>
          </div>
          <div className="w-1/2">
            <PrimaryButton
              onClick={handleSubmit}
              isSubmitting={isPending}
              backgroud
              color="text-white"
            >
              {isPending ? "Saving..." : "Update Details"}
            </PrimaryButton>
          </div>
        </div>
      </CardLayout>
    </div>
  );
}
