import { paymentMethods } from "@/app/lib/constant";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { CardLayout } from "@/src/components/ui/layout/CardLayout";
import { useAddAccountBalance } from "@/src/hooks/useAccountBalance";
import { X } from "lucide-react";
import { useState } from "react";
import { PaymentForm } from "../../checkout/[planId]/_planidContent/PaymentForm";

export const RechargeAccountForm = ({ handleClose }) => {
  const [selectedMethod, setSelectedMethod] = useState("mtn");
  const { handelOnChangeFormData, handleAddBalance, isPending, formData } =
    useAddAccountBalance(selectedMethod);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-stone-900/50">
      <CardLayout>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-medium text-stone-700">
            Add Money to your account
          </h1>
          <button
            onClick={handleClose}
            className="text-stone-500 hover:text-stone-700"
          >
            <X size={24} />
          </button>
        </div>

        <PaymentForm
          handleGetPhoneNumber={handelOnChangeFormData}
          amountInput
          amountValue={formData.amount}
          phoneNumberValue={formData.phone_number}
          paymentMethods={paymentMethods}
          selectedMethod={selectedMethod}
          setSelectedMethod={setSelectedMethod}
        />

        <div className="py-3">
          <PrimaryButton
            isSubmitting={isPending}
            onClick={handleAddBalance}
            backgroud
            color="text-white"
          >
            {isPending ? "Processing..." : "Add Balance"}
          </PrimaryButton>
        </div>
      </CardLayout>
    </div>
  );
};
