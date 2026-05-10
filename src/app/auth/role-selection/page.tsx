"use client";

import { motion } from "framer-motion";
import { Stethoscope, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Image from "next/image";

function SelectionContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "login";

  const roles = [
    {
      id: "doctor",
      title: "Doctor Portal",
      icon: Stethoscope,
      bgImage: "/auth/doctor_bg_v3.png",
      accent: "from-blue-600/80 to-indigo-900/90",
      iconColor: "text-blue-400"
    },
    {
      id: "patient",
      title: "Patient Portal",
      icon: User,
      bgImage: "/auth/patient_bg_v3.png",
      accent: "from-emerald-600/80 to-teal-900/90",
      iconColor: "text-emerald-400"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center relative overflow-hidden bg-[#020617]">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-blue-600/5 blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="w-full max-w-5xl z-10"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-white tracking-tighter font-plus-jakarta mb-3">
            Initialize <span className="text-blue-500">Session.</span>
          </h1>
          <p className="text-[9px] text-slate-500 uppercase tracking-[0.4em] font-black">
            Select portal protocol to {mode}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {roles.map((role) => (
            <Link
              key={role.id}
              href={`/${mode}?role=${role.id}`}
              className="relative group h-[320px] rounded-[2rem] overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-700 shadow-2xl"
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                <Image
                  src={role.bgImage}
                  alt={role.title}
                  fill
                  className="object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${role.accent} opacity-60 group-hover:opacity-40 transition-opacity`} />
              </div>

              {/* Content Container */}
              <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
                <motion.div
                  whileHover={{ y: -5 }}
                  className={`w-20 h-20 rounded-[1.5rem] bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center ${role.iconColor} mb-6 shadow-2xl group-hover:shadow-blue-500/20 transition-all`}
                >
                  <role.icon size={32} strokeWidth={1.5} />
                </motion.div>

                <h2 className="text-2xl font-black text-white font-plus-jakarta tracking-tight mb-2 group-hover:scale-105 transition-transform">
                  {role.title}
                </h2>

                <div className="flex items-center gap-2 mt-3 overflow-hidden">
                  <div className="h-px w-0 group-hover:w-6 bg-white/40 transition-all duration-500" />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60 group-hover:text-white transition-colors">
                    Access Portal
                  </span>
                  <div className="h-px w-0 group-hover:w-6 bg-white/40 transition-all duration-500" />
                </div>

                <div className="absolute bottom-8 opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-500">
                  <ArrowRight size={18} className="text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default function RoleSelectionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-black tracking-widest">LOADING PROTOCOL...</div>}>
      <SelectionContent />
    </Suspense>
  );
}
