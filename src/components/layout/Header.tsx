"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Bell, LogOut, Settings, ChevronDown } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import MobileSidebar from "./MobileSidebar";
import { useAuth } from "@/lib/auth-context";
import { cn } from "cn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const { user, signOut } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setUserMenuOpen(false);
  };

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
    <header className="sticky top-0 z-40 flex min-h-16 items-center justify-between gap-4 border-b border-border bg-background/95 backdrop-blur-sm px-4 sm:px-6 lg:px-8">
      {/* Left section: Mobile menu + page title */}
      <div className="flex min-w-0 items-center gap-3">
        <MobileSidebar />

        <div className="min-w-0">
          <h2 className="font-heading text-xl font-medium tracking-tight text-foreground">
            {title}
          </h2>

          <p className="mt-0.5 text-sm text-muted-foreground">
            {user?.email ? `Signed in as ${user.email}` : "Welcome back"}
          </p>
        </div>
      </div>

      {/* Right section: Actions */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <button
          type="button"
          aria-label="Notifications"
          title="Notifications"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border hover:bg-accent transition-colors"
        >
          <Bell className="h-5 w-5 text-foreground/70" />
        </button>

        <ThemeToggle />

        <DropdownMenu open={userMenuOpen} onOpenChange={setUserMenuOpen}>
          <DropdownMenuTrigger>
            <div
              className={cn(
                "relative inline-flex h-10 w-10 items-center justify-center rounded-full",
                "bg-background hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              )}
              tabIndex={0}
            >
              <Avatar className="h-10 w-10">
                {user?.photoURL ? (
                  <AvatarImage src={user.photoURL} alt={user.displayName ?? "User"} />
                ) : (
                  <AvatarFallback className="text-xs font-medium bg-primary/10 text-primary">
                    {getInitials(user?.displayName)}
                  </AvatarFallback>
                )}
              </Avatar>
              <ChevronDown className="ml-1 h-3.5 w-3.5 text-muted-foreground" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-foreground">{user?.displayName || "Admin User"}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email || ""}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setUserMenuOpen(false)} inset>
                <Link href="/settings" className="flex w-full items-center justify-between">
                  <span>Settings</span>
                  <Settings className="h-4 w-4" />
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={handleSignOut}
                inset
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}