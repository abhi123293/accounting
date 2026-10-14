"use client";

import {
  Plus,
  Search,
  Download,
  MoreHorizontal,
  BookOpen,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Filter,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const sampleEntries = [
  { id: "JE-001", date: "2024-01-15", description: "Invoice payment received - Acme Corp", ref: "INV-001", account: "Bank Account - HDFC", debit: 45000, credit: 0 },
  { id: "JE-002", date: "2024-01-15", description: "Invoice payment received - Acme Corp", ref: "INV-001", account: "Accounts Receivable", debit: 0, credit: 45000 },
  { id: "JE-003", date: "2024-01-14", description: "Office rent payment", ref: "RENT-001", account: "Rent Expense", debit: 25000, credit: 0 },
  { id: "JE-004", date: "2024-01-14", description: "Office rent payment", ref: "RENT-001", account: "Bank Account - HDFC", debit: 0, credit: 25000 },
  { id: "JE-005", date: "2024-01-13", description: "Invoice payment received - TechStart Inc", ref: "INV-002", account: "Bank Account - HDFC", debit: 78500, credit: 0 },
  { id: "JE-006", date: "2024-01-13", description: "Invoice payment received - TechStart Inc", ref: "INV-002", account: "Accounts Receivable", debit: 0, credit: 78500 },
  { id: "JE-007", date: "2024-01-12", description: "Software subscription renewal", ref: "SUB-001", account: "Software Expense", debit: 12000, credit: 0 },
  { id: "JE-008", date: "2024-01-12", description: "Software subscription renewal", ref: "SUB-001", account: "Bank Account - HDFC", debit: 0, credit: 12000 },
  { id: "JE-009", date: "2024-01-11", description: "Invoice payment received - Global Ltd", ref: "INV-003", account: "Bank Account - HDFC", debit: 92300, credit: 0 },
  { id: "JE-010", date: "2024-01-11", description: "Invoice payment received - Global Ltd", ref: "INV-003", account: "Accounts Receivable", debit: 0, credit: 92300 },
];

export default function LedgerPage() {
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
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  General Ledger
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  View and manage all journal entries
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Entry
              </Button>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">Total Debits</p>
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">₹ 2,52,800</p>
              <p className="mt-2 text-xs text-muted-foreground">This period</p>
            </article>

            <article className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">Total Credits</p>
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">₹ 2,52,800</p>
              <p className="mt-2 text-xs text-muted-foreground">Balanced</p>
            </article>

            <article className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">Entries Count</p>
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">10</p>
              <p className="mt-2 text-xs text-muted-foreground">This period</p>
            </article>

            <article className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">Net Balance</p>
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">₹ 0</p>
              <p className="mt-2 text-xs text-muted-foreground">Perfectly balanced</p>
            </article>
          </section>

          <section className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="p-5 border-b border-border flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search entries..."
                    className="pl-10 w-64 sm:w-80"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Accounts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Accounts</SelectItem>
                    <SelectItem value="1010">Bank Account - HDFC</SelectItem>
                    <SelectItem value="1020">Accounts Receivable</SelectItem>
                    <SelectItem value="5100">Rent Expense</SelectItem>
                    <SelectItem value="5200">Software Expense</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="All Dates" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dates</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Description</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Ref</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Account</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Debit</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Credit</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleEntries.map((entry) => (
                    <tr key={entry.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-4 text-muted-foreground whitespace-nowrap">
                        <Calendar className="h-3 w-3 mr-1 inline" />
                        {entry.date}
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-medium text-foreground max-w-xs truncate">{entry.description}</div>
                      </td>
                      <td className="px-4 py-4 text-muted-foreground font-mono text-sm">{entry.ref}</td>
                      <td className="px-4 py-4 text-foreground">{entry.account}</td>
                      <td className="px-4 py-4 text-right font-mono font-medium text-foreground">
                        {entry.debit > 0 ? `₹ ${entry.debit.toLocaleString()}` : "—"}
                      </td>
                      <td className="px-4 py-4 text-right font-mono font-medium text-foreground">
                        {entry.credit > 0 ? `₹ ${entry.credit.toLocaleString()}` : "—"}
                      </td>
                      <td className="px-4 py-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <button className="p-2 rounded-lg hover:bg-accent transition-colors" aria-label="More actions">
                              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem inset>
                              <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4" />
                                View Details
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem inset>
                              <div className="flex items-center gap-2">
                                <Edit className="h-4 w-4" />
                                Edit Entry
                              </div>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem inset className="text-destructive focus:text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Reverse Entry
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-border flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Showing 1 to 10 of 10 entries</p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" disabled>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}