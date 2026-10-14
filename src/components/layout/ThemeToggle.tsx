"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun, Monitor } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        aria-label="Loading theme"
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border"
      >
        <span className="h-4 w-4" />
      </button>
    );
  }

  const themes = ["light", "dark", "system"] as const;
  const currentIndex = themes.indexOf(theme);
  const nextTheme = themes[(currentIndex + 1) % themes.length];

  const themeLabels = {
    light: "Switch to dark mode",
    dark: "Switch to system theme",
    system: "Switch to light mode",
  };

  const themeIcons = {
    light: <Sun className="h-5 w-5" />,
    dark: <Moon className="h-5 w-5" />,
    system: <Monitor className="h-5 w-5" />,
  };

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      aria-label={themeLabels[theme]}
      title={themeLabels[theme]}
      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {themeIcons[theme]}
    </button>
  );
}