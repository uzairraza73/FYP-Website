"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Settings, Bell, Lock, LogOut, ChevronRight, Activity, FileText } from "lucide-react";
import { cn } from "@/utils/cn";
import { BackButton } from "@/components/BackButton";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/role-selection");
  };

  return (
    <div className="min-h-screen bg-[#F0E8DF] font-plus-jakarta relative overflow-hidden">
      
      {/* Global Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#D4A98A]/25 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] bg-[#C69C7B]/15 rounded-full blur-[100px]" />
      </div>

      <div className="px-6 pt-24 max-w-xl mx-auto pb-40 relative z-10">
        <div className="mb-8">
          <BackButton />
        </div>

        <div className="text-center mb-10">
          <div className="w-24 h-24 rounded-[2rem] bg-white/80 backdrop-blur-md mx-auto flex items-center justify-center text-[#8D6E63] mb-4 border border-white shadow-[0_8px_30px_rgba(92,64,51,0.08)] relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4A98A]/20 to-transparent rounded-[2rem] opacity-50" />
            <User size={40} className="relative z-10" />
          </div>
          <h1 className="text-3xl font-black text-[#3E2723] leading-tight">{user?.name || "Patient Profile"}</h1>
          <p className="text-xs text-[#8D6E63] uppercase tracking-widest font-bold mt-2">Manage health identity and security</p>
        </div>

        <div className="space-y-4">
          {[
            { icon: Bell, label: "Notification Logic", desc: "Clinical scan reminders", action: () => router.push("/dashboard/notifications") },
            { icon: FileText, label: "Medical History", desc: "View your past AI scans", action: () => router.push("/history") },
            { icon: LogOut, label: "Terminate Session", desc: "Log out of clinical environment", color: "text-red-500", action: handleLogout }
          ].map((item, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: idx * 0.1 }}
              onClick={item.action}
            >
              <div className="relative bg-white/75 backdrop-blur-xl border border-white/90 rounded-3xl p-5 flex items-center gap-5 cursor-pointer group hover:-translate-y-1 transition-all duration-300 shadow-[0_6px_30px_rgba(92,64,51,0.03)] hover:shadow-[0_16px_40px_rgba(212,169,138,0.15)] overflow-hidden">
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#EADBCE]/40 rounded-full blur-2xl pointer-events-none group-hover:scale-110 transition-transform" />
                
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-white/50 shadow-sm z-10 transition-colors", item.color ? "bg-red-50 text-red-500" : "bg-[#F0E8DF] text-[#8D6E63] group-hover:bg-[#8D6E63] group-hover:text-white")}>
                   <item.icon size={20} />
                </div>
                
                <div className="flex-grow z-10">
                   <p className="text-sm font-black text-[#3E2723]">{item.label}</p>
                   <p className="text-xs text-[#7D5A4F] font-medium">{item.desc}</p>
                </div>

                <div className="w-8 h-8 rounded-full bg-white border border-[#E8D5C4] flex items-center justify-center text-[#A1887F] group-hover:bg-[#F0E8DF] group-hover:text-[#5C4033] transition-all duration-300 z-10 shrink-0">
                  <ChevronRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
