"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import {
  ChevronLeft,
  Send,
  Search,
  User,
  MessageSquare,
  Stethoscope,
  Sparkles,
  RefreshCw,
  Clock,
  Radio,
  CheckCheck,
} from "lucide-react";
import {
  getMessages,
  sendMessage,
  subscribeToMessages,
  getDoctors,
} from "@/utils/supabase/queries";
import type { DbMessage, Doctor } from "@/utils/supabase/types";

export default function PatientMessagesPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const patientId = user?.email ? user.email.replace(/[^a-zA-Z0-9]/g, "-") : "patient-1";
  const patientName = user?.name || "Sara Khan";

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [messages, setMessages] = useState<DbMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isRealtimeConnected, setIsRealtimeConnected] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 1. Load Doctors & Messages
  useEffect(() => {
    let mounted = true;
    async function init() {
      setLoading(true);
      const docs = await getDoctors();
      if (mounted) {
        setDoctors(docs);
        const activeDoc = docs[0] || null;
        setSelectedDoctor(activeDoc);

        if (activeDoc) {
          const msgs = await getMessages(patientId, activeDoc.id);
          if (mounted) setMessages(msgs);
        }
        setLoading(false);
      }
    }
    init();

    return () => {
      mounted = false;
    };
  }, [patientId]);

  // 2. Realtime Subscription to Supabase 'messages' table
  useEffect(() => {
    const unsubscribe = subscribeToMessages((incomingMsg) => {
      // Check if message belongs to current chat
      if (
        (incomingMsg.sender_id === selectedDoctor?.id && incomingMsg.receiver_id === patientId) ||
        (incomingMsg.sender_id === patientId && incomingMsg.receiver_id === selectedDoctor?.id)
      ) {
        setMessages((prev) => {
          if (prev.some((m) => m.id === incomingMsg.id)) return prev;
          return [...prev, incomingMsg];
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, [selectedDoctor?.id, patientId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  // Handle switching doctors
  const handleSelectDoctor = async (doc: Doctor) => {
    setSelectedDoctor(doc);
    setLoading(true);
    const msgs = await getMessages(patientId, doc.id);
    setMessages(msgs);
    setLoading(false);
  };

  // Send message to Supabase
  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !selectedDoctor || isSending) return;

    const text = inputText.trim();
    setInputText("");
    setIsSending(true);

    try {
      const sent = await sendMessage(patientId, selectedDoctor.id, text);
      setMessages((prev) => {
        if (prev.some((m) => m.id === sent.id)) return prev;
        return [...prev, sent];
      });
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setIsSending(false);
    }
  };

  const filteredDoctors = doctors.filter(
    (d) =>
      d.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.specialization?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F0E8DF] font-plus-jakarta relative overflow-hidden flex flex-col h-screen">
      {/* Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#D4A98A]/25 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] bg-[#C69C7B]/15 rounded-full blur-[100px]" />
      </div>

      {/* Top Header */}
      <header className="relative z-10 bg-white/70 backdrop-blur-xl border-b border-white/60 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="w-9 h-9 rounded-full bg-[#F5EDE4] border border-[#E8D5C4] flex items-center justify-center text-[#8D6E63] hover:bg-[#8D6E63] hover:text-white transition-all flex-shrink-0 cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>
          <div>
            <h1 className="text-lg font-black text-[#3E2723] flex items-center gap-2">
              Doctor Messages
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                <Radio size={10} className="animate-pulse text-emerald-600" /> Realtime Active
              </span>
            </h1>
            <p className="text-xs text-[#A1887F] font-medium">
              Live consultation channel with licensed Oncura dermatologists
            </p>
          </div>
        </div>

        <button
          onClick={() => router.push("/dashboard/appointments")}
          className="flex items-center gap-2 bg-[#8D6E63] hover:bg-[#5C4033] text-white text-xs font-black rounded-full px-4 py-2.5 transition-all shadow-md cursor-pointer"
        >
          <Stethoscope size={14} /> Book In-Person Visit
        </button>
      </header>

      {/* Main Messaging Layout */}
      <div className="relative z-10 flex flex-1 overflow-hidden">
        {/* Doctors Sidebar */}
        <aside className="w-80 flex-shrink-0 flex flex-col bg-white/50 backdrop-blur-md border-r border-white/60 overflow-hidden">
          {/* Search */}
          <div className="p-4 border-b border-[#E8D5C4]/60">
            <div className="relative">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A1887F]" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search specialists..."
                className="w-full bg-white/80 border border-[#E8D5C4] rounded-full pl-9 pr-4 py-2 text-xs text-[#3E2723] placeholder:text-[#A1887F] focus:outline-none focus:border-[#8D6E63]"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
            {filteredDoctors.map((doc) => {
              const isSelected = selectedDoctor?.id === doc.id;
              return (
                <button
                  key={doc.id}
                  onClick={() => handleSelectDoctor(doc)}
                  className={`w-full text-left p-3.5 rounded-2xl transition-all cursor-pointer flex items-center gap-3.5 ${
                    isSelected
                      ? "bg-white border border-[#8D6E63]/30 shadow-md"
                      : "bg-white/40 hover:bg-white/70 border border-transparent"
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-11 h-11 rounded-full bg-[#EADECF] flex items-center justify-center text-[#5C4033] font-bold text-sm">
                      {doc.full_name?.charAt(0) || "D"}
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className="text-xs font-black text-[#3E2723] truncate">{doc.full_name}</h4>
                      <span className="text-[10px] text-[#A1887F]">Live</span>
                    </div>
                    <p className="text-[11px] text-[#8D6E63] truncate">{doc.specialization}</p>
                    <p className="text-[10px] text-[#A1887F]">{doc.location || "Online"}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Chat Thread */}
        <main className="flex-1 flex flex-col bg-white/30 backdrop-blur-sm overflow-hidden">
          {selectedDoctor ? (
            <>
              {/* Doctor Header Bar */}
              <div className="px-6 py-3.5 bg-white/60 border-b border-white/80 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#EADECF] flex items-center justify-center text-[#5C4033] font-black text-xs">
                    {selectedDoctor.full_name?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#3E2723]">{selectedDoctor.full_name}</h3>
                    <p className="text-[11px] text-[#8D6E63]">{selectedDoctor.specialization}</p>
                  </div>
                </div>

                <div className="text-xs text-[#7D5A4F] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="font-semibold text-emerald-800">Connected to Supabase Realtime</span>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {loading ? (
                  <div className="p-12 text-center space-y-2">
                    <RefreshCw className="animate-spin text-[#8D6E63] mx-auto" size={24} />
                    <p className="text-xs text-[#7D5A4F]">Syncing messages...</p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="p-12 text-center max-w-sm mx-auto space-y-2">
                    <MessageSquare className="w-10 h-10 text-[#D4A98A] mx-auto" />
                    <h4 className="text-sm font-bold text-[#3E2723]">Start Conversation</h4>
                    <p className="text-xs text-[#7D5A4F]">
                      Send your first message or inquiry regarding recent skin scans to {selectedDoctor.full_name}.
                    </p>
                  </div>
                ) : (
                  messages.map((m) => {
                    const isMe = m.sender_id === patientId;
                    const timeFormatted = new Date(m.sent_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    return (
                      <div
                        key={m.id}
                        className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={`max-w-md px-5 py-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                            isMe
                              ? "bg-[#8D6E63] text-white rounded-br-xs"
                              : "bg-white text-[#3E2723] border border-[#E8D5C4]/70 rounded-bl-xs"
                          }`}
                        >
                          <p>{m.message_text}</p>
                        </div>
                        <span className="text-[10px] text-[#A1887F] font-semibold mt-1 px-1 flex items-center gap-1">
                          {timeFormatted}
                          {isMe && <CheckCheck size={12} className="text-[#8D6E63]" />}
                        </span>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4 bg-white/70 border-t border-white/80">
                <form onSubmit={handleSend} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={`Message ${selectedDoctor.full_name}...`}
                    className="flex-1 bg-white border border-[#E8D5C4] rounded-full px-5 py-3 text-xs text-[#3E2723] placeholder:text-[#A1887F] focus:outline-none focus:border-[#8D6E63] shadow-inner"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim() || isSending}
                    className="w-11 h-11 rounded-full bg-[#8D6E63] hover:bg-[#5C4033] text-white flex items-center justify-center transition-all shadow-md disabled:opacity-50 cursor-pointer flex-shrink-0"
                  >
                    {isSending ? (
                      <RefreshCw className="animate-spin" size={16} />
                    ) : (
                      <Send size={16} />
                    )}
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-xs text-[#8D6E63]">
              Select a doctor from the list to start messaging.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
