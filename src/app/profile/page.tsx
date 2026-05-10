"use client";

import { GlassCard } from "@/components/GlassCard";
import { User, Settings, Bell, Lock, LogOut } from "lucide-react";
import { cn } from "@/utils/cn";

export default function ProfilePage() {
  return (
    <div className="px-6 pt-24 max-w-xl mx-auto pb-40">
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-2xl bg-slate-950 mx-auto flex items-center justify-center text-blue-500 mb-4 border border-white/5 shadow-3xl">
          <User size={24} />
        </div>
        <h1 className="text-xl font-black text-white font-plus-jakarta uppercase tracking-tight">Clinical Portal</h1>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Manage health identity and security</p>
      </div>

      <div className="space-y-2">
        {[
          { icon: Settings, label: "Account Configuration", desc: "Security and identity parameters" },
          { icon: Bell, label: "Notification Logic", desc: "Clinical scan reminders" },
          { icon: Lock, label: "Data Encryption", desc: "Biometric and HIPAA settings" },
          { icon: LogOut, label: "Terminate Session", desc: "Log out of clinical environment", color: "text-red-500/60" }
        ].map((item, idx) => (
          <GlassCard key={idx} className="p-3 flex items-center gap-4 cursor-pointer bg-slate-900/10 border-white/5 hover:bg-slate-900/30 group">
             <div className={cn("p-2 rounded-lg bg-slate-900 border border-white/5 group-hover:scale-110 transition-transform", item.color)}>
                <item.icon size={14} />
             </div>
             <div className="flex-grow">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-tight">{item.label}</p>
                <p className="text-[8px] text-slate-600 font-bold uppercase tracking-tighter">{item.desc}</p>
             </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
