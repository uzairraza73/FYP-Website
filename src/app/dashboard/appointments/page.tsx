"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import {
  Calendar,
  Clock,
  ChevronLeft,
  Plus,
  User,
  CheckCircle2,
  ArrowRight,
  Star,
  MapPin,
  X,
  Stethoscope,
  RefreshCw,
  AlertCircle,
  FileText,
  CalendarCheck,
} from "lucide-react";
import {
  getAppointments,
  createAppointment,
  updateAppointmentStatus,
  getDoctors,
} from "@/utils/supabase/queries";
import type { Appointment, Doctor } from "@/utils/supabase/types";

const SLOTS = ["09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "03:30 PM", "05:00 PM"];
const APPT_TYPES = [
  { id: "consultation", label: "Skin Consultation", desc: "Detailed review of mole / lesion by specialist" },
  { id: "check-up",     label: "Routine Check-up",    desc: "Full-body dermoscopic preventive screening" },
  { id: "biopsy",       label: "Biopsy Review",        desc: "Histopathological biopsy analysis & discussion" },
  { id: "follow-up",    label: "Follow-up Visit",      desc: "Post-treatment healing check & monitor progress" },
];

export default function AppointmentsPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const patientId = user?.email ? user.email.replace(/[^a-zA-Z0-9]/g, "-") : "patient-1";

  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctorsList, setDoctorsList] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  // Booking Modal State
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("consultation");
  const [notes, setNotes] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Load appointments and doctors
  const loadData = async () => {
    setLoading(true);
    try {
      const [appts, docs] = await Promise.all([
        getAppointments({ patientId }),
        getDoctors(),
      ]);
      setAppointments(appts);
      setDoctorsList(docs);
      if (docs.length > 0 && !selectedDoctor) {
        setSelectedDoctor(docs[0]);
      }
    } catch (err) {
      console.error("Error loading appointments:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // Default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow.toISOString().split("T")[0]);
    setSelectedSlot(SLOTS[1]);
  }, []);

  const handleBookAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoctor || !selectedDate || !selectedSlot) return;

    setSubmitting(true);
    // Combine date + slot into ISO scheduled_at
    const [timeStr, meridiem] = selectedSlot.split(" ");
    const [hours, minutes] = timeStr.split(":").map(Number);
    let h24 = hours;
    if (meridiem === "PM" && hours < 12) h24 += 12;
    if (meridiem === "AM" && hours === 12) h24 = 0;

    const scheduledDate = new Date(selectedDate);
    scheduledDate.setHours(h24, minutes, 0, 0);

    try {
      const newAppt = await createAppointment({
        patient_id: patientId,
        doctor_id: selectedDoctor.id,
        scheduled_at: scheduledDate.toISOString(),
        status: "confirmed",
        notes: notes.trim() || `${selectedType}: scheduled via patient dashboard`,
      });

      setAppointments((prev) => [
        {
          ...newAppt,
          doctor: {
            id: selectedDoctor.id,
            full_name: selectedDoctor.full_name,
            specialization: selectedDoctor.specialization,
            experience_years: selectedDoctor.experience_years,
            location: selectedDoctor.location,
          },
        },
        ...prev,
      ]);

      setBookingSuccess(true);
      setTimeout(() => {
        setBookingSuccess(false);
        setShowBooking(false);
        setNotes("");
      }, 2000);
    } catch (err) {
      console.error("Booking error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelAppointment = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;
    await updateAppointmentStatus(id, "cancelled");
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "cancelled" } : a))
    );
  };

  const now = new Date();
  const upcomingAppts = appointments.filter(
    (a) => new Date(a.scheduled_at) >= now && a.status !== "cancelled"
  );
  const pastAppts = appointments.filter(
    (a) => new Date(a.scheduled_at) < now || a.status === "cancelled"
  );

  return (
    <div className="min-h-screen bg-[#F0E8DF] font-plus-jakarta relative overflow-hidden">
      {/* Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#D4A98A]/25 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] bg-[#C69C7B]/15 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 px-6 pt-10 pb-20 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="w-10 h-10 rounded-full bg-white/80 border border-white shadow-sm flex items-center justify-center text-[#8D6E63] hover:bg-white transition-all cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-black text-[#3E2723]">My Appointments</h1>
              <p className="text-xs text-[#A1887F] font-medium">
                Live Supabase connection · Appointments table
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowBooking(true)}
            className="flex items-center gap-2 bg-[#8D6E63] hover:bg-[#5C4033] text-white text-xs font-black rounded-full px-5 py-3 transition-all shadow-md cursor-pointer hover:-translate-y-0.5"
          >
            <Plus size={16} /> Book Appointment
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1.5 bg-white/60 backdrop-blur-md rounded-2xl w-fit border border-[#E8D5C4] shadow-sm mb-6">
          {(["upcoming", "past"] as const).map((tab) => {
            const count = tab === "upcoming" ? upcomingAppts.length : pastAppts.length;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === tab
                    ? "bg-[#8D6E63] text-white shadow-md"
                    : "text-[#A1887F] hover:text-[#5C4033]"
                }`}
              >
                <span>{tab === "upcoming" ? "Upcoming" : "Past / Cancelled"}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    activeTab === tab ? "bg-white/20 text-white" : "bg-[#F0E8DF] text-[#8D6E63]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Appointment Cards */}
        {loading ? (
          <div className="p-12 text-center bg-white/60 backdrop-blur-md rounded-3xl border border-white/80 space-y-3">
            <RefreshCw className="animate-spin text-[#8D6E63] mx-auto" size={28} />
            <p className="text-sm font-bold text-[#5C4033]">Fetching appointments from Supabase...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {activeTab === "upcoming" ? (
              <motion.div
                key="upcoming"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {upcomingAppts.length === 0 ? (
                  <div className="p-12 text-center bg-white/70 backdrop-blur-md rounded-3xl border border-white/80 space-y-3">
                    <CalendarCheck className="w-12 h-12 text-[#D4A98A] mx-auto" />
                    <h3 className="text-base font-black text-[#3E2723]">No Upcoming Appointments</h3>
                    <p className="text-xs text-[#7D5A4F] max-w-sm mx-auto">
                      Schedule a clinical evaluation with our specialists to review your recent AI skin scans.
                    </p>
                    <button
                      onClick={() => setShowBooking(true)}
                      className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8D6E63] text-white text-xs font-black uppercase tracking-wider"
                    >
                      <Plus size={14} /> Book First Visit
                    </button>
                  </div>
                ) : (
                  upcomingAppts.map((appt, i) => {
                    const scheduled = new Date(appt.scheduled_at);
                    const dateFormatted = scheduled.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                    const timeFormatted = scheduled.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    return (
                      <motion.div
                        key={appt.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="relative bg-white/80 backdrop-blur-xl border border-white/90 rounded-3xl p-6 shadow-[0_6px_30px_rgba(92,64,51,0.05)] overflow-hidden group hover:-translate-y-0.5 transition-all duration-300"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-[#F0E8DF] border border-[#E8D5C4] flex items-center justify-center text-[#8D6E63] flex-shrink-0">
                              <Stethoscope size={26} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] uppercase tracking-widest font-black px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                                  {appt.status.toUpperCase()}
                                </span>
                                <span className="text-xs text-[#A1887F] font-mono">
                                  ID #{appt.id.slice(0, 8)}
                                </span>
                              </div>
                              <h3 className="text-lg font-black text-[#3E2723]">
                                {appt.doctor?.full_name || "Specialist Dermatologist"}
                              </h3>
                              <p className="text-xs text-[#8D6E63] font-semibold">
                                {appt.doctor?.specialization || "Clinical Dermatology"} · {appt.doctor?.location || "Karachi Medical Complex"}
                              </p>
                              {appt.notes && (
                                <p className="text-xs text-[#7D5A4F] mt-2 bg-[#F5EDE4] px-3 py-1.5 rounded-xl border border-[#E8D5C4]/70">
                                  <strong className="text-[#5C4033]">Notes:</strong> {appt.notes}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E8D5C4]/60 gap-3">
                            <div className="text-left sm:text-right">
                              <div className="flex items-center gap-1.5 text-xs font-bold text-[#3E2723]">
                                <Calendar size={13} className="text-[#E76F51]" />
                                {dateFormatted}
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-[#7D5A4F] font-medium mt-0.5">
                                <Clock size={13} className="text-[#8D6E63]" />
                                {timeFormatted}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => router.push("/dashboard/messages")}
                                className="px-3 py-1.5 rounded-full bg-[#F5EDE4] hover:bg-[#8D6E63] hover:text-white text-[#8D6E63] text-xs font-bold transition-all"
                              >
                                Message
                              </button>
                              <button
                                onClick={() => handleCancelAppointment(appt.id)}
                                className="px-3 py-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition-all"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </motion.div>
            ) : (
              <motion.div
                key="past"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {pastAppts.length === 0 ? (
                  <div className="p-8 text-center bg-white/70 backdrop-blur-md rounded-3xl border border-white/80">
                    <p className="text-xs text-[#7D5A4F]">No past or cancelled appointments on record.</p>
                  </div>
                ) : (
                  pastAppts.map((appt) => {
                    const scheduled = new Date(appt.scheduled_at);
                    return (
                      <div
                        key={appt.id}
                        className="bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl p-5 flex items-center justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-black text-[#3E2723]">
                              {appt.doctor?.full_name || "Specialist Visit"}
                            </h4>
                            <span
                              className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                                appt.status === "completed"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {appt.status}
                            </span>
                          </div>
                          <p className="text-xs text-[#8D6E63] mt-0.5">
                            {scheduled.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedDoctor(
                              doctorsList.find((d) => d.id === appt.doctor_id) || doctorsList[0]
                            );
                            setShowBooking(true);
                          }}
                          className="px-3.5 py-1.5 rounded-full bg-[#8D6E63] text-white text-xs font-bold hover:bg-[#5C4033] transition-all"
                        >
                          Book Again
                        </button>
                      </div>
                    );
                  })
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* ── BOOKING MODAL ── */}
      <AnimatePresence>
        {showBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#FAF6F2] rounded-[2.5rem] border border-white shadow-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setShowBooking(false)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white text-[#8D6E63] hover:text-[#3E2723] flex items-center justify-center shadow-sm"
              >
                <X size={18} />
              </button>

              {bookingSuccess ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-black text-[#3E2723]">Appointment Confirmed!</h3>
                  <p className="text-xs text-[#7D5A4F]">
                    Successfully synced with Supabase appointments table. Your specialist has been notified.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookAppointment} className="space-y-6">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#E76F51]">
                      New Appointment
                    </span>
                    <h2 className="text-2xl font-black text-[#3E2723] mt-0.5">
                      Schedule Doctor Consultation
                    </h2>
                    <p className="text-xs text-[#8D6E63] mt-1">
                      Choose your dermatologist, time, and clinical reason.
                    </p>
                  </div>

                  {/* Doctor Selection */}
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-wider text-[#5C4033]">
                      Select Specialist
                    </label>
                    <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto pr-1">
                      {doctorsList.map((doc) => {
                        const isSelected = selectedDoctor?.id === doc.id;
                        return (
                          <div
                            key={doc.id}
                            onClick={() => setSelectedDoctor(doc)}
                            className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? "bg-white border-[#8D6E63] shadow-sm"
                                : "bg-white/60 border-[#E8D5C4] hover:bg-white/90"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-[#EADECF] flex items-center justify-center text-[#5C4033] font-bold text-xs">
                                {doc.full_name?.charAt(0) || "D"}
                              </div>
                              <div>
                                <h4 className="text-xs font-black text-[#3E2723]">{doc.full_name}</h4>
                                <p className="text-[11px] text-[#8D6E63]">{doc.specialization}</p>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-[#E76F51]">
                              ★ {doc.rating || 4.9}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-[#5C4033] mb-1.5">
                        Date
                      </label>
                      <input
                        type="date"
                        required
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full bg-white border border-[#E8D5C4] rounded-2xl px-3.5 py-2.5 text-xs text-[#3E2723] font-semibold focus:outline-none focus:border-[#8D6E63]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-[#5C4033] mb-1.5">
                        Available Slot
                      </label>
                      <select
                        value={selectedSlot}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                        className="w-full bg-white border border-[#E8D5C4] rounded-2xl px-3.5 py-2.5 text-xs text-[#3E2723] font-semibold focus:outline-none focus:border-[#8D6E63]"
                      >
                        {SLOTS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Consultation Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-[#5C4033]">
                      Consultation Purpose
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {APPT_TYPES.map((t) => (
                        <button
                          type="button"
                          key={t.id}
                          onClick={() => setSelectedType(t.id)}
                          className={`p-2.5 rounded-xl text-left border transition-all text-xs ${
                            selectedType === t.id
                              ? "bg-[#8D6E63] text-white border-[#8D6E63] font-bold shadow-sm"
                              : "bg-white border-[#E8D5C4] text-[#5C4033] hover:bg-white/80"
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#5C4033] mb-1.5">
                      Symptoms / Lesion Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Inquiring regarding high-confidence nevus on upper arm..."
                      className="w-full bg-white border border-[#E8D5C4] rounded-2xl p-3 text-xs text-[#3E2723] placeholder:text-[#A1887F] focus:outline-none focus:border-[#8D6E63]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 rounded-full bg-[#8D6E63] hover:bg-[#5C4033] text-white font-black text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {submitting ? (
                      <>
                        <RefreshCw className="animate-spin" size={14} />
                        Writing to Supabase...
                      </>
                    ) : (
                      <>
                        Confirm & Schedule Appointment
                        <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
