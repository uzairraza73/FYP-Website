"use client";

import { motion } from "framer-motion";
import { DoctorLayout } from "@/components/doctor/DoctorLayout";
import { mockPatients } from "@/data/doctorData";
import { Users, Search, Phone, Mail, Calendar, Activity, ChevronRight } from "lucide-react";
import { useState } from "react";

const STATUS_COLORS = {
  "Active":    { bg: "bg-emerald-50",  text: "text-emerald-700",  dot: "bg-emerald-400" },
  "Follow-up": { bg: "bg-amber-50",    text: "text-amber-700",    dot: "bg-amber-400" },
  "Recovered": { bg: "bg-[#F0E8DF]",   text: "text-[#5C4033]",   dot: "bg-[#8D6E63]" },
};

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(mockPatients[0]);

  const filtered = mockPatients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DoctorLayout>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-black text-[#3E2723]">Patient Directory</h1>
          <p className="text-sm text-[#6D4C41] mt-1">All patients who have consulted with you.</p>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A1887F]" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search patients..."
            className="w-full bg-white/70 border border-[#E8D5C4] rounded-full pl-10 pr-4 py-2.5 text-xs text-[#3E2723] placeholder:text-[#A1887F] focus:outline-none focus:border-[#8D6E63] focus:ring-1 focus:ring-[#8D6E63]/20 shadow-sm"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient List */}
          <div className="lg:col-span-1 space-y-2">
            {filtered.map(p => {
              const sc = STATUS_COLORS[p.status];
              return (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    selected?.id === p.id
                      ? "bg-white border-[#8D6E63]/40 shadow-md"
                      : "bg-white/50 border-white/70 hover:bg-white hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#EADECF] flex items-center justify-center text-[#5C4033] font-black text-sm flex-shrink-0">
                      {p.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-[#3E2723] truncate">{p.name}</p>
                      <p className="text-[10px] text-[#8D6E63]">{p.age} yrs · {p.gender}</p>
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${sc.bg} ${sc.text}`}>{p.status}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Patient Detail Panel */}
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 bg-white/70 backdrop-blur-sm border border-white/70 rounded-3xl p-6 shadow-[0_8px_40px_rgba(92,64,51,0.08)] space-y-6"
            >
              {/* Patient Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#EADECF] flex items-center justify-center text-[#3E2723] font-black text-xl">
                    {selected.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-[#3E2723]">{selected.name}</h2>
                    <p className="text-xs text-[#8D6E63]">{selected.age} years · {selected.gender} · Blood: {selected.bloodGroup}</p>
                    <p className="text-[10px] text-[#A1887F] mt-0.5">Last visit: {selected.lastVisit}</p>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${STATUS_COLORS[selected.status].bg} ${STATUS_COLORS[selected.status].text}`}>{selected.status}</span>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-xs text-[#6D4C41]">
                  <Mail size={13} className="text-[#A1887F]" /> {selected.email}
                </div>
                <div className="flex items-center gap-2 text-xs text-[#6D4C41]">
                  <Phone size={13} className="text-[#A1887F]" /> {selected.phone}
                </div>
              </div>

              {/* Skin History */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-[#8D6E63] mb-3">Scan History</h3>
                <div className="space-y-2">
                  {selected.skinHistory.map((h, i) => (
                    <div key={i} className="flex items-center gap-3 bg-[#F0E8DF]/60 rounded-xl p-3">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${h.riskLevel === 'High' ? 'bg-red-400' : h.riskLevel === 'Medium' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                      <div className="flex-1">
                        <p className="text-xs font-bold text-[#3E2723]">{h.condition}</p>
                        <p className="text-[10px] text-[#8D6E63]">{h.date} · Confidence: {h.confidence}%</p>
                      </div>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${h.riskLevel === 'High' ? 'bg-red-50 text-red-600' : h.riskLevel === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>{h.riskLevel}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Appointments */}
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-[#8D6E63] mb-3">Appointments</h3>
                <div className="space-y-2">
                  {selected.appointments.map(a => (
                    <div key={a.id} className="flex items-center gap-3 bg-white border border-[#E8D5C4] rounded-xl p-3">
                      <Calendar size={14} className="text-[#8D6E63] flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs font-bold text-[#3E2723]">{a.type}</p>
                        <p className="text-[10px] text-[#8D6E63]">{a.date} at {a.time}</p>
                      </div>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${a.status === 'Upcoming' ? 'bg-blue-50 text-blue-600' : a.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>{a.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </DoctorLayout>
  );
}
