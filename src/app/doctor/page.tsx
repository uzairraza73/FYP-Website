"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  Settings,
  ArrowRight,
  Activity,
  LogOut,
  Scan,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  RefreshCw,
  Edit3,
  X,
  Stethoscope,
  ExternalLink,
} from "lucide-react";
import {
  getScans,
  getAppointments,
  getMessages,
  updateScanDoctorNotes,
} from "@/utils/supabase/queries";
import type { DbScan, Appointment, DbMessage } from "@/utils/supabase/types";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/doctor" },
  { icon: Users,           label: "Patients",  href: "/doctor/patients" },
  { icon: Calendar,        label: "Schedule",  href: "/doctor/schedule" },
  { icon: MessageSquare,   label: "Messages",  href: "/doctor/messages" },
  { icon: Settings,        label: "Settings",  href: "/doctor/settings" },
];

export default function DoctorPortalPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("Dashboard");

  // State from Supabase
  const [scans, setScans] = useState<DbScan[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [messages, setMessages] = useState<DbMessage[]>([]);
  const [loading, setLoading] = useState(true);

  // Review modal state
  const [selectedScanForReview, setSelectedScanForReview] = useState<DbScan | null>(null);
  const [reviewNote, setReviewNote] = useState("");
  const [isSavingReview, setIsSavingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const doctorName = user?.name || "Dr. Ahmed";

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [fetchedScans, fetchedAppts, fetchedMsgs] = await Promise.all([
        getScans(),
        getAppointments({ doctorId: "d1" }),
        getMessages("d1"),
      ]);
      setScans(fetchedScans);
      setAppointments(fetchedAppts);
      setMessages(fetchedMsgs);
    } catch (err) {
      console.error("Error loading doctor dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleOpenReview = (scan: DbScan) => {
    setSelectedScanForReview(scan);
    setReviewNote(scan.doctor_notes || "");
    setReviewSuccess(false);
  };

  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedScanForReview) return;

    setIsSavingReview(true);
    try {
      await updateScanDoctorNotes(selectedScanForReview.id, reviewNote);
      setScans((prev) =>
        prev.map((s) =>
          s.id === selectedScanForReview.id ? { ...s, doctor_notes: reviewNote } : s
        )
      );
      setReviewSuccess(true);
      setTimeout(() => {
        setReviewSuccess(false);
        setSelectedScanForReview(null);
      }, 1500);
    } catch (err) {
      console.error("Error updating scan doctor notes:", err);
    } finally {
      setIsSavingReview(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/auth/role-selection");
  };

  const pendingReviewsCount = scans.filter((s) => !s.doctor_notes).length;
  const upcomingCount = appointments.filter((a) => a.status === "confirmed" || a.status === "pending").length;

  return (
    <div className="min-h-screen font-plus-jakarta bg-[#F0E8DF] flex overflow-hidden relative">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#D4A98A]/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] bg-[#C69C7B]/20 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-[#E8D5C4]/40 rounded-full blur-[80px]" />
      </div>

      {/* ── LEFT SIDEBAR ── */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative z-10 w-[220px] flex-shrink-0 flex flex-col bg-white/60 backdrop-blur-xl border-r border-white/50 shadow-[4px_0_30px_rgba(92,64,51,0.06)] min-h-screen"
      >
        {/* Logo */}
        <div className="px-8 pt-8 pb-6">
          <Link href="/" className="block">
            <div className="flex items-start gap-1">
              <div>
                <span className="text-3xl font-black text-[#3E2723] leading-none">ON</span>
                <div className="flex gap-0.5 mt-0.5 ml-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E76F51]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#8D6E63]" />
                </div>
              </div>
            </div>
            <p className="text-[9px] font-black tracking-[0.25em] text-[#8D6E63] uppercase mt-1">
              ONCURA DOCTOR
            </p>
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-4 space-y-1">
          {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
            const isActive = activeNav === label;
            return (
              <button
                key={label}
                onClick={() => {
                  setActiveNav(label);
                  router.push(href);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#F0E8DF] text-[#3E2723] shadow-sm font-bold"
                    : "text-[#8D6E63] hover:bg-[#F0E8DF]/60 hover:text-[#5C4033]"
                }`}
              >
                <Icon size={18} className={isActive ? "text-[#5C4033]" : "text-[#A1887F]"} />
                {label}
              </button>
            );
          })}
        </nav>

        {/* Bottom branding & logout */}
        <div className="px-6 pb-8 pt-4 border-t border-[#E8D5C4]/60">
          <div className="flex items-center gap-2 text-[#8D6E63] mb-1">
            <Activity size={14} />
            <span className="text-[10px] font-bold">Clinical Care.</span>
          </div>
          <p className="text-[9px] text-[#A1887F] font-medium ml-5">Supabase Connected</p>

          <button
            onClick={handleLogout}
            className="mt-4 flex items-center gap-2 text-[10px] font-bold text-[#A1887F] hover:text-[#5C4033] transition-colors uppercase tracking-wider cursor-pointer"
          >
            <LogOut size={12} />
            Sign Out
          </button>
        </div>
      </motion.aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 overflow-y-auto min-h-screen relative z-10 p-8 lg:p-10">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#E76F51]">
                Physician Portal
              </span>
              <span className="text-xs text-[#A1887F]">·</span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Database Synced
              </span>
            </div>
            <h1 className="text-3xl font-black text-[#3E2723]">Welcome, {doctorName}</h1>
            <p className="text-xs text-[#8D6E63] font-medium mt-0.5">
              Review patient skin scan results, incoming appointments, and clinical messages.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchDashboardData}
              className="p-3 rounded-2xl bg-white/70 border border-[#E8D5C4] text-[#8D6E63] hover:text-[#3E2723] hover:bg-white transition-all shadow-sm flex items-center gap-2 text-xs font-bold cursor-pointer"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Sync DB
            </button>
            <button
              onClick={() => router.push("/doctor/schedule")}
              className="px-5 py-3 rounded-2xl bg-[#8D6E63] hover:bg-[#5C4033] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer"
            >
              Manage Schedule
            </button>
          </div>
        </div>

        {/* ── METRIC CARDS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="p-6 bg-white/75 backdrop-blur-xl rounded-3xl border border-white/90 shadow-[0_6px_25px_rgba(92,64,51,0.04)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#A1887F]">
                Scans To Review
              </span>
              <div className="w-8 h-8 rounded-full bg-[#FAF6F2] flex items-center justify-center text-[#E76F51]">
                <Scan size={16} />
              </div>
            </div>
            <div className="text-3xl font-black text-[#3E2723]">{pendingReviewsCount}</div>
            <p className="text-[11px] text-[#8D6E63] font-medium mt-1">Stored in Supabase scans</p>
          </div>

          <div className="p-6 bg-white/75 backdrop-blur-xl rounded-3xl border border-white/90 shadow-[0_6px_25px_rgba(92,64,51,0.04)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#A1887F]">
                Active Appointments
              </span>
              <div className="w-8 h-8 rounded-full bg-[#FAF6F2] flex items-center justify-center text-blue-600">
                <Calendar size={16} />
              </div>
            </div>
            <div className="text-3xl font-black text-[#3E2723]">{upcomingCount}</div>
            <p className="text-[11px] text-[#8D6E63] font-medium mt-1">Appointments scheduled</p>
          </div>

          <div className="p-6 bg-white/75 backdrop-blur-xl rounded-3xl border border-white/90 shadow-[0_6px_25px_rgba(92,64,51,0.04)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#A1887F]">
                Total Scans Stored
              </span>
              <div className="w-8 h-8 rounded-full bg-[#FAF6F2] flex items-center justify-center text-emerald-600">
                <ShieldCheck size={16} />
              </div>
            </div>
            <div className="text-3xl font-black text-[#3E2723]">{scans.length}</div>
            <p className="text-[11px] text-[#8D6E63] font-medium mt-1">scan-images bucket</p>
          </div>

          <div className="p-6 bg-white/75 backdrop-blur-xl rounded-3xl border border-white/90 shadow-[0_6px_25px_rgba(92,64,51,0.04)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#A1887F]">
                Recent Inquiries
              </span>
              <div className="w-8 h-8 rounded-full bg-[#FAF6F2] flex items-center justify-center text-amber-600">
                <MessageSquare size={16} />
              </div>
            </div>
            <div className="text-3xl font-black text-[#3E2723]">{messages.length}</div>
            <p className="text-[11px] text-[#8D6E63] font-medium mt-1">Realtime message records</p>
          </div>
        </div>

        {/* ── TWO-COLUMN SECTION: SCANS TO REVIEW & UPCOMING VISITS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Left: Patient Scans Review Station */}
          <div className="lg:col-span-7 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/90 p-6 shadow-[0_6px_30px_rgba(92,64,51,0.04)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-black text-[#3E2723] flex items-center gap-2">
                    <Scan className="text-[#E76F51]" size={20} />
                    Patient AI Skin Scans
                  </h2>
                  <p className="text-xs text-[#8D6E63]">
                    Images uploaded from the patient portal · Click to review & add notes
                  </p>
                </div>
                <span className="text-xs font-bold text-[#8D6E63] bg-[#F5EDE4] px-3 py-1 rounded-full border border-[#E8D5C4]">
                  {scans.length} Scans Available
                </span>
              </div>

              {loading ? (
                <div className="p-10 text-center space-y-2">
                  <RefreshCw className="animate-spin text-[#8D6E63] mx-auto" size={24} />
                  <p className="text-xs text-[#7D5A4F]">Syncing scans from Supabase...</p>
                </div>
              ) : scans.length === 0 ? (
                <div className="p-10 text-center bg-[#FAF6F2] rounded-2xl border border-dashed border-[#E8D5C4]">
                  <p className="text-xs text-[#7D5A4F]">No scans uploaded yet.</p>
                </div>
              ) : (
                <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
                  {scans.map((scan) => {
                    const isReviewed = Boolean(scan.doctor_notes);
                    return (
                      <div
                        key={scan.id}
                        className="p-4 rounded-2xl bg-[#FAF6F2] border border-[#E8D5C4]/70 flex items-center justify-between gap-4 hover:bg-white transition-all shadow-xs"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-[#E8D5C4] relative flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={scan.image_url}
                              alt="Scan"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <h4 className="text-xs font-black text-[#3E2723]">
                                {scan.condition || "Skin Lesion Evaluation"}
                              </h4>
                              <span
                                className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                  isReviewed
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {isReviewed ? "Reviewed" : "Needs Review"}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#8D6E63]">
                              Confidence: <strong className="text-[#3E2723]">{scan.confidence_score}%</strong> · Patient: {scan.patient_id}
                            </p>
                            {scan.doctor_notes ? (
                              <p className="text-[10px] text-[#5C4033] mt-1 italic line-clamp-1">
                                &quot;{scan.doctor_notes}&quot;
                              </p>
                            ) : (
                              <p className="text-[10px] text-[#A1887F] mt-1">
                                Awaiting doctor diagnostic feedback
                              </p>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => handleOpenReview(scan)}
                          className="px-3.5 py-2 rounded-xl bg-[#8D6E63] hover:bg-[#5C4033] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0 shadow-sm"
                        >
                          <Edit3 size={13} />
                          {isReviewed ? "Edit Notes" : "Review"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#E8D5C4]/60 mt-4 flex items-center justify-between text-xs text-[#8D6E63]">
              <span>Direct updates saved to Supabase <code className="font-mono">public.scans</code></span>
              <button
                onClick={() => router.push("/doctor/patients")}
                className="font-bold text-[#3E2723] hover:underline flex items-center gap-1"
              >
                View Patient Profiles <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* Right: Upcoming Appointments & Realtime Messages Preview */}
          <div className="lg:col-span-5 space-y-6">
            {/* Appointments Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/90 p-6 shadow-[0_6px_30px_rgba(92,64,51,0.04)]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-black text-[#3E2723] flex items-center gap-2">
                    <Calendar className="text-[#8D6E63]" size={18} />
                    Upcoming Visits
                  </h3>
                  <p className="text-xs text-[#8D6E63]">From Supabase appointments</p>
                </div>
                <Link
                  href="/doctor/schedule"
                  className="text-xs font-bold text-[#8D6E63] hover:text-[#3E2723]"
                >
                  View All
                </Link>
              </div>

              {appointments.length === 0 ? (
                <p className="text-xs text-[#7D5A4F] py-4 text-center">No scheduled appointments.</p>
              ) : (
                <div className="space-y-3">
                  {appointments.slice(0, 3).map((appt) => {
                    const scheduled = new Date(appt.scheduled_at);
                    return (
                      <div
                        key={appt.id}
                        className="p-3.5 rounded-2xl bg-[#FAF6F2] border border-[#E8D5C4]/60 flex items-center justify-between"
                      >
                        <div>
                          <p className="text-xs font-black text-[#3E2723]">
                            {appt.patient?.full_name || "Sara Khan"}
                          </p>
                          <p className="text-[11px] text-[#8D6E63] flex items-center gap-1.5 mt-0.5">
                            <Clock size={11} />
                            {scheduled.toLocaleDateString("en-US", { month: "short", day: "numeric" })} · {scheduled.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                        <span className="text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                          {appt.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quick Messages Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/90 p-6 shadow-[0_6px_30px_rgba(92,64,51,0.04)]">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-base font-black text-[#3E2723] flex items-center gap-2">
                    <MessageSquare className="text-[#E76F51]" size={18} />
                    Live Patient Chat
                  </h3>
                  <p className="text-xs text-[#8D6E63]">Realtime messaging channel</p>
                </div>
                <Link
                  href="/doctor/messages"
                  className="text-xs font-bold text-[#8D6E63] hover:text-[#3E2723]"
                >
                  Open Inbox
                </Link>
              </div>

              <p className="text-xs text-[#7D5A4F] mb-4">
                Communicate directly with patients, answer inquiries, and share clinical instructions in real-time.
              </p>

              <button
                onClick={() => router.push("/doctor/messages")}
                className="w-full py-3 rounded-full bg-[#8D6E63] hover:bg-[#5C4033] text-white text-xs font-black uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                Launch Consultation Inbox <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ── SCAN REVIEW MODAL ── */}
      <AnimatePresence>
        {selectedScanForReview && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#FAF6F2] rounded-[2.5rem] border border-white shadow-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setSelectedScanForReview(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white text-[#8D6E63] hover:text-[#3E2723] flex items-center justify-center shadow-sm cursor-pointer"
              >
                <X size={18} />
              </button>

              {reviewSuccess ? (
                <div className="p-8 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-xl font-black text-[#3E2723]">Clinical Notes Saved!</h3>
                  <p className="text-xs text-[#7D5A4F]">
                    Successfully updated <code className="font-mono">doctor_notes</code> for scan #{selectedScanForReview.id} in Supabase.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSaveReview} className="space-y-5">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#E76F51]">
                      Clinical Review
                    </span>
                    <h2 className="text-2xl font-black text-[#3E2723] mt-0.5">
                      Doctor Scan Evaluation
                    </h2>
                    <p className="text-xs text-[#8D6E63] mt-0.5">
                      Add physician findings and advice for this skin scan.
                    </p>
                  </div>

                  {/* Scan Preview Card */}
                  <div className="p-4 rounded-2xl bg-white border border-[#E8D5C4] flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={selectedScanForReview.image_url}
                        alt="Scan target"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-[#3E2723]">
                        {selectedScanForReview.condition || "Melanocytic Lesion"}
                      </h4>
                      <p className="text-xs text-[#8D6E63] mt-0.5">
                        Confidence: <strong className="text-[#3E2723]">{selectedScanForReview.confidence_score}%</strong>
                      </p>
                      <p className="text-[11px] text-[#A1887F]">
                        Patient ID: {selectedScanForReview.patient_id}
                      </p>
                    </div>
                  </div>

                  {/* Doctor Notes Input */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider text-[#5C4033] mb-1.5">
                      Physician Notes & Clinical Advice
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={reviewNote}
                      onChange={(e) => setReviewNote(e.target.value)}
                      placeholder="e.g. Lesion appears low-risk with regular pigment network. Recommend self-monitoring and annual clinical screening."
                      className="w-full bg-white border border-[#E8D5C4] rounded-2xl p-3.5 text-xs text-[#3E2723] placeholder:text-[#A1887F] focus:outline-none focus:border-[#8D6E63]"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setReviewNote("Low-risk benign nevus. No immediate intervention required. Follow up in 6 months.")}
                      className="text-[10px] px-2.5 py-1 rounded-full bg-white border border-[#E8D5C4] text-[#8D6E63] font-bold"
                    >
                      + Benign Preset
                    </button>
                    <button
                      type="button"
                      onClick={() => setReviewNote("Atypical border pattern observed. Recommended in-person dermoscopic biopsy.")}
                      className="text-[10px] px-2.5 py-1 rounded-full bg-white border border-[#E8D5C4] text-[#8D6E63] font-bold"
                    >
                      + Atypical Preset
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isSavingReview}
                    className="w-full py-4 rounded-full bg-[#8D6E63] hover:bg-[#5C4033] text-white font-black text-xs uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSavingReview ? (
                      <>
                        <RefreshCw className="animate-spin" size={14} />
                        Writing to Supabase...
                      </>
                    ) : (
                      <>
                        Save Clinical Notes
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
