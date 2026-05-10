"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { PremiumButton } from "@/components/PremiumButton";
import {
  ShieldCheck, Zap, Activity, Clock, ArrowRight,
  Stethoscope, Microscope, Globe, Lock,
  ChevronDown, CheckCircle2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/cn";

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const features = [
    {
      title: "Precision AI Scan",
      desc: "Neural networks trained on 100k+ clinical images with 99.2% accuracy.",
      icon: Zap,
      className: "md:col-span-2 md:row-span-2",
      gradient: "from-blue-500/10 to-cyan-500/10"
    },
    {
      title: "Real-time Tracking",
      desc: "Monitor lesion changes with visual history.",
      icon: Activity,
      className: "md:col-span-1 md:row-span-1",
      gradient: "from-purple-500/10 to-pink-500/10"
    },
    {
      title: "Dermatologist Approved",
      desc: "Verified medical specialist referral system.",
      icon: ShieldCheck,
      className: "md:col-span-1 md:row-span-2",
      gradient: "from-emerald-500/10 to-teal-500/10"
    },
    {
      title: "Instant Insights",
      desc: "Get confidence scores in under 4 seconds.",
      icon: Clock,
      className: "md:col-span-1 md:row-span-1",
      gradient: "from-orange-500/10 to-yellow-500/10"
    }
  ];

  const stats = [
    { label: "Clinical Images", value: "100k+" },
    { label: "Accuracy Rate", value: "99.2%" },
    { label: "Global Users", value: "50k+" },
    { label: "Specialists", value: "500+" }
  ];

  return (
    <div className="pt-24 pb-32">
      {/* Hero Section */}
      <section className="px-6 py-12 max-w-7xl mx-auto flex flex-col items-center text-center relative overflow-visible">
        <div className="flex flex-col items-center max-w-3xl z-10">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 font-plus-jakarta leading-tight"
          >
            Clinical AI <br />
            For Your <span className="text-blue-500">Skin Health.</span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-sm text-slate-400 max-w-2xl mb-10 leading-relaxed font-medium"
          >
            oncura bridges the gap between AI innovation and dermatological care.
            Upload, scan, and understand your skin health with the world&apos;s most immersive platform.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-20"
          >
            <Link href="/scan">
              <PremiumButton glow className="px-8 py-2.5">
                Launch AI Scanner
              </PremiumButton>
            </Link>
            <PremiumButton variant="secondary" className="px-8 py-2.5">
              Explore Clinical Data
            </PremiumButton>
          </motion.div>
        </div>

        {/* Character Container - Floating on the Right */}
        <motion.div
          initial={{ x: 50, opacity: 0, scale: 0.9 }}
          whileInView={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-64 md:w-80 aspect-square hidden lg:block pointer-events-none"
        >
          <div className="absolute inset-0 bg-blue-600/5 blur-[100px] rounded-full" />
          <Image
            src="/hero_session.png"
            alt="Clinical Assistant"
            width={500}
            height={500}
            className="relative z-10 w-full h-full object-contain mix-blend-screen opacity-60"
          />
        </motion.div>
      </section>

      {/* Clinical Workflow (How It Works) */}
      <section className="py-24 bg-slate-950/20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-2xl font-black text-white mb-2 font-plus-jakarta">How It Works</h2>
              <p className="text-xs text-slate-500 uppercase tracking-widest">A three-step clinical pipeline</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Globe, title: "Capture", desc: "Upload a high-resolution photo from any device." },
              { icon: Microscope, title: "Analyze", desc: "AI processes morphological patterns in real-time." },
              { icon: Stethoscope, title: "Consult", desc: "Get care cards and find local specialists." }
            ].map((step, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-blue-500 mb-6 border border-white/5 relative">
                    <div className="absolute inset-0 rounded-full bg-blue-500/5 animate-ping opacity-20" />
                    <step.icon size={24} />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Box (Moved Here) */}
      <section className="px-6 py-12 max-w-4xl mx-auto">
        <Reveal delay={0.2}>
          <div className="relative p-1 rounded-[2.5rem] bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-transparent border border-white/10 overflow-hidden group">
            <GlassCard className="bg-[#050A1A] text-white text-center py-20 px-8 border-none overflow-hidden relative shadow-3xl rounded-[2.2rem]">
              {/* Animated Background Elements */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.1, 0.2, 0.1],
                  x: [0, 20, 0]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600 rounded-full blur-[100px] pointer-events-none"
              />
              <motion.div
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.05, 0.15, 0.05],
                  x: [0, -20, 0]
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400 rounded-full blur-[100px] pointer-events-none"
              />

              <div className="relative z-10">
                <motion.h2
                  whileInView={{ scale: [0.95, 1] }}
                  transition={{ duration: 1 }}
                  className="text-3xl md:text-5xl font-black mb-8 font-plus-jakarta leading-tight tracking-tight"
                >
                  Elevate your skin <br />
                  <span className="text-blue-500 italic">health standard.</span>
                </motion.h2>

                <Link href="/scan">
                  <PremiumButton variant="secondary" className="px-12 py-3.5 text-[10px] bg-[#0F172A]/90 border-blue-400/40 text-white hover:bg-slate-800 hover:border-blue-400/60 shadow-[0_0_20px_rgba(37,99,235,0.15)]">
                    Start Clinical Scan <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={12} />
                  </PremiumButton>
                </Link>

                <div className="mt-12 flex flex-wrap items-center justify-center gap-6 opacity-40">
                  {[
                    { icon: ShieldCheck, text: "HIPAA COMPLIANT" },
                    { icon: Lock, text: "SSL ENCRYPTED" },
                    { icon: CheckCircle2, text: "CLINICAL GRADE" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <item.icon size={12} className="text-blue-400" />
                      <span className="text-[8px] font-black uppercase tracking-[0.2em]">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </Reveal>
      </section>

      {/* Trust Stats */}
      <section className="py-20 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-black text-blue-500 mb-1 font-plus-jakarta">{stat.value}</p>
                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <Reveal>
          <div className="mb-16">
            <h2 className="text-3xl font-black text-white font-plus-jakarta tracking-tight">Engineered for Accuracy.</h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {features.map((feature, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <GlassCard
                className={cn(
                  "relative overflow-hidden group flex flex-col justify-end p-6 border-white/5 bg-slate-900/10 h-full",
                  feature.className
                )}
              >
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-5 transition-opacity group-hover:opacity-15", feature.gradient)} />
                <div className="relative z-10">
                  <div className="mb-4 w-10 h-10 rounded-xl bg-slate-900/50 backdrop-blur-xl border border-white/5 flex items-center justify-center text-blue-400 transition-transform group-hover:scale-110">
                    <feature.icon size={20} />
                  </div>
                  <h3 className="text-base font-black text-white mb-2">{feature.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{feature.desc}</p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>


      {/* FAQ / Final CTA */}

      {/* FAQ Section Only */}
      <section className="px-6 py-24 max-w-3xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-2xl font-black text-white mb-8 font-plus-jakarta text-center">Protocol FAQ</h2>
            <div className="space-y-3 text-left">
              {[
                "Is the AI scan a medical diagnosis?",
                "How is my data protected?",
                "What skin types are supported?",
                "Can I share my results with a doctor?"
              ].map((q, i) => (
                <GlassCard key={i} className="p-4 flex items-center justify-between group cursor-pointer hover:border-blue-500/20 bg-slate-900/10">
                  <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors">{q}</span>
                  <ChevronDown className="text-slate-700 group-hover:text-blue-400 transition-colors" size={16} />
                </GlassCard>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
