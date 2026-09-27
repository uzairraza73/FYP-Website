"use client";

import { motion } from "framer-motion";
import { availableDoctors } from "@/data/consultData";
import { GlassCard } from "@/components/GlassCard";
import { 
  Stethoscope, Star, Phone, 
  UserCircle, Briefcase, Calendar, CheckCircle2, ArrowRight
} from "lucide-react";
import Image from "next/image";
import { BackButton } from "@/components/BackButton";
import Link from "next/link";

export default function ConsultPage() {
  return (
    <div className="min-h-screen bg-[#FFF5F0] font-plus-jakarta pb-32">
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#3E2723] to-[#5C4033] text-white py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,#E76F51,transparent_60%)]" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.2) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-10">
             <BackButton variant="brown" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-4">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FFD8C2] text-[9px] font-black uppercase tracking-[0.2em] mb-6 backdrop-blur-sm"
              >
                <Stethoscope size={14} /> Clinical Directory
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter mb-4"
              >
                Specialist <span className="text-[#FFD8C2]">Directory.</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/80 text-base font-medium leading-relaxed max-w-xl"
              >
                Verified medical professionals specialized in clinical dermatology and oncology. Book a consultation with trusted experts for personalized care.
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl"
            >
              <div className="w-12 h-12 rounded-xl bg-[#E76F51] flex items-center justify-center text-white shrink-0">
                 <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-[#FFD8C2] uppercase tracking-widest mb-1">Status</p>
                <p className="text-sm font-black text-white">{availableDoctors.length} Specialists Available</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DOCTOR CARDS ── */}
      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {availableDoctors.map((doctor, idx) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1, type: "spring", stiffness: 300, damping: 25 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="h-full"
            >
              <Link href={`/consult/${doctor.id}`} className="block h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#E76F51] rounded-[2rem]">
                <GlassCard className="h-full p-6 hover:shadow-[0_25px_60px_rgba(231,111,81,0.2)] transition-all duration-500 group bg-white border-[#FFD8C2]/60 hover:border-[#E76F51]/40 relative overflow-hidden rounded-[2rem] flex flex-col">
                  <div className="absolute top-0 right-0 p-4 opacity-[0.03] transition-all duration-500 group-hover:opacity-[0.08] group-hover:scale-110 group-hover:-rotate-12">
                     <Stethoscope size={100} className="text-[#E76F51]" />
                  </div>
                  
                  <div className="flex items-center gap-5 mb-8 relative z-10">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#FFD8C2] group-hover:border-[#E76F51] transition-colors shadow-lg">
                      <Image 
                        src={doctor.image} 
                        alt={doctor.name} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-[#3E2723] tracking-tight group-hover:text-[#E76F51] transition-colors">
                        {doctor.name}
                      </h3>
                      <div className="flex items-center gap-1.5 mt-2 bg-[#FFF5F0] w-fit px-2.5 py-1 rounded-md border border-[#FFD8C2]/50">
                        <Star size={12} className="fill-[#E76F51] text-[#E76F51]" />
                        <span className="text-[10px] font-black text-[#5C4033]">{doctor.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 relative z-10 flex-grow">
                    <div className="flex items-center gap-4 p-3.5 rounded-xl bg-[#FFF5F0] border border-[#FFD8C2]/40 group-hover:border-[#FFD8C2] transition-colors">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#E76F51] shrink-0 shadow-sm">
                         <Briefcase size={16} />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Specialization</p>
                        <p className="text-[11px] font-bold text-[#111827] uppercase">{doctor.specialty}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FFF5F0] border border-[#FFD8C2]/40 group-hover:border-[#FFD8C2] transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#E76F51] shrink-0 shadow-sm">
                           <Calendar size={16} />
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Age</p>
                          <p className="text-[11px] font-bold text-[#111827] uppercase">{doctor.age} Years</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FFF5F0] border border-[#FFD8C2]/40 group-hover:border-[#FFD8C2] transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#E76F51] shrink-0 shadow-sm">
                           <UserCircle size={16} />
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Status</p>
                          <p className="text-[11px] font-bold text-emerald-600 uppercase">Verified</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#FFD8C2]/60 relative z-10">
                    <div className="flex items-center justify-between">
                       <div className="flex flex-col">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Contact Number</p>
                          <div className="flex items-center gap-2 text-[#3E2723]">
                            <Phone size={14} className="text-[#E76F51]" />
                            <p className="text-sm font-black tracking-widest">{doctor.phone}</p>
                          </div>
                       </div>
                       
                       <div className="w-10 h-10 rounded-full bg-[#FFF0E8] text-[#E76F51] flex items-center justify-center shadow-sm border border-[#FFD8C2] group-hover:bg-[#E76F51] group-hover:text-white group-hover:border-[#E76F51] transition-all">
                         <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                       </div>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
