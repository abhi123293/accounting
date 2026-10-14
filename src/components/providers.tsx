"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/lib/auth-context";
import ThemeProviderWrapper from "@/components/theme-provider-wrapper";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
    </AuthProvider>
  );
}