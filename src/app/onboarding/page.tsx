"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/GlassCard";
import { PremiumButton } from "@/components/PremiumButton";
import { 
  User, 
  Calendar, 
  Droplet, 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  Stethoscope
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    bloodGroup: "",
    medicalHistory: "",
    disabilities: ""
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, save to backend/store here
    console.log("Onboarding data:", formData);
    router.push("/dashboard"); // Redirect to dashboard after onboarding
  };

  const steps = [
    { title: "Identity", icon: User },
    { title: "Clinical", icon: Droplet },
    { title: "Background", icon: Activity }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center relative overflow-hidden bg-slate-950">
      {/* Premium Mesh Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] bg-indigo-600/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[50%] h-[50%] bg-blue-400/5 rounded-full blur-[120px]" />
      </div>
      
      <div className="w-full max-w-2xl z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-500 mb-6"
          >
            <Stethoscope size={28} />
          </motion.div>
          <h1 className="text-4xl font-black text-white tracking-tight font-plus-jakarta mb-2">
            Patient Intake
          </h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-bold">
            Protocol Initialization • Step {step} of 3
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-4">
              <div 
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-500 ${
                  step === i + 1 
                    ? "bg-blue-500/20 border-blue-500/50 text-white" 
                    : step > i + 1 
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" 
                      : "bg-slate-900/40 border-white/5 text-slate-600"
                }`}
              >
                <s.icon size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">{s.title}</span>
                {step > i + 1 && <CheckCircle2 size={12} />}
              </div>
              {i < steps.length - 1 && <div className="w-8 h-px bg-white/5" />}
            </div>
          ))}
        </div>

        <GlassCard className="p-10 border-white/5 bg-slate-950/40 backdrop-blur-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                      Full Legal Name
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">
                        <User size={18} />
                      </div>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter your name"
                        className="w-full bg-slate-900/30 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                      Biological Gender
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {["Male", "Female", "Other"].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setFormData({...formData, gender: g})}
                          className={`py-3 rounded-xl border text-[10px] font-black transition-all ${
                            formData.gender === g 
                              ? "bg-blue-500/20 border-blue-500 text-white" 
                              : "bg-slate-900/30 border-white/5 text-slate-500 hover:border-white/10"
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                      Current Age
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">
                        <Calendar size={18} />
                      </div>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                        placeholder="e.g. 24"
                        className="w-full bg-slate-900/30 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all"
                        required
                      />
                    </div>
                  </div>
                  
                  <PremiumButton type="button" onClick={nextStep} className="w-full py-4 mt-4">
                    Clinical Data Next <ArrowRight size={16} className="ml-1" />
                  </PremiumButton>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                      Blood Group
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({...formData, bloodGroup: type})}
                          className={`py-3 rounded-xl border text-[10px] font-black transition-all ${
                            formData.bloodGroup === type 
                              ? "bg-blue-500/20 border-blue-500 text-white" 
                              : "bg-slate-900/30 border-white/5 text-slate-500 hover:border-white/10 hover:text-slate-300"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <PremiumButton variant="secondary" type="button" onClick={prevStep} className="flex-1 py-4">
                      Back
                    </PremiumButton>
                    <PremiumButton type="button" onClick={nextStep} className="flex-[2] py-4">
                      Medical Background <ArrowRight size={16} className="ml-1" />
                    </PremiumButton>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                      Pre-existing Conditions
                    </label>
                    <textarea
                      value={formData.medicalHistory}
                      onChange={(e) => setFormData({...formData, medicalHistory: e.target.value})}
                      placeholder="List any chronic diseases, allergies, or past medical events..."
                      rows={4}
                      className="w-full bg-slate-900/30 border border-white/5 rounded-2xl p-4 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
                      Disabilities (if any)
                    </label>
                    <input
                      type="text"
                      value={formData.disabilities}
                      onChange={(e) => setFormData({...formData, disabilities: e.target.value})}
                      placeholder="State any physical or cognitive disabilities"
                      className="w-full bg-slate-900/30 border border-white/5 rounded-2xl py-4 px-4 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-blue-500/50 transition-all"
                    />
                  </div>

                  <div className="flex items-center gap-2 bg-blue-500/5 border border-blue-500/10 p-4 rounded-2xl">
                    <ShieldCheck size={16} className="text-blue-500" />
                    <p className="text-[9px] text-slate-500 font-medium leading-relaxed">
                      All clinical data is encrypted and stored according to <span className="text-blue-400">HIPAA health standards</span>. Your data is used only for diagnostic accuracy.
                    </p>
                  </div>

                  <div className="flex gap-4 pt-2">
                    <PremiumButton variant="secondary" type="button" onClick={prevStep} className="flex-1 py-4">
                      Back
                    </PremiumButton>
                    <PremiumButton glow type="submit" className="flex-[2] py-4">
                      Finalize Enrollment <CheckCircle2 size={16} className="ml-1" />
                    </PremiumButton>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}
