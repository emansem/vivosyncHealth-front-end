import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { CreditCard, Loader2, Lock } from "lucide-react";

interface BalanceCardProps {
  requiredAmount: number;
  onPay: () => void;
  isLoading?: boolean;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  requiredAmount,
  onPay,
  isLoading
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-shadow3 border-2 border-primary_color/10 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary_color/5 rounded-full blur-xl" />
      <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-secondary_color/5 rounded-full blur-xl" />

      {/* Amount display */}
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-primary_color/10 rounded-full flex items-center justify-center">
          <CreditCard className="w-8 h-8 text-primary_color" />
        </div>

        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-700">Amount to Pay</h3>
          <p className="text-3xl font-bold text-primary_color">
            ${requiredAmount.toLocaleString()}
          </p>
        </div>

        <>
          {/* Payment button */}
          <div className="mt-4 w-full">
            <PrimaryButton
              isSubmitting={isLoading}
              onClick={onPay}
              backgroud
              color="text-white"
            >
              <div className="flex justify-center gap-2 item-center">
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Lock size={20} />
                )}
                <span>{isLoading ? "Processing..." : "Pay with Balance"}</span>
              </div>
            </PrimaryButton>
          </div>
          {/* Security message */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Your payment info is securely encrypted
          </p>
        </>
      </div>
    </div>
  );
};
