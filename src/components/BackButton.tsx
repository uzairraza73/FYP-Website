"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn";
import { useSettingsStore } from "@/store/useSettingsStore";

interface BackButtonProps {
  className?: string;
  variant?: "default" | "brown";
}

export const BackButton = ({ className, variant = "default" }: BackButtonProps) => {
  const router = useRouter();
  const { theme } = useSettingsStore();

  return (
    <motion.button
      onClick={() => router.back()}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      whileHover={{ scale: 1.1, x: -5 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "group flex items-center gap-3 px-4 py-2 rounded-[1.25rem] transition-all duration-300 shadow-lg relative z-20 cursor-pointer",
        variant === "brown" 
          ? "bg-white border border-[#FFD8C2] text-[#5C4033] hover:text-[#E76F51] hover:bg-[#FFF5F0] hover:border-[#E76F51] shadow-[0_10px_20px_rgba(92,64,51,0.05)]"
          : (theme === 'dark' 
            ? "bg-slate-900/50 border border-white/5 text-slate-400 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/30" 
            : "bg-white/80 border border-slate-200 text-slate-500 hover:text-blue-600 hover:bg-blue-50 shadow-slate-200/50"),
        className
      )}
    >
      <div className={cn(
        "w-8 h-8 rounded-xl flex items-center justify-center transition-colors",
        variant === "brown"
          ? "bg-[#FFF5F0] group-hover:bg-[#E76F51] group-hover:text-white text-[#E76F51]"
          : (theme === 'dark' ? "bg-white/5 group-hover:bg-blue-500/20" : "bg-slate-100 group-hover:bg-blue-100")
      )}>
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
      </div>
      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Go Back</span>
      
      {/* Animated Shine Effect */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
        />
      </div>
    </motion.button>
  );
};
