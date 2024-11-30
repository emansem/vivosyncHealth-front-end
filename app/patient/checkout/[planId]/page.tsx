"use client";

import { BadgeJapaneseYen, CreditCard, Lock, Wallet } from "lucide-react";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { PaymentForm } from "./_planidContent/PaymentForm";
import { OrderSummary } from "./_planidContent/OrderSummary";
import { useParams } from "next/navigation";
import { useSubscription } from "@/src/hooks/useSubscription";
import { SubscriptionPlanDataType } from "@/app/lib/types";
import { ChangeEvent, useState } from "react";
import SelectInput from "@/src/components/ui/forms/SelectInput";

// Interface definitions for payment and order types
export interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ElementType;
}

const CheckoutPage = () => {
  // State and hooks initialization
  const [selectedMethod, setSelectedMethod] = useState("mtn");
  const [paymentType, setPaymentType] = useState("");
  const param = useParams();
  const planId = param["planId"];

  // Custom hook for subscription management
  const {
    planDetails,
    phoneNumber,
    handleSubmitPaymentForm,
    handleGetPhoneNumber,
    isPending
  } = useSubscription(planId as string, selectedMethod);

  const handleSelectPaymentType = (e: ChangeEvent<HTMLSelectElement>) => {
    setPaymentType(e.target.value);
  };
  console.log("Payment type", paymentType);

  // Available payment methods configuration
  const paymentMethods: PaymentMethod[] = [
    { id: "credit-card", name: "Credit Card", icon: CreditCard },
    { id: "mtn", name: "Mobile Money", icon: BadgeJapaneseYen },
    { id: "orange", name: "Orange Money", icon: Wallet }
  ];
  const PAYMENT_TYPE_OPTIONS = [
    {
      label: "Select",
      value: ""
    },
    {
      label: "Pay with balance: $600",
      value: "payWithBalance"
    },
    {
      label: "Direct checkout",
      value: "directCheckout"
    }
  ];

  return (
    <div className="bg-white shadow-shadow3 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header section */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <div className="flex items-center text-gray-600">
            <Lock className="h-4 w-4 mr-2" />
            <span>Secure Checkout</span>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Payment form section */}

          <div>
            <div>
              <SelectInput
                id="paymentType"
                onChange={handleSelectPaymentType}
                value={paymentType}
                label="Select Payment Type"
                options={PAYMENT_TYPE_OPTIONS}
              />
            </div>
            {paymentType === "directCheckout" && (
              <PaymentForm
                value={phoneNumber}
                handleGetPhoneNumber={handleGetPhoneNumber}
                setSelectedMethod={setSelectedMethod}
                paymentMethods={paymentMethods}
                selectedMethod={selectedMethod}
              />
            )}

            {/* Payment button */}
            <div className="mt-4">
              <PrimaryButton
                isSubmitting={isPending}
                onClick={handleSubmitPaymentForm}
                backgroud
                color="text-white"
              >
                <div className="flex justify-center gap-2 item-center">
                  <Lock size={20} />
                  <span>
                    {isPending ? "Processing..." : "Complete Payment"}
                  </span>
                </div>
              </PrimaryButton>
            </div>

            {/* Security message */}
            <p className="mt-4 text-center text-sm text-gray-600">
              Your payment info is securely encrypted
            </p>
          </div>

          {/* Order summary section */}
          <div>
            <OrderSummary
              selectedPlan={planDetails as SubscriptionPlanDataType}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
