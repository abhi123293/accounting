"use client";

import {
  Plus,
  Download,
  FileText,
  BarChart3,
  PieChart,
  DollarSign,
  Calendar,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Users,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { useRequireAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "cn";

const reports = [
  {
    id: "profit-loss",
    title: "Profit & Loss Statement",
    description: "Comprehensive view of revenue, expenses, and net profit over a period",
    icon: BarChart3,
    category: "Financial",
    lastGenerated: "2024-01-15",
  },
  {
    id: "balance-sheet",
    title: "Balance Sheet",
    description: "Snapshot of assets, liabilities, and equity at a specific date",
    icon: PieChart,
    category: "Financial",
    lastGenerated: "2024-01-15",
  },
  {
    id: "cash-flow",
    title: "Cash Flow Statement",
    description: "Track cash inflows and outflows from operations, investing, and financing",
    icon: DollarSign,
    category: "Financial",
    lastGenerated: "2024-01-14",
  },
  {
    id: "trial-balance",
    title: "Trial Balance",
    description: "List of all ledger accounts with their debit and credit balances",
    icon: FileText,
    category: "Accounting",
    lastGenerated: "2024-01-15",
  },
  {
    id: "accounts-receivable",
    title: "Accounts Receivable Aging",
    description: "Track outstanding customer invoices by aging buckets",
    icon: CreditCard,
    category: "Sales",
    lastGenerated: "2024-01-15",
  },
  {
    id: "accounts-payable",
    title: "Accounts Payable Aging",
    description: "Track outstanding vendor bills by aging buckets",
    icon: CreditCard,
    category: "Purchases",
    lastGenerated: "2024-01-15",
  },
  {
    id: "sales-report",
    title: "Sales Report",
    description: "Detailed breakdown of sales by customer, product, and period",
    icon: TrendingUp,
    category: "Sales",
    lastGenerated: "2024-01-14",
  },
  {
    id: "expense-report",
    title: "Expense Report",
    description: "Categorized breakdown of all business expenses",
    icon: TrendingDown,
    category: "Expenses",
    lastGenerated: "2024-01-15",
  },
  {
    id: "tax-summary",
    title: "GST/Tax Summary",
    description: "Summary of tax collected, paid, and net liability",
    icon: Building2,
    category: "Tax",
    lastGenerated: "2024-01-10",
  },
  {
    id: "customer-statements",
    title: "Customer Statements",
    description: "Individual statements for each customer with outstanding balances",
    icon: Users,
    category: "Sales",
    lastGenerated: "2024-01-15",
  },
];

const categories = ["All", "Financial", "Accounting", "Sales", "Purchases", "Expenses", "Tax"];

export default function ReportsPage() {
  useRequireAuth();

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <main className="min-w-0 flex-1">
        <Header />

        <div className="space-y-8 p-5 sm:p-8">
          <section className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  Reports
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Generate and view financial reports
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <Calendar className="h-4 w-4" />
                Custom Date Range
              </Button>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Custom Report
              </Button>
            </div>
          </section>

          <section className="flex gap-2 overflow-x-auto pb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                  cat === "All"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {cat}
              </button>
            ))}
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {reports.map((report) => {
              const Icon = report.icon;
              return (
                <article
                  key={report.id}
                  className={cn(
                    "rounded-xl border border-border bg-card p-5 shadow-sm transition-all duration-200",
                    "hover:shadow-md hover:border-muted-foreground/20 hover:-translate-y-0.5"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{report.title}</h3>
                        <p className="text-xs text-muted-foreground">{report.category}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                      {report.lastGenerated}
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
                    {report.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Last generated: {report.lastGenerated}</span>
                    <Button size="sm" className="gap-1" variant="outline">
                      <a href={`/reports/${report.id}`}>
                        View Report
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  </div>
                </article>
              );
            })}
          </section>

          <section className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-lg font-semibold text-foreground">Scheduled Reports</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Automatically generate and deliver reports on a schedule
            </p>

            <div className="mt-5 rounded-lg border border-border bg-muted/50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Monthly Financial Pack</p>
                  <p className="text-sm text-muted-foreground">
                    Profit & Loss, Balance Sheet, Cash Flow — delivered 1st of each month
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-700 border border-green-500/20">
                    Active
                  </span>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Weekly Cash Flow Alert</p>
                  <p className="text-sm text-muted-foreground">
                    Sent every Monday — cash position and upcoming payments
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-700 border border-green-500/20">
                    Active
                  </span>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Overdue Invoice Report</p>
                  <p className="text-sm text-muted-foreground">
                    Daily report of invoices past due date — sent to finance team
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-700 border border-amber-500/20">
                    Paused
                  </span>
                  <Button variant="outline" size="sm">Resume</Button>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Create New Schedule
              </Button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}