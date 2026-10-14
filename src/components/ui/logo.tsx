"use client";

import Link from "next/link";
import { Wallet } from "lucide-react";
import { cn } from "cn";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  variant?: "default" | "premium" | "minimal";
}

const sizeStyles = {
  sm: "h-8 w-8 text-2xl",
  md: "h-12 w-12 text-3xl",
  lg: "h-16 w-16 text-4xl",
};

export function Logo({ 
  className, 
  size = "md", 
  showTagline = true, 
  variant = "premium",
  ...props 
}: LogoProps) {
  const isPremium = variant === "premium";
  
  return (
    <Link 
      href="/dashboard" 
      className={cn("inline-flex items-center gap-3", className)}
      aria-label="LedgerFlow - Accounting Suite"
      {...props}
    >
      <div className={cn(
        "relative flex items-center justify-center rounded-2xl transition-all duration-300",
        sizeStyles[size],
        isPremium && [
          "bg-gradient-to-br from-primary via-primary/80 to-primary/60",
          "text-primary-foreground",
          "shadow-lg shadow-primary/25",
          "hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]",
          "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-primary/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity",
          "after:absolute after:inset-0 after:rounded-2xl after:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] after:from-primary/30 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity"
        ].join(" "),
        !isPremium && "bg-primary text-primary-foreground hover:opacity-90"
      )}>
        {isPremium && (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-primary-foreground/10 to-transparent rounded-2xl" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.1)_0%,_transparent_50%)] rounded-2xl" />
          </>
        )}
        <Wallet 
          className={cn(
            "relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]",
            isPremium && "filter brightness-110"
          )} 
          aria-hidden="true" 
        />
      </div>
      
      {showTagline && (
        <div className="text-left">
          <h1 className={cn(
            "font-bold tracking-tight text-foreground transition-colors duration-200",
            isPremium ? "bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent" : "",
            size === "sm" && "text-lg",
            size === "md" && "text-xl",
            size === "lg" && "text-2xl"
          )}>
            LedgerFlow
          </h1>
          {isPremium && (
            <p className={cn(
              "font-medium tracking-wide transition-colors duration-200",
              "bg-gradient-to-r from-primary/80 to-primary/60 bg-clip-text text-transparent",
              size === "sm" && "text-xs",
              size === "md" && "text-xs",
              size === "lg" && "text-sm"
            )}>
              Accounting Suite
            </p>
          )}
          {!isPremium && showTagline && (
            <p className={cn("text-muted-foreground", size === "sm" && "text-xs", size === "md" && "text-xs", size === "lg" && "text-sm")}>
              Accounting Suite
            </p>
          )}
        </div>
      )}
    </Link>
  );
}

export function LogoMark({ 
  className, 
  size = "md",
  variant = "premium"
}: Omit<LogoProps, "showTagline">) {
  const isPremium = variant === "premium";
  
  return (
    <div className={cn(
      "relative flex items-center justify-center rounded-2xl transition-all duration-300",
      sizeStyles[size],
      isPremium && [
        "bg-gradient-to-br from-primary via-primary/80 to-primary/60",
        "text-primary-foreground",
        "shadow-lg shadow-primary/25",
        "hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02]",
        "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-primary/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity"
      ].join(" "),
      !isPremium && "bg-primary text-primary-foreground"
    )}>
      {isPremium && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-foreground/10 to-transparent rounded-2xl" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,_rgba(255,255,255,0.1)_0%,_transparent_50%)] rounded-2xl" />
        </>
      )}
      <Wallet className={cn("relative z-10", isPremium && "filter brightness-110")} aria-hidden="true" />
    </div>
  );
}