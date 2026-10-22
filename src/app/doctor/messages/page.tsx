"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { DoctorLayout } from "@/components/doctor/DoctorLayout";
import { Send, Search, RefreshCw, Radio, CheckCheck, Sparkles, User, Stethoscope } from "lucide-react";
import {
  getMessages,
  sendMessage,
  subscribeToMessages,
} from "@/utils/supabase/queries";
import type { DbMessage } from "@/utils/supabase/types";

interface PatientItem {
  id: string;
  name: string;
  lastMessage?: string;
  time?: string;
  unread?: boolean;
}

const DEFAULT_PATIENTS: PatientItem[] = [
  { id: "patient-1", name: "Sara Khan", lastMessage: "Thank you Doctor, should I keep it protected from the sun?", time: "Just now", unread: true },
  { id: "patient-2", name: "Ahmed Raza", lastMessage: "Hello Dr., my appointment is scheduled for next Tuesday.", time: "2 hrs ago", unread: false },
  { id: "patient-3", name: "Fatima Noor", lastMessage: "I have uploaded the new skin lesion image to scan-images.", time: "Yesterday", unread: false },
];

const PRESET_REPLIES = [
  "I have reviewed your scan. It shows low-risk benign features.",
  "Please avoid sun exposure and apply broad-spectrum SPF 50 daily.",
  "I recommend scheduling an in-person dermoscopy check at the clinic.",
  "The healing is progressing well. Let's do another scan in 4 weeks.",
];

export default function DoctorMessagesPage() {
  const doctorId = "d1";
  const [patients, setPatients] = useState<PatientItem[]>(DEFAULT_PATIENTS);
  const [selectedPatient, setSelectedPatient] = useState<PatientItem>(DEFAULT_PATIENTS[0]);
  const [messages, setMessages] = useState<DbMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 1. Fetch conversation messages
  const loadConversation = async (pId: string) => {
    setLoading(true);
    try {
      const msgs = await getMessages(doctorId, pId);
      setMessages(msgs);
    } catch (err) {
      console.error("Error loading doctor messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConversation(selectedPatient.id);
  }, [selectedPatient.id]);

  // 2. Realtime listener
  useEffect(() => {
    const unsubscribe = subscribeToMessages((incomingMsg) => {
      if (
        (incomingMsg.sender_id === selectedPatient.id && incomingMsg.receiver_id === doctorId) ||
        (incomingMsg.sender_id === doctorId && incomingMsg.receiver_id === selectedPatient.id)
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
  }, [selectedPatient.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  // 3. Send reply
  const handleSendReply = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isSending) return;

    setInputText("");
    setIsSending(true);

    try {
      const sent = await sendMessage(doctorId, selectedPatient.id, text);
      setMessages((prev) => {
        if (prev.some((m) => m.id === sent.id)) return prev;
        return [...prev, sent];
      });
    } catch (err) {
      console.error("Error sending doctor reply:", err);
    } finally {
      setIsSending(false);
    }
  };

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DoctorLayout>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="h-[calc(100vh-8.5rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-black text-[#3E2723] flex items-center gap-2">
              Patient Consultations & Messaging
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                <Radio size={10} className="animate-pulse text-emerald-600" /> Supabase Realtime
              </span>
            </h1>
            <p className="text-xs text-[#6D4C41] mt-0.5">
              Secure communication and clinical guidance for registered patients.
            </p>
          </div>
        </div>

        {/* Messaging Container */}
        <div className="flex flex-1 gap-4 overflow-hidden bg-white/70 backdrop-blur-xl rounded-3xl border border-white/90 shadow-[0_4px_30px_rgba(92,64,51,0.05)] p-4">
          {/* Patient Directory */}
          <div className="w-72 flex-shrink-0 flex flex-col border-r border-[#E8D5C4]/60 pr-3">
            <div className="relative mb-3">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A1887F]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search patients..."
                className="w-full bg-white/90 border border-[#E8D5C4] rounded-full pl-8 pr-3 py-2 text-xs text-[#3E2723] placeholder:text-[#A1887F] focus:outline-none focus:border-[#8D6E63]"
              />
            </div>

            <div className="flex-1 overflow-y-auto space-y-1.5">
              {filteredPatients.map((p) => {
                const isSelected = selectedPatient.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPatient(p)}
                    className={`w-full text-left p-3 rounded-2xl transition-all cursor-pointer flex items-center gap-3 ${
                      isSelected
                        ? "bg-[#8D6E63] text-white shadow-md"
                        : "bg-white/50 hover:bg-white/90 text-[#3E2723]"
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${
                          isSelected ? "bg-white text-[#5C4033]" : "bg-[#EADECF] text-[#5C4033]"
                        }`}
                      >
                        {p.name.charAt(0)}
                      </div>
                      {p.unread && !isSelected && (
                        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#E76F51] rounded-full border-2 border-white" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className={`text-xs font-black truncate ${isSelected ? "text-white" : "text-[#3E2723]"}`}>
                          {p.name}
                        </p>
                        <span className={`text-[9px] ${isSelected ? "text-white/80" : "text-[#A1887F]"}`}>
                          {p.time}
                        </span>
                      </div>
                      <p className={`text-[10px] truncate ${isSelected ? "text-white/80" : "text-[#8D6E63]"}`}>
                        {p.lastMessage}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chat Window */}
          <div className="flex-1 flex flex-col overflow-hidden pl-2">
            {/* Chat Header */}
            <div className="pb-3 border-b border-[#E8D5C4]/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EADECF] flex items-center justify-center text-[#5C4033] font-black text-xs">
                  {selectedPatient.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#3E2723]">{selectedPatient.name}</h3>
                  <p className="text-[10px] text-[#8D6E63] font-semibold">
                    Patient ID: {selectedPatient.id} · Connected via Supabase
                  </p>
                </div>
              </div>

              <div className="text-[11px] text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Patient Channel
              </div>
            </div>

            {/* Chat Thread */}
            <div className="flex-1 overflow-y-auto py-4 px-2 space-y-3">
              {loading ? (
                <div className="p-10 text-center space-y-2">
                  <RefreshCw className="animate-spin text-[#8D6E63] mx-auto" size={20} />
                  <p className="text-xs text-[#7D5A4F]">Loading messages...</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="p-10 text-center text-xs text-[#8D6E63]">
                  No messages yet with {selectedPatient.name}. Send clinical instructions below.
                </div>
              ) : (
                messages.map((m) => {
                  const isDoctor = m.sender_id === doctorId;
                  const timeStr = new Date(m.sent_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isDoctor ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`max-w-md px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                          isDoctor
                            ? "bg-[#5C4033] text-white rounded-br-xs"
                            : "bg-[#F5EDE4] text-[#3E2723] border border-[#E8D5C4] rounded-bl-xs"
                        }`}
                      >
                        <p>{m.message_text}</p>
                      </div>
                      <span className="text-[9px] text-[#A1887F] font-semibold mt-1 px-1 flex items-center gap-1">
                        {timeStr}
                        {isDoctor && <CheckCheck size={11} className="text-[#8D6E63]" />}
                      </span>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Clinical Presets */}
            <div className="pt-2 pb-1 border-t border-[#E8D5C4]/40 flex items-center gap-1.5 overflow-x-auto">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#A1887F] flex items-center gap-1 flex-shrink-0 mr-1">
                <Sparkles size={11} /> Quick Advice:
              </span>
              {PRESET_REPLIES.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendReply(preset)}
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-[#F5EDE4] text-[#5C4033] text-[10px] font-semibold border border-[#E8D5C4] transition-all flex-shrink-0 cursor-pointer shadow-xs"
                >
                  {preset.slice(0, 32)}...
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="pt-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendReply();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Send medical response to ${selectedPatient.name}...`}
                  className="flex-1 bg-white border border-[#E8D5C4] rounded-full px-4 py-2.5 text-xs text-[#3E2723] placeholder:text-[#A1887F] focus:outline-none focus:border-[#8D6E63]"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isSending}
                  className="w-10 h-10 rounded-full bg-[#8D6E63] hover:bg-[#5C4033] text-white flex items-center justify-center transition-all shadow-md disabled:opacity-50 cursor-pointer flex-shrink-0"
                >
                  {isSending ? <RefreshCw className="animate-spin" size={14} /> : <Send size={14} />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </DoctorLayout>
  );
}
