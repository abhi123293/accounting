
"use client";

import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/invoices": "Invoices",
  "/contacts": "Contacts",
  "/accounts": "Chart of Accounts",
  "/ledger": "General Ledger",
  "/reports": "Financial Reports",
  "/settings": "Settings",
};

export default function Header() {
  const pathname = usePathname();
  const title = titles[pathname] ?? "Accounting";

  return (
    <header className="flex min-h-20 items-center justify-between gap-4 border-b border-border bg-background px-5 sm:px-8">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back, Admin
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          title="Notifications"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border hover:bg-accent"
        >
          <Bell className="h-5 w-5" />
        </button>

        <ThemeToggle />

        <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground sm:flex">
          A
        </div>
      </div>
    </header>
  );
}
