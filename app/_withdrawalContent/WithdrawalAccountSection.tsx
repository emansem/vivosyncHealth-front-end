import { AlertCircle, CreditCard, Plus } from "lucide-react";
import { WithdrawalAccountData } from "../lib/types";
import AddWithdrawalAccount from "./AddWithdrawalAccount";
import { UpdateWithdrawalAccount } from "./UpdateBankAccount";

interface WithdrawalAccountSectionProps {
  handleCloseModal: () => void;
  handle0penModal: () => void;
  isOpen: boolean;
  withdrawalAccount: WithdrawalAccountData;
}

export const WithdrawalAccountSection = ({
  handle0penModal,
  withdrawalAccount,
  isOpen,
  handleCloseModal
}: WithdrawalAccountSectionProps) => {
  return (
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
            <p className="font-medium">{withdrawalAccount?.bank_name}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <p className="text-sm text-gray-500">Account Number</p>
            <p className="font-medium">
              {withdrawalAccount?.account_number.toString().slice(0, 4)} ****
              ****
            </p>
          </div>
          <button
            onClick={handle0penModal}
            className="inline-flex items-center gap-2 py-2 px-4 rounded-lg bg-secondary_color/10 text-secondary_color hover:bg-secondary_color/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Update Account
          </button>
          {isOpen && <UpdateWithdrawalAccount handleClose={handleCloseModal} />}
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
  );
};
