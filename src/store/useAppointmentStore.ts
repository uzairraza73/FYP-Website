import { create } from "zustand";

export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  doctorId: string;
  date: string;
  day: string;
  time: string;
  status: "Pending" | "Confirmed" | "Completed";
  bookedAt: string;
}

interface AppointmentStore {
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, "id" | "bookedAt">) => void;
  getDoctorAppointments: (doctorId: string) => Appointment[];
}

export const useAppointmentStore = create<AppointmentStore>((set, get) => ({
  appointments: [],
  addAppointment: (appointment) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Math.random().toString(36).substring(7),
      bookedAt: new Date().toISOString(),
    };
    set((state) => ({
      appointments: [newAppointment, ...state.appointments],
    }));
  },
  getDoctorAppointments: (doctorId) => {
    return get().appointments.filter((a) => a.doctorId === doctorId);
  },
}));
