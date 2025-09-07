import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ResumeAI - AI-Powered Resume Builder",
  description: "Create professional, ATS-optimized resumes with AI assistance. Privacy-first, free forever.",
  keywords: "resume builder, AI resume, ATS optimization, professional resume, job application",
  authors: [{ name: "ResumeAI Team" }],
  openGraph: {
    title: "ResumeAI - AI-Powered Resume Builder",
    description: "Create professional, ATS-optimized resumes with AI assistance. Privacy-first, free forever.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
