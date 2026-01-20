import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio - Web Developer & Designer",
  description: "Профессиональная разработка современных веб-сайтов и приложений. Next.js, React, TypeScript, Tailwind CSS",
  keywords: ["web developer", "web design", "Next.js", "React", "TypeScript", "portfolio"],
  authors: [{ name: "Portfolio" }],
  openGraph: {
    title: "Portfolio - Web Developer & Designer",
    description: "Профессиональная разработка современных веб-сайтов и приложений",
    type: "website",
    locale: "ru_RU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - Web Developer & Designer",
    description: "Профессиональная разработка современных веб-сайтов и приложений",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFA500",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable}`}>
      <body className={`${inter.className} bg-slate-900`}>{children}</body>
    </html>
  );
}
