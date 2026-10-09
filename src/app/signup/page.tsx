"use client";

import { motion } from "framer-motion";
import {
  Mail, Lock, User, ArrowRight, ShieldCheck,
  Stethoscope, Hash, Calendar, Camera, Upload,
  CheckCircle2, Heart, MapPin, Award, EyeOff, Eye, Droplets, AlertCircle, FileText
} from "lucide-react";
import Link from "next/link";
import { useState, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";

// ─── Shared input styles ──────────────────────────────────────────────────────
const inputCls =
  "w-full bg-transparent border border-[#D7CCC8] rounded-full py-3 pl-11 pr-4 text-xs text-[#3E2723] placeholder:text-[#A1887F] focus:outline-none focus:border-[#8D6E63] focus:ring-1 focus:ring-[#8D6E63]/20 transition-all shadow-sm";

const selectCls =
  "w-full bg-transparent border border-[#D7CCC8] rounded-full py-3 pl-11 pr-4 text-xs text-[#3E2723] focus:outline-none focus:border-[#8D6E63] focus:ring-1 focus:ring-[#8D6E63]/20 transition-all shadow-sm appearance-none";

function FieldIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8D6E63] group-focus-within:text-[#5C4033] transition-colors pointer-events-none">
      {children}
    </div>
  );
}

// ─── DOCTOR SIGNUP ────────────────────────────────────────────────────────────
function DoctorSignup({ handleSubmit }: { handleSubmit: (name: string, email: string) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [degree, setDegree] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [cnicFront, setCnicFront] = useState<File | null>(null);
  const [cnicBack, setCnicBack] = useState<File | null>(null);
  const [doctorDegreeFile, setDoctorDegreeFile] = useState<File | null>(null);

  const profilePicRef = useRef<HTMLInputElement>(null);
  const cnicFrontRef = useRef<HTMLInputElement>(null);
  const cnicBackRef = useRef<HTMLInputElement>(null);
  const degreeFileRef = useRef<HTMLInputElement>(null);

  const handleGoogleSignup = () => {
    window.open(
      "https://accounts.google.com/o/oauth2/v2/auth?client_id=DEMO&redirect_uri=" + encodeURIComponent(window.location.origin + "/signup?role=doctor") + "&response_type=code&scope=email%20profile",
      "_blank",
      "width=500,height=600"
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-plus-jakarta bg-[#FAF6F3] p-4">
      <div className="w-full max-w-6xl flex bg-[#FDF8F3] rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(92,64,51,0.2)] overflow-hidden my-6">

        {/* ── LEFT SIDE ── */}
        <div className="hidden lg:flex lg:w-[35%] relative bg-[#4A3225] flex-shrink-0">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1200"
              alt="Doctor"
              fill
              className="object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723]/95 via-[#3E2723]/40 to-[#3E2723]/50" />
          </div>
          <div className="relative z-10 flex flex-col justify-between p-10 w-full h-full text-white min-h-[700px]">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-3">
              <div className="w-12 h-12 flex items-center justify-center text-[#FFD8C2]">
                <Stethoscope size={38} className="stroke-[1.5]" />
              </div>
              <div>
                <h2 className="text-3xl font-serif italic text-[#FFD8C2]">Join as a</h2>
                <h3 className="text-4xl font-black tracking-tight">Doctor</h3>
              </div>
              <p className="text-sm text-white/80 leading-relaxed pt-1 max-w-[200px]">
                Help patients get better skin cancer diagnostics with AI.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
                  <ShieldCheck size={18} className="text-[#FFD8C2]" />
                </div>
                <span className="text-base font-black tracking-widest uppercase">ONCURA</span>
              </div>
              <p className="text-[11px] font-medium text-white/60">Better Insights. Healthier Tomorrow.</p>
            </motion.div>
          </div>
        </div>

        {/* ── RIGHT SIDE (FORM) ── */}
        <div className="w-full lg:w-[65%] flex flex-col justify-start items-center p-8 lg:px-12 lg:py-10 overflow-y-auto max-h-screen">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl space-y-5">
            <div className="space-y-2">
              <div className="w-11 h-11 rounded-full bg-[#EADECF] flex items-center justify-center text-[#5C4033]">
                <Stethoscope size={22} />
              </div>
              <div>
                <h1 className="text-2xl font-black text-[#3E2723] tracking-tight">
                  Doctor <span className="text-[#8D6E63]">Registration</span>
                </h1>
                <p className="text-[#6D4C41] text-xs mt-1">Complete your profile to start helping patients.</p>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(name, email); }} className="space-y-4">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative group">
                  <FieldIcon><User size={15} /></FieldIcon>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name (e.g. Dr. Ali)" className={inputCls} required />
                </div>
                <div className="relative group">
                  <FieldIcon><Mail size={15} /></FieldIcon>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" className={inputCls} required />
                </div>
              </div>

              {/* Row 2: Age & Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative group">
                  <FieldIcon><Calendar size={15} /></FieldIcon>
                  <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Age" className={inputCls} min="25" max="90" required />
                </div>
                <div className="relative group">
                  <FieldIcon><Lock size={15} /></FieldIcon>
                  <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className={inputCls} required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8D6E63] hover:text-[#5C4033] transition-colors">
                    {showPassword ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                </div>
              </div>

              {/* Row 3: License & Specialization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative group">
                  <FieldIcon><Hash size={15} /></FieldIcon>
                  <input type="text" value={licenseNumber} onChange={e => setLicenseNumber(e.target.value)} placeholder="Doctor Licence No. (PMDC)" className={inputCls} required />
                </div>
                <div className="relative group">
                  <FieldIcon><Award size={15} /></FieldIcon>
                  <select value={specialization} onChange={e => setSpecialization(e.target.value)} className={selectCls} required>
                    <option value="">Specialization</option>
                    <option>Dermatologist</option>
                    <option>Oncologist</option>
                    <option>General Physician</option>
                    <option>Plastic Surgeon</option>
                    <option>Pathologist</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Degree & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative group">
                  <FieldIcon><FileText size={15} /></FieldIcon>
                  <input type="text" value={degree} onChange={e => setDegree(e.target.value)} placeholder="Medical Degree (e.g. MBBS, MD)" className={inputCls} required />
                </div>
                <div className="relative group">
                  <FieldIcon><MapPin size={15} /></FieldIcon>
                  <select value={city} onChange={e => setCity(e.target.value)} className={selectCls} required>
                    <option value="">Select City</option>
                    <option>Lahore</option><option>Karachi</option><option>Islamabad</option>
                    <option>Rawalpindi</option><option>Faisalabad</option><option>Multan</option>
                    <option>Peshawar</option><option>Quetta</option><option>Gujranwala</option>
                    <option>Sialkot</option><option>Bahawalpur</option><option>Sargodha</option>
                  </select>
                </div>
              </div>

              {/* Row 5: Area */}
              <div className="relative group">
                <FieldIcon><MapPin size={15} /></FieldIcon>
                <input type="text" value={area} onChange={e => setArea(e.target.value)} placeholder="Area / Locality (e.g. Johar Town, DHA, Gulberg)" className={inputCls} required />
              </div>

              {/* Profile Photo */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-[#8D6E63] mb-2 ml-1">Profile Photo</p>
                <div onClick={() => profilePicRef.current?.click()} className={`w-full border border-dashed rounded-2xl py-3 px-4 flex items-center gap-3 cursor-pointer transition-all ${profilePic ? "border-[#8D6E63] bg-[#F5EDE6]" : "border-[#D7CCC8] bg-[#FAF6F3] hover:bg-[#F5EDE6]"}`}>
                  <div className="w-8 h-8 rounded-full bg-[#EADECF] flex items-center justify-center text-[#5C4033]">
                    {profilePic ? <CheckCircle2 size={15} /> : <Camera size={15} />}
                  </div>
                  <span className="text-xs font-semibold text-[#6D4C41] truncate">{profilePic ? profilePic.name : "Upload your profile picture"}</span>
                  <input ref={profilePicRef} type="file" accept="image/*" className="hidden" onChange={e => setProfilePic(e.target.files?.[0] || null)} />
                </div>
              </div>

              {/* Document Uploads */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-[#8D6E63] mb-2 ml-1">Upload Verification Documents</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "CNIC Front", ref: cnicFrontRef, file: cnicFront, setFile: setCnicFront, icon: <Upload size={18} /> },
                    { label: "CNIC Back", ref: cnicBackRef, file: cnicBack, setFile: setCnicBack, icon: <Upload size={18} /> },
                    { label: "Doctor Degree", ref: degreeFileRef, file: doctorDegreeFile, setFile: setDoctorDegreeFile, icon: <FileText size={18} /> },
                  ].map(({ label, ref, file, setFile, icon }) => (
                    <div key={label} onClick={() => ref.current?.click()} className={`flex flex-col items-center justify-center p-4 rounded-2xl border border-dashed cursor-pointer transition-all ${file ? "border-[#8D6E63] bg-[#F5EDE6]" : "border-[#D7CCC8] bg-[#FAF6F3] hover:bg-[#F5EDE6]"}`}>
                      <div className={file ? "text-[#5C4033]" : "text-[#A1887F]"}>{icon}</div>
                      <span className="text-[9px] font-bold uppercase text-[#8D6E63] mt-2 text-center">{label}</span>
                      {file && <span className="text-[8px] text-[#5C4033] truncate w-full text-center mt-0.5">{file.name}</span>}
                      <input ref={ref} type="file" accept="image/*,application/pdf" className="hidden" onChange={e => setFile(e.target.files?.[0] || null)} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="w-full bg-[#5C4033] hover:bg-[#4A3225] text-white rounded-full py-3.5 text-xs font-bold shadow-[0_8px_20px_rgba(92,64,51,0.25)] transition-all flex items-center justify-center gap-2 group mt-1">
                Create Doctor Account <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="relative flex items-center justify-center py-1">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#D7CCC8]" /></div>
                <span className="relative px-3 bg-[#FDF8F3] text-[9px] font-bold text-[#8D6E63] uppercase tracking-widest">OR</span>
              </div>

              <button type="button" onClick={handleGoogleSignup} className="w-full flex items-center justify-center gap-3 border border-[#D7CCC8] bg-white hover:bg-[#F5F5F5] hover:border-[#8D6E63] text-[#3E2723] rounded-full py-3 text-xs font-bold shadow-sm transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>Sign Up with Google</span>
              </button>

              <p className="text-center text-[11px] font-medium text-[#8D6E63]">
                Already have an account?{" "}
                <Link href="/login?role=doctor" className="font-bold text-[#5C4033] hover:text-[#3E2723] transition-colors">Sign In</Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── PATIENT SIGNUP ───────────────────────────────────────────────────────────
function PatientSignup({ handleSubmit }: { handleSubmit: (name: string, email: string) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [age, setAge] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [disability, setDisability] = useState("");

  const handleGoogleSignup = () => {
    window.open(
      "https://accounts.google.com/o/oauth2/v2/auth?client_id=DEMO&redirect_uri=" + encodeURIComponent(window.location.origin + "/signup?role=patient") + "&response_type=code&scope=email%20profile",
      "_blank",
      "width=500,height=600"
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-plus-jakarta bg-[#FAF6F3] p-4 sm:p-8">
      <div className="w-full max-w-5xl flex bg-[#FDF8F3] rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(92,64,51,0.2)] overflow-hidden">

        {/* ── LEFT SIDE ── */}
        <div className="hidden lg:flex lg:w-[45%] relative bg-[#4A3225] flex-shrink-0">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=1200"
              alt="Patient"
              fill
              className="object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723]/95 via-[#3E2723]/40 to-[#3E2723]/50" />
          </div>
          <div className="relative z-10 flex flex-col justify-between p-10 w-full h-full text-white min-h-[620px]">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-3">
              <div className="w-12 h-12 flex items-center justify-center text-[#FFD8C2]">
                <Heart size={38} className="stroke-[1.5]" />
              </div>
              <div>
                <h2 className="text-3xl font-serif italic text-[#FFD8C2]">Your Health</h2>
                <h3 className="text-4xl font-black tracking-tight">Matters</h3>
              </div>
              <p className="text-sm text-white/80 leading-relaxed pt-1 max-w-[200px]">Track. Stay Informed.<br />Feel Better.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
                  <ShieldCheck size={18} className="text-[#FFD8C2]" />
                </div>
                <span className="text-base font-black tracking-widest uppercase">ONCURA</span>
              </div>
              <p className="text-[11px] font-medium text-white/60">Better Insights. Healthier Tomorrow.</p>
            </motion.div>
          </div>
        </div>

        {/* ── RIGHT SIDE (FORM) ── */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center items-center p-8 lg:p-12 overflow-y-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm space-y-5">
            <div className="space-y-3">
              <div className="w-11 h-11 rounded-full bg-[#EADECF] flex items-center justify-center text-[#5C4033]">
                <User size={22} />
              </div>
              <div>
                <h1 className="text-2xl font-black text-[#3E2723] tracking-tight">
                  Patient <span className="text-[#8D6E63]">Sign Up</span>
                </h1>
                <p className="text-[#6D4C41] text-xs mt-1">Create your account to get started.</p>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(name, email); }} className="space-y-3.5">
              {/* Name */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8D6E63] group-focus-within:text-[#5C4033] transition-colors pointer-events-none"><User size={15} /></div>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" className={inputCls} required />
              </div>

              {/* Age */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8D6E63] group-focus-within:text-[#5C4033] transition-colors pointer-events-none"><Calendar size={15} /></div>
                <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Age" className={inputCls} min="1" max="120" required />
              </div>

              {/* Email */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8D6E63] group-focus-within:text-[#5C4033] transition-colors pointer-events-none"><Mail size={15} /></div>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" className={inputCls} required />
              </div>

              {/* Password */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8D6E63] group-focus-within:text-[#5C4033] transition-colors pointer-events-none"><Lock size={15} /></div>
                <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className={inputCls} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8D6E63] hover:text-[#5C4033] transition-colors">
                  {showPassword ? <Eye size={14} /> : <EyeOff size={14} />}
                </button>
              </div>

              {/* Blood Group */}
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8D6E63] pointer-events-none"><Droplets size={15} /></div>
                <select value={bloodGroup} onChange={e => setBloodGroup(e.target.value)} className={selectCls} required>
                  <option value="">Blood Group</option>
                  <option>A+</option><option>A-</option>
                  <option>B+</option><option>B-</option>
                  <option>AB+</option><option>AB-</option>
                  <option>O+</option><option>O-</option>
                </select>
              </div>

              {/* Disability / Pre-existing Disease */}
              <div className="relative group">
                <div className="absolute left-4 top-3.5 text-[#8D6E63] group-focus-within:text-[#5C4033] transition-colors pointer-events-none"><AlertCircle size={15} /></div>
                <textarea
                  value={disability}
                  onChange={e => setDisability(e.target.value)}
                  placeholder="Any disability or pre-existing disease? (Optional)"
                  rows={3}
                  className="w-full bg-transparent border border-[#D7CCC8] rounded-2xl py-3 pl-11 pr-4 text-xs text-[#3E2723] placeholder:text-[#A1887F] focus:outline-none focus:border-[#8D6E63] focus:ring-1 focus:ring-[#8D6E63]/20 transition-all shadow-sm resize-none"
                />
              </div>

              {/* Submit */}
              <button type="submit" className="w-full bg-[#5C4033] hover:bg-[#4A3225] text-white rounded-full py-3.5 text-xs font-bold shadow-[0_8px_20px_rgba(92,64,51,0.25)] transition-all flex items-center justify-center gap-2 group mt-1">
                Create Account <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="relative flex items-center justify-center py-1">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#D7CCC8]" /></div>
                <span className="relative px-3 bg-[#FDF8F3] text-[9px] font-bold text-[#8D6E63] uppercase tracking-widest">OR</span>
              </div>

              <button type="button" onClick={handleGoogleSignup} className="w-full flex items-center justify-center gap-3 border border-[#D7CCC8] bg-white hover:bg-[#F5F5F5] hover:border-[#8D6E63] text-[#3E2723] rounded-full py-3 text-xs font-bold shadow-sm transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>Sign Up with Google</span>
              </button>

              <p className="text-center text-[11px] font-medium text-[#8D6E63] pt-1">
                Already have an account?{" "}
                <Link href="/login?role=patient" className="font-bold text-[#5C4033] hover:text-[#3E2723] transition-colors">Sign In</Link>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN CONTENT ─────────────────────────────────────────────────────────────
function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login: setLogin } = useAuthStore();
  const role = searchParams.get("role") || "patient";

  const handleSubmit = (name: string, email: string) => {
    setLogin({
      name: name || (role === "doctor" ? "Dr. New Doctor" : "New Patient"),
      role: role as "patient" | "doctor",
      email: email || ""
    });
    router.push(role === "doctor" ? "/doctor" : "/dashboard");
  };

  if (role === "doctor") return <DoctorSignup handleSubmit={handleSubmit} />;
  return <PatientSignup handleSubmit={handleSubmit} />;
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF6F3] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#5C4033] border-t-transparent animate-spin" />
      </div>
    }>
      <SignupContent />
    </Suspense>
  );
}

