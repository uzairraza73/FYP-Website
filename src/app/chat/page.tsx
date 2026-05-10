"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
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
import { GlassCard } from "@/components/GlassCard";
import { useSettingsStore } from "@/store/useSettingsStore";
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
  const { theme } = useSettingsStore();

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
              (inputValue.toLowerCase().includes("melanoma") ? 
              "Melanoma is a type of skin cancer that develops from the pigment-producing cells known as melanocytes. It's crucial to monitor any changes in moles following the ABCDE rule." : 
              "I'm analyzing your request. For personalized clinical advice, please ensure you've completed a high-resolution scan in the Clinical AI section."),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className={cn(
      "min-h-screen pt-24 pb-12 px-4 md:px-6 transition-colors duration-500 overflow-hidden flex flex-col",
      theme === 'dark' ? "bg-[#020617]" : "bg-slate-50"
    )}>
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className={cn(
          "absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px]",
          theme === 'dark' ? "bg-blue-600/10" : "bg-blue-500/10"
        )} />
        <div className={cn(
          "absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px]",
          theme === 'dark' ? "bg-indigo-600/10" : "bg-indigo-500/10"
        )} />
      </div>

      <div className="max-w-5xl mx-auto w-full flex-grow flex flex-col relative z-10">
        {/* Back Button and Header */}
        <div className="mb-8 px-4">
          <BackButton />
        </div>

        {/* Header Area */}
        <div className="flex items-center justify-between mb-6 px-4">
          <div className="flex items-center gap-4">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Bot size={24} className="text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-950" />
            </motion.div>
            <div>
              <h1 className={cn("text-xl font-black tracking-tight font-plus-jakarta", theme === 'dark' ? "text-white" : "text-slate-900")}>
                CareBot <span className="text-blue-500">AI</span>
              </h1>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-2">
                <Sparkles size={10} className="text-blue-500" /> Clinical Intelligence v4.0
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
             <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                <ShieldCheck size={12} className="text-emerald-500" /> Secure Encryption
             </div>
             <button className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-500 hover:text-white transition-colors">
                <RefreshCcw size={16} />
             </button>
          </div>
        </div>

        {/* Chat Window */}
        <GlassCard className={cn(
          "flex-grow mb-6 flex flex-col p-0 overflow-hidden border-white/5 rounded-[2rem]",
          theme === 'dark' ? "bg-slate-900/20" : "bg-white/80 backdrop-blur-xl"
        )}>
          {/* Message List */}
          <div className="flex-grow overflow-y-auto px-6 py-8 space-y-8 no-scrollbar">
            {messages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, x: msg.sender === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                className={cn(
                  "flex items-end gap-3",
                  msg.sender === 'user' ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm",
                  msg.sender === 'user' ? "bg-slate-800 text-white" : "bg-blue-600 text-white"
                )}>
                  {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>

                <div className={cn(
                  "max-w-[80%] px-5 py-3.5 rounded-2xl text-[11px] font-medium leading-relaxed tracking-wide",
                  msg.sender === 'user' 
                    ? (theme === 'dark' ? "bg-slate-800 text-white rounded-tr-none" : "bg-slate-100 text-slate-900 rounded-tr-none")
                    : (theme === 'dark' ? "bg-blue-600/10 border border-blue-500/20 text-white rounded-tl-none" : "bg-blue-50 text-slate-900 border border-blue-100 rounded-tl-none shadow-sm")
                )}>
                  {msg.text}
                  <div className={cn(
                    "text-[8px] font-bold uppercase mt-2 opacity-40",
                    msg.sender === 'user' ? "text-right" : "text-left"
                  )}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-sm">
                  <Bot size={14} className="text-white" />
                </div>
                <div className={cn(
                  "px-5 py-3.5 rounded-2xl flex gap-1 items-center",
                  theme === 'dark' ? "bg-blue-600/5 border border-blue-500/10" : "bg-blue-50 border border-blue-100"
                )}>
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions Bar */}
          <div className="px-6 py-4 border-t border-white/5 flex items-center gap-3 overflow-x-auto no-scrollbar">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest shrink-0 mr-2">Suggestions:</span>
            {SUGGESTIONS.map((s) => (
              <button 
                key={s} 
                onClick={() => setInputValue(s)}
                className={cn(
                  "px-4 py-2 rounded-full border text-[9px] font-bold whitespace-nowrap transition-all uppercase tracking-widest",
                  theme === 'dark' ? "bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10" : "bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-200"
                )}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-6 pt-2">
            <div className={cn(
              "relative flex items-center rounded-2xl border transition-all group",
              theme === 'dark' ? "bg-slate-950/50 border-white/5 focus-within:border-blue-500/50" : "bg-slate-50 border-slate-200 focus-within:border-blue-500/50 shadow-inner"
            )}>
              <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask your clinical question..."
                className="w-full bg-transparent px-5 py-4 text-xs font-medium outline-none text-white placeholder:text-slate-600"
              />
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className={cn(
                  "mr-3 p-2 rounded-xl transition-all",
                  inputValue.trim() ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-slate-800 text-slate-600"
                )}
              >
                <Send size={18} />
              </button>
            </div>
            <div className="mt-3 flex items-center justify-center gap-4">
              <p className="text-[8px] font-bold text-slate-600 uppercase tracking-widest flex items-center gap-1.5">
                <Info size={10} /> AI responses are for informational purposes only. Consult a doctor for diagnosis.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Floating AI Helper Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <GlassCard className="p-4 flex items-center gap-4 bg-blue-600/5 border-blue-500/10">
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 shrink-0">
                <Stethoscope size={20} />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-tight text-white">Clinical Guidance</h4>
                <p className="text-[9px] text-slate-500 font-medium">CareBot can explain your scan results and morphological features.</p>
              </div>
              <ChevronRight size={16} className="text-slate-800 ml-auto" />
           </GlassCard>

           <GlassCard className="p-4 flex items-center gap-4 bg-purple-600/5 border-purple-500/10">
              <div className="w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-500 shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-tight text-white">Privacy Protected</h4>
                <p className="text-[9px] text-slate-500 font-medium">Your chat data is encrypted and HIPAA-ready for clinical safety.</p>
              </div>
              <ChevronRight size={16} className="text-slate-800 ml-auto" />
           </GlassCard>
        </div>
      </div>
    </div>
  );
}
