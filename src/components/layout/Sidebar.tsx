"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  BookOpen,
  ChartNoAxesCombined,
  Settings,
  Wallet,
} from "lucide-react";
import { useUser } from "@/lib/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navigation = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Invoices", href: "/invoices", icon: FileText },
  { label: "Contacts", href: "/contacts", icon: Users },
  { label: "Accounts", href: "/accounts", icon: Wallet },
  { label: "Ledger", href: "/ledger", icon: BookOpen },
  { label: "Reports", href: "/reports", icon: ChartNoAxesCombined },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, loading } = useUser();

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <aside className="hidden lg:flex min-h-screen w-72 shrink-0 flex-col border-r border-sidebar-border bg-sidebar p-6 flex-col">
      <Link href="/dashboard" className="mb-12 flex flex-col items-start gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary/10">
          <Wallet className="h-5 w-5 text-sidebar-primary" />
        </div>

        <div>
          <h1 className="font-heading text-lg font-bold tracking-tight text-sidebar-foreground">
            LedgerFlow
          </h1>
          <p className="text-xs text-sidebar-foreground/40 tracking-wide uppercase">
            Accounting Suite
          </p>
        </div>
      </Link>

      <div className="editorial-rule-short mx-3" />

      <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-sidebar-foreground/40">
        Workspace
      </p>

      <nav className="flex flex-col gap-0.5 flex-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-150 ${
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-xl border border-sidebar-border p-4">
        {loading ? (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-accent animate-pulse" />
            <div className="flex-1 space-y-1">
              <div className="h-4 w-3/4 bg-sidebar-accent rounded animate-pulse" />
              <div className="h-3 w-1/2 bg-sidebar-accent rounded animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="text-xs font-medium bg-sidebar-primary/10 text-sidebar-primary">
                {getInitials(user?.displayName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {user?.displayName ?? "Admin User"}
              </p>
              <p className="mt-0.5 text-xs text-sidebar-foreground/50 truncate">
                {user?.email ?? "Business administrator"}
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}