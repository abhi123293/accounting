"use client";

import { ReactNode } from "react";
import { Wallet } from "lucide-react";
import Link from "next/link";
import { cn } from "cn";

interface AuthLayoutProps {
  children: ReactNode;
  brandHeadline?: string;
  brandSubtext?: string;
  showBrandPanel?: boolean;
  className?: string;
}

export function AuthLayout({
  children,
  brandHeadline = "Precision in Every Transaction.",
  brandSubtext = "Simplify your accounting, gain clarity, and make better business decisions.",
  showBrandPanel = true,
  className,
}: AuthLayoutProps) {
  return (
    <div className={cn("split-screen min-h-screen", className)}>
      {showBrandPanel && (
        <div className="brand-panel" role="complementary" aria-label="LedgerFlow brand">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-[#080808] to-black" aria-hidden="true" />
          <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          
          <div className="relative z-10 w-full max-w-xl mx-auto text-center">
            <Link href="/dashboard" className="inline-flex items-center gap-3 mb-12" aria-label="LedgerFlow home">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 border border-white/20">
                <Wallet className="h-7 w-7 text-white" aria-hidden="true" />
              </div>
              <span className="sr-only">LedgerFlow</span>
            </Link>

            <div className="space-y-6">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight leading-[1.1] text-white">
                {brandHeadline}
              </h1>
              <p className="text-lg md:text-xl text-white/70 font-normal leading-relaxed max-w-xl mx-auto">
                {brandSubtext}
              </p>
            </div>

            <div className="mt-16 relative" aria-hidden="true">
              <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent max-w-md mx-auto" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-24 h-24 rounded-full border border-white/10" />
                <div className="w-32 h-32 rounded-full border border-white/05" />
                <div className="w-40 h-40 rounded-full border border-white/03" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="form-panel">
        <div className="form-container">
          {children}
        </div>
      </div>
    </div>
  );
}

export function AuthFormHeader({
  title = "Welcome back",
  description = "Sign in to continue to your accounting workspace.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="mb-10 text-center">
      <h2 className="font-heading text-3xl md:text-4xl font-medium tracking-tight text-black">
        {title}
      </h2>
      <p className="mt-3 text-gray-600 text-base leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export function AuthFormFooter({
  text = "Don't have an account?",
  linkText = "Create one",
  href = "/register",
}: {
  text?: string;
  linkText?: string;
  href?: string;
}) {
  return (
    <p className="mt-8 text-center text-gray-600 text-sm">
      {text}{" "}
      <Link
        href={href}
        className="font-medium text-black underline underline-offset-2 hover:text-gray-700 transition-colors duration-150"
      >
        {linkText}
      </Link>
    </p>
  );
}

export function AuthDivider({ children = "or" }: { children?: ReactNode }) {
  return (
    <div className="my-8 flex items-center gap-4">
      <div className="flex-1 h-px bg-silver/40" />
      <span className="text-gray-500 text-xs uppercase tracking-wider text-center px-2">{children}</span>
      <div className="flex-1 h-px bg-silver/40" />
    </div>
  );
}