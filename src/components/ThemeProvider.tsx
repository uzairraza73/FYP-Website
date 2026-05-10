"use client";

import { useSettingsStore } from "@/store/useSettingsStore";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useSettingsStore((state) => state.theme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Avoid hydration mismatch by not rendering theme-specific classes on server
  const themeClass = mounted ? (theme === 'dark' ? 'dark-theme' : 'light-theme') : '';

  return (
    <div className={cn("min-h-screen flex flex-col transition-colors duration-500", themeClass)}>
      {children}
    </div>
  );
};
