import type { Metadata } from "next";
import { Instrument_Serif, Geist } from "next/font/google";
import "./globals.css";
import React from "react";
import { SmoothScroll } from "@/components/SmoothScroll";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Coral Adventures | The Coast, Reimagined.",
  description: "A cinematic luxury travel experience on the Karnataka coast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${instrumentSerif.variable}`}>
      <body>
        <SmoothScroll>
          {/* Global tactile noise texture */}
          <div className="noise-overlay" aria-hidden="true" />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
