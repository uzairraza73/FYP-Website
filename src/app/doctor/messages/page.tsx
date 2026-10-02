"use client";

import { motion } from "framer-motion";
import { DoctorLayout } from "@/components/doctor/DoctorLayout";
import { mockPatients } from "@/data/doctorData";
import { Send, Search } from "lucide-react";
import { useState } from "react";

// Generate mock messages from patients
const mockMessages = mockPatients.map((p, i) => ({
  id: p.id,
  patientName: p.name,
  patientInitial: p.name.charAt(0),
  lastMessage: i === 0
    ? "Doctor, I noticed the mole has changed color slightly. Should I be worried?"
    : i === 1
    ? "Thank you for the prescription. Should I continue applying the cream?"
    : i === 2
    ? "My next appointment is next week, can we reschedule to Friday?"
    : "I have attached my latest scan report. Please review.",
  time: i === 0 ? "2 min ago" : i === 1 ? "1 hr ago" : i === 2 ? "Yesterday" : "3 days ago",
  unread: i < 2,
}));

const mockConversation: Record<string, { from: "patient" | "doctor"; text: string; time: string }[]> = {
  p1: [
    { from: "patient", text: "Hello Doctor, I wanted to ask about my recent scan results.", time: "10:00 AM" },
    { from: "doctor", text: "Hello! Sure, your scan showed a low-risk melanocytic nevus. We should monitor it.", time: "10:15 AM" },
    { from: "patient", text: "Doctor, I noticed the mole has changed color slightly. Should I be worried?", time: "10:30 AM" },
  ],
  p2: [
    { from: "patient", text: "Hi, I received the prescription. Thank you!", time: "9:00 AM" },
    { from: "doctor", text: "You're welcome. Apply twice daily and monitor for redness.", time: "9:20 AM" },
    { from: "patient", text: "Thank you for the prescription. Should I continue applying the cream?", time: "2:00 PM" },
  ],
  p3: [
    { from: "patient", text: "Doctor, my appointment is on Monday. Can we reschedule?", time: "8:00 AM" },
    { from: "patient", text: "My next appointment is next week, can we reschedule to Friday?", time: "Yesterday" },
  ],
  p4: [
    { from: "patient", text: "Hello, I have attached my latest scan report. Please review.", time: "3 days ago" },
  ],
};

export default function MessagesPage() {
  const [selected, setSelected] = useState(mockMessages[0]);
  const [reply, setReply] = useState("");
  const [search, setSearch] = useState("");

  const conversation = mockConversation[selected.id] ?? [];

  const filtered = mockMessages.filter(m =>
    m.patientName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DoctorLayout>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="h-[calc(100vh-10rem)] flex flex-col">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-[#3E2723]">Messages</h1>
          <p className="text-sm text-[#6D4C41] mt-1">Patient messages and communications.</p>
        </div>

        <div className="flex flex-1 gap-4 overflow-hidden">
          {/* Conversation List */}
          <div className="w-72 flex-shrink-0 flex flex-col gap-2">
            <div className="relative mb-2">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A1887F]" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full bg-white/60 border border-[#E8D5C4] rounded-full pl-8 pr-3 py-2 text-xs text-[#3E2723] placeholder:text-[#A1887F] focus:outline-none focus:border-[#8D6E63]"
              />
            </div>
            <div className="flex-1 overflow-y-auto space-y-1">
              {filtered.map(m => (
                <button
                  key={m.id}
                  onClick={() => setSelected(m)}
                  className={`w-full text-left p-3 rounded-2xl transition-all ${
                    selected.id === m.id
                      ? "bg-white border border-[#8D6E63]/30 shadow-sm"
                      : "bg-white/40 border border-transparent hover:bg-white/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-[#EADECF] flex items-center justify-center text-[#5C4033] font-black text-sm">
                        {m.patientInitial}
                      </div>
                      {m.unread && <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#E76F51] rounded-full border-2 border-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-xs ${m.unread ? "font-black text-[#3E2723]" : "font-semibold text-[#5C4033]"}`}>{m.patientName}</p>
                        <span className="text-[9px] text-[#A1887F]">{m.time}</span>
                      </div>
                      <p className="text-[10px] text-[#8D6E63] truncate">{m.lastMessage}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 bg-white/60 backdrop-blur-sm border border-white/70 rounded-3xl shadow-[0_8px_40px_rgba(92,64,51,0.08)] flex flex-col overflow-hidden">
            {/* Chat Header */}
            <div className="px-6 py-4 border-b border-[#E8D5C4]/60 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#EADECF] flex items-center justify-center text-[#5C4033] font-black text-sm">
                {selected.patientInitial}
              </div>
              <div>
                <p className="text-sm font-black text-[#3E2723]">{selected.patientName}</p>
                <p className="text-[10px] text-[#8D6E63]">Patient</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {conversation.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "doctor" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[65%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.from === "doctor"
                      ? "bg-[#5C4033] text-white rounded-br-md"
                      : "bg-[#F0E8DF] text-[#3E2723] rounded-bl-md"
                  }`}>
                    <p>{msg.text}</p>
                    <p className={`text-[9px] mt-1 ${msg.from === "doctor" ? "text-white/60 text-right" : "text-[#A1887F]"}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Reply Box */}
            <div className="px-6 py-4 border-t border-[#E8D5C4]/60">
              <div className="flex gap-3">
                <input
                  value={reply}
                  onChange={e => setReply(e.target.value)}
                  placeholder="Type your reply..."
                  className="flex-1 bg-[#F0E8DF]/60 border border-[#E8D5C4] rounded-full px-4 py-2.5 text-xs text-[#3E2723] placeholder:text-[#A1887F] focus:outline-none focus:border-[#8D6E63]"
                  onKeyDown={e => { if (e.key === "Enter" && reply.trim()) setReply(""); }}
                />
                <button
                  onClick={() => setReply("")}
                  className="w-10 h-10 rounded-full bg-[#5C4033] hover:bg-[#4A3225] flex items-center justify-center text-white shadow-md transition-all"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </DoctorLayout>
  );
}
