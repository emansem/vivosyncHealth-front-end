// Status badges with consistent styling
export const StatusBadge = ({ status }) => {
  const statusStyles = {
    active: { bg: "bg-green-50", text: "text-green-700", dot: "bg-green-500" },
    expired: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
    pending: {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      dot: "bg-yellow-500"
    },
    cancelled: {
      bg: "bg-stone-50",
      text: "text-stone-700",
      dot: "bg-stone-500"
    }
  };

  const style = statusStyles[status] || statusStyles.pending;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${style.bg} ${style.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
