
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

import localFont from "next/font/local";

const clashDisplay = localFont({
  src: "./fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash",
  weight: "200 700",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vibhava.cusat.co.in"),
  title: {
    default: "Vibhava 2026",
    template: "%s | Vibhava 2026",
  },
  description: "Experience the vibrant celebration of culture and innovation at Vibhava 2026.",
  keywords: ["Vibhava", "College Fest", "Events", "Schedule", "Speakers"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vibhava.cusat.co.in/",
    title: "Vibhava 2026 | Innovation Summit",
    description: "Experience the vibrant convergence of culture and innovation at Vibhava 2026, CUSAT's premier innovation summit.",
    siteName: "Vibhava 2026",
    images: [
      {
        url: "/logo-dark.svg",
        width: 1200,
        height: 630,
        alt: "Vibhava 2026 Innovation Summit",
      },
      {
        url: "/logo-dark.svg",
        width: 512,
        height: 512,
        alt: "Vibhava Logo",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/logo-light.svg", media: "(prefers-color-scheme: light)" },
      { url: "/logo-dark.svg", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/logo-dark.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibhava 2026 | Innovation Summit",
    description: "Experience the vibrant convergence of culture and innovation at Vibhava 2026, CUSAT's premier innovation summit.",
    images: ["/logo-dark.svg"],
  },
};

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${clashDisplay.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
