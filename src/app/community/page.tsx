"use client";

import Link from "next/link";
import { ArrowLeft, Users, MessageCircle, Award, ArrowRight, Star, Lightbulb, Heart } from "lucide-react";
import { motion } from "framer-motion";

const forumTopics = [
  { icon: Lightbulb, title: "Tips & Tricks", slug: "tips-tricks", posts: 342, desc: "Share your best practices for skin health monitoring and AI scanning." },
  { icon: Heart, title: "Support Circle", slug: "support-circle", posts: 218, desc: "A safe space to discuss skin health concerns, anxiety, and personal experiences." },
  { icon: MessageCircle, title: "Ask a Question", slug: "ask-a-question", posts: 891, desc: "Get answers from our community of users, health advocates, and expert moderators." },
  { icon: Award, title: "Success Stories", slug: "success-stories", posts: 156, desc: "Share your early detection stories and the positive outcomes you have experienced." },
];

const stories = [
  {
    name: "Sarah Mitchell", location: "London, UK", initials: "SM",
    avatarColor: "bg-rose-100 text-rose-600", rating: 5,
    title: "Caught early — the Oncura scan gave me peace of mind",
    story: "I noticed a mole on my back that seemed to change slightly. I ran an Oncura scan and it flagged it as worth getting checked. My dermatologist confirmed it was an early-stage melanoma. Caught completely in time.",
    tag: "Early Detection",
  },
  {
    name: "Marcus Osei", location: "Accra, Ghana", initials: "MO",
    avatarColor: "bg-amber-100 text-amber-600", rating: 5,
    title: "Finally an AI that works on darker skin tones",
    story: "Finding dermatology tools validated on darker skin is so difficult. Oncura actually works. The analysis was accurate, the guidance was clear, and I felt seen as a patient.",
    tag: "Skin Tone Inclusion",
  },
  {
    name: "Priya Nair", location: "Mumbai, India", initials: "PN",
    avatarColor: "bg-purple-100 text-purple-600", rating: 5,
    title: "The health history feature is a game changer",
    story: "I have a family history of skin cancer so I monitor several spots regularly. The timeline feature in Oncura lets me track every scan over time and see changes clearly.",
    tag: "Health Tracking",
  },
  {
    name: "Dr. James Kowalski", location: "Warsaw, Poland", initials: "JK",
    avatarColor: "bg-blue-100 text-blue-600", rating: 5,
    title: "Recommending Oncura to patients as a screening aid",
    story: "As a dermatologist, I am cautious about AI tools. But Oncura is transparent about being a screening aid, not a diagnosis. Several of my patients use it and come in better prepared.",
    tag: "Medical Community",
  },
];

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-[#FFF5F0] font-plus-jakarta">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#3E2723] to-[#5C4033] text-white py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom_right,#E76F51,transparent_60%)]" />
        <div className="max-w-5xl mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 mb-10 group">
            <motion.div whileHover={{ scale: 1.1, x: -2 }} className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center">
              <ArrowLeft size={18} />
            </motion.div>
            <span className="text-xs font-black uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">Go Back</span>
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
              <Users size={28} className="text-[#FFD8C2]" />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#FFD8C2] mb-1">Oncura Resources</p>
              <h1 className="text-4xl md:text-5xl font-black">Community</h1>
            </div>
          </div>
          <p className="text-white/70 font-medium text-base leading-relaxed max-w-2xl">
            Join thousands of Oncura users sharing experiences, insights, and support. Click any topic to join the conversation.
          </p>
          <div className="flex flex-wrap gap-8 mt-10">
            {[{ v: "50K+", l: "Members" }, { v: "120+", l: "Countries" }, { v: "1,600+", l: "Posts" }, { v: "4.9★", l: "Rating" }].map((s) => (
              <div key={s.l}>
                <p className="text-3xl font-black text-white">{s.v}</p>
                <p className="text-xs font-bold text-[#FFD8C2] uppercase tracking-widest">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Forum Topics */}
      <section className="max-w-5xl mx-auto px-6 pt-14 pb-8">
        <h2 className="text-2xl font-black text-[#3E2723] mb-6">Forum Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {forumTopics.map((topic, i) => {
            const Icon = topic.icon;
            return (
              <Link key={i} href={`/community/${topic.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-[1.75rem] p-6 shadow-[0_10px_30px_rgba(92,64,51,0.07)] border border-[#FFD8C2]/50 flex items-start gap-4 group hover:shadow-[0_20px_50px_rgba(92,64,51,0.12)] hover:-translate-y-1 transition-all cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-2xl bg-[#FFF5F0] text-[#5C4033] flex items-center justify-center shrink-0 border border-[#FFD8C2]/50 group-hover:bg-[#E76F51] group-hover:text-white transition-all">
                    <Icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-black text-[#111827] group-hover:text-[#E76F51] transition-colors">{topic.title}</h3>
                      <span className="text-[10px] font-bold text-slate-400">{topic.posts} posts</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-snug">{topic.desc}</p>
                  </div>
                  <ArrowRight size={16} className="text-slate-300 group-hover:text-[#E76F51] group-hover:translate-x-1 transition-all mt-1 shrink-0" />
                </motion.div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Member Stories */}
      <section className="max-w-5xl mx-auto px-6 pb-14">
        <h2 className="text-2xl font-black text-[#3E2723] mb-6">Member Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="bg-white rounded-[2rem] p-7 shadow-[0_10px_40px_rgba(92,64,51,0.07)] border border-[#FFD8C2]/50">
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: s.rating }).map((_, j) => (
                  <Star key={j} size={13} className="fill-[#E76F51] text-[#E76F51]" />
                ))}
              </div>
              <h3 className="text-sm font-black text-[#3E2723] mb-2 leading-snug">{s.title}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-5">&ldquo;{s.story}&rdquo;</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${s.avatarColor} flex items-center justify-center text-xs font-black`}>{s.initials}</div>
                  <div>
                    <p className="text-xs font-black text-[#111827]">{s.name}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{s.location}</p>
                  </div>
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest bg-[#FFF5F0] text-[#E76F51] border border-[#FFD8C2] px-2.5 py-1 rounded-full">{s.tag}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
