import AddWithdrawalAccount from "@/app/doctor/withdrawal/_withdrawalContent/AddWithdrawalAccount";
import {
  Wallet,
  ArrowDownRight,
  CreditCard,
  AlertCircle,
  Plus
} from "lucide-react";
import { WithdrawalAccount } from "./WithdrawalPage";
interface BalanceCardSectionProps {
  handleCloseModal: () => void;
  balance: number;
  handle0penModal: () => void;

  isOpen: boolean;
  withdrawalAccount: WithdrawalAccount;
}

function BalanceCardSection({
  handle0penModal,
  handleCloseModal,
  balance,

  withdrawalAccount,
  isOpen
}: BalanceCardSectionProps) {
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
            // disabled={!withdrawalAccount}
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
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-secondary_color/10 p-3 rounded-xl">
            <CreditCard className="w-6 h-6 text-secondary_color" />
          </div>
          <h2 className="text-lg font-semibold">Withdrawal Account</h2>
        </div>

        {withdrawalAccount ? (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Bank Name</p>
              <p className="font-medium">{withdrawalAccount.bank}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Account Number</p>
              <p className="font-medium">{withdrawalAccount.accountNumber}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">No withdrawal account added</p>
            <button
              onClick={handle0penModal}
              className="inline-flex items-center gap-2 py-2 px-4 rounded-lg bg-secondary_color/10 text-secondary_color hover:bg-secondary_color/20 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Withdrawal Account
            </button>
            {isOpen && <AddWithdrawalAccount handleClose={handleCloseModal} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default BalanceCardSection;
