"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard, Users, Calendar, MessageSquare,
  Settings, ArrowRight, Activity, LogOut
} from "lucide-react";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/doctor" },
  { icon: Users, label: "Patients", href: "/doctor/patients" },
  { icon: Calendar, label: "Schedule", href: "/doctor/schedule" },
  { icon: MessageSquare, label: "Messages", href: "/doctor/messages" },
  { icon: Settings, label: "Settings", href: "/doctor/settings" },
];

const DOCTOR_AVATAR = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200";

export default function DoctorPortalPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("Dashboard");

  const doctorName = user?.name || "Dr. Ahmed";

  const handleLogout = () => {
    logout();
    router.push("/auth/role-selection");
  };

  const handleNav = (label: string, href: string) => {
    setActiveNav(label);
    router.push(href);
  };

  return (
    <div className="min-h-screen font-plus-jakarta bg-[#F0E8DF] flex overflow-hidden relative">

      {/* ── Blurred background blobs ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#D4A98A]/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] bg-[#C69C7B]/20 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-[#E8D5C4]/40 rounded-full blur-[80px]" />
      </div>

      {/* ── LEFT SIDEBAR ── */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative z-10 w-[220px] flex-shrink-0 flex flex-col bg-white/60 backdrop-blur-xl border-r border-white/50 shadow-[4px_0_30px_rgba(92,64,51,0.06)] min-h-screen"
      >
        {/* Logo */}
        <div className="px-8 pt-8 pb-6">
          <div className="flex items-start gap-1">
            <div>
              <span className="text-3xl font-black text-[#3E2723] leading-none">ON</span>
              <div className="flex gap-0.5 mt-0.5 ml-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#E76F51]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#8D6E63]" />
              </div>
            </div>
          </div>
          <p className="text-[9px] font-black tracking-[0.25em] text-[#8D6E63] uppercase mt-1">ONCURA</p>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-4 space-y-1">
          {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
            const isActive = activeNav === label;
            return (
              <button
                key={label}
                onClick={() => handleNav(label, href)}
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

        {/* Bottom branding */}
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
            <LogOut size={13} />
            Sign Out
          </button>
        </div>
      </motion.aside>

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-10 flex-1 flex flex-col min-h-screen overflow-y-auto">

        {/* ── Page Body ── */}
        <main className="flex-1 p-8 space-y-8">

          {/* ── HERO BANNER ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative rounded-[2.5rem] overflow-hidden bg-[#F7F2EB] border border-[#EADBCE] shadow-[0_8px_30px_rgba(92,64,51,0.06)] p-8 md:p-10 min-h-[280px] flex flex-col md:flex-row items-center justify-between gap-6"
          >
            {/* Left text content */}
            <div className="flex-1 max-w-md z-10">
              <h1 className="text-4xl md:text-5xl text-[#3E2723] font-normal leading-[1.15]">
                Welcome to<br />
                <span className="font-black text-[#3E2723]">Oncura</span>
              </h1>
              <p className="text-sm md:text-base text-[#6D5446] font-medium leading-relaxed mt-6 max-w-[340px]">
                Manage your patients, schedule meetings, and make a greater impact.
              </p>
            </div>

            {/* Middle: Doctors with soft organic blob background */}
            <div className="relative flex-1 flex justify-center items-center h-[240px] w-full max-w-[380px]">
              {/* Organic blob background behind doctors */}
              <div className="absolute w-[300px] h-[210px] bg-[#E8DDD0]/70 rounded-[40%_60%_70%_30%/50%_60%_30%_70%]" />
              <div className="relative z-10 h-full w-full flex items-end justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800"
                  alt="Doctors"
                  width={360}
                  height={240}
                  className="object-contain object-bottom h-full"
                  priority
                />
              </div>
            </div>

            {/* Right: Script text accent */}
            <div className="relative z-10 flex flex-col items-start md:items-end text-left md:text-right pr-2">
              <div className="relative">
                <p className="font-serif italic text-[#7D5A4F] text-xl md:text-2xl leading-tight">
                  Better<br />
                  Healthcare<br />
                  Together
                </p>
                {/* Curved brush underline */}
                <svg className="w-16 h-3 text-[#7D5A4F]/60 mt-1 ml-auto" viewBox="0 0 100 20" fill="none">
                  <path d="M5 15 Q 50 5 95 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* ── FEATURE CARDS ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Patient Directory Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative rounded-[2rem] bg-white/60 backdrop-blur-sm border border-white/70 shadow-[0_8px_40px_rgba(92,64,51,0.07)] p-8 overflow-hidden group hover:shadow-[0_12px_50px_rgba(92,64,51,0.12)] transition-all duration-300"
            >
              {/* Decorative background icon */}
              <div className="absolute right-6 bottom-6 opacity-[0.07] pointer-events-none">
                <Users size={100} className="text-[#5C4033]" />
              </div>
              {/* Warm glow blob */}
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#EADECF]/40 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#F0E8DF] border border-[#E8D5C4] flex items-center justify-center text-[#8D6E63] mb-6">
                  <Users size={26} />
                </div>
                <h3 className="text-xl font-black text-[#3E2723] mb-2">Patient Directory</h3>
                <p className="text-sm text-[#6D4C41] font-medium leading-relaxed mb-8">
                  View and manage your patients'<br />information and medical history.
                </p>
                <button
                  onClick={() => handleNav("Patients", "/doctor/patients")}
                  className="flex items-center gap-2 bg-white hover:bg-[#FDF8F3] border border-[#E8D5C4] text-[#3E2723] text-xs font-bold rounded-full px-5 py-2.5 shadow-sm transition-all group-hover:border-[#8D6E63] group-hover:shadow-md"
                >
                  Go to Patient Directory <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Meeting Schedule Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative rounded-[2rem] bg-white/60 backdrop-blur-sm border border-white/70 shadow-[0_8px_40px_rgba(92,64,51,0.07)] p-8 overflow-hidden group hover:shadow-[0_12px_50px_rgba(92,64,51,0.12)] transition-all duration-300"
            >
              {/* Decorative background icon */}
              <div className="absolute right-6 bottom-6 opacity-[0.07] pointer-events-none">
                <Calendar size={100} className="text-[#5C4033]" />
              </div>
              {/* Warm glow blob */}
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#EADECF]/40 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-[#F0E8DF] border border-[#E8D5C4] flex items-center justify-center text-[#8D6E63] mb-6">
                  <Calendar size={26} />
                </div>
                <h3 className="text-xl font-black text-[#3E2723] mb-2">Meeting Schedule</h3>
                <p className="text-sm text-[#6D4C41] font-medium leading-relaxed mb-8">
                  Check and manage your<br />upcoming meetings and appointments.
                </p>
                <button
                  onClick={() => handleNav("Schedule", "/doctor/schedule")}
                  className="flex items-center gap-2 bg-white hover:bg-[#FDF8F3] border border-[#E8D5C4] text-[#3E2723] text-xs font-bold rounded-full px-5 py-2.5 shadow-sm transition-all group-hover:border-[#8D6E63] group-hover:shadow-md"
                >
                  Go to Meeting Schedule <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

          </div>

          {/* ── STATS ROW ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { label: "Total Patients", value: "128", icon: Users, delta: "+4 this week" },
              { label: "Today's Appointments", value: "8", icon: Calendar, delta: "2 remaining" },
              { label: "AI Scans Reviewed", value: "342", icon: Activity, delta: "+12 today" },
              { label: "Messages", value: "5", icon: MessageSquare, delta: "3 unread" },
            ].map(({ label, value, icon: Icon, delta }) => (
              <div key={label} className="bg-white/60 backdrop-blur-sm border border-white/70 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#8D6E63]">{label}</span>
                  <div className="w-7 h-7 rounded-xl bg-[#F0E8DF] flex items-center justify-center text-[#8D6E63]">
                    <Icon size={14} />
                  </div>
                </div>
                <p className="text-2xl font-black text-[#3E2723] mb-1">{value}</p>
                <p className="text-[10px] text-[#A1887F] font-medium">{delta}</p>
              </div>
            ))}
          </motion.div>

        </main>
      </div>
    </div>
  );
}


