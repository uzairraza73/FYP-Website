"use client";

import Link from "next/link";
import { ArrowLeft, Lock, ShieldCheck, Server, Key, AlertTriangle, Mail } from "lucide-react";
import { motion } from "framer-motion";

const sections = [
  {
    icon: Lock,
    title: "Data Encryption",
    content: [
      { heading: "Encryption in Transit", text: "All data transmitted between your device and our servers is encrypted using TLS 1.3, the most modern transport security protocol, ensuring your information cannot be intercepted." },
      { heading: "Encryption at Rest", text: "All stored data — including uploaded skin images, scan results, and personal information — is encrypted at rest using AES-256 encryption, the same standard used by leading financial institutions." },
      { heading: "End-to-End Image Security", text: "Skin images you upload are encrypted the moment they leave your device. They are decrypted only in secure, isolated processing environments during AI analysis and never exposed to unauthorized parties." },
    ]
  },
  {
    icon: Server,
    title: "Infrastructure Security",
    content: [
      { heading: "Cloud Infrastructure", text: "Oncura is hosted on enterprise-grade cloud infrastructure with SOC 2 Type II certification. Our servers are located in highly secure data centres with physical access controls, biometric authentication, and 24/7 monitoring." },
      { heading: "Network Security", text: "Our network perimeter is protected by enterprise-grade firewalls, intrusion detection systems (IDS), and DDoS mitigation. We employ network segmentation to isolate sensitive systems." },
      { heading: "Regular Audits", text: "We conduct regular third-party penetration tests and security audits to proactively identify and remediate vulnerabilities before they can be exploited." },
    ]
  },
  {
    icon: Key,
    title: "Access Controls",
    content: [
      { heading: "Principle of Least Privilege", text: "Internal access to user data is granted on a strict need-to-know basis. Employees and contractors can only access the data necessary to perform their specific job functions." },
      { heading: "Multi-Factor Authentication", text: "All internal systems require multi-factor authentication (MFA). We strongly recommend and support MFA for all user accounts on the Oncura platform." },
      { heading: "Access Logging & Monitoring", text: "All access to sensitive data and systems is logged, monitored, and subject to automated alerting for anomalous behaviour. We maintain detailed audit trails for compliance and security review." },
    ]
  },
  {
    icon: ShieldCheck,
    title: "Compliance",
    content: [
      { heading: "HIPAA", text: "Oncura is designed with HIPAA (Health Insurance Portability and Accountability Act) compliance principles in mind. We implement appropriate administrative, physical, and technical safeguards to protect health information." },
      { heading: "GDPR", text: "For users in the European Economic Area, we comply with the General Data Protection Regulation (GDPR). You have the rights of access, rectification, erasure, and portability of your personal data." },
      { heading: "Data Residency", text: "You can request information about where your data is stored. We offer data residency options in key regions to help you meet local regulatory requirements." },
    ]
  },
  {
    icon: AlertTriangle,
    title: "Incident Response",
    content: [
      { heading: "Breach Notification", text: "In the unlikely event of a security breach affecting your personal data, we will notify you within 72 hours of becoming aware of the incident, in accordance with applicable law." },
      { heading: "Response Protocol", text: "We maintain a comprehensive incident response plan that is regularly tested. Our dedicated security team is available 24/7 to respond to and contain any security incidents." },
      { heading: "Transparency", text: "We are committed to transparency in the event of a security incident. We will communicate clearly about what happened, what data was affected, and what steps we are taking to address it." },
    ]
  },
];

const securityStats = [
  { value: "AES-256", label: "Encryption Standard" },
  { value: "TLS 1.3", label: "Transport Security" },
  { value: "SOC 2", label: "Infrastructure Certified" },
  { value: "24/7", label: "Security Monitoring" },
];

export default function SecurityPage() {
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
              <Lock size={28} className="text-[#FFD8C2]" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#FFD8C2] mb-1">Legal Document</p>
              <h1 className="text-4xl md:text-5xl font-black">Security Policy</h1>
            </div>
          </div>
          <p className="text-white/70 font-medium text-base leading-relaxed max-w-2xl">
            Security is not an afterthought at Oncura — it is built into every layer of our platform. Here is how we protect your data.
          </p>
          <p className="text-[#FFD8C2] text-xs font-bold mt-6 uppercase tracking-widest">Last Updated: September 2024</p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {securityStats.map((s, i) => (
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
            <h3 className="text-base font-black mb-1">Report a Security Issue</h3>
            <p className="text-white/70 text-sm font-medium">Found a vulnerability? Please <span className="text-[#FFD8C2] font-bold">Contact Us</span> immediately</p>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
