"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  glow?: boolean;
  children: React.ReactNode;
}

export const PremiumButton = ({ 
  variant = "primary", 
  glow = false, 
  className, 
  children, 
  ...props 
}: PremiumButtonProps) => {
  const variants = {
    primary: "bg-blue-600 text-white border-blue-400/30 hover:bg-blue-500",
    secondary: "bg-slate-900/60 text-white backdrop-blur-md border-white/10 hover:bg-slate-800/80",
    outline: "bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10",
    ghost: "bg-transparent text-slate-500 hover:bg-white/5"
  };

  return (
    <motion.button
      whileHover={{ 
        scale: 1.02, 
        y: -1,
        transition: { type: "spring", stiffness: 400, damping: 15 }
      }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-[0.15em] transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden group border",
        variants[variant],
        className
      )}
      {...(props as any)}
    >
      {/* Animated Border Shade / Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_120deg,#3B82F6_180deg,transparent_240deg,transparent_360deg)] animate-[spin_4s_linear_infinite] opacity-30" />
      </motion.div>

      {/* Internal Shine Effect */}
      <motion.div 
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 pointer-events-none z-10"
      />
      
      {/* Surface Overlay for Glow */}
      {glow && (
        <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors pointer-events-none" />
      )}

      <span className="relative z-20 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};
