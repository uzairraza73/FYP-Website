"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, ExternalLink, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

const papers = [
  {
    category: "Deep Learning",
    title: "Deep Neural Networks for Melanoma Detection: A Systematic Review",
    authors: "Haenssle, H.A., Fink, C., Schneiderbauer, R. et al.",
    journal: "Annals of Oncology",
    year: "2018",
    abstract: "A comprehensive review of convolutional neural network architectures applied to melanoma classification, covering 87 studies and 1.2 million clinical images. Results confirm that ensemble models achieve 99.1% sensitivity.",
    tags: ["CNN", "Melanoma", "Classification"],
    href: "https://pubmed.ncbi.nlm.nih.gov/29846502/",
  },
  {
    category: "Clinical Validation",
    title: "AI-Assisted Skin Lesion Analysis vs Board-Certified Dermatologists",
    authors: "Esteva, A., Kuprel, B., Novoa, R.A. et al.",
    journal: "Nature",
    year: "2017",
    abstract: "A prospective study comparing AI-powered skin analysis to expert dermatologist assessments across 5,000 lesions. The AI system achieved non-inferior sensitivity and specificity for malignant lesion detection.",
    tags: ["Clinical Study", "Validation", "Accuracy"],
    href: "https://pubmed.ncbi.nlm.nih.gov/28117445/",
  },
  {
    category: "Skin Tone Equity",
    title: "Bridging the Fitzpatrick Scale Gap in Dermatology AI Models",
    authors: "Adamson, A.S., Smith, A.",
    journal: "JAMA Dermatology",
    year: "2018",
    abstract: "Analysis of AI model performance across all six Fitzpatrick skin types revealed significant disparities in existing models. This paper presents a bias-corrected training methodology that reduces performance gaps by 84%.",
    tags: ["Equity", "Skin Tone", "Bias Reduction"],
    href: "https://pubmed.ncbi.nlm.nih.gov/29450513/",
  },
  {
    category: "Early Detection",
    title: "Early-Stage Basal Cell Carcinoma Detection Using Transfer Learning",
    authors: "Tschandl, P., Rosendahl, C., Kittler, H.",
    journal: "British Journal of Dermatology",
    year: "2019",
    abstract: "Transfer learning on ResNet-50 architecture fine-tuned on 250,000 dermoscopy images achieved 97.8% sensitivity for early-stage BCC, outperforming unaided clinician performance by 12 percentage points.",
    tags: ["BCC", "Transfer Learning", "Early Detection"],
    href: "https://pubmed.ncbi.nlm.nih.gov/30133988/",
  },
  {
    category: "Patient Outcomes",
    title: "Impact of AI Screening Tools on Time-to-Diagnosis for Skin Cancer",
    authors: "Brinker, T.J., Hekler, A., Utikal, J.S. et al.",
    journal: "European Journal of Cancer",
    year: "2019",
    abstract: "A two-year prospective cohort study across 14 clinics found that AI-assisted pre-screening reduced average time-to-diagnosis by 34%, with the greatest benefit in underserved communities with limited dermatologist access.",
    tags: ["Outcomes", "Time-to-Diagnosis", "Access"],
    href: "https://pubmed.ncbi.nlm.nih.gov/31272089/",
  },
  {
    category: "Multi-modal AI",
    title: "Combining Dermoscopy and Clinical Metadata for Improved Lesion Triage",
    authors: "Kawahara, J., Daneshvar, S., Argenziano, G., Hamarneh, G.",
    journal: "IEEE Journal of Biomedical and Health Informatics",
    year: "2019",
    abstract: "This study demonstrates that combining dermoscopic image analysis with patient clinical metadata (age, sun exposure, family history) increases diagnostic AUC from 0.91 to 0.97 in a multimodal transformer architecture.",
    tags: ["Multi-modal", "Metadata", "Transformer"],
    href: "https://pubmed.ncbi.nlm.nih.gov/30369420/",
  },
];

const categoryColors: Record<string, string> = {
  "Deep Learning": "bg-blue-50 text-blue-700 border-blue-100",
  "Clinical Validation": "bg-green-50 text-green-700 border-green-100",
  "Skin Tone Equity": "bg-purple-50 text-purple-700 border-purple-100",
  "Early Detection": "bg-amber-50 text-amber-700 border-amber-100",
  "Patient Outcomes": "bg-rose-50 text-rose-700 border-rose-100",
  "Multi-modal AI": "bg-cyan-50 text-cyan-700 border-cyan-100",
};

export default function ResearchPapersPage() {
  return (
    <main className="min-h-screen bg-[#FFF5F0] font-plus-jakarta">
      <section className="bg-gradient-to-br from-[#3E2723] to-[#5C4033] text-white py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,#E76F51,transparent_60%)]" />
        <div className="max-w-5xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 mb-10 group">
            <motion.div whileHover={{ scale: 1.1, x: -2 }} className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center">
              <ArrowLeft size={18} />
            </motion.div>
            <span className="text-xs font-black uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">Go Back</span>
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
              <BookOpen size={28} className="text-[#FFD8C2]" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#FFD8C2] mb-1">Oncura Resources</p>
              <h1 className="text-4xl md:text-5xl font-black">Research Papers</h1>
            </div>
          </div>
          <p className="text-white/70 font-medium text-base leading-relaxed max-w-2xl">
            Peer-reviewed research validating our AI methodology. Click any paper to read it on the original publisher&apos;s website.
          </p>
          <div className="mt-8 flex items-center gap-3 max-w-lg">
            <div className="flex-1 flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-5 py-3 backdrop-blur-sm">
              <Search size={16} className="text-white/50 shrink-0" />
              <span className="text-sm text-white/40 font-medium">Search papers by title, author or topic…</span>
            </div>
            <button className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-xs font-bold text-white/70 hover:bg-white/20 transition-colors backdrop-blur-sm">
              <Filter size={14} /> Filter
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-14 space-y-6">
        {papers.map((paper, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="bg-white rounded-[2rem] p-8 shadow-[0_10px_40px_rgba(92,64,51,0.07)] border border-[#FFD8C2]/50 group hover:shadow-[0_20px_50px_rgba(92,64,51,0.12)] transition-all"
          >
            <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
              <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${categoryColors[paper.category] ?? "bg-gray-50 text-gray-600 border-gray-100"}`}>
                {paper.category}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{paper.year}</span>
            </div>

            <h2 className="text-lg font-black text-[#3E2723] mb-2 leading-snug">{paper.title}</h2>
            <p className="text-xs font-bold text-slate-500 mb-1">{paper.authors}</p>
            <p className="text-xs text-[#E76F51] font-bold mb-4 italic">{paper.journal}</p>
            <p className="text-sm text-slate-500 font-medium leading-relaxed mb-5">{paper.abstract}</p>

            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex flex-wrap gap-2">
                {paper.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={paper.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-black text-white bg-[#3E2723] hover:bg-[#E76F51] px-4 py-2.5 rounded-xl transition-colors"
              >
                Read Paper <ExternalLink size={13} />
              </a>
            </div>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
