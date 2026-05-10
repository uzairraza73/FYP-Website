"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { useScanStore } from "@/store/useScanStore";
import { useRouter } from "next/navigation";
import { 
  LineChart, Line, ResponsiveContainer, 
  XAxis, YAxis 
} from "recharts";
import { 
  History, AlertCircle, 
  ChevronRight, Trash2, Search, Filter
} from "lucide-react";
import { cn } from "@/utils/cn";
import { BackButton } from "@/components/BackButton";

interface ScanRecord {
  id: string;
  type: string;
  riskLevel: string;
  confidence: number;
  date: string;
  imageUrl: string;
}

export default function HistoryPage() {
  const { history, setCurrentScan, clearHistory } = useScanStore();
  const router = useRouter();

  const handleSelectScan = (scan: ScanRecord) => {
    // @ts-expect-error - store type mismatch but runtime safe
    setCurrentScan(scan);
    router.push("/result");
  };

  const trendData = [...history].reverse().map(scan => ({
    date: new Date(scan.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    confidence: scan.confidence
  }));

  return (
    <div className="px-6 pt-24 max-w-6xl mx-auto pb-40">
      <div className="mb-8">
        <BackButton />
      </div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-2xl font-black text-white mb-1 font-plus-jakarta">Scan History</h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Monitor your skin health trajectory</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
             <input 
               type="text" 
               placeholder="Search..." 
               className="pl-9 pr-4 py-1.5 rounded-xl border border-white/5 bg-slate-900/50 focus:ring-1 focus:ring-blue-500 outline-none text-[10px] w-full text-white placeholder:text-slate-700 font-bold uppercase"
             />
          </div>
          <button className="p-2 rounded-xl border border-white/5 bg-slate-900/50 text-slate-600 hover:bg-slate-800 transition-colors"><Filter size={14} /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {history.length === 0 ? (
            <GlassCard className="py-20 flex flex-col items-center justify-center text-center bg-slate-900/10 border-white/5">
              <History size={24} className="text-slate-800 mb-4" />
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Repository Empty</p>
            </GlassCard>
          ) : (
            history.map((scan, idx) => (
              <motion.div key={scan.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                <GlassCard className="p-3 flex items-center gap-4 cursor-pointer group bg-slate-900/10 border-white/5" onClick={() => handleSelectScan(scan as ScanRecord)}>
                  <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-white/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={scan.imageUrl} alt="Scan" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn(
                        "px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest",
                        scan.riskLevel === "High" ? "bg-red-500/10 text-red-500" : 
                        scan.riskLevel === "Medium" ? "bg-orange-500/10 text-orange-500" : 
                        "bg-emerald-500/10 text-emerald-500"
                      )}>
                        {scan.riskLevel}
                      </span>
                      <span className="text-[8px] text-slate-700 font-black uppercase tracking-tighter">
                        {new Date(scan.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xs font-black text-slate-100 uppercase tracking-tight">{scan.type}</h3>
                  </div>
                  <ChevronRight size={18} className="text-slate-800 group-hover:text-blue-500 transition-colors" />
                </GlassCard>
              </motion.div>
            ))
          )}

          {history.length > 0 && (
            <button onClick={clearHistory} className="flex items-center gap-2 text-red-500/40 hover:text-red-500 text-[8px] font-black uppercase tracking-widest transition-colors mt-8 mx-auto">
              <Trash2 size={12} /> Purge Repository
            </button>
          )}
        </div>

        <div className="lg:col-span-1 space-y-6">
           <GlassCard className="p-6 bg-slate-900/10 border-white/5">
              <h3 className="text-[9px] font-black text-slate-600 uppercase mb-6 tracking-[0.2em] flex items-center gap-2">
                <AlertCircle size={14} className="text-blue-500" /> Clinical Trends
              </h3>
              
              <div className="h-40 w-full opacity-50">
                {history.length > 1 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={trendData}>
                      <Line type="monotone" dataKey="confidence" stroke="#3B82F6" strokeWidth={2} dot={false} />
                      <XAxis dataKey="date" hide />
                      <YAxis hide />
                    </LineChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex items-center justify-center text-center">
                    <p className="text-[8px] font-black text-slate-700 uppercase tracking-widest">Awaiting Data</p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 p-4 bg-slate-950 rounded-xl border border-white/5">
                 <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[8px] font-black text-slate-700 uppercase tracking-widest mb-1">Total Scans</p>
                      <p className="text-xl font-black text-white">{history.length}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] font-black text-slate-700 uppercase tracking-widest mb-1">Mean Conf.</p>
                      <p className="text-xl font-black text-blue-500">
                        {history.length > 0 ? Math.round(history.reduce((acc, s) => acc + s.confidence, 0) / history.length) : 0}%
                      </p>
                    </div>
                 </div>
              </div>
           </GlassCard>
        </div>
      </div>
    </div>
  );
}
