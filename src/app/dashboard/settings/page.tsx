"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import {
  ChevronLeft, User, Globe, Bell, LogOut,
  Check, Save, X
} from "lucide-react";

const LANGUAGES = ["English", "Urdu", "Arabic", "French"];
const NOTIFICATION_OPTIONS = ["All Notifications", "Appointment Reminders", "Messages Only", "None"];

export default function DashboardSettingsPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [language, setLanguage] = useState("English");
  const [notifications, setNotifications] = useState("All Notifications");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [saved, setSaved] = useState(false);

  const fullName = user?.name || "Patient";

  const handleLogout = () => {
    logout();
    router.push("/auth/role-selection");
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#F0E8DF] font-plus-jakarta relative overflow-hidden">
      {/* Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#D4A98A]/25 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] bg-[#C69C7B]/15 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 px-6 pt-10 pb-20 max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => router.push("/dashboard")} className="w-10 h-10 rounded-full bg-white/80 border border-white shadow-sm flex items-center justify-center text-[#8D6E63] hover:bg-white transition-all">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-[#3E2723]">Settings</h1>
            <p className="text-xs text-[#A1887F] font-medium">Manage your preferences & account</p>
          </div>
        </div>

        {/* Saved Toast */}
        {saved && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mb-4 flex items-center gap-3 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-700 text-sm font-bold">
            <Check size={18} /> Settings saved successfully!
          </motion.div>
        )}

        <div className="space-y-5">
          {/* Profile Card */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="bg-white/75 backdrop-blur-xl border border-white/90 rounded-[2rem] p-6 shadow-[0_6px_30px_rgba(92,64,51,0.05)] relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#EADBCE]/40 rounded-full blur-2xl pointer-events-none" />
            <h2 className="text-xs font-black uppercase tracking-widest text-[#8D6E63] mb-4 flex items-center gap-2">
              <User size={14} /> Profile
            </h2>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4A98A] to-[#8D6E63] flex items-center justify-center text-white font-black text-2xl shadow-md">
                {fullName.charAt(0)}
              </div>
              <div>
                <p className="text-lg font-black text-[#3E2723]">{fullName}</p>
                <p className="text-sm text-[#8D6E63]">{user?.email || "patient@oncura.pk"}</p>
                <span className="text-[10px] font-bold text-[#5C4033] bg-[#F0E8DF] border border-[#E8D5C4] px-2 py-0.5 rounded-full mt-1 inline-block">Patient</span>
              </div>
            </div>
          </motion.div>

          {/* Language */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-white/75 backdrop-blur-xl border border-white/90 rounded-[2rem] p-6 shadow-[0_6px_30px_rgba(92,64,51,0.05)]">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#8D6E63] mb-4 flex items-center gap-2">
              <Globe size={14} /> Language
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {LANGUAGES.map(lang => (
                <button key={lang} onClick={() => setLanguage(lang)}
                  className={`py-2.5 px-4 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 ${language === lang ? "bg-[#8D6E63] text-white shadow-md" : "bg-[#F0E8DF] text-[#6D4C41] hover:bg-[#E8D5C4] border border-[#E8D5C4]"}`}>
                  {language === lang && <Check size={12} />}
                  {lang}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="bg-white/75 backdrop-blur-xl border border-white/90 rounded-[2rem] p-6 shadow-[0_6px_30px_rgba(92,64,51,0.05)]">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#8D6E63] mb-4 flex items-center gap-2">
              <Bell size={14} /> Notifications
            </h2>
            <div className="space-y-1">
              {NOTIFICATION_OPTIONS.map(opt => (
                <button key={opt} onClick={() => setNotifications(opt)}
                  className={`w-full flex items-center justify-between py-3 px-4 rounded-xl text-sm transition-all ${notifications === opt ? "bg-[#F0E8DF] text-[#3E2723] font-bold" : "text-[#6D4C41] hover:bg-[#F0E8DF]/50"}`}>
                  {opt}
                  {notifications === opt && <Check size={14} className="text-[#8D6E63]" />}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.button initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            onClick={handleSave}
            className="w-full py-4 bg-[#8D6E63] hover:bg-[#5C4033] text-white rounded-full font-black text-sm flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(92,64,51,0.2)] transition-all">
            <Save size={16} /> Save Changes
          </motion.button>

          {/* Logout */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="bg-white/75 backdrop-blur-xl border border-red-100 rounded-[2rem] p-6 shadow-[0_6px_30px_rgba(92,64,51,0.05)]">
            <h2 className="text-xs font-black uppercase tracking-widest text-red-400 mb-4 flex items-center gap-2">
              <LogOut size={14} /> Account
            </h2>
            {!showLogoutConfirm ? (
              <button onClick={() => setShowLogoutConfirm(true)}
                className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-black transition-all flex items-center justify-center gap-2 border border-red-100">
                <LogOut size={16} /> Sign Out of ONCURA
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-[#3E2723] text-center">Are you sure you want to sign out?</p>
                <div className="flex gap-3">
                  <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 py-2.5 bg-[#F0E8DF] text-[#5C4033] rounded-xl text-sm font-black transition-all hover:bg-[#E8D5C4]">Cancel</button>
                  <button onClick={handleLogout} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-black transition-all hover:bg-red-700">Yes, Sign Out</button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
