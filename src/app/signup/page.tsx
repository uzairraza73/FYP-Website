"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { PremiumButton } from "@/components/PremiumButton";
import { 
  Mail, Lock, User, ArrowRight, Activity, 
  Globe, CheckCircle2, Award, Hash, 
  Calendar, Stethoscope, Camera,
  Upload
} from "lucide-react";
import Link from "next/link";
import { useState, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/utils/cn";

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login: setLogin } = useAuthStore();
  const role = searchParams.get("role") || "patient";
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Doctor specific fields
  const [age, setAge] = useState("");
  const [degree, setDegree] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [cnicFront, setCnicFront] = useState<File | null>(null);
  const [cnicBack, setCnicBack] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cnicFrontRef = useRef<HTMLInputElement>(null);
  const cnicBackRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation of account creation and login
    setLogin({
      name: name || (role === "doctor" ? "Dr. Saeed" : "Uzair Ahmad"),
      role: role as "patient" | "doctor",
      email: email
    });

    if (role === "patient") {
      router.push("/onboarding");
    } else {
      router.push("/doctor"); // Doctors go straight to portal
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center relative overflow-hidden bg-slate-950">
      {/* Background Ambient Glows */}
      <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={cn("w-full z-10", role === "doctor" ? "max-w-2xl" : "max-w-md")}
      >
        <div className="text-center mb-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500 mb-4"
          >
            {role === "doctor" ? <Stethoscope size={20} /> : <Activity size={20} />}
          </motion.div>
          <h1 className="text-2xl font-black text-white tracking-tight font-plus-jakarta mb-1.5">
            {role === "doctor" ? "Doctor Registration" : "Patient Registration"}
          </h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">
            Join the clinical AI revolution
          </p>
        </div>

        <GlassCard className="p-7 border-white/5 bg-slate-950/40 backdrop-blur-2xl relative overflow-hidden">
           {/* Decorative Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            <div className={cn("grid grid-cols-1 gap-6", role === "doctor" && "md:grid-cols-2")}>
              {/* Basic Info */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-1">
                    Full Legal Name
                  </label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">
                      <User size={14} />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={role === "doctor" ? "Dr. Full Name" : "Enter your name"}
                      className="w-full bg-slate-900/50 border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                      required
                    />
                  </div>
                </div>

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
                      placeholder={role === "doctor" ? "clinical@hospital.com" : "Enter your mail"}
                      className="w-full bg-slate-900/50 border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-1">
                    Access Password
                  </label>
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

                {role === "doctor" && (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-1">
                        Professional Age
                      </label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">
                          <Calendar size={14} />
                        </div>
                        <input
                          type="number"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          placeholder="Years"
                          className="w-full bg-slate-900/50 border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Doctor Specific Professional Info */}
              {role === "doctor" ? (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-1">
                      Medical Degree
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">
                        <Award size={14} />
                      </div>
                      <input
                        type="text"
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                        placeholder="e.g. MBBS, MD"
                        className="w-full bg-slate-900/50 border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-1">
                      Specialization <span className="opacity-40">(Optional)</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">
                        <Stethoscope size={14} />
                      </div>
                      <input
                        type="text"
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        placeholder="e.g. Dermatologist"
                        className="w-full bg-slate-900/50 border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-1">
                      License Number
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">
                        <Hash size={14} />
                      </div>
                      <input
                        type="text"
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                        placeholder="PMDC / State License"
                        className="w-full bg-slate-900/50 border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Profile Pic Upload */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-1">
                      Profile Picture
                    </label>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={cn(
                        "w-full bg-slate-900/30 border border-dashed border-white/10 rounded-xl py-2 px-4 flex items-center gap-3 cursor-pointer hover:bg-slate-800/50 hover:border-blue-500/30 transition-all group",
                        profilePic && "border-emerald-500/30 bg-emerald-500/5"
                      )}
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors">
                        {profilePic ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Camera size={16} />}
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase truncate">
                        {profilePic ? profilePic.name : "Upload Photo"}
                      </span>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => setProfilePic(e.target.files?.[0] || null)}
                      />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Documents Upload (Doctor Only) */}
            {role === "doctor" && (
              <div className="space-y-3 pt-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-500 ml-1">
                  Identity Verification (CNIC)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    onClick={() => cnicFrontRef.current?.click()}
                    className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-white/10 bg-slate-900/30 hover:bg-slate-800/50 transition-all cursor-pointer group",
                      cnicFront && "border-emerald-500/30 bg-emerald-500/5"
                    )}
                  >
                    <Upload size={16} className={cn("mb-2 transition-colors", cnicFront ? "text-emerald-500" : "text-slate-600 group-hover:text-blue-500")} />
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 text-center truncate w-full">
                      {cnicFront ? cnicFront.name : "Front Side"}
                    </span>
                    <input type="file" ref={cnicFrontRef} className="hidden" accept="image/*" onChange={(e) => setCnicFront(e.target.files?.[0] || null)} />
                  </div>
                  <div 
                    onClick={() => cnicBackRef.current?.click()}
                    className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-white/10 bg-slate-900/30 hover:bg-slate-800/50 transition-all cursor-pointer group",
                      cnicBack && "border-emerald-500/30 bg-emerald-500/5"
                    )}
                  >
                    <Upload size={16} className={cn("mb-2 transition-colors", cnicBack ? "text-emerald-500" : "text-slate-600 group-hover:text-blue-500")} />
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-500 text-center truncate w-full">
                      {cnicBack ? cnicBack.name : "Back Side"}
                    </span>
                    <input type="file" ref={cnicBackRef} className="hidden" accept="image/*" onChange={(e) => setCnicBack(e.target.files?.[0] || null)} />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3 py-1">
              <div className="mt-1">
                <CheckCircle2 size={12} className="text-blue-500" />
              </div>
              <p className="text-[8px] text-slate-500 leading-relaxed font-medium uppercase tracking-tight">
                By initializing your account, you agree to the <span className="text-slate-300">Clinical Protocol</span> and <span className="text-slate-300">Data Processing Terms</span>.
              </p>
            </div>

            <PremiumButton glow type="submit" className="w-full py-3">
              {role === "doctor" ? "Verify & Create ID" : "Create Clinical ID"} <ArrowRight size={14} className="ml-1" />
            </PremiumButton>
          </form>

          <div className="mt-8 relative z-10">
            <div className="relative flex items-center justify-center mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <span className="relative px-4 bg-slate-950 text-[8px] font-bold text-slate-600 uppercase tracking-widest">
                Trusted Provider Connect
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/5 bg-slate-900/30 hover:bg-slate-800/40 transition-colors text-[10px] font-bold text-white uppercase tracking-wider">
                <Globe size={14} /> Google
              </button>
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/5 bg-slate-900/30 hover:bg-slate-800/40 transition-colors text-[10px] font-bold text-white uppercase tracking-wider">
                <Globe size={14} /> Apple ID
              </button>
            </div>
          </div>
        </GlassCard>

        <p className="text-center mt-8 text-[11px] text-slate-500 font-medium">
          Already have an ID?{" "}
          <Link href={`/login?role=${role}`} className="text-blue-500 hover:text-blue-400 font-bold">
            Sign in to Portal
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-black tracking-widest">LOADING...</div>}>
      <SignupContent />
    </Suspense>
  );
}
