// Stat Card Component
export const StatCard = ({
  title,
  amount,
  icon,
  colorClass
}: {
  title: string;
  amount: number;
  icon: React.ReactNode;
  colorClass: string;
}) => (
  <div className=" rounded-2xl p-6 shadow-lg border bg-white">
    <div className={`flex items-center gap-3 mb-4`}>
      <div className={`${colorClass} p-3 rounded-xl`}>{icon}</div>
      <h3 className="text-gray-600 font-medium">{title}</h3>
    </div>
    <p className="text-2xl font-bold text-gray-800">
      ${amount.toLocaleString()}
    </p>
  </div>
);
