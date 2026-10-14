"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const sampleData = [
  { month: "Jan", received: 42000, paid: 28000 },
  { month: "Feb", received: 51000, paid: 32000 },
  { month: "Mar", received: 46000, paid: 35000 },
  { month: "Apr", received: 62000, paid: 39000 },
  { month: "May", received: 57000, paid: 36000 },
  { month: "Jun", received: 71000, paid: 44000 },
];

const currency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function CashFlowChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={sampleData}
          margin={{ top: 10, right: 8, left: 8, bottom: 0 }}
        >
          <defs>
            <linearGradient id="receivedFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#080808" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#080808" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="paidFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#525252" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#525252" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="currentColor"
            strokeOpacity={0.1}
            vertical={false}
          />

          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "currentColor", fontSize: 12 }}
          />

          <YAxis
            tickFormatter={(value) => `₹${value / 1000}k`}
            tickLine={false}
            axisLine={false}
            width={55}
            tick={{ fill: "currentColor", fontSize: 12 }}
          />

          <Tooltip
            formatter={(value, name) => [
              currency(Number(value)),
              name === "received" ? "Cash received" : "Cash paid",
            ]}
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              color: "var(--card-foreground)",
            }}
          />

          <Area
            type="monotone"
            dataKey="received"
            stroke="#080808"
            strokeWidth={2}
            fill="url(#receivedFill)"
          />

          <Area
            type="monotone"
            dataKey="paid"
            stroke="#525252"
            strokeWidth={2}
            fill="url(#paidFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}