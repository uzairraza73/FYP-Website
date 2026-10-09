"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/useAuthStore";
import { useScanStore } from "@/store/useScanStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard, Calendar, FileText, MessageSquare,
  Settings, User, Bell, ChevronRight, ChevronDown,
  Heart, ArrowRight, LogOut, Activity, Scan, Stethoscope
} from "lucide-react";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard",       href: "/dashboard"              },
  { icon: Calendar,        label: "My Appointments", href: "/dashboard/appointments" },
  { icon: FileText,        label: "Medical Records", href: "/history"                },
  { icon: MessageSquare,   label: "Messages",        href: "/dashboard/messages", badge: 2  },
  { icon: Settings,        label: "Settings",        href: "/dashboard/settings"     },
];

const QUICK_ACTIONS = [
  { icon: Calendar,      label: "Appointments", href: "/dashboard/appointments", color: "bg-[#EAE0D6]" },
  { icon: FileText,      label: "Medical Records", href: "/history",             color: "bg-[#EAE0D6]" },
  { icon: MessageSquare, label: "Messages",      href: "/dashboard/messages",    color: "bg-[#EAE0D6]" },
  { icon: User,          label: "Profile",       href: "/profile",               color: "bg-[#EAE0D6]" },
];

const FEATURE_CARDS = [
  { icon: Calendar,      title: "My Appointments", desc: "View and manage your upcoming appointments.",                    href: "/dashboard/appointments", color: "text-[#8D6E63]" },
  { icon: FileText,      title: "Medical Records", desc: "Access your test results, prescriptions and health history.",    href: "/history",                color: "text-[#8D6E63]" },
  { icon: MessageSquare, title: "Doctor Messages", desc: "Message your doctor directly and get clinical guidance.",        href: "/dashboard/messages",     color: "text-[#8D6E63]", badge: 2 },
  { icon: User,          title: "My Profile",      desc: "Update your personal and medical information.",                  href: "/profile",                color: "text-[#8D6E63]" },
];

export default function DashboardPage() {
  const { user, logout } = useAuthStore();
  const { history } = useScanStore();
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [showUserMenu, setShowUserMenu] = useState(false);

  const fullName = user?.name || "Sara Khan";
  const firstName = fullName.split(" ")[0];

  const handleNav = (label: string, href: string) => {
    setActiveNav(label);
    router.push(href);
  };

  const handleLogout = () => {
    logout();
    router.push("/auth/role-selection");
  };

  return (
    <div className="min-h-screen font-plus-jakarta bg-[#F0E8DF] flex overflow-hidden relative">

      {/* Global blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#D4A98A]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] bg-[#C69C7B]/12 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-[#E8D5C4]/30 rounded-full blur-[80px]" />
      </div>

      {/* ── SIDEBAR ── */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative z-20 w-[220px] flex-shrink-0 flex flex-col bg-white/70 backdrop-blur-2xl border-r border-white/60 shadow-[4px_0_30px_rgba(92,64,51,0.06)] min-h-screen"
      >
        {/* Logo */}
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

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-1">
          {NAV_ITEMS.map(({ icon: Icon, label, href, badge }) => {
            const isActive = activeNav === label;
            return (
              <button
                key={label}
                onClick={() => handleNav(label, href)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#E8D5C4]/70 text-[#3E2723] shadow-sm"
                    : "text-[#8D6E63] hover:bg-[#F0E8DF]/80 hover:text-[#5C4033]"
                }`}
              >
                <Icon size={17} className={isActive ? "text-[#5C4033]" : "text-[#A1887F]"} />
                <span className="flex-1 text-left">{label}</span>
                {badge && (
                  <span className="w-5 h-5 rounded-full bg-[#E76F51] text-white text-[10px] font-black flex items-center justify-center">
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom CTA */}
        <div className="px-5 pb-6 pt-4 border-t border-[#E8D5C4]/50">
          <button onClick={() => router.push("/scan")}
            className="w-full py-3 bg-[#8D6E63] hover:bg-[#5C4033] text-white text-xs font-black rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 mb-4">
            <Scan size={14} /> AI Skin Scan
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 text-[11px] font-bold text-[#A1887F] hover:text-[#5C4033] transition-colors uppercase tracking-wider cursor-pointer">
            <LogOut size={12} /> Sign Out
          </button>
        </div>
      </motion.aside>

      {/* ── MAIN ── */}
      <div className="relative z-10 flex-1 flex flex-col min-h-screen overflow-y-auto">

        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-[#F0E8DF]/85 backdrop-blur-xl border-b border-white/50 px-8 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#A1887F] font-medium uppercase tracking-wider">Patient Dashboard</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <button className="relative w-9 h-9 rounded-full bg-white/80 border border-white/80 flex items-center justify-center text-[#8D6E63] hover:bg-white transition-all shadow-sm">
              <Bell size={16} />
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#E76F51] border-2 border-[#F0E8DF]" />
            </button>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2.5 bg-white/80 border border-white/80 rounded-full pl-1.5 pr-4 py-1.5 shadow-sm hover:bg-white transition-all"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#D4A98A] to-[#8D6E63] flex items-center justify-center text-white text-xs font-black">
                  {fullName.charAt(0)}
                </div>
                <span className="text-xs font-black text-[#3E2723]">{fullName}</span>
                <ChevronDown size={12} className={`text-[#A1887F] transition-transform ${showUserMenu ? "rotate-180" : ""}`} />
              </button>
              {showUserMenu && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 top-full mt-2 w-52 bg-white/95 backdrop-blur-xl border border-white rounded-2xl shadow-xl overflow-hidden z-30">
                  <div className="px-4 py-3 border-b border-[#F0E8DF]">
                    <p className="text-sm font-black text-[#3E2723]">{fullName}</p>
                    <p className="text-xs text-[#A1887F]">{user?.email || "patient@oncura.pk"}</p>
                  </div>
                  {[{ label: "My Profile", href: "/profile" }, { label: "Settings", href: "/dashboard/settings" }, { label: "My Appointments", href: "/dashboard/appointments" }].map(item => (
                    <Link key={item.label} href={item.href} onClick={() => setShowUserMenu(false)}
                      className="block w-full text-left px-4 py-2.5 text-sm text-[#5C4033] hover:bg-[#F5EDE4] transition-colors font-medium">
                      {item.label}
                    </Link>
                  ))}
                  <button onClick={() => { setShowUserMenu(false); handleLogout(); }} className="block w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors font-bold border-t border-[#F0E8DF] cursor-pointer">
                    Sign Out
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 space-y-6">

          {/* ── HERO (matches reference image) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="relative rounded-[2.5rem] overflow-hidden min-h-[280px] bg-gradient-to-br from-[#F5EDE4] via-[#EFE3D7] to-[#E3D0BD] border border-white/60 shadow-[0_8px_40px_rgba(92,64,51,0.08)]"
          >
            {/* Decorative blobs inside hero */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A98A]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#C8A882]/15 rounded-full blur-[60px] pointer-events-none" />
            {/* Inner ring */}
            <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-inset ring-white/40 pointer-events-none" />

            {/* Organic leaf decoration (top left) */}
            <div className="absolute top-0 left-0 opacity-20 pointer-events-none">
              <svg width="120" height="140" viewBox="0 0 120 140" fill="none">
                <path d="M10 140 C30 80 80 50 110 10" stroke="#8D6E63" strokeWidth="2" fill="none"/>
                <path d="M30 140 C50 90 90 60 120 20" stroke="#A1887F" strokeWidth="1.5" fill="none"/>
                <ellipse cx="60" cy="70" rx="20" ry="50" stroke="#8D6E63" strokeWidth="1" fill="none" transform="rotate(-30 60 70)"/>
              </svg>
            </div>

            {/* Left Text Content */}
            <div className="relative z-10 flex h-full items-stretch">
              <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                {/* Breadcrumb pill */}
                <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm border border-white/70 rounded-full px-4 py-2 w-fit mb-5 shadow-sm">
                  <User size={12} className="text-[#8D6E63]" />
                  <span className="text-[11px] font-black text-[#5C4033] uppercase tracking-wider">Patient Dashboard</span>
                </div>

                <p className="text-base text-[#7D5A4F] font-medium mb-1">Welcome Back,</p>
                <h1 className="text-4xl md:text-5xl font-black text-[#3E2723] leading-tight mb-4">{fullName}</h1>
                <p className="text-sm text-[#7D5A4F] font-medium leading-relaxed max-w-sm mb-8">
                  Your health matters to us. Access your appointments, medical records and more —{" "}
                  <span className="font-black text-[#3E2723]">all in one place.</span>
                </p>

                {/* Quick Action Icons (like the reference image) */}
                <div className="flex items-center gap-6">
                  {QUICK_ACTIONS.map(({ icon: Icon, label, href }) => (
                    <button key={label} onClick={() => router.push(href)}
                      className="flex flex-col items-center gap-2 group cursor-pointer">
                      <div className="w-12 h-12 rounded-2xl bg-white/70 backdrop-blur-sm border border-white shadow-sm flex items-center justify-center text-[#8D6E63] group-hover:bg-[#8D6E63] group-hover:text-white group-hover:scale-110 transition-all duration-300">
                        <Icon size={20} />
                      </div>
                      <span className="text-[10px] font-bold text-[#7D5A4F] group-hover:text-[#3E2723] transition-colors tracking-wide">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Side: Photo + Tagline */}
              <div className="relative hidden md:flex items-end justify-center pr-0 pb-0 w-[360px] shrink-0">
                {/* "Your Health, Our Priority" handwriting text */}
                <div className="absolute top-8 right-44 z-20 text-center">
                  <p className="font-serif italic text-[#7D5A4F] text-xl leading-tight">Your Health,</p>
                  <p className="font-serif italic text-[#7D5A4F] text-xl leading-tight">Our Priority.</p>
                  <div className="mt-1 flex justify-center text-[#C69C7B]">
                    <Heart size={16} fill="currentColor" />
                  </div>
                </div>

                {/* Hero Woman Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=480&h=380&q=90"
                  alt="Health"
                  className="w-full h-full object-cover object-top rounded-br-[2.5rem]"
                  style={{ maxHeight: "280px" }}
                />
                {/* Gradient overlay bottom of image */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#EFE3D7] to-transparent pointer-events-none rounded-br-[2.5rem]" />
              </div>
            </div>
          </motion.div>



          {/* ── BOTTOM ROW ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {/* Next Appointment Card */}
            <div className="md:col-span-2 relative rounded-[1.75rem] overflow-hidden">
              <div className="absolute inset-0 bg-white/75 backdrop-blur-xl rounded-[1.75rem] border border-white/90 shadow-[0_6px_30px_rgba(92,64,51,0.05)]" />
              <div className="absolute -bottom-10 right-10 opacity-[0.05]">
                <Stethoscope size={100} className="text-[#8D6E63]" />
              </div>
              <div className="relative z-10 p-7 flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#F0E8DF] border border-[#E8D5C4] flex items-center justify-center text-[#8D6E63] shadow-sm flex-shrink-0">
                  <Calendar size={26} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] text-[#A1887F] font-black uppercase tracking-widest mb-1">Next Appointment</p>
                  <h3 className="text-lg font-black text-[#3E2723] mb-0.5">Dr. Ayesha Malik</h3>
                  <p className="text-xs text-[#8D6E63] font-medium">General Physician</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-[#7D5A4F] font-medium">
                    <span className="flex items-center gap-1"><Calendar size={11} className="text-[#A1887F]" /> 12 Oct 2026</span>
                    <span className="text-[#D7CCC8]">|</span>
                    <span>10:30 AM</span>
                  </div>
                </div>
                <button
                  onClick={() => router.push("/dashboard/appointments")}
                  className="flex items-center gap-2 bg-[#8D6E63] hover:bg-[#5C4033] text-white text-xs font-black rounded-full px-5 py-3 transition-all duration-300 whitespace-nowrap shadow-md flex-shrink-0"
                >
                  View Details <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Quick Scan Card */}
            <div
              onClick={() => router.push("/scan")}
              className="relative rounded-[1.75rem] overflow-hidden group cursor-pointer hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#8D6E63] to-[#5C4033] rounded-[1.75rem] shadow-[0_8px_30px_rgba(92,64,51,0.20)]" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
              <div className="relative z-10 p-6 text-white flex flex-col justify-between h-full min-h-[140px]">
                <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center mb-4">
                  <Activity size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-base font-black mb-1 leading-tight">AI Skin Scan</h3>
                  <p className="text-xs text-white/75 font-medium mb-4">Analyze a skin lesion now with our AI model.</p>
                  <div className="flex items-center gap-1.5 text-xs font-black text-white/90">
                    Start Scan <ArrowRight size={13} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Health Tip Strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38 }}
            className="relative rounded-[1.75rem] overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/75 backdrop-blur-xl rounded-[1.75rem] border border-white/90 shadow-[0_6px_30px_rgba(92,64,51,0.05)]" />
            <div className="relative z-10 p-6 flex items-center gap-5 flex-wrap">
              <div className="w-10 h-10 rounded-xl bg-[#FFF0EB] border border-[#FFD8C2] flex items-center justify-center flex-shrink-0">
                <Heart size={18} className="text-[#E76F51] fill-[#E76F51]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-black text-[#3E2723] uppercase tracking-wider mb-0.5">Daily Health Tip</p>
                <p className="text-sm text-[#7D5A4F] font-medium">Apply SPF 30+ sunscreen daily to reduce skin cancer risk by up to 50%. Small steps today lead to a healthier tomorrow.</p>
              </div>
              <Link href="/health-guides" className="flex items-center gap-1.5 text-xs font-black text-[#8D6E63] hover:text-[#5C4033] transition-colors flex-shrink-0 whitespace-nowrap">
                Learn More <ChevronRight size={14} />
              </Link>
            </div>
          </motion.div>

          {/* Recent AI Scans */}
          {history.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="relative rounded-[1.75rem] overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/75 backdrop-blur-xl rounded-[1.75rem] border border-white/90 shadow-[0_6px_30px_rgba(92,64,51,0.05)]" />
              <div className="relative z-10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-black text-[#3E2723] uppercase tracking-widest flex items-center gap-2">
                    <Activity size={14} className="text-[#E76F51]" /> Recent AI Scans
                  </h3>
                  <Link href="/history" className="text-[10px] font-black text-[#8D6E63] hover:text-[#5C4033] transition-colors uppercase tracking-wider flex items-center gap-1">
                    View All <ChevronRight size={12} />
                  </Link>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {history.slice(0, 4).map((scan) => (
                    <Link key={scan.id} href="/history">
                      <div className="flex items-center gap-2 bg-[#F5EDE4] border border-[#E8D5C4] rounded-full px-4 py-2 text-xs font-bold text-[#5C4033] hover:bg-[#E8D5C4] transition-colors cursor-pointer">
                        <span className={`w-2 h-2 rounded-full ${scan.riskLevel === "High" ? "bg-red-400" : scan.riskLevel === "Medium" ? "bg-orange-400" : "bg-emerald-400"}`} />
                        {scan.type} — {scan.riskLevel}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </main>
      </div>

      {/* Overlay to close dropdown */}
      {showUserMenu && (
        <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
      )}
    </div>
  );
}
