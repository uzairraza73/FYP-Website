"use client";

import { motion } from "framer-motion";
import { availableDoctors } from "@/data/consultData";
import { GlassCard } from "@/components/GlassCard";
import { 
  Stethoscope, Star, Phone, 
  UserCircle, Briefcase, Calendar
} from "lucide-react";
import Image from "next/image";
import { BackButton } from "@/components/BackButton";

export default function ConsultPage() {
  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-20 px-6">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-10">
          <BackButton />
        </div>

        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6"
          >
            <Stethoscope size={14} /> Clinical Directory
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tighter font-plus-jakarta mb-4"
          >
            Specialist <span className="text-blue-500 text-glow">Directory.</span>
          </motion.h1>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto uppercase tracking-widest font-bold">
            Verified medical professionals specialized in clinical dermatology and oncology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {availableDoctors.map((doctor, idx) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard className="h-full p-6 hover:border-blue-500/30 transition-all duration-500 group bg-slate-950/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                   <Stethoscope size={80} className="text-blue-500" />
                </div>
                
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-white/10 group-hover:border-blue-500/40 transition-colors shadow-2xl">
                    <Image 
                      src={doctor.image} 
                      alt={doctor.name} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white font-plus-jakarta tracking-tight">
                      {doctor.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-1 text-yellow-500">
                      <Star size={12} className="fill-current" />
                      <span className="text-[10px] font-black">{doctor.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                    <Briefcase size={16} className="text-blue-500 shrink-0" />
                    <div>
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Specialization</p>
                      <p className="text-[11px] font-bold text-white uppercase">{doctor.specialty}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                      <Calendar size={16} className="text-blue-500 shrink-0" />
                      <div>
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Age</p>
                        <p className="text-[11px] font-bold text-white uppercase">{doctor.age} Years</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                      <UserCircle size={16} className="text-blue-500 shrink-0" />
                      <div>
                        <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Status</p>
                        <p className="text-[11px] font-bold text-emerald-500 uppercase">Verified</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-600/10 border border-blue-500/20 group-hover:bg-blue-600/20 transition-colors">
                    <Phone size={16} className="text-blue-500 shrink-0" />
                    <div>
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Contact Number</p>
                      <p className="text-[11px] font-black text-white tracking-widest">{doctor.phone}</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
