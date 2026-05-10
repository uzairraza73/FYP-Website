export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  email: string;
  phone: string;
  lastVisit: string;
  status: "Active" | "Follow-up" | "Recovered";
  skinHistory: {
    date: string;
    condition: string;
    riskLevel: "Low" | "Medium" | "High";
    confidence: number;
    notes: string;
  }[];
  appointments: {
    id: string;
    date: string;
    time: string;
    type: "Check-up" | "Biopsy" | "Consultation";
    status: "Upcoming" | "Completed" | "Cancelled";
  }[];
}

export const mockPatients: Patient[] = [
  {
    id: "p1",
    name: "Uzair Ahmad",
    age: 42,
    gender: "Male",
    bloodGroup: "O+",
    email: "uzair.ahmad@example.com",
    phone: "+923030042034",
    lastVisit: "2026-04-15",
    status: "Follow-up",
    skinHistory: [
      {
        date: "2026-04-15",
        condition: "Melanocytic Nevus",
        riskLevel: "Medium",
        confidence: 84,
        notes: "Slight irregular border observed. Patient reports recent itching."
      },
      {
        date: "2026-01-10",
        condition: "Benign Lesion",
        riskLevel: "Low",
        confidence: 92,
        notes: "Standard checkup. No significant changes."
      }
    ],
    appointments: [
      {
        id: "a1",
        date: "2026-05-15",
        time: "10:30 AM",
        type: "Consultation",
        status: "Upcoming"
      }
    ]
  },
  {
    id: "p2",
    name: "Ayesha Khan",
    age: 29,
    gender: "Female",
    bloodGroup: "A-",
    email: "ayesha.khan@example.com",
    phone: "+923451234567",
    lastVisit: "2026-05-02",
    status: "Active",
    skinHistory: [
      {
        date: "2026-05-02",
        condition: "Basal Cell Carcinoma",
        riskLevel: "High",
        confidence: 95,
        notes: "Urgent biopsy recommended. Lesion is pearly and translucent."
      }
    ],
    appointments: [
      {
        id: "a2",
        date: "2026-05-10",
        time: "02:00 PM",
        type: "Biopsy",
        status: "Upcoming"
      }
    ]
  },
  {
    id: "p3",
    name: "Muhammad Ali",
    age: 55,
    gender: "Male",
    bloodGroup: "B+",
    email: "muhammad.ali@example.com",
    phone: "+923129876543",
    lastVisit: "2026-03-20",
    status: "Recovered",
    skinHistory: [
      {
        date: "2026-03-20",
        condition: "Seborrheic Keratosis",
        riskLevel: "Low",
        confidence: 98,
        notes: "Non-cancerous growth confirmed. Cryotherapy performed."
      }
    ],
    appointments: [
      {
        id: "a3",
        date: "2026-06-15",
        time: "11:00 AM",
        type: "Check-up",
        status: "Upcoming"
      }
    ]
  }
];
