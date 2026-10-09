"use client";

import { motion } from "framer-motion";
import { DoctorLayout } from "@/components/doctor/DoctorLayout";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  LogOut, Globe, Bell, User,
  Check
} from "lucide-react";

const LANGUAGES = ["English", "Urdu", "Arabic"];
const NOTIFICATION_OPTIONS = ["All Notifications", "Patient Messages Only", "Appointments Only", "None"];

export default function SettingsPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [language, setLanguage] = useState("English");
  const [notifications, setNotifications] = useState("All Notifications");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/auth/role-selection");
  };

  return (
    <DoctorLayout>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl space-y-8">
        <div>
          <h1 className="text-2xl font-black text-[#3E2723]">Settings</h1>
          <p className="text-sm text-[#6D4C41] mt-1">Manage your account and preferences.</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/70 rounded-3xl p-6 shadow-sm">
          <h2 className="text-xs font-black uppercase tracking-widest text-[#8D6E63] mb-4">Profile</h2>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#EADECF] flex items-center justify-center text-[#3E2723] font-black text-2xl border-2 border-[#D7CCC8]">
              {(user?.name || "D").charAt(0)}
            </div>
            <div>
              <p className="text-lg font-black text-[#3E2723]">{user?.name || "Dr. Ahmed"}</p>
              <p className="text-sm text-[#8D6E63]">{user?.email || "doctor@oncura.pk"}</p>
              <span className="text-[10px] font-bold text-[#5C4033] bg-[#F0E8DF] px-2 py-0.5 rounded-full mt-1 inline-block">Doctor</span>
            </div>
          </div>
        </div>

        {/* Language Setting */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/70 rounded-3xl p-6 shadow-sm">
          <h2 className="text-xs font-black uppercase tracking-widest text-[#8D6E63] mb-4 flex items-center gap-2">
            <Globe size={14} /> Language
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {LANGUAGES.map(lang => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`py-2.5 px-4 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  language === lang
                    ? "bg-[#5C4033] text-white shadow-md"
                    : "bg-[#F0E8DF] text-[#6D4C41] hover:bg-[#E8D5C4]"
                }`}
              >
                {language === lang && <Check size={12} />}
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/70 rounded-3xl p-6 shadow-sm">
          <h2 className="text-xs font-black uppercase tracking-widest text-[#8D6E63] mb-4 flex items-center gap-2">
            <Bell size={14} /> Notifications
          </h2>
          <div className="space-y-2">
            {NOTIFICATION_OPTIONS.map(opt => (
              <button
                key={opt}
                onClick={() => setNotifications(opt)}
                className={`w-full flex items-center justify-between py-3 px-4 rounded-xl text-sm transition-all ${
                  notifications === opt
                    ? "bg-[#F0E8DF] text-[#3E2723] font-bold"
                    : "text-[#6D4C41] hover:bg-[#F0E8DF]/50"
                }`}
              >
                {opt}
                {notifications === opt && <Check size={14} className="text-[#5C4033]" />}
              </button>
            ))}
          </div>
        </div>

        {/* Logout */}
        <div className="bg-white/70 backdrop-blur-sm border border-red-100 rounded-3xl p-6 shadow-sm">
          <h2 className="text-xs font-black uppercase tracking-widest text-red-400 mb-4 flex items-center gap-2">
            <LogOut size={14} /> Account
          </h2>
          {!showLogoutConfirm ? (
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
            >
              <LogOut size={16} /> Sign Out of ONCURA
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm font-semibold text-[#3E2723] text-center">Are you sure you want to sign out?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-2.5 bg-[#F0E8DF] text-[#5C4033] rounded-xl text-sm font-bold transition-all hover:bg-[#E8D5C4]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-2.5 bg-red-600 text-white rounded-xl text-sm font-bold transition-all hover:bg-red-700"
                >
                  Yes, Sign Out
                </button>
              </div>
            </div>
          )}
        </div>

      </motion.div>
    </DoctorLayout>
  );
}
