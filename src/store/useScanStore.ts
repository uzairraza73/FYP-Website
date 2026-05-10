import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface ScanResult {
  id: string;
  date: string;
  imageUrl: string;
  confidence: number;
  riskLevel: RiskLevel;
  type: string;
  recommendations: string[];
}

interface ScanState {
  history: ScanResult[];
  currentScan: ScanResult | null;
  isScanning: boolean;
  addScan: (scan: ScanResult) => void;
  setCurrentScan: (scan: ScanResult | null) => void;
  setIsScanning: (status: boolean) => void;
  clearHistory: () => void;
}

export const useScanStore = create<ScanState>()(
  persist(
    (set) => ({
      history: [],
      currentScan: null,
      isScanning: false,
      addScan: (scan) => set((state) => ({ history: [scan, ...state.history] })),
      setCurrentScan: (scan) => set({ currentScan: scan }),
      setIsScanning: (status) => set({ isScanning: status }),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'dermvibe-storage',
    }
  )
);
