
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import CashFlowChart from "@/components/dashboard/CashFlowChart";

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
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <main className="min-w-0 flex-1">
        <Header />

        <div className="space-y-8 p-5 sm:p-8">
          <section className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Financial Overview
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Monitor your business finances in one place.
              </p>
            </div>

            <span className="rounded-lg border border-border px-3 py-2 text-sm text-muted-foreground">
              Current reporting period
            </span>
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
             <div className="mt-6">
  <CashFlowChart />
  <p className="mt-3 text-xs text-muted-foreground">
    Illustrative sample data — not actual business cash flow.
  </p>
</div>

              <div className="mt-6 flex min-h-64 flex-col items-center justify-center rounded-lg border border-dashed border-border p-6 text-center">
                <TrendingUp className="mb-3 h-8 w-8 text-muted-foreground" />
                <p className="font-medium">Cash flow chart</p>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  The chart will display financial data once the accounting
                  records and reporting calculations are connected.
                </p>
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
