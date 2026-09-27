"use client";

import Link from "next/link";
import { ArrowLeft, Heart, ThumbsUp, MessageCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

const posts = [
  { author: "Emma R.", initials: "ER", color: "bg-rose-100 text-rose-600", time: "3 hours ago", likes: 89, replies: 24, title: "Dealing with the wait between scan and dermatologist appointment", body: "I found a spot that Oncura flagged as something to have checked. My appointment is in 10 days and the anxiety is real. Has anyone else felt this? What helped you get through the waiting period? I've been trying to stay busy but keep going back to check the spot which I know isn't helping." },
  { author: "James B.", initials: "JB", color: "bg-blue-100 text-blue-600", time: "6 hours ago", likes: 63, replies: 17, title: "For those with health anxiety using this app", body: "A word from someone who has been through CBT for health anxiety: Oncura has been a positive tool for me precisely because it gives me information instead of leaving me in the dark. The key is to use it on a schedule (once a month) and then step away. If you find yourself checking multiple times a day, please speak to someone — it helped me enormously." },
  { author: "Nadia S.", initials: "NS", color: "bg-green-100 text-green-600", time: "1 day ago", likes: 112, replies: 31, title: "My mum was diagnosed last year — sharing our family experience", body: "My mum was diagnosed with stage 2 melanoma last year. It was a frightening time but the treatment went well and she's doing great. I now use Oncura regularly and I've had honest conversations with my siblings about our family history and increased risk. Knowledge is power. I hope sharing this helps someone feel less alone." },
  { author: "Tom W.", initials: "TW", color: "bg-amber-100 text-amber-600", time: "2 days ago", likes: 45, replies: 11, title: "Managing a partner's worry alongside your own", body: "My wife gets quite anxious whenever I do a scan. We found that doing it together — me scanning, her with me for support — actually helps her feel part of the process rather than excluded and imagining worse. We treat it like a monthly health ritual rather than something scary. Just sharing in case it helps another couple." },
  { author: "Cleo F.", initials: "CF", color: "bg-purple-100 text-purple-600", time: "4 days ago", likes: 78, replies: 20, title: "Positive update: benign result after worrying for weeks", body: "I wanted to post a positive update. I had a spot that worried me for weeks and that the AI flagged. Saw my dermatologist — completely benign, just an unusual seborrhoeic keratosis. She was brilliant and explained everything clearly. If you're worried, please get checked. The relief of knowing is worth everything." },
];

export default function SupportCirclePage() {
  return (
    <main className="min-h-screen bg-[#FFF5F0] font-plus-jakarta">
      <section className="bg-gradient-to-br from-[#3E2723] to-[#5C4033] text-white py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom_left,#E76F51,transparent_60%)]" />
        <div className="max-w-4xl mx-auto relative z-10">
          <Link href="/community" className="inline-flex items-center gap-3 mb-10 group">
            <motion.div whileHover={{ scale: 1.1, x: -2 }} className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center">
              <ArrowLeft size={18} />
            </motion.div>
            <span className="text-xs font-black uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">Back to Community</span>
          </Link>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
              <Heart size={28} className="text-[#FFD8C2]" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#FFD8C2] mb-1">Community Forum</p>
              <h1 className="text-4xl md:text-5xl font-black">Support Circle</h1>
            </div>
          </div>
          <p className="text-white/70 font-medium text-base max-w-xl">A safe, moderated space to share experiences, seek support, and connect with others on a similar skin health journey.</p>
          <div className="mt-4 bg-white/10 border border-white/20 rounded-2xl px-5 py-3 max-w-md backdrop-blur-sm">
            <p className="text-[10px] font-black text-[#FFD8C2] uppercase tracking-widest mb-1">Community Guidelines</p>
            <p className="text-xs text-white/70 font-medium">This space is moderated. Be kind, be respectful, and remember we are not medical professionals. Always consult a qualified doctor for medical advice.</p>
          </div>
          <p className="text-[#FFD8C2] text-xs font-bold mt-4 uppercase tracking-widest">218 community posts</p>
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
