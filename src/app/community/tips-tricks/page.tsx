"use client";

import Link from "next/link";
import { ArrowLeft, Lightbulb, ThumbsUp, MessageCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

const posts = [
  { author: "Alex T.", initials: "AT", color: "bg-blue-100 text-blue-600", time: "2 hours ago", likes: 48, replies: 12, title: "Using Oncura before every GP appointment", body: "I started taking an Oncura scan of any spots I'm concerned about before every GP visit. I show them the Oncura result and it makes the appointment so much more productive. My GP said it actually helps her prioritise which areas to examine more closely." },
  { author: "Rina P.", initials: "RP", color: "bg-rose-100 text-rose-600", time: "5 hours ago", likes: 34, replies: 8, title: "Set a monthly calendar reminder — changed everything", body: "I used to check my skin randomly and anxiously. Setting a monthly calendar event for 'Skin Check Day' completely changed my relationship with monitoring. It's scheduled, done properly, and then I don't think about it again until next month." },
  { author: "David K.", initials: "DK", color: "bg-green-100 text-green-600", time: "1 day ago", likes: 72, replies: 19, title: "Best lighting setup for AI scans", body: "After experimenting, I found that natural daylight near a window gives the best scan results. Avoid direct harsh sunlight (creates shadows) and avoid bathroom overhead lighting (too yellow). A ring light or desk lamp pointed at the spot works well if natural light isn't available." },
  { author: "Yuki M.", initials: "YM", color: "bg-amber-100 text-amber-600", time: "2 days ago", likes: 55, replies: 14, title: "Photographing hard-to-reach spots — my method", body: "For spots on my back, I use a mirror angled against the wall and hold my phone behind me. Takes a bit of practice! For the back of my neck, I use the front camera on my phone and flip it around. You can also ask a trusted person to take the scan for you using your phone." },
  { author: "Priya N.", initials: "PN", color: "bg-purple-100 text-purple-600", time: "3 days ago", likes: 41, replies: 9, title: "How I track changes in the Health History tab", body: "I take a scan of my 'watch list' moles every month. In Health History, I can see side-by-side comparisons. I label each scan with which spot it is (e.g., 'Right shoulder, upper mole'). This way when I see my dermatologist annually I can show her a clear 12-month picture." },
];

export default function TipsTricksPage() {
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
              <Lightbulb size={28} className="text-[#FFD8C2]" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#FFD8C2] mb-1">Community Forum</p>
              <h1 className="text-4xl md:text-5xl font-black">Tips &amp; Tricks</h1>
            </div>
          </div>
          <p className="text-white/70 font-medium text-base max-w-xl">Best practices from the Oncura community for getting the most out of your skin health monitoring.</p>
          <p className="text-[#FFD8C2] text-xs font-bold mt-4 uppercase tracking-widest">342 community posts</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-14 space-y-6">
        {posts.map((post, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="bg-white rounded-[2rem] p-7 shadow-[0_10px_40px_rgba(92,64,51,0.07)] border border-[#FFD8C2]/50 group hover:shadow-[0_20px_50px_rgba(92,64,51,0.1)] transition-all">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${post.color} flex items-center justify-center text-xs font-black shrink-0`}>{post.initials}</div>
                <div>
                  <p className="text-xs font-black text-[#111827]">{post.author}</p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1"><Clock size={9} /> {post.time}</p>
                </div>
              </div>
            </div>
            <h2 className="text-base font-black text-[#3E2723] mb-2 group-hover:text-[#E76F51] transition-colors">{post.title}</h2>
            <p className="text-sm text-slate-500 font-medium leading-relaxed mb-4">{post.body}</p>
            <div className="flex items-center gap-5 text-xs font-bold text-slate-400">
              <button className="flex items-center gap-1.5 hover:text-[#E76F51] transition-colors"><ThumbsUp size={13} /> {post.likes}</button>
              <button className="flex items-center gap-1.5 hover:text-[#5C4033] transition-colors"><MessageCircle size={13} /> {post.replies} replies</button>
            </div>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
