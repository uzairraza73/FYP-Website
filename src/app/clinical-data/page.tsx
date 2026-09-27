"use client";

import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Database, BrainCircuit, CheckCircle2,
  ShieldCheck, Sparkles, BarChart2, TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface Stat { icon: LucideIcon; value: string; label: string; desc: string }
const stats: Stat[] = [
  { icon: Database,     value: "100K+",     label: "Clinical Images",  desc: "Diverse skin types, conditions & tones" },
  { icon: TrendingUp,   value: "10+",        label: "Medical Datasets", desc: "Trusted, curated & validated" },
  { icon: CheckCircle2, value: "99.2%",      label: "Accuracy",         desc: "In detecting suspicious lesions" },
  { icon: ShieldCheck,  value: "Real-World", label: "Data Sources",     desc: "Hospitals, clinics & research studies" },
];

interface DataItem { icon: LucideIcon; label: string }
const dataIncludes: DataItem[] = [
  { icon: Database,     label: "High-resolution dermatoscopic images" },
  { icon: ShieldCheck,  label: "Multiple skin tones and lesion types" },
  { icon: CheckCircle2, label: "Expert-verified annotations" },
  { icon: TrendingUp,   label: "Continuous model improvement with new data" },
];

const whyItMatters = [
  "Improves early detection",
  "Reduces diagnostic uncertainty",
  "Supports personalized care",
  "Builds a healthier future",
];

const chartPoints = [12, 18, 22, 32, 45, 60];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const heroStats = [
  { value: "100K+", label: "Images" },
  { value: "99.2%", label: "Accuracy" },
  { value: "10+", label: "Datasets" },
  { value: "Real-World", label: "Sources" },
];

export default function ClinicalDataPage() {
  const maxVal = Math.max(...chartPoints);

  return (
    <main className="min-h-screen bg-[#FFF5F0] font-plus-jakarta">

      {/* ── HERO — matches Research Papers / Health Guides ── */}
      <section className="bg-gradient-to-br from-[#3E2723] to-[#5C4033] text-white py-28 px-6 relative overflow-hidden">
        {/* Background accents */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,#E76F51,transparent_60%)]" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

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
              <Database size={28} className="text-[#FFD8C2]" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#FFD8C2] mb-1">Oncura Platform</p>
              <h1 className="text-4xl md:text-5xl font-black">Clinical Data</h1>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-white/70 font-medium text-base leading-relaxed max-w-2xl"
          >
            We combine trusted real-world clinical data with advanced AI to help detect health conditions earlier — with greater accuracy and confidence than ever before.
          </motion.p>

          {/* Hero stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {heroStats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="bg-white/10 border border-white/20 rounded-2xl p-5 text-center backdrop-blur-sm"
              >
                <p className="text-2xl font-black text-white mb-1">{s.value}</p>
                <p className="text-[10px] font-bold text-[#FFD8C2] uppercase tracking-widest">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">

          {/* LEFT: Main Data Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(92,64,51,0.09)] border border-[#FFD8C2]/60 p-8 md:p-10 flex flex-col gap-8"
          >
            {/* Header */}
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-[#3E2723] text-white flex items-center justify-center shadow-lg shrink-0">
                <Database size={26} />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#111827]">Our Clinical Data at a Glance</h2>
                <p className="text-sm text-slate-500 font-medium mt-0.5">
                  High-quality, diverse and real-world data — built for better insights and more accurate outcomes.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="p-5 rounded-2xl bg-[#FFF5F0] border border-[#FFD8C2]/60 hover:border-[#E76F51]/40 hover:shadow-md transition-all group cursor-default"
                  >
                    <Icon size={20} className="text-[#5C4033] mb-3 group-hover:text-[#E76F51] transition-colors" />
                    <p className="text-xl font-black text-[#111827] leading-none mb-1">{s.value}</p>
                    <p className="text-xs font-black text-[#5C4033] mb-1">{s.label}</p>
                    <p className="text-[10px] text-slate-500 leading-snug">{s.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Data Includes */}
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-widest text-[#5C4033] mb-5">Data Includes</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {dataIncludes.map((d, i) => {
                  const Icon = d.icon;
                  return (
                    <div key={i} className="flex flex-col items-start gap-3 group cursor-default">
                      <div className="w-11 h-11 rounded-xl bg-[#FFF5F0] text-[#5C4033] flex items-center justify-center group-hover:bg-[#E76F51] group-hover:text-white transition-all border border-[#FFD8C2]/60">
                        <Icon size={18} />
                      </div>
                      <p className="text-xs text-slate-600 font-medium leading-snug">{d.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CTA Banner */}
            <Link href="/scan">
              <motion.div
                whileHover={{ y: -3, boxShadow: "0 25px 50px rgba(62,39,35,0.3)" }}
                className="relative overflow-hidden bg-gradient-to-r from-[#3E2723] to-[#5C4033] rounded-[1.5rem] p-6 text-white flex items-center justify-between cursor-pointer shadow-[0_15px_30px_rgba(62,39,35,0.2)] transition-all"
              >
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center gap-5 z-10">
                  <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                    <Sparkles size={20} className="text-[#FFD8C2]" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#FFD8C2] mb-1">More data. Better insights. Healthier tomorrows.</p>
                    <h3 className="text-sm font-black">Powered by Real-World Clinical Evidence</h3>
                  </div>
                </div>
                <div className="z-10 w-9 h-9 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-[#5C4033] transition-colors shrink-0 ml-4">
                  <ArrowRight size={16} />
                </div>
              </motion.div>
            </Link>
          </motion.div>

          {/* RIGHT: Chart + Why It Matters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="flex flex-col gap-6"
          >
            {/* Chart Card */}
            <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(92,64,51,0.09)] border border-[#FFD8C2]/60 p-7 flex flex-col flex-1">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-11 h-11 rounded-xl bg-[#3E2723] text-white flex items-center justify-center shrink-0">
                  <BarChart2 size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#111827]">Accuracy Over Time</h3>
                  <p className="text-xs text-slate-500 font-medium">Real data. Real patterns. Real impact.</p>
                </div>
              </div>

              <div className="self-end mb-4">
                <span className="inline-flex items-center gap-1 bg-[#FFF5F0] border border-[#FFD8C2] text-[#E76F51] text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                  Better Accuracy Over Time <ArrowRight size={8} />
                </span>
              </div>

              {/* Bar Chart */}
              <div className="flex-1 flex flex-col justify-end">
                <div className="flex items-end gap-2 h-28 w-full">
                  {chartPoints.map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${(val / maxVal) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: i * 0.12, ease: "easeOut" }}
                        className="w-full rounded-t-lg bg-gradient-to-t from-[#3E2723] to-[#E76F51] relative group cursor-pointer"
                        style={{ minHeight: 6 }}
                      >
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#E76F51] shadow-[0_0_8px_#E76F51] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  {months.map((m) => (
                    <div key={m} className="flex-1 text-center text-[9px] font-bold text-slate-400 uppercase">{m}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Why It Matters */}
            <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(92,64,51,0.09)] border border-[#FFD8C2]/60 p-7">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-11 h-11 rounded-xl bg-[#3E2723] text-white flex items-center justify-center shrink-0">
                  <BrainCircuit size={20} />
                </div>
                <h3 className="text-sm font-black text-[#111827]">Why It Matters</h3>
              </div>
              <ul className="space-y-3.5">
                {whyItMatters.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3 group cursor-default"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#FFF0E8] border border-[#FFD8C2]/60 flex items-center justify-center shrink-0 group-hover:bg-[#E76F51] transition-colors">
                      <CheckCircle2 size={13} className="text-[#E76F51] group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-sm font-medium text-slate-600 group-hover:text-[#111827] transition-colors">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

        </div>
      </section>
    </main>
  );
}
