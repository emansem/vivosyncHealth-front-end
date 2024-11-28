"use client";
import { BadgeJapaneseYen, CreditCard, Lock, Wallet } from "lucide-react";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { PaymentForm } from "./_planidContent/PaymentForm";
import { OrderSummary } from "./_planidContent/OrderSummary";
import { useParams } from "next/navigation";
import { useSubscription } from "@/src/hooks/useSubscription";
import { SubscriptionPlanDataType } from "@/app/lib/types";
import { useState } from "react";

// Types for our checkout components
export interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ElementType;
}

export interface OrderSummaryItem {
  name: string;
  duration: string;
  price: number;
}

// Main Checkout Page
const CheckoutPage = () => {
  const [selectedMethod, setSelectedMethod] = useState("mtn");

  const param = useParams();
  const planId = param["planId"];

  const {
    planDetails,
    phoneNumber,
    handleSubmitPaymentForm,
    handleGetPhoneNumber,
    isPending
  } = useSubscription(planId as string, selectedMethod);

  const paymentMethods: PaymentMethod[] = [
    { id: "credit-card", name: "Credit Card", icon: CreditCard },
    { id: "mtn", name: "Mobile Money", icon: BadgeJapaneseYen },
    { id: "orange", name: "Orange Money", icon: Wallet }
  ];
  return (
    <div className=" bg-white shadow-shadow3 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <div className="flex items-center text-gray-600">
            <Lock className="h-4 w-4 mr-2" />
            <span>Secure Checkout</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left side - Payment Form */}
          <div>
            <PaymentForm
              value={phoneNumber}
              handleGetPhoneNumber={handleGetPhoneNumber}
              setSelectedMethod={setSelectedMethod}
              paymentMethods={paymentMethods}
              selectedMethod={selectedMethod}
            />
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

            <p className="mt-4 text-center text-sm text-gray-600">
              Your payment info is securely encrypted
            </p>
          </div>

          {/* Right side - Order Summary */}
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
