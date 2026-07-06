"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Globe,
  Moon,
  Sun,
  LogOut,
  Check,
  ChevronDown,
  Bell,
  Stethoscope,
  Activity
} from "lucide-react";
import { PremiumButton } from "./PremiumButton";
import { cn } from "@/utils/cn";
import { useState } from "react";
import Image from "next/image";

import { useAuthStore } from "@/store/useAuthStore";
import { useSettingsStore, Theme, Language } from "@/store/useSettingsStore";

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { language, setLanguage } = useSettingsStore();
  const theme = 'dark';
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeSub, setActiveSub] = useState<'lang' | 'theme' | null>(null);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const isDoctorPortal = pathname.startsWith('/doctor');

  const translations = {
    English: {
      patientDir: "Patient Directory",
      meetingSched: "Meeting Schedule",
      dashboard: "Dashboard",
      history: "History",
      home: "Home",
      clinicalAi: "Clinical AI",
      consult: "Consult",
      signIn: "Sign In",
      join: "Join",
      alerts: "Clinical Alerts",
      new: "NEW",
      clearAll: "Clear All Notifications",
      themeMode: "Theme Mode",
      language: "Language",
      signOut: "Sign Out",
      doctorPortal: "DOCTOR PORTAL",
      clinicIntel: "Clinical Intelligence"
    },
    Urdu: {
      patientDir: "مریضوں کی فہرست",
      meetingSched: "میٹنگ کا شیڈول",
      dashboard: "ڈیش بورڈ",
      history: "تاریخ",
      home: "ہوم",
      clinicalAi: "کلینیکل AI",
      consult: "مشورہ",
      signIn: "سائن ان",
      join: "شامل ہوں",
      alerts: "کلینیکل الرٹس",
      new: "نیا",
      clearAll: "تمام اطلاعات مٹائیں",
      themeMode: "تھیم موڈ",
      language: "زبان",
      signOut: "سائن آؤٹ",
      doctorPortal: "ڈاکٹر پورٹل",
      clinicIntel: "کلینیکل انٹیلی جنس"
    }
  };

  const t = translations[language];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={cn(
          "max-w-7xl mx-auto glass-card flex items-center justify-between px-6 py-2 border-white/5 shadow-2xl relative transition-colors duration-500",
          theme === 'dark' ? "bg-slate-950/40" : "bg-white/80 backdrop-blur-xl"
        )}
      >
        {/* Left Side: Logo / Brand */}
        <div className="flex-1 flex items-center gap-4">
          {isDoctorPortal ? (
            <div className="flex items-center gap-3">
              <Image
                src="/web-logo.png"
                alt="Oncura Logo"
                width={120}
                height={36}
                className="object-contain mix-blend-luminosity brightness-150 opacity-90 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ) : (
            <Link href="/" className="flex items-center group gap-2">
              <Image
                src="/web-logo.png"
                alt="Oncura Logo"
                width={120}
                height={36}
                className="object-contain mix-blend-luminosity brightness-150 opacity-90 group-hover:opacity-100 group-hover:brightness-200 transition-all duration-300"
              />
            </Link>
          )}
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {isAuthenticated ? (
            isDoctorPortal ? (
              <>
                <Link href="/doctor" className="text-[10px] font-black uppercase tracking-widest text-blue-500">{t.patientDir}</Link>
                <Link href="/doctor/schedule" className={cn("text-[10px] font-black uppercase tracking-widest transition-colors", theme === 'dark' ? "text-slate-500 hover:text-white" : "text-slate-400 hover:text-slate-900")}>{t.meetingSched}</Link>
              </>
            ) : (
              <>
                <Link href="/dashboard" className={cn(
                  "text-[10px] font-black uppercase tracking-widest transition-colors",
                  pathname === '/dashboard' ? "text-blue-400" : (theme === 'dark' ? "text-slate-500 hover:text-blue-400" : "text-slate-400 hover:text-blue-500")
                )}>{t.dashboard}</Link>
                <Link href="/chat" className={cn(
                  "text-[10px] font-black uppercase tracking-widest transition-colors",
                  pathname === '/chat' ? "text-blue-400" : (theme === 'dark' ? "text-slate-500 hover:text-blue-400" : "text-slate-400 hover:text-blue-500")
                )}>CareBot</Link>
                <Link href="/history" className={cn(
                  "text-[10px] font-black uppercase tracking-widest transition-colors",
                  pathname === '/history' ? "text-blue-400" : (theme === 'dark' ? "text-slate-500 hover:text-blue-400" : "text-slate-400 hover:text-blue-500")
                )}>{t.history}</Link>
              </>
            )
          ) : (
            <>
              <Link href="/" className={cn("text-[10px] font-black uppercase tracking-widest transition-colors", pathname === '/' ? "text-blue-400" : (theme === 'dark' ? "text-slate-500 hover:text-blue-400" : "text-slate-400 hover:text-blue-500"))}>{t.home}</Link>
              <Link href="/scan" className={cn("text-[10px] font-black uppercase tracking-widest transition-colors", pathname === '/scan' ? "text-blue-400" : (theme === 'dark' ? "text-slate-500 hover:text-blue-400" : "text-slate-400 hover:text-blue-500"))}>{t.clinicalAi}</Link>
              <Link href="/chat" className={cn("text-[10px] font-black uppercase tracking-widest transition-colors", pathname === '/chat' ? "text-blue-400" : (theme === 'dark' ? "text-slate-500 hover:text-blue-400" : "text-slate-400 hover:text-blue-500"))}>CareBot</Link>
              <Link href="/consult" className={cn("text-[10px] font-black uppercase tracking-widest transition-colors", pathname === '/consult' ? "text-blue-400" : (theme === 'dark' ? "text-slate-500 hover:text-blue-400" : "text-slate-400 hover:text-blue-500"))}>{t.consult}</Link>
            </>
          )}
        </nav>

        {/* Right Side: Action Area */}
        <div className="flex-1 flex items-center justify-end gap-4">
          {!isAuthenticated ? (
            <>
              <Link href="/auth/role-selection?mode=login" className={cn("hidden sm:flex items-center gap-2 transition-colors", theme === 'dark' ? "text-slate-500 hover:text-white" : "text-slate-400 hover:text-slate-900")}>
                <span className="text-[10px] font-black uppercase tracking-widest">{t.signIn}</span>
              </Link>
              <Link href="/auth/role-selection?mode=signup">
                <PremiumButton className="px-4 py-1.5 text-[9px]">{t.join}</PremiumButton>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              {isDoctorPortal && (
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowNotifications(!showNotifications);
                      setShowSettings(false);
                    }}
                    className={cn(
                      "p-2 rounded-lg border transition-colors relative mr-1",
                      showNotifications ? "bg-blue-600/20 border-blue-500/30 text-blue-500" : (theme === 'dark' ? "bg-slate-900 border-white/5 text-slate-400 hover:text-white" : "bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-900")
                    )}
                  >
                    <Bell size={14} />
                    <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full border border-slate-950" />
                  </button>

                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className={cn("absolute top-full right-0 mt-3 w-72 z-[60] p-4 rounded-2xl border shadow-2xl", theme === 'dark' ? "bg-slate-900 border-white/10" : "bg-white border-slate-200")}
                      >
                        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2">
                          <h4 className={cn("text-[10px] font-black uppercase tracking-widest", theme === 'dark' ? "text-white" : "text-slate-900")}>{t.alerts}</h4>
                          <span className="text-[8px] font-black text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-md">{t.new} 3</span>
                        </div>

                        <div className="space-y-3">
                          {[
                            { title: "High Risk Scan", msg: "Patient Uzair Ahmad uploaded a high-risk scan.", time: "2m ago", urgent: true },
                            { title: "Meeting Reminder", msg: "Consultation with Sarah Khan in 15 mins.", time: "10m ago", urgent: false },
                            { title: "System Update", msg: "AI Model v2.4 successfully deployed.", time: "1h ago", urgent: false }
                          ].map((n, i) => (
                            <div key={i} className="group cursor-pointer">
                              <div className="flex justify-between items-start mb-1">
                                <p className={cn("text-[9px] font-black uppercase", n.urgent ? "text-red-500" : (theme === 'dark' ? "text-white" : "text-slate-900"))}>{n.title}</p>
                                <span className="text-[7px] font-bold text-slate-600">{n.time}</span>
                              </div>
                              <p className="text-[9px] text-slate-500 leading-relaxed group-hover:text-slate-300 transition-colors">{n.msg}</p>
                              {i < 2 && <div className="h-px bg-white/5 mt-3" />}
                            </div>
                          ))}
                        </div>

                        <button className="w-full mt-4 py-2 text-[8px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
                          {t.clearAll}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              <div className="relative">
                <button
                  onClick={() => {
                    setShowSettings(!showSettings);
                    setShowNotifications(false);
                  }}
                  className={cn(
                    "w-8 h-8 rounded-lg border flex items-center justify-center transition-all",
                    showSettings ? "bg-blue-500/10 border-blue-500/30 text-blue-500" : (theme === 'dark' ? "bg-slate-900 border-white/5 text-slate-500 hover:text-white" : "bg-slate-100 border-slate-200 text-slate-400 hover:text-slate-900")
                  )}
                >
                  <Settings size={14} />
                </button>

                <AnimatePresence>
                  {showSettings && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className={cn("absolute top-full right-0 mt-3 w-56 z-[60] p-2 rounded-2xl border shadow-2xl overflow-hidden", theme === 'dark' ? "bg-slate-900 border-white/10" : "bg-white border-slate-200")}
                    >
                      <div className="px-3 py-2 border-b border-white/5 mb-1 text-left">
                        <p className={cn("text-[10px] font-black uppercase tracking-widest", theme === 'dark' ? "text-white" : "text-slate-900")}>{user?.name}</p>
                        <p className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">{user?.role} Portal</p>
                      </div>


                      {/* Language Toggle */}
                      <div className="mb-1">
                        <button onClick={() => setActiveSub(activeSub === 'lang' ? null : 'lang')} className="w-full flex items-center justify-between p-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white/5 transition-colors">
                          <div className="flex items-center gap-3"><Globe size={14} /> {t.language}</div>
                          <ChevronDown size={12} className={cn("transition-transform", activeSub === 'lang' && "rotate-180")} />
                        </button>
                        <AnimatePresence>
                          {activeSub === 'lang' && (
                            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-white/5 rounded-lg">
                              {(['English', 'Urdu'] as Language[]).map(targetLang => (
                                <button key={targetLang} onClick={() => setLanguage(targetLang)} className={cn("w-full px-4 py-2 text-[9px] font-bold uppercase text-left transition-colors", language === targetLang ? "text-blue-500" : "text-slate-500 hover:text-slate-300")}>
                                  {targetLang} {language === targetLang && <Check size={10} className="inline ml-1" />}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="h-px bg-white/5 my-1" />

                      <button onClick={handleLogout} className="w-full flex items-center gap-3 p-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-colors text-left">
                        <LogOut size={14} /> {t.signOut}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </header>
  );
};
