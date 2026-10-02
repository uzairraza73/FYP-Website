"use client";

import { motion } from "framer-motion";
import { DoctorLayout } from "@/components/doctor/DoctorLayout";
import { mockPatients } from "@/data/doctorData";
import { Calendar, Clock, User, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

// Flatten all appointments with patient info
const allMeetings = mockPatients.flatMap(p =>
  p.appointments.map(a => ({
    ...a,
    patientName: p.name,
    patientAge: p.age,
    patientGender: p.gender,
  }))
).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

const upcoming = allMeetings.filter(m => m.status === "Upcoming");
const past = allMeetings.filter(m => m.status !== "Upcoming");

const TYPE_COLORS: Record<string, string> = {
  "Consultation": "bg-blue-50 text-blue-700 border-blue-200",
  "Check-up":     "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Biopsy":       "bg-red-50 text-red-700 border-red-200",
};

export default function SchedulePage() {
  return (
    <DoctorLayout>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-4xl">
        <div>
          <h1 className="text-2xl font-black text-[#3E2723]">Meeting Schedule</h1>
          <p className="text-sm text-[#6D4C41] mt-1">Your upcoming and past appointments with patients.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Upcoming", value: upcoming.length, icon: AlertCircle, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Completed", value: allMeetings.filter(m=>m.status==="Completed").length, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Cancelled", value: allMeetings.filter(m=>m.status==="Cancelled").length, icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="bg-white/60 backdrop-blur-sm border border-white/70 rounded-2xl p-5 shadow-sm">
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                <Icon size={18} className={color} />
              </div>
              <p className="text-2xl font-black text-[#3E2723]">{value}</p>
              <p className="text-[10px] font-bold text-[#8D6E63] uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>

        {/* Upcoming Appointments */}
        <div>
          <h2 className="text-sm font-black uppercase tracking-widest text-[#8D6E63] mb-4">Upcoming Appointments</h2>
          {upcoming.length === 0 ? (
            <div className="bg-white/60 border border-white/70 rounded-2xl p-8 text-center">
              <Calendar size={32} className="text-[#D7CCC8] mx-auto mb-2" />
              <p className="text-sm text-[#A1887F]">No upcoming appointments</p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcoming.map(m => (
                <div key={m.id} className="bg-white/70 backdrop-blur-sm border border-white/70 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#F0E8DF] flex items-center justify-center text-[#5C4033] flex-shrink-0">
                    <Calendar size={22} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${TYPE_COLORS[m.type] ?? "bg-[#F0E8DF] text-[#5C4033]"}`}>{m.type}</span>
                    </div>
                    <p className="text-sm font-black text-[#3E2723]">{m.patientName}</p>
                    <p className="text-[10px] text-[#8D6E63]">{m.patientAge} yrs · {m.patientGender}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 justify-end text-xs font-bold text-[#3E2723]">
                      <Calendar size={12} className="text-[#8D6E63]" /> {m.date}
                    </div>
                    <div className="flex items-center gap-1 justify-end text-[10px] text-[#8D6E63] mt-0.5">
                      <Clock size={11} /> {m.time}
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Past Appointments */}
        <div>
          <h2 className="text-sm font-black uppercase tracking-widest text-[#8D6E63] mb-4">Past Appointments</h2>
          <div className="space-y-3">
            {past.map(m => (
              <div key={m.id} className="bg-white/40 border border-white/50 rounded-2xl p-4 flex items-center gap-4 opacity-80">
                <div className="w-10 h-10 rounded-xl bg-[#F0E8DF] flex items-center justify-center text-[#A1887F] flex-shrink-0">
                  <User size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#5C4033]">{m.patientName} — {m.type}</p>
                  <p className="text-[10px] text-[#A1887F]">{m.date} at {m.time}</p>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${m.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>{m.status}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </DoctorLayout>
  );
}
