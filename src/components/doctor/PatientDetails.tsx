"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Phone, Calendar, 
  Activity, Clock, ShieldAlert,
  ClipboardList, History, Info
} from "lucide-react";
import { Patient } from "@/data/doctorData";
import { GlassCard } from "@/components/GlassCard";
import { cn } from "@/utils/cn";
import { useState } from "react";
import { useSettingsStore } from "@/store/useSettingsStore";

interface PatientDetailsProps {
  patient: Patient | null;
}

type Tab = "history" | "overview" | "schedule";

const translations = {
  English: {
    selectPatient: "Select a Patient",
    chooseRecord: "Choose a clinical record from the directory to view detailed diagnostics",
    clinicalHistory: "Clinical History",
    patientOverview: "Patient Overview",
    meetingSchedule: "Meeting Schedule",
    clinicalId: "Clinical ID",
    age: "Age",
    gender: "Gender",
    bloodGroup: "Blood Group",
    lastVisit: "Last Visit",
    email: "Email Address",
    phone: "Contact Number",
    vitalStats: "Vital Statistics",
    aiConfidence: "AI Confidence Score",
    risk: "Risk",
    updateSession: "Update Session",
    scheduleNew: "Schedule New Consultation"
  },
  Urdu: {
    selectPatient: "مریض منتخب کریں",
    chooseRecord: "تفصیلی تشخیص دیکھنے کے لیے ڈائریکٹری سے کلینیکل ریکارڈ منتخب کریں",
    clinicalHistory: "کلینیکل ہسٹری",
    patientOverview: "مریض کا جائزہ",
    meetingSchedule: "میٹنگ کا شیڈول",
    clinicalId: "کلینیکل آئی ڈی",
    age: "عمر",
    gender: "صنف",
    bloodGroup: "بلڈ گروپ",
    lastVisit: "آخری دورہ",
    email: "ای میل ایڈریس",
    phone: "رابطہ نمبر",
    vitalStats: "اہم اعداد و شمار",
    aiConfidence: "AI اعتماد کا اسکور",
    risk: "خطرہ",
    updateSession: "سیشن اپ ڈیٹ کریں",
    scheduleNew: "نئی مشاورت کا شیڈول بنائیں"
  }
};

export function PatientDetails({ patient }: PatientDetailsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("history");
  const { theme, language } = useSettingsStore();
  const t = translations[language];

  if (!patient) {
    return (
      <div className={cn(
        "h-full flex flex-col items-center justify-center text-center p-10 rounded-[2rem] border transition-colors",
        theme === 'dark' ? "bg-slate-900/10 border-white/5" : "bg-white/50 border-slate-200 shadow-xl shadow-slate-200/50"
      )}>
        <div className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center mb-6",
          theme === 'dark' ? "bg-slate-800/50 text-slate-600" : "bg-slate-100 text-slate-400"
        )}>
          <ClipboardList size={32} />
        </div>
        <h3 className={cn("text-xl font-black mb-2 font-plus-jakarta tracking-tight", theme === 'dark' ? "text-white" : "text-slate-900")}>
          {t.selectPatient}
        </h3>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold max-w-[200px]">
          {t.chooseRecord}
        </p>
      </div>
    );
  }

  const tabs = [
    { id: "history", label: t.clinicalHistory, icon: History },
    { id: "overview", label: t.patientOverview, icon: Info },
    { id: "schedule", label: t.meetingSchedule, icon: Clock },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      key={patient.id}
      className="space-y-6"
    >
      {/* Header Info */}
      <GlassCard className="p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <User size={120} className="text-blue-500" />
        </div>
        
        <div className={cn("flex flex-col md:flex-row md:items-center gap-8 relative z-10", language === 'Urdu' && "md:flex-row-reverse")}>
          <div className="w-24 h-24 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shrink-0 shadow-2xl shadow-blue-500/5">
            <User size={48} strokeWidth={1.5} />
          </div>
          <div className={cn("flex-1", language === 'Urdu' && "text-right")}>
            <div className={cn("flex flex-wrap items-center gap-3 mb-2", language === 'Urdu' && "flex-row-reverse")}>
              <h2 className={cn("text-3xl font-black font-plus-jakarta tracking-tighter", theme === 'dark' ? "text-white" : "text-slate-900")}>
                {patient.name}
              </h2>
              <span className={cn(
                "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border",
                patient.status === "Active" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                patient.status === "Follow-up" ? "bg-orange-500/10 text-orange-500 border-orange-500/20" : 
                "bg-blue-500/10 text-blue-500 border-blue-500/20"
              )}>
                {patient.status}
              </span>
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.clinicalId}: {patient.id}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className={cn("flex items-center gap-2 mt-10 p-1.5 rounded-2xl border w-fit transition-colors", 
          theme === 'dark' ? "bg-slate-950/50 border-white/5" : "bg-slate-100 border-slate-200",
          language === 'Urdu' && "flex-row-reverse ml-auto")}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all duration-300",
                activeTab === tab.id 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                  : theme === 'dark' ? "text-slate-500 hover:text-slate-300 hover:bg-white/5" : "text-slate-400 hover:text-slate-900 hover:bg-white"
              )}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>
      </GlassCard>

      <AnimatePresence mode="wait">
        {activeTab === "history" && (
          <motion.div
            key="history"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {patient.skinHistory.map((record, idx) => (
                <GlassCard key={idx} className="p-6 transition-all group">
                  <div className={cn("flex justify-between items-start mb-4", language === 'Urdu' && "flex-row-reverse")}>
                    <div className={cn(language === 'Urdu' && "text-right")}>
                      <h4 className={cn("text-base font-black uppercase tracking-tight group-hover:text-blue-500 transition-colors", 
                        theme === 'dark' ? "text-white" : "text-slate-900")}>{record.condition}</h4>
                      <p className={cn("text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-1 flex items-center gap-2", language === 'Urdu' && "flex-row-reverse")}>
                        <Calendar size={10} /> {record.date}
                      </p>
                    </div>
                    <span className={cn(
                      "px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border",
                      record.riskLevel === "High" ? "bg-red-500/10 text-red-500 border-red-500/20" : 
                      record.riskLevel === "Medium" ? "bg-orange-500/10 text-orange-500 border-orange-500/20" : 
                      "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                    )}>
                      {record.riskLevel} {t.risk}
                    </span>
                  </div>
                  <div className={cn("rounded-xl p-4 border mb-4 transition-colors", 
                    theme === 'dark' ? "bg-slate-950/50 border-white/5" : "bg-slate-50 border-slate-200")}>
                    <p className={cn("text-xs leading-relaxed italic", theme === 'dark' ? "text-slate-400" : "text-slate-600")}>
                      &quot;{record.notes}&quot;
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className={cn(language === 'Urdu' && "w-full text-right")}>
                      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{t.aiConfidence}</p>
                      <div className={cn("flex items-center gap-2 mt-1", language === 'Urdu' && "flex-row-reverse")}>
                        <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: `${record.confidence}%` }} 
                            className="h-full bg-blue-500" 
                          />
                        </div>
                        <span className="text-xs font-black text-blue-500">{record.confidence}%</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <GlassCard className="p-8">
              <h3 className={cn("text-xs font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-2", 
                theme === 'dark' ? "text-white" : "text-slate-900",
                language === 'Urdu' && "flex-row-reverse")}>
                <Info size={16} className="text-blue-500" /> {t.vitalStats}
              </h3>
              <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-8", language === 'Urdu' && "flex-row-reverse")}>
                <InfoItem icon={<Activity size={14} />} label={t.age} value={`${patient.age} Yrs`} theme={theme} />
                <InfoItem icon={<Activity size={14} />} label={t.gender} value={patient.gender} theme={theme} />
                <InfoItem icon={<ShieldAlert size={14} />} label={t.bloodGroup} value={patient.bloodGroup} theme={theme} />
                <InfoItem icon={<Calendar size={14} />} label={t.lastVisit} value={patient.lastVisit} theme={theme} />
              </div>

              <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 pt-8 border-t transition-colors", 
                theme === 'dark' ? "border-white/5" : "border-slate-200")}>
                <div className={cn("flex items-center gap-4", language === 'Urdu' && "flex-row-reverse text-right")}>
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                    theme === 'dark' ? "bg-slate-800/50 text-slate-400" : "bg-slate-100 text-slate-500")}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{t.email}</p>
                    <p className={cn("text-sm font-bold tracking-tight", theme === 'dark' ? "text-white" : "text-slate-900")}>{patient.email}</p>
                  </div>
                </div>
                <div className={cn("flex items-center gap-4", language === 'Urdu' && "flex-row-reverse text-right")}>
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-colors",
                    theme === 'dark' ? "bg-slate-800/50 text-slate-400" : "bg-slate-100 text-slate-500")}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{t.phone}</p>
                    <p className={cn("text-sm font-bold tracking-tight", theme === 'dark' ? "text-white" : "text-slate-900")}>{patient.phone}</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {activeTab === "schedule" && (
          <motion.div
            key="schedule"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {patient.appointments.map((apt) => (
                <GlassCard key={apt.id} className="p-6">
                  <div className={cn("flex items-center gap-5", language === 'Urdu' && "flex-row-reverse")}>
                    <div className="w-14 h-14 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex flex-col items-center justify-center text-blue-500">
                      <p className="text-[8px] font-black uppercase">MAY</p>
                      <p className="text-xl font-black">{apt.date.split('-')[2]}</p>
                    </div>
                    <div className={cn("flex-1", language === 'Urdu' && "text-right")}>
                      <div className={cn("flex items-center justify-between mb-2", language === 'Urdu' && "flex-row-reverse")}>
                        <h4 className={cn("text-base font-black uppercase tracking-tight", theme === 'dark' ? "text-white" : "text-slate-900")}>{apt.type}</h4>
                        <span className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.2em] flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> {apt.status}
                        </span>
                      </div>
                      <div className={cn("flex items-center gap-4", language === 'Urdu' && "flex-row-reverse")}>
                        <span className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                          <Clock size={12} className="text-blue-500" /> {apt.time}
                        </span>
                        <span className="text-slate-800">|</span>
                        <span className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                          <Calendar size={12} className="text-blue-500" /> {apt.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={cn("mt-6 flex gap-3", language === 'Urdu' && "flex-row-reverse")}>
                    <button className="flex-1 py-3 rounded-xl bg-blue-600 text-white text-[9px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all">
                      {t.updateSession}
                    </button>
                    <button className={cn("px-4 py-3 rounded-xl border transition-all", 
                      theme === 'dark' ? "bg-white/5 border-white/5 text-slate-400 hover:text-white" : "bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-900")}>
                      <ChevronRight size={16} className={language === 'Urdu' ? "rotate-180" : ""} />
                    </button>
                  </div>
                </GlassCard>
              ))}
              
              <button className={cn("h-[140px] rounded-[2rem] border-2 border-dashed transition-all group",
                theme === 'dark' ? "border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 text-slate-700 hover:text-blue-500" : "border-slate-200 hover:border-blue-500/30 hover:bg-blue-50 text-slate-400 hover:text-blue-600")}>
                <div className="flex flex-col items-center gap-3">
                  <Calendar size={24} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-black uppercase tracking-[0.2em]">{t.scheduleNew}</span>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function InfoItem({ icon, label, value, theme }: { icon: React.ReactNode, label: string, value: string | number, theme: 'dark' | 'light' }) {
  return (
    <div className={cn("p-4 rounded-2xl border transition-colors", 
      theme === 'dark' ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-200")}>
      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5 mb-2">
        {icon} {label}
      </p>
      <p className={cn("text-sm font-black tracking-tight", theme === 'dark' ? "text-white" : "text-slate-900")}>{value}</p>
    </div>
  );
}

function ChevronRight({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
