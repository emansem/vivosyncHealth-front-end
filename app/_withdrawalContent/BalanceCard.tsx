import { Wallet, ArrowDownRight } from "lucide-react";
import { WithdrawalAccountData } from "@/app/lib/types";
import { WithdrawalAccountSection } from "./WithdrawalAccountSection";
interface BalanceCardSectionProps {
  handleCloseModal: () => void;
  balance: number;
  handle0penModal: () => void;
  noAccount: boolean;
  isOpen: boolean;
  withdrawalAccount: WithdrawalAccountData;
}

function BalanceCardSection({
  handle0penModal,
  handleCloseModal,
  balance,
  withdrawalAccount,
  isOpen
}: BalanceCardSectionProps) {
  const isWithdrawalAccount = withdrawalAccount ? true : false;

  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      {/* Balance Card */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-40 h-40 bg-primary_color/5 rounded-full blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary_color/10 p-3 rounded-xl">
              <Wallet className="w-6 h-6 text-primary_color" />
            </div>
            <h2 className="text-lg font-semibold">Available Balance</h2>
          </div>
          <div className="mb-6">
            <p className="text-3xl font-bold text-primary_color">
              ${balance.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Available for withdrawal
            </p>
          </div>
          <button
            // onClick={handleRequestWithdrawal}
            disabled={isWithdrawalAccount}
            className={`w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 
                 ${
                   withdrawalAccount
                     ? "bg-primary_color hover:bg-primary_color/90 text-white"
                     : "bg-gray-100 text-gray-400 cursor-not-allowed"
                 }
                 transition-all duration-200`}
          >
            <ArrowDownRight className="w-5 h-5" />
            Request Withdrawal
          </button>
        </div>
      </div>

      {/* Withdrawal Account Card */}
      <WithdrawalAccountSection
        handle0penModal={handle0penModal}
        handleCloseModal={handleCloseModal}
        isOpen={isOpen}
        withdrawalAccount={withdrawalAccount}
      />
    </div>
  );
}

export default BalanceCardSection;
