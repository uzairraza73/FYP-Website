"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScanStore } from "@/store/useScanStore";
import { useRouter } from "next/navigation";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, 
  RadarChart, PolarGrid, PolarAngleAxis, Radar
} from "recharts";
import { 
  Share2, Download, Sparkles, AlertCircle, CheckCircle2, Info
} from "lucide-react";
import { cn } from "@/utils/cn";
import { BackButton } from "@/components/BackButton";
import Link from "next/link";

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

  const COLORS = ["#8D6E63", "#E8D5C4"];

  const getRiskStyles = () => {
    switch (currentScan.riskLevel) {
      case "Low": return "text-emerald-600 bg-emerald-50 border-emerald-100";
      case "Medium": return "text-orange-600 bg-orange-50 border-orange-100";
      case "High": return "text-red-600 bg-red-50 border-red-100";
    }
  };

  const getRiskIcon = () => {
    switch (currentScan.riskLevel) {
      case "Low": return <CheckCircle2 size={24} className="text-emerald-500 mb-2" />;
      case "Medium": return <AlertCircle size={24} className="text-orange-500 mb-2" />;
      case "High": return <AlertCircle size={24} className="text-red-500 mb-2" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F0E8DF] font-plus-jakarta relative overflow-hidden">
      {/* Global Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#D4A98A]/25 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] bg-[#C69C7B]/15 rounded-full blur-[100px]" />
      </div>

      <div className="px-6 pt-24 max-w-6xl mx-auto pb-40 relative z-10">
        <div className="flex items-center justify-between mb-10">
          <BackButton />
          <div className="flex gap-3">
            <button className="p-2.5 rounded-full bg-white/70 backdrop-blur-sm border border-white/80 text-[#8D6E63] hover:text-[#5C4033] hover:bg-white transition-all shadow-sm">
              <Share2 size={16} />
            </button>
            <button className="p-2.5 rounded-full bg-white/70 backdrop-blur-sm border border-white/80 text-[#8D6E63] hover:text-[#5C4033] hover:bg-white transition-all shadow-sm">
              <Download size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            {/* Image Card */}
            <div className="bg-white/75 backdrop-blur-xl p-3 border border-white/90 shadow-[0_10px_40px_rgba(92,64,51,0.08)] rounded-[2.5rem] relative overflow-hidden">
               <div className="aspect-square relative rounded-[2rem] overflow-hidden border border-white/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={currentScan.imageUrl} alt="Scan" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723]/80 via-[#3E2723]/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 text-white">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FFD8C2] mb-1">Target Analysis</p>
                    <p className="text-2xl font-black">{currentScan.type}</p>
                  </div>
               </div>
            </div>

            {/* Risk Card */}
            <div className={cn("p-8 flex flex-col items-center text-center rounded-[2.5rem] shadow-[0_6px_30px_rgba(92,64,51,0.04)] border border-white/90 bg-white/75 backdrop-blur-xl relative overflow-hidden")}>
              {getRiskIcon()}
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A1887F] mb-1">Health Status</p>
              <h2 className={cn("text-3xl font-black tracking-tight", getRiskStyles().split(" ")[0])}>{currentScan.riskLevel} Risk</h2>
              <p className="mt-4 text-xs leading-relaxed font-semibold text-[#7D5A4F]">
                {currentScan.riskLevel === "High" ? "Immediate clinical evaluation required. Please consult a dermatologist." : 
                 currentScan.riskLevel === "Medium" ? "Professional consultation recommended to ensure safety." : 
                 "Routine monitoring encouraged. Keep tracking changes."}
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            {/* Tabs */}
            <div className="flex gap-2 p-1.5 bg-white/60 backdrop-blur-md rounded-2xl w-fit border border-[#E8D5C4] shadow-sm">
              <button 
                onClick={() => setActiveTab("analysis")}
                className={cn("px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all", activeTab === "analysis" ? "bg-[#8D6E63] text-white shadow-md" : "text-[#A1887F] hover:text-[#5C4033]")}
              >
                Analysis
              </button>
              <button 
                onClick={() => setActiveTab("care")}
                className={cn("px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all", activeTab === "care" ? "bg-[#8D6E63] text-white shadow-md" : "text-[#A1887F] hover:text-[#5C4033]")}
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
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {/* Confidence Chart */}
                  <div className="flex flex-col items-center justify-center p-8 h-[300px] bg-white/75 backdrop-blur-xl border border-white/90 rounded-[2rem] shadow-[0_6px_30px_rgba(92,64,51,0.04)] relative">
                    <h3 className="text-[10px] font-black text-[#A1887F] uppercase tracking-widest mb-2">Confidence Index</h3>
                    <div className="relative w-full h-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie data={chartData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" startAngle={225} endAngle={-45} stroke="none">
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center mt-4">
                        <span className="text-4xl font-black text-[#3E2723]">{currentScan.confidence}%</span>
                        <span className="text-[9px] font-bold text-[#E76F51] uppercase tracking-widest mt-1">Reliability</span>
                      </div>
                    </div>
                  </div>

                  {/* Morphology Radar */}
                  <div className="p-8 h-[300px] bg-white/75 backdrop-blur-xl border border-white/90 rounded-[2rem] shadow-[0_6px_30px_rgba(92,64,51,0.04)] flex flex-col items-center">
                     <h3 className="text-[10px] font-black text-[#A1887F] uppercase tracking-widest mb-2">Morphology</h3>
                     <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                          <PolarGrid stroke="#E8D5C4" strokeWidth={1} />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: "#8D6E63", fontSize: 10, fontWeight: 800 }} />
                          <Radar name="Scan" dataKey="A" stroke="#E76F51" strokeWidth={2} fill="#E76F51" fillOpacity={0.2} />
                        </RadarChart>
                     </ResponsiveContainer>
                  </div>

                  {/* Clinical Findings */}
                  <div className="md:col-span-2 p-8 bg-white/75 backdrop-blur-xl border border-white/90 rounded-[2rem] shadow-[0_6px_30px_rgba(92,64,51,0.04)]">
                     <h3 className="text-xs font-black text-[#3E2723] uppercase mb-4 tracking-widest">Clinical Findings</h3>
                     <div className="flex gap-4 items-start p-5 bg-[#F5EDE4] rounded-2xl border border-[#E8D5C4]">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm mt-0.5 text-[#E76F51]">
                          <Sparkles size={16} />
                        </div>
                        <p className="text-sm text-[#7D5A4F] leading-relaxed font-medium">
                          Analyzed morphological patterns indicate {currentScan.riskLevel === "Low" ? "stable" : "evolving"} structural traits. 
                          The <span className="font-bold text-[#3E2723]">{currentScan.type}</span> detection shows <span className="font-bold text-[#3E2723]">{currentScan.confidence}%</span> alignment with clinical baseline data. 
                          Please note that AI is an assistant tool, and final diagnosis requires a professional.
                        </p>
                     </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="care"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                     {currentScan.recommendations.map((rec, idx) => (
                        <div key={idx} className="p-8 flex flex-col items-center text-center bg-white/75 backdrop-blur-xl border border-white/90 shadow-[0_6px_30px_rgba(92,64,51,0.04)] rounded-[2rem] hover:-translate-y-1 transition-transform cursor-default">
                           <div className="w-12 h-12 rounded-2xl bg-[#F5EDE4] border border-[#E8D5C4] flex items-center justify-center text-[#E76F51] font-black mb-4">
                             0{idx + 1}
                           </div>
                           <p className="text-xs text-[#5C4033] font-bold leading-relaxed">{rec}</p>
                        </div>
                     ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                     <div className="p-8 bg-gradient-to-br from-[#8D6E63] to-[#5C4033] text-white border-none shadow-[0_15px_40px_rgba(92,64,51,0.2)] rounded-[2.5rem] relative overflow-hidden group">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:scale-110 transition-transform" />
                        <div className="relative z-10">
                          <h3 className="text-xl font-black mb-2 tracking-tight">Specialist Portal</h3>
                          <p className="text-sm text-white/80 font-medium mb-8 leading-relaxed">Find certified dermatologists near your location for clinical validation and in-depth diagnosis.</p>
                          <Link href="/consult">
                            <button className="w-full py-4 bg-white text-[#5C4033] hover:bg-[#F0E8DF] font-black text-xs uppercase tracking-widest rounded-full transition-colors shadow-lg">
                              View Local Doctors
                            </button>
                          </Link>
                        </div>
                     </div>

                     <div className="p-8 bg-white/75 backdrop-blur-xl border border-white/90 rounded-[2.5rem] shadow-[0_6px_30px_rgba(92,64,51,0.04)] flex flex-col justify-between">
                        <div>
                          <h3 className="text-xl font-black text-[#3E2723] mb-2 tracking-tight">Clinical Guides</h3>
                          <p className="text-sm text-[#7D5A4F] font-medium mb-8 leading-relaxed">Access research papers and morphological health guides on skin evolution and proper care routines.</p>
                        </div>
                        <button className="w-full py-4 bg-[#F5EDE4] border border-[#E8D5C4] text-[#8D6E63] hover:bg-white hover:text-[#5C4033] font-black text-xs uppercase tracking-widest rounded-full transition-all">
                          Explore Hub
                        </button>
                     </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
