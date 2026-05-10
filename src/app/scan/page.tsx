"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { PremiumButton } from "@/components/PremiumButton";
import { Upload, ShieldAlert, CheckCircle2, X, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useScanStore } from "@/store/useScanStore";
import { generateMockResult } from "@/utils/mockData";
import { cn } from "@/utils/cn";
import { BackButton } from "@/components/BackButton";

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
    <div className="px-6 pt-24 max-w-4xl mx-auto min-h-screen pb-32">
      <div className="mb-8">
        <BackButton />
      </div>
      <div className="text-center mb-10">
        <h1 className="text-2xl font-black text-white mb-2 font-plus-jakarta">AI Skin Analysis</h1>
        <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Upload clinical photo for evaluation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <GlassCard className="p-4 bg-blue-500/5 border-blue-500/10">
            <h3 className="text-xs font-bold text-blue-400 mb-3 flex items-center gap-2 uppercase tracking-widest">
              <ShieldAlert size={14} /> Guidelines
            </h3>
            <ul className="text-[10px] text-slate-400 space-y-2 font-medium">
              <li className="flex gap-2">
                <CheckCircle2 size={12} className="shrink-0 mt-0.5 text-blue-500" />
                Use bright, natural lighting.
              </li>
              <li className="flex gap-2">
                <CheckCircle2 size={12} className="shrink-0 mt-0.5 text-blue-500" />
                Center the spot in the frame.
              </li>
              <li className="flex gap-2">
                <CheckCircle2 size={12} className="shrink-0 mt-0.5 text-blue-500" />
                Ensure the image is in focus.
              </li>
            </ul>
          </GlassCard>

          <GlassCard className="p-4 bg-slate-900/10 border-white/5">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 w-3.5 h-3.5 rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="consent" className="text-[10px] text-slate-500 leading-relaxed cursor-pointer font-bold uppercase tracking-tight">
                I understand this is an AI tool and not a diagnosis. I consent to image processing.
              </label>
            </div>
          </GlassCard>
        </div>

        <div className="md:col-span-2">
          <GlassCard
            className={cn(
              "relative h-[350px] flex flex-col items-center justify-center border-2 border-dashed transition-all duration-500 overflow-hidden rounded-2xl",
              image ? "border-blue-500/30 bg-blue-500/5" : "border-slate-800/50 hover:border-blue-500/20 hover:bg-blue-500/5"
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
                  className="flex flex-col items-center gap-4 cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-slate-900/50 flex items-center justify-center text-blue-400 border border-white/5">
                    <Upload size={24} />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">Select Image</p>
                    <p className="text-[9px] text-slate-500 uppercase font-bold tracking-tighter mt-1">JPG, PNG (Max 5MB)</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative w-full h-full flex items-center justify-center p-6"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image}
                    alt="Preview"
                    className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/5"
                  />

                  {isScanning && (
                    <div className="absolute inset-6 overflow-hidden rounded-xl">
                      <motion.div
                        initial={{ top: "0%" }}
                        animate={{ top: "100%" }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="laser-scan-line"
                      />
                      <div className="absolute inset-0 bg-blue-500/10 animate-pulse" />
                    </div>
                  )}

                  {!isScanning && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setImage(null); }}
                      className="absolute top-8 right-8 w-7 h-7 rounded-full bg-slate-900/80 text-white flex items-center justify-center shadow-lg hover:bg-red-500 transition-colors border border-white/10"
                    >
                      <X size={14} />
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>

          <div className="mt-6 flex justify-center">
            <PremiumButton
              glow={consent && !!image}
              disabled={!consent || !image || isScanning}
              onClick={startScan}
              className={cn(
                "w-full max-w-sm py-3",
                (!consent || !image) && "opacity-30 grayscale cursor-not-allowed"
              )}
            >
              {isScanning ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="animate-spin" size={14} />
                  Analyzing...
                </span>
              ) : (
                "Initialize AI Scan"
              )}
            </PremiumButton>
          </div>
        </div>
      </div>

      <section className="mt-24 border-t border-white/5 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-black text-white mb-4 font-plus-jakarta">Clinical Protocol</h2>
            <p className="text-xs text-slate-500 leading-relaxed mb-6 font-medium">
              Our neural network uses multi-spectral analysis to identify patterns consistent with known skin conditions.
              The system processes pixel-level data for morphological irregularity.
            </p>
            <div className="space-y-3">
              {[
                "Multi-spectral Analysis",
                "Edge Detection Algorithms",
                "Pigment Mapping"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  <div className="w-1 h-1 rounded-full bg-blue-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <GlassCard className="p-6 bg-blue-600 text-white border-none relative overflow-hidden shadow-2xl rounded-2xl">
            <div className="relative z-10">
              <h3 className="text-xs font-bold mb-4 flex items-center gap-2 uppercase tracking-widest">
                <CheckCircle2 size={16} /> Pre-Scan Check
              </h3>
              <ul className="space-y-3 text-[10px] text-blue-100 font-bold uppercase tracking-tight">
                <li className="flex gap-2">
                  <span className="opacity-40">01</span>
                  Clean the area of any makeup.
                </li>
                <li className="flex gap-2">
                  <span className="opacity-40">02</span>
                  Use a plain background.
                </li>
                <li className="flex gap-2">
                  <span className="opacity-40">03</span>
                  Keep camera 10cm away.
                </li>
              </ul>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
