"use client";

import { useQuery } from "@tanstack/react-query";
import { getBusinessSettings } from "@/lib/business-settings";

export function useBusinessSettings() {
  return useQuery({
    queryKey: ["business-settings"],
    queryFn: getBusinessSettings,
    staleTime: 5 * 60 * 1000,
  });
}