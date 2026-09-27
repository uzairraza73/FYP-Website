"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ShieldAlert, CheckCircle2, X, RefreshCw, ArrowRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useScanStore } from "@/store/useScanStore";
import { generateMockResult } from "@/utils/mockData";
import { cn } from "@/utils/cn";
import Link from "next/link";

export default function ScanPage() {
  const [image, setImage] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const { isScanning, setIsScanning, setCurrentScan, addScan } = useScanStore();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const startScan = async () => {
    if (!image || !consent) return;

    setIsScanning(true);

    setTimeout(() => {
      const result = generateMockResult(image);
      setCurrentScan(result);
      addScan(result);
      setIsScanning(false);
      router.push("/result");
    }, 3500);
  };

  return (
    <main className="min-h-screen bg-[#FFF5F0] font-plus-jakarta pb-32">
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#3E2723] to-[#5C4033] text-white py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,#E76F51,transparent_60%)]" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.2) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="max-w-5xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 mb-10 group">
            <motion.div
              whileHover={{ scale: 1.1, x: -2 }}
              className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center"
            >
              <ArrowLeft size={18} />
            </motion.div>
            <span className="text-xs font-black uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">Go Back</span>
          </Link>

          <div className="text-center md:text-left mb-6">
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#FFD8C2] mb-1">Oncura AI</p>
            <h1 className="text-4xl md:text-5xl font-black">AI Skin Analysis</h1>
            <p className="text-white/70 font-medium text-base leading-relaxed max-w-xl mt-4">
              Upload a clinical photo of a skin lesion for preliminary evaluation using our advanced, real-world trained AI models.
            </p>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="px-6 max-w-5xl mx-auto -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: Guidelines & Consent */}
          <div className="md:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2rem] p-6 shadow-[0_20px_60px_rgba(92,64,51,0.09)] border border-[#FFD8C2]/60"
            >
              <h3 className="text-xs font-black text-[#E76F51] mb-4 flex items-center gap-2 uppercase tracking-widest">
                <ShieldAlert size={16} /> Guidelines
              </h3>
              <ul className="text-xs text-slate-500 space-y-3 font-medium">
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-[#FFF5F0] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={12} className="text-[#E76F51]" />
                  </div>
                  Use bright, natural lighting.
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-[#FFF5F0] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={12} className="text-[#E76F51]" />
                  </div>
                  Center the spot in the frame.
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-[#FFF5F0] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={12} className="text-[#E76F51]" />
                  </div>
                  Ensure the image is in focus.
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[2rem] p-6 shadow-[0_20px_60px_rgba(92,64,51,0.09)] border border-[#FFD8C2]/60"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="w-4 h-4 rounded border-[#FFD8C2] bg-white text-[#E76F51] focus:ring-[#E76F51]"
                  />
                </div>
                <label htmlFor="consent" className="text-xs text-slate-500 font-medium leading-relaxed cursor-pointer select-none">
                  <span className="block font-black text-[#3E2723] uppercase tracking-wider mb-1 text-[10px]">Consent</span>
                  I understand this is an AI screening tool and not a medical diagnosis. I consent to image processing.
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
                "relative h-[420px] flex flex-col items-center justify-center border-2 border-dashed transition-all duration-500 overflow-hidden rounded-[2.5rem] bg-white shadow-[0_20px_60px_rgba(92,64,51,0.05)]",
                image ? "border-[#FFD8C2] bg-white" : "border-[#FFD8C2]/80 hover:border-[#E76F51]/40 hover:bg-[#FFF5F0]/50"
              )}
              onClick={() => !image && fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />

              <AnimatePresence mode="wait">
                {!image ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-4 cursor-pointer p-8"
                  >
                    <div className="w-20 h-20 rounded-full bg-[#FFF5F0] flex items-center justify-center text-[#E76F51] shadow-inner">
                      <Upload size={32} />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-black text-[#3E2723] uppercase tracking-widest mb-2">Select Image</p>
                      <p className="text-xs text-slate-500 font-medium">Click to browse or drag and drop<br/>JPG, PNG (Max 5MB)</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative w-full h-full flex items-center justify-center p-6 bg-slate-100"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={image}
                      alt="Preview"
                      className="max-w-full max-h-full object-contain rounded-2xl shadow-xl"
                    />

                    {isScanning && (
                      <div className="absolute inset-6 overflow-hidden rounded-2xl">
                        <motion.div
                          initial={{ top: "0%" }}
                          animate={{ top: "100%" }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="absolute w-full h-1 bg-[#00E5FF] shadow-[0_0_15px_#00E5FF] z-20"
                        />
                        <div className="absolute inset-0 bg-[#3E2723]/30 backdrop-blur-[2px] z-10 animate-pulse" />
                      </div>
                    )}

                    {!isScanning && (
                      <button
                         onClick={(e) => { e.stopPropagation(); setImage(null); }}
                        className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white text-[#3E2723] flex items-center justify-center shadow-lg hover:bg-[#FFF5F0] hover:text-[#E76F51] transition-colors"
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
              className="mt-8 flex justify-end"
            >
              <button
                disabled={!consent || !image || isScanning}
                onClick={startScan}
                className={cn(
                  "w-full md:w-auto px-8 py-4 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-xl flex items-center justify-center gap-3",
                  (consent && image && !isScanning)
                    ? "bg-[#E76F51] text-white hover:bg-[#D4603F] shadow-[0_10px_25px_rgba(231,111,81,0.3)] hover:translate-y-[-2px]"
                    : "bg-[#FFD8C2]/50 text-slate-400 cursor-not-allowed shadow-none"
                )}
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="animate-spin" size={16} />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Initialize AI Scan
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </motion.div>
          </div>
        </div>

        {/* ── BOTTOM INFO ── */}
        <section className="mt-20 pt-16 border-t border-[#FFD8C2]/60">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl font-black text-[#3E2723] mb-4">Clinical Protocol</h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-6 font-medium">
                Our neural network uses multi-spectral analysis to identify patterns consistent with known skin conditions.
                The system processes pixel-level data for morphological irregularity.
              </p>
              <div className="space-y-4">
                {[
                  "Multi-spectral Analysis",
                  "Edge Detection Algorithms",
                  "Pigment Mapping"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs text-[#5C4033] font-black uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E76F51]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#3E2723] to-[#5C4033] p-8 text-white relative overflow-hidden shadow-2xl rounded-[2rem]">
              <div className="relative z-10">
                <h3 className="text-sm font-black mb-6 flex items-center gap-3 uppercase tracking-widest text-[#FFD8C2]">
                  <CheckCircle2 size={20} /> Pre-Scan Check
                </h3>
                <ul className="space-y-4 text-xs font-bold uppercase tracking-wider text-white/90">
                  <li className="flex gap-4 items-center">
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#FFD8C2] shrink-0">01</span>
                    Clean the area of any makeup.
                  </li>
                  <li className="flex gap-4 items-center">
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#FFD8C2] shrink-0">02</span>
                    Use a plain background.
                  </li>
                  <li className="flex gap-4 items-center">
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#FFD8C2] shrink-0">03</span>
                    Keep camera 10cm away.
                  </li>
                </ul>
              </div>
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
