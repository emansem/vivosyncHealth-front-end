import { WITHDRAWAL_ACCOUNT_FIELDS } from "@/app/lib/constant";
import CancelButton from "@/src/components/ui/button/CancelButton";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import Input from "@/src/components/ui/forms/Input";
import { CardLayout } from "@/src/components/ui/layout/CardLayout";

function AddWithdrawalAccount() {
  return (
    <div className="fixed right-0 left-0 bottom-0 top-0 transperentBg">
      <CardLayout>
        {WITHDRAWAL_ACCOUNT_FIELDS.map((field) => (
          <Input
            key={field.name}
            name={field.name}
            inputType={field.type}
            inputPlaceholder={field.placehoder}
          />
        ))}
        <div className="flex justify-end mt-4 gap-4">
          <div className="w-1/2">
            <CancelButton>Cancel</CancelButton>
          </div>
          <div className="w-1/2">
            <PrimaryButton backgroud color="text-white">
              Add account
            </PrimaryButton>
          </div>
        </div>
      </CardLayout>
    </div>
  );
}

export default AddWithdrawalAccount;
