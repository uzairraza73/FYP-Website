"use client";

import Link from "next/link";
import { ArrowLeft, MessageCircle, ThumbsUp, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const posts = [
  {
    author: "Sophie L.", initials: "SL", color: "bg-blue-100 text-blue-600", time: "1 hour ago", likes: 23, replies: 8, answered: true,
    title: "How often should I scan the same mole?",
    body: "I have a mole on my forearm that I'm monitoring. I did a scan 2 weeks ago and it was fine. How often should I rescan it? Is monthly enough or should I do it more frequently?",
    answer: "Great question! The Oncura team and dermatology partners recommend monthly scans for moles you are monitoring. Daily or weekly scanning can fuel anxiety without providing useful additional data — moles don't change meaningfully on that timescale. Set a calendar reminder for once a month. If you notice a sudden visible change (bleeding, rapid size change) between scans, consult a dermatologist promptly rather than waiting for your next scan.",
  },
  {
    author: "Carlos M.", initials: "CM", color: "bg-green-100 text-green-600", time: "4 hours ago", likes: 41, replies: 13, answered: true,
    title: "Oncura flagged a spot as 'review recommended' — what does this mean exactly?",
    body: "I got a result saying 'review recommended'. I'm quite worried. Does this mean cancer? Should I go to A&E?",
    answer: "A 'Review Recommended' result from Oncura means the AI detected features in the image that warrant professional evaluation — it does NOT mean cancer. The vast majority of 'review recommended' results turn out to be benign conditions. It is our way of erring on the side of caution and prompting you to get a professional opinion. Please make a routine GP or dermatologist appointment (not A&E unless the spot is bleeding heavily or changing very rapidly). Bring the Oncura scan result to your appointment.",
  },
  {
    author: "Mei L.", initials: "ML", color: "bg-purple-100 text-purple-600", time: "12 hours ago", likes: 38, replies: 7, answered: true,
    title: "Can I use Oncura for my children's moles?",
    body: "My 8-year-old has a few larger moles that our paediatrician said to monitor. Can I use Oncura for children?",
    answer: "Oncura's AI model has been trained primarily on adult skin data and is designed for adult users (18+). For children, we strongly recommend working directly with a paediatric dermatologist rather than using AI screening tools. Your paediatrician is right to monitor the moles — photograph them at home for your own records and share those photos at appointments. Children's skin and moles change significantly during growth, which can make AI interpretation less reliable.",
  },
  {
    author: "Raj P.", initials: "RP", color: "bg-amber-100 text-amber-600", time: "1 day ago", likes: 56, replies: 15, answered: true,
    title: "Does darker skin affect scan accuracy?",
    body: "I have very dark skin (Fitzpatrick type VI) and I want to know if the AI is accurate for me. I've heard some AI tools are worse for darker skin tones.",
    answer: "This is an important and completely valid concern — many early dermatology AI tools were trained predominantly on lighter skin tones, leading to significant performance disparities. Oncura has been trained on a diverse, curated dataset that includes all six Fitzpatrick skin types, with specific attention to ensuring equitable performance. Our clinical validation data shows comparable accuracy across skin tones. That said, we continue to improve our models and always recommend professional dermatologist confirmation for any concerning result.",
  },
  {
    author: "Laura B.", initials: "LB", color: "bg-rose-100 text-rose-600", time: "2 days ago", likes: 29, replies: 6, answered: false,
    title: "What's the best way to photograph a mole on my scalp?",
    body: "I have a mole on my scalp that I can't see or photograph properly. I've tried using two mirrors but I can't get a clear enough image for Oncura to analyse. Any suggestions from the community?",
    answer: "",
  },
];

export default function AskAQuestionPage() {
  return (
    <main className="min-h-screen bg-[#FFF5F0] font-plus-jakarta">
      <section className="bg-gradient-to-br from-[#3E2723] to-[#5C4033] text-white py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_left,#E76F51,transparent_60%)]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/community" className="inline-flex items-center gap-3 mb-10 group">
            <motion.div whileHover={{ scale: 1.1, x: -2 }} className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center">
              <ArrowLeft size={18} />
            </motion.div>
            <span className="text-xs font-black uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">Back to Community</span>
          </Link>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
              <MessageCircle size={28} className="text-[#FFD8C2]" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#FFD8C2] mb-1">Community Forum</p>
              <h1 className="text-4xl md:text-5xl font-black">Ask a Question</h1>
            </div>
          </div>
          <p className="text-white/70 font-medium text-base max-w-xl">Get answers from our community of users, health advocates, and expert moderators. Verified answers are marked with a green badge.</p>
          <p className="text-[#FFD8C2] text-xs font-bold mt-4 uppercase tracking-widest">891 community posts</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-14 space-y-6">
        {posts.map((post, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="bg-white rounded-[2rem] overflow-hidden shadow-[0_10px_40px_rgba(92,64,51,0.07)] border border-[#FFD8C2]/50">
            <div className="p-7">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${post.color} flex items-center justify-center text-xs font-black shrink-0`}>{post.initials}</div>
                  <div>
                    <p className="text-xs font-black text-[#111827]">{post.author}</p>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1"><Clock size={9} /> {post.time}</p>
                  </div>
                </div>
                {post.answered && (
                  <span className="flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-100 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    <CheckCircle2 size={10} /> Answered
                  </span>
                )}
              </div>
              <h2 className="text-base font-black text-[#3E2723] mb-2">{post.title}</h2>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-4">{post.body}</p>
              <div className="flex items-center gap-5 text-xs font-bold text-slate-400">
                <button className="flex items-center gap-1.5 hover:text-[#E76F51] transition-colors"><ThumbsUp size={13} /> {post.likes}</button>
                <button className="flex items-center gap-1.5 hover:text-[#5C4033] transition-colors"><MessageCircle size={13} /> {post.replies} replies</button>
              </div>
            </div>
            {post.answer && (
              <div className="bg-[#FFF5F0] border-t border-[#FFD8C2]/40 px-7 py-5">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 size={14} className="text-[#E76F51]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#E76F51]">Oncura Expert Answer</span>
                </div>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">{post.answer}</p>
              </div>
            )}
          </motion.div>
        ))}
      </section>
    </main>
  );
}
