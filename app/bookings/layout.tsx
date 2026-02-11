
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Tickets | Vibhava 2026",
  description: "Secure your spot for Vibhava 2026 events. Book tickets now!",
};

export default function BookingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
