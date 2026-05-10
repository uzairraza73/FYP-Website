"use client";

import { GlassCard } from "@/components/GlassCard";
import { PremiumButton } from "@/components/PremiumButton";
import { useAuthStore } from "@/store/useAuthStore";
import { useScanStore } from "@/store/useScanStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { 
  Plus, 
  History as HistoryIcon, 
  MessageSquare, 
  ChevronRight,
  Activity,
  ShieldCheck,
  Stethoscope
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

const translations = {
  English: {
    welcome: "Welcome back",
    clinicalIntel: "Clinical Intelligence Dashboard",
    startScan: "Start New Scan",
    viewHistory: "View History",
    clinicalSupport: "Clinical Support",
    recentActivity: "Recent Clinical Activity",
    noHistory: "No scan history detected. Initiate your first clinical scan to begin tracking.",
    healthMetrics: "Skin Health Metrics",
    riskProfile: "Risk Profile",
    scanConsistency: "Scan Consistency",
    clinicalStatus: "Clinical Status",
    active: "Active",
    monitored: "Monitored",
    verified: "Verified",
    lastScan: "Last Scan",
    confidence: "Confidence",
    seeFullReport: "See Full Report"
  },
  Urdu: {
    welcome: "خوش آمدید",
    clinicalIntel: "کلینیکل انٹیلی جنس ڈیش بورڈ",
    startScan: "نیا اسکین شروع کریں",
    viewHistory: "تاریخ دیکھیں",
    clinicalSupport: "کلینیکل سپورٹ",
    recentActivity: "حالیہ کلینیکل سرگرمی",
    noHistory: "کوئی اسکین تاریخ نہیں ملی۔ ٹریکنگ شروع کرنے کے لیے اپنا پہلا کلینیکل اسکین شروع کریں۔",
    healthMetrics: "جلد کی صحت کے پیمانے",
    riskProfile: "رسک پروفائل",
    scanConsistency: "اسکین کی مستقل مزاجی",
    clinicalStatus: "کلینیکل حیثیت",
    active: "فعال",
    monitored: "نگرانی میں",
    verified: "تصدیق شدہ",
    lastScan: "آخری اسکین",
    confidence: "اعتماد",
    seeFullReport: "مکمل رپورٹ دیکھیں"
  }
};

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { history } = useScanStore();
  const { theme, language } = useSettingsStore();
  
  const t = translations[language];

  return (
    <div className={cn(
      "min-h-screen pt-24 pb-20 px-6 transition-colors duration-500",
      theme === 'dark' ? "bg-[#020617] text-white" : "bg-slate-50 text-slate-900"
    )}>
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className={cn(
          "absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]",
          theme === 'dark' ? "bg-blue-600/5" : "bg-blue-500/10"
        )} />
        <div className={cn(
          "absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]",
          theme === 'dark' ? "bg-indigo-600/5" : "bg-indigo-500/10"
        )} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter font-plus-jakarta mb-2">
              {t.welcome}, <span className="text-blue-500">{user?.name}</span>
            </h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black">{t.clinicalIntel}</p>
          </div>

          <div className="flex gap-3">
            <Link href="/scan">
              <PremiumButton glow className="px-6 py-2.5 text-[10px]">
                <Plus size={14} className="mr-2" /> {t.startScan}
              </PremiumButton>
            </Link>
            <Link href="/history">
              <PremiumButton variant="secondary" className="px-6 py-2.5 text-[10px]">
                <HistoryIcon size={14} className="mr-2" /> {t.viewHistory}
              </PremiumButton>
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: t.riskProfile, value: history.length > 0 ? history[0].riskLevel : "N/A", icon: ShieldCheck, color: "text-blue-500" },
            { label: t.scanConsistency, value: "98%", icon: Activity, color: "text-emerald-500" },
            { label: t.clinicalStatus, value: t.active, icon: Stethoscope, color: "text-purple-500" },
            { label: "AI Reliability", value: "99.2%", icon: Activity, color: "text-blue-500" }
          ].map((stat, i) => (
            <GlassCard key={i} className={cn(
              "p-6 flex flex-col items-center text-center transition-transform hover:scale-[1.02]",
              theme === 'dark' ? "bg-slate-900/10 border-white/5" : "bg-white border-slate-200"
            )}>
              <div className={cn("w-10 h-10 rounded-xl bg-slate-900/50 flex items-center justify-center mb-4 border border-white/5", stat.color)}>
                <stat.icon size={20} />
              </div>
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-xl font-black tracking-tight">{stat.value}</p>
            </GlassCard>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <GlassCard className={cn(
            "lg:col-span-2 p-8",
            theme === 'dark' ? "bg-slate-900/10 border-white/5" : "bg-white border-slate-200"
          )}>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <HistoryIcon size={14} className="text-blue-500" /> {t.recentActivity}
            </h3>

            {history.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold max-w-sm mx-auto leading-relaxed">
                  {t.noHistory}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {history.slice(0, 3).map((scan) => (
                  <div key={scan.id} className={cn(
                    "flex items-center gap-4 p-4 rounded-2xl border group cursor-pointer transition-all hover:bg-blue-600/5",
                    theme === 'dark' ? "bg-slate-900/20 border-white/5" : "bg-slate-50 border-slate-200"
                  )}>
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10">
                      <Image src={scan.imageUrl} alt="Scan" width={64} height={64} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn(
                          "px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest",
                          scan.riskLevel === "High" ? "bg-red-500/10 text-red-500" : 
                          scan.riskLevel === "Medium" ? "bg-orange-500/10 text-orange-500" : 
                          "bg-emerald-500/10 text-emerald-500"
                        )}>
                          {scan.riskLevel} Risk
                        </span>
                        <span className="text-[8px] text-slate-600 font-bold uppercase">{scan.date}</span>
                      </div>
                      <h4 className="text-sm font-black uppercase tracking-tight">{scan.type}</h4>
                    </div>
                    <ChevronRight size={18} className="text-slate-800 group-hover:text-blue-500 transition-colors" />
                  </div>
                ))}
              </div>
            )}
          </GlassCard>

          {/* Clinical Support CTA & AI Carebot */}
          <div className="space-y-6">
            {/* Clinical Support CTA - Enhanced 3D Version */}
            <motion.div
              whileHover={{ scale: 1.02, rotateX: -5, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="perspective-1000"
            >
              <GlassCard className="p-8 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white border-none shadow-[0_20px_50px_rgba(59,130,246,0.3)] relative overflow-hidden group cursor-pointer h-full">
                {/* Animated Background Elements */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    opacity: [0.1, 0.2, 0.1]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-20 -right-20 w-64 h-64 bg-white/20 rounded-full blur-[80px] pointer-events-none" 
                />
                
                <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-all duration-700 transform group-hover:rotate-12 group-hover:scale-110">
                  <Stethoscope size={100} className="text-white drop-shadow-2xl" />
                </div>
                
                <div className="relative z-10">
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="inline-flex items-center gap-2 px-2 py-1 rounded-lg bg-white/10 border border-white/20 text-[8px] font-black uppercase tracking-widest mb-6"
                  >
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    Specialists Online
                  </motion.div>
                  
                  <h3 className="text-2xl font-black mb-3 font-plus-jakarta uppercase tracking-tighter leading-tight">
                    {t.clinicalSupport}
                  </h3>
                  <p className="text-[11px] font-bold opacity-80 leading-relaxed mb-10 uppercase tracking-wide max-w-[80%]">
                    Connect with world-class clinical experts for a secondary human verification and care protocol.
                  </p>
                  
                  <Link href="/consult">
                    <PremiumButton className="w-full bg-white text-blue-700 hover:bg-blue-50 border-none shadow-xl text-[10px] font-black group-hover:translate-x-1 transition-transform">
                      Find Specialist <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                    </PremiumButton>
                  </Link>
                </div>

                {/* Bottom Decorative Line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </GlassCard>
            </motion.div>

            <GlassCard className={cn(
              "p-8",
              theme === 'dark' ? "bg-slate-900/10 border-white/5" : "bg-white border-slate-200"
            )}>
              <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <MessageSquare size={14} className="text-blue-500" /> AI Carebot
              </h3>
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed mb-6 uppercase tracking-tight">
                Get instant answers regarding clinical skin conditions and morphology.
              </p>
              <Link href="/chat">
                <PremiumButton variant="secondary" className="w-full text-[9px]">
                  Initiate AI Consultation
                </PremiumButton>
              </Link>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
