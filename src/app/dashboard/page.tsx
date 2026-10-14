"use client";

import {
  TrendingUp,
  TrendingDown,
  Wallet,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import CashFlowChart from "@/components/dashboard/CashFlowChart";
import { useRequireAuth } from "@/lib/auth-context";
import { cn } from "cn";

const stats = [
  {
    title: "Total Revenue",
    value: "₹ —",
    note: "Selected reporting period",
    icon: TrendingUp,
  },
  {
    title: "Total Expenses",
    value: "₹ —",
    note: "Selected reporting period",
    icon: TrendingDown,
  },
  {
    title: "Net Profit",
    value: "₹ —",
    note: "Based on posted transactions",
    icon: Wallet,
  },
  {
    title: "Outstanding Invoices",
    value: "₹ —",
    note: "Unpaid customer invoices",
    icon: FileText,
  },
];

export default function DashboardPage() {
  useRequireAuth();

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <main className="min-w-0 flex-1">
        <Header />

        <div className="editorial-container py-8 lg:py-12">
          <section className="mb-12">
            <div className="editorial-rule-short" />
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <h1 className="editorial-heading">Financial Overview</h1>
                <p className="editorial-body mt-2">Monitor your business finances in one place.</p>
              </div>

              <span className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground">
                Current reporting period
              </span>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-12">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <article
                  key={stat.title}
                  className={cn(
                    "rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200",
                    "hover:shadow-md hover:border-muted-foreground/20"
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-muted-foreground">
                      {stat.title}
                    </p>
                    <Icon className="h-5 w-5 text-primary" />
                  </div>

                  <p className="mt-4 text-3xl font-bold tracking-tight text-foreground">
                    {stat.value}
                  </p>

                  <p className="mt-2 text-xs text-muted-foreground">
                    {stat.note}
                  </p>
                </article>
              );
            })}
          </section>

          <section className="mb-12">
            <article className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-medium text-foreground">Cash Flow Overview</h2>
                  <p className="mt-1 text-sm text-muted-foreground">Revenue vs Expenses over 6 months</p>
                </div>
              </div>
              <div className="mt-4">
                <CashFlowChart />
                <p className="mt-3 text-xs text-muted-foreground">
                  Illustrative sample data — not actual business cash flow.
                </p>
              </div>
            </article>
          </section>

          <section className="grid gap-6 xl:grid-cols-3">
            <article className="rounded-xl border border-border bg-card p-6 xl:col-span-2">
              <h2 className="text-lg font-medium text-foreground">Recent Activity</h2>
              <p className="mt-1 text-sm text-muted-foreground">Your latest financial records</p>

              <div className="mt-6 flex min-h-48 flex-col items-center justify-center text-center">
                <FileText className="mb-3 h-8 w-8 text-muted-foreground" />
                <p className="font-medium text-foreground">No activity to display</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Recent invoices and posted transactions will appear here.
                </p>
              </div>
            </article>

            <article className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-medium text-foreground">Quick Actions</h2>
              <p className="mt-1 text-sm text-muted-foreground">Common accounting tasks</p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/invoices"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Create Invoice
                  <ArrowUpRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/contacts"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
                >
                  Add Contact
                  <ArrowDownRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </section>
        </div>
      </main>
    </div>
  );
}