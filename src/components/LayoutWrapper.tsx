"use client";

import { usePathname } from "next/navigation";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard") || pathname.startsWith("/doctor");

  return (
    <main className={`flex-grow ${isDashboard ? "" : "pt-12 pb-32 md:pb-12"}`}>
      {children}
    </main>
  );
}
