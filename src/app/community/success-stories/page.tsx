"use client";

import Link from "next/link";
import { ArrowLeft, Award, Star, ThumbsUp, MessageCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

const stories = [
  {
    author: "Sarah Mitchell", initials: "SM", location: "London, UK", color: "bg-rose-100 text-rose-600", time: "1 week ago", likes: 234, replies: 47, rating: 5,
    title: "Stage 1 melanoma caught because of Oncura — I'm cancer free",
    body: "I want to share my story because I know someone reading this might be in the same position I was six months ago. I had a mole on my upper back that had been there for years. I wasn't worried about it but I did a routine Oncura scan and it came back 'review recommended'. My GP referred me to a dermatologist who biopsied it immediately. Stage 1A melanoma. Two weeks later I had surgery. My margins were clear. I'm cancer free.\n\nI genuinely believe I might not have got it checked if Oncura hadn't flagged it. The mole didn't look alarming to me. To anyone sitting on a 'review recommended' result — please book that appointment. It saved my life.",
    tag: "Melanoma",
    outcome: "Cancer Free",
    outcomeColor: "bg-green-50 text-green-700 border-green-100",
  },
  {
    author: "Marcus Osei", initials: "MO", location: "Accra, Ghana", color: "bg-amber-100 text-amber-600", time: "2 weeks ago", likes: 188, replies: 31, rating: 5,
    title: "Early-stage BCC detected — and why skin tone diversity matters",
    body: "I'm a Fitzpatrick type V and I've always been told darker skin is 'protected'. My dermatologist is 400km away. When I heard about Oncura I was sceptical — I'd been burned (no pun intended) by AI tools that clearly weren't built with skin like mine in mind.\n\nI tried it anyway. It flagged a spot on my cheek as worth investigating. I made the journey to the dermatologist. Basal cell carcinoma, caught very early. Treatment was straightforward. I'm doing great. But the reason I'm sharing this is for anyone with darker skin who thinks they're immune — you're not. And for anyone who doubts Oncura works on all skin tones — in my experience, it does.",
    tag: "Basal Cell Carcinoma",
    outcome: "Successfully Treated",
    outcomeColor: "bg-blue-50 text-blue-700 border-blue-100",
  },
  {
    author: "Priya Nair", initials: "PN", location: "Mumbai, India", color: "bg-purple-100 text-purple-600", time: "3 weeks ago", likes: 156, replies: 28, rating: 5,
    title: "12 months of tracking gave my dermatologist exactly what she needed",
    body: "I have a strong family history — both my mother and an uncle have had melanoma. My dermatologist visits me annually but I always felt anxious in between. I started using Oncura 12 months ago and methodically tracked six moles I was concerned about.\n\nAt my annual appointment last month, I showed my dermatologist the 12-month timeline in the Oncura Health History. She said it was the most useful thing a patient had ever brought to an appointment — she could actually see the progression or stability of each spot with clinical images. Three moles were stable, two she wanted to watch more closely, and one she biopsied (turned out benign). The monitoring gave both of us data, not just worry.",
    tag: "Prevention & Monitoring",
    outcome: "All Clear",
    outcomeColor: "bg-green-50 text-green-700 border-green-100",
  },
  {
    author: "Dr. James Kowalski", initials: "JK", location: "Warsaw, Poland", color: "bg-blue-100 text-blue-600", time: "1 month ago", likes: 312, replies: 62, rating: 5,
    title: "A dermatologist's perspective: why I now recommend Oncura",
    body: "I am a board-certified dermatologist. When AI skin tools first appeared I was deeply sceptical — I'd seen many that overpromised and underdelivered, and some that caused unnecessary alarm in patients.\n\nI started seeing Oncura results brought to appointments by patients. What impressed me was: (1) the results were calibrated appropriately — not flagging everything, not missing concerning lesions, (2) the patients who used it came to appointments better prepared and with better photos than I could often take myself in-clinic, and (3) it seemed to motivate appropriate screening behaviour without causing compulsive anxiety in most users.\n\nI now actively recommend Oncura to patients with personal or family risk factors as a supplementary tool between annual checks. I want to be clear — it does not replace dermatologist evaluation. But as a screening aid and monitoring tool, it is the best I have encountered.",
    tag: "Medical Professional",
    outcome: "Professional Endorsement",
    outcomeColor: "bg-amber-50 text-amber-700 border-amber-100",
  },
];

export default function SuccessStoriesPage() {
  return (
    <main className="min-h-screen bg-[#FFF5F0] font-plus-jakarta">
      <section className="bg-gradient-to-br from-[#3E2723] to-[#5C4033] text-white py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,#E76F51,transparent_60%)]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/community" className="inline-flex items-center gap-3 mb-10 group">
            <motion.div whileHover={{ scale: 1.1, x: -2 }} className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center">
              <ArrowLeft size={18} />
            </motion.div>
            <span className="text-xs font-black uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">Back to Community</span>
          </Link>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
              <Award size={28} className="text-[#FFD8C2]" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#FFD8C2] mb-1">Community Forum</p>
              <h1 className="text-4xl md:text-5xl font-black">Success Stories</h1>
            </div>
          </div>
          <p className="text-white/70 font-medium text-base max-w-xl">Real stories from real people. Early detection, positive outcomes, and lives changed by proactive skin health monitoring.</p>
          <p className="text-[#FFD8C2] text-xs font-bold mt-4 uppercase tracking-widest">156 community posts</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-14 space-y-8">
        {stories.map((story, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="bg-white rounded-[2rem] p-8 shadow-[0_10px_40px_rgba(92,64,51,0.07)] border border-[#FFD8C2]/50 group hover:shadow-[0_20px_50px_rgba(92,64,51,0.1)] transition-all">
            {/* Stars */}
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: story.rating }).map((_, j) => (
                <Star key={j} size={14} className="fill-[#E76F51] text-[#E76F51]" />
              ))}
            </div>

            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${story.color} flex items-center justify-center text-xs font-black shrink-0`}>{story.initials}</div>
                <div>
                  <p className="text-sm font-black text-[#111827]">{story.author}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{story.location} · <Clock size={9} className="inline" /> {story.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black uppercase tracking-widest bg-[#FFF5F0] text-[#E76F51] border border-[#FFD8C2] px-2.5 py-1 rounded-full">{story.tag}</span>
                <span className={`text-[9px] font-black uppercase tracking-widest border px-2.5 py-1 rounded-full ${story.outcomeColor}`}>{story.outcome}</span>
              </div>
            </div>

            <h2 className="text-lg font-black text-[#3E2723] mb-3 leading-snug group-hover:text-[#E76F51] transition-colors">{story.title}</h2>
            <p className="text-sm text-slate-500 font-medium leading-relaxed mb-5 whitespace-pre-line">{story.body}</p>

            <div className="flex items-center gap-5 text-xs font-bold text-slate-400">
              <button className="flex items-center gap-1.5 hover:text-[#E76F51] transition-colors"><ThumbsUp size={13} /> {story.likes}</button>
              <button className="flex items-center gap-1.5 hover:text-[#5C4033] transition-colors"><MessageCircle size={13} /> {story.replies} replies</button>
            </div>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
