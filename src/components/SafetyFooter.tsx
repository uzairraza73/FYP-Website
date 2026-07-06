"use client";

import { Activity, ShieldCheck, Mail, Phone, MapPin, ExternalLink, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";

export const SafetyFooter = () => {
  const pathname = usePathname();

  const isDashboard = pathname.startsWith('/dashboard') || pathname.startsWith('/doctor');

  return (
    <footer className="w-full pt-20 pb-10 px-6 bg-slate-950 text-white overflow-hidden relative border-t border-white/5">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {!isDashboard && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-6 group">
              <Image
                src="/website-logo.png"
                alt="Oncura Logo"
                width={120}
                height={36}
                className="object-contain mix-blend-screen opacity-90 group-hover:opacity-100 transition-all duration-300"
              />
            </Link>
            <p className="text-[10px] text-slate-500 font-medium leading-relaxed mb-6 uppercase tracking-wider">
              Pioneering artificial intelligence and clinical dermatology to provide accessible skin health monitoring for everyone.
            </p>
            <div className="flex gap-4">
              <Globe size={16} className="text-slate-600 hover:text-blue-400 cursor-pointer transition-colors" />
              <ExternalLink size={16} className="text-slate-600 hover:text-white cursor-pointer transition-colors" />
              <Activity size={16} className="text-slate-600 hover:text-emerald-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black mb-6 uppercase text-[10px] tracking-[0.2em] text-blue-500">Platform</h4>
            <ul className="space-y-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <li><Link href="/scan" className="hover:text-white transition-colors">AI Scanner</Link></li>
              <li><Link href="/history" className="hover:text-white transition-colors">Health History</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Methodology</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Clinical Data</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-black mb-6 uppercase text-[10px] tracking-[0.2em] text-blue-500">Resources</h4>
            <ul className="space-y-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <li><Link href="/" className="hover:text-white transition-colors">Research Papers</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Health Guides</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Compliance</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Community</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black mb-6 uppercase text-[10px] tracking-[0.2em] text-blue-500">Clinical Support</h4>
            <ul className="space-y-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              <li className="flex items-center gap-3"><Mail size={14} className="text-blue-500/50" /> support@oncura.ai</li>
              <li className="flex items-center gap-3"><Phone size={14} className="text-blue-500/50" /> +1 (800) DERM-AI</li>
              <li className="flex items-center gap-3"><MapPin size={14} className="text-blue-500/50" /> Silicon Valley, CA</li>
            </ul>
          </div>
        </div>
        )}

        {/* Safety Disclaimer Box */}
        <div className="p-8 rounded-3xl bg-slate-900/10 border border-white/5 mb-12">
          <div className="flex items-center gap-2 mb-4 text-orange-500/70">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Safety Protocol</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
            oncura is an educational monitoring tool. It is <span className="text-white font-bold">not a replacement</span> for professional medical advice.
            Always seek the advice of your physician with any questions regarding a medical condition.
            Never disregard professional medical advice because of information on this website.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-6">
          <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">© 2024 oncura AI Platform. HIPAA Compliant.</p>
          <div className="flex gap-8 text-[9px] font-black uppercase tracking-[0.2em] text-slate-600">
            <Link href="/" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/" className="hover:text-white transition-colors">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
