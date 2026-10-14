"use client";

import {
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  DollarSign,
  CreditCard,
  PiggyBank,
  Building2,
  Edit,
  Trash2,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const sampleAccounts = [
  { id: 1, code: "1000", name: "Cash", type: "asset", subtype: "current", balance: "₹ 2,45,000", currency: "INR" },
  { id: 2, code: "1010", name: "Bank Account - HDFC", type: "asset", subtype: "current", balance: "₹ 12,50,000", currency: "INR" },
  { id: 3, code: "1020", name: "Accounts Receivable", type: "asset", subtype: "current", balance: "₹ 3,20,500", currency: "INR" },
  { id: 4, code: "1500", name: "Office Equipment", type: "asset", subtype: "fixed", balance: "₹ 8,75,000", currency: "INR" },
  { id: 5, code: "1510", name: "Computer Hardware", type: "asset", subtype: "fixed", balance: "₹ 4,20,000", currency: "INR" },
  { id: 6, code: "2000", name: "Accounts Payable", type: "liability", subtype: "current", balance: "₹ -1,80,000", currency: "INR" },
  { id: 7, code: "2010", name: "GST Payable", type: "liability", subtype: "current", balance: "₹ -45,000", currency: "INR" },
  { id: 8, code: "2100", name: "Business Loan - SBI", type: "liability", subtype: "long-term", balance: "₹ -15,00,000", currency: "INR" },
  { id: 9, code: "3000", name: "Owner's Capital", type: "equity", subtype: "capital", balance: "₹ -25,00,000", currency: "INR" },
  { id: 10, code: "3100", name: "Retained Earnings", type: "equity", subtype: "retained", balance: "₹ -8,45,000", currency: "INR" },
  { id: 11, code: "4000", name: "Sales Revenue", type: "revenue", subtype: "operating", balance: "₹ -45,00,000", currency: "INR" },
  { id: 12, code: "4010", name: "Service Revenue", type: "revenue", subtype: "operating", balance: "₹ -12,50,000", currency: "INR" },
  { id: 13, code: "5000", name: "Cost of Goods Sold", type: "expense", subtype: "cogs", balance: "₹ 18,00,000", currency: "INR" },
  { id: 14, code: "5100", name: "Rent Expense", type: "expense", subtype: "operating", balance: "₹ 3,00,000", currency: "INR" },
  { id: 15, code: "5200", name: "Salaries & Wages", type: "expense", subtype: "operating", balance: "₹ 22,00,000", currency: "INR" },
];

const typeConfig = {
  asset: { label: "Asset", className: "bg-blue-500/10 text-blue-700 border-blue-500/20", icon: DollarSign },
  liability: { label: "Liability", className: "bg-red-500/10 text-red-700 border-red-500/20", icon: CreditCard },
  equity: { label: "Equity", className: "bg-purple-500/10 text-purple-700 border-purple-500/20", icon: PiggyBank },
  revenue: { label: "Revenue", className: "bg-green-500/10 text-green-700 border-green-500/20", icon: ArrowUpRight },
  expense: { label: "Expense", className: "bg-orange-500/10 text-orange-700 border-orange-500/20", icon: ArrowDownRight },
};

export default function AccountsPage() {
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
              <DollarSign className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  Chart of Accounts
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Manage your general ledger accounts
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
                Add Account
              </Button>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <article className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">Total Assets</p>
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">₹ 31,10,500</p>
              <p className="mt-2 text-xs text-muted-foreground">5 accounts</p>
            </article>

            <article className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">Total Liabilities</p>
                <CreditCard className="h-5 w-5 text-red-600" />
              </div>
              <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">₹ -17,25,000</p>
              <p className="mt-2 text-xs text-muted-foreground">3 accounts</p>
            </article>

            <article className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">Equity</p>
                <PiggyBank className="h-5 w-5 text-purple-600" />
              </div>
              <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">₹ -33,45,000</p>
              <p className="mt-2 text-xs text-muted-foreground">2 accounts</p>
            </article>

            <article className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">Revenue (YTD)</p>
                <ArrowUpRight className="h-5 w-5 text-green-600" />
              </div>
              <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">₹ -57,50,000</p>
              <p className="mt-2 text-xs text-muted-foreground">2 accounts</p>
            </article>

            <article className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">Expenses (YTD)</p>
                <ArrowDownRight className="h-5 w-5 text-orange-600" />
              </div>
              <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">₹ 43,00,000</p>
              <p className="mt-2 text-xs text-muted-foreground">3 accounts</p>
            </article>
          </section>

          <section className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="p-5 border-b border-border flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search accounts..."
                    className="pl-10 w-64 sm:w-80"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="asset">Asset</SelectItem>
                    <SelectItem value="liability">Liability</SelectItem>
                    <SelectItem value="equity">Equity</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Subtypes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subtypes</SelectItem>
                    <SelectItem value="current">Current</SelectItem>
                    <SelectItem value="fixed">Fixed</SelectItem>
                    <SelectItem value="long-term">Long-term</SelectItem>
                    <SelectItem value="capital">Capital</SelectItem>
                    <SelectItem value="operating">Operating</SelectItem>
                    <SelectItem value="cogs">COGS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Code</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Account Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Subtype</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Balance</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Currency</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleAccounts.map((account) => {
                    const config = typeConfig[account.type as keyof typeof typeConfig];
                    return (
                      <tr key={account.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-4 font-mono text-sm font-medium text-foreground">{account.code}</td>
                        <td className="px-4 py-4 font-medium text-foreground">{account.name}</td>
                        <td className="px-4 py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border">
                            {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-muted-foreground capitalize">{account.subtype}</td>
                        <td className="px-4 py-4 text-right font-mono font-medium text-foreground">{account.balance}</td>
                        <td className="px-4 py-4 text-muted-foreground">{account.currency}</td>
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
                                  <DollarSign className="h-4 w-4" />
                                  View Ledger
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuItem inset>
                                <div className="flex items-center gap-2">
                                  <Edit className="h-4 w-4" />
                                  Edit Account
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem inset className="text-destructive focus:text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-border flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Showing 1 to 15 of 15 accounts</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}