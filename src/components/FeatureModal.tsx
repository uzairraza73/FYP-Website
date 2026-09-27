"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, BrainCircuit, Target, CheckCircle2, Cpu, Scan, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

function PrecisionScanAnimation() {
  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[500px] flex items-center justify-center bg-[#FDF8F5] rounded-l-[2rem] overflow-hidden">
      {/* Soft skin-like background gradient fallback if image fails, or mixed */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F5E6E0] via-[#EBD9D2] to-[#E3CEC6] opacity-80" />
      
      {/* Skin-tone radial gradient — replaces missing image */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,#D4A89A_0%,#C08B7A_30%,#A0715F_60%,#7A4F3A_100%)] opacity-70" />

      {/* Top Left Badge */}
      <div className="absolute top-6 left-6 z-20 flex items-center gap-3 bg-[#111827] text-white px-5 py-2.5 rounded-full shadow-lg border border-white/10 backdrop-blur-md">
        <div className="w-2.5 h-2.5 rounded-full bg-[#E76F51] animate-pulse" />
        <span className="text-xs font-black tracking-widest uppercase">Scanning</span>
        <div className="flex gap-1 ml-2">
          {[1,2,3,4].map(i => (
            <motion.div 
              key={i} 
              animate={{ height: [8, 14, 8] }} 
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              className="w-1 bg-[#E76F51] rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Main Scanner Group */}
      <div className="relative z-10 flex items-center justify-center">
        {/* The target spot (Mole simulation) */}
        <div className="absolute w-24 h-24 rounded-full bg-[#3E2723]/80 blur-[8px]" />
        <div className="absolute w-20 h-20 rounded-full bg-[#2A1610] blur-[4px] mix-blend-multiply" />

        {/* Glowing Cyan Rings */}
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[320px] h-[320px] rounded-full border border-[#00E5FF]/20 border-dashed"
        />
        <motion.div 
          animate={{ rotate: -360 }} 
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-[280px] h-[280px] rounded-full border-[2px] border-[#00E5FF]/30 border-dotted"
        />
        
        {/* Inner Solid Ring with Glow */}
        <div className="absolute w-[220px] h-[220px] rounded-full border border-[#00E5FF]/50 shadow-[0_0_30px_rgba(0,229,255,0.3)_inset,0_0_30px_rgba(0,229,255,0.3)] flex items-center justify-center">
          {/* Tick marks on ring */}
          {[...Array(12)].map((_, i) => (
            <div key={i} className="absolute w-full h-[2px] bg-transparent" style={{ transform: `rotate(${i * 30}deg)` }}>
              <div className="w-2 h-full bg-[#00E5FF]/60 absolute left-0" />
            </div>
          ))}
        </div>

        {/* Viewfinder Brackets */}
        <div className="absolute w-[180px] h-[180px]">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#00E5FF] rounded-tl-xl shadow-[0_0_15px_#00E5FF]" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#00E5FF] rounded-tr-xl shadow-[0_0_15px_#00E5FF]" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#00E5FF] rounded-bl-xl shadow-[0_0_15px_#00E5FF]" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#00E5FF] rounded-br-xl shadow-[0_0_15px_#00E5FF]" />
        </div>

        {/* Laser Sweep */}
        <motion.div 
          animate={{ top: ["-40%", "140%", "-40%"] }} 
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[360px] h-1 bg-[#00E5FF] shadow-[0_0_20px_5px_rgba(0,229,255,0.6)] left-1/2 -translate-x-1/2"
        />
        
        {/* Intense Central Light */}
        <motion.div 
          animate={{ opacity: [0.3, 0.7, 0.3] }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute w-full h-[2px] bg-white/80 left-0 top-1/2 -translate-y-1/2 shadow-[0_0_30px_10px_rgba(0,229,255,0.5)]"
        />
      </div>

      {/* Floating Info Cards */}
      {/* Top Left */}
      <motion.div 
        animate={{ y: [-5, 5, -5] }} 
        transition={{ duration: 4, repeat: Infinity, delay: 0 }}
        className="absolute top-24 left-8 z-20 bg-white/70 backdrop-blur-md p-3 rounded-2xl border border-white/60 shadow-lg flex flex-col gap-1 w-40"
      >
        <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center mb-1">
          <Cpu size={16} className="text-[#111827]" />
        </div>
        <span className="text-[11px] font-black text-[#111827]">Deep Learning</span>
        <span className="text-[9px] text-slate-500 font-medium leading-tight">Analyzing patterns, shapes & color</span>
        {/* Connector line */}
        <div className="absolute -right-8 top-1/2 w-8 h-[1px] bg-[#00E5FF]/40" />
      </motion.div>

      {/* Top Right */}
      <motion.div 
        animate={{ y: [5, -5, 5] }} 
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        className="absolute top-16 right-8 z-20 bg-white/70 backdrop-blur-md p-3 rounded-2xl border border-white/60 shadow-lg flex flex-col gap-1 w-40"
      >
        <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center mb-1">
          <Target size={16} className="text-[#111827]" />
        </div>
        <span className="text-[11px] font-black text-[#111827]">Real-Time Analysis</span>
        <span className="text-[9px] text-slate-500 font-medium leading-tight">Identifying possible skin concerns</span>
        {/* Connector line */}
        <div className="absolute -left-12 top-1/2 w-12 h-[1px] bg-[#00E5FF]/40" />
      </motion.div>

      {/* Bottom Left */}
      <motion.div 
        animate={{ y: [-4, 4, -4] }} 
        transition={{ duration: 4, repeat: Infinity, delay: 2 }}
        className="absolute bottom-32 left-8 z-20 bg-white/70 backdrop-blur-md p-3 rounded-2xl border border-white/60 shadow-lg flex flex-col gap-1 w-40"
      >
        <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center mb-1">
          <Scan size={16} className="text-[#111827]" />
        </div>
        <span className="text-[11px] font-black text-[#111827]">Lesion Detection</span>
        <span className="text-[9px] text-slate-500 font-medium leading-tight">Scanning multiple angles & layers</span>
        {/* Connector line */}
        <div className="absolute -right-16 top-1/2 w-16 h-[1px] bg-[#00E5FF]/40 -rotate-12" />
      </motion.div>

      {/* Bottom Right */}
      <motion.div 
        animate={{ y: [4, -4, 4] }} 
        transition={{ duration: 4, repeat: Infinity, delay: 3 }}
        className="absolute bottom-24 right-8 z-20 bg-white/70 backdrop-blur-md p-3 rounded-2xl border border-white/60 shadow-lg flex flex-col gap-1 w-40"
      >
        <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center mb-1">
          <CheckCircle2 size={16} className="text-[#111827]" />
        </div>
        <span className="text-[11px] font-black text-[#111827]">High Accuracy</span>
        <span className="text-[9px] text-slate-500 font-medium leading-tight">Powered by advanced AI models</span>
        {/* Connector line */}
        <div className="absolute -left-16 top-1/2 w-16 h-[1px] bg-[#00E5FF]/40 rotate-12" />
      </motion.div>

      {/* Mini Frames Bottom Left */}
      <div className="absolute bottom-6 left-6 z-20 flex gap-3">
        {['FRAME 1', 'FRAME 2', 'FRAME 3'].map((frame, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className={`w-16 h-16 rounded-xl overflow-hidden relative border-2 ${i === 1 ? 'border-[#00E5FF] shadow-[0_0_10px_#00E5FF]' : 'border-white/40'}`}>
               <div className="absolute inset-0 bg-[#E3CEC6]" />
               <div className="absolute w-6 h-6 rounded-full bg-[#3E2723]/60 blur-[2px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
               {i === 1 && (
                 <div className="absolute inset-0 border border-[#00E5FF]/50 m-2 rounded" />
               )}
            </div>
            <span className="text-[9px] font-bold text-white uppercase drop-shadow-md">{frame}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

// Real-Time Tracking Animation
function RealTimeTrackingAnimation({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center bg-[#FDF8F5] rounded-l-[2rem] overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E76F5110_1px,transparent_1px),linear-gradient(to_bottom,#E76F5110_1px,transparent_1px)] bg-[size:2rem_2rem]" />
      
      {/* Animated Glowing Graph Line */}
      <svg className="absolute w-full h-[60%] top-1/2 -translate-y-1/2 z-10" preserveAspectRatio="none" viewBox="0 0 100 100">
        <motion.path
          d="M0 80 Q 20 70 30 40 T 70 50 T 100 20"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E76F51" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#E76F51" stopOpacity="1" />
            <stop offset="100%" stopColor="#FF8C69" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating Data Points */}
      {[20, 50, 80].map((left, i) => (
        <motion.div
          key={i}
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
          className="absolute w-3 h-3 rounded-full bg-[#E76F51] shadow-[0_0_15px_#E76F51] z-20"
          style={{ left: `${left}%`, top: i === 0 ? '60%' : i === 1 ? '40%' : '30%' }}
        />
      ))}

      {/* Central Floating Icon */}
      <motion.div animate={{ y: [-15, 15, -15] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative z-30 w-32 h-32 rounded-3xl bg-white/80 backdrop-blur-xl flex items-center justify-center shadow-[0_20px_50px_rgba(231,111,81,0.2)] border border-white">
        <Icon size={64} className="text-[#E76F51]" />
        
        {/* Pulse ring around icon */}
        <motion.div 
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-3xl border-2 border-[#E76F51]/40"
        />
      </motion.div>
    </div>
  );
}

// Dermatologist Approved Animation
function DermatologistApprovedAnimation({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center bg-[#FDF8F5] rounded-l-[2rem] overflow-hidden">
      <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 5, repeat: Infinity }} className="absolute w-[300px] h-[300px] bg-[#34D399] rounded-full blur-[80px]" />
      
      {/* Rotating Certificate Seal */}
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute w-[340px] h-[340px] border-[2px] border-dashed border-[#10B981]/30 rounded-full"
      />
      <motion.div 
        animate={{ rotate: -360 }} 
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-[380px] h-[380px] border border-[#10B981]/20 rounded-full"
      >
        {/* Badges on the ring */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-[#10B981] rounded-full flex items-center justify-center">
          <CheckCircle2 size={12} className="text-[#10B981]" />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-6 h-6 bg-white border-2 border-[#10B981] rounded-full flex items-center justify-center">
          <CheckCircle2 size={12} className="text-[#10B981]" />
        </div>
      </motion.div>

      {/* Central Shield */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, type: "spring" }}
        className="relative z-20 w-40 h-40 rounded-full bg-white flex items-center justify-center shadow-[0_20px_50px_rgba(16,185,129,0.25)] border-[4px] border-[#10B981]/10"
      >
        <Icon size={80} className="text-[#10B981]" strokeWidth={1.5} />
        
        {/* Scan line effect over the shield */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <motion.div 
            animate={{ top: ["-50%", "150%"] }} 
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-10 bg-gradient-to-b from-transparent via-[#10B981]/20 to-transparent"
          />
        </div>
      </motion.div>
      
      {/* Floating Medical Crosses */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -20, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.8 }}
          className="absolute z-10 w-8 h-8 rounded-lg bg-white shadow-md flex items-center justify-center border border-gray-50"
          style={{ 
            left: `${20 + (i * 20)}%`, 
            top: `${30 + (i % 2 === 0 ? 30 : -10)}%` 
          }}
        >
          <div className="text-[#10B981] text-lg font-bold leading-none">+</div>
        </motion.div>
      ))}
    </div>
  );
}

// Pre-computed random particle directions to avoid Math.random() in render
const PARTICLE_DIRS = [
  { x: 80, y: -60 }, { x: -90, y: 40 }, { x: 60, y: 90 }, { x: -70, y: -80 },
  { x: 100, y: 20 }, { x: -50, y: -90 }, { x: 40, y: 80 }, { x: -80, y: 50 }
];

// Instant Insights Animation
function InstantInsightsAnimation({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center bg-[#FDF8F5] rounded-l-[2rem] overflow-hidden">
      <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }} transition={{ duration: 3, repeat: Infinity }} className="absolute w-[250px] h-[250px] bg-[#F59E0B] rounded-full blur-[70px]" />
      
      {/* Lightning/Data Paths */}
      <div className="absolute inset-0 z-0 opacity-40">
        <svg width="100%" height="100%">
          <motion.path 
            d="M 50% 50% L 10% 20% L 20% 10%" 
            stroke="#F59E0B" strokeWidth="2" fill="none"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, repeat: Infinity }}
          />
          <motion.path 
            d="M 50% 50% L 80% 80% L 90% 60%" 
            stroke="#F59E0B" strokeWidth="2" fill="none"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
          />
          <motion.path 
            d="M 50% 50% L 20% 80% L 10% 70%" 
            stroke="#F59E0B" strokeWidth="2" fill="none"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          />
        </svg>
      </div>

      {/* Central Clock/Icon */}
      <div className="relative z-10 w-36 h-36 rounded-full bg-white flex items-center justify-center shadow-[0_15px_40px_rgba(245,158,11,0.2)] border-2 border-[#F59E0B]/20">
        <Icon size={70} className="text-[#F59E0B]" />
        
        {/* Speed blur effect */}
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-t-4 border-[#F59E0B] opacity-50"
        />
        <motion.div 
          animate={{ rotate: -360 }} 
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-4 rounded-full border-b-2 border-dashed border-[#F59E0B]/40"
        />
      </div>
      
      {/* Rapid floating data bits */}
      {PARTICLE_DIRS.map((dir, i) => (
        <motion.div
          key={i}
          animate={{ 
            x: [0, dir.x], 
            y: [0, dir.y],
            opacity: [1, 0]
          }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 w-2 h-2 rounded bg-[#F59E0B] shadow-[0_0_10px_#F59E0B]"
        />
      ))}
    </div>
  );
}

interface Feature {
  title: string;
  desc: string;
  icon: LucideIcon;
  details?: string[];
}

interface FeatureModalProps {
  feature: Feature | null;
  onClose: () => void;
}

export function FeatureModal({ feature, onClose }: FeatureModalProps) {
  useEffect(() => {
    if (feature) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [feature]);

  if (!feature) return null;

  const slug = feature.title.toLowerCase().replace(/ /g, '-');

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      >
        {/* Light Backdrop */}
        <div 
          className="absolute inset-0 bg-[#FFF5F0]/80 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-6xl bg-[#FAFAFA] rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row max-h-[95vh] border border-white"
        >
          {/* Close Button Top Right (Absolute over everything if needed, but better inside) */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white hover:bg-gray-50 flex items-center justify-center text-slate-400 hover:text-[#111827] transition-colors shadow-sm border border-gray-100"
          >
            <X size={20} />
          </button>

          {/* Left Side: Advanced Animation */}
          <div className="w-full md:w-[60%] relative flex items-center justify-center bg-white">
            {slug === "precision-ai-scan" && <PrecisionScanAnimation />}
            {slug === "real-time-tracking" && <RealTimeTrackingAnimation Icon={feature.icon} />}
            {slug === "dermatologist-approved" && <DermatologistApprovedAnimation Icon={feature.icon} />}
            {slug === "instant-insights" && <InstantInsightsAnimation Icon={feature.icon} />}
          </div>

          {/* Right Side: Details & Timeline */}
          <div className="w-full md:w-[40%] bg-[#FAFAFA] p-8 md:p-12 flex flex-col relative overflow-y-auto">
            
            {/* Header / Logo */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#111827] to-[#374151] flex items-center justify-center text-white font-black text-xl">
                O<span className="text-[#00E5FF]">N</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black tracking-widest text-[#111827]">ONCURA</span>
                <div className="h-[2px] w-full bg-gradient-to-r from-[#E76F51] to-transparent" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl font-black text-[#111827] mb-4 font-plus-jakarta leading-tight">
              {feature.title.split(' ').map((word, i) => (
                <span key={i} className={word.toLowerCase() === 'ai' || word.toLowerCase() === 'scan' ? 'text-[#E76F51]' : ''}>
                  {word}{' '}
                </span>
              ))}
            </h2>
            <p className="text-slate-500 mb-8 text-sm font-medium leading-relaxed">
              {feature.desc} Advanced technology. Early detection. Healthier tomorrow.
            </p>

            {/* AI Progress Card */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#FFF5F0] flex items-center justify-center text-[#E76F51]">
                  <BrainCircuit size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#111827]">
                    AI Analysis <span className="text-gray-300">•</span> <span className="text-[#E76F51]">Scanning</span>
                  </div>
                  <span className="text-sm text-slate-500">Analyzing lesion...</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "68%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#E76F51] to-[#FF9F80] rounded-full"
                  />
                </div>
                <span className="text-sm font-bold text-[#111827]">68%</span>
              </div>
            </div>

            {/* Vertical Timeline */}
            <div className="relative pl-6 mb-12 space-y-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute -left-[30px] w-5 h-5 bg-white border-4 border-[#E76F51] rounded-full" />
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FFF5F0] flex items-center justify-center text-[#E76F51] shrink-0">
                    <Target size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111827]">Image Capture</h4>
                    <p className="text-xs text-slate-500">High-resolution skin image</p>
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative">
                <div className="absolute -left-[30px] w-5 h-5 bg-white border-[3px] border-gray-200 rounded-full" />
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                    <BrainCircuit size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111827]">AI Processing</h4>
                    <p className="text-xs text-slate-500">Pattern & risk analysis</p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="absolute -left-[30px] w-5 h-5 bg-white border-[3px] border-gray-200 rounded-full" />
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#111827]">Results</h4>
                    <p className="text-xs text-slate-500">Detailed insights & recommendations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-auto">
              <Link href="/scan" onClick={onClose} className="block w-full">
                <button className="w-full py-4 px-6 text-base font-bold text-white rounded-2xl bg-gradient-to-r from-[#E76F51] to-[#FF8C69] hover:shadow-[0_15px_30px_rgba(231,111,81,0.3)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                  <Scan size={20} />
                  Start AI Scan <ArrowRight size={18} />
                </button>
              </Link>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
