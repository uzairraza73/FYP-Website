"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Info, 
  ChevronRight,
  RefreshCcw,
  ShieldCheck,
  Stethoscope
} from "lucide-react";
import { cn } from "@/utils/cn";
import { BackButton } from "@/components/BackButton";

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: "Hello! I am your AI Skin Care Assistant. I can help you understand skin conditions, explain clinical terms, or guide you through the scanning process. How can I assist you today?",
    sender: 'bot',
    timestamp: new Date()
  }
];

const SUGGESTIONS = [
  "What is Melanoma?",
  "How to prepare for a scan?",
  "Symptoms of Basal Cell Carcinoma",
  "Is my skin type high risk?"
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "I've received your query. Based on clinical data, " + 
              (userMsg.text.toLowerCase().includes("melanoma") ? 
              "Melanoma is a type of skin cancer that develops from the pigment-producing cells known as melanocytes. It's crucial to monitor any changes in moles following the ABCDE rule." : 
              "I'm analyzing your request. For personalized clinical advice, please ensure you've completed a high-resolution scan in the AI Scan section."),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 md:px-6 bg-[#F0E8DF] font-plus-jakarta overflow-hidden flex flex-col relative">
      {/* Global Background Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#D4A98A]/25 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] bg-[#C69C7B]/15 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-[#E8D5C4]/35 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-4xl mx-auto w-full flex-grow flex flex-col relative z-10">
        {/* Back Button */}
        <div className="mb-8 px-4">
          <BackButton variant="brown" />
        </div>

        {/* Header Area */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="flex items-center justify-between mb-6 px-4"
        >
          <div className="flex items-center gap-4">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
              className="relative"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#E8D5C4] border border-white flex items-center justify-center shadow-sm">
                <Bot size={28} className="text-[#5C4033]" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#F0E8DF] shadow-sm" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-[#3E2723]">
                CareBot <span className="text-[#8D6E63]">AI</span>
              </h1>
              <motion.p 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-[10px] text-[#A1887F] font-black uppercase tracking-widest flex items-center gap-2 mt-0.5"
              >
                <Sparkles size={10} className="text-[#8D6E63]" /> Clinical Intelligence v4.0
              </motion.p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
             <motion.div 
               whileHover={{ scale: 1.05 }}
               className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-white/80 shadow-sm text-[9px] font-bold text-[#5C4033] uppercase tracking-widest cursor-default"
             >
                <ShieldCheck size={12} className="text-[#8D6E63]" /> Secure Encryption
             </motion.div>
             <motion.button 
               whileHover={{ scale: 1.1, rotate: 180 }}
               whileTap={{ scale: 0.9 }}
               onClick={() => setMessages(INITIAL_MESSAGES)}
               className="p-2.5 rounded-xl bg-white/70 backdrop-blur-sm border border-white/80 text-[#8D6E63] hover:text-[#5C4033] hover:bg-white transition-colors shadow-sm"
             >
                <RefreshCcw size={16} />
             </motion.button>
          </div>
        </motion.div>

        {/* Chat Window */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 25 }}
          className="flex-grow mb-6 flex flex-col p-0 overflow-hidden bg-white/75 backdrop-blur-xl shadow-[0_30px_80px_rgba(92,64,51,0.08)] border border-white/90 rounded-[2rem]"
        >
          {/* Message List */}
          <div className="flex-grow overflow-y-auto px-6 py-8 space-y-8 no-scrollbar scroll-smooth">
            <AnimatePresence initial={false}>
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 350, damping: 25 }}
                  className={cn(
                    "flex items-end gap-3",
                    msg.sender === 'user' ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring" }}
                    className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm border border-white/50",
                      msg.sender === 'user' ? "bg-[#5C4033] text-white" : "bg-[#E8D5C4] text-[#5C4033]"
                    )}
                  >
                    {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </motion.div>

                  <div className={cn(
                    "max-w-[80%] px-5 py-4 rounded-2xl text-[13px] font-medium leading-relaxed tracking-wide shadow-sm relative overflow-hidden",
                    msg.sender === 'user' 
                      ? "bg-[#8D6E63] text-white rounded-br-none border border-[#5C4033]/20" 
                      : "bg-[#F5EDE4] text-[#3E2723] border border-white rounded-bl-none"
                  )}>
                    <span className="relative z-10">{msg.text}</span>
                    
                    <div className={cn(
                      "text-[9px] font-bold uppercase mt-2 relative z-10",
                      msg.sender === 'user' ? "text-right text-[#EADBCE]/70" : "text-left text-[#A1887F]"
                    )}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className="flex items-end gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#E8D5C4] flex items-center justify-center shadow-sm border border-white/50">
                    <Bot size={14} className="text-[#5C4033]" />
                  </div>
                  <div className="px-6 py-5 rounded-2xl rounded-bl-none flex gap-2 items-center bg-[#F5EDE4] border border-white shadow-sm">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-[#8D6E63] rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-[#8D6E63] rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-[#8D6E63] rounded-full" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions Bar */}
          <div className="px-6 py-4 border-t border-white/50 flex items-center gap-3 overflow-x-auto no-scrollbar bg-gradient-to-b from-transparent to-[#F0E8DF]/30">
            <span className="text-[10px] font-black text-[#8D6E63] uppercase tracking-widest shrink-0 mr-2 flex items-center gap-1.5">
              <Sparkles size={12} className="text-[#E76F51]" /> Suggestions:
            </span>
            {SUGGESTIONS.map((s, i) => (
              <motion.button 
                key={s} 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 300, damping: 25 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setInputValue(s)}
                className="px-4 py-2 rounded-full bg-white/70 backdrop-blur-sm border border-white text-[10px] font-bold whitespace-nowrap uppercase tracking-widest text-[#7D5A4F] hover:text-[#3E2723] hover:border-[#D4A98A] hover:bg-white hover:shadow-sm transition-all"
              >
                {s}
              </motion.button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-6 pt-4 bg-white/40 backdrop-blur-md rounded-b-[2rem]">
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="relative flex items-center rounded-[1.25rem] bg-white border border-[#E8D5C4] focus-within:border-[#D4A98A] focus-within:ring-4 focus-within:ring-[#D4A98A]/20 transition-all duration-300 group shadow-sm hover:shadow-md"
            >
              <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask your clinical question..."
                className="w-full bg-transparent px-6 py-4 text-sm font-medium outline-none text-[#3E2723] placeholder:text-[#A1887F]"
              />
              <motion.button 
                whileHover={inputValue.trim() ? { scale: 1.1, rotate: 10 } : {}}
                whileTap={inputValue.trim() ? { scale: 0.9 } : {}}
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className={cn(
                  "mr-2 p-3 rounded-xl transition-all duration-300 flex items-center justify-center shrink-0",
                  inputValue.trim() 
                    ? "bg-[#8D6E63] text-white shadow-[0_5px_15px_rgba(141,110,99,0.4)]" 
                    : "bg-[#F5EDE4] text-[#A1887F]"
                )}
              >
                <Send size={18} className={inputValue.trim() ? "ml-0.5" : ""} />
              </motion.button>
            </motion.div>
            <div className="mt-4 flex items-center justify-center gap-4">
              <p className="text-[9px] font-bold text-[#A1887F] uppercase tracking-widest flex items-center gap-1.5">
                <Info size={12} /> AI responses are for informational purposes only. Consult a doctor for diagnosis.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Floating AI Helper Info - Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {/* Clinical Guidance Card */}
           <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 25 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative rounded-[1.5rem] overflow-hidden cursor-pointer group h-[96px]"
           >
              <div className="absolute inset-0 bg-white/75 backdrop-blur-xl border border-white/90 shadow-[0_6px_30px_rgba(92,64,51,0.05)]" />
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-[#EADBCE]/50 rounded-full blur-2xl pointer-events-none group-hover:scale-110 transition-transform" />
              
              <div className="relative z-10 h-full flex items-center gap-4 p-4">
                <div className="relative shrink-0">
                  <div className="relative w-12 h-12 rounded-xl bg-[#F0E8DF] border border-[#E8D5C4] flex items-center justify-center text-[#8D6E63] group-hover:bg-[#8D6E63] group-hover:text-white transition-all duration-300">
                    <Stethoscope size={20} className="group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-[#3E2723]">Clinical Guidance</h4>
                  <p className="text-[10px] text-[#7D5A4F] font-medium mt-0.5">CareBot explains your scan results.</p>
                </div>
                <ChevronRight size={16} className="text-[#A1887F] group-hover:text-[#8D6E63] group-hover:translate-x-1 transition-all shrink-0" />
              </div>
           </motion.div>

           {/* Privacy Card */}
           <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 300, damping: 25 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="relative rounded-[1.5rem] overflow-hidden cursor-pointer group h-[96px]"
           >
              <div className="absolute inset-0 bg-white/75 backdrop-blur-xl border border-white/90 shadow-[0_6px_30px_rgba(92,64,51,0.05)]" />
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-[#EADBCE]/50 rounded-full blur-2xl pointer-events-none group-hover:scale-110 transition-transform" />
              
              <div className="relative z-10 h-full flex items-center gap-4 p-4">
                <div className="relative shrink-0">
                  <div className="relative w-12 h-12 rounded-xl bg-[#F0E8DF] border border-[#E8D5C4] flex items-center justify-center text-[#8D6E63] group-hover:bg-[#8D6E63] group-hover:text-white transition-all duration-300">
                    <ShieldCheck size={20} className="group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-[#3E2723]">Privacy Protected</h4>
                  <p className="text-[10px] text-[#7D5A4F] font-medium mt-0.5">Chat data is encrypted and secure.</p>
                </div>
                <ChevronRight size={16} className="text-[#A1887F] group-hover:text-[#8D6E63] group-hover:translate-x-1 transition-all shrink-0" />
              </div>
           </motion.div>
        </div>
      </div>
    </div>
  );
}
