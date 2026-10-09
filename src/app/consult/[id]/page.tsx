"use client";

import { use, useState, useRef, useEffect } from "react";
import { notFound } from "next/navigation";
import { availableDoctors } from "@/data/consultData";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "@/components/BackButton";
import Image from "next/image";
import { 
  Star, Phone, Briefcase, Calendar, UserCircle, 
  Clock, MapPin, CheckCircle2, ShieldCheck, MessageSquare,
  Send, X, User, Stethoscope, Sparkles, ArrowRight
} from "lucide-react";
import { GlassCard } from "@/components/GlassCard";
import { useMessageStore } from "@/store/useMessageStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function DoctorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const doctor = availableDoctors.find(d => d.id === unwrappedParams.id);
  const router = useRouter();
  const { user } = useAuthStore();
  const { sendMessage, getConversation } = useMessageStore();

  const [showChat, setShowChat] = useState(false);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const patientName = user?.name || "Sara Khan";

  const conversation = doctor ? getConversation(doctor.id) : undefined;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (showChat) scrollToBottom();
  }, [conversation?.messages.length, showChat]);

  if (!doctor) {
    notFound();
  }

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(
      doctor.id,
      doctor.name,
      doctor.specialty,
      patientName,
      inputText.trim(),
      "patient"
    );
    setInputText("");
  };

  return (
    <main className="min-h-screen bg-[#FFF5F0] font-plus-jakarta pb-32">
      {/* ── HERO ── */}
      <section className="bg-gradient-to-br from-[#3E2723] to-[#5C4033] text-white pt-28 pb-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,#E76F51,transparent_60%)]" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,0.2) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="mb-10">
            <BackButton />
          </div>
        </div>
      </section>

      {/* ── PROFILE CONTENT ── */}
      <div className="max-w-4xl mx-auto px-6 -mt-32 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
          className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_20px_60px_rgba(92,64,51,0.09)] border border-[#FFD8C2]/60"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Profile Image */}
            <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl shrink-0">
              <Image 
                src={doctor.image}
                alt={doctor.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-[#FFD8C2] rounded-[2rem]" />
            </div>

            {/* Profile Info */}
            <div className="flex-1 w-full">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                <h1 className="text-3xl md:text-4xl font-black text-[#3E2723] tracking-tight">{doctor.name}</h1>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-[#FFF5F0] border border-[#FFD8C2]/60 rounded-xl">
                  <Star size={16} className="fill-[#E76F51] text-[#E76F51]" />
                  <span className="text-sm font-black text-[#5C4033]">{doctor.rating} Rating</span>
                </div>
              </div>
              
              <p className="text-lg font-bold text-[#E76F51] mb-6 flex items-center gap-2">
                <Briefcase size={18} /> {doctor.specialty}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 border-y border-[#FFD8C2]/60 py-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Calendar size={12} /> Experience</span>
                  <span className="text-sm font-bold text-[#111827]">{doctor.experience} Years</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><ShieldCheck size={12} /> License</span>
                  <span className="text-sm font-bold text-emerald-600 flex items-center gap-1"><CheckCircle2 size={14} /> Verified</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><MapPin size={12} /> Location</span>
                  <span className="text-sm font-bold text-[#111827]">{doctor.area}, {doctor.city}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5"><Phone size={12} /> Contact</span>
                  <span className="text-sm font-bold text-[#111827]">{doctor.phone}</span>
                </div>
              </div>

              {/* Bio block */}
              <div className="mb-8">
                 <h2 className="text-sm font-black text-[#3E2723] uppercase tracking-widest mb-3">About the Specialist</h2>
                 <p className="text-sm text-slate-500 font-medium leading-relaxed">
                   {doctor.name} is a highly respected {doctor.specialty.toLowerCase()} with extensive experience in clinical dermatology and oncology. Specializing in the early detection and treatment of complex skin lesions, they have a proven track record of accurate diagnosis and patient-centered care.
                 </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowChat(true)}
                  className="flex items-center gap-2 bg-[#8D6E63] hover:bg-[#5C4033] text-white font-black text-sm rounded-full px-6 py-3 transition-all shadow-md"
                >
                  <MessageSquare size={16} />
                  {conversation ? "Continue Chat" : "Message Doctor"}
                </button>
                {conversation && (
                  <button
                    onClick={() => router.push("/dashboard/messages")}
                    className="flex items-center gap-2 bg-[#F5EDE4] hover:bg-[#E8D5C4] text-[#5C4033] font-black text-sm rounded-full px-6 py-3 transition-all border border-[#E8D5C4]"
                  >
                    View All Messages <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── SCHEDULE ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-8"
        >
           <h2 className="text-xl font-black text-[#3E2723] mb-6 flex items-center gap-3">
             <Calendar className="text-[#E76F51]" /> Available Appointments
           </h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {doctor.presence.map((slot, i) => (
               <GlassCard key={i} className="bg-white border-[#FFD8C2]/60 hover:border-[#E76F51] p-5 shadow-[0_10px_30px_rgba(92,64,51,0.05)] transition-all group cursor-pointer">
                 <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-black text-[#3E2723] mb-1">{slot.day}, {slot.date}</p>
                      <p className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-widest">
                        <Clock size={12} className="text-[#E76F51]" /> {slot.timeSlot}
                      </p>
                    </div>
                    <button className="px-4 py-2 bg-[#FFF5F0] text-[#E76F51] border border-[#FFD8C2] rounded-xl text-[10px] font-black uppercase tracking-widest group-hover:bg-[#E76F51] group-hover:text-white transition-colors">
                      Book Slot
                    </button>
                 </div>
               </GlassCard>
             ))}
           </div>
        </motion.div>
      </div>

      {/* ── FLOATING CHAT MODAL ── */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#3E2723]/40 backdrop-blur-sm flex items-end md:items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowChat(false)}
          >
            <motion.div
              initial={{ y: 80, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 80, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="bg-white/95 backdrop-blur-2xl border border-white rounded-[2rem] shadow-2xl w-full max-w-lg flex flex-col overflow-hidden"
              style={{ maxHeight: "80vh" }}
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-[#F0E8DF] flex items-center gap-3 flex-shrink-0 bg-gradient-to-r from-[#F5EDE4] to-white">
                <div className="w-10 h-10 rounded-2xl bg-[#F0E8DF] border border-[#E8D5C4] flex items-center justify-center text-[#8D6E63] font-black">
                  {doctor.name.replace("Dr. ", "").charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black text-[#3E2723]">{doctor.name}</p>
                  <p className="text-[10px] text-[#8D6E63] font-medium">{doctor.specialty}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => { setShowChat(false); router.push("/dashboard/messages"); }}
                    className="text-[10px] font-black text-[#8D6E63] hover:text-[#5C4033] uppercase tracking-wider transition-colors"
                  >
                    View All
                  </button>
                  <button
                    onClick={() => setShowChat(false)}
                    className="w-8 h-8 rounded-full bg-[#F0E8DF] flex items-center justify-center text-[#8D6E63] hover:bg-[#E8D5C4] transition-all"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 bg-[#F9F5F1]/60">
                {/* Disclaimer banner */}
                <div className="flex items-start gap-2 p-3 bg-white border border-[#E8D5C4] rounded-2xl text-[11px] text-[#8D6E63] font-medium">
                  <Sparkles size={13} className="text-[#D4A98A] flex-shrink-0 mt-0.5" />
                  Your messages are private and encrypted. {doctor.name} will respond during clinic hours.
                </div>

                {(!conversation || conversation.messages.length === 0) && (
                  <div className="py-8 text-center">
                    <div className="w-14 h-14 bg-[#F0E8DF] border border-[#E8D5C4] rounded-2xl flex items-center justify-center text-[#8D6E63] mx-auto mb-3">
                      <MessageSquare size={24} />
                    </div>
                    <p className="text-xs font-black text-[#A1887F] uppercase tracking-widest">Start the conversation</p>
                    <p className="text-xs text-[#A1887F] mt-1">Say hello to {doctor.name}!</p>
                  </div>
                )}

                {conversation?.messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-end gap-2 ${msg.from === "patient" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${
                      msg.from === "patient"
                        ? "bg-[#8D6E63] text-white"
                        : "bg-[#F0E8DF] border border-[#E8D5C4] text-[#8D6E63]"
                    }`}>
                      {msg.from === "patient" ? <User size={11} /> : <Stethoscope size={11} />}
                    </div>
                    <div className={`max-w-[72%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.from === "patient"
                        ? "bg-[#8D6E63] text-white rounded-br-md"
                        : "bg-white border border-[#E8D5C4] text-[#3E2723] rounded-bl-md"
                    }`}>
                      <p>{msg.text}</p>
                      <p className={`text-[10px] mt-1.5 ${msg.from === "patient" ? "text-white/60 text-right" : "text-[#A1887F]"}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="px-4 py-4 border-t border-[#F0E8DF] flex-shrink-0 bg-white">
                <div className="flex items-center gap-2 bg-[#F5EDE4] border border-[#E8D5C4] rounded-full px-4 py-1 focus-within:border-[#8D6E63] focus-within:ring-2 focus-within:ring-[#D4A98A]/20 transition-all">
                  <input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder={`Message ${doctor.name}...`}
                    className="flex-1 bg-transparent py-3 text-sm text-[#3E2723] placeholder:text-[#A1887F] outline-none font-medium"
                    autoFocus
                  />
                  <motion.button
                    whileHover={inputText.trim() ? { scale: 1.1 } : {}}
                    whileTap={inputText.trim() ? { scale: 0.9 } : {}}
                    onClick={handleSend}
                    disabled={!inputText.trim()}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                      inputText.trim()
                        ? "bg-[#8D6E63] text-white shadow-md hover:bg-[#5C4033]"
                        : "bg-[#E8D5C4] text-[#A1887F]"
                    }`}
                  >
                    <Send size={14} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
