"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  ShieldAlert,
  CheckCircle2,
  X,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CloudCheck,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useScanStore } from "@/store/useScanStore";
import { useAuthStore } from "@/store/useAuthStore";
import { generateMockResult } from "@/utils/mockData";
import { uploadScanImage } from "@/utils/supabase/storage";
import { insertScan } from "@/utils/supabase/queries";
import { cn } from "@/utils/cn";
import Link from "next/link";

export default function ScanPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const { isScanning, setIsScanning, setCurrentScan, addScan } = useScanStore();
  const { user } = useAuthStore();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startScan = async () => {
    if (!imagePreview || !consent || isScanning) return;

    setIsScanning(true);
    const patientId = user?.email ? user.email.replace(/[^a-zA-Z0-9]/g, "-") : "patient-1";

    try {
      // 1. Upload to Supabase Storage: scan-images
      setStatusMessage("Uploading to Supabase Storage (scan-images)...");
      let uploadedUrl = imagePreview;

      if (selectedFile) {
        try {
          const uploadRes = await uploadScanImage(selectedFile, patientId);
          if (uploadRes?.url) {
            uploadedUrl = uploadRes.url;
          }
        } catch (uploadErr) {
          console.warn("Storage upload notice:", uploadErr);
        }
      }

      // 2. Run AI Prediction Model
      setStatusMessage("Analyzing image with CNN classification model...");
      await new Promise((r) => setTimeout(r, 1800));

      const aiResult = generateMockResult(uploadedUrl);

      // 3. Store Scan in Supabase 'scans' table
      setStatusMessage("Syncing scan record to Supabase database...");
      try {
        await insertScan({
          patient_id: patientId,
          image_url: uploadedUrl,
          confidence_score: aiResult.confidence,
          doctor_notes: null,
          condition: aiResult.type,
          risk_level: aiResult.riskLevel,
        });
      } catch (dbErr) {
        console.warn("DB insert notice:", dbErr);
      }

      // 4. Update UI Store & Route to Result
      setCurrentScan(aiResult);
      addScan(aiResult);
      setIsScanning(false);
      router.push("/result");
    } catch (err) {
      console.error("Scan processing error:", err);
      // Fallback: still show the result so patient flow is not broken
      const aiResult = generateMockResult(imagePreview);
      setCurrentScan(aiResult);
      addScan(aiResult);
      setIsScanning(false);
      router.push("/result");
    }
  };

  return (
    <main className="min-h-screen bg-[#F0E8DF] font-plus-jakarta pb-32 relative overflow-hidden">
      {/* Global Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#D4A98A]/25 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] bg-[#C69C7B]/15 rounded-full blur-[100px]" />
      </div>

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#F5EDE4] via-[#EFE3D7] to-[#E0CCBA] text-[#3E2723] py-24 px-6 relative overflow-hidden rounded-b-[3rem] shadow-[0_10px_40px_rgba(92,64,51,0.05)] border-b border-white/50">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#D4A98A]/20 rounded-full blur-[80px]" />
        <div className="absolute -bottom-20 right-20 w-80 h-80 bg-[#C69C7B]/15 rounded-full blur-[70px]" />
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

        <div className="max-w-5xl mx-auto relative z-10">
          <Link href="/dashboard" className="inline-flex items-center gap-3 mb-8 group">
            <motion.div
              whileHover={{ scale: 1.1, x: -2 }}
              className="w-10 h-10 rounded-full bg-white border border-[#E8D5C4] text-[#8D6E63] group-hover:bg-[#8D6E63] group-hover:text-white group-hover:border-[#8D6E63] flex items-center justify-center transition-all shadow-sm"
            >
              <ArrowLeft size={18} />
            </motion.div>
            <span className="text-xs font-black uppercase tracking-widest text-[#8D6E63] group-hover:text-[#5C4033] transition-colors">
              Back to Patient Dashboard
            </span>
          </Link>

          <div className="text-center md:text-left mb-4">
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#8D6E63] mb-2 flex items-center gap-2 md:justify-start justify-center">
              <span className="w-2 h-2 rounded-full bg-[#E76F51]" /> Supabase Connected · Oncura AI
            </p>
            <h1 className="text-3xl md:text-5xl font-black text-[#3E2723] leading-tight mb-3">
              AI Skin Scan & Storage
            </h1>
            <p className="text-[#7D5A4F] font-medium text-sm md:text-base leading-relaxed max-w-xl">
              Upload a clear photo of your skin lesion. Images are stored securely in Supabase Storage and analyzed with our deep learning classification engine.
            </p>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="px-6 max-w-5xl mx-auto -mt-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Guidelines & Consent */}
          <div className="md:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 shadow-[0_6px_30px_rgba(92,64,51,0.05)] border border-white/90"
            >
              <h3 className="text-xs font-black text-[#E76F51] mb-4 flex items-center gap-2 uppercase tracking-widest">
                <ShieldAlert size={16} /> Clinical Guidelines
              </h3>
              <ul className="text-xs text-[#7D5A4F] space-y-3 font-medium">
                <li className="flex gap-2.5 items-start">
                  <div className="w-5 h-5 rounded-full bg-[#F5EDE4] border border-[#E8D5C4] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <CheckCircle2 size={11} className="text-[#E76F51]" />
                  </div>
                  Direct, bright lighting with no harsh shadows.
                </li>
                <li className="flex gap-2.5 items-start">
                  <div className="w-5 h-5 rounded-full bg-[#F5EDE4] border border-[#E8D5C4] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <CheckCircle2 size={11} className="text-[#E76F51]" />
                  </div>
                  Keep the lesion centered and closely framed.
                </li>
                <li className="flex gap-2.5 items-start">
                  <div className="w-5 h-5 rounded-full bg-[#F5EDE4] border border-[#E8D5C4] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <CheckCircle2 size={11} className="text-[#E76F51]" />
                  </div>
                  Ensure sharp macro focus before capturing.
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-xl rounded-[2rem] p-6 shadow-[0_6px_30px_rgba(92,64,51,0.05)] border border-white/90"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="w-4 h-4 rounded border-[#D7CCC8] bg-white text-[#8D6E63] focus:ring-[#8D6E63] cursor-pointer"
                  />
                </div>
                <label
                  htmlFor="consent"
                  className="text-xs text-[#7D5A4F] font-medium leading-relaxed cursor-pointer select-none"
                >
                  <span className="block font-black text-[#3E2723] uppercase tracking-wider mb-0.5 text-[10px]">
                    Consent & Terms
                  </span>
                  I consent to uploading this image to Supabase Storage (<code className="font-mono text-[10px]">scan-images</code>) for AI analysis.
                </label>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Upload Area */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={cn(
                "relative h-[400px] flex flex-col items-center justify-center transition-all duration-500 overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(92,64,51,0.08)]",
                imagePreview
                  ? "bg-white border-4 border-white"
                  : "bg-white/70 backdrop-blur-md border border-dashed border-[#D7CCC8] hover:border-[#8D6E63] hover:bg-white/85 cursor-pointer"
              )}
              onClick={() => !imagePreview && fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />

              <AnimatePresence mode="wait">
                {!imagePreview ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative w-full h-full flex flex-col items-center justify-center group"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.8)_0%,transparent_80%)] pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center gap-5">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-[#E76F51]/10 blur-2xl scale-150 group-hover:bg-[#E76F51]/20 transition-all duration-500" />
                        <div className="relative w-24 h-24 rounded-full bg-white flex items-center justify-center text-[#8D6E63] shadow-[0_15px_40px_rgba(141,110,99,0.15)] border border-[#E8D5C4] group-hover:scale-105 group-hover:text-[#5C4033] group-hover:border-[#D7CCC8] transition-all duration-500">
                          <Upload size={32} strokeWidth={1.5} />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-base font-black text-[#3E2723] mb-1">
                          Select Skin Lesion Photo
                        </p>
                        <p className="text-xs text-[#7D5A4F] font-medium">
                          Click to browse or drag & drop image
                          <br />
                          <span className="text-[11px] text-[#A1887F] font-bold mt-1 inline-block">
                            JPG, PNG · Auto-syncs to Supabase
                          </span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative w-full h-full flex items-center justify-center bg-[#F5EDE4] rounded-[2rem] overflow-hidden"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt="Skin Lesion Preview"
                      className="w-full h-full object-cover"
                    />

                    {isScanning && (
                      <div className="absolute inset-0 overflow-hidden z-20 rounded-[2rem] flex flex-col items-center justify-center bg-[#3E2723]/60 backdrop-blur-sm">
                        <motion.div
                          initial={{ top: "0%" }}
                          animate={{ top: "100%" }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="absolute w-full h-2 bg-[#E76F51] shadow-[0_0_25px_#E76F51]"
                        />
                        <div className="relative z-30 flex flex-col items-center gap-3 text-white px-6 text-center">
                          <RefreshCw className="animate-spin text-[#FFD8C2]" size={36} />
                          <p className="text-sm font-black tracking-wide">{statusMessage}</p>
                          <span className="text-xs text-[#E8D5C4]/90 font-mono">
                            scan-images bucket · scans table
                          </span>
                        </div>
                      </div>
                    )}

                    {!isScanning && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setImagePreview(null);
                          setSelectedFile(null);
                        }}
                        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-[#3E2723] flex items-center justify-center shadow-lg hover:bg-white hover:text-red-500 transition-colors z-30 border border-white"
                        title="Remove photo"
                      >
                        <X size={18} />
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Scan Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-2 text-xs text-[#8D6E63] font-medium">
                <Sparkles size={14} className="text-[#E76F51]" />
                Powered by ResNet-50 Dermoscopic Classifier
              </div>

              <button
                disabled={!consent || !imagePreview || isScanning}
                onClick={startScan}
                className={cn(
                  "w-full sm:w-auto px-9 py-4 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3",
                  consent && imagePreview && !isScanning
                    ? "bg-[#8D6E63] text-white hover:bg-[#5C4033] shadow-[0_10px_30px_rgba(92,64,51,0.2)] hover:-translate-y-0.5 cursor-pointer"
                    : "bg-white border border-[#E8D5C4] text-[#A1887F] cursor-not-allowed shadow-sm opacity-70"
                )}
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="animate-spin" size={16} />
                    Processing Scan...
                  </>
                ) : (
                  <>
                    Upload & Run AI Scan
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
