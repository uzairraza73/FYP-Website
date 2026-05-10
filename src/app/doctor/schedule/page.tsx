"use client";

import { motion } from "framer-motion";
import { useAppointmentStore } from "@/store/useAppointmentStore";
import { GlassCard } from "@/components/GlassCard";
import { 
  Calendar, Clock, User, 
  Filter, Search,
  AlertCircle
} from "lucide-react";
import { useSettingsStore } from "@/store/useSettingsStore";
import { cn } from "@/utils/cn";

const translations = {
  English: {
    protocol: "Schedule Protocol",
    upcoming: "Upcoming Meetings",
    search: "Search Patient...",
    noApts: "No Appointments Found",
    clear: "The clinical schedule is currently clear",
    confirmed: "Confirmed",
    specialist: "Assigned Specialist",
    start: "Start Session"
  },
  Urdu: {
    protocol: "شیڈول پروٹوکول",
    upcoming: "آنے والی ملاقاتیں",
    search: "مریض تلاش کریں...",
    noApts: "کوئی ملاقات نہیں ملی",
    clear: "کلینیکل شیڈول فی الحال صاف ہے",
    confirmed: "تصدیق شدہ",
    specialist: "مقرر کردہ ماہر",
    start: "سیشن شروع کریں"
  }
};

export default function DoctorSchedulePage() {
  const appointments = useAppointmentStore((state) => state.appointments);
  const { theme, language } = useSettingsStore();
  const t = translations[language];
  
  return (
    <div className={cn(
      "min-h-screen transition-colors duration-500 selection:bg-blue-500/30",
      theme === 'dark' ? "bg-[#020617] text-white" : "bg-slate-50 text-slate-900"
    )}>
      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className={cn("absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]", 
          theme === 'dark' ? "bg-blue-600/10" : "bg-blue-200/20")} />
        <div className={cn("absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[120px]", 
          theme === 'dark' ? "bg-indigo-600/10" : "bg-indigo-200/20")} />
      </div>

      <div className="relative z-10 flex flex-col h-screen pt-24">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-5xl mx-auto">
            <div className={cn("flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6", 
              language === 'Urdu' && "md:flex-row-reverse")}>
              <div className={cn(language === 'Urdu' && "text-right")}>
                <div className={cn("flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-3", 
                  language === 'Urdu' && "flex-row-reverse")}>
                  <Calendar size={14} /> {t.protocol}
                </div>
                <h2 className="text-4xl font-black tracking-tighter font-plus-jakarta">
                  {t.upcoming.split(' ')[0]} <span className="text-blue-500">{t.upcoming.split(' ')[1]}</span>
                </h2>
              </div>

              <div className={cn("flex items-center gap-3", language === 'Urdu' && "flex-row-reverse")}>
                <div className="relative group">
                  <Search size={14} className={cn("absolute top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors", 
                    language === 'Urdu' ? "right-4" : "left-4")} />
                  <input 
                    type="text" 
                    placeholder={t.search} 
                    className={cn(
                      "border rounded-xl py-2.5 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-blue-500/50 w-64 transition-all",
                      theme === 'dark' ? "bg-slate-900/50 border-white/5 text-white placeholder:text-slate-700" : "bg-white border-slate-200 text-slate-900 placeholder:text-slate-400",
                      language === 'Urdu' ? "pr-11 pl-4 text-right" : "pl-11 pr-4"
                    )}
                  />
                </div>
                <button className={cn("p-2.5 rounded-xl border transition-colors", 
                  theme === 'dark' ? "bg-slate-900/50 border-white/5 text-slate-400 hover:text-white" : "bg-white border-slate-200 text-slate-500 hover:text-blue-600")}>
                  <Filter size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {appointments.length === 0 ? (
                <GlassCard className="py-24 flex flex-col items-center justify-center text-center">
                   <div className={cn("w-16 h-16 rounded-full flex items-center justify-center mb-6", 
                     theme === 'dark' ? "bg-slate-800/50 text-slate-600" : "bg-slate-100 text-slate-400")}>
                      <Clock size={32} />
                   </div>
                   <h3 className={cn("text-lg font-black uppercase tracking-tight", theme === 'dark' ? "text-white" : "text-slate-900")}>
                     {t.noApts}
                   </h3>
                   <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-2">
                     {t.clear}
                   </p>
                </GlassCard>
              ) : (
                appointments.map((apt, idx) => (
                  <motion.div
                    key={apt.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <GlassCard className="p-6 transition-all group">
                      <div className={cn("flex flex-col md:flex-row md:items-center gap-8", 
                        language === 'Urdu' && "md:flex-row-reverse")}>
                        <div className={cn("flex items-center gap-5 flex-1", language === 'Urdu' && "flex-row-reverse text-right")}>
                          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                            <User size={24} />
                          </div>
                          <div>
                            <div className={cn("flex items-center gap-3 mb-1", language === 'Urdu' && "flex-row-reverse")}>
                               <h3 className={cn("text-lg font-black tracking-tight", theme === 'dark' ? "text-white" : "text-slate-900")}>{apt.patientName}</h3>
                               <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-widest border border-emerald-500/20">
                                 {t.confirmed}
                               </span>
                            </div>
                            <div className={cn("flex items-center gap-4 text-[9px] font-bold text-slate-500 uppercase tracking-widest", 
                              language === 'Urdu' && "flex-row-reverse")}>
                               <span className="flex items-center gap-1.5"><Calendar size={12} className="text-blue-500" /> {apt.day}, {apt.date}</span>
                               <span className="flex items-center gap-1.5"><Clock size={12} className="text-blue-500" /> {apt.time}</span>
                            </div>
                          </div>
                        </div>

                        <div className={cn("flex items-center gap-4 md:border-l border-white/5 md:pl-8", 
                          language === 'Urdu' && "md:border-l-0 md:border-r md:pr-8 md:pl-0 flex-row-reverse")}>
                           <div className={cn("hidden md:block", language === 'Urdu' ? "text-left" : "text-right")}>
                              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">{t.specialist}</p>
                              <p className={cn("text-[10px] font-black uppercase tracking-tight", theme === 'dark' ? "text-white" : "text-slate-900")}>{apt.doctorName}</p>
                           </div>
                           <div className="h-10 w-px bg-white/5 mx-2 hidden md:block" />
                           <div className={cn("flex gap-2", language === 'Urdu' && "flex-row-reverse")}>
                             <button className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[9px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20">
                               {t.start}
                             </button>
                             <button className={cn("p-2.5 rounded-xl border transition-colors", 
                               theme === 'dark' ? "bg-slate-900 border-white/5 text-slate-400 hover:text-white" : "bg-slate-100 border-slate-200 text-slate-500 hover:text-blue-600")}>
                               <AlertCircle size={16} />
                             </button>
                           </div>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
