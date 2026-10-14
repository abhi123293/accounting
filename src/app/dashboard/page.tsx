
"use client";
import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import CashFlowChart from "@/components/dashboard/CashFlowChart";
import {getReportingDateRange,type ReportingPeriod,} from "@/lib/reporting-period";
import { useBusinessSettings } from "@/hooks/useBusinessSettings";
const stats = [
  {
    title: "Total Revenue",
    value: "₹ —",
    note: "Selected reporting period",
    icon: TrendingUp,
    color: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Total Expenses",
    value: "₹ —",
    note: "Selected reporting period",
    icon: TrendingDown,
    color: "text-rose-600 dark:text-rose-400",
  },
  {
    title: "Net Profit",
    value: "₹ —",
    note: "Based on posted transactions",
    icon: Wallet,
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Outstanding Invoices",
    value: "₹ —",
    note: "Unpaid customer invoices",
    icon: FileText,
    color: "text-amber-600 dark:text-amber-400",
  },
];

export default function DashboardPage() {
      const [reportingPeriod, setReportingPeriod] = useState<ReportingPeriod>("this-month");
      const [startDate, setStartDate] = useState("");

const [endDate, setEndDate] = useState("");
const dateRange = getReportingDateRange(reportingPeriod,startDate,endDate,);
const isCustomRangeIncomplete =reportingPeriod === "custom" &&(!startDate || !endDate);
const {data: businessSettings,isLoading: isBusinessSettingsLoading,error: businessSettingsError,} = useBusinessSettings();

const invalidDateRange =reportingPeriod === "custom" && Boolean(startDate && endDate) &&startDate > endDate;
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <main className="min-w-0 flex-1">
        <Header />

        <div className="space-y-8 p-5 sm:p-8">
        
<section className="flex flex-wrap items-end justify-between gap-4">
  <div>
    <h1 className="text-2xl font-bold tracking-tight">
      Financial Overview
    </h1>
    <p className="mt-1 text-sm text-muted-foreground">
      Monitor your business finances in one place.
    </p>
    <p className="mt-1 text-sm text-muted-foreground">
  {isBusinessSettingsLoading
    ? "Loading business settings..."
    : businessSettingsError
      ? "Business settings unavailable"
      : businessSettings?.businessName}
</p>
  </div>

  <div className="flex flex-wrap items-end gap-3">
    <div className="space-y-1">
      <label
        htmlFor="reporting-period"
        className="text-sm text-muted-foreground"
      >
        Reporting period
      </label>

      <div className="relative">
        <select
          id="reporting-period"
          value={reportingPeriod}
          onChange={(event) =>setReportingPeriod(event.target.value as ReportingPeriod)}
          className="h-10 w-full appearance-none rounded-lg border border-border bg-background py-2 pl-3 pr-9 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="this-month">This Month</option>
          <option value="last-month">Last Month</option>
          <option value="this-year">This Year</option>
          <option value="custom">Custom Range</option>
        </select>

        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
      </div>
    </div>

    {reportingPeriod === "custom" && (
      <>
        <div className="space-y-1">
          <label
            htmlFor="start-date"
            className="text-sm text-muted-foreground"
          >
            Start date
          </label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            max={endDate || undefined}
            onChange={(event) => setStartDate(event.target.value)}
            className="h-10 rounded-lg border border-border bg-background px-3 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="end-date"
            className="text-sm text-muted-foreground"
          >
            End date
          </label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            min={startDate || undefined}
            onChange={(event) => setEndDate(event.target.value)}
            className="h-10 rounded-lg border border-border bg-background px-3 text-sm"
          />
          {invalidDateRange && (
  <p className="w-full text-sm text-destructive" role="alert">
    End date must be on or after the start date.
  </p>
)}
        </div>
      </>
    )}
<p className="text-xs text-muted-foreground">
  {invalidDateRange
    ? "End date must be on or after the start date."
    : isCustomRangeIncomplete
      ? "Select both dates to continue."
      : dateRange
        ? `Showing ${dateRange.startDate} to ${dateRange.endDate}`
        : "Select a valid reporting period."}
</p>
  </div>
 
</section>


          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <article
                  key={stat.title}
                  className="rounded-xl border border-border bg-card p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-muted-foreground">
                      {stat.title}
                    </p>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>

                  <p className="mt-4 text-2xl font-bold tracking-tight">
                    {stat.value}
                  </p>

                  <p className="mt-2 text-xs text-muted-foreground">
                    {stat.note}
                  </p>
                </article>
              );
            })}
          </section>

          <section className="grid gap-6 xl:grid-cols-3">
            <article className="rounded-xl border border-border bg-card p-5 sm:p-6 xl:col-span-2">

<div>
  <h2 className="text-lg font-semibold">
    Cash Flow
  </h2>
  <p className="mt-1 text-sm text-muted-foreground">
    Cash received versus cash paid
  </p>

  <div className="mt-6">
    <CashFlowChart />
    <p className="mt-3 text-xs text-muted-foreground">
      Illustrative sample data — not actual business cash flow.
    </p>
  </div>
</div>


            </article>

            <article className="rounded-xl border border-border bg-card p-5 sm:p-6">
              <h2 className="text-lg font-semibold">Recent Activity</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Your latest financial records
              </p>

              <div className="mt-6 flex min-h-48 flex-col items-center justify-center text-center">
                <FileText className="mb-3 h-8 w-8 text-muted-foreground" />
                <p className="font-medium">No activity to display</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Recent invoices and posted transactions will appear here.
                </p>
              </div>
            </article>
          </section>

          <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Common accounting tasks
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="/invoices"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                Create Invoice
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <a
                href="/contacts"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-accent"
              >
                Add Contact
                <ArrowDownRight className="h-4 w-4" />
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
