// Supabase database types for Oncura
// Matches live tables: profiles, doctors, patients, scans, appointments, messages

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type RiskLevel = "Low" | "Medium" | "High";
export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type UserRole = "patient" | "doctor";

// ── Profiles Table ───────────────────────────────────────────────────────────
export interface Profile {
  id: string;                    // UUID
  created_at: string;
  full_name: string;
  email: string;
  role: UserRole;
  phone?: string | null;
  avatar_url?: string | null;
  specialty?: string | null;
  location?: string | null;
  experience_years?: number | null;
}

// ── Doctors Table ────────────────────────────────────────────────────────────
export interface Doctor {
  id: string;
  created_at: string;
  specialization: string;
  experience_years: number;
  age: number;
  // Joined or augmented details
  full_name?: string;
  email?: string;
  avatar_url?: string | null;
  rating?: number;
  reviews_count?: number;
  location?: string;
}

// ── Patients Table ───────────────────────────────────────────────────────────
export interface Patient {
  id: string;
  created_at: string;
  age: number;
  // Joined or augmented details
  full_name?: string;
  email?: string;
  avatar_url?: string | null;
  phone?: string | null;
}

// ── Scans Table ──────────────────────────────────────────────────────────────
export interface DbScan {
  id: string;
  created_at: string;
  patient_id: string;
  doctor_id?: string | null;
  image_url: string;
  confidence_score: number;       // 0–100 or float
  doctor_notes: string | null;
  // Aliases and UI helpers for backwards compatibility
  confidence: number;
  condition: string;
  risk_level: RiskLevel;
  recommendations: string[];
  notes?: string | null;
  reviewed_by_doctor: boolean;
}

export type ScanResult = DbScan;

// ── Appointments Table ───────────────────────────────────────────────────────
export interface Appointment {
  id: string;
  created_at: string;
  patient_id: string;
  doctor_id: string;
  status: AppointmentStatus;
  notes: string | null;
  scheduled_at: string;          // ISO timestamp
  // Backward compatibility fields
  appointment_date?: string;
  appointment_time?: string;
  type?: "check-up" | "consultation" | "biopsy" | "follow-up";
  patient?: Pick<Profile, "id" | "full_name" | "email" | "phone" | "avatar_url">;
  doctor?: Pick<Doctor, "id" | "specialization" | "experience_years"> & { full_name?: string; location?: string };
}

// ── Messages Table ───────────────────────────────────────────────────────────
export interface DbMessage {
  id: string;
  sender_id: string;
  receiver_id: string;
  message_text: string;
  sent_at: string;
  // Joined or augmented details
  sender_name?: string;
  sender_role?: "patient" | "doctor";
}

// ── Medical Documents (bucket doctor-docs) ────────────────────────────────────
export interface MedicalDocument {
  id: string;
  patient_id: string;
  uploaded_by: string;
  file_name: string;
  file_url: string;
  storage_path: string;
  file_type: string;
  file_size: number;
  category: "prescription" | "lab_report" | "imaging" | "referral" | "other";
  description: string | null;
  created_at: string;
  uploader?: {
    id: string;
    full_name: string;
    role?: string;
  };
}

// ── Upload Results ───────────────────────────────────────────────────────────
export interface UploadResult {
  url: string;
  path: string;
}
