"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Heart
} from "lucide-react";

function RoleSelectionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "login";

  const handleSelect = (role: "doctor" | "patient") => {
    router.push(`/${mode}?role=${role}`);
  };

  return (
    <div className="min-h-screen font-plus-jakarta flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden bg-[#EFEBE4]">
      {/* Background Image blended */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
          alt="Background" 
          fill 
          className="object-cover opacity-30 mix-blend-multiply blur-xl"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F7EFE9]/80 to-[#EADECF]/90" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-center mb-8 relative z-10"
      >
        <h1 className="text-3xl md:text-4xl font-black text-[#3E2723] tracking-tight mb-2">
          Welcome to ONCURA
        </h1>
        <p className="text-sm text-[#6D4C41] font-medium">
          Choose your account type to proceed.
        </p>
      </motion.div>

      {/* Mode toggle pill */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="flex items-center gap-1 bg-[#FDF8F3] border border-[#D7CCC8] rounded-full p-1 mb-12 shadow-sm relative z-10"
      >
        {(["login", "signup"] as const).map((m) => (
          <button
            key={m}
            onClick={() => router.push(`/auth/role-selection?mode=${m}`)}
            className={`px-8 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
              mode === m
                ? "bg-[#5C4033] text-white shadow-md"
                : "text-[#8D6E63] hover:text-[#5C4033]"
            }`}
          >
            {m === "login" ? "Sign In" : "Sign Up"}
          </button>
        ))}
      </motion.div>

      {/* Role Cards Container */}
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl relative z-10">
        
        {/* ── DOCTOR CARD ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 280, damping: 22 }}
          whileHover={{ y: -5 }}
          onClick={() => handleSelect("doctor")}
          className="relative group cursor-pointer rounded-[2rem] overflow-hidden bg-[#FDF8F3] shadow-[0_15px_40px_rgba(92,64,51,0.1)] w-full min-h-[380px] md:h-[420px] flex flex-col justify-end p-8 border border-white/50 hover:shadow-[0_20px_50px_rgba(92,64,51,0.2)] transition-all duration-300"
        >
          {/* Doctor Image Blob (Left) */}
          <div 
            className="absolute top-0 left-0 bottom-0 w-3/5 lg:w-1/2 pointer-events-none transition-transform duration-700 group-hover:scale-105"
            style={{ 
              clipPath: "ellipse(85% 65% at 15% 45%)",
              background: "#D7CCC8" 
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600&h=800"
              alt="Doctor"
              fill
              className="object-cover object-top opacity-95 transition-all duration-500"
            />
            {/* Soft warm tint overlay */}
            <div className="absolute inset-0 bg-[#5C4033]/10 mix-blend-overlay" />
          </div>

          {/* Card Content (Right Side Aligned) */}
          <div className="relative z-10 w-1/2 ml-auto flex flex-col items-center pt-4 pb-12">
            <div className="w-16 h-16 rounded-full border-2 border-[#8D6E63] flex items-center justify-center text-[#5C4033] mb-4 bg-[#FDF8F3]/50 backdrop-blur-sm">
               <Stethoscope size={28} />
            </div>
            <h2 className="text-2xl lg:text-3xl font-black text-[#3E2723] leading-tight">Doctor</h2>
            <h3 className="text-xl lg:text-2xl font-normal text-[#6D4C41] leading-tight">Dashboard</h3>
            <div className="w-8 h-1 bg-[#D7CCC8] mt-4 rounded-full" />
          </div>

          {/* Button */}
          <div className="relative z-10 w-full mt-auto">
            <button className="w-full max-w-[280px] mx-auto py-3.5 bg-gradient-to-r from-[#5C4033] to-[#795548] text-white rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-[#5C4033]/30 group-hover:shadow-[#5C4033]/50 transition-all">
              Continue as Doctor <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>


        {/* ── PATIENT CARD ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 280, damping: 22 }}
          whileHover={{ y: -5 }}
          onClick={() => handleSelect("patient")}
          className="relative group cursor-pointer rounded-[2rem] overflow-hidden bg-[#FDF8F3] shadow-[0_15px_40px_rgba(92,64,51,0.1)] w-full min-h-[380px] md:h-[420px] flex flex-col justify-end p-8 border border-white/50 hover:shadow-[0_20px_50px_rgba(92,64,51,0.2)] transition-all duration-300"
        >
          {/* Patient Image Blob (Right) */}
          <div 
            className="absolute top-0 right-0 bottom-0 w-3/5 lg:w-1/2 pointer-events-none transition-transform duration-700 group-hover:scale-105"
            style={{ 
              clipPath: "ellipse(85% 65% at 85% 45%)",
              background: "#D7CCC8" 
            }}
          >
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600&h=800"
              alt="Patient"
              fill
              className="object-cover object-top opacity-95 transition-all duration-500"
            />
            {/* Soft warm tint overlay */}
            <div className="absolute inset-0 bg-[#5C4033]/10 mix-blend-overlay" />
          </div>

          {/* Card Content (Left Side Aligned) */}
          <div className="relative z-10 w-1/2 mr-auto flex flex-col items-center pt-4 pb-12">
            <div className="w-16 h-16 rounded-full border-2 border-[#8D6E63] flex items-center justify-center text-[#5C4033] mb-4 bg-[#FDF8F3]/50 backdrop-blur-sm relative">
               <Heart size={28} />
            </div>
            <h2 className="text-2xl lg:text-3xl font-black text-[#3E2723] leading-tight">Patient</h2>
            <h3 className="text-xl lg:text-2xl font-normal text-[#6D4C41] leading-tight">Dashboard</h3>
            <div className="w-8 h-1 bg-[#D7CCC8] mt-4 rounded-full" />
          </div>

          {/* Button */}
          <div className="relative z-10 w-full mt-auto">
            <button className="w-full max-w-[280px] mx-auto py-3.5 bg-gradient-to-r from-[#5C4033] to-[#795548] text-white rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-[#5C4033]/30 group-hover:shadow-[#5C4033]/50 transition-all">
              Continue as Patient <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>

      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-[10px] font-bold text-[#8D6E63] uppercase tracking-widest flex items-center gap-2 relative z-10"
      >
        <ShieldCheck size={13} className="text-[#5C4033]" />
        Your data is encrypted and secure
      </motion.p>
    </div>
  );
}

export default function RoleSelectionPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#EFEBE4] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#5C4033] border-t-transparent animate-spin" />
        </div>
      }
    >
      <RoleSelectionContent />
    </Suspense>
  );
}
