"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { FeatureModal } from "@/components/FeatureModal";
import {
  ShieldCheck, Zap, Activity, Clock, ArrowRight,
  Stethoscope, Microscope, Globe, Lock,
  ChevronDown, CheckCircle2
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/cn";
import heroImage from "../../pic folder/hero session.png";
import scanBoxImg from "../../pic folder/scan box image.png";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
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

  const faqs = [
    {
      question: "Is the AI scan a medical diagnosis?",
      answer: "No. Our AI scan is a screening tool, not a medical diagnosis. Always consult a qualified dermatologist for professional evaluation."
    },
    {
      question: "How is my data protected?",
      answer: "Your privacy is our priority. Your information and images are protected with appropriate security measures and handled according to our Privacy Policy."
    },
    {
      question: "What skin types are supported?",
      answer: "Our AI is designed to analyze a wide range of skin tones and types. Results may vary, so professional medical advice is recommended when concerned."
    },
    {
      question: "Can I share my results with a doctor?",
      answer: "Yes. You can share your scan results with a doctor or dermatologist to provide additional information during your professional evaluation."
    }
  ];

  return (
    <div className="pt-24 pb-32">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-transparent mx-auto max-w-[1400px] font-plus-jakarta">
        {/* Background decorations (Subtle curves/waves) */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <svg width="100%" height="100%" viewBox="0 0 1440 1024" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute w-full h-full object-cover opacity-30">
            <path d="M-100 800 C 400 900, 800 500, 1500 1000 L 1500 1200 L -100 1200 Z" fill="url(#paint0_linear)" />
            <path d="M-100 900 C 600 700, 1000 800, 1500 600 L 1500 1200 L -100 1200 Z" fill="url(#paint1_linear)" />
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="1500" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFD8C2" />
                <stop offset="1" stopColor="#FFEBE0" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="paint1_linear" x1="0" y1="0" x2="1500" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFF5F0" />
                <stop offset="1" stopColor="#FFD8C2" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="px-8 md:px-16 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="flex flex-col items-start text-left max-w-xl">
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-5xl md:text-6xl lg:text-[72px] font-black tracking-tight text-[#111827] mb-6 leading-[1.05]"
            >
              Early Detection <br />
              for Healthier <br />
              <span className="text-[#E76F51]">Tomorrows</span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-sm md:text-base text-[#4A4A4A] mb-10 leading-relaxed font-medium pr-4"
            >
              Our AI-powered skin cancer detector helps you identify suspicious skin changes early, giving you peace of mind and a better chance of effective treatment - because your skin health matters.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <Link href="/scan" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-3.5 bg-[#5C4033] text-white rounded-xl font-bold text-base hover:bg-[#3E2723] transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform flex items-center justify-center gap-2">
                  Get Started <ArrowRight size={18} />
                </button>
              </Link>
              <Link href="/learn-more" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-8 py-3.5 bg-transparent text-[#5C4033] border-2 border-[#5C4033] rounded-xl font-bold text-base hover:bg-[#5C4033]/10 transition-colors text-center shadow-sm hover:shadow-md hover:-translate-y-1 transform">
                  Learn More
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Right Content - Main Illustration */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="relative w-full h-[600px] hidden lg:flex items-center justify-center"
          >
            {/* Main Image placeholder */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* The laser scanner device scanning skin, labels are baked into the image */}
              <Image
                src={heroImage}
                alt="Skin Scanner Device"
                fill
                className="relative z-10 object-contain scale-[1.1]"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Clinical Workflow (How It Works) */}
      <section className="py-24 bg-white/40 border-y border-[#FFEBE0] mt-12 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-black text-[#111827] mb-2 font-plus-jakarta">How It Works</h2>
              <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">A three-step clinical pipeline</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Globe, title: "Capture", desc: "Upload a high-resolution photo from any device." },
              { icon: Microscope, title: "Analyze", desc: "AI processes morphological patterns in real-time." },
              { icon: Stethoscope, title: "Consult", desc: "Get care cards and find local specialists." }
            ].map((step, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="flex flex-col items-center text-center group">
                  <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-white/90 to-white/40 backdrop-blur-xl flex items-center justify-center text-[#E76F51] mb-8 border-[1.5px] border-white shadow-[0_15px_35px_rgba(231,111,81,0.15)] relative transform transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(231,111,81,0.25)] overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FFEBE0]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <step.icon size={36} className="relative z-10 transform transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <h3 className="text-2xl font-black text-[#1A1A1A] mb-4 font-plus-jakarta">{step.title}</h3>
                  <p className="text-base text-slate-600 leading-relaxed max-w-[240px] font-medium">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Box */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <Reveal delay={0.2}>
          <div className="relative p-[1.5px] rounded-[3rem] bg-gradient-to-br from-white/80 via-white/40 to-white/10 overflow-hidden group shadow-[0_20px_50px_rgba(231,111,81,0.15)] hover:shadow-[0_30px_60px_rgba(231,111,81,0.25)] transition-all duration-700 hover:-translate-y-2">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 overflow-hidden rounded-[3rem]">
              <Image
                src={scanBoxImg}
                alt="Scan Background"
                fill
                className="object-cover opacity-100 transition-transform duration-[1.5s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-white/10" />
            </div>

            <GlassCard className="bg-white/20 backdrop-blur-sm text-[#1A1A1A] text-center py-24 px-10 border-none overflow-hidden relative rounded-[3rem]">
              {/* Animated Background Elements (now blending with image) */}
              <motion.div
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.2, 0.4, 0.2],
                  x: [0, 30, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-gradient-to-br from-[#E76F51]/20 to-[#FFD8C2]/40 rounded-full blur-[100px] pointer-events-none mix-blend-color-burn"
              />
              <motion.div
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.15, 0.3, 0.15],
                  x: [0, -30, 0],
                  y: [0, 20, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-gradient-to-br from-[#FFCBA4]/30 to-[#FFEBE0]/50 rounded-full blur-[100px] pointer-events-none mix-blend-multiply"
              />

              <div className="relative z-10">
                <motion.h2
                  whileInView={{ scale: [0.95, 1] }}
                  transition={{ duration: 1 }}
                  className="text-4xl md:text-6xl font-black mb-10 font-plus-jakarta leading-tight tracking-tight text-[#111827] drop-shadow-sm"
                >
                  Elevate your skin <br />
                  <span className="text-[#E76F51] italic">health standard.</span>
                </motion.h2>

                <Link href="/scan">
                  <button className="relative overflow-hidden px-14 py-5 text-lg font-bold text-white rounded-[1.5rem] bg-gradient-to-r from-[#E76F51] to-[#FF8C69] hover:from-[#D45E40] hover:to-[#E76F51] shadow-[0_15px_35px_rgba(231,111,81,0.4)] hover:shadow-[0_25px_50px_rgba(231,111,81,0.6)] hover:-translate-y-1.5 transition-all duration-300 flex items-center justify-center mx-auto group/btn">
                    <div className="absolute inset-0 bg-white/20 w-1/2 -skew-x-12 -translate-x-[150%] group-hover/btn:translate-x-[250%] transition-transform duration-700 ease-in-out" />
                    Start Clinical Scan <ArrowRight className="inline-block ml-3 group-hover/btn:translate-x-2 transition-transform duration-300" size={22} />
                  </button>
                </Link>

                <div className="mt-14 flex flex-wrap items-center justify-center gap-8 opacity-60">
                  {[
                    { icon: ShieldCheck, text: "HIPAA COMPLIANT" },
                    { icon: Lock, text: "SSL ENCRYPTED" },
                    { icon: CheckCircle2, text: "CLINICAL GRADE" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <item.icon size={16} className="text-[#E76F51]" />
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-[#4A4A4A]">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>
        </Reveal>
      </section>

      {/* Trust Stats */}
      <section className="py-24 border-y border-[#FFEBE0] relative overflow-hidden bg-white/30 backdrop-blur-md">
        <div className="absolute inset-0 bg-[#FFD8C2]/10 blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, idx) => (
            <Reveal key={idx} delay={idx * 0.1}>
              <div className="text-center">
                <p className="text-4xl md:text-5xl font-black text-[#E76F51] mb-2 font-plus-jakarta">{stat.value}</p>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-24 relative overflow-hidden">
        {/* Blended Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={scanBoxImg}
            alt="Features Background"
            fill
            className="object-cover opacity-100 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5F0]/95 via-[#FFEBE0]/50 to-[#FFF5F0]/95" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-black text-[#111827] font-plus-jakarta tracking-tight">Engineered for Accuracy.</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              return (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div onClick={() => setSelectedFeature(feature)} className="block h-[220px] cursor-pointer">
                    <GlassCard
                      className="relative overflow-hidden group flex flex-col items-center justify-center text-center p-6 border-[1.5px] border-white/40 hover:border-[#E76F51]/80 bg-white/10 hover:bg-gradient-to-br hover:from-white/40 hover:to-white/20 backdrop-blur-xl shadow-[0_10px_30px_rgba(231,111,81,0.1)] hover:shadow-[0_20px_40px_rgba(231,111,81,0.3)] transition-all duration-500 hover:-translate-y-2 h-full"
                    >
                      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-[0.05] transition-opacity group-hover:opacity-[0.1]", feature.gradient)} />
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full border-[1.5px] border-[#E76F51]/40 flex items-center justify-center text-[#E76F51] transition-transform duration-500 group-hover:scale-110 group-hover:border-[#E76F51] shadow-sm mb-4 bg-white/30 backdrop-blur-sm">
                          <feature.icon size={24} />
                        </div>
                        <h3 className="text-lg font-black text-[#111827] group-hover:text-[#E76F51] transition-colors duration-300">{feature.title}</h3>
                        
                        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out w-full">
                          <div className="overflow-hidden">
                            <p className="text-xs text-slate-600 leading-relaxed font-medium pt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 max-w-[200px] mx-auto">
                              {feature.desc}
                            </p>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-24 max-w-3xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-[#111827] mb-10 font-plus-jakarta text-center">Protocol FAQ</h2>
            <div className="space-y-4 text-left">
              {faqs.map((faq, i) => (
                <GlassCard 
                  key={i} 
                  className={`p-6 flex flex-col group cursor-pointer border-transparent shadow-sm hover:shadow-md transition-all ${openFaqIndex === i ? 'bg-white/90 border-[#E76F51]/30' : 'bg-white/60 hover:bg-white/90 hover:border-[#E76F51]/30'}`}
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-sm font-bold text-slate-600 group-hover:text-[#1A1A1A] transition-colors">{faq.question}</span>
                    <ChevronDown className={`text-slate-400 group-hover:text-[#E76F51] transition-transform duration-300 ${openFaqIndex === i ? 'rotate-180 text-[#E76F51]' : ''}`} size={20} />
                  </div>
                  
                  {/* Expanded Answer */}
                  <motion.div
                    initial={false}
                    animate={{ height: openFaqIndex === i ? "auto" : 0, opacity: openFaqIndex === i ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-sm text-slate-500 leading-relaxed font-medium">
                      {faq.answer}
                    </p>
                  </motion.div>
                </GlassCard>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Feature Modal */}
      <FeatureModal feature={selectedFeature} onClose={() => setSelectedFeature(null)} />
    </div>
  );
}
