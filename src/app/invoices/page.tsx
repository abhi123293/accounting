"use client";

import {
  Plus,
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Mail,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { useRequireAuth } from "@/lib/auth-context";
import { cn } from "cn";
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

const sampleInvoices = [
  { id: "INV-001", client: "Acme Corporation", date: "2024-01-15", dueDate: "2024-02-14", amount: "₹ 45,000", status: "paid" },
  { id: "INV-002", client: "TechStart Inc", date: "2024-01-14", dueDate: "2024-02-13", amount: "₹ 78,500", status: "pending" },
  { id: "INV-003", client: "Global Ltd", date: "2024-01-13", dueDate: "2024-02-12", amount: "₹ 92,300", status: "overdue" },
  { id: "INV-004", client: "StartupXYZ", date: "2024-01-12", dueDate: "2024-02-11", amount: "₹ 35,000", status: "pending" },
  { id: "INV-005", client: "Enterprise Co", date: "2024-01-11", dueDate: "2024-02-10", amount: "₹ 1,25,000", status: "paid" },
  { id: "INV-006", client: "Digital Agency", date: "2024-01-10", dueDate: "2024-02-09", amount: "₹ 67,500", status: "pending" },
  { id: "INV-007", client: "Manufacturing Inc", date: "2024-01-09", dueDate: "2024-02-08", amount: "₹ 2,10,000", status: "overdue" },
  { id: "INV-008", client: "Consulting Group", date: "2024-01-08", dueDate: "2024-02-07", amount: "₹ 48,000", status: "paid" },
];

const statusConfig = {
  paid: { label: "Paid", className: "bg-green-500/10 text-green-700 border-green-500/20", icon: CheckCircle },
  pending: { label: "Pending", className: "bg-amber-500/10 text-amber-700 border-amber-500/20", icon: Clock },
  overdue: { label: "Overdue", className: "bg-red-500/10 text-red-700 border-red-500/20", icon: AlertCircle },
};

export default function InvoicesPage() {
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
                  Invoices
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Manage and track all your invoices
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
                Create Invoice
              </Button>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">Total Invoices</p>
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">24</p>
              <p className="mt-2 text-xs text-muted-foreground">This quarter</p>
            </article>

            <article className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">Total Revenue</p>
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">₹ 6,87,800</p>
              <p className="mt-2 text-xs text-muted-foreground">This quarter</p>
            </article>

            <article className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">Pending</p>
                <DollarSign className="h-5 w-5 text-amber-600" />
              </div>
              <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">₹ 2,78,300</p>
              <p className="mt-2 text-xs text-muted-foreground">Awaiting payment</p>
            </article>

            <article className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">Overdue</p>
                <DollarSign className="h-5 w-5 text-red-600" />
              </div>
              <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">₹ 3,02,300</p>
              <p className="mt-2 text-xs text-muted-foreground">Past due date</p>
            </article>
          </section>

          <section className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="p-5 border-b border-border flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search invoices..."
                    className="pl-10 w-64 sm:w-80"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date-desc">Date (Newest)</SelectItem>
                    <SelectItem value="date-asc">Date (Oldest)</SelectItem>
                    <SelectItem value="amount-desc">Amount (High)</SelectItem>
                    <SelectItem value="amount-asc">Amount (Low)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Invoice</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Client</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Due Date</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleInvoices.map((invoice) => {
                    const config = statusConfig[invoice.status as keyof typeof statusConfig];
                    const Icon = config.icon;
                    return (
                      <tr key={invoice.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-4">
                          <div className="font-medium text-foreground">{invoice.id}</div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <Mail className="h-4 w-4 text-primary" />
                            </div>
                            <span className="font-medium text-foreground">{invoice.client}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-muted-foreground">{invoice.date}</td>
                        <td className="px-4 py-4 text-muted-foreground">{invoice.dueDate}</td>
                        <td className="px-4 py-4 text-right font-medium text-foreground">{invoice.amount}</td>
                        <td className="px-4 py-4">
                          <span className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
                            config.className
                          )}>
                            <Icon className="h-3 w-3" />
                            {config.label}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="p-2 rounded-lg hover:bg-accent transition-colors" aria-label="More actions">
                                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem inset>
                                <div className="flex items-center gap-2">
                                  <Eye className="h-4 w-4" />
                                  View
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuItem inset>
                                <div className="flex items-center gap-2">
                                  <Edit className="h-4 w-4" />
                                  Edit
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuItem inset>
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4" />
                                  Send Reminder
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
              <p className="text-sm text-muted-foreground">Showing 1 to 8 of 24 invoices</p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}