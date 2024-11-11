import {
  LineChart,
  Line,
  Legend,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  YAxis,
  XAxis,
  Label
} from "recharts";
import { weeklySubscriptionData } from "@/data/chatData";
import React from "react";
import { DashBoardHeading } from "../../../Headings";
import ChartWrapper from "./ChartWrapper";

function WeeklySubscriptionChart() {
  return (
    <ChartWrapper>
      <div className="pl-2">
        <DashBoardHeading>Subscription</DashBoardHeading>
      </div>
      <ResponsiveContainer>
        <LineChart
          data={weeklySubscriptionData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />

          <XAxis
            fontWeight={500}
            tickFormatter={(value) => value.slice(0, 3)}
            textAnchor="end"
            fontSize={16}
            dataKey="day"
          />
          <Tooltip />
          <Legend verticalAlign="top" />
          <YAxis
            padding={{ top: 40 }}
            min={100}
            domain={[2, "auto"]}
            ticks={[4, 8, 12, 18, 24]}
            interval={0}
          />
          <Line dataKey="active" stroke="#269c65" strokeWidth={2} />
          <Line dataKey="inactive" stroke="#ef4444" strokeWidth={2} />
          <Line />
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

export default WeeklySubscriptionChart;
