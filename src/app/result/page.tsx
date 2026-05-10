"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { PremiumButton } from "@/components/PremiumButton";
import { useScanStore } from "@/store/useScanStore";
import { useRouter } from "next/navigation";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  RadarChart, PolarGrid, PolarAngleAxis, Radar
} from "recharts";
import { 
  ArrowLeft, 
  Share2, Download, Sparkles
} from "lucide-react";
import { cn } from "@/utils/cn";
import { BackButton } from "@/components/BackButton";

export default function ResultPage() {
  const { currentScan } = useScanStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"analysis" | "care">("analysis");

  useEffect(() => {
    if (!currentScan) {
      router.push("/scan");
    }
  }, [currentScan, router]);

  if (!currentScan) return null;

  const chartData = [
    { name: "Confidence", value: currentScan.confidence },
    { name: "Remaining", value: 100 - currentScan.confidence }
  ];

  const radarData = [
    { subject: "Symmetry", A: 85 },
    { subject: "Border", A: 70 },
    { subject: "Color", A: 90 },
    { subject: "Diameter", A: 65 },
    { subject: "Evolution", A: 80 },
  ];

  const COLORS = ["#3B82F6", "#0F172A"];

  const getRiskStyles = () => {
    switch (currentScan.riskLevel) {
      case "Low": return "text-emerald-400 bg-emerald-500/5 border-emerald-500/10";
      case "Medium": return "text-orange-400 bg-orange-500/5 border-orange-500/10";
      case "High": return "text-red-400 bg-red-500/5 border-red-500/10";
    }
  };

  return (
    <div className="px-6 pt-24 max-w-5xl mx-auto pb-40">
      <div className="flex items-center justify-between mb-10">
        <BackButton />
        <div className="flex gap-2">
          <button className="p-2 rounded-xl border border-white/5 text-slate-600 hover:bg-white/5 transition-colors"><Share2 size={14} /></button>
          <button className="p-2 rounded-xl border border-white/5 text-slate-600 hover:bg-white/5 transition-colors"><Download size={14} /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-4">
          <GlassCard className="p-0 overflow-hidden border-white/5 shadow-3xl rounded-2xl">
             <div className="aspect-square relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={currentScan.imageUrl} alt="Scan" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-[8px] font-black uppercase tracking-[0.2em] opacity-40 mb-1">Target Analysis</p>
                  <p className="text-sm font-black uppercase tracking-tight">{currentScan.type}</p>
                </div>
             </div>
          </GlassCard>

          <GlassCard className={cn("p-6 flex flex-col items-center text-center rounded-2xl", getRiskStyles())}>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40 mb-3">Health Status</p>
            <h2 className="text-2xl font-black uppercase tracking-tighter">{currentScan.riskLevel} Risk</h2>
            <p className="mt-3 text-[10px] leading-relaxed font-bold opacity-60 uppercase tracking-tight">
              {currentScan.riskLevel === "High" ? "Immediate clinical evaluation required." : 
               currentScan.riskLevel === "Medium" ? "Professional consultation recommended." : 
               "Routine monitoring encouraged."}
            </p>
          </GlassCard>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="flex gap-2 p-1 bg-slate-900/40 backdrop-blur-3xl rounded-xl w-fit border border-white/5">
            <button 
              onClick={() => setActiveTab("analysis")}
              className={cn("px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", activeTab === "analysis" ? "bg-blue-600 text-white" : "text-slate-600")}
            >
              Analysis
            </button>
            <button 
              onClick={() => setActiveTab("care")}
              className={cn("px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", activeTab === "care" ? "bg-blue-600 text-white" : "text-slate-600")}
            >
              Protocol
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "analysis" ? (
              <motion.div
                key="analysis"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <GlassCard className="flex flex-col items-center justify-center p-6 h-[250px] bg-slate-900/10 border-white/5">
                  <h3 className="text-[9px] font-black text-slate-600 uppercase mb-4 tracking-[0.2em]">Confidence Index</h3>
                  <div className="relative w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={chartData} innerRadius={50} outerRadius={65} paddingAngle={5} dataKey="value" startAngle={180} endAngle={0}>
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center mt-6">
                      <span className="text-2xl font-black text-white">{currentScan.confidence}%</span>
                      <span className="text-[8px] font-bold text-blue-500 uppercase tracking-widest">Reliability</span>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-6 h-[250px] bg-slate-900/10 border-white/5">
                   <h3 className="text-[9px] font-black text-slate-600 uppercase mb-4 tracking-[0.2em]">Morphology</h3>
                   <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                        <PolarGrid stroke="#1E293B" strokeWidth={0.5} />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: "#475569", fontSize: 8, fontWeight: 900 }} />
                        <Radar name="Scan" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.4} />
                      </RadarChart>
                   </ResponsiveContainer>
                </GlassCard>

                <GlassCard className="md:col-span-2 p-5 bg-slate-900/10 border-white/5">
                   <h3 className="text-[9px] font-black text-slate-600 uppercase mb-4 tracking-[0.2em]">Clinical Findings</h3>
                   <div className="flex gap-4 items-start p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
                      <Sparkles size={14} className="text-blue-500 mt-0.5" />
                      <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
                        Analyzed morphological patterns indicate {currentScan.riskLevel === "Low" ? "stable" : "evolving"} structural traits. {currentScan.type} detection shows {currentScan.confidence}% alignment with clinical baseline data.
                      </p>
                   </div>
                </GlassCard>
              </motion.div>
            ) : (
              <motion.div
                key="care"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex overflow-x-auto gap-4 pb-2 -mx-6 px-6 no-scrollbar">
                   {currentScan.recommendations.map((rec, idx) => (
                      <GlassCard key={idx} className="min-w-[220px] p-6 flex flex-col items-center text-center bg-slate-900/10 border-white/5 rounded-2xl">
                         <div className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-4 opacity-40">STEP 0{idx + 1}</div>
                         <p className="text-[10px] text-slate-300 font-bold uppercase tracking-tight leading-relaxed">{rec}</p>
                      </GlassCard>
                   ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <GlassCard className="p-6 bg-blue-600 text-white border-none shadow-2xl rounded-2xl">
                      <h3 className="text-sm font-black mb-2 uppercase tracking-tight">Specialist Portal</h3>
                      <p className="text-[10px] text-blue-100 font-medium mb-6 opacity-80 uppercase tracking-tight">Find certified dermatologists near your location for clinical validation.</p>
                      <PremiumButton className="w-full bg-white text-blue-600 hover:bg-blue-50 border-none shadow-none">
                        View Local Doctors
                      </PremiumButton>
                   </GlassCard>

                   <GlassCard className="p-6 bg-slate-900/20 border-white/5 rounded-2xl">
                      <h3 className="text-sm font-black text-white mb-2 uppercase tracking-tight">Clinical Guides</h3>
                      <p className="text-[10px] text-slate-500 font-medium mb-6 opacity-80 uppercase tracking-tight">Access research papers and morphological health guides on skin evolution.</p>
                      <PremiumButton variant="secondary" className="w-full">
                        Explore Hub
                      </PremiumButton>
                   </GlassCard>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
