export const StatCard = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-white rounded-lg shadow-sm p-4">
    <p className="text-sm text-gray-600">{title}</p>
    <p className="text-xl font-bold text-gray-800">{value}</p>
  </div>
);
