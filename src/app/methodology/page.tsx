"use client";

import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Database, BrainCircuit,
  ShieldCheck, UserCheck, CheckCircle2, Zap, Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { step: "01", title: "Data Collection", icon: Database, desc: "We gather diverse, high-quality clinical data from multiple trusted sources, including hospitals, research studies and real-world records." },
  { step: "02", title: "AI Analysis", icon: BrainCircuit, desc: "Advanced machine learning models analyze patterns, find correlations and identify early indicators with high accuracy." },
  { step: "03", title: "Validation", icon: ShieldCheck, desc: "Our results are cross-verified with clinical experts and real-world evidence to ensure safety, accuracy and reliability." },
  { step: "04", title: "Actionable Insights", icon: UserCheck, desc: "We convert complex data into clear, practical recommendations to support better clinical decisions and improved patient outcomes." },
];

const benefits = [
  { title: "High Accuracy", desc: "AI-driven precision and validation.", icon: CheckCircle2 },
  { title: "Reliable", desc: "Trusted data & expert review.", icon: ShieldCheck },
  { title: "Faster Insights", desc: "Save time, make better decisions.", icon: Zap },
  { title: "Better Outcomes", desc: "For healthier lives.", icon: CheckCircle2 },
];

const floatingCards = [
  { title: "Data Collection", sub: "Trusted & Diverse Sources", icon: Database },
  { title: "AI Analysis", sub: "Advanced Models & Patterns", icon: BrainCircuit },
  { title: "Expert Review", sub: "Validated by Dermatologists", icon: UserCheck },
  { title: "Quality Assurance", sub: "Accuracy & Reliability", icon: ShieldCheck },
];

const floatY: number[][] = [[-6, 6, -6], [6, -6, 6], [-4, 4, -4], [4, -4, 4]];

export default function MethodologyPage() {
  return (
    <main className="min-h-screen bg-[#FFF5F0] font-plus-jakarta">

      {/* ── HERO — matches Research Papers / Health Guides ── */}
      <section className="bg-gradient-to-br from-[#3E2723] to-[#5C4033] text-white py-28 px-6 relative overflow-hidden">
        {/* Background accents */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,#E76F51,transparent_60%)]" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.2) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Back button */}
          <Link href="/" className="inline-flex items-center gap-3 mb-10 group">
            <motion.div
              whileHover={{ scale: 1.1, x: -2 }}
              className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center"
            >
              <ArrowLeft size={18} />
            </motion.div>
            <span className="text-xs font-black uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">Go Back</span>
          </Link>

          {/* Title block */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
              <BrainCircuit size={28} className="text-[#FFD8C2]" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#FFD8C2] mb-1">Oncura Platform</p>
              <h1 className="text-4xl md:text-5xl font-black">Our Methodology</h1>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-white/70 font-medium text-base leading-relaxed max-w-2xl"
          >
            A systematic, data-driven approach that combines clinical expertise with advanced AI — delivering accurate, reliable, and actionable skin health insights.
          </motion.p>

          {/* Floating info badges */}
          <div className="hidden lg:flex flex-wrap gap-4 mt-10">
            {floatingCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  animate-y={floatY[i]}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 text-[#FFD8C2] flex items-center justify-center shrink-0">
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-white">{card.title}</p>
                    <p className="text-[10px] text-[#FFD8C2] font-bold leading-tight">{card.sub}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left: Step list */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(92,64,51,0.09)] border border-[#FFD8C2]/60 overflow-hidden"
          >
            <div className="px-7 pt-6 pb-3 border-b border-[#FFD8C2]/40">
              <h2 className="text-xl font-black text-[#3E2723]">Our 4-Step Process</h2>
              <p className="text-xs text-slate-500 font-medium mt-1">From raw data to actionable clinical insight.</p>
            </div>
            {steps.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className={`group flex items-start gap-5 px-7 py-6 cursor-pointer hover:bg-[#FFF5F0] transition-all duration-200 ${i !== steps.length - 1 ? "border-b border-[#FFD8C2]/40" : ""}`}
                >
                  <div className="w-11 h-11 rounded-full bg-[#3E2723] group-hover:bg-[#E76F51] text-white flex items-center justify-center text-sm font-black shrink-0 shadow-md transition-colors">
                    {item.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={15} className="text-[#5C4033] shrink-0" />
                      <h3 className="text-sm font-black text-[#111827]">{item.title}</h3>
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                  <ArrowRight size={16} className="text-slate-300 group-hover:text-[#E76F51] group-hover:translate-x-1 transition-all mt-1 shrink-0" />
                </div>
              );
            })}
          </motion.div>

          {/* Right: Benefits + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(92,64,51,0.09)] border border-[#FFD8C2]/60 p-8 flex-1">
              <h2 className="text-xl font-black text-[#3E2723] mb-7">Why Our Methodology Works</h2>
              <div className="grid grid-cols-2 gap-6">
                {benefits.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      className="group flex flex-col gap-3 cursor-default"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-[#FFF5F0] text-[#5C4033] flex items-center justify-center group-hover:bg-[#E76F51] group-hover:text-white transition-all shadow-sm border border-[#FFD8C2]/40">
                        <Icon size={22} />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-[#111827] mb-0.5">{b.title}</h4>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{b.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* CTA */}
            <Link href="/scan">
              <motion.div
                whileHover={{ y: -3, boxShadow: "0 25px 50px rgba(62,39,35,0.3)" }}
                className="relative overflow-hidden bg-gradient-to-r from-[#3E2723] to-[#5C4033] rounded-[1.75rem] p-7 text-white flex items-center justify-between cursor-pointer shadow-[0_15px_30px_rgba(62,39,35,0.2)] transition-all"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center gap-5 z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                    <Sparkles size={22} className="text-[#FFD8C2]" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#FFD8C2] mb-1">Smarter Technology. Healthier Tomorrows.</p>
                    <h3 className="text-base font-black">Powered by AI. Backed by real-world evidence.</h3>
                  </div>
                </div>
                <div className="z-10 w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-[#5C4033] transition-colors shrink-0 ml-4">
                  <ArrowRight size={18} />
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
