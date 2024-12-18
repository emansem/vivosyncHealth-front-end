import { Card } from "@/src/components/utils/Card";
import { DollarSign } from "lucide-react";
interface StatsOverviewType {
  title?: string;
  change?: string;
  value?: number;
  period?: string;
  count?: string;
  amount?: number;
}

interface StatsOverviewProps {
  stats: StatsOverviewType[];
}

function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-stone-600 text-sm font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-stone-800 mt-1">
                ${stat.value?.toFixed(2) || 0.0}
              </h3>
              {stat.change && (
                <p
                  className={`text-sm mt-1 ${
                    stat.change.startsWith("-")
                      ? "text-red-600"
                      : "text-primary_color"
                  }`}
                >
                  {stat.change.toLocaleString() || 0}$ {stat.period}
                </p>
              )}
              {stat.count && (
                <p className="text-sm text-stone-500 mt-1">{stat.count}</p>
              )}
              {stat.amount && (
                <p className="text-sm text-stone-500 mt-1">{stat.amount}</p>
              )}
            </div>
            <div className="p-3 rounded-full bg-stone-50">
              <DollarSign size={24} className="text-stone-400" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default StatsOverview;
