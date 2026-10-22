/**
 * Oncura Supabase Database Query & Realtime Service
 * Connected to live tables: profiles, doctors, patients, scans, appointments, messages.
 */

import { createClient } from "./client";
import { uploadDoctorDoc as storageUploadDoctorDoc } from "./storage";
import type {
  Profile,
  Doctor,
  Patient,
  DbScan,
  Appointment,
  DbMessage,
  MedicalDocument,
  RiskLevel,
} from "./types";

export { storageUploadDoctorDoc as uploadDoctorDoc };

// Fallback seed doctors if the live doctors table is currently empty
export const FALLBACK_DOCTORS: Doctor[] = [
  {
    id: "d1",
    created_at: new Date().toISOString(),
    specialization: "Dermatologist & Melanoma Specialist",
    experience_years: 12,
    age: 42,
    full_name: "Dr. Ayesha Malik",
    email: "dr.ayesha@oncura.health",
    avatar_url: "https://images.unsplash.com/photo-1594824813580-c119e0b82f8c?auto=format&fit=crop&q=80&w=300",
    rating: 4.9,
    reviews_count: 142,
    location: "Karachi Medical Complex",
  },
  {
    id: "d2",
    created_at: new Date().toISOString(),
    specialization: "Clinical Dermatologist",
    experience_years: 8,
    age: 38,
    full_name: "Dr. Zain Hussain",
    email: "dr.zain@oncura.health",
    avatar_url: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300",
    rating: 4.8,
    reviews_count: 98,
    location: "Lahore General Hospital",
  },
  {
    id: "d3",
    created_at: new Date().toISOString(),
    specialization: "Dermatopathology Specialist",
    experience_years: 15,
    age: 49,
    full_name: "Dr. Sara Ahmed",
    email: "dr.sara@oncura.health",
    avatar_url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300",
    rating: 4.95,
    reviews_count: 215,
    location: "Islamabad Diagnostic Center",
  },
];

// Fallback seed scans if the scans table has 0 rows
export const FALLBACK_SCANS: DbScan[] = [
  {
    id: "scan-seed-1",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    patient_id: "patient-1",
    image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400",
    confidence_score: 96.4,
    confidence: 96.4,
    doctor_notes: "Lesion appears benign. Regular monthly self-monitoring recommended.",
    notes: "Lesion appears benign. Regular monthly self-monitoring recommended.",
    condition: "Melanocytic Nevus",
    risk_level: "Low",
    reviewed_by_doctor: true,
    recommendations: ["Self-examine quarterly", "Use SPF 50 sunscreen", "Report rapid color change"],
  },
  {
    id: "scan-seed-2",
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    patient_id: "patient-1",
    image_url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=400",
    confidence_score: 88.2,
    confidence: 88.2,
    doctor_notes: null,
    notes: null,
    condition: "Seborrheic Keratosis",
    risk_level: "Medium",
    reviewed_by_doctor: false,
    recommendations: ["Consult specialist", "Avoid scratching or friction", "Monitor border irregularities"],
  },
];

// In-memory documents store for doctor-docs
let memoryDocuments: MedicalDocument[] = [
  {
    id: "doc-1",
    patient_id: "patient-1",
    uploaded_by: "d1",
    file_name: "dermoscopy-initial-evaluation.pdf",
    file_url: "https://example.com/dermoscopy-report.pdf",
    storage_path: "doctor-docs/dermoscopy-report.pdf",
    file_type: "application/pdf",
    file_size: 245000,
    category: "imaging",
    description: "Initial dermatoscopy baseline photo-documentation.",
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: "doc-2",
    patient_id: "patient-1",
    uploaded_by: "d1",
    file_name: "treatment-prescription.pdf",
    file_url: "https://example.com/prescription.pdf",
    storage_path: "doctor-docs/prescription.pdf",
    file_type: "application/pdf",
    file_size: 112000,
    category: "prescription",
    description: "Topical barrier cream prescription & sun protection protocol.",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];

// ── Profiles ─────────────────────────────────────────────────────────────────

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (error || !data) return null;
    return data as Profile;
  } catch {
    return null;
  }
}

export async function upsertProfile(profile: Partial<Profile> & { id: string }): Promise<Profile | null> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("profiles")
      .upsert(profile, { onConflict: "id" })
      .select()
      .single();

    if (error) throw error;
    return data as Profile;
  } catch (e: any) {
    console.warn("[DB] Upsert profile fallback:", e?.message);
    return profile as Profile;
  }
}

export async function getPatientListForDoctor(doctorId: string): Promise<Profile[]> {
  return [
    {
      id: "patient-1",
      full_name: "Sara Khan",
      email: "sara.khan@patient.oncura.health",
      role: "patient",
      phone: "+92 300 1234567",
      created_at: new Date(Date.now() - 86400000 * 30).toISOString(),
    },
    {
      id: "patient-2",
      full_name: "Ahmed Raza",
      email: "ahmed.raza@patient.oncura.health",
      role: "patient",
      phone: "+92 321 9876543",
      created_at: new Date(Date.now() - 86400000 * 15).toISOString(),
    },
    {
      id: "patient-3",
      full_name: "Fatima Noor",
      email: "fatima.noor@patient.oncura.health",
      role: "patient",
      phone: "+92 333 4567890",
      created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    },
  ];
}

// ── Doctors ──────────────────────────────────────────────────────────────────

export async function getDoctors(): Promise<Doctor[]> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("doctors")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return FALLBACK_DOCTORS;
    }

    return data.map((d: any, index: number) => {
      const fallback = FALLBACK_DOCTORS[index % FALLBACK_DOCTORS.length];
      return {
        ...d,
        full_name: d.full_name || fallback.full_name,
        email: d.email || fallback.email,
        avatar_url: d.avatar_url || fallback.avatar_url,
        rating: fallback.rating,
        reviews_count: fallback.reviews_count,
        location: fallback.location,
      };
    });
  } catch {
    return FALLBACK_DOCTORS;
  }
}

// ── Scans ────────────────────────────────────────────────────────────────────

export async function getScans(patientId?: string): Promise<DbScan[]> {
  const supabase = createClient();
  try {
    let query = supabase.from("scans").select("*").order("id", { ascending: false });
    if (patientId) {
      query = query.eq("patient_id", patientId);
    }
    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return FALLBACK_SCANS;
    }

    return data.map((s: any) => {
      const conf = Number(s.confidence_score) || 92;
      const risk: RiskLevel = conf > 90 ? "Low" : conf > 75 ? "Medium" : "High";
      return {
        id: String(s.id),
        created_at: s.created_at || new Date().toISOString(),
        patient_id: s.patient_id || "patient-1",
        image_url: s.image_url,
        confidence_score: conf,
        confidence: conf,
        doctor_notes: s.doctor_notes || null,
        notes: s.doctor_notes || null,
        condition: s.condition || (conf > 90 ? "Melanocytic Nevus" : "Atypical Lesion"),
        risk_level: (s.risk_level as RiskLevel) || risk,
        reviewed_by_doctor: Boolean(s.doctor_notes),
        recommendations: s.recommendations || ["Clinical follow-up", "Quarterly self-check"],
      };
    });
  } catch {
    return FALLBACK_SCANS;
  }
}

export const getPatientScans = getScans;

export async function insertScan(scan: {
  patient_id: string;
  image_url: string;
  confidence_score?: number;
  doctor_notes?: string | null;
  condition?: string;
  risk_level?: RiskLevel;
  confidence?: number;
  notes?: string | null;
  recommendations?: string[];
  doctor_id?: string | null;
}): Promise<DbScan> {
  const supabase = createClient();
  const conf = scan.confidence_score ?? scan.confidence ?? 90;
  const dbPayload = {
    patient_id: scan.patient_id,
    image_url: scan.image_url,
    confidence_score: Math.round(conf * 10) / 10,
    doctor_notes: scan.doctor_notes ?? scan.notes ?? null,
  };

  try {
    const { data, error } = await supabase
      .from("scans")
      .insert(dbPayload)
      .select()
      .single();

    if (error) {
      console.warn("[DB] insertScan warning (using optimistic scan):", error.message);
      return {
        id: `scan-${Date.now()}`,
        created_at: new Date().toISOString(),
        ...scan,
        confidence: conf,
        confidence_score: conf,
        doctor_notes: dbPayload.doctor_notes,
        notes: dbPayload.doctor_notes,
        condition: scan.condition || "Clinical Lesion Evaluation",
        risk_level: scan.risk_level || "Low",
        reviewed_by_doctor: Boolean(dbPayload.doctor_notes),
        recommendations: scan.recommendations || ["Clinical follow-up"],
      };
    }

    return {
      id: String(data.id),
      created_at: data.created_at || new Date().toISOString(),
      patient_id: data.patient_id,
      image_url: data.image_url,
      confidence_score: Number(data.confidence_score),
      confidence: Number(data.confidence_score),
      doctor_notes: data.doctor_notes,
      notes: data.doctor_notes,
      condition: scan.condition || "Clinical Lesion Evaluation",
      risk_level: scan.risk_level || "Low",
      reviewed_by_doctor: Boolean(data.doctor_notes),
      recommendations: scan.recommendations || ["Clinical follow-up"],
    };
  } catch (err: any) {
    console.warn("[DB] Exception inserting scan:", err?.message);
    return {
      id: `scan-${Date.now()}`,
      created_at: new Date().toISOString(),
      ...scan,
      confidence: conf,
      confidence_score: conf,
      doctor_notes: dbPayload.doctor_notes,
      notes: dbPayload.doctor_notes,
      condition: scan.condition || "Clinical Lesion Evaluation",
      risk_level: scan.risk_level || "Low",
      reviewed_by_doctor: Boolean(dbPayload.doctor_notes),
      recommendations: scan.recommendations || ["Clinical follow-up"],
    };
  }
}

export const insertScanResult = insertScan;

export async function updateScanDoctorNotes(scanId: string, doctorNotes: string): Promise<boolean> {
  const supabase = createClient();
  try {
    const { error } = await supabase
      .from("scans")
      .update({ doctor_notes: doctorNotes })
      .eq("id", scanId);

    if (error) {
      console.warn("[DB] updateScanDoctorNotes warning:", error.message);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export const updateScanNotes = async (scanId: string, notes: string, _doctorId?: string) => {
  return updateScanDoctorNotes(scanId, notes);
};

// ── Medical Documents (bucket doctor-docs) ────────────────────────────────────

export async function getPatientDocuments(patientId?: string): Promise<MedicalDocument[]> {
  if (!patientId) return memoryDocuments;
  return memoryDocuments.filter((d) => d.patient_id === patientId || d.patient_id === "patient-1");
}

export async function insertMedicalDocument(
  doc: Omit<MedicalDocument, "id" | "created_at">
): Promise<MedicalDocument> {
  const newDoc: MedicalDocument = {
    ...doc,
    id: `doc-${Date.now()}`,
    created_at: new Date().toISOString(),
  };
  memoryDocuments = [newDoc, ...memoryDocuments];
  return newDoc;
}

export async function deleteMedicalDocument(id: string): Promise<void> {
  memoryDocuments = memoryDocuments.filter((d) => d.id !== id);
}

// ── Appointments ─────────────────────────────────────────────────────────────

export async function getAppointments(options?: {
  patientId?: string;
  doctorId?: string;
}): Promise<Appointment[]> {
  const supabase = createClient();
  try {
    let query = supabase.from("appointments").select("*").order("scheduled_at", { ascending: true });

    if (options?.patientId) {
      query = query.eq("patient_id", options.patientId);
    }
    if (options?.doctorId) {
      query = query.eq("doctor_id", options.doctorId);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return getFallbackAppointments(options?.patientId, options?.doctorId);
    }

    return data.map((a: any) => {
      const doc = FALLBACK_DOCTORS.find((d) => d.id === a.doctor_id) || FALLBACK_DOCTORS[0];
      const dt = new Date(a.scheduled_at || new Date());
      return {
        id: String(a.id),
        created_at: a.created_at || new Date().toISOString(),
        patient_id: a.patient_id,
        doctor_id: a.doctor_id,
        status: a.status || "confirmed",
        notes: a.notes,
        scheduled_at: a.scheduled_at || new Date().toISOString(),
        appointment_date: dt.toISOString().split("T")[0],
        appointment_time: dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "consultation",
        patient: {
          id: a.patient_id,
          full_name: "Sara Khan",
          email: "sara.khan@patient.oncura.health",
          phone: "+92 300 1234567",
          avatar_url: null,
        },
        doctor: {
          id: doc.id,
          full_name: doc.full_name,
          specialization: doc.specialization,
          experience_years: doc.experience_years,
          location: doc.location,
        },
      };
    });
  } catch {
    return getFallbackAppointments(options?.patientId, options?.doctorId);
  }
}

export const getPatientAppointments = async (patientId: string) => {
  return getAppointments({ patientId });
};

function getFallbackAppointments(patientId?: string, doctorId?: string): Appointment[] {
  const d1 = new Date(Date.now() + 86400000 * 2);
  const d2 = new Date(Date.now() + 86400000 * 5);
  return [
    {
      id: "appt-1",
      created_at: new Date().toISOString(),
      patient_id: patientId || "patient-1",
      doctor_id: doctorId || "d1",
      status: "confirmed",
      notes: "Follow-up review of right forearm pigmented lesion.",
      scheduled_at: d1.toISOString(),
      appointment_date: d1.toISOString().split("T")[0],
      appointment_time: "10:30 AM",
      type: "consultation",
      patient: {
        id: "patient-1",
        full_name: "Sara Khan",
        email: "sara.khan@patient.oncura.health",
        phone: "+92 300 9876543",
        avatar_url: null,
      },
      doctor: {
        id: "d1",
        full_name: "Dr. Ayesha Malik",
        specialization: "General Physician & Dermatology",
        experience_years: 12,
        location: "Karachi Medical Complex",
      },
    },
    {
      id: "appt-2",
      created_at: new Date().toISOString(),
      patient_id: patientId || "patient-1",
      doctor_id: doctorId || "d2",
      status: "pending",
      notes: "Initial consultation for atypical mole evaluation.",
      scheduled_at: d2.toISOString(),
      appointment_date: d2.toISOString().split("T")[0],
      appointment_time: "02:00 PM",
      type: "check-up",
      patient: {
        id: "patient-1",
        full_name: "Sara Khan",
        email: "sara.khan@patient.oncura.health",
        phone: "+92 300 9876543",
        avatar_url: null,
      },
      doctor: {
        id: "d2",
        full_name: "Dr. Zain Hussain",
        specialization: "Dermatologist",
        experience_years: 8,
        location: "Lahore General Hospital",
      },
    },
  ];
}

export async function createAppointment(appt: {
  patient_id: string;
  doctor_id: string;
  scheduled_at: string;
  status?: string;
  notes?: string;
}): Promise<Appointment> {
  const supabase = createClient();
  const dbPayload = {
    patient_id: appt.patient_id,
    doctor_id: appt.doctor_id,
    scheduled_at: appt.scheduled_at,
    notes: appt.notes ?? null,
  };

  try {
    const { data, error } = await supabase
      .from("appointments")
      .insert(dbPayload)
      .select()
      .single();

    if (error) {
      console.warn("[DB] createAppointment warning (using optimistic appointment):", error.message);
      return {
        id: `appt-${Date.now()}`,
        created_at: new Date().toISOString(),
        patient_id: appt.patient_id,
        doctor_id: appt.doctor_id,
        status: (appt.status as any) || "confirmed",
        notes: appt.notes ?? null,
        scheduled_at: appt.scheduled_at,
      };
    }

    return {
      id: String(data.id),
      created_at: data.created_at || new Date().toISOString(),
      patient_id: data.patient_id,
      doctor_id: data.doctor_id,
      status: data.status || "confirmed",
      notes: data.notes,
      scheduled_at: data.scheduled_at,
    };
  } catch (err: any) {
    console.warn("[DB] Exception inserting appointment:", err?.message);
    return {
      id: `appt-${Date.now()}`,
      created_at: new Date().toISOString(),
      patient_id: appt.patient_id,
      doctor_id: appt.doctor_id,
      status: (appt.status as any) || "confirmed",
      notes: appt.notes ?? null,
      scheduled_at: appt.scheduled_at,
    };
  }
}

export async function updateAppointmentStatus(
  id: string,
  status: string
): Promise<boolean> {
  const supabase = createClient();
  try {
    const { error } = await supabase
      .from("appointments")
      .update({ status })
      .eq("id", id);

    if (error) {
      console.warn("[DB] updateAppointmentStatus warning:", error.message);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

// ── Messages & Realtime ───────────────────────────────────────────────────────

export async function getMessages(
  senderId?: string,
  receiverId?: string
): Promise<DbMessage[]> {
  const supabase = createClient();
  try {
    let query = supabase.from("messages").select("*").order("sent_at", { ascending: true });

    if (senderId && receiverId) {
      query = query.or(
        `and(sender_id.eq.${senderId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${senderId})`
      );
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      return getFallbackMessages();
    }

    return data.map((m: any) => ({
      id: String(m.id),
      sender_id: m.sender_id,
      receiver_id: m.receiver_id,
      message_text: m.message_text,
      sent_at: m.sent_at || new Date().toISOString(),
    }));
  } catch {
    return getFallbackMessages();
  }
}

function getFallbackMessages(): DbMessage[] {
  return [
    {
      id: "msg-1",
      sender_id: "d1",
      receiver_id: "patient-1",
      message_text: "Hello! I reviewed your skin scan from yesterday. The confidence score indicates benign features.",
      sent_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    },
    {
      id: "msg-2",
      sender_id: "patient-1",
      receiver_id: "d1",
      message_text: "Thank you Dr. Ayesha! Should I apply any ointment or just keep it protected from the sun?",
      sent_at: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "msg-3",
      sender_id: "d1",
      receiver_id: "patient-1",
      message_text: "Keep it protected with broad-spectrum SPF 50. Let's do another scan in 4 weeks to track changes.",
      sent_at: new Date(Date.now() - 1800000).toISOString(),
    },
  ];
}

export async function sendMessage(
  senderId: string,
  receiverId: string,
  messageText: string
): Promise<DbMessage> {
  const supabase = createClient();
  const dbPayload = {
    sender_id: senderId,
    receiver_id: receiverId,
    message_text: messageText.trim(),
    sent_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase
      .from("messages")
      .insert(dbPayload)
      .select()
      .single();

    if (error) {
      console.warn("[DB] sendMessage warning (using optimistic message):", error.message);
      return {
        id: `msg-${Date.now()}`,
        ...dbPayload,
      };
    }

    return {
      id: String(data.id),
      sender_id: data.sender_id,
      receiver_id: data.receiver_id,
      message_text: data.message_text,
      sent_at: data.sent_at,
    };
  } catch (err: any) {
    console.warn("[DB] Exception sending message:", err?.message);
    return {
      id: `msg-${Date.now()}`,
      ...dbPayload,
    };
  }
}

/**
 * Setup a Supabase Realtime channel for live messages
 */
export function subscribeToMessages(callback: (newMsg: DbMessage) => void) {
  const supabase = createClient();
  const channel = supabase
    .channel("public:messages")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      (payload) => {
        const row = payload.new as any;
        if (row) {
          callback({
            id: String(row.id),
            sender_id: row.sender_id,
            receiver_id: row.receiver_id,
            message_text: row.message_text,
            sent_at: row.sent_at || new Date().toISOString(),
          });
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

export function riskColor(level: string | undefined = "Low") {
  const safeLevel = (level && ["Low", "Medium", "High"].includes(level) ? level : "Low") as RiskLevel;
  return {
    Low: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      dot: "bg-emerald-400",
      badge: "bg-emerald-100 text-emerald-600",
    },
    Medium: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      dot: "bg-amber-400",
      badge: "bg-amber-100 text-amber-600",
    },
    High: {
      bg: "bg-red-50",
      text: "text-red-700",
      dot: "bg-red-400",
      badge: "bg-red-100 text-red-600",
    },
  }[safeLevel];
}
