import { colors } from "@/app/lib/constant";
import { useOpenAndClose } from "@/app/lib/hooks";
import { Plus } from "lucide-react";
import { RechargeAccountForm } from "./RechargeForm";

export const BalanceSection = ({ balance }: { balance: number }) => {
  const { open, handle0pen, handleClose } = useOpenAndClose();

  return (
    <div
      className="rounded-3xl p-8"
      style={{
        background: `linear-gradient(to bottom right, ${colors.primary}, #1a724a)`
      }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <p className="text-stone-100 text-sm font-medium">
            Available Balance
          </p>
          <div className="flex items-baseline gap-3 mt-2">
            <h2 className="text-4xl font-bold text-white">
              ${balance.toFixed(2) || 0.0}
            </h2>
            <span className="text-stone-100">USD</span>
          </div>
        </div>
        <button
          onClick={handle0pen}
          className="bg-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 hover:bg-stone-50 transition-colors"
          style={{ color: colors.primary }}
        >
          <Plus className="w-4 h-4" />
          Add Balance
        </button>
      </div>
      {open && <RechargeAccountForm handleClose={handleClose} />}
    </div>
  );
};
