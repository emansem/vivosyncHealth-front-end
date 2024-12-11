import { Wallet, ArrowDownRight } from "lucide-react";
import { WithdrawalAccountData } from "@/app/lib/types";
import { WithdrawalAccountSection } from "./WithdrawalAccountSection";
import WithdrawalForm from "./RequestWithdrawal";
import { useState } from "react";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import { DisableButton } from "@/src/components/ui/button/DisableButton";
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
  const isWithdrawalAccountAvaliable =
    withdrawalAccount === undefined ? false : true;
  console.log(isWithdrawalAccountAvaliable);
  const [openWithdrawalForm, setOpenWithdrawalForm] = useState(false);

  const onCloseWithdrawalForm = () => setOpenWithdrawalForm((prev) => !prev);
  const onOpenWithdrawalForm = () => setOpenWithdrawalForm((prev) => !prev);

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
          {isWithdrawalAccountAvaliable ? (
            <PrimaryButton
              onClick={onOpenWithdrawalForm}
              backgroud
              color="text-white"
            >
              <div className="flex items-center justify-center gap-1">
                <ArrowDownRight className="w-5 h-5" />
                <span>Request Withdrawal</span>
              </div>
            </PrimaryButton>
          ) : (
            <DisableButton>Request Withdrawal</DisableButton>
          )}
        </div>

        {openWithdrawalForm && (
          <WithdrawalForm onClose={onCloseWithdrawalForm} />
        )}
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
