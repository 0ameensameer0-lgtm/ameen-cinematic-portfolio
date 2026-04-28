import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import { SiteProvider } from "@/components/providers/site-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Ameen Al-Yosofi | Cinematic IT Portfolio",
  description:
    "A cinematic futuristic portfolio experience for Ameen Sameer Ameen Al-Yosofi, IT Specialist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${mono.variable} ${orbitron.variable} bg-[#020817] text-white antialiased`}
      >
        <SiteProvider>{children}</SiteProvider>
      </body>
    </html>
  );
}
