import { Card } from "@/src/components/utils/Card";
import { DollarSign } from "lucide-react";
// Calculate stats
const stats = [
  {
    title: "Total Revenue",
    value: "$52,420",
    change: "+12%",
    period: "vs last month"
  },
  {
    title: "Pending Refunds",
    value: "$1,240",
    count: "8 requests"
  },
  {
    title: "Today's Transactions",
    value: "24",
    amount: "$4,520"
  },
  {
    title: "Failed Transactions",
    value: "3",
    amount: "$820"
  }
];

function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-stone-600 text-sm font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold text-stone-800 mt-1">
                {stat.value}
              </h3>
              {stat.change && (
                <p className="text-sm text-green-600 mt-1">
                  {stat.change} {stat.period}
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
