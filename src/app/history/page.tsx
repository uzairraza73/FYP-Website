"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { useScanStore } from "@/store/useScanStore";
import { useRouter } from "next/navigation";
import { 
  LineChart, Line, ResponsiveContainer, 
  XAxis, YAxis, Tooltip
} from "recharts";
import { 
  History, AlertCircle, 
  ChevronRight, Trash2, Search, Filter, Activity, FileText
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
    <div className="min-h-screen bg-[#F0E8DF] font-plus-jakarta relative overflow-hidden">
      
      {/* Global Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#D4A98A]/25 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] bg-[#C69C7B]/15 rounded-full blur-[100px]" />
      </div>

      <div className="px-6 pt-24 max-w-6xl mx-auto pb-40 relative z-10">
        <div className="mb-8">
          <BackButton />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h1 className="text-4xl font-black text-[#3E2723] mb-2 leading-tight">Medical Records</h1>
            <p className="text-xs text-[#8D6E63] uppercase tracking-widest font-bold">Monitor your skin health trajectory</p>
          </div>
          <div className="flex gap-3">
            <div className="relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A1887F]" size={16} />
               <input 
                 type="text" 
                 placeholder="Search records..." 
                 className="pl-10 pr-5 py-2.5 rounded-full border border-white/80 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-[#D4A98A] outline-none text-xs w-full md:w-64 text-[#3E2723] placeholder:text-[#A1887F] font-semibold transition-all shadow-sm"
               />
            </div>
            <button className="p-2.5 rounded-full border border-white/80 bg-white/80 backdrop-blur-sm text-[#8D6E63] hover:bg-white transition-all shadow-sm">
              <Filter size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {history.length === 0 ? (
              <div className="bg-white/75 backdrop-blur-xl border border-white/90 rounded-[2rem] p-12 flex flex-col items-center justify-center text-center shadow-[0_6px_30px_rgba(92,64,51,0.05)]">
                <div className="w-16 h-16 rounded-2xl bg-[#F0E8DF] border border-[#E8D5C4] flex items-center justify-center text-[#8D6E63] mb-6">
                  <FileText size={32} />
                </div>
                <h3 className="text-xl font-black text-[#3E2723] mb-2">No Records Found</h3>
                <p className="text-sm text-[#7D5A4F] font-medium max-w-sm">
                  You haven't performed any AI scans yet. Start a new scan to begin tracking your skin health.
                </p>
                <button 
                  onClick={() => router.push("/scan")} 
                  className="mt-6 px-6 py-3 bg-[#8D6E63] hover:bg-[#5C4033] text-white text-sm font-black rounded-full transition-all shadow-md"
                >
                  Start First Scan
                </button>
              </div>
            ) : (
              history.map((scan, idx) => (
                <motion.div key={scan.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                  <div 
                    className="relative bg-white/75 backdrop-blur-xl border border-white/90 rounded-3xl p-4 flex items-center gap-5 cursor-pointer group hover:-translate-y-1 transition-all duration-300 shadow-[0_6px_30px_rgba(92,64,51,0.03)] hover:shadow-[0_16px_40px_rgba(212,169,138,0.15)] overflow-hidden" 
                    onClick={() => handleSelectScan(scan as ScanRecord)}
                  >
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#EADBCE]/40 rounded-full blur-2xl pointer-events-none group-hover:scale-110 transition-transform" />
                    
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 border-white shadow-sm z-10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={scan.imageUrl} alt="Scan" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    
                    <div className="flex-grow min-w-0 z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                          scan.riskLevel === "High" ? "bg-red-100 text-red-600" : 
                          scan.riskLevel === "Medium" ? "bg-orange-100 text-orange-600" : 
                          "bg-emerald-100 text-emerald-600"
                        )}>
                          {scan.riskLevel} Risk
                        </span>
                        <span className="text-[10px] text-[#A1887F] font-bold">
                          {new Date(scan.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-[#3E2723]">{scan.type}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Activity size={12} className="text-[#8D6E63]" />
                        <span className="text-xs text-[#7D5A4F] font-medium">{scan.confidence}% Confidence Match</span>
                      </div>
                    </div>
                    
                    <div className="w-10 h-10 rounded-full bg-[#F0E8DF] border border-[#E8D5C4] flex items-center justify-center text-[#8D6E63] group-hover:bg-[#8D6E63] group-hover:text-white group-hover:border-[#8D6E63] transition-all duration-300 z-10 mr-2">
                      <ChevronRight size={18} />
                    </div>
                  </div>
                </motion.div>
              ))
            )}

            {history.length > 0 && (
              <button onClick={clearHistory} className="flex items-center justify-center gap-2 w-full text-red-400 hover:text-red-600 text-xs font-black uppercase tracking-widest transition-colors py-6 mt-4 rounded-3xl hover:bg-red-50/50">
                <Trash2 size={14} /> Clear All Records
              </button>
            )}
          </div>

          <div className="lg:col-span-1 space-y-6">
             <div className="bg-white/75 backdrop-blur-xl border border-white/90 rounded-[2rem] p-7 shadow-[0_6px_30px_rgba(92,64,51,0.05)] relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#D4A98A]/20 rounded-full blur-2xl pointer-events-none" />
                
                <h3 className="text-xs font-black text-[#8D6E63] uppercase mb-6 tracking-widest flex items-center gap-2 relative z-10">
                  <AlertCircle size={16} className="text-[#E76F51]" /> Clinical Trends
                </h3>
                
                <div className="h-48 w-full relative z-10">
                  {history.length > 1 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData}>
                        <Line type="monotone" dataKey="confidence" stroke="#8D6E63" strokeWidth={3} dot={{ r: 4, fill: '#E76F51', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#E76F51' }} />
                        <XAxis dataKey="date" hide />
                        <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                        <Tooltip 
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontWeight: 'bold', color: '#3E2723' }}
                          itemStyle={{ color: '#E76F51' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-center bg-[#F5EDE4] rounded-2xl border border-[#E8D5C4]">
                      <p className="text-xs font-black text-[#A1887F] uppercase tracking-widest px-4">Need more scans to show trends</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-8 p-5 bg-[#F5EDE4] rounded-2xl border border-[#E8D5C4] relative z-10">
                   <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[10px] font-black text-[#A1887F] uppercase tracking-widest mb-1">Total Scans</p>
                        <p className="text-2xl font-black text-[#3E2723]">{history.length}</p>
                      </div>
                      <div className="h-8 w-[1px] bg-[#D7CCC8]" />
                      <div className="text-right">
                        <p className="text-[10px] font-black text-[#A1887F] uppercase tracking-widest mb-1">Mean Conf.</p>
                        <p className="text-2xl font-black text-[#E76F51]">
                          {history.length > 0 ? Math.round(history.reduce((acc, s) => acc + s.confidence, 0) / history.length) : 0}%
                        </p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
