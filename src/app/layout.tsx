import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sound Therapy | Frequency Healing",
  description: "Scientifically-crafted frequencies for deep relaxation, enhanced focus, and restorative sleep. Experience binaural beats, isochronic tones, and healing frequencies.",
  keywords: ["sound therapy", "binaural beats", "frequency healing", "meditation", "sleep", "focus", "relaxation"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-900 text-slate-100 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
