
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

export type CashFlowPoint = {
  month: string;
  received: number;
  paid: number;
};

type CashFlowChartProps = {
  data: CashFlowPoint[];
};

const currency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function CashFlowChart({
  data,
}: CashFlowChartProps) {
  return (
    <div className="h-72 w-full">
      {data.length === 0 ? (
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          No cash-flow transactions for this period.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 8, left: 8, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="receivedFill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#16e26e" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#16e26e" stopOpacity={0} />
              </linearGradient>

              <linearGradient
                id="paidFill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#e11313" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#e11313" stopOpacity={0} />
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
              tickFormatter={(value) => `₹${Number(value) / 1000}k`}
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
              name="received"
              stroke="#16e26e"
              strokeWidth={2}
              fill="url(#receivedFill)"
            />

            <Area
              type="monotone"
              dataKey="paid"
              name="paid"
              stroke="#e11313"
              strokeWidth={2}
              fill="url(#paidFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
