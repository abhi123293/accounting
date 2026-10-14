
"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  FileText,
  Loader2,
  Receipt,
} from "lucide-react";
import { Download } from "lucide-react";
import { generateInvoicePDF } from "@/lib/generate-invoice-pdf";

import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { useRequireAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Invoice = {
  id: string;
  invoiceNumber?: string;
  customerName?: string;
  issueDate?: string;
  dueDate?: string;
  items?: {
    description: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
  }[];
  subtotal?: number;
  taxRate?: number;
  tax?: number;
  total?: number;
  status?: string;
};

export default function InvoicesPage() {
  const { loading: authLoading } = useRequireAuth();

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;

    async function loadInvoices() {
      try {
        const response = await fetch("/api/invoices");
        const contentType = response.headers.get("content-type");

        if (!contentType?.includes("application/json")) {
          throw new Error("Invoices API is not available yet.");
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Unable to load invoices.");
        }

        setInvoices(data.invoices ?? []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load invoices."
        );
      } finally {
        setLoading(false);
      }
    }

    void loadInvoices();
  }, [authLoading]);

  

  const filteredInvoices = invoices.filter((invoice) => {
    const query = search.toLowerCase();

    return (
      (invoice.invoiceNumber ?? "").toLowerCase().includes(query) ||
      (invoice.customerName ?? "").toLowerCase().includes(query)
    );
  });

  const handleDownloadPDF = (invoice: Invoice) => {
  if (
    !invoice.invoiceNumber ||
    !invoice.customerName ||
    !invoice.items
  ) {
    setError("Invoice details are incomplete. Please reload the invoices.");
    return;
  }

  try {
    generateInvoicePDF({
      invoiceNumber: invoice.invoiceNumber,
      customerName: invoice.customerName,
      issueDate: invoice.issueDate ?? "",
      dueDate: invoice.dueDate ?? "",
      items: invoice.items,
      subtotal: invoice.subtotal ?? 0,
      taxRate: invoice.taxRate ?? 0,
      tax: invoice.tax ?? 0,
      total: invoice.total ?? 0,
      status: invoice.status ?? "draft",
    });
  } catch {
    setError("Unable to generate the invoice PDF.");
  }
};

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      <main className="min-w-0 flex-1">
        <Header />

        <div className="space-y-6 p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Invoices
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Create and manage customer invoices.
              </p>
            </div>

            <Button
              onClick={() => {
                window.location.href = "/invoices/new";
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300"
            >
              {error}
            </div>
          )}

          <section className="overflow-hidden rounded-xl border bg-card shadow-sm">
            <div className="flex flex-col justify-between gap-4 border-b p-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-semibold">Invoice Directory</h2>
                <p className="text-sm text-muted-foreground">
                  {invoices.length} invoice
                  {invoices.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search invoices..."
                  className="pl-9 sm:w-64"
                  aria-label="Search invoices"
                />
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center gap-2 p-12 text-sm text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading invoices...
              </div>
            ) : filteredInvoices.length === 0 ? (
              <div className="flex flex-col items-center px-4 py-14 text-center">
                <div className="mb-4 rounded-full bg-muted p-4">
                  <Receipt className="h-7 w-7 text-muted-foreground" />
                </div>

                <h3 className="font-semibold">
                  {search ? "No matching invoices" : "No invoices yet"}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {search
                    ? "Try another invoice number or customer name."
                    : "Create your first invoice to get started."}
                </p>

                {!search && (
                  <Button
                    className="mt-4"
                    onClick={() => {
                      window.location.href = "/invoices/new";
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Invoice
                  </Button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/50 text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3 font-medium">Invoice</th>
                      <th className="px-5 py-3 font-medium">Customer</th>
                      <th className="px-5 py-3 font-medium">Issue Date</th>
                      <th className="px-5 py-3 font-medium">Due Date</th>
                      <th className="px-5 py-3 font-medium">Total</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                      <th className="px-5 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {filteredInvoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-muted/30">
                        <td className="px-5 py-4 font-medium">
                          {invoice.invoiceNumber || invoice.id}
                        </td>
                        <td className="px-5 py-4">
                          {invoice.customerName || "—"}
                        </td>
                        <td className="px-5 py-4">
                          {invoice.issueDate || "—"}
                        </td>
                        <td className="px-5 py-4">
                          {invoice.dueDate || "—"}
                        </td>
                        <td className="px-5 py-4">
                          {typeof invoice.total === "number"
                            ? new Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: "INR",
                              }).format(invoice.total)
                            : "—"}
                        </td>
                        <td className="px-5 py-4">
                          <InvoiceStatus status={invoice.status} />
                        </td>
<td className="px-5 py-4">
  <Button
    type="button"
    variant="outline"
    size="sm"
    className="whitespace-nowrap"
    onClick={() => handleDownloadPDF(invoice)}
  >
    <Download className="mr-2 h-4 w-4" />
    Download PDF
  </Button>
</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

function InvoiceStatus({ status }: { status?: string }) {
  const value = (status || "draft").toLowerCase();

  const styles: Record<string, string> = {
    draft: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
    sent: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    paid: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
    overdue: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[value] ?? "bg-muted text-muted-foreground"
      }`}
    >
      {value.charAt(0).toUpperCase() + value.slice(1)}
    </span>
  );
}
