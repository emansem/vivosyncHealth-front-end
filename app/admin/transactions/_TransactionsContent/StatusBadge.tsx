export const StatusBadge = ({ status }) => {
  const styles = {
    completed: {
      bg: "bg-green-50",
      text: "text-green-700",
      dot: "bg-green-500"
    },
    pending: {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      dot: "bg-yellow-500"
    },
    failed: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
    processing: { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" }
  };

  const style = styles[status] || styles.pending;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${style.bg} ${style.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`}></span>
      {status}
    </span>
  );
};
