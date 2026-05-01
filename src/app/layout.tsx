import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import CookieBanner from "@/components/layout/CookieBanner";
import PortfolioBadge from "@/components/layout/PortfolioBadge";
import BackToTop from "@/components/layout/BackToTop";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-heading',
  display: 'swap',
});

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-body',
  display: 'swap',
});

const SITE_URL = "https://obelisk.svilenkovic.rs";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "OBELISK — 3D Web Concept · Portfolio Demo",
    template: "%s | OBELISK"
  },
  description: "Portfolio koncept: imersivni 3D e-commerce sa scroll choreografijom, GSAP/Three.js, Next.js. Demo brend bez aktivne kupovine.",
  keywords: ["portfolio", "3d web", "next.js", "three.js", "gsap", "scroll animation", "e-commerce demo", "svilenkovic"],
  authors: [{ name: "D. Svilenković", url: "https://svilenkovic.com" }],
  creator: "D. Svilenković",
  publisher: "svilenkovic.com",
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "OBELISK — 3D Web Concept · Portfolio Demo",
    description: "Imersivni 3D e-commerce koncept. Scroll choreografija, GSAP, Three.js.",
    url: SITE_URL,
    siteName: "OBELISK",
    locale: "sr_RS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OBELISK — 3D Web Concept",
    description: "Imersivni 3D e-commerce koncept · portfolio demo.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="antialiased bg-background text-text-primary overflow-x-clip selection:bg-primary/30">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[200] focus:bg-primary focus:text-background focus:px-4 focus:py-2 focus:rounded">
          Pređi na glavni sadržaj
        </a>
        <PortfolioBadge />
        <SmoothScrollProvider>
          <Header />
          <main id="main-content" className="min-h-screen relative z-10 w-full overflow-x-clip">
            {children}
          </main>
          <Footer />
        </SmoothScrollProvider>
        <BackToTop />
        <CookieBanner />
      </body>
    </html>
  );
}
