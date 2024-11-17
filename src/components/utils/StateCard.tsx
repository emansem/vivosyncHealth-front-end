import { StatsCardProps } from "@/app/lib/types";

export const StatsCard = ({ icon: Icon, label, value }: StatsCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center space-x-4">
        <div className="p-2 bg-primary_color rounded-full">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </div>
    </div>
  );
};
