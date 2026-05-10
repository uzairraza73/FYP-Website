"use client";

import { Search, User, ChevronRight } from "lucide-react";
import { Patient } from "@/data/doctorData";
import { cn } from "@/utils/cn";
import { GlassCard } from "@/components/GlassCard";
import { useState } from "react";
import { useSettingsStore } from "@/store/useSettingsStore";

interface PatientListProps {
  patients: Patient[];
  selectedPatientId: string | null;
  onSelectPatient: (patient: Patient) => void;
}

const translations = {
  English: {
    searchPlaceholder: "Search patients...",
    noRecords: "No clinical records found",
    id: "ID"
  },
  Urdu: {
    searchPlaceholder: "مریضوں کو تلاش کریں...",
    noRecords: "کوئی کلینیکل ریکارڈ نہیں ملا",
    id: "آئی ڈی"
  }
};

export function PatientList({ patients, selectedPatientId, onSelectPatient }: PatientListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, language } = useSettingsStore();
  const t = translations[language];

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="relative group">
        <div className={cn("absolute top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors", 
          language === 'Urdu' ? "right-4" : "left-4")}>
          <Search size={14} />
        </div>
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={cn(
            "w-full border rounded-xl py-3 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all",
            theme === 'dark' ? "bg-slate-900/50 border-white/5 text-white placeholder:text-slate-700" : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400",
            language === 'Urdu' ? "pr-11 pl-4 text-right" : "pl-11 pr-4"
          )}
        />
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
        {filteredPatients.map((patient) => (
          <GlassCard
            key={patient.id}
            onClick={() => onSelectPatient(patient)}
            className={cn(
              "p-4 cursor-pointer transition-all duration-300",
              selectedPatientId === patient.id 
                ? "bg-blue-500/10 border-blue-500/30 ring-1 ring-blue-500/20" 
                : theme === 'dark' ? "bg-slate-900/20 hover:bg-slate-800/30 border-white/5" : "bg-white/50 border-slate-200 hover:bg-white"
            )}
          >
            <div className={cn("flex items-center gap-4", language === 'Urdu' && "flex-row-reverse")}>
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border",
                selectedPatientId === patient.id 
                  ? "bg-blue-500/20 border-blue-500/40 text-blue-400" 
                  : theme === 'dark' ? "bg-slate-800/50 border-white/5 text-slate-500" : "bg-slate-100 border-slate-200 text-slate-400"
              )}>
                <User size={18} />
              </div>
              <div className={cn("flex-1 min-w-0", language === 'Urdu' && "text-right")}>
                <h3 className={cn("text-sm font-black truncate font-plus-jakarta tracking-tight", 
                  theme === 'dark' ? "text-white" : "text-slate-900")}>
                  {patient.name}
                </h3>
                <div className={cn("flex items-center gap-2 mt-0.5", language === 'Urdu' && "flex-row-reverse")}>
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">
                    {t.id}: {patient.id}
                  </span>
                  <span className="text-slate-700">•</span>
                  <span className={cn(
                    "text-[8px] font-black uppercase tracking-widest",
                    patient.status === "Active" ? "text-emerald-500" :
                    patient.status === "Follow-up" ? "text-orange-500" : "text-blue-500"
                  )}>
                    {patient.status}
                  </span>
                </div>
              </div>
              <ChevronRight 
                size={16} 
                className={cn(
                  "transition-all duration-300",
                  selectedPatientId === patient.id ? "text-blue-500 translate-x-1" : "text-slate-700",
                  language === 'Urdu' && "rotate-180"
                )} 
              />
            </div>
          </GlassCard>
        ))}

        {filteredPatients.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest">
              {t.noRecords}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
