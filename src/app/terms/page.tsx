"use client";

import Link from "next/link";
import { ArrowLeft, FileText, AlertTriangle, Scale, RefreshCw, Globe, Mail } from "lucide-react";
import { motion } from "framer-motion";

const sections = [
  {
    icon: FileText,
    title: "Acceptance of Terms",
    content: [
      { heading: "Agreement to Terms", text: "By accessing or using the Oncura platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree, you may not use our services." },
      { heading: "Eligibility", text: "You must be at least 18 years of age to use Oncura. By using our service, you represent and warrant that you meet this requirement and have the legal capacity to enter into this agreement." },
      { heading: "Account Responsibility", text: "You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account." },
    ]
  },
  {
    icon: AlertTriangle,
    title: "Medical Disclaimer",
    content: [
      { heading: "Not a Medical Device", text: "Oncura is an AI-powered educational monitoring and screening tool. It is NOT a licensed medical device and does NOT provide medical diagnoses, clinical assessments, or treatment recommendations." },
      { heading: "No Doctor-Patient Relationship", text: "Using Oncura does not create a doctor-patient relationship. The insights provided are for informational and educational purposes only and should never replace professional medical advice." },
      { heading: "Seek Professional Advice", text: "Always consult a qualified, board-certified dermatologist or healthcare professional for any concerns about your skin health. Do not delay or disregard professional medical advice because of information provided by Oncura." },
    ]
  },
  {
    icon: Scale,
    title: "Acceptable Use",
    content: [
      { heading: "Permitted Use", text: "You may use Oncura for personal, non-commercial skin health monitoring. You agree to use the platform only for lawful purposes and in accordance with these Terms." },
      { heading: "Prohibited Activities", text: "You may not use Oncura to upload content you do not own or have rights to, attempt to reverse-engineer our AI models, scrape or harvest data, or use the platform for any fraudulent or harmful activity." },
      { heading: "Content Standards", text: "Images uploaded must be appropriate and relevant to skin health monitoring. We reserve the right to remove content and suspend accounts that violate these standards." },
    ]
  },
  {
    icon: Globe,
    title: "Intellectual Property",
    content: [
      { heading: "Our IP", text: "The Oncura platform, including its AI models, design, code, branding, and content, is the exclusive intellectual property of Oncura and is protected by copyright and other applicable laws." },
      { heading: "Your Content", text: "You retain ownership of images and data you upload. By uploading content, you grant Oncura a limited, non-exclusive licence to process that content solely to provide the service to you." },
      { heading: "Feedback", text: "Any feedback or suggestions you provide about Oncura may be used by us to improve our services without any obligation to compensate you." },
    ]
  },
  {
    icon: RefreshCw,
    title: "Changes & Termination",
    content: [
      { heading: "Modifications", text: "We reserve the right to modify these Terms at any time. Continued use of the platform after changes constitutes your acceptance of the updated Terms. We will notify you of material changes via email or in-app notification." },
      { heading: "Termination by You", text: "You may terminate your account at any time by contacting us. Upon termination, your right to use the service ceases and we will process your data deletion request in accordance with our Privacy Policy." },
      { heading: "Termination by Us", text: "We may suspend or terminate your access immediately, without prior notice, for conduct that violates these Terms, is harmful to other users, or is otherwise illegal." },
    ]
  },
];

export default function TermsPage() {
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
              <Scale size={28} className="text-[#FFD8C2]" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#FFD8C2] mb-1">Legal Document</p>
              <h1 className="text-4xl md:text-5xl font-black">Terms of Service</h1>
            </div>
          </div>
          <p className="text-white/70 font-medium text-base leading-relaxed max-w-2xl">
            Please read these Terms carefully before using Oncura. They govern your use of our platform and services and outline the rights and responsibilities of both parties.
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
            <h3 className="text-base font-black mb-1">Legal Enquiries</h3>
            <p className="text-white/70 text-sm font-medium">For questions about these Terms, please <span className="text-[#FFD8C2] font-bold">Contact Us</span></p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
