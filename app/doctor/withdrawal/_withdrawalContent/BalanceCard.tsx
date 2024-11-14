export const BalanceCard = ({
  title,
  amount,
  icon
}: {
  title: string;
  amount: number;
  icon: React.ReactNode;
}) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-bold mt-1">₦{amount.toLocaleString()}</p>
      </div>
      <div className="text-primary_color">{icon}</div>
    </div>
  </div>
);
