"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowLeft, ArrowRight, Camera, BrainCircuit, 
  BarChart2, MessageSquare, History, Stethoscope, 
  ShieldCheck, Activity, Eye, Zap, AlertCircle 
} from "lucide-react";

const steps = [
  { id: "1", title: "Capture", desc: "Take or upload a clear skin image.", icon: Camera },
  { id: "2", title: "Analyze", desc: "AI examines the image for visual patterns.", icon: BrainCircuit },
  { id: "3", title: "Understand", desc: "View the predicted condition and confidence score.", icon: Eye },
  { id: "4", title: "Take Action", desc: "Follow helpful care guidance and consult a doctor when needed.", icon: Activity },
];

const features = [
  { title: "Easy image scanning", icon: Camera },
  { title: "AI-powered analysis", icon: BrainCircuit },
  { title: "Confidence score", icon: BarChart2 },
  { title: "AI care assistant", icon: MessageSquare },
  { title: "Scan history & reports", icon: History },
  { title: "Doctor referral support", icon: Stethoscope },
];

export default function LearnMorePage() {
  return (
    <main className="min-h-screen bg-[#FFF5F0] font-plus-jakarta pb-32">
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#3E2723] to-[#5C4033] text-white py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,#E76F51,transparent_60%)]" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.2) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <Link href="/" className="inline-flex items-center gap-3 mb-10 group bg-white/10 border border-white/20 px-5 py-2.5 rounded-full hover:bg-white/20 transition-colors">
            <ArrowLeft size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Back to Home</span>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-[#E76F51] flex items-center justify-center shadow-lg shadow-[#E76F51]/30">
                <Stethoscope size={32} className="text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
              Learn More About <span className="text-[#FFD8C2]">Oncura AI</span>
            </h1>
            <p className="text-xl md:text-2xl font-bold text-[#FFD8C2] mb-6">
              Smarter Skin Health Starts Here
            </p>
            <p className="text-white/80 font-medium text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Oncura AI uses artificial intelligence to analyze skin lesion images and provide an easy-to-understand screening result.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 -mt-8 relative z-20 space-y-12">
        {/* ── HOW IT WORKS ── */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_20px_60px_rgba(92,64,51,0.09)] border border-[#FFD8C2]/60"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-[#FFF5F0] text-[#E76F51] flex items-center justify-center border border-[#FFD8C2]/40">
               <Zap size={20} />
            </div>
            <h2 className="text-2xl font-black text-[#3E2723]">How It Works</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex flex-col gap-3 group relative">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF0E8] border border-[#FFD8C2] flex items-center justify-center text-[#5C4033] group-hover:bg-[#E76F51] group-hover:text-white group-hover:border-[#E76F51] transition-all">
                    <Icon size={20} />
                  </div>
                  <div className="absolute top-6 left-12 w-[calc(100%-1rem)] h-px border-t-2 border-dashed border-[#FFD8C2] hidden lg:block -z-10 group-last:hidden" />
                  <div>
                    <h3 className="text-sm font-black text-[#111827] mb-1 flex items-center gap-2">
                      <span className="text-[10px] font-black text-[#E76F51] bg-[#FFF0E8] px-1.5 py-0.5 rounded uppercase tracking-widest">{step.id}</span>
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.section>

        {/* ── WHAT CAN IT DETECT ── */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#FFF5F0] to-[#FFF0E8] rounded-[2rem] p-8 md:p-10 shadow-[0_10px_30px_rgba(92,64,51,0.05)] border border-[#FFD8C2]/80"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-white text-[#5C4033] flex items-center justify-center shadow-sm">
               <BrainCircuit size={20} />
            </div>
            <h2 className="text-2xl font-black text-[#3E2723]">What Can Oncura Detect?</h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed font-medium mb-6 max-w-2xl">
            Oncura AI supports <span className="font-bold text-[#E76F51]">7 skin-condition categories</span>, including melanoma, basal cell carcinoma, actinic keratosis, benign keratosis, melanocytic nevi, dermatofibroma, and vascular lesions.
          </p>
          <div className="flex flex-wrap gap-2">
            {["Melanoma", "Basal Cell Carcinoma", "Actinic Keratosis", "Benign Keratosis", "Melanocytic Nevi", "Dermatofibroma", "Vascular Lesions"].map((condition, i) => (
              <span key={i} className="px-3 py-1.5 bg-white border border-[#FFD8C2] text-xs font-bold text-[#5C4033] rounded-lg shadow-sm">
                {condition}
              </span>
            ))}
          </div>
        </motion.section>

        {/* ── WHY ONCURA ── */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_20px_60px_rgba(92,64,51,0.09)] border border-[#FFD8C2]/60"
        >
          <h2 className="text-2xl font-black text-[#3E2723] mb-8 flex items-center gap-3">
            <span className="text-3xl">💡</span> Why Oncura?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF0E8] border border-[#FFD8C2] text-[#5C4033] flex items-center justify-center shrink-0 group-hover:bg-[#E76F51] group-hover:text-white transition-colors">
                    <Icon size={18} />
                  </div>
                  <span className="text-sm font-bold text-[#111827]">{feature.title}</span>
                </div>
              )
            })}
          </div>
        </motion.section>

        {/* ── DISCLAIMER ── */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#3E2723] rounded-[2rem] p-8 md:p-10 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck size={28} className="text-[#E76F51]" />
              <h2 className="text-2xl font-black text-white">Your Health Comes First</h2>
            </div>
            <div className="bg-white/10 border border-[#E76F51]/30 p-5 rounded-2xl mb-8 flex items-start gap-4">
              <AlertCircle size={24} className="text-[#E76F51] shrink-0 mt-0.5" />
              <p className="text-sm text-white/90 leading-relaxed font-medium">
                Oncura AI provides educational screening support, <span className="font-bold text-white">not a medical diagnosis</span>. Always consult a qualified healthcare professional for concerning or changing skin lesions.
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl md:text-3xl font-black text-[#FFD8C2] mb-8">Understand Your Skin. Act Early.</h3>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/scan" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 py-4 bg-[#E76F51] text-white rounded-[1rem] font-black text-[11px] uppercase tracking-widest shadow-[0_10px_25px_rgba(231,111,81,0.3)] hover:bg-[#D4603F] hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                    Try Skin Scan <ArrowRight size={16} />
                  </button>
                </Link>
                <Link href="/chat" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white border border-white/20 rounded-[1rem] font-black text-[11px] uppercase tracking-widest shadow-lg hover:bg-white/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                    Talk to AI Assistant <MessageSquare size={16} />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
