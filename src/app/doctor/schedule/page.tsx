"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DoctorLayout } from "@/components/doctor/DoctorLayout";
import {
  getAppointments,
  updateAppointmentStatus,
} from "@/utils/supabase/queries";
import type { Appointment } from "@/utils/supabase/types";
import {
  Calendar,
  Clock,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RefreshCw,
  MessageSquare,
  ChevronRight,
  Filter,
} from "lucide-react";
import { useRouter } from "next/navigation";

const STATUS_CONFIG: Record<string, { badge: string; label: string }> = {
  pending:   { badge: "bg-amber-100 text-amber-800 border-amber-200", label: "Pending" },
  confirmed: { badge: "bg-blue-100 text-blue-800 border-blue-200",    label: "Confirmed" },
  completed: { badge: "bg-emerald-100 text-emerald-800 border-emerald-200", label: "Completed" },
  cancelled: { badge: "bg-rose-100 text-rose-800 border-rose-200",     label: "Cancelled" },
};

export default function DoctorSchedulePage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "upcoming" | "past">("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchSchedule = async () => {
    setLoading(true);
    try {
      const data = await getAppointments({ doctorId: "d1" });
      setAppointments(data);
    } catch (err) {
      console.error("Error fetching doctor schedule:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      await updateAppointmentStatus(id, newStatus);
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus as any } : a))
      );
    } catch (err) {
      console.error("Error updating appointment status:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const now = new Date();
  const filtered = appointments.filter((a) => {
    const apptDate = new Date(a.scheduled_at);
    if (filter === "upcoming") return apptDate >= now && a.status !== "cancelled";
    if (filter === "past") return apptDate < now || a.status === "cancelled";
    return true;
  });

  return (
    <DoctorLayout>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-[#3E2723]">Clinical Schedule & Visits</h1>
            <p className="text-sm text-[#6D4C41] mt-0.5">
              Live Supabase Appointments management for patient consultations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchSchedule}
              className="p-2.5 rounded-2xl bg-white/70 border border-[#E8D5C4] text-[#8D6E63] hover:text-[#3E2723] hover:bg-white transition-all shadow-sm flex items-center gap-1.5 text-xs font-bold"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>

            {/* Filter Tabs */}
            <div className="flex gap-1 p-1 bg-white/70 backdrop-blur-md rounded-2xl border border-[#E8D5C4]">
              {(["all", "upcoming", "past"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                    filter === tab
                      ? "bg-[#8D6E63] text-white shadow-sm"
                      : "text-[#8D6E63] hover:text-[#3E2723]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Schedule List */}
        {loading ? (
          <div className="p-12 text-center bg-white/60 backdrop-blur-md rounded-3xl border border-white/80 space-y-3">
            <RefreshCw className="animate-spin text-[#8D6E63] mx-auto" size={26} />
            <p className="text-xs font-bold text-[#5C4033]">Loading schedule from Supabase...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center bg-white/70 backdrop-blur-md rounded-3xl border border-white/80">
            <Calendar className="w-10 h-10 text-[#D4A98A] mx-auto mb-2" />
            <h3 className="text-sm font-black text-[#3E2723]">No Appointments in this View</h3>
            <p className="text-xs text-[#7D5A4F] mt-1">
              Patient appointments booked from the portal will automatically appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((appt) => {
              const scheduled = new Date(appt.scheduled_at);
              const dateStr = scheduled.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              });
              const timeStr = scheduled.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              });
              const config = STATUS_CONFIG[appt.status] || STATUS_CONFIG.confirmed;

              return (
                <motion.div
                  key={appt.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 bg-white/80 backdrop-blur-xl rounded-2xl border border-white/90 shadow-[0_4px_20px_rgba(92,64,51,0.04)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F0E8DF] border border-[#E8D5C4] flex items-center justify-center text-[#5C4033] font-black text-sm flex-shrink-0">
                      {appt.patient?.full_name?.charAt(0) || "P"}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-black text-[#3E2723]">
                          {appt.patient?.full_name || "Sara Khan (Patient)"}
                        </h3>
                        <span
                          className={`text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full border ${config.badge}`}
                        >
                          {config.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-[#8D6E63] font-medium mt-1">
                        <span className="flex items-center gap-1 font-semibold text-[#3E2723]">
                          <Calendar size={12} className="text-[#E76F51]" /> {dateStr}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {timeStr}
                        </span>
                      </div>

                      {appt.notes && (
                        <p className="text-xs text-[#7D5A4F] mt-1.5 bg-[#FAF6F2] px-2.5 py-1 rounded-lg border border-[#E8D5C4]/60">
                          <strong className="text-[#5C4033]">Patient Notes:</strong> {appt.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E8D5C4]/40">
                    <button
                      onClick={() => router.push("/doctor/messages")}
                      className="p-2 rounded-xl bg-[#F5EDE4] text-[#8D6E63] hover:text-white hover:bg-[#8D6E63] transition-all text-xs font-bold flex items-center gap-1"
                      title="Direct message patient"
                    >
                      <MessageSquare size={13} /> Message
                    </button>

                    {appt.status !== "completed" && (
                      <button
                        disabled={updatingId === appt.id}
                        onClick={() => handleStatusChange(appt.id, "completed")}
                        className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-all flex items-center gap-1"
                      >
                        <CheckCircle2 size={13} /> Complete
                      </button>
                    )}

                    {appt.status !== "cancelled" && (
                      <button
                        disabled={updatingId === appt.id}
                        onClick={() => handleStatusChange(appt.id, "cancelled")}
                        className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-all flex items-center gap-1"
                      >
                        <XCircle size={13} /> Cancel
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    </DoctorLayout>
  );
}
