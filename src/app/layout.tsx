import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { FloatingNav } from "@/components/FloatingNav";
import { SafetyFooter } from "@/components/SafetyFooter";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta"
});

export const metadata: Metadata = {
  title: "oncura | Immersive AI Skin Detection",
  description: "Advanced AI skin cancer detection and care platform for early detection and skin health monitoring.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${plusJakarta.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <Header />
          <main className="flex-grow pt-12 pb-32 md:pb-12">
            {children}
          </main>
          <div className="md:hidden">
            <FloatingNav />
          </div>
          <SafetyFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
