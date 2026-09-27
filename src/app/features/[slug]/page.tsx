"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Zap, Activity, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Simple mapping for demonstration content per feature
const featureContent: Record<string, { title: string, subtitle: string, icon: LucideIcon, details: string[] }> = {
  "precision-ai-scan": {
    title: "Precision AI Scan",
    subtitle: "Advanced Neural Networks for Dermatology",
    icon: Zap,
    details: [
      "Trained on over 100,000 clinical images",
      "Maintains a 99.2% accuracy rate in early detection",
      "Identifies microscopic morphological changes",
      "Instant feedback with confidence scoring"
    ]
  },
  "real-time-tracking": {
    title: "Real-time Tracking",
    subtitle: "Monitor Lesion Progression Over Time",
    icon: Activity,
    details: [
      "Visual timeline of all scanned skin areas",
      "Automated comparison of lesion size and borders",
      "Smart alerts for suspicious growth patterns",
      "Secure history logging on your device"
    ]
  },
  "dermatologist-approved": {
    title: "Dermatologist Approved",
    subtitle: "Clinical-Grade Diagnostic Support",
    icon: ShieldCheck,
    details: [
      "Verified by top board-certified dermatologists",
      "Compliant with medical diagnostic standards",
      "Seamless referral system to local specialists",
      "Designed as a reliable secondary opinion tool"
    ]
  },
  "instant-insights": {
    title: "Instant Insights",
    subtitle: "Rapid Processing & Results",
    icon: Clock,
    details: [
      "Results delivered in under 4 seconds",
      "Edge computing for faster image analysis",
      "Detailed, easy-to-understand breakdown report",
      "Next-step actionable recommendations"
    ]
  }
};

// Dynamic Animation Component
function FeatureAnimation({ slug, Icon }: { slug: string, Icon: LucideIcon }) {
  if (slug === "real-time-tracking") {
    return (
      <div className="relative w-full h-[400px] flex items-center justify-center">
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 3, repeat: Infinity }} className="absolute w-[300px] h-[300px] bg-[#5C4033]/10 rounded-full blur-xl" />
        
        {/* Animated Graph Bars */}
        <div className="absolute w-64 h-40 flex items-end justify-between px-4 z-0">
          {[40, 70, 45, 90, 60].map((height, i) => (
            <motion.div 
              key={i}
              initial={{ height: 20 }}
              animate={{ height: [20, height, 20] }} 
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
              className="w-6 bg-[#FFD8C2]/60 rounded-t-xl"
            />
          ))}
        </div>

        <motion.div animate={{ y: [-8, 8, -8] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="relative z-10 w-40 h-40 rounded-3xl bg-white/90 backdrop-blur-xl border border-white flex items-center justify-center shadow-xl">
          <Icon size={70} className="text-[#5C4033]" />
        </motion.div>
      </div>
    );
  }
  
  if (slug === "precision-ai-scan") {
    return (
      <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute w-[300px] h-[300px] bg-[#E76F51]/20 rounded-full blur-xl" />
        
        <div className="relative z-10 w-48 h-48 rounded-[2rem] bg-white/90 backdrop-blur-xl border border-white flex items-center justify-center shadow-[0_20px_50px_rgba(231,111,81,0.2)] overflow-hidden">
          <Icon size={80} className="text-[#E76F51]" />
          
          {/* Laser scan line */}
          <motion.div 
            animate={{ top: ["-10%", "110%", "-10%"] }} 
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-1 bg-[#E76F51] shadow-[0_0_20px_4px_#E76F51]"
          />
        </div>
      </div>
    );
  }

  // default / others
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute w-[300px] h-[300px] bg-[#E76F51]/20 rounded-full blur-xl" />
      <motion.div animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} className="absolute w-[200px] h-[200px] bg-[#FFD8C2]/40 rounded-full blur-lg" />
      
      <motion.div animate={{ y: [-15, 15, -15], rotate: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity }} className="relative z-10 w-48 h-48 rounded-[3rem] bg-white/80 backdrop-blur-md border-2 border-white flex items-center justify-center shadow-xl">
        <Icon size={80} className="text-[#E76F51]" />
      </motion.div>
      
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute w-[350px] h-[350px] rounded-full border border-[#E76F51]/10">
        <div className="absolute top-0 left-1/2 w-4 h-4 rounded-full bg-[#E76F51]/40 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-3 h-3 rounded-full bg-[#E76F51]/30" />
      </motion.div>
    </div>
  );
}

export default function FeaturePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const content = featureContent[resolvedParams.slug] || featureContent["precision-ai-scan"];
  const Icon = content.icon;

  return (
    <main className="min-h-screen pt-24 pb-32 bg-[#FFF5F0]">
      {/* Dynamic Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <Link href="/" className="inline-flex items-center gap-4 bg-[#5C4033]/5 hover:bg-[#5C4033]/10 text-[#5C4033] font-black uppercase tracking-widest pl-2 pr-6 py-2 rounded-full transition-all duration-300 mb-8 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-[#5C4033] text-white flex items-center justify-center shadow-md">
            <ArrowLeft size={20} />
          </div>
          GO BACK
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-[#FFD8C2] flex items-center justify-center text-[#E76F51]">
            <Icon size={32} />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-[#111827] font-plus-jakarta">{content.title}</h1>
            <p className="text-[#E76F51] font-bold text-lg mt-1 tracking-wide">{content.subtitle}</p>
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Detailed Information */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-8 order-2 lg:order-1"
        >
          <div className="p-8 rounded-[2rem] bg-white/60 backdrop-blur-md border border-[#FFD8C2] shadow-sm">
            <h3 className="text-2xl font-black text-[#111827] mb-6">Core Capabilities</h3>
            <ul className="space-y-6">
              {content.details.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-[#FFEBE0] flex items-center justify-center shrink-0">
                    <ShieldCheck size={12} className="text-[#E76F51]" />
                  </div>
                  <p className="text-slate-600 font-medium leading-relaxed">{detail}</p>
                </li>
              ))}
            </ul>
          </div>

          <Link href="/scan">
            <button className="w-full py-5 text-lg font-bold text-white rounded-2xl bg-gradient-to-r from-[#E76F51] to-[#FF8C69] hover:shadow-[0_15px_30px_rgba(231,111,81,0.4)] transition-all hover:-translate-y-1">
              Start Using {content.title}
            </button>
          </Link>
        </motion.div>

        {/* Small Animation on the Side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="order-1 lg:order-2"
        >
          <FeatureAnimation slug={resolvedParams.slug} Icon={Icon} />
        </motion.div>
      </div>
    </main>
  );
}
