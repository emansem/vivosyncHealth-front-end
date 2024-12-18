import {
  ArrowDownCircle,
  ArrowUpCircle,
  RefreshCcw,
  CreditCard
} from "lucide-react";

export const TypeBadge = ({ type }) => {
  const styles = {
    deposit: {
      bg: "bg-green-50",
      text: "text-green-700",
      icon: <ArrowDownCircle size={16} />
    },
    withdrawal: {
      bg: "bg-orange-50",
      text: "text-orange-700",
      icon: <ArrowUpCircle size={16} />
    },
    refund: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      icon: <RefreshCcw size={16} />
    },
    subscription: {
      bg: "bg-purple-50",
      text: "text-purple-700",
      icon: <CreditCard size={16} />
    }
  };

  const style = styles[type];

  return (
    <span
      className={`inline-flex capitalize items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${style.bg} ${style.text}`}
    >
      {style.icon}
      {type}
    </span>
  );
};
