"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/utils/supabase/client";
import {
  getPatientScans,
  getPatientDocuments,
  getPatientAppointments,
  insertScanResult,
} from "@/utils/supabase/queries";
import { uploadScanImage } from "@/utils/supabase/storage";
import type { ScanResult, MedicalDocument, Appointment } from "@/utils/supabase/types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FileText, Activity, Calendar, Upload, Download,
  ChevronLeft, ChevronRight, Search, Filter, Loader2,
  AlertCircle, CheckCircle2, Image as ImageIcon, X,
  RefreshCw, FolderOpen, Clock, Eye,
} from "lucide-react";
import {
  LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip,
} from "recharts";

const RISK_STYLES = {
  Low:    { badge: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-400", bar: "bg-emerald-400" },
  Medium: { badge: "bg-amber-100 text-amber-700",     dot: "bg-amber-400",   bar: "bg-amber-400" },
  High:   { badge: "bg-red-100 text-red-600",         dot: "bg-red-400",     bar: "bg-red-500" },
};

const DOC_CATEGORY_ICON: Record<string, string> = {
  prescription: "💊",
  lab_report:   "🧪",
  imaging:      "🩻",
  referral:     "📋",
  other:        "📄",
};

type Tab = "scans" | "documents" | "appointments";

export default function MedicalRecordsPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("scans");
  const [search, setSearch] = useState("");

  const [scans, setScans] = useState<ScanResult[]>([]);
  const [documents, setDocuments] = useState<MedicalDocument[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Scan upload
  const [uploadOpen, setUploadOpen] = useState(false);
  const [scanFile, setScanFile] = useState<File | null>(null);
  const [scanPreview, setScanPreview] = useState<string | null>(null);
  const [scanCondition, setScanCondition] = useState("");
  const [scanRisk, setScanRisk] = useState<ScanResult["risk_level"]>("Low");
  const [scanConf, setScanConf] = useState(85);
  const [uploadingS, setUploadingS] = useState(false);
  const [uploadErr, setUploadErr] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Selected scan detail
  const [selectedScan, setSelectedScan] = useState<ScanResult | null>(null);

  // Get current user
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUserId(data.user.id);
    });
  }, []);

  // Load all patient data
  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    Promise.all([
      getPatientScans(userId),
      getPatientDocuments(userId),
      getPatientAppointments(userId),
    ]).then(([s, d, a]) => {
      setScans(s);
      setDocuments(d);
      setAppointments(a);
      setLoading(false);
    });
  }, [userId]);

  // Handle scan file selection + preview
  const handleScanFile = (file: File) => {
    setScanFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setScanPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Upload scan to Supabase
  const handleUploadScan = async () => {
    if (!scanFile || !userId || !scanCondition) return;
    setUploadingS(true);
    setUploadErr(null);
    try {
      const { url, path } = await uploadScanImage(scanFile, userId);
      const newScan = await insertScanResult({
        patient_id: userId,
        doctor_id: null,
        image_url: url,
        condition: scanCondition,
        risk_level: scanRisk,
        confidence: scanConf,
        recommendations: [],
        notes: null,
      });
      setScans((prev) => [newScan, ...prev]);
      setUploadOpen(false);
      setScanFile(null);
      setScanPreview(null);
      setScanCondition("");
    } catch (e) {
      setUploadErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploadingS(false);
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-PK", {
      year: "numeric", month: "short", day: "numeric",
    });

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Filtered data
  const filteredScans = scans.filter((s) =>
    s.condition.toLowerCase().includes(search.toLowerCase())
  );
  const filteredDocs = documents.filter((d) =>
    d.file_name.toLowerCase().includes(search.toLowerCase()) ||
    d.category.toLowerCase().includes(search.toLowerCase())
  );
  const filteredAppts = appointments.filter((a) => {
    const doctorName = (a.doctor as { full_name?: string } | undefined)?.full_name ?? "";
    return doctorName.toLowerCase().includes(search.toLowerCase());
  });

  // Trend chart data
  const trendData = [...scans].reverse().map((s) => ({
    date: new Date(s.created_at).toLocaleDateString("en-PK", { month: "short", day: "numeric" }),
    confidence: s.confidence,
  }));

  const highRiskCount = scans.filter((s) => s.risk_level === "High").length;

  return (
    <div className="min-h-screen bg-[#F0E8DF] font-plus-jakarta relative overflow-hidden">
      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#D4A98A]/25 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] bg-[#C69C7B]/15 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 px-6 pt-24 pb-20 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="w-10 h-10 rounded-full bg-white/80 border border-white shadow-sm flex items-center justify-center text-[#8D6E63] hover:bg-white transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h1 className="text-4xl font-black text-[#3E2723] leading-tight">Medical Records</h1>
              <p className="text-xs text-[#8D6E63] uppercase tracking-widest font-bold mt-0.5">
                Your complete health history — synced with Supabase
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A1887F]" size={14} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search records..."
                className="pl-10 pr-4 py-2.5 rounded-full border border-white/80 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-[#D4A98A] outline-none text-xs w-56 text-[#3E2723] placeholder:text-[#A1887F] font-semibold shadow-sm"
              />
            </div>
            <button
              onClick={() => { setUploadOpen(true); setUploadErr(null); }}
              className="flex items-center gap-1.5 bg-[#8D6E63] hover:bg-[#5C4033] text-white text-xs font-black rounded-full px-4 py-2.5 transition-all shadow-md"
            >
              <Upload size={13} /> Upload Scan
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="animate-spin text-[#8D6E63]" size={36} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ── Main Column ─────────────────────────────────────────── */}
            <div className="lg:col-span-2 space-y-5">
              {/* Tabs */}
              <div className="flex gap-1 p-1.5 bg-white/60 backdrop-blur-md rounded-2xl w-fit border border-[#E8D5C4] shadow-sm">
                {([
                  { key: "scans",        label: "AI Scans",    count: scans.length },
                  { key: "documents",    label: "Documents",   count: documents.length },
                  { key: "appointments", label: "Appointments", count: appointments.length },
                ] as const).map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${
                      activeTab === tab.key
                        ? "bg-[#8D6E63] text-white shadow-md"
                        : "text-[#A1887F] hover:text-[#5C4033]"
                    }`}
                  >
                    {tab.label}
                    <span className={`ml-1.5 px-1.5 py-0.5 text-[9px] rounded-full ${
                      activeTab === tab.key ? "bg-white/20" : "bg-[#E8D5C4] text-[#8D6E63]"
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {/* ── Scans Tab ─────────────────────────────────────── */}
                {activeTab === "scans" && (
                  <motion.div
                    key="scans"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    {filteredScans.length === 0 ? (
                      <div className="bg-white/75 backdrop-blur-xl border border-white/90 rounded-3xl p-12 text-center">
                        <ImageIcon size={40} className="text-[#D7CCC8] mx-auto mb-3" />
                        <h3 className="text-lg font-black text-[#3E2723] mb-1">No Scan Records</h3>
                        <p className="text-sm text-[#7D5A4F]">Upload a skin scan to start tracking your health.</p>
                        <button
                          onClick={() => setUploadOpen(true)}
                          className="mt-5 px-6 py-2.5 bg-[#8D6E63] text-white text-sm font-black rounded-full shadow-md hover:bg-[#5C4033] transition-all"
                        >
                          Upload First Scan
                        </button>
                      </div>
                    ) : (
                      filteredScans.map((scan, idx) => {
                        const r = RISK_STYLES[scan.risk_level] ?? RISK_STYLES.Low;
                        return (
                          <motion.div
                            key={scan.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.04 }}
                            onClick={() => setSelectedScan(scan)}
                            className="bg-white/75 backdrop-blur-xl border border-white/90 rounded-3xl p-4 flex items-center gap-4 cursor-pointer group hover:-translate-y-0.5 transition-all shadow-sm hover:shadow-md overflow-hidden"
                          >
                            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#EADBCE]/30 rounded-full blur-2xl pointer-events-none" />

                            <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={scan.image_url} alt="scan" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>

                            <div className="flex-1 min-w-0 relative z-10">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${r.badge}`}>
                                  {scan.risk_level} Risk
                                </span>
                                <span className="text-[10px] text-[#A1887F] font-bold">{formatDate(scan.created_at)}</span>
                                {scan.reviewed_by_doctor && (
                                  <span className="flex items-center gap-0.5 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                                    <CheckCircle2 size={9} /> Reviewed
                                  </span>
                                )}
                              </div>
                              <h3 className="text-base font-black text-[#3E2723]">{scan.condition}</h3>
                              <div className="flex items-center gap-1.5 mt-1">
                                <div className="flex-1 h-1.5 bg-[#F0E8DF] rounded-full overflow-hidden max-w-[100px]">
                                  <div className={`h-full ${r.bar} rounded-full`} style={{ width: `${scan.confidence}%` }} />
                                </div>
                                <span className="text-[10px] font-bold text-[#7D5A4F]">{scan.confidence}% confidence</span>
                              </div>
                              {scan.notes && (
                                <p className="text-[10px] text-[#8D6E63] mt-1 truncate">📋 {scan.notes}</p>
                              )}
                            </div>

                            <div className="w-8 h-8 rounded-full bg-[#F0E8DF] border border-[#E8D5C4] flex items-center justify-center text-[#8D6E63] group-hover:bg-[#8D6E63] group-hover:text-white transition-all z-10">
                              <Eye size={14} />
                            </div>
                          </motion.div>
                        );
                      })
                    )}
                  </motion.div>
                )}

                {/* ── Documents Tab ─────────────────────────────────── */}
                {activeTab === "documents" && (
                  <motion.div
                    key="documents"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    {filteredDocs.length === 0 ? (
                      <div className="bg-white/75 backdrop-blur-xl border border-white/90 rounded-3xl p-12 text-center">
                        <FolderOpen size={40} className="text-[#D7CCC8] mx-auto mb-3" />
                        <h3 className="text-lg font-black text-[#3E2723] mb-1">No Documents</h3>
                        <p className="text-sm text-[#7D5A4F]">Your doctor will upload prescriptions and reports here.</p>
                      </div>
                    ) : (
                      filteredDocs.map((doc, idx) => (
                        <motion.div
                          key={doc.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.04 }}
                          className="bg-white/75 backdrop-blur-xl border border-white/90 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-all"
                        >
                          <div className="w-12 h-12 rounded-2xl bg-[#F5EDE4] border border-[#E8D5C4] flex items-center justify-center text-2xl flex-shrink-0">
                            {DOC_CATEGORY_ICON[doc.category] ?? "📄"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-black text-[#3E2723] truncate">{doc.file_name}</p>
                            <div className="flex items-center gap-2 text-[10px] text-[#A1887F] mt-0.5">
                              <span className="capitalize">{doc.category.replace("_", " ")}</span>
                              <span>·</span>
                              <span>{formatFileSize(doc.file_size)}</span>
                              <span>·</span>
                              <span>{formatDate(doc.created_at)}</span>
                              {doc.uploader && (
                                <>
                                  <span>·</span>
                                  <span>by {(doc.uploader as { full_name?: string })?.full_name}</span>
                                </>
                              )}
                            </div>
                            {doc.description && (
                              <p className="text-[10px] text-[#8D6E63] mt-0.5 truncate">{doc.description}</p>
                            )}
                          </div>
                          <a
                            href={doc.file_url}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-9 h-9 rounded-full bg-[#F5EDE4] flex items-center justify-center text-[#8D6E63] hover:bg-[#8D6E63] hover:text-white transition-all flex-shrink-0"
                          >
                            <Download size={14} />
                          </a>
                        </motion.div>
                      ))
                    )}
                  </motion.div>
                )}

                {/* ── Appointments Tab ──────────────────────────────── */}
                {activeTab === "appointments" && (
                  <motion.div
                    key="appointments"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    {filteredAppts.length === 0 ? (
                      <div className="bg-white/75 backdrop-blur-xl border border-white/90 rounded-3xl p-12 text-center">
                        <Calendar size={40} className="text-[#D7CCC8] mx-auto mb-3" />
                        <h3 className="text-lg font-black text-[#3E2723] mb-1">No Appointments</h3>
                        <p className="text-sm text-[#7D5A4F]">Book an appointment to see your history here.</p>
                        <Link href="/dashboard/appointments"
                          className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 bg-[#8D6E63] text-white text-sm font-black rounded-full shadow-md hover:bg-[#5C4033] transition-all"
                        >
                          Book Appointment <ChevronRight size={14} />
                        </Link>
                      </div>
                    ) : (
                      filteredAppts.map((appt, idx) => {
                        const statusStyle = {
                          pending:   "bg-amber-100 text-amber-700",
                          confirmed: "bg-blue-100 text-blue-700",
                          completed: "bg-emerald-100 text-emerald-700",
                          cancelled: "bg-red-100 text-red-600",
                        }[appt.status];
                        return (
                          <motion.div
                            key={appt.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.04 }}
                            className="bg-white/75 backdrop-blur-xl border border-white/90 rounded-2xl p-5 shadow-sm"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-[#F0E8DF] flex items-center justify-center text-[#8D6E63]">
                                  <Calendar size={22} />
                                </div>
                                <div>
                                  <p className="text-sm font-black text-[#3E2723]">
                                    {(appt.doctor as { full_name?: string } | undefined)?.full_name ?? "Doctor"}
                                  </p>
                                  <p className="text-[10px] text-[#8D6E63]">
                                    {(appt.doctor as { specialty?: string } | undefined)?.specialty ?? "Specialist"}
                                  </p>
                                </div>
                              </div>
                              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full capitalize ${statusStyle}`}>
                                {appt.status}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 mt-3 ml-15 pl-15 text-xs text-[#8D6E63]">
                              <span className="flex items-center gap-1">
                                <Calendar size={11} /> {formatDate(appt.appointment_date ?? "")}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={11} /> {appt.appointment_time}
                              </span>
                              <span className="capitalize">{appt.type}</span>
                            </div>
                            {appt.notes && (
                              <p className="text-xs text-[#7D5A4F] mt-2 pl-15 truncate">📝 {appt.notes}</p>
                            )}
                          </motion.div>
                        );
                      })
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Sidebar ─────────────────────────────────────────────── */}
            <div className="lg:col-span-1 space-y-5">
              {/* Stats summary */}
              <div className="bg-white/75 backdrop-blur-xl border border-white/90 rounded-[2rem] p-6 shadow-sm space-y-4">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#8D6E63] flex items-center gap-2">
                  <Activity size={14} className="text-[#E76F51]" /> Health Summary
                </h3>
                {[
                  { label: "Total AI Scans", value: scans.length, color: "text-[#3E2723]" },
                  { label: "High Risk Scans", value: highRiskCount, color: highRiskCount > 0 ? "text-red-500" : "text-[#3E2723]" },
                  { label: "Documents", value: documents.length, color: "text-[#3E2723]" },
                  { label: "Appointments", value: appointments.length, color: "text-[#3E2723]" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-xs text-[#8D6E63] font-medium">{label}</span>
                    <span className={`text-sm font-black ${color}`}>{value}</span>
                  </div>
                ))}
                {scans.length > 0 && (
                  <div className="pt-2 border-t border-[#F0E8DF]">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#8D6E63] font-medium">Avg. Confidence</span>
                      <span className="font-black text-[#E76F51]">
                        {Math.round(scans.reduce((a, s) => a + s.confidence, 0) / scans.length)}%
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Confidence Trend Chart */}
              <div className="bg-white/75 backdrop-blur-xl border border-white/90 rounded-[2rem] p-6 shadow-sm">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#8D6E63] mb-4 flex items-center gap-2">
                  <AlertCircle size={14} className="text-[#E76F51]" /> Confidence Trend
                </h3>
                <div className="h-36">
                  {trendData.length > 1 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <Line
                          type="monotone"
                          dataKey="confidence"
                          stroke="#8D6E63"
                          strokeWidth={3}
                          dot={{ r: 4, fill: "#E76F51", strokeWidth: 0 }}
                          activeDot={{ r: 6, fill: "#E76F51" }}
                        />
                        <XAxis dataKey="date" hide />
                        <YAxis hide domain={["dataMin - 10", "dataMax + 10"]} />
                        <Tooltip
                          contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontWeight: "bold", color: "#3E2723" }}
                          itemStyle={{ color: "#E76F51" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center bg-[#F5EDE4] rounded-2xl border border-[#E8D5C4]">
                      <p className="text-[10px] text-[#A1887F] font-bold uppercase tracking-wider px-4 text-center">
                        Need 2+ scans to show trend
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick links */}
              <div className="bg-white/75 backdrop-blur-xl border border-white/90 rounded-[2rem] p-5 shadow-sm space-y-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#8D6E63] mb-3">Quick Actions</h3>
                {[
                  { label: "Book Appointment", href: "/dashboard/appointments", icon: Calendar },
                  { label: "AI Scan Now", href: "/scan", icon: Activity },
                  { label: "My Profile", href: "/profile", icon: FileText },
                ].map(({ label, href, icon: Icon }) => (
                  <Link key={label} href={href}
                    className="flex items-center gap-2.5 w-full px-4 py-2.5 bg-[#F5EDE4] hover:bg-[#E8D5C4] border border-[#E8D5C4] rounded-xl text-xs font-bold text-[#5C4033] transition-all"
                  >
                    <Icon size={13} className="text-[#8D6E63]" /> {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Upload Scan Modal ────────────────────────────────────────── */}
      <AnimatePresence>
        {uploadOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#3E2723]/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setUploadOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/95 backdrop-blur-xl rounded-[2rem] p-7 shadow-2xl max-w-md w-full border border-white"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-black text-[#3E2723]">Upload Skin Scan</h3>
                <button onClick={() => setUploadOpen(false)} className="w-8 h-8 rounded-full bg-[#F0E8DF] flex items-center justify-center text-[#8D6E63] hover:bg-[#E8D5C4]">
                  <X size={15} />
                </button>
              </div>

              {/* Image drop zone */}
              <div
                onClick={() => fileRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all mb-4 overflow-hidden ${
                  scanPreview ? "border-[#8D6E63] bg-transparent" : "border-[#D7CCC8] hover:border-[#8D6E63] hover:bg-[#F5EDE4]/50"
                }`}
              >
                <input
                  ref={fileRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleScanFile(e.target.files[0])}
                />
                {scanPreview ? (
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={scanPreview} alt="preview" className="w-full h-40 object-cover rounded-xl" />
                    <button
                      onClick={(e) => { e.stopPropagation(); setScanFile(null); setScanPreview(null); }}
                      className="absolute top-2 right-2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center text-red-500 hover:bg-white"
                    >
                      <X size={13} />
                    </button>
                  </div>
                ) : (
                  <>
                    <ImageIcon className="mx-auto text-[#A1887F] mb-2" size={28} />
                    <p className="text-sm font-bold text-[#5C4033]">Click to select scan image</p>
                    <p className="text-xs text-[#A1887F] mt-0.5">JPG, PNG, WEBP — max 10 MB</p>
                  </>
                )}
              </div>

              {/* Condition name */}
              <div className="mb-3">
                <label className="text-xs font-black text-[#8D6E63] uppercase tracking-wider block mb-1.5">
                  Condition / Diagnosis *
                </label>
                <input
                  value={scanCondition}
                  onChange={(e) => setScanCondition(e.target.value)}
                  placeholder="e.g. Melanocytic Nevus, Seborrheic Keratosis..."
                  className="w-full bg-[#F5EDE4] border border-[#E8D5C4] rounded-xl px-3 py-2.5 text-xs text-[#3E2723] placeholder:text-[#A1887F] focus:outline-none focus:border-[#8D6E63]"
                />
              </div>

              {/* Risk Level */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-xs font-black text-[#8D6E63] uppercase tracking-wider block mb-1.5">Risk Level</label>
                  <select
                    value={scanRisk}
                    onChange={(e) => setScanRisk(e.target.value as ScanResult["risk_level"])}
                    className="w-full bg-[#F5EDE4] border border-[#E8D5C4] rounded-xl px-3 py-2.5 text-xs text-[#3E2723] focus:outline-none focus:border-[#8D6E63]"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-black text-[#8D6E63] uppercase tracking-wider block mb-1.5">
                    Confidence: <span className="text-[#E76F51]">{scanConf}%</span>
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={100}
                    value={scanConf}
                    onChange={(e) => setScanConf(Number(e.target.value))}
                    className="w-full accent-[#8D6E63] mt-2.5"
                  />
                </div>
              </div>

              {uploadErr && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2 mb-3">
                  ⚠ {uploadErr}
                </p>
              )}

              <button
                onClick={handleUploadScan}
                disabled={!scanFile || !scanCondition || uploadingS}
                className="w-full py-3 rounded-full bg-[#8D6E63] hover:bg-[#5C4033] text-white text-sm font-black disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md flex items-center justify-center gap-2"
              >
                {uploadingS ? (
                  <><Loader2 size={15} className="animate-spin" /> Uploading to Supabase...</>
                ) : (
                  <><Upload size={15} /> Save Scan</>
                )}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Scan Detail Modal ────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedScan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#3E2723]/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setSelectedScan(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/95 backdrop-blur-xl rounded-[2rem] p-7 shadow-2xl max-w-lg w-full border border-white"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-black text-[#3E2723]">Scan Details</h3>
                <button onClick={() => setSelectedScan(null)} className="w-8 h-8 rounded-full bg-[#F0E8DF] flex items-center justify-center text-[#8D6E63]">
                  <X size={15} />
                </button>
              </div>

              <div className="relative w-full h-52 rounded-2xl overflow-hidden border border-[#E8D5C4] mb-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selectedScan.image_url} alt="scan" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${(RISK_STYLES[selectedScan.risk_level] ?? RISK_STYLES.Low).badge}`}>
                    {selectedScan.risk_level} Risk
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: "Condition", value: selectedScan.condition },
                  { label: "Risk Level", value: selectedScan.risk_level },
                  { label: "Confidence", value: `${selectedScan.confidence}%` },
                  { label: "Date", value: formatDate(selectedScan.created_at) },
                  { label: "Reviewed", value: selectedScan.reviewed_by_doctor ? "✓ Yes" : "Pending" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[#F5EDE4] rounded-xl p-3">
                    <p className="text-[10px] text-[#A1887F] font-bold uppercase tracking-wider">{label}</p>
                    <p className="text-sm font-black text-[#3E2723] mt-0.5">{value}</p>
                  </div>
                ))}
              </div>

              {selectedScan.notes && (
                <div className="bg-[#F5EDE4] border border-[#E8D5C4] rounded-2xl p-4">
                  <p className="text-[10px] text-[#A1887F] font-bold uppercase tracking-wider mb-1.5">Doctor Notes</p>
                  <p className="text-sm text-[#5C4033]">{selectedScan.notes}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
