"use client";

import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import MobileSidebar from "./MobileSidebar";

const pageTitles: Record<string, string> = {
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

  const pageTitle = pageTitles[pathname] ?? "Dashboard";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <MobileSidebar />

        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold tracking-tight">
            {pageTitle}
          </h1>
          <p className="hidden text-xs text-muted-foreground sm:block">
            Manage your business finances
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Bell className="h-5 w-5" />
        </button>

        <ThemeToggle />

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          A
        </div>
      </div>
    </header>
  );
}