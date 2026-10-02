"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe, LogOut, Check, ChevronDown,
  Bell, Menu, X,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useState, useEffect } from "react";
import Image from "next/image";
import logoImg from "../../pic folder/logo.png";
import { useAuthStore } from "@/store/useAuthStore";
import { useSettingsStore, Language } from "@/store/useSettingsStore";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/scan", label: "Clinical AI" },
  { href: "/chat", label: "CareBot" },
  { href: "/consult", label: "Consult" },
];

const authedLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/chat", label: "CareBot" },
  { href: "/history", label: "History" },
];

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { language, setLanguage } = useSettingsStore();
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [activeSub, setActiveSub] = useState<"lang" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to switch between transparent and filled header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (pathname.startsWith("/doctor")) {
    return null;
  }

  const activeLinks = isAuthenticated ? authedLinks : navLinks;

  const translations = {
    English: { patientDir: "Patient Directory", meetingSched: "Meeting Schedule", dashboard: "Dashboard", history: "History", home: "Home", clinicalAi: "Clinical AI", consult: "Consult", signIn: "Sign In", join: "Join", alerts: "Clinical Alerts", clearAll: "Clear All", language: "Language", signOut: "Sign Out" },
    Urdu: { patientDir: "مریضوں کی فہرست", meetingSched: "میٹنگ کا شیڈول", dashboard: "ڈیش بورڈ", history: "تاریخ", home: "ہوم", clinicalAi: "کلینیکل AI", consult: "مشورہ", signIn: "سائن ان", join: "شامل ہوں", alerts: "کلینیکل الرٹس", clearAll: "تمام مٹائیں", language: "زبان", signOut: "سائن آؤٹ" },
  };

  const t = translations[language];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pt-4 pb-2">
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
          className={cn(
            "max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 py-3 rounded-[2rem] transition-all duration-500",
            scrolled
              ? "bg-[#FFF0E8]/95 backdrop-blur-xl border border-[#E4C5B5] shadow-[0_8px_32px_rgba(92,64,51,0.12)]"
              : "bg-[#FFF5F0]/80 backdrop-blur-md border border-[#FFD8C2]/60 shadow-[0_4px_20px_rgba(231,111,81,0.06)]"
          )}
        >
          {/* ── Logo ── */}
          <div className="flex-1 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div whileHover={{ scale: 1.04 }} transition={{ type: "spring", stiffness: 400 }}>
                <Image
                  src={logoImg}
                  alt="Oncura Logo"
                  width={120}
                  height={38}
                  className="object-contain opacity-95 group-hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            </Link>
          </div>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1">
            {activeLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} className="relative px-4 py-2 group">
                  <span className={cn(
                    "text-[11px] font-black uppercase tracking-[0.18em] transition-colors duration-200",
                    isActive ? "text-[#3E2723]" : "text-[#5C4033]/70 group-hover:text-[#3E2723]"
                  )}>
                    {link.label}
                  </span>
                  {/* Active underline */}
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#E76F51] rounded-full"
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0, scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                  />
                  {/* Hover dot */}
                  {!isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#E76F51] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Right Side ── */}
          <div className="flex-1 flex items-center justify-end gap-3">
            {!isAuthenticated ? (
              <>
                <Link
                  href="/auth/role-selection?mode=login"
                  className="hidden sm:block text-[11px] font-black uppercase tracking-[0.18em] text-[#5C4033]/70 hover:text-[#3E2723] transition-colors duration-200"
                >
                  {t.signIn}
                </Link>
                <Link href="/auth/role-selection?mode=signup">
                  <motion.button
                    whileHover={{ scale: 1.04, boxShadow: "0 6px 20px rgba(231,111,81,0.3)" }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.18em] bg-[#E76F51] text-white rounded-[1rem] shadow-[0_4px_14px_rgba(231,111,81,0.25)] hover:bg-[#D4603F] transition-colors duration-200"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-2">
                {/* Settings / User Menu */}
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setShowSettings(!showSettings); setShowNotifications(false); }}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#FFF0E8] border border-[#FFD8C2] hover:border-[#E76F51]/50 transition-all duration-200"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#E76F51] to-[#C4533C] flex items-center justify-center text-white text-[9px] font-black uppercase">
                      {user?.name?.charAt(0) ?? "U"}
                    </div>
                    <span className="text-[10px] font-black text-[#3E2723] uppercase tracking-widest hidden sm:block max-w-[80px] truncate">{user?.name}</span>
                    <ChevronDown size={12} className={cn("text-[#5C4033] transition-transform duration-200", showSettings && "rotate-180")} />
                  </motion.button>

                  <AnimatePresence>
                    {showSettings && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full right-0 mt-3 w-52 z-[60] bg-white border border-[#FFD8C2]/60 rounded-2xl shadow-[0_20px_40px_rgba(92,64,51,0.12)] overflow-hidden"
                      >
                        {/* User info */}
                        <div className="px-4 py-3 border-b border-[#FFD8C2]/40 bg-[#FFF5F0]">
                          <p className="text-[11px] font-black text-[#3E2723] uppercase tracking-widest">{user?.name}</p>
                          <p className="text-[9px] font-bold text-[#E76F51] uppercase tracking-widest mt-0.5">{user?.role} Portal</p>
                        </div>

                        <div className="p-2">
                          {/* Language */}
                          <button
                            onClick={() => setActiveSub(activeSub === "lang" ? null : "lang")}
                            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#5C4033] hover:bg-[#FFF0E8] transition-colors"
                          >
                            <div className="flex items-center gap-2.5"><Globe size={13} /> {t.language}</div>
                            <ChevronDown size={11} className={cn("transition-transform", activeSub === "lang" && "rotate-180")} />
                          </button>
                          <AnimatePresence>
                            {activeSub === "lang" && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                                <div className="mx-2 mb-1 bg-[#FFF0E8] rounded-xl overflow-hidden border border-[#FFD8C2]/40">
                                  {(["English", "Urdu"] as Language[]).map((lang) => (
                                    <button
                                      key={lang}
                                      onClick={() => setLanguage(lang)}
                                      className={cn("w-full flex items-center justify-between px-3 py-2 text-[10px] font-bold uppercase transition-colors",
                                        language === lang ? "text-[#E76F51]" : "text-[#5C4033] hover:text-[#3E2723]")}
                                    >
                                      {lang}
                                      {language === lang && <Check size={10} />}
                                    </button>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <div className="h-px bg-[#FFD8C2]/40 my-2" />

                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <LogOut size={13} /> {t.signOut}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* Mobile menu toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 rounded-xl bg-[#FFF0E8] border border-[#FFD8C2] text-[#5C4033] flex items-center justify-center ml-1"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen
                  ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={16} /></motion.div>
                  : <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={16} /></motion.div>
                }
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scaleY: 0.9 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -10, scaleY: 0.9 }}
              transition={{ duration: 0.22, ease: [0.21, 0.47, 0.32, 0.98] }}
              style={{ originY: 0 }}
              className="max-w-7xl mx-auto mt-2 bg-[#FFF0E8]/98 backdrop-blur-xl border border-[#FFD8C2] rounded-[1.5rem] shadow-[0_16px_40px_rgba(92,64,51,0.12)] overflow-hidden"
            >
              <div className="p-4 space-y-1">
                {activeLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-xl text-[12px] font-black uppercase tracking-widest transition-colors",
                        pathname === link.href
                          ? "bg-[#3E2723] text-white"
                          : "text-[#5C4033] hover:bg-[#FFD8C2]/40"
                      )}
                    >
                      {link.label}
                      {pathname === link.href && <span className="w-1.5 h-1.5 rounded-full bg-[#E76F51]" />}
                    </Link>
                  </motion.div>
                ))}

                {!isAuthenticated && (
                  <div className="flex gap-2 pt-2 border-t border-[#FFD8C2]/40 mt-2">
                    <Link href="/auth/role-selection?mode=login" className="flex-1" onClick={() => setMobileOpen(false)}>
                      <button className="w-full py-3 text-[11px] font-black uppercase tracking-widest text-[#5C4033] border border-[#E4C5B5] rounded-xl hover:bg-[#FFD8C2]/30 transition-colors">Sign In</button>
                    </Link>
                    <Link href="/auth/role-selection?mode=signup" className="flex-1" onClick={() => setMobileOpen(false)}>
                      <button className="w-full py-3 text-[11px] font-black uppercase tracking-widest bg-[#E76F51] text-white rounded-xl shadow-[0_4px_14px_rgba(231,111,81,0.25)] hover:bg-[#D4603F] transition-colors">Sign Up</button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer so content doesn't hide behind fixed header */}
      <div className="h-[80px]" />
    </>
  );
};
