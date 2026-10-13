
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  FileText,
  Users,
  Wallet,
  BookOpen,
  ChartNoAxesCombined,
  Settings,
} from "lucide-react";

const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Invoices", href: "/invoices", icon: FileText },
  { label: "Contacts", href: "/contacts", icon: Users },
  { label: "Accounts", href: "/accounts", icon: Wallet },
  { label: "Ledger", href: "/ledger", icon: BookOpen },
  { label: "Reports", href: "/reports", icon: ChartNoAxesCombined },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border hover:bg-accent"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/50"
          />

          <aside className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col border-r border-border bg-background p-5 shadow-xl">
            <div className="mb-8 flex items-center justify-between">
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="text-lg font-bold"
              >
                LedgerFlow
                <span className="mt-1 block text-xs font-normal text-muted-foreground">
                  Accounting Suite
                </span>
              </Link>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-accent"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
}
