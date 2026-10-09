"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ShieldAlert, CheckCircle2, X, RefreshCw, ArrowRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useScanStore } from "@/store/useScanStore";
import { generateMockResult } from "@/utils/mockData";
import { cn } from "@/utils/cn";
import Link from "next/link";
import Image from "next/image";

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
    <main className="min-h-screen bg-[#F0E8DF] font-plus-jakarta pb-32 relative overflow-hidden">
      {/* Global Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#D4A98A]/25 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] bg-[#C69C7B]/15 rounded-full blur-[100px]" />
      </div>

      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#F5EDE4] via-[#EFE3D7] to-[#E0CCBA] text-[#3E2723] py-28 px-6 relative overflow-hidden rounded-b-[3rem] shadow-[0_10px_40px_rgba(92,64,51,0.05)] border-b border-white/50">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#D4A98A]/20 rounded-full blur-[80px]" />
        <div className="absolute -bottom-20 right-20 w-80 h-80 bg-[#C69C7B]/15 rounded-full blur-[70px]" />
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

        <div className="max-w-5xl mx-auto relative z-10">
          <Link href="/dashboard" className="inline-flex items-center gap-3 mb-10 group">
            <motion.div
              whileHover={{ scale: 1.1, x: -2 }}
              className="w-10 h-10 rounded-full bg-white border border-[#E8D5C4] text-[#8D6E63] group-hover:bg-[#8D6E63] group-hover:text-white group-hover:border-[#8D6E63] flex items-center justify-center transition-all shadow-sm"
            >
              <ArrowLeft size={18} />
            </motion.div>
            <span className="text-xs font-black uppercase tracking-widest text-[#8D6E63] group-hover:text-[#5C4033] transition-colors">Back to Dashboard</span>
          </Link>

          <div className="text-center md:text-left mb-6">
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#8D6E63] mb-2 flex items-center gap-2 md:justify-start justify-center">
              <span className="w-2 h-2 rounded-full bg-[#E76F51]" /> Oncura AI
            </p>
            <h1 className="text-4xl md:text-6xl font-black text-[#3E2723] leading-tight mb-4">AI Skin Analysis</h1>
            <p className="text-[#7D5A4F] font-medium text-base md:text-lg leading-relaxed max-w-xl">
              Upload a clinical photo of a skin lesion for preliminary evaluation using our advanced, real-world trained AI models.
            </p>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="px-6 max-w-5xl mx-auto -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Guidelines & Consent */}
          <div className="md:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/75 backdrop-blur-xl rounded-[2rem] p-7 shadow-[0_6px_30px_rgba(92,64,51,0.05)] border border-white/90"
            >
              <h3 className="text-xs font-black text-[#E76F51] mb-5 flex items-center gap-2 uppercase tracking-widest">
                <ShieldAlert size={16} /> Guidelines
              </h3>
              <ul className="text-sm text-[#7D5A4F] space-y-4 font-medium">
                <li className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-[#F5EDE4] border border-[#E8D5C4] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <CheckCircle2 size={12} className="text-[#E76F51]" />
                  </div>
                  Use bright, natural lighting.
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-[#F5EDE4] border border-[#E8D5C4] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <CheckCircle2 size={12} className="text-[#E76F51]" />
                  </div>
                  Center the spot in the frame.
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full bg-[#F5EDE4] border border-[#E8D5C4] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
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
              className="bg-white/75 backdrop-blur-xl rounded-[2rem] p-7 shadow-[0_6px_30px_rgba(92,64,51,0.05)] border border-white/90"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="w-5 h-5 rounded border-[#D7CCC8] bg-white text-[#8D6E63] focus:ring-[#8D6E63] cursor-pointer"
                  />
                </div>
                <label htmlFor="consent" className="text-xs text-[#7D5A4F] font-medium leading-relaxed cursor-pointer select-none">
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
                "relative h-[420px] flex flex-col items-center justify-center transition-all duration-500 overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_rgba(92,64,51,0.08)]",
                image ? "bg-white border-4 border-white" : "bg-white/60 backdrop-blur-md border border-dashed border-[#D7CCC8] hover:border-[#8D6E63] hover:bg-white/80 cursor-pointer"
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
                    className="relative w-full h-full flex flex-col items-center justify-center group"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.8)_0%,transparent_80%)] pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center gap-6">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-[#E76F51]/10 blur-2xl scale-150 group-hover:bg-[#E76F51]/20 transition-all duration-500" />
                        <div className="relative w-28 h-28 rounded-full bg-white flex items-center justify-center text-[#8D6E63] shadow-[0_15px_40px_rgba(141,110,99,0.15)] border border-[#E8D5C4] group-hover:scale-110 group-hover:text-[#5C4033] group-hover:border-[#D7CCC8] transition-all duration-500">
                          <Upload size={38} strokeWidth={1.5} />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-black text-[#3E2723] mb-1.5">Upload Skin Image</p>
                        <p className="text-sm text-[#7D5A4F] font-medium">Click to browse or drag & drop<br/><span className="text-xs text-[#A1887F] font-bold mt-2 inline-block">JPG, PNG · Max 5MB</span></p>
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
                      src={image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />

                    {isScanning && (
                      <div className="absolute inset-0 overflow-hidden z-20 rounded-[2rem]">
                        <motion.div
                          initial={{ top: "0%" }}
                          animate={{ top: "100%" }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="absolute w-full h-2 bg-[#E76F51] shadow-[0_0_20px_#E76F51]"
                        />
                        <div className="absolute inset-0 bg-[#3E2723]/30 backdrop-blur-[2px] animate-pulse" />
                      </div>
                    )}

                    {!isScanning && (
                      <button
                         onClick={(e) => { e.stopPropagation(); setImage(null); }}
                        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm text-[#3E2723] flex items-center justify-center shadow-lg hover:bg-white hover:text-red-500 transition-colors z-30 border border-white"
                      >
                        <X size={20} />
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
                  "w-full md:w-auto px-10 py-5 rounded-full text-[13px] font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3",
                  (consent && image && !isScanning)
                    ? "bg-[#8D6E63] text-white hover:bg-[#5C4033] shadow-[0_10px_30px_rgba(92,64,51,0.2)] hover:-translate-y-1"
                    : "bg-white border border-[#E8D5C4] text-[#A1887F] cursor-not-allowed shadow-sm"
                )}
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="animate-spin" size={18} />
                    Analyzing Data...
                  </>
                ) : (
                  <>
                    Initialize AI Scan
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </motion.div>
          </div>
        </div>

        {/* ── BOTTOM INFO ── */}
        <section className="mt-20 pt-16 border-t border-white/60">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-black text-[#3E2723] mb-4">Clinical Protocol</h2>
              <p className="text-sm text-[#7D5A4F] leading-relaxed mb-8 font-medium">
                Our neural network uses multi-spectral analysis to identify patterns consistent with known skin conditions.
                The system processes pixel-level data for morphological irregularity.
              </p>
              <div className="space-y-4 bg-white/60 backdrop-blur-md p-6 rounded-[2rem] border border-white/80 shadow-sm">
                {[
                  "Multi-spectral Analysis",
                  "Edge Detection Algorithms",
                  "Pigment Mapping"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs text-[#5C4033] font-black uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-[#D4A98A]" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/75 backdrop-blur-xl p-10 relative overflow-hidden shadow-[0_10px_40px_rgba(92,64,51,0.06)] rounded-[2.5rem] border border-white/90">
              <div className="relative z-10">
                <h3 className="text-sm font-black mb-8 flex items-center gap-3 uppercase tracking-widest text-[#8D6E63]">
                  <CheckCircle2 size={24} className="text-[#E76F51]" /> Pre-Scan Check
                </h3>
                <ul className="space-y-5 text-sm font-bold text-[#3E2723]">
                  <li className="flex gap-4 items-center">
                    <span className="w-10 h-10 rounded-full bg-[#F5EDE4] border border-[#E8D5C4] flex items-center justify-center text-[#8D6E63] shrink-0 font-black">01</span>
                    Clean the area of any makeup.
                  </li>
                  <li className="flex gap-4 items-center">
                    <span className="w-10 h-10 rounded-full bg-[#F5EDE4] border border-[#E8D5C4] flex items-center justify-center text-[#8D6E63] shrink-0 font-black">02</span>
                    Use a plain background.
                  </li>
                  <li className="flex gap-4 items-center">
                    <span className="w-10 h-10 rounded-full bg-[#F5EDE4] border border-[#E8D5C4] flex items-center justify-center text-[#8D6E63] shrink-0 font-black">03</span>
                    Keep camera 10cm away.
                  </li>
                </ul>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#EADBCE]/50 rounded-full blur-2xl pointer-events-none" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
