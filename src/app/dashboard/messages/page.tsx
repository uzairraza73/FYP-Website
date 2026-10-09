"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useMessageStore } from "@/store/useMessageStore";
import {
  ChevronLeft, Send, Search, User, MessageSquare,
  Stethoscope, ArrowRight, Sparkles
} from "lucide-react";

export default function PatientMessagesPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { conversations, sendMessage } = useMessageStore();
  const patientName = user?.name || "Sara Khan";

  const [selectedId, setSelectedId] = useState<string | null>(
    conversations.length > 0 ? conversations[0].doctorId : null
  );
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filtered = conversations.filter((c) =>
    c.doctorName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeConvo = conversations.find((c) => c.doctorId === selectedId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConvo?.messages.length]);

  const handleSend = () => {
    if (!inputText.trim() || !activeConvo) return;
    sendMessage(
      activeConvo.doctorId,
      activeConvo.doctorName,
      activeConvo.doctorSpecialty,
      patientName,
      inputText.trim(),
      "patient"
    );
    setInputText("");
  };

  return (
    <div className="min-h-screen bg-[#F0E8DF] font-plus-jakarta relative overflow-hidden">
      {/* Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#D4A98A]/25 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] bg-[#C69C7B]/15 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        {/* Top Header */}
        <header className="bg-white/70 backdrop-blur-xl border-b border-white/60 px-6 py-4 flex items-center gap-4 flex-shrink-0">
          <button
            onClick={() => router.push("/dashboard")}
            className="w-9 h-9 rounded-full bg-[#F5EDE4] border border-[#E8D5C4] flex items-center justify-center text-[#8D6E63] hover:bg-[#8D6E63] hover:text-white transition-all flex-shrink-0"
          >
            <ChevronLeft size={18} />
          </button>
          <div>
            <h1 className="text-lg font-black text-[#3E2723]">Doctor Messages</h1>
            <p className="text-xs text-[#A1887F] font-medium">{conversations.length} conversation{conversations.length !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={() => router.push("/consult")}
            className="ml-auto flex items-center gap-2 bg-[#8D6E63] hover:bg-[#5C4033] text-white text-xs font-black rounded-full px-4 py-2.5 transition-all shadow-md"
          >
            <Stethoscope size={14} /> Find a Doctor
          </button>
        </header>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar: Conversation List */}
          <div className="w-72 flex-shrink-0 flex flex-col bg-white/50 backdrop-blur-md border-r border-white/60 overflow-hidden">
            {/* Search */}
            <div className="p-4 border-b border-[#E8D5C4]/60">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A1887F]" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search doctors..."
                  className="w-full bg-white/80 border border-[#E8D5C4] rounded-full pl-9 pr-4 py-2 text-xs text-[#3E2723] placeholder:text-[#A1887F] focus:outline-none focus:border-[#8D6E63] transition-all"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {filtered.length === 0 ? (
                <div className="py-12 flex flex-col items-center text-center px-4">
                  <MessageSquare size={32} className="text-[#D4A98A] mb-3" />
                  <p className="text-xs font-black text-[#A1887F] uppercase tracking-widest">No conversations yet</p>
                  <button
                    onClick={() => router.push("/consult")}
                    className="mt-3 text-[10px] font-black text-[#8D6E63] hover:text-[#5C4033] uppercase tracking-wider flex items-center gap-1 transition-colors"
                  >
                    Find a Doctor <ArrowRight size={11} />
                  </button>
                </div>
              ) : (
                filtered.map((convo) => {
                  const last = convo.messages[convo.messages.length - 1];
                  const isActive = selectedId === convo.doctorId;
                  const hasUnread = last?.from === "doctor";
                  return (
                    <motion.button
                      key={convo.doctorId}
                      onClick={() => setSelectedId(convo.doctorId)}
                      whileHover={{ scale: 1.01 }}
                      className={`w-full text-left p-3.5 rounded-2xl transition-all ${
                        isActive
                          ? "bg-white border border-[#D4A98A]/60 shadow-sm"
                          : "hover:bg-white/60 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative flex-shrink-0">
                          <div className="w-11 h-11 rounded-2xl bg-[#F0E8DF] border border-[#E8D5C4] flex items-center justify-center text-[#8D6E63] font-black text-base">
                            {convo.doctorName.replace("Dr. ", "").charAt(0)}
                          </div>
                          {hasUnread && (
                            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[#E76F51] rounded-full border-2 border-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <p className={`text-xs truncate ${hasUnread ? "font-black text-[#3E2723]" : "font-semibold text-[#5C4033]"}`}>
                              {convo.doctorName}
                            </p>
                            <span className="text-[9px] text-[#A1887F] flex-shrink-0 ml-1">
                              {last?.timestamp}
                            </span>
                          </div>
                          <p className="text-[10px] text-[#8D6E63] truncate">{last?.text}</p>
                          <p className="text-[9px] text-[#A1887F] font-medium mt-0.5">{convo.doctorSpecialty}</p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <AnimatePresence mode="wait">
              {!activeConvo ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center p-8"
                >
                  <div className="w-20 h-20 rounded-3xl bg-white/75 backdrop-blur-xl border border-white/90 flex items-center justify-center text-[#D4A98A] mb-5 shadow-sm">
                    <MessageSquare size={36} />
                  </div>
                  <h3 className="text-xl font-black text-[#3E2723] mb-2">No Conversation Selected</h3>
                  <p className="text-sm text-[#7D5A4F] font-medium mb-6 max-w-sm">
                    Select a doctor from the left panel, or visit a doctor's profile to start a new conversation.
                  </p>
                  <button
                    onClick={() => router.push("/consult")}
                    className="flex items-center gap-2 bg-[#8D6E63] hover:bg-[#5C4033] text-white text-sm font-black rounded-full px-6 py-3 transition-all shadow-md"
                  >
                    <Stethoscope size={16} /> Browse Doctors
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={activeConvo.doctorId}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col overflow-hidden"
                >
                  {/* Chat Header */}
                  <div className="bg-white/70 backdrop-blur-xl border-b border-white/60 px-6 py-4 flex items-center gap-4 flex-shrink-0">
                    <div className="w-10 h-10 rounded-2xl bg-[#F0E8DF] border border-[#E8D5C4] flex items-center justify-center text-[#8D6E63] font-black">
                      {activeConvo.doctorName.replace("Dr. ", "").charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-black text-[#3E2723]">{activeConvo.doctorName}</p>
                      <p className="text-xs text-[#8D6E63] font-medium">{activeConvo.doctorSpecialty}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-wider">Online</span>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                    {/* Disclaimer */}
                    <div className="flex items-start gap-2 p-3 bg-white/60 backdrop-blur-sm border border-[#E8D5C4] rounded-2xl text-xs text-[#8D6E63] font-medium mb-2">
                      <Sparkles size={14} className="text-[#D4A98A] flex-shrink-0 mt-0.5" />
                      Messages are end-to-end encrypted. Your doctor will respond during clinic hours.
                    </div>

                    {activeConvo.messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-end gap-2 ${msg.from === "patient" ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black ${
                          msg.from === "patient"
                            ? "bg-[#8D6E63] text-white"
                            : "bg-[#F0E8DF] border border-[#E8D5C4] text-[#8D6E63]"
                        }`}>
                          {msg.from === "patient" ? <User size={12} /> : <Stethoscope size={12} />}
                        </div>
                        <div className={`max-w-[68%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
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
                  <div className="bg-white/60 backdrop-blur-md border-t border-white/60 px-5 py-4 flex-shrink-0">
                    <div className="flex items-center gap-3 bg-white border border-[#E8D5C4] rounded-full px-4 py-1 focus-within:border-[#8D6E63] focus-within:ring-2 focus-within:ring-[#D4A98A]/20 transition-all shadow-sm">
                      <input
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder={`Message ${activeConvo.doctorName}...`}
                        className="flex-1 bg-transparent py-3 text-sm text-[#3E2723] placeholder:text-[#A1887F] outline-none font-medium"
                      />
                      <motion.button
                        whileHover={inputText.trim() ? { scale: 1.1 } : {}}
                        whileTap={inputText.trim() ? { scale: 0.9 } : {}}
                        onClick={handleSend}
                        disabled={!inputText.trim()}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                          inputText.trim()
                            ? "bg-[#8D6E63] text-white shadow-md hover:bg-[#5C4033]"
                            : "bg-[#F5EDE4] text-[#A1887F]"
                        }`}
                      >
                        <Send size={15} />
                      </motion.button>
                    </div>
                    <p className="text-center text-[10px] text-[#A1887F] mt-2 font-medium">
                      Responses are not instant. Doctors reply during clinic hours.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
