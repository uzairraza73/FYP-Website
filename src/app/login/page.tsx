"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { PremiumButton } from "@/components/PremiumButton";
import { Mail, Lock, ArrowRight, ShieldCheck, Globe, User, Heart, Brain, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";

function DoctorLogin({ 
  handleSubmit, email, setEmail, password, setPassword, name, setName 
}: any) {
  return (
    <div className="min-h-screen flex items-center justify-center font-plus-jakarta bg-[#FAF6F3] p-4 sm:p-8">
      <div className="w-full max-w-5xl h-[90vh] min-h-[600px] max-h-[800px] flex bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(92,64,51,0.2)] overflow-hidden">
        {/* ── LEFT SIDE (IMAGE & BRANDING) ── */}
        <div className="hidden lg:flex lg:w-[45%] relative bg-[#4A3225]">
          <div className="absolute inset-0">
            <Image 
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1200" 
              alt="Doctor" 
              fill 
              className="object-cover opacity-80 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723] via-[#3E2723]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#3E2723]/80 to-transparent" />
          </div>
          
          <div className="relative z-10 flex flex-col justify-between p-10 w-full h-full text-white">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-1 mt-4"
            >
              <h2 className="text-3xl font-serif italic text-[#FFD8C2]">Your Health</h2>
              <h3 className="text-2xl font-medium tracking-wide">Our Priority</h3>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8 mb-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck size={28} className="text-[#E76F51]" />
                  <span className="text-xl font-black tracking-widest uppercase">ONCURA</span>
                </div>
                <p className="text-sm font-medium text-white/90 max-w-sm leading-relaxed">
                  Empowering Healthcare, One Click at a Time. <br/>
                  Your Health, Your Record, Your Control.
                </p>
              </div>

              <div className="flex items-center gap-6 border-t border-white/20 pt-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
                    <ShieldCheck size={14} className="text-[#FFD8C2]" />
                  </div>
                  <div className="text-[10px] font-bold leading-tight">Secure<br/>& Trusted</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
                    <Brain size={14} className="text-[#FFD8C2]" />
                  </div>
                  <div className="text-[10px] font-bold leading-tight">AI Powered<br/>Insights</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
                    <Heart size={14} className="text-[#FFD8C2]" />
                  </div>
                  <div className="text-[10px] font-bold leading-tight">Better<br/>Outcomes</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── RIGHT SIDE (FORM) ── */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center items-center p-8 lg:p-12 overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm space-y-6"
          >
            <div className="text-center lg:text-left space-y-1">
              <div className="inline-flex items-center justify-center lg:hidden gap-2 mb-2">
                <ShieldCheck size={24} className="text-[#6D4C41]" />
                <span className="text-lg font-black tracking-widest text-[#4E342E] uppercase">ONCURA</span>
              </div>
              <h1 className="text-3xl font-black text-[#3E2723] tracking-tight">Welcome Back</h1>
              <p className="text-[#6D4C41] font-medium text-xs">Login to your account and continue your health journey.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#5C4033]">Full Name</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8D6E63] group-focus-within:text-[#5C4033] transition-colors">
                    <User size={14} />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-[#FAF6F3] border border-[#D7CCC8] rounded-xl py-2.5 pl-10 pr-4 text-xs text-[#3E2723] placeholder:text-[#A1887F] focus:outline-none focus:border-[#8D6E63] focus:ring-1 focus:ring-[#8D6E63]/20 transition-all shadow-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#5C4033]">Email</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8D6E63] group-focus-within:text-[#5C4033] transition-colors">
                    <Mail size={14} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-[#FAF6F3] border border-[#D7CCC8] rounded-xl py-2.5 pl-10 pr-4 text-xs text-[#3E2723] placeholder:text-[#A1887F] focus:outline-none focus:border-[#8D6E63] focus:ring-1 focus:ring-[#8D6E63]/20 transition-all shadow-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#5C4033]">Password</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8D6E63] group-focus-within:text-[#5C4033] transition-colors">
                    <Lock size={14} />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full bg-[#FAF6F3] border border-[#D7CCC8] rounded-xl py-2.5 pl-10 pr-10 text-xs text-[#3E2723] placeholder:text-[#A1887F] focus:outline-none focus:border-[#8D6E63] focus:ring-1 focus:ring-[#8D6E63]/20 transition-all shadow-sm"
                    required
                  />
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8D6E63] hover:text-[#5C4033]">
                    <EyeOff size={14} />
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <Link href="#" className="text-[10px] font-bold text-[#6D4C41] hover:text-[#3E2723] transition-colors">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" className="w-full bg-[#5C4033] hover:bg-[#4A3225] text-white rounded-xl py-3 text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 group mt-2">
                Log In <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="relative flex items-center justify-center py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#D7CCC8]"></div>
              </div>
              <span className="relative px-3 bg-white text-[9px] font-bold text-[#8D6E63] uppercase tracking-widest">
                OR
              </span>
            </div>

            <button type="button" className="w-full flex items-center justify-center gap-2 bg-[#FAF6F3] border border-[#D7CCC8] hover:bg-[#F5F5F5] text-[#3E2723] rounded-xl py-3 text-xs font-bold shadow-sm transition-all">
              <Globe size={14} className="text-blue-500" /> Log In with Google
            </button>

            <p className="text-center text-[11px] font-medium text-[#6D4C41] pt-2">
              Don't have an account?{" "}
              <Link href="/signup?role=doctor" className="font-bold text-[#5C4033] hover:text-[#3E2723] transition-colors">
                Sign Up
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function PatientLogin({ 
  handleSubmit, email, setEmail, password, setPassword, name, setName 
}: any) {
  return (
    <div className="min-h-screen flex items-center justify-center font-plus-jakarta bg-[#FAF6F3] p-4 sm:p-8">
      <div className="w-full max-w-5xl h-[90vh] min-h-[600px] max-h-[800px] flex bg-[#FDF8F3] rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(92,64,51,0.2)] overflow-hidden">
        
        {/* ── LEFT SIDE (IMAGE & BRANDING) ── */}
        <div className="hidden lg:flex lg:w-[45%] relative bg-[#4A3225]">
          <div className="absolute inset-0">
            <Image 
              src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=1200" 
              alt="Patient" 
              fill 
              className="object-cover opacity-90 transition-all duration-500"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723]/90 via-transparent to-[#3E2723]/60" />
            <div className="absolute inset-0 bg-[#5C4033]/20 mix-blend-overlay" />
          </div>
          
          <div className="relative z-10 flex flex-col justify-between p-10 w-full h-full text-white">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4 mt-2"
            >
              <div className="w-12 h-12 flex items-center justify-center text-white mb-2">
                <Heart size={40} className="stroke-[1.5]" />
              </div>
              <div className="space-y-1">
                <h2 className="text-4xl font-serif italic text-[#FFD8C2]">Your Health</h2>
                <h3 className="text-3xl font-medium tracking-wide">Matters</h3>
              </div>
              <p className="text-sm font-medium text-white/90 max-w-[200px] leading-relaxed pt-2">
                Track. Stay Informed.<br/>Feel Better.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-4"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
                  <ShieldCheck size={20} className="text-[#FFD8C2]" />
                </div>
                <span className="text-lg font-black tracking-widest uppercase">ONCURA</span>
              </div>
              <p className="text-[11px] font-medium text-white/70">
                Better Insights. Healthier Tomorrow.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── RIGHT SIDE (FORM) ── */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center items-center p-8 lg:p-12 overflow-y-auto relative">
          
          {/* Subtle leaf/floral decorations could be added here as background SVG, keeping it clean for now */}

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm space-y-6 relative z-10"
          >
            <div className="text-center lg:text-left space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#EADECF] flex items-center justify-center text-[#5C4033] mx-auto lg:mx-0">
                <User size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-black text-[#3E2723] tracking-tight">
                  Patient <span className="text-[#8D6E63]">Login</span>
                </h1>
                <p className="text-[#6D4C41] font-medium text-[11px] mt-2 leading-relaxed">
                  Access your health records, track your<br className="hidden lg:block"/> progress and get personalized insights.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8D6E63] group-focus-within:text-[#5C4033] transition-colors">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-transparent border border-[#D7CCC8] rounded-full py-3.5 pl-12 pr-4 text-xs text-[#3E2723] placeholder:text-[#A1887F] focus:outline-none focus:border-[#8D6E63] focus:ring-1 focus:ring-[#8D6E63]/20 transition-all shadow-sm"
                  required
                />
              </div>

              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8D6E63] group-focus-within:text-[#5C4033] transition-colors">
                  <Lock size={16} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-transparent border border-[#D7CCC8] rounded-full py-3.5 pl-12 pr-12 text-xs text-[#3E2723] placeholder:text-[#A1887F] focus:outline-none focus:border-[#8D6E63] focus:ring-1 focus:ring-[#8D6E63]/20 transition-all shadow-sm"
                  required
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8D6E63] hover:text-[#5C4033]">
                  <EyeOff size={16} />
                </button>
              </div>

              <div className="flex justify-end pt-1">
                <Link href="#" className="text-[10px] font-bold text-[#8D6E63] hover:text-[#3E2723] transition-colors">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" className="w-full bg-[#5C4033] hover:bg-[#4A3225] text-white rounded-full py-3.5 text-xs font-bold shadow-[0_8px_20px_rgba(92,64,51,0.25)] hover:shadow-[0_12px_25px_rgba(92,64,51,0.35)] transition-all flex items-center justify-center gap-2 group mt-4">
                Log In <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="relative flex items-center justify-center py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#D7CCC8]"></div>
              </div>
              <span className="relative px-3 bg-[#FDF8F3] text-[9px] font-bold text-[#8D6E63] uppercase tracking-widest">
                OR
              </span>
            </div>

            <button type="button" className="w-full flex items-center justify-center gap-2 bg-transparent border border-[#D7CCC8] hover:bg-white text-[#3E2723] rounded-full py-3 text-xs font-bold shadow-sm transition-all">
              <Globe size={14} className="text-blue-500" /> Log In with Google
            </button>

            <p className="text-center text-[11px] font-medium text-[#8D6E63] pt-4">
              Don't have an account?{" "}
              <Link href="/signup?role=patient" className="font-bold text-[#5C4033] hover:text-[#3E2723] transition-colors">
                Sign Up
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

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

  const props = { handleSubmit, email, setEmail, password, setPassword, name, setName };

  if (role === "doctor") {
    return <DoctorLogin {...props} />;
  }

  return <PatientLogin {...props} />;
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-black tracking-widest">LOADING...</div>}>
      <LoginContent />
    </Suspense>
  );
}
