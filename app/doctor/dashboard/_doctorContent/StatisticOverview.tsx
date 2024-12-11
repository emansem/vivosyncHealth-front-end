import {
  ArrowDown,
  ArrowUp,
  ChartNoAxesCombined,
  UserRoundCheck,
  UserRoundX,
  Users
} from "lucide-react";
import React from "react";
import { DashBoardHeading } from "../../../../src/components/ui/Headings";

interface ReportCardsProps {
  lable: string;
  CardIcon: React.ElementType;
  cardValue?: number | string;
  cardPercentage: number;
  cardsubTitle: string;
  isDecrease?: boolean;
}
const ReportCards = ({
  lable,
  CardIcon,
  cardValue,
  isDecrease,
  cardPercentage,
  cardsubTitle
}: ReportCardsProps) => {
  return (
    <li className="bg-white p-4 rounded-lg shadow-shadow3">
      <div className="flex items-center gap-2">
        <CardIcon size={18} color="#78716c" />
        <span className="text-stone-500 text-base font-medium">{lable}</span>
      </div>
      <div className="flex mt-6 items-center justify-between mb-1">
        <p className="flex flex-col">
          <span className="text-darrk_color text-3xl font-semibold">
            {cardValue}
          </span>
        </p>
        <p
          className={`flex  items-center gap-1 ${
            isDecrease ? "bg-red-300 " : "bg-[#27f89746] "
          } p-1.5 rounded-full`}
        >
          {isDecrease ? <ArrowDown size={14} /> : <ArrowUp size={14} />}
          <span className="text-sm text-light_darkbg font-medium">
            {cardPercentage}%
          </span>
        </p>
      </div>
      <span className="text-sm text-stone-500 font-medium">{cardsubTitle}</span>
    </li>
  );
};
interface StatisticOverviewProps {
  activeSubscription: number;
  inactiveSubscription: number;
  totalBalance: number;
  totalPatient: number;
}

function StatisticOverview({
  activeSubscription,
  totalBalance,
  totalPatient,
  inactiveSubscription
}: StatisticOverviewProps) {
  return (
    <div>
      <DashBoardHeading>Statistics Overview</DashBoardHeading>

      <ul className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-6 ">
        <ReportCards
          CardIcon={Users}
          lable="Total patients"
          cardValue={totalPatient || 0}
          cardsubTitle="2 more than last week"
          cardPercentage={3.9}
        />
        <ReportCards
          CardIcon={ChartNoAxesCombined}
          lable="Total revenue"
          cardValue={`${totalBalance.toFixed(2) || 0}XAF`}
          cardsubTitle="4 more than last week"
          cardPercentage={2.1}
        />
        <ReportCards
          CardIcon={UserRoundCheck}
          lable="Active subscription"
          cardValue={activeSubscription || 0}
          isDecrease
          cardsubTitle="2 more than last week"
          cardPercentage={4.9}
        />
        <ReportCards
          CardIcon={UserRoundX}
          lable="Inactive subscription"
          cardValue={inactiveSubscription || 0}
          cardsubTitle="20 more than last week"
          cardPercentage={2.9}
        />
      </ul>
    </div>
  );
}

export default StatisticOverview;
