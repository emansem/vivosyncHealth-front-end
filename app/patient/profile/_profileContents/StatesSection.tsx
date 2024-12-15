import { colors } from "@/app/lib/constant";
import { LucideIcon } from "lucide-react";

interface StateType {
  icon: LucideIcon;
  title: string;
  value: number | undefined;
}
interface StatesSectionProps {
  stats: StateType[];
}
export const StatsSection = ({ stats }: StatesSectionProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div>
              <span
                className="inline-block p-3 rounded-xl"
                style={{ backgroundColor: colors.secondary }}
              >
                <stat.icon
                  className="w-6 h-6"
                  style={{ color: colors.primary }}
                />
              </span>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-stone-800">
              {stat.value || 0}
            </h3>
            <p className="text-stone-600 font-medium mt-1">{stat.title}</p>
            {/* <p className="text-sm text-stone-500 mt-2">{stat.trend}</p> */}
          </div>
        </div>
      ))}
    </div>
  );
};
