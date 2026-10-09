"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ChevronLeft, Bell, Calendar, Activity, Clock, FileText } from "lucide-react";

export default function NotificationsPage() {
  const router = useRouter();

  const notifications = [
    {
      id: 1,
      type: "meeting",
      icon: Calendar,
      title: "Upcoming Consultation",
      desc: "Dr. Ahmed has scheduled a meeting with you.",
      time: "Tomorrow, 10:30 AM",
      color: "bg-[#EAE0D6] text-[#8D6E63]",
      unread: true,
    },
    {
      id: 2,
      type: "scan",
      icon: Activity,
      title: "Scan Reminder",
      desc: "It's time for your routine skin check. Please upload a new scan.",
      time: "Today, 9:00 AM",
      color: "bg-orange-50 text-orange-500",
      unread: true,
    },
    {
      id: 3,
      type: "record",
      icon: FileText,
      title: "New Test Results",
      desc: "Your recent biopsy results have been uploaded to your record.",
      time: "Yesterday",
      color: "bg-emerald-50 text-emerald-500",
      unread: false,
    },
  ];

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
          <button onClick={() => router.push("/profile")} className="w-10 h-10 rounded-full bg-white/80 border border-white shadow-sm flex items-center justify-center text-[#8D6E63] hover:bg-white transition-all">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-[#3E2723]">Notifications</h1>
            <p className="text-xs text-[#A1887F] font-medium">Your scan and meeting reminders</p>
          </div>
        </div>

        <div className="space-y-4">
          {notifications.map((notif, idx) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative bg-white/75 backdrop-blur-xl border border-white/90 rounded-[2rem] p-5 shadow-[0_6px_30px_rgba(92,64,51,0.05)] flex items-start gap-4 overflow-hidden"
            >
              {notif.unread && (
                <div className="absolute top-4 right-4 w-2.5 h-2.5 bg-red-500 rounded-full shadow-sm" />
              )}
              
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-white/50 shadow-sm ${notif.color}`}>
                <notif.icon size={20} />
              </div>
              
              <div className="flex-1 pr-6">
                <h3 className={`text-sm font-black mb-1 ${notif.unread ? "text-[#3E2723]" : "text-[#5C4033]"}`}>
                  {notif.title}
                </h3>
                <p className="text-xs text-[#7D5A4F] font-medium leading-relaxed mb-3">
                  {notif.desc}
                </p>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#A1887F] uppercase tracking-wider">
                  <Clock size={12} /> {notif.time}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
