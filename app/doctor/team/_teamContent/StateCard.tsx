export const StatCard = ({
  title,
  value,
  icon
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) => (
  <div className="bg-white rounded-lg shadow-sm p-4">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-xl font-bold mt-1">{value}</p>
      </div>
      <div className="text-primary_color">{icon}</div>
    </div>
  </div>
);
