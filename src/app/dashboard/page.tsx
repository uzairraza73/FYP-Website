"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Calendar,
  FileText,
  MessageSquare,
  Settings,
  User,
  Bell,
  ChevronRight,
  LogOut,
  Activity,
  Scan,
  Stethoscope,
  Plus,
  RefreshCw,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import {
  getScans,
  getAppointments,
  getMessages,
} from "@/utils/supabase/queries";
import type { DbScan, Appointment, DbMessage } from "@/utils/supabase/types";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard",       href: "/dashboard"              },
  { icon: Calendar,        label: "My Appointments", href: "/dashboard/appointments" },
  { icon: FileText,        label: "Medical Records", href: "/history"                },
  { icon: MessageSquare,   label: "Messages",        href: "/dashboard/messages", badge: 1 },
  { icon: Settings,        label: "Settings",        href: "/dashboard/settings"     },
];

export default function DashboardPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [activeNav, setActiveNav] = useState("Dashboard");

  const [scans, setScans] = useState<DbScan[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [messages, setMessages] = useState<DbMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const fullName = user?.name || "Sara Khan";
  const firstName = fullName.split(" ")[0];
  const patientId = user?.email ? user.email.replace(/[^a-zA-Z0-9]/g, "-") : "patient-1";

  const fetchPatientData = async () => {
    setLoading(true);
    try {
      const [fetchedScans, fetchedAppts, fetchedMsgs] = await Promise.all([
        getScans(patientId),
        getAppointments({ patientId }),
        getMessages(patientId),
      ]);
      setScans(fetchedScans);
      setAppointments(fetchedAppts);
      setMessages(fetchedMsgs);
    } catch (err) {
      console.error("Error loading patient dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientData();
  }, [patientId]);

  const handleNav = (label: string, href: string) => {
    setActiveNav(label);
    router.push(href);
  };

  const handleLogout = () => {
    logout();
    router.push("/auth/role-selection");
  };

  const now = new Date();
  const nextAppt = appointments.find(
    (a) => new Date(a.scheduled_at) >= now && a.status !== "cancelled"
  );

  return (
    <div className="min-h-screen font-plus-jakarta bg-[#F0E8DF] flex overflow-hidden relative">
      {/* Global blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#D4A98A]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] bg-[#C69C7B]/12 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-[#E8D5C4]/30 rounded-full blur-[80px]" />
      </div>

      {/* ── SIDEBAR ── */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="relative z-20 w-[220px] flex-shrink-0 flex flex-col bg-white/70 backdrop-blur-2xl border-r border-white/60 shadow-[4px_0_30px_rgba(92,64,51,0.06)] min-h-screen"
      >
        {/* Logo */}
        <div className="px-7 pt-8 pb-6 flex items-center justify-center">
          <Link href="/" className="block">
            <Image
              src="/logo.png"
              alt="ONCURA Logo"
              width={140}
              height={50}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 space-y-1">
          {NAV_ITEMS.map(({ icon: Icon, label, href, badge }) => {
            const isActive = activeNav === label;
            return (
              <button
                key={label}
                onClick={() => handleNav(label, href)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#E8D5C4]/70 text-[#3E2723] shadow-sm font-bold"
                    : "text-[#8D6E63] hover:bg-[#F0E8DF]/80 hover:text-[#5C4033]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} />
                  <span>{label}</span>
                </div>
                {badge && (
                  <span className="w-5 h-5 rounded-full bg-[#E76F51] text-white text-[10px] font-bold flex items-center justify-center">
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom User Area */}
        <div className="p-4 border-t border-[#E8D5C4]/60">
          <div className="p-3 bg-[#F5EDE4] rounded-2xl flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-full bg-[#8D6E63] text-white font-bold flex items-center justify-center text-xs">
              {firstName.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-[#3E2723] truncate">{fullName}</p>
              <p className="text-[10px] text-[#8D6E63] capitalize">Patient Account</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full py-2 flex items-center justify-center gap-1.5 text-[11px] font-bold text-[#A1887F] hover:text-[#5C4033] transition-colors cursor-pointer"
          >
            <LogOut size={12} />
            Sign Out
          </button>
        </div>
      </motion.aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 overflow-y-auto min-h-screen relative z-10 p-8 lg:p-10">
        {/* Top greeting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-black uppercase tracking-widest text-[#E76F51]">
                Patient Health Hub
              </span>
              <span className="text-xs text-[#A1887F]">·</span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Connected to Supabase
              </span>
            </div>
            <h1 className="text-3xl font-black text-[#3E2723]">Hello, {firstName}</h1>
            <p className="text-xs text-[#8D6E63] font-medium mt-0.5">
              Track your skin scan diagnostics, upcoming doctor visits, and clinical messages.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchPatientData}
              className="p-3 rounded-2xl bg-white/70 border border-[#E8D5C4] text-[#8D6E63] hover:text-[#3E2723] hover:bg-white transition-all shadow-sm flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Sync
            </button>
            <button
              onClick={() => router.push("/scan")}
              className="px-6 py-3 rounded-2xl bg-[#8D6E63] hover:bg-[#5C4033] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer hover:-translate-y-0.5"
            >
              <Scan size={15} />
              Start New Skin Scan
            </button>
          </div>
        </div>

        {/* ── HERO BANNER: NEXT APPOINTMENT / SCAN CTA ── */}
        <div className="p-7 bg-gradient-to-r from-[#8D6E63] to-[#5C4033] text-white rounded-[2.5rem] shadow-[0_15px_40px_rgba(92,64,51,0.18)] mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-2 relative z-10 max-w-xl">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FFD8C2] flex items-center gap-1.5">
              <Sparkles size={13} />
              AI Preventive Care System
            </span>
            <h2 className="text-2xl font-black">
              {nextAppt ? "Upcoming Specialist Visit" : "Check Your Skin Health Regularly"}
            </h2>
            <p className="text-xs text-white/85 leading-relaxed font-medium">
              {nextAppt
                ? `You have a confirmed visit on ${new Date(nextAppt.scheduled_at).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} at ${new Date(nextAppt.scheduled_at).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}.`
                : "Capture high-resolution lesion photos to detect morphological irregularities early with Oncura's CNN model."}
            </p>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            {nextAppt ? (
              <button
                onClick={() => router.push("/dashboard/appointments")}
                className="px-6 py-3 rounded-full bg-white text-[#5C4033] hover:bg-[#F5EDE4] font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                View Appointment
              </button>
            ) : (
              <button
                onClick={() => router.push("/dashboard/appointments")}
                className="px-6 py-3 rounded-full bg-white text-[#5C4033] hover:bg-[#F5EDE4] font-black text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                Book Consultation
              </button>
            )}
          </div>
        </div>

        {/* ── TWO COLUMN SECTION: RECENT SCANS & UPCOMING SCHEDULE ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Left: Recent Skin Scans */}
          <div className="lg:col-span-7 bg-white/80 backdrop-blur-xl rounded-3xl border border-white/90 p-6 shadow-[0_6px_30px_rgba(92,64,51,0.04)]">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-black text-[#3E2723] flex items-center gap-2">
                  <Scan size={18} className="text-[#E76F51]" />
                  Recent Skin Scans
                </h3>
                <p className="text-xs text-[#8D6E63]">
                  Synchronized from Supabase <code className="font-mono">scans</code> & <code className="font-mono">scan-images</code>
                </p>
              </div>

              <button
                onClick={() => router.push("/history")}
                className="text-xs font-bold text-[#8D6E63] hover:text-[#3E2723] cursor-pointer"
              >
                View All
              </button>
            </div>

            {loading ? (
              <div className="p-8 text-center space-y-2">
                <RefreshCw className="animate-spin text-[#8D6E63] mx-auto" size={24} />
                <p className="text-xs text-[#7D5A4F]">Loading scans...</p>
              </div>
            ) : scans.length === 0 ? (
              <div className="p-8 text-center bg-[#FAF6F2] rounded-2xl border border-dashed border-[#E8D5C4]">
                <p className="text-xs text-[#7D5A4F]">No scans recorded yet.</p>
                <button
                  onClick={() => router.push("/scan")}
                  className="mt-2 text-xs font-bold text-[#8D6E63] hover:underline cursor-pointer"
                >
                  Upload your first skin photo
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {scans.slice(0, 3).map((scan) => {
                  const hasDoctorNotes = Boolean(scan.doctor_notes);
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
                              {scan.condition || "Skin Lesion"}
                            </h4>
                            <span
                              className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                hasDoctorNotes
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {hasDoctorNotes ? "Doctor Reviewed" : "Awaiting Review"}
                            </span>
                          </div>

                          <p className="text-[11px] text-[#8D6E63]">
                            Confidence: <strong className="text-[#3E2723]">{scan.confidence_score}%</strong> · ID #{scan.id.slice(0, 8)}
                          </p>

                          {scan.doctor_notes && (
                            <p className="text-[10px] text-[#5C4033] mt-1 bg-[#F5EDE4] px-2 py-0.5 rounded border border-[#E8D5C4]/70">
                              <strong className="text-[#3E2723]">Doctor:</strong> &quot;{scan.doctor_notes}&quot;
                            </p>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => router.push("/result")}
                        className="px-3.5 py-1.5 rounded-xl bg-white border border-[#E8D5C4] hover:bg-[#8D6E63] hover:text-white text-[#8D6E63] text-xs font-bold transition-all cursor-pointer flex-shrink-0"
                      >
                        Details
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right: Appointments & Quick Actions */}
          <div className="lg:col-span-5 space-y-6">
            {/* Appointments preview */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/90 p-6 shadow-[0_6px_30px_rgba(92,64,51,0.04)]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-black text-[#3E2723] flex items-center gap-2">
                    <Calendar size={18} className="text-[#8D6E63]" />
                    Upcoming Visits
                  </h3>
                  <p className="text-xs text-[#8D6E63]">From Supabase appointments table</p>
                </div>
                <Link
                  href="/dashboard/appointments"
                  className="text-xs font-bold text-[#8D6E63] hover:text-[#3E2723]"
                >
                  Manage
                </Link>
              </div>

              {appointments.length === 0 ? (
                <div className="text-center py-6 space-y-2">
                  <p className="text-xs text-[#7D5A4F]">No upcoming appointments.</p>
                  <button
                    onClick={() => router.push("/dashboard/appointments")}
                    className="text-xs font-black text-[#8D6E63] hover:underline"
                  >
                    + Schedule with Doctor
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {appointments.slice(0, 2).map((appt) => {
                    const scheduled = new Date(appt.scheduled_at);
                    return (
                      <div
                        key={appt.id}
                        className="p-3.5 rounded-2xl bg-[#FAF6F2] border border-[#E8D5C4]/70 flex items-center justify-between"
                      >
                        <div>
                          <p className="text-xs font-black text-[#3E2723]">
                            {appt.doctor?.full_name || "Specialist Dermatologist"}
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

            {/* Live Chat Banner */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/90 p-6 shadow-[0_6px_30px_rgba(92,64,51,0.04)]">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-black text-[#3E2723] flex items-center gap-2">
                  <MessageSquare size={16} className="text-[#E76F51]" />
                  Direct Doctor Messaging
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-xs text-[#7D5A4F] mb-4">
                Have questions about your skin scan or treatment plan? Message your doctor directly in real-time.
              </p>
              <button
                onClick={() => router.push("/dashboard/messages")}
                className="w-full py-3 rounded-full bg-[#8D6E63] hover:bg-[#5C4033] text-white text-xs font-black uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                Open Message Inbox <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
