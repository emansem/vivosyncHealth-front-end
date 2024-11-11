import {
  BarChart,
  Bar,
  Legend,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  YAxis,
  XAxis
} from "recharts";
import { weeklySubscriptionData } from "@/data/chatData";
import React from "react";
import { DashBoardHeading } from "../../../Headings";
import ChartWrapper from "./ChartWrapper";

function WeeklyRevenueChart() {
  return (
    <ChartWrapper>
      <div className="pl-2">
        <DashBoardHeading>Renevue</DashBoardHeading>
      </div>
      <ResponsiveContainer width="100%">
        <BarChart data={weeklySubscriptionData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />

          <XAxis
            fontWeight={500}
            dataKey="day"
            tickFormatter={(value) => value.slice(0, 3)}
            textAnchor="end"
            fontSize={16}
          />
          <Tooltip />
          <Legend
            verticalAlign="top"
            payload={[{ value: "Renevue", type: "line", color: "#269c65" }]}
          />
          <YAxis padding={{ top: 40 }} interval={0} />
          <Bar
            dataKey="active"
            barSize={40}
            radius={[4, 4, 0, 0]}
            fill="#269c65"
            strokeWidth={2}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

export default WeeklyRevenueChart;
