"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn";

interface BackButtonProps {
  className?: string;
  variant?: "default" | "brown";
  href?: string;
}

export const BackButton = ({ className, variant = "default", href }: BackButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (href) router.push(href);
    else router.back();
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      whileHover={{ scale: 1.05, x: -3 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "group flex items-center gap-3 px-4 py-2.5 rounded-full transition-all duration-300 shadow-sm relative z-20 cursor-pointer",
        "bg-white/80 backdrop-blur-sm border border-white/80 text-[#5C4033] hover:bg-white hover:border-[#D4A98A] hover:text-[#3E2723]",
        className
      )}
    >
      <div className="w-7 h-7 rounded-full bg-[#F5EDE4] flex items-center justify-center text-[#8D6E63] group-hover:bg-[#8D6E63] group-hover:text-white transition-all duration-300">
        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
      </div>
      <span className="text-[11px] font-black uppercase tracking-widest">Go Back</span>
    </motion.button>
  );
};
