"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PatientList } from "@/components/doctor/PatientList";
import { PatientDetails } from "@/components/doctor/PatientDetails";
import { mockPatients, Patient } from "@/data/doctorData";
import { cn } from "@/utils/cn";
import { useSettingsStore } from "@/store/useSettingsStore";

const translations = {
  English: {
    portal: "DOCTOR PORTAL",
    directory: "Patient Directory",
    schedule: "Meeting Schedule",
    diagnostics: "Patient Diagnostics",
    records: "Records",
    signOut: "Sign Out",
    theme: "Theme Mode",
    language: "Language",
    dark: "Dark",
    light: "Light",
    english: "English",
    urdu: "Urdu",
    settings: "Settings"
  },
  Urdu: {
    portal: "ڈاکٹر پورٹل",
    directory: "مریضوں کی ڈائرکٹری",
    schedule: "میٹنگ کا شیڈول",
    diagnostics: "مریض کی تشخیص",
    records: "ریکارڈز",
    signOut: "سائن آؤٹ",
    theme: "تھیم موڈ",
    language: "زبان",
    dark: "تاریک",
    light: "ہلکا",
    english: "انگریزی",
    urdu: "اردو",
    settings: "ترتیبات"
  }
};

export default function DoctorPortalPage() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(mockPatients[0]);
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
        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden flex flex-col md:flex-row p-6 gap-6">
          {/* Left Sidebar - Patient List */}
          <motion.aside 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-[350px] flex flex-col gap-6"
          >
            <div className={cn("flex items-center justify-between px-2", language === 'Urdu' && "flex-row-reverse")}>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">{t.directory}</h2>
              <span className="text-[10px] font-black text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-md">
                {mockPatients.length} {t.records}
              </span>
            </div>
            <PatientList 
              patients={mockPatients} 
              selectedPatientId={selectedPatient?.id || null}
              onSelectPatient={setSelectedPatient} 
            />
          </motion.aside>

          {/* Right Area - Patient Details */}
          <section className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-10">
            <div className="max-w-4xl mx-auto">
              <PatientDetails patient={selectedPatient} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
