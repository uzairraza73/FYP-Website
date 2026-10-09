"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import {
  LayoutDashboard, Users, Calendar, MessageSquare,
  Settings, Activity, LogOut
} from "lucide-react";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/doctor" },
  { icon: Users, label: "Patients", href: "/doctor/patients" },
  { icon: Calendar, label: "Schedule", href: "/doctor/schedule" },
  { icon: MessageSquare, label: "Messages", href: "/doctor/messages" },
  { icon: Settings, label: "Settings", href: "/doctor/settings" },
];

export function DoctorLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push("/auth/role-selection");
  };

  return (
    <div className="min-h-screen font-plus-jakarta bg-[#F0E8DF] flex overflow-hidden relative">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#D4A98A]/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] bg-[#C69C7B]/20 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-[#E8D5C4]/40 rounded-full blur-[80px]" />
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative z-10 w-[220px] flex-shrink-0 flex flex-col bg-white/60 backdrop-blur-xl border-r border-white/50 shadow-[4px_0_30px_rgba(92,64,51,0.06)] min-h-screen"
      >
        <div className="px-7 pt-8 pb-6 flex items-center justify-center">
          <Link href="/" className="block">
            <Image
              src="/logo.png"
              alt="ONCURA Logo"
              width={140}
              height={50}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
            const isActive = pathname === href;
            return (
              <button
                key={label}
                onClick={() => router.push(href)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#F0E8DF] text-[#3E2723] shadow-sm"
                    : "text-[#8D6E63] hover:bg-[#F0E8DF]/60 hover:text-[#5C4033]"
                }`}
              >
                <Icon size={18} className={isActive ? "text-[#5C4033]" : "text-[#A1887F]"} />
                {label}
              </button>
            );
          })}
        </nav>

        <div className="px-6 pb-8 pt-4 border-t border-[#E8D5C4]/60">
          <div className="flex items-center gap-2 text-[#8D6E63] mb-1">
            <Activity size={14} />
            <span className="text-[10px] font-bold">Better Care.</span>
          </div>
          <p className="text-[9px] text-[#A1887F] font-medium ml-5">Healthier Tomorrow.</p>
          <button
            onClick={handleLogout}
            className="mt-4 flex items-center gap-2 text-[10px] font-bold text-[#A1887F] hover:text-[#5C4033] transition-colors uppercase tracking-wider"
          >
            <LogOut size={13} /> Sign Out
          </button>
        </div>
      </motion.aside>

      {/* Main Area */}
      <div className="relative z-10 flex-1 flex flex-col min-h-screen overflow-y-auto">
        {/* Page content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
