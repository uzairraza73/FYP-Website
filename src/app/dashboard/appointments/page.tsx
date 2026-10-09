"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  Calendar, Clock, ChevronLeft, Plus, User, CheckCircle2,
  ArrowRight, Star, MapPin, Phone, X, Stethoscope, AlertCircle
} from "lucide-react";

const DOCTORS = [
  { id: 1, name: "Dr. Ayesha Malik", specialty: "General Physician", rating: 4.9, reviews: 128, location: "Karachi, PK", available: "10:30 AM", date: "12 Oct 2026", image: null, experience: "8 Years", status: "upcoming" },
  { id: 2, name: "Dr. Zain Hussain", specialty: "Dermatologist", rating: 4.7, reviews: 94, location: "Lahore, PK", available: "2:00 PM", date: "15 Oct 2026", image: null, experience: "12 Years", status: "upcoming" },
  { id: 3, name: "Dr. Sara Ahmed", specialty: "Oncologist", rating: 4.8, reviews: 211, location: "Islamabad, PK", available: "11:00 AM", date: "20 Oct 2026", image: null, experience: "15 Years", status: "upcoming" },
];

const PAST = [
  { id: 4, name: "Dr. Bilal Khan", specialty: "Dermatologist", date: "28 Sep 2026", time: "3:00 PM", status: "completed" },
  { id: 5, name: "Dr. Ayesha Malik", specialty: "General Physician", date: "10 Sep 2026", time: "10:00 AM", status: "completed" },
];

const SLOTS = ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "3:30 PM", "5:00 PM"];

export default function AppointmentsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [showBooking, setShowBooking] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [booked, setBooked] = useState(false);

  const handleBook = () => {
    if (bookingStep === 1 && selectedSlot) setBookingStep(2);
    else if (bookingStep === 2) {
      setBooked(true);
      setTimeout(() => {
        setBooked(false);
        setShowBooking(false);
        setBookingStep(1);
        setSelectedSlot(null);
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0E8DF] font-plus-jakarta relative overflow-hidden">
      {/* Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#D4A98A]/25 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] bg-[#C69C7B]/15 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 px-6 pt-10 pb-20 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => router.push("/dashboard")} className="w-10 h-10 rounded-full bg-white/80 border border-white shadow-sm flex items-center justify-center text-[#8D6E63] hover:bg-white transition-all">
              <ChevronLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-black text-[#3E2723]">My Appointments</h1>
              <p className="text-xs text-[#A1887F] font-medium">Manage your upcoming & past visits</p>
            </div>
          </div>
          <button
            onClick={() => setShowBooking(true)}
            className="flex items-center gap-2 bg-[#8D6E63] hover:bg-[#5C4033] text-white text-sm font-black rounded-full px-5 py-3 transition-all shadow-md"
          >
            <Plus size={16} /> New Appointment
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1.5 bg-white/60 backdrop-blur-md rounded-2xl w-fit border border-[#E8D5C4] shadow-sm mb-6">
          {(["upcoming", "past"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? "bg-[#8D6E63] text-white shadow-md" : "text-[#A1887F] hover:text-[#5C4033]"}`}>
              {tab === "upcoming" ? "Upcoming" : "Past"}
            </button>
          ))}
        </div>

        {/* Appointment Cards */}
        <AnimatePresence mode="wait">
          {activeTab === "upcoming" ? (
            <motion.div key="upcoming" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              {DOCTORS.map((doc, i) => (
                <motion.div key={doc.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  className="relative bg-white/75 backdrop-blur-xl border border-white/90 rounded-3xl p-6 shadow-[0_6px_30px_rgba(92,64,51,0.05)] overflow-hidden group hover:-translate-y-0.5 transition-all duration-300">
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-[#EADBCE]/40 rounded-full blur-2xl pointer-events-none" />
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-[#F0E8DF] border border-[#E8D5C4] flex items-center justify-center text-[#8D6E63] flex-shrink-0">
                      <User size={28} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-black text-[#3E2723]">{doc.name}</h3>
                          <p className="text-xs text-[#8D6E63] font-semibold">{doc.specialty} · {doc.experience}</p>
                        </div>
                        <span className="bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">Confirmed</span>
                      </div>
                      <div className="flex items-center gap-4 mt-3 flex-wrap">
                        <div className="flex items-center gap-1.5 text-xs text-[#7D5A4F] font-medium">
                          <Calendar size={12} className="text-[#A1887F]" /> {doc.date}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[#7D5A4F] font-medium">
                          <Clock size={12} className="text-[#A1887F]" /> {doc.available}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[#7D5A4F] font-medium">
                          <MapPin size={12} className="text-[#A1887F]" /> {doc.location}
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold text-[#E76F51]">
                          <Star size={11} fill="#E76F51" /> {doc.rating} <span className="text-[#A1887F] font-normal">({doc.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3 relative z-10">
                    <button className="flex items-center gap-2 bg-[#F5EDE4] hover:bg-[#E8D5C4] text-[#5C4033] text-xs font-black rounded-full px-4 py-2 transition-all border border-[#E8D5C4]">
                      <Phone size={13} /> Call
                    </button>
                    <button className="flex items-center gap-2 bg-[#8D6E63] hover:bg-[#5C4033] text-white text-xs font-black rounded-full px-4 py-2 transition-all shadow-sm">
                      View Details <ArrowRight size={13} />
                    </button>
                    <button className="ml-auto flex items-center gap-1 text-red-400 hover:text-red-600 text-xs font-bold transition-colors">
                      <X size={13} /> Cancel
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="past" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
              {PAST.map((doc, i) => (
                <motion.div key={doc.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  className="relative bg-white/75 backdrop-blur-xl border border-white/90 rounded-3xl p-6 shadow-[0_6px_30px_rgba(92,64,51,0.05)] overflow-hidden opacity-80">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F0E8DF] border border-[#E8D5C4] flex items-center justify-center text-[#8D6E63]">
                      <User size={22} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base font-black text-[#3E2723]">{doc.name}</h3>
                          <p className="text-xs text-[#8D6E63] font-semibold">{doc.specialty}</p>
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-black bg-emerald-50 px-3 py-1 rounded-full">
                          <CheckCircle2 size={12} /> Completed
                        </div>
                      </div>
                      <p className="text-xs text-[#A1887F] font-medium mt-1">{doc.date} at {doc.time}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button className="flex items-center gap-2 bg-[#F5EDE4] hover:bg-[#E8D5C4] text-[#5C4033] text-xs font-black rounded-full px-4 py-2 transition-all border border-[#E8D5C4]">
                      Book Again
                    </button>
                    <button onClick={() => router.push("/history")} className="flex items-center gap-2 text-[#8D6E63] hover:text-[#5C4033] text-xs font-bold transition-colors">
                      View Report <ArrowRight size={12} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Book Appointment Modal */}
      <AnimatePresence>
        {showBooking && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#3E2723]/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowBooking(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/95 backdrop-blur-xl rounded-[2rem] p-8 shadow-2xl max-w-md w-full border border-white relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#D4A98A]/15 rounded-full blur-3xl pointer-events-none" />

              {booked ? (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-8 relative z-10">
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={40} className="text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-black text-[#3E2723] mb-2">Appointment Booked!</h3>
                  <p className="text-sm text-[#8D6E63]">You'll receive a confirmation shortly.</p>
                </motion.div>
              ) : (
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-black text-[#3E2723]">Book Appointment</h3>
                      <p className="text-xs text-[#A1887F] mt-0.5">Step {bookingStep} of 2</p>
                    </div>
                    <button onClick={() => { setShowBooking(false); setBookingStep(1); setSelectedSlot(null); }}
                      className="w-8 h-8 rounded-full bg-[#F0E8DF] flex items-center justify-center text-[#8D6E63] hover:bg-[#E8D5C4] transition-all">
                      <X size={16} />
                    </button>
                  </div>

                  {bookingStep === 1 ? (
                    <div>
                      <div className="flex items-center gap-3 mb-6 p-4 bg-[#F5EDE4] rounded-2xl border border-[#E8D5C4]">
                        <Stethoscope size={20} className="text-[#8D6E63]" />
                        <div>
                          <p className="text-sm font-black text-[#3E2723]">Dr. Ayesha Malik</p>
                          <p className="text-xs text-[#8D6E63]">General Physician · 12 Oct 2026</p>
                        </div>
                      </div>
                      <p className="text-xs font-black text-[#8D6E63] uppercase tracking-widest mb-3">Select Time Slot</p>
                      <div className="grid grid-cols-3 gap-2">
                        {SLOTS.map(slot => (
                          <button key={slot} onClick={() => setSelectedSlot(slot)}
                            className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${selectedSlot === slot ? "bg-[#8D6E63] text-white border-[#8D6E63] shadow-md" : "bg-[#F5EDE4] text-[#5C4033] border-[#E8D5C4] hover:border-[#8D6E63]"}`}>
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="p-5 bg-[#F5EDE4] rounded-2xl border border-[#E8D5C4] mb-5 space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-[#A1887F] font-medium">Doctor</span>
                          <span className="text-[#3E2723] font-black">Dr. Ayesha Malik</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#A1887F] font-medium">Date</span>
                          <span className="text-[#3E2723] font-black">12 Oct 2026</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#A1887F] font-medium">Time</span>
                          <span className="text-[#3E2723] font-black">{selectedSlot}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#A1887F] font-medium">Type</span>
                          <span className="text-[#3E2723] font-black">In-Person</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-xl border border-amber-100 text-xs text-amber-700 font-medium">
                        <AlertCircle size={14} className="shrink-0 mt-0.5" />
                        Please arrive 10 minutes early with your previous medical records.
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 mt-6">
                    {bookingStep === 2 && (
                      <button onClick={() => setBookingStep(1)} className="flex-1 py-3 rounded-full bg-[#F0E8DF] text-[#5C4033] text-sm font-black border border-[#E8D5C4] hover:bg-[#E8D5C4] transition-all">
                        Back
                      </button>
                    )}
                    <button onClick={handleBook} disabled={bookingStep === 1 && !selectedSlot}
                      className={`flex-1 py-3 rounded-full text-sm font-black transition-all shadow-md flex items-center justify-center gap-2 ${(!selectedSlot && bookingStep === 1) ? "bg-[#E8D5C4] text-[#A1887F] cursor-not-allowed" : "bg-[#8D6E63] hover:bg-[#5C4033] text-white"}`}>
                      {bookingStep === 1 ? "Continue" : "Confirm Booking"} <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
