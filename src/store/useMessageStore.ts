import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Message {
  id: string;
  from: "patient" | "doctor";
  text: string;
  timestamp: string;
  senderName: string;
}

export interface Conversation {
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  patientName: string;
  messages: Message[];
  lastUpdated: string;
}

interface MessageStore {
  conversations: Conversation[];
  sendMessage: (
    doctorId: string,
    doctorName: string,
    doctorSpecialty: string,
    patientName: string,
    text: string,
    from: "patient" | "doctor"
  ) => void;
  getConversation: (doctorId: string) => Conversation | undefined;
  getTotalUnread: () => number;
}

export const useMessageStore = create<MessageStore>()(
  persist(
    (set, get) => ({
      conversations: [
        // Seed with one initial conversation so the inbox isn't empty
        {
          doctorId: "d1",
          doctorName: "Dr. Ayesha Malik",
          doctorSpecialty: "General Physician",
          patientName: "Sara Khan",
          lastUpdated: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          messages: [
            {
              id: "seed-1",
              from: "doctor",
              text: "Hello! Welcome to ONCURA. I have reviewed your scan results. The lesion appears low-risk. Let's schedule a follow-up in 4 weeks.",
              timestamp: new Date(Date.now() - 1000 * 60 * 60).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              senderName: "Dr. Ayesha Malik",
            },
            {
              id: "seed-2",
              from: "patient",
              text: "Thank you Doctor! Should I be worried about any symptoms in the meantime?",
              timestamp: new Date(Date.now() - 1000 * 60 * 30).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              senderName: "Sara Khan",
            },
          ],
        },
      ],

      sendMessage: (doctorId, doctorName, doctorSpecialty, patientName, text, from) => {
        const newMsg: Message = {
          id: `msg-${Date.now()}`,
          from,
          text,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          senderName: from === "patient" ? patientName : doctorName,
        };

        set((state) => {
          const existing = state.conversations.find((c) => c.doctorId === doctorId);
          if (existing) {
            return {
              conversations: state.conversations.map((c) =>
                c.doctorId === doctorId
                  ? { ...c, messages: [...c.messages, newMsg], lastUpdated: new Date().toISOString() }
                  : c
              ),
            };
          } else {
            return {
              conversations: [
                ...state.conversations,
                {
                  doctorId,
                  doctorName,
                  doctorSpecialty,
                  patientName,
                  messages: [newMsg],
                  lastUpdated: new Date().toISOString(),
                },
              ],
            };
          }
        });
      },

      getConversation: (doctorId) => {
        return get().conversations.find((c) => c.doctorId === doctorId);
      },

      getTotalUnread: () => {
        // Simple heuristic: conversations with last message from doctor = unread
        return get().conversations.filter(
          (c) => c.messages.length > 0 && c.messages[c.messages.length - 1].from === "doctor"
        ).length;
      },
    }),
    { name: "oncura-messages" }
  )
);
