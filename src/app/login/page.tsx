"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { PremiumButton } from "@/components/PremiumButton";
import { Mail, Lock, ArrowRight, ShieldCheck, Globe, User } from "lucide-react";
import Link from "next/link";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

function LoginContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login: setLogin } = useAuthStore();
  const role = searchParams.get("role") || "patient";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation of authentication
    setLogin({
      name: role === "doctor" ? name || "Dr. Saeed" : name || "Uzair Ahmad",
      role: role as "patient" | "doctor",
      email: email
    });
    
    if (role === "doctor") {
      router.push("/doctor");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center relative overflow-hidden bg-slate-950">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500 mb-4"
          >
            <ShieldCheck size={20} />
          </motion.div>
          <h1 className="text-2xl font-black text-white tracking-tight font-plus-jakarta mb-1.5">
            {role === "doctor" ? "Doctor Login" : "Patient Login"}
          </h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">
            Access your clinical portal
          </p>
        </div>

        <GlassCard className="p-7 border-white/5 bg-slate-950/40 backdrop-blur-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {role === "doctor" && (
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-1">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">
                    <User size={14} />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-slate-900/50 border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-1">
                Clinical Email
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">
                  <Mail size={14} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your personal mail"
                  className="w-full bg-slate-900/50 border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                  Secure Password
                </label>
                <Link href="#" className="text-[8px] font-bold text-blue-500 hover:text-blue-400 uppercase tracking-tighter">
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={14} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-900/50 border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                  required
                />
              </div>
            </div>

            <PremiumButton glow type="submit" className="w-full py-3 mt-1">
              Sign In to Portal <ArrowRight size={14} className="ml-1" />
            </PremiumButton>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <span className="relative px-4 bg-[#0A0F1E] text-[9px] font-bold text-slate-600 uppercase tracking-widest">
                Trusted Connect
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/5 bg-slate-900/30 hover:bg-slate-800/40 transition-colors text-[10px] font-bold text-white uppercase tracking-wider">
                <Globe size={14} /> Google
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/5 bg-slate-900/30 hover:bg-slate-800/40 transition-colors text-[10px] font-bold text-white uppercase tracking-wider">
                <Globe size={14} /> Google
              </button>
            </div>
          </div>
        </GlassCard>

        <p className="text-center mt-8 text-[11px] text-slate-500 font-medium">
          New to the platform?{" "}
          <Link href={`/signup?role=${role}`} className="text-blue-500 hover:text-blue-400 font-bold">
            Create clinical account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-black tracking-widest">LOADING...</div>}>
      <LoginContent />
    </Suspense>
  );
}
