"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck, Eye, Lock, Database, Bell, UserCheck, Mail } from "lucide-react";
import { motion } from "framer-motion";

const sections = [
  {
    icon: Eye,
    title: "Information We Collect",
    content: [
      { heading: "Personal Information", text: "When you create an account or use our services, we may collect information such as your name, email address, date of birth, and other identifiers you voluntarily provide." },
      { heading: "Health & Skin Data", text: "Images you upload for AI analysis are processed to provide skin health insights. These images and associated scan results are stored securely and used only to deliver our service to you." },
      { heading: "Usage Data", text: "We automatically collect information about how you interact with our platform, including device type, browser, pages visited, and session duration, to improve the user experience." },
    ]
  },
  {
    icon: Lock,
    title: "How We Use Your Information",
    content: [
      { heading: "Service Delivery", text: "Your data is used to power our AI skin analysis, provide personalized health insights, and maintain your health history timeline." },
      { heading: "Improvement & Research", text: "Anonymized and aggregated data may be used to improve our AI models and conduct research, always with your privacy protected. We never sell your personal data." },
      { heading: "Communications", text: "We may send you service-related notifications, safety updates, and — with your consent — health tips and platform announcements." },
    ]
  },
  {
    icon: Database,
    title: "Data Storage & Retention",
    content: [
      { heading: "Secure Storage", text: "All data is stored in encrypted databases with access controls. Skin images are encrypted at rest and in transit using industry-standard AES-256 encryption." },
      { heading: "Retention Period", text: "We retain your personal data for as long as your account is active or as needed to provide services. You may request deletion of your account and data at any time." },
      { heading: "Data Minimization", text: "We collect only what is necessary to provide our service and regularly review and purge data that is no longer required." },
    ]
  },
  {
    icon: UserCheck,
    title: "Your Rights & Choices",
    content: [
      { heading: "Access & Portability", text: "You have the right to access the personal data we hold about you and to receive a copy in a structured, machine-readable format." },
      { heading: "Correction & Deletion", text: "You may update inaccurate data or request deletion of your account and all associated data by contacting our support team." },
      { heading: "Opt-Out", text: "You may opt out of non-essential communications at any time via your account settings or by following the unsubscribe link in any email." },
    ]
  },
  {
    icon: Bell,
    title: "Cookies & Tracking",
    content: [
      { heading: "Essential Cookies", text: "We use necessary cookies to authenticate you and maintain your session. These cannot be disabled as they are required for the platform to function." },
      { heading: "Analytics", text: "With your consent, we use analytics tools to understand platform usage patterns. You can manage cookie preferences in your browser settings." },
      { heading: "Third Parties", text: "We do not allow third-party advertising trackers. Any third-party services we use (e.g., analytics) are bound by strict data processing agreements." },
    ]
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#FFF5F0] font-plus-jakarta">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#3E2723] to-[#5C4033] text-white py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,#E76F51,transparent_60%)]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 mb-10 group">
            <motion.div whileHover={{ scale: 1.1, x: -2 }} className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center shadow-lg">
              <ArrowLeft size={18} />
            </motion.div>
            <span className="text-xs font-black uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">Go Back</span>
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
              <ShieldCheck size={28} className="text-[#FFD8C2]" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#FFD8C2] mb-1">Legal Document</p>
              <h1 className="text-4xl md:text-5xl font-black">Privacy Policy</h1>
            </div>
          </div>
          <p className="text-white/70 font-medium text-base leading-relaxed max-w-2xl">
            At Oncura, your privacy is fundamental. This policy explains what data we collect, how we use it, and the rights you have over your information.
          </p>
          <p className="text-[#FFD8C2] text-xs font-bold mt-6 uppercase tracking-widest">Last Updated: September 2024</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-10">
        {sections.map((section, i) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-[2rem] p-8 shadow-[0_10px_40px_rgba(92,64,51,0.07)] border border-[#FFD8C2]/50"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-11 h-11 rounded-2xl bg-[#FFF5F0] text-[#5C4033] flex items-center justify-center shrink-0 border border-[#FFD8C2]/50">
                  <Icon size={20} />
                </div>
                <h2 className="text-xl font-black text-[#3E2723]">{section.title}</h2>
              </div>
              <div className="space-y-5">
                {section.content.map((item, j) => (
                  <div key={j}>
                    <h3 className="text-sm font-black text-[#111827] mb-1">{item.heading}</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#3E2723] to-[#5C4033] rounded-[2rem] p-8 text-white flex items-center gap-6"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
            <Mail size={22} className="text-[#FFD8C2]" />
          </div>
          <div>
            <h3 className="text-base font-black mb-1">Privacy Questions?</h3>
            <p className="text-white/70 text-sm font-medium">To reach our Data Protection Officer, please <span className="text-[#FFD8C2] font-bold">Contact Us</span></p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
