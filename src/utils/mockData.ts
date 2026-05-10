import { RiskLevel, ScanResult } from "@/store/useScanStore";

export const generateMockResult = (imageUrl: string): ScanResult => {
  const risks: RiskLevel[] = ["Low", "Medium", "High"];
  const selectedRisk = risks[Math.floor(Math.random() * risks.length)];
  
  const confidence = Math.floor(Math.random() * (99 - 85 + 1)) + 85; // 85-99%

  const recommendationsMap: Record<RiskLevel, string[]> = {
    Low: [
      "Continue using SPF 50+ daily",
      "Monitor for any changes in size or color",
      "Schedule your next routine skin check in 12 months",
      "Wear protective clothing during peak UV hours"
    ],
    Medium: [
      "Schedule a consultation with a dermatologist within 14 days",
      "Avoid sun exposure on the affected area",
      "Perform a monthly self-check of the spot",
      "Keep the area clean and well-moisturized"
    ],
    High: [
      "URGENT: Consult a specialist within 48-72 hours",
      "Do not attempt to treat or pick at the lesion",
      "Take high-resolution photos weekly to track changes",
      "Ensure the lesion is protected from any physical trauma"
    ]
  };

  const types = ["Mole (Nevus)", "Seborrheic Keratosis", "Potential Melanoma", "Basal Cell Carcinoma"];
  const type = selectedRisk === "High" ? types[2] : selectedRisk === "Medium" ? types[3] : types[Math.floor(Math.random() * 2)];

  return {
    id: Math.random().toString(36).substr(2, 9),
    date: new Date().toISOString(),
    imageUrl,
    confidence,
    riskLevel: selectedRisk,
    type,
    recommendations: recommendationsMap[selectedRisk]
  };
};
