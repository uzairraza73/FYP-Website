"use client";

import Link from "next/link";
import { ArrowLeft, Scale, ShieldCheck, CheckCircle2, Globe, FileText, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const frameworks = [
  {
    icon: ShieldCheck,
    title: "HIPAA",
    subtitle: "Health Insurance Portability and Accountability Act",
    region: "United States",
    status: "Compliant",
    description: "Oncura implements all required Administrative, Physical, and Technical Safeguards under HIPAA. We maintain Business Associate Agreements (BAAs) with all third-party vendors who process Protected Health Information (PHI).",
    items: ["PHI encrypted at rest and in transit", "Role-based access controls enforced", "Audit logs maintained for all PHI access", "Breach notification procedures in place", "Employee HIPAA training conducted annually"],
  },
  {
    icon: Globe,
    title: "GDPR",
    subtitle: "General Data Protection Regulation",
    region: "European Union",
    status: "Compliant",
    description: "For users in the European Economic Area, Oncura fully complies with GDPR. We have appointed a Data Protection Officer (DPO) and maintain detailed Records of Processing Activities (RoPA).",
    items: ["Lawful basis documented for all processing", "Data Subject Rights (DSR) portal available", "Data Protection Impact Assessments (DPIAs) conducted", "Cross-border transfer mechanisms in place (SCCs)", "72-hour breach notification window maintained"],
  },
  {
    icon: FileText,
    title: "SOC 2 Type II",
    subtitle: "Service Organization Control",
    region: "Global Standard",
    status: "Certified",
    description: "Our cloud infrastructure and internal security controls are independently audited against the SOC 2 Trust Services Criteria (Security, Availability, Confidentiality). Our most recent audit was completed by a Big Four accounting firm.",
    items: ["Security: Logical and physical access controls", "Availability: 99.9% uptime SLA maintained", "Confidentiality: Data classification and handling policies", "Annual third-party audit and report renewal", "Continuous monitoring between audits"],
  },
  {
    icon: Scale,
    title: "CCPA",
    subtitle: "California Consumer Privacy Act",
    region: "California, USA",
    status: "Compliant",
    description: "California residents using Oncura have enhanced rights under CCPA including the right to know, right to delete, and right to opt out of data sales. Oncura does not sell personal information.",
    items: ["Do Not Sell My Personal Information option provided", "Privacy Notice updated with CCPA disclosures", "Consumer request verification and response process", "No personal information sold to third parties", "Annual data inventory and mapping conducted"],
  },
];

const certifications = [
  { name: "HIPAA", region: "US", color: "bg-blue-50 text-blue-700 border-blue-100" },
  { name: "GDPR", region: "EU", color: "bg-green-50 text-green-700 border-green-100" },
  { name: "SOC 2 Type II", region: "Global", color: "bg-amber-50 text-amber-700 border-amber-100" },
  { name: "CCPA", region: "CA", color: "bg-purple-50 text-purple-700 border-purple-100" },
];

export default function CompliancePage() {
  return (
    <main className="min-h-screen bg-[#FFF5F0] font-plus-jakarta">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#3E2723] to-[#5C4033] text-white py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_left,#E76F51,transparent_60%)]" />
        <div className="max-w-5xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 mb-10 group">
            <motion.div whileHover={{ scale: 1.1, x: -2 }} className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center">
              <ArrowLeft size={18} />
            </motion.div>
            <span className="text-xs font-black uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">Go Back</span>
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
              <Scale size={28} className="text-[#FFD8C2]" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#FFD8C2] mb-1">Oncura Resources</p>
              <h1 className="text-4xl md:text-5xl font-black">Compliance</h1>
            </div>
          </div>
          <p className="text-white/70 font-medium text-base leading-relaxed max-w-2xl">
            Oncura meets the highest global standards for healthcare data compliance. Here is a transparent breakdown of every framework we adhere to.
          </p>

          {/* Certification badges */}
          <div className="flex flex-wrap gap-3 mt-8">
            {certifications.map((c) => (
              <div key={c.name} className={`flex items-center gap-2 px-4 py-2 rounded-full border font-black text-[10px] uppercase tracking-widest ${c.color}`}>
                <CheckCircle2 size={12} /> {c.name} · {c.region}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Frameworks */}
      <section className="max-w-5xl mx-auto px-6 py-14 space-y-8">
        {frameworks.map((fw, i) => {
          const Icon = fw.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="bg-white rounded-[2rem] p-8 shadow-[0_10px_40px_rgba(92,64,51,0.07)] border border-[#FFD8C2]/50"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFF5F0] text-[#5C4033] flex items-center justify-center shrink-0 border border-[#FFD8C2]/50">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-[#3E2723]">{fw.title}</h2>
                    <p className="text-xs text-slate-500 font-medium">{fw.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{fw.region}</span>
                  <span className="flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-100 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                    <CheckCircle2 size={10} /> {fw.status}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-5">{fw.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {fw.items.map((item, j) => (
                  <div key={j} className="flex items-start gap-2.5 text-sm text-slate-600 font-medium">
                    <CheckCircle2 size={14} className="text-[#E76F51] mt-0.5 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#3E2723] to-[#5C4033] rounded-[2rem] p-8 text-white flex items-center justify-between gap-6 flex-wrap"
        >
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <Mail size={22} className="text-[#FFD8C2]" />
            </div>
            <div>
              <h3 className="text-base font-black mb-1">Need Compliance Documentation?</h3>
              <p className="text-white/70 text-sm font-medium">Request our SOC 2 report or BAA at <span className="text-[#FFD8C2] font-bold">compliance@oncura.ai</span></p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-white text-[#3E2723] font-black text-xs uppercase tracking-widest px-5 py-3 rounded-2xl hover:bg-[#FFD8C2] transition-colors shrink-0">
            Request Docs <ArrowRight size={14} />
          </button>
        </motion.div>
      </section>
    </main>
  );
}
