"use client";

import Link from "next/link";
import { ArrowLeft, BookMarked, Clock, ArrowRight, Sun, Droplets, Shield, Activity, Eye, Heart } from "lucide-react";
import { motion } from "framer-motion";

export const guides = [
  {
    slug: "sun-protection",
    icon: Sun,
    category: "Sun Protection",
    readTime: "5 min read",
    title: "The Complete Guide to Sun Protection for Every Skin Type",
    summary: "UV radiation is the leading cause of skin damage and skin cancer. Learn how to choose the right SPF, apply it correctly, and build a sun-safe routine that fits your lifestyle — regardless of skin tone.",
    tips: ["Apply SPF 30+ daily, even on cloudy days", "Reapply every 2 hours when outdoors", "Seek shade between 10am and 4pm", "Wear protective clothing and wide-brimmed hats"],
    color: "from-amber-500/10 to-orange-500/10",
    iconColor: "text-amber-600",
    bgColor: "bg-amber-50 border-amber-100",
  },
  {
    slug: "self-examination",
    icon: Eye,
    category: "Self-Examination",
    readTime: "7 min read",
    title: "How to Perform a Monthly Skin Self-Examination (ABCDE Method)",
    summary: "Early detection is the most powerful weapon against skin cancer. The ABCDE method is a clinically validated framework for identifying suspicious moles and lesions.",
    tips: ["A — Asymmetry: one half does not match the other", "B — Border: irregular, ragged, or blurred edges", "C — Colour: multiple shades of brown, black, red or white", "D — Diameter: larger than 6mm (pencil eraser)", "E — Evolving: any change in size, shape, colour or new symptom"],
    color: "from-blue-500/10 to-cyan-500/10",
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50 border-blue-100",
  },
  {
    slug: "skincare-routine",
    icon: Droplets,
    category: "Skin Care",
    readTime: "4 min read",
    title: "Building a Dermatologist-Approved Daily Skincare Routine",
    summary: "A consistent, evidence-based skincare routine protects your skin barrier, maintains hydration, and reduces the risk of dermatological conditions.",
    tips: ["Cleanse gently — twice daily with a mild, pH-balanced cleanser", "Moisturise immediately after cleansing to lock in hydration", "Use retinoids at night to promote cell turnover", "Never skip SPF in your morning routine"],
    color: "from-teal-500/10 to-emerald-500/10",
    iconColor: "text-teal-600",
    bgColor: "bg-teal-50 border-teal-100",
  },
  {
    slug: "risk-factors",
    icon: Shield,
    category: "Risk Factors",
    readTime: "6 min read",
    title: "Understanding Your Skin Cancer Risk Profile",
    summary: "Certain factors increase your risk of developing skin cancer. Knowing your personal risk profile helps you make informed decisions about screening frequency and sun behaviour.",
    tips: ["Family history of melanoma increases risk 2–8x", "History of sunburns, especially in childhood", "Fair skin, light eyes, and red/blonde hair", "Regular use of tanning beds", "Weakened immune system"],
    color: "from-rose-500/10 to-pink-500/10",
    iconColor: "text-rose-600",
    bgColor: "bg-rose-50 border-rose-100",
  },
  {
    slug: "nutrition-lifestyle",
    icon: Activity,
    category: "Nutrition & Lifestyle",
    readTime: "5 min read",
    title: "Nutrition and Lifestyle Habits That Support Skin Health",
    summary: "What you eat and how you live significantly impacts your skin's ability to protect and repair itself. Discover the evidence-backed choices dermatologists recommend.",
    tips: ["Eat antioxidant-rich foods: berries, leafy greens, nuts", "Stay hydrated — aim for 8 glasses of water daily", "Avoid smoking, which accelerates skin ageing significantly", "Manage stress, which can trigger inflammatory skin conditions"],
    color: "from-green-500/10 to-lime-500/10",
    iconColor: "text-green-600",
    bgColor: "bg-green-50 border-green-100",
  },
  {
    slug: "mental-wellbeing",
    icon: Heart,
    category: "Mental Wellbeing",
    readTime: "4 min read",
    title: "Managing Skin Health Anxiety: A Practical Guide",
    summary: "Concern about skin health is natural and healthy, but for some, it can become overwhelming. This guide provides practical strategies for staying informed while maintaining emotional balance.",
    tips: ["Schedule regular check-ups rather than constant self-monitoring", "Use AI screening tools as a starting point, not a diagnosis", "Discuss concerns openly with a qualified dermatologist", "Practice mindfulness to manage health anxiety"],
    color: "from-purple-500/10 to-violet-500/10",
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50 border-purple-100",
  },
];

export default function HealthGuidesPage() {
  return (
    <main className="min-h-screen bg-[#FFF5F0] font-plus-jakarta">
      <section className="bg-gradient-to-br from-[#3E2723] to-[#5C4033] text-white py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom_left,#E76F51,transparent_60%)]" />
        <div className="max-w-5xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 mb-10 group">
            <motion.div whileHover={{ scale: 1.1, x: -2 }} className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center">
              <ArrowLeft size={18} />
            </motion.div>
            <span className="text-xs font-black uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">Go Back</span>
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
              <BookMarked size={28} className="text-[#FFD8C2]" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#FFD8C2] mb-1">Oncura Resources</p>
              <h1 className="text-4xl md:text-5xl font-black">Health Guides</h1>
            </div>
          </div>
          <p className="text-white/70 font-medium text-base leading-relaxed max-w-2xl">
            Evidence-based, dermatologist-reviewed guides. Click any guide to read the full article.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((guide, i) => {
            const Icon = guide.icon;
            return (
              <Link key={i} href={`/health-guides/${guide.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className={`bg-white rounded-[2rem] p-7 shadow-[0_10px_40px_rgba(92,64,51,0.07)] border border-[#FFD8C2]/50 group hover:shadow-[0_20px_50px_rgba(92,64,51,0.12)] hover:-translate-y-1 transition-all cursor-pointer bg-gradient-to-br ${guide.color} h-full`}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${guide.bgColor}`}>
                      <Icon size={12} className={guide.iconColor} />
                      <span className={guide.iconColor}>{guide.category}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                      <Clock size={11} /> {guide.readTime}
                    </div>
                  </div>

                  <h2 className="text-base font-black text-[#3E2723] mb-3 leading-snug group-hover:text-[#E76F51] transition-colors">{guide.title}</h2>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed mb-5">{guide.summary}</p>

                  <ul className="space-y-2 mb-5">
                    {guide.tips.slice(0, 4).map((tip, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E76F51] mt-1.5 shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 text-xs font-black text-[#5C4033] group-hover:text-[#E76F51] group-hover:gap-3 transition-all duration-200">
                    Read Full Guide <ArrowRight size={13} />
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
