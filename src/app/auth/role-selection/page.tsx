"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Stethoscope,
  User,
  ArrowRight,
  ShieldCheck,
  HeartPulse,
  ClipboardList,
  BarChart2,
  Bell,
} from "lucide-react";

const DOCTOR_FEATURES = [
  { icon: ClipboardList, label: "Manage patient records" },
  { icon: BarChart2, label: "AI scan insights & reports" },
  { icon: Bell, label: "Real-time clinical alerts" },
];

const PATIENT_FEATURES = [
  { icon: HeartPulse, label: "View your scan reports" },
  { icon: BarChart2, label: "Track health progress" },
  { icon: ShieldCheck, label: "Stay informed & safe" },
];

function RoleSelectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "login"; // login | signup

  const handleSelect = (role: "doctor" | "patient") => {
    router.push(`/${mode}?role=${role}`);
  };

  return (
    <div className="min-h-screen bg-[#FFF5F0] font-plus-jakarta flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Decorative ambient glows */}
      <motion.div
        animate={{ y: [0, -30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-15%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[130px] bg-[#E76F51]/10 pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-15%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[130px] bg-[#5C4033]/8 pointer-events-none"
      />

      {/* Subtle mesh grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#3E2723 1px,transparent 1px),linear-gradient(90deg,#3E2723 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Header label */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="h-px w-12 bg-[#E76F51]/40" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E76F51]">
          Choose Your Dashboard
        </span>
        <div className="h-px w-12 bg-[#E76F51]/40" />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-center mb-4"
      >
        <h1 className="text-4xl md:text-5xl font-black text-[#111827] tracking-tight mb-3">
          Welcome to{" "}
          <span className="text-[#E76F51]">Oncura</span>
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          Access your personalized dashboard based on your role.
        </p>
      </motion.div>

      {/* Mode toggle pill */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="flex items-center gap-1 bg-white border border-[#FFD8C2] rounded-full p-1 mb-12 shadow-sm"
      >
        {(["login", "signup"] as const).map((m) => (
          <button
            key={m}
            onClick={() => router.push(`/auth/role-selection?mode=${m}`)}
            className={`px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
              mode === m
                ? "bg-[#3E2723] text-white shadow-md"
                : "text-[#5C4033]/70 hover:text-[#3E2723]"
            }`}
          >
            {m === "login" ? "Sign In" : "Sign Up"}
          </button>
        ))}
      </motion.div>

      {/* Role Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-3xl">
        {/* ── Doctor Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 280, damping: 22 }}
          whileHover={{ y: -8, scale: 1.02 }}
          onClick={() => handleSelect("doctor")}
          className="relative group cursor-pointer rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#3E2723] to-[#5C4033] shadow-[0_25px_60px_rgba(62,39,35,0.35)] min-h-[360px] flex flex-col"
        >
          {/* Blurred full-card background — doctor photo fills top half */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600&h=800"
              alt="Doctor"
              fill
              className="object-cover object-top opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-1000"
            />
            {/* Dark gradient overlay — fades photo into dark card at bottom */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#3E2723]/30 via-[#3E2723]/70 to-[#3E2723]" />
            <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(231,111,81,0.12),transparent_60%)]" />
          </div>

          {/* Doctor photo circular badge */}
          <div className="relative z-10 flex justify-center pt-10 mb-2">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#E76F51]/30 blur-xl scale-150 animate-pulse" />
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-[3px] border-white/30 shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
                <Image
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200&h=200"
                  alt="Doctor"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              {/* Online badge */}
              <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-[#3E2723] shadow-md" />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col flex-1 px-8 pb-8 pt-4 text-white">
            <h2 className="text-2xl font-black tracking-tight mb-2 text-center">
              Doctor Dashboard
            </h2>
            <p className="text-sm text-white/70 font-medium text-center mb-6 leading-relaxed">
              Access patient data, AI insights, manage<br />
              reports and provide better care.
            </p>

            {/* Features */}
            <div className="space-y-2.5 mb-8 flex-1">
              {DOCTOR_FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3 bg-white/8 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-2.5"
                  >
                    <Icon size={14} className="text-[#FFD8C2] shrink-0" />
                    <span className="text-[11px] font-bold text-white/90 uppercase tracking-wider">{f.label}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 bg-white/15 backdrop-blur-md border border-white/25 rounded-[1rem] text-[11px] font-black uppercase tracking-widest text-white flex items-center justify-center gap-2 hover:bg-white/25 transition-all shadow-md"
            >
              Continue as Doctor <ArrowRight size={15} />
            </motion.button>
          </div>
        </motion.div>

        {/* ── Patient Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, type: "spring", stiffness: 280, damping: 22 }}
          whileHover={{ y: -8, scale: 1.02 }}
          onClick={() => handleSelect("patient")}
          className="relative group cursor-pointer rounded-[2rem] overflow-hidden bg-white shadow-[0_25px_60px_rgba(92,64,51,0.14)] border border-[#FFD8C2]/80 min-h-[360px] flex flex-col"
        >
          {/* Patient photo fills top of card */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=600&h=800"
              alt="Patient"
              fill
              className="object-cover object-top opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000"
            />
            {/* Warm frosted overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-[#FFF5F0]/80 to-[#FFF5F0]" />
            <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/80" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(231,111,81,0.07),transparent_60%)]" />
          </div>

          {/* Patient photo circular badge */}
          <div className="relative z-10 flex justify-center pt-10 mb-2">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#E76F51]/15 blur-xl scale-150 animate-pulse" />
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-[3px] border-[#FFD8C2] shadow-[0_15px_40px_rgba(231,111,81,0.25)]">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
                  alt="Patient"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              {/* Verified badge */}
              <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#E76F51] border-2 border-white shadow-md flex items-center justify-center">
                <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 fill-white"><path d="M8.5 2L4 7.5 1.5 5" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col flex-1 px-8 pb-8 pt-4">
            <h2 className="text-2xl font-black tracking-tight mb-2 text-center text-[#3E2723]">
              Patient Dashboard
            </h2>
            <p className="text-sm text-slate-500 font-medium text-center mb-6 leading-relaxed">
              View your reports, track your health,<br />
              and get personalized insights.
            </p>

            {/* Features */}
            <div className="space-y-2.5 mb-8 flex-1">
              {PATIENT_FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.62 + i * 0.1 }}
                    className="flex items-center gap-3 bg-[#FFF5F0] border border-[#FFD8C2]/60 rounded-xl px-4 py-2.5"
                  >
                    <Icon size={14} className="text-[#E76F51] shrink-0" />
                    <span className="text-[11px] font-bold text-[#5C4033] uppercase tracking-wider">{f.label}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 bg-[#E76F51] text-white rounded-[1rem] text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(231,111,81,0.35)] hover:bg-[#D4603F] transition-all"
            >
              Continue as Patient <ArrowRight size={15} />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-10 text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"
      >
        <ShieldCheck size={13} className="text-[#E76F51]" />
        Your data is encrypted and HIPAA-ready
      </motion.p>
    </div>
  );
}

export default function RoleSelectionPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FFF5F0] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#E76F51] border-t-transparent animate-spin" />
        </div>
      }
    >
      <RoleSelectionContent />
    </Suspense>
  );
}
