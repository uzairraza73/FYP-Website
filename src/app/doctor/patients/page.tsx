"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DoctorLayout } from "@/components/doctor/DoctorLayout";
import { createClient } from "@/utils/supabase/client";
import {
  getPatientListForDoctor,
  getPatientScans,
  getPatientDocuments,
  updateScanNotes,
} from "@/utils/supabase/queries";
import { uploadDoctorDoc, insertMedicalDocument } from "@/utils/supabase/queries";
import type { Profile, ScanResult, MedicalDocument } from "@/utils/supabase/types";
import {
  Users, Search, Phone, Mail, Calendar, Activity,
  FileText, Upload, X, CheckCircle2, AlertCircle,
  Image as ImageIcon, Download, Loader2, Eye, Edit3,
  RefreshCw, FolderOpen, Trash2, Plus, Clock,
} from "lucide-react";
import { uploadDoctorDoc as uploadDoc } from "@/utils/supabase/storage";

const STATUS_COLORS = {
  Active:    { bg: "bg-emerald-50",  text: "text-emerald-700",  dot: "bg-emerald-400" },
  "Follow-up": { bg: "bg-amber-50",   text: "text-amber-700",    dot: "bg-amber-400" },
  Recovered: { bg: "bg-[#F0E8DF]",   text: "text-[#5C4033]",   dot: "bg-[#8D6E63]" },
};

const RISK_STYLES = {
  Low:    { badge: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-400" },
  Medium: { badge: "bg-amber-100 text-amber-700",     dot: "bg-amber-400" },
  High:   { badge: "bg-red-100 text-red-600",         dot: "bg-red-400" },
};

type Tab = "overview" | "scans" | "documents";

export default function DoctorPatientsPage() {
  const [doctorId, setDoctorId] = useState<string | null>(null);
  const [patients, setPatients] = useState<Profile[]>([]);
  const [selected, setSelected] = useState<Profile | null>(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Patient detail data
  const [patientScans, setPatientScans] = useState<ScanResult[]>([]);
  const [patientDocs, setPatientDocs] = useState<MedicalDocument[]>([]);
  const [detailLoading, setDetailLoading] = useState(false);

  // Upload state
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadCategory, setUploadCategory] = useState<MedicalDocument["category"]>("prescription");
  const [uploadDesc, setUploadDesc] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scan review
  const [reviewScan, setReviewScan] = useState<ScanResult | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  // Get current doctor
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setDoctorId(data.user.id);
    });
  }, []);

  // Load patients
  useEffect(() => {
    if (!doctorId) return;
    setLoading(true);
    getPatientListForDoctor(doctorId)
      .then((data) => {
        setPatients(data);
        if (data.length > 0) setSelected(data[0]);
      })
      .catch(() => setError("Failed to load patients"))
      .finally(() => setLoading(false));
  }, [doctorId]);

  // Load patient details when selection changes
  const loadPatientData = useCallback(async (patient: Profile) => {
    setDetailLoading(true);
    const [scans, docs] = await Promise.all([
      getPatientScans(patient.id),
      getPatientDocuments(patient.id),
    ]);
    setPatientScans(scans);
    setPatientDocs(docs);
    setDetailLoading(false);
  }, []);

  useEffect(() => {
    if (selected) {
      setActiveTab("overview");
      loadPatientData(selected);
    }
  }, [selected, loadPatientData]);

  const filtered = patients.filter(
    (p) =>
      p.full_name.toLowerCase().includes(search.toLowerCase()) ||
      (p.email?.toLowerCase() ?? "").includes(search.toLowerCase())
  );

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleUpload = async () => {
    if (!uploadFile || !selected || !doctorId) return;
    setUploading(true);
    setUploadError(null);
    try {
      const { url, path } = await uploadDoc(uploadFile, selected.id, doctorId);
      await insertMedicalDocument({
        patient_id: selected.id,
        uploaded_by: doctorId,
        file_name: uploadFile.name,
        file_url: url,
        storage_path: path,
        file_type: uploadFile.type,
        file_size: uploadFile.size,
        category: uploadCategory,
        description: uploadDesc || null,
      });
      const docs = await getPatientDocuments(selected.id);
      setPatientDocs(docs);
      setUploadOpen(false);
      setUploadFile(null);
      setUploadDesc("");
    } catch (e) {
      setUploadError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!reviewScan || !doctorId) return;
    setSavingNotes(true);
    try {
      await updateScanNotes(reviewScan.id, reviewNotes, doctorId);
      setPatientScans((prev) =>
        prev.map((s) =>
          s.id === reviewScan.id
            ? { ...s, notes: reviewNotes, reviewed_by_doctor: true }
            : s
        )
      );
      setReviewScan(null);
    } catch {
      // ignore
    } finally {
      setSavingNotes(false);
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

  // ── If no auth yet ────────────────────────────────────────────────────────

  if (!doctorId && !loading) {
    return (
      <DoctorLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <AlertCircle className="text-amber-500 mb-3" size={40} />
          <h2 className="text-xl font-black text-[#3E2723]">Not Authenticated</h2>
          <p className="text-sm text-[#8D6E63] mt-1">Please log in to view patient data.</p>
        </div>
      </DoctorLayout>
    );
  }

  // ── Empty state (no patients yet) ────────────────────────────────────────

  const NoPatients = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center py-16">
      <div className="w-16 h-16 rounded-2xl bg-[#F0E8DF] border border-[#E8D5C4] flex items-center justify-center text-[#8D6E63] mb-4">
        <Users size={28} />
      </div>
      <h3 className="text-lg font-black text-[#3E2723] mb-2">No Patients Yet</h3>
      <p className="text-sm text-[#8D6E63] max-w-xs">
        Patients will appear here once they book appointments with you.
      </p>
      {error && (
        <p className="mt-3 text-xs text-red-500 bg-red-50 px-4 py-2 rounded-xl">
          {error}
        </p>
      )}
    </div>
  );

  return (
    <DoctorLayout>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-[#3E2723]">Patient Directory</h1>
            <p className="text-sm text-[#6D4C41] mt-0.5">
              {loading ? "Loading..." : `${patients.length} patients`}
            </p>
          </div>
          <button
            onClick={() => doctorId && getPatientListForDoctor(doctorId).then(setPatients)}
            className="w-9 h-9 rounded-full bg-white/70 border border-[#E8D5C4] flex items-center justify-center text-[#8D6E63] hover:bg-white transition-all shadow-sm"
            title="Refresh"
          >
            <RefreshCw size={15} />
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A1887F]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patients..."
            className="w-full bg-white/70 border border-[#E8D5C4] rounded-full pl-10 pr-4 py-2.5 text-xs text-[#3E2723] placeholder:text-[#A1887F] focus:outline-none focus:border-[#8D6E63] focus:ring-1 focus:ring-[#8D6E63]/20 shadow-sm"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-[#8D6E63]" size={32} />
          </div>
        ) : patients.length === 0 ? (
          <NoPatients />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ── Patient List ─────────────────────────────────────────── */}
            <div className="lg:col-span-1 space-y-2 max-h-[calc(100vh-240px)] overflow-y-auto pr-1">
              {filtered.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    selected?.id === p.id
                      ? "bg-white border-[#8D6E63]/40 shadow-md"
                      : "bg-white/50 border-white/70 hover:bg-white hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#EADECF] flex items-center justify-center text-[#5C4033] font-black text-sm flex-shrink-0">
                      {p.full_name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-[#3E2723] truncate">{p.full_name}</p>
                      <p className="text-[10px] text-[#8D6E63] truncate">{p.email}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* ── Patient Detail Panel ──────────────────────────────────── */}
            {selected && (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-2 bg-white/70 backdrop-blur-sm border border-white/70 rounded-3xl shadow-[0_8px_40px_rgba(92,64,51,0.08)] overflow-hidden"
              >
                {/* Patient Header */}
                <div className="p-6 border-b border-[#F0E8DF]">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#EADECF] flex items-center justify-center text-[#3E2723] font-black text-xl">
                        {selected.full_name.charAt(0)}
                      </div>
                      <div>
                        <h2 className="text-lg font-black text-[#3E2723]">{selected.full_name}</h2>
                        <div className="flex items-center gap-3 mt-0.5 text-xs text-[#8D6E63]">
                          {selected.email && (
                            <span className="flex items-center gap-1">
                              <Mail size={11} /> {selected.email}
                            </span>
                          )}
                          {selected.phone && (
                            <span className="flex items-center gap-1">
                              <Phone size={11} /> {selected.phone}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => { setUploadOpen(true); setUploadError(null); }}
                      className="flex items-center gap-1.5 bg-[#8D6E63] hover:bg-[#5C4033] text-white text-xs font-black rounded-full px-4 py-2 transition-all shadow-sm"
                    >
                      <Upload size={13} /> Upload Doc
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-1 mt-5 p-1 bg-[#F5EDE4] rounded-2xl w-fit">
                    {(["overview", "scans", "documents"] as Tab[]).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2 rounded-xl text-xs font-black capitalize transition-all ${
                          activeTab === tab
                            ? "bg-white text-[#3E2723] shadow-sm"
                            : "text-[#8D6E63] hover:text-[#5C4033]"
                        }`}
                      >
                        {tab}
                        {tab === "scans" && patientScans.length > 0 && (
                          <span className="ml-1.5 px-1.5 py-0.5 bg-[#E76F51] text-white text-[9px] rounded-full">
                            {patientScans.length}
                          </span>
                        )}
                        {tab === "documents" && patientDocs.length > 0 && (
                          <span className="ml-1.5 px-1.5 py-0.5 bg-[#8D6E63] text-white text-[9px] rounded-full">
                            {patientDocs.length}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {detailLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <Loader2 className="animate-spin text-[#8D6E63]" size={24} />
                    </div>
                  ) : (
                    <AnimatePresence mode="wait">
                      {activeTab === "overview" && (
                        <motion.div
                          key="overview"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-4"
                        >
                          {/* Stats */}
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { label: "Total Scans", value: patientScans.length, icon: Activity, color: "text-[#E76F51]" },
                              { label: "High Risk", value: patientScans.filter(s => s.risk_level === "High").length, icon: AlertCircle, color: "text-red-500" },
                              { label: "Documents", value: patientDocs.length, icon: FileText, color: "text-[#8D6E63]" },
                            ].map(({ label, value, icon: Icon, color }) => (
                              <div key={label} className="p-4 bg-[#F5EDE4] rounded-2xl border border-[#E8D5C4]">
                                <div className={`flex items-center gap-1.5 mb-1 text-[10px] font-black uppercase tracking-wider ${color}`}>
                                  <Icon size={12} /> {label}
                                </div>
                                <p className="text-2xl font-black text-[#3E2723]">{value}</p>
                              </div>
                            ))}
                          </div>

                          {/* Recent scans preview */}
                          {patientScans.length > 0 && (
                            <div>
                              <h3 className="text-xs font-black uppercase tracking-wider text-[#8D6E63] mb-3">
                                Recent Scan History
                              </h3>
                              <div className="space-y-2">
                                {patientScans.slice(0, 3).map((scan) => {
                                  const r = RISK_STYLES[scan.risk_level] ?? RISK_STYLES.Low;
                                  return (
                                    <div key={scan.id} className="flex items-center gap-3 bg-white border border-[#F0E8DF] rounded-xl p-3">
                                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${r.dot}`} />
                                      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-[#E8D5C4]">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={scan.image_url} alt="scan" className="w-full h-full object-cover" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-[#3E2723] truncate">{scan.condition}</p>
                                        <p className="text-[10px] text-[#8D6E63]">
                                          {formatDate(scan.created_at)} · {scan.confidence}% confidence
                                        </p>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${r.badge}`}>
                                          {scan.risk_level}
                                        </span>
                                        <button
                                          onClick={() => { setReviewScan(scan); setReviewNotes(scan.notes ?? ""); }}
                                          className="w-7 h-7 rounded-full bg-[#F0E8DF] flex items-center justify-center text-[#8D6E63] hover:bg-[#E8D5C4] transition-all"
                                        >
                                          <Edit3 size={12} />
                                        </button>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {patientScans.length === 0 && patientDocs.length === 0 && (
                            <div className="text-center py-10 text-[#A1887F]">
                              <FolderOpen className="mx-auto mb-2" size={32} />
                              <p className="text-sm font-medium">No records yet for this patient.</p>
                            </div>
                          )}
                        </motion.div>
                      )}

                      {activeTab === "scans" && (
                        <motion.div
                          key="scans"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-3"
                        >
                          {patientScans.length === 0 ? (
                            <div className="text-center py-12 text-[#A1887F]">
                              <ImageIcon className="mx-auto mb-2" size={28} />
                              <p className="text-sm font-medium">No scan results yet.</p>
                            </div>
                          ) : (
                            patientScans.map((scan) => {
                              const r = RISK_STYLES[scan.risk_level] ?? RISK_STYLES.Low;
                              return (
                                <div key={scan.id} className="bg-white border border-[#E8D5C4] rounded-2xl p-4">
                                  <div className="flex items-start gap-3">
                                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-[#E8D5C4]">
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img src={scan.image_url} alt="scan" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2 flex-wrap mb-1">
                                        <p className="text-sm font-black text-[#3E2723]">{scan.condition}</p>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${r.badge}`}>
                                          {scan.risk_level} Risk
                                        </span>
                                        {scan.reviewed_by_doctor && (
                                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 flex items-center gap-0.5">
                                            <CheckCircle2 size={9} /> Reviewed
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-[10px] text-[#8D6E63] mb-1">
                                        {formatDate(scan.created_at)} · {scan.confidence}% confidence
                                      </p>
                                      {scan.notes && (
                                        <p className="text-xs text-[#7D5A4F] bg-[#F5EDE4] rounded-lg px-2.5 py-1.5 border border-[#E8D5C4] mt-1">
                                          📋 {scan.notes}
                                        </p>
                                      )}
                                    </div>
                                    <button
                                      onClick={() => { setReviewScan(scan); setReviewNotes(scan.notes ?? ""); }}
                                      className="flex items-center gap-1 text-xs font-bold text-[#8D6E63] hover:text-[#5C4033] transition-colors flex-shrink-0"
                                    >
                                      <Edit3 size={12} /> {scan.reviewed_by_doctor ? "Edit" : "Review"}
                                    </button>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </motion.div>
                      )}

                      {activeTab === "documents" && (
                        <motion.div
                          key="documents"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-3"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-xs text-[#8D6E63] font-medium">
                              {patientDocs.length} document{patientDocs.length !== 1 ? "s" : ""}
                            </p>
                            <button
                              onClick={() => { setUploadOpen(true); setUploadError(null); }}
                              className="flex items-center gap-1 text-xs font-black text-[#8D6E63] hover:text-[#5C4033]"
                            >
                              <Plus size={13} /> Add Document
                            </button>
                          </div>

                          {patientDocs.length === 0 ? (
                            <div className="text-center py-12 text-[#A1887F]">
                              <FileText className="mx-auto mb-2" size={28} />
                              <p className="text-sm font-medium">No documents uploaded yet.</p>
                            </div>
                          ) : (
                            patientDocs.map((doc) => (
                              <div key={doc.id} className="bg-white border border-[#E8D5C4] rounded-2xl p-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#F0E8DF] border border-[#E8D5C4] flex items-center justify-center text-[#8D6E63] flex-shrink-0">
                                  <FileText size={18} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-black text-[#3E2723] truncate">{doc.file_name}</p>
                                  <div className="flex items-center gap-2 text-[10px] text-[#A1887F] mt-0.5">
                                    <span className="capitalize">{doc.category.replace("_", " ")}</span>
                                    <span>·</span>
                                    <span>{formatFileSize(doc.file_size)}</span>
                                    <span>·</span>
                                    <span>{formatDate(doc.created_at)}</span>
                                  </div>
                                  {doc.description && (
                                    <p className="text-[10px] text-[#8D6E63] mt-0.5 truncate">{doc.description}</p>
                                  )}
                                </div>
                                <a
                                  href={doc.file_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="w-8 h-8 rounded-full bg-[#F5EDE4] flex items-center justify-center text-[#8D6E63] hover:bg-[#E8D5C4] transition-all flex-shrink-0"
                                >
                                  <Download size={13} />
                                </a>
                              </div>
                            ))
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        )}
      </motion.div>

      {/* ── Upload Modal ───────────────────────────────────────────────── */}
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
                <div>
                  <h3 className="text-lg font-black text-[#3E2723]">Upload Medical Document</h3>
                  <p className="text-xs text-[#A1887F] mt-0.5">
                    To: <span className="font-bold text-[#5C4033]">{selected?.full_name}</span>
                  </p>
                </div>
                <button onClick={() => setUploadOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#F0E8DF] flex items-center justify-center text-[#8D6E63] hover:bg-[#E8D5C4]">
                  <X size={15} />
                </button>
              </div>

              {/* Drop zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all mb-4 ${
                  uploadFile
                    ? "border-[#8D6E63] bg-[#F5EDE4]"
                    : "border-[#D7CCC8] hover:border-[#8D6E63] hover:bg-[#F5EDE4]/50"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
                  onChange={(e) => setUploadFile(e.target.files?.[0] ?? null)}
                />
                {uploadFile ? (
                  <div className="flex items-center gap-3 text-left">
                    <FileText size={24} className="text-[#8D6E63] flex-shrink-0" />
                    <div>
                      <p className="text-sm font-black text-[#3E2723] truncate">{uploadFile.name}</p>
                      <p className="text-xs text-[#8D6E63]">{formatFileSize(uploadFile.size)}</p>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setUploadFile(null); }}
                      className="ml-auto text-red-400 hover:text-red-600">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="mx-auto text-[#A1887F] mb-2" size={28} />
                    <p className="text-sm font-bold text-[#5C4033]">Click to select a file</p>
                    <p className="text-xs text-[#A1887F] mt-0.5">PDF, DOC, JPG, PNG (max 10 MB)</p>
                  </>
                )}
              </div>

              {/* Category */}
              <div className="mb-3">
                <label className="text-xs font-black text-[#8D6E63] uppercase tracking-wider block mb-1.5">
                  Category
                </label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value as MedicalDocument["category"])}
                  className="w-full bg-[#F5EDE4] border border-[#E8D5C4] rounded-xl px-3 py-2.5 text-xs font-medium text-[#3E2723] focus:outline-none focus:border-[#8D6E63]"
                >
                  <option value="prescription">Prescription</option>
                  <option value="lab_report">Lab Report</option>
                  <option value="imaging">Imaging / X-Ray</option>
                  <option value="referral">Referral Letter</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="text-xs font-black text-[#8D6E63] uppercase tracking-wider block mb-1.5">
                  Notes (optional)
                </label>
                <textarea
                  value={uploadDesc}
                  onChange={(e) => setUploadDesc(e.target.value)}
                  placeholder="Any additional notes about this document..."
                  rows={2}
                  className="w-full bg-[#F5EDE4] border border-[#E8D5C4] rounded-xl px-3 py-2.5 text-xs text-[#3E2723] placeholder:text-[#A1887F] focus:outline-none focus:border-[#8D6E63] resize-none"
                />
              </div>

              {uploadError && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2 mb-3">
                  ⚠ {uploadError}
                </p>
              )}

              <button
                onClick={handleUpload}
                disabled={!uploadFile || uploading}
                className="w-full py-3 rounded-full bg-[#8D6E63] hover:bg-[#5C4033] text-white text-sm font-black disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <><Loader2 size={15} className="animate-spin" /> Uploading...</>
                ) : (
                  <><Upload size={15} /> Upload to Supabase</>
                )}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Scan Review Modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {reviewScan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#3E2723]/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setReviewScan(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/95 backdrop-blur-xl rounded-[2rem] p-7 shadow-2xl max-w-lg w-full border border-white"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-black text-[#3E2723]">Review Scan</h3>
                <button onClick={() => setReviewScan(null)}
                  className="w-8 h-8 rounded-full bg-[#F0E8DF] flex items-center justify-center text-[#8D6E63] hover:bg-[#E8D5C4]">
                  <X size={15} />
                </button>
              </div>

              {/* Scan image */}
              <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-[#E8D5C4] mb-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={reviewScan.image_url} alt="scan" className="w-full h-full object-cover" />
                <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${(RISK_STYLES[reviewScan.risk_level] ?? RISK_STYLES.Low).badge}`}>
                    {reviewScan.risk_level} Risk
                  </span>
                  <span className="text-white text-xs font-bold">{reviewScan.condition}</span>
                </div>
              </div>

              {/* Scan details */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-[#F5EDE4] rounded-xl p-3">
                  <p className="text-[10px] text-[#A1887F] font-bold uppercase tracking-wider">Condition</p>
                  <p className="text-sm font-black text-[#3E2723] mt-0.5">{reviewScan.condition}</p>
                </div>
                <div className="bg-[#F5EDE4] rounded-xl p-3">
                  <p className="text-[10px] text-[#A1887F] font-bold uppercase tracking-wider">Confidence</p>
                  <p className="text-sm font-black text-[#E76F51] mt-0.5">{reviewScan.confidence}%</p>
                </div>
                <div className="bg-[#F5EDE4] rounded-xl p-3">
                  <p className="text-[10px] text-[#A1887F] font-bold uppercase tracking-wider">Scan Date</p>
                  <p className="text-xs font-bold text-[#3E2723] mt-0.5">{formatDate(reviewScan.created_at)}</p>
                </div>
                <div className="bg-[#F5EDE4] rounded-xl p-3">
                  <p className="text-[10px] text-[#A1887F] font-bold uppercase tracking-wider">Status</p>
                  <p className={`text-xs font-bold mt-0.5 ${reviewScan.reviewed_by_doctor ? "text-emerald-600" : "text-amber-600"}`}>
                    {reviewScan.reviewed_by_doctor ? "✓ Reviewed" : "Pending Review"}
                  </p>
                </div>
              </div>

              {/* Doctor notes */}
              <div className="mb-5">
                <label className="text-xs font-black text-[#8D6E63] uppercase tracking-wider block mb-1.5">
                  Doctor Notes / Recommendations
                </label>
                <textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Add clinical notes, recommendations, or follow-up instructions..."
                  rows={4}
                  className="w-full bg-[#F5EDE4] border border-[#E8D5C4] rounded-xl px-3 py-2.5 text-sm text-[#3E2723] placeholder:text-[#A1887F] focus:outline-none focus:border-[#8D6E63] resize-none"
                />
              </div>

              <button
                onClick={handleSaveNotes}
                disabled={savingNotes}
                className="w-full py-3 rounded-full bg-[#8D6E63] hover:bg-[#5C4033] text-white text-sm font-black disabled:opacity-50 transition-all shadow-md flex items-center justify-center gap-2"
              >
                {savingNotes ? (
                  <><Loader2 size={15} className="animate-spin" /> Saving...</>
                ) : (
                  <><CheckCircle2 size={15} /> Save to Supabase</>
                )}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DoctorLayout>
  );
}
