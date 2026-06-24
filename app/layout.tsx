import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Youssef Mahfouz — Data-Driven Finance Professional",
  description:
    "Portfolio of Youssef Mohamed Mahfouz — Financial Analyst, Power BI Specialist, and CIB-trained finance professional bridging data analytics with business intelligence.",
  keywords: [
    "Financial Analyst",
    "Power BI",
    "Data Analytics",
    "Business Intelligence",
    "CIB",
    "Portfolio",
  ],
  authors: [{ name: "Youssef Mohamed Mahfouz" }],
  openGraph: {
    title: "Youssef Mahfouz — Data-Driven Finance Professional",
    description:
      "Financial Analyst & Power BI Specialist. CIB-trained professional bridging data analytics with business intelligence.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
