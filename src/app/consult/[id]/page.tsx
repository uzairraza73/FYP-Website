"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { availableDoctors } from "@/data/consultData";
import { motion } from "framer-motion";
import { BackButton } from "@/components/BackButton";
import Image from "next/image";
import { 
  Star, Phone, Briefcase, Calendar, UserCircle, 
  Clock, MapPin, CheckCircle2, ShieldCheck 
} from "lucide-react";
import { GlassCard } from "@/components/GlassCard";

export default function DoctorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const doctor = availableDoctors.find(d => d.id === unwrappedParams.id);

  if (!doctor) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FFF5F0] font-plus-jakarta pb-32">
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#3E2723] to-[#5C4033] text-white pt-28 pb-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,#E76F51,transparent_60%)]" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.2) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="mb-10">
            <BackButton variant="brown" className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white group-hover:bg-white/20" />
          </div>
        </div>
      </section>

      {/* ── PROFILE CONTENT ── */}
      <div className="max-w-4xl mx-auto px-6 -mt-32 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
          className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_20px_60px_rgba(92,64,51,0.09)] border border-[#FFD8C2]/60"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile Image */}
            <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl shrink-0">
              <Image 
                src={doctor.image}
                alt={doctor.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-[#FFD8C2] rounded-[2rem]" />
            </div>

            {/* Profile Info */}
            <div className="flex-1 w-full">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                <h1 className="text-3xl md:text-4xl font-black text-[#3E2723] tracking-tight">{doctor.name}</h1>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#FFF5F0] border border-[#FFD8C2]/60 rounded-xl">
                  <Star size={16} className="fill-[#E76F51] text-[#E76F51]" />
                  <span className="text-sm font-black text-[#5C4033]">{doctor.rating} Rating</span>
                </div>
              </div>
              
              <p className="text-lg font-bold text-[#E76F51] mb-6 flex items-center gap-2">
                <Briefcase size={18} /> {doctor.specialty}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 border-y border-[#FFD8C2]/60 py-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Calendar size={12} /> Age</span>
                  <span className="text-sm font-bold text-[#111827]">{doctor.age} Years</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><ShieldCheck size={12} /> License</span>
                  <span className="text-sm font-bold text-emerald-600 flex items-center gap-1"><CheckCircle2 size={14} /> Verified</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><MapPin size={12} /> Location</span>
                  <span className="text-sm font-bold text-[#111827]">Oncura Clinic</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Phone size={12} /> Contact</span>
                  <span className="text-sm font-bold text-[#111827]">{doctor.phone}</span>
                </div>
              </div>

              {/* Bio block */}
              <div className="mb-8">
                 <h2 className="text-sm font-black text-[#3E2723] uppercase tracking-widest mb-3">About the Specialist</h2>
                 <p className="text-sm text-slate-500 font-medium leading-relaxed">
                   {doctor.name} is a highly respected {doctor.specialty.toLowerCase()} with extensive experience in clinical dermatology and oncology. Specializing in the early detection and treatment of complex skin lesions, they have a proven track record of accurate diagnosis and patient-centered care.
                 </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── SCHEDULE ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-8"
        >
           <h2 className="text-xl font-black text-[#3E2723] mb-6 flex items-center gap-3">
             <Calendar className="text-[#E76F51]" /> Available Appointments
           </h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {doctor.presence.map((slot, i) => (
               <GlassCard key={i} className="bg-white border-[#FFD8C2]/60 hover:border-[#E76F51] p-5 shadow-[0_10px_30px_rgba(92,64,51,0.05)] transition-all group cursor-pointer">
                 <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-black text-[#3E2723] mb-1">{slot.day}, {slot.date}</p>
                      <p className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-widest">
                        <Clock size={12} className="text-[#E76F51]" /> {slot.timeSlot}
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-[#FFF5F0] text-[#E76F51] border border-[#FFD8C2] rounded-xl text-[10px] font-black uppercase tracking-widest group-hover:bg-[#E76F51] group-hover:text-white transition-colors">
                      Book Slot
                    </button>
                 </div>
               </GlassCard>
             ))}
           </div>
        </motion.div>
      </div>
    </main>
  );
}
