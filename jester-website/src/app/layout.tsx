import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const SITE_URL = "https://jesterconsulting.nz";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Jester — Advisory, Workshops and Capability",
  description: "The independent voice in the room. Senior advisory, workshops, and capability — turning complexity into clear, defensible decisions.",
  keywords: ["advisory", "consulting", "strategy", "workshops", "data", "decision making", "regional impact"],
  authors: [{ name: "Malcolm Mersham" }],
  openGraph: {
    title: "Jester — Advisory, Workshops and Capability",
    description: "The independent voice in the room. Turning complexity into clear, defensible decisions.",
    images: [
      {
        url: "/favicon.ico",
        width: 512,
        height: 512,
        alt: "Jester logo",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`bg-background text-foreground ${fraunces.variable} ${instrumentSans.variable}`}>
      <body className="flex min-h-screen flex-col">
        <div className="motley" aria-hidden="true" />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}