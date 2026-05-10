"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Scan, History, User } from "lucide-react";
import { cn } from "@/utils/cn";
import { useAuthStore } from "@/store/useAuthStore";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Scan", href: "/scan", icon: Scan },
  { name: "History", href: "/history", icon: History, protected: true },
  { name: "Profile", href: "/profile", icon: User },
];

export const FloatingNav = () => {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  const filteredNavItems = navItems.filter(item => !item.protected || isAuthenticated);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-md">
      <motion.nav 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-card flex items-center justify-around py-4 px-2"
      >
        {filteredNavItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.name} href={item.href} className="relative p-2">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "flex flex-col items-center gap-1 transition-colors duration-300",
                  isActive ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
                )}
              >
                <Icon size={24} />
                <span className="text-[10px] font-medium">{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute -top-1 w-1 h-1 bg-blue-600 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
};
