import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const josefinSans = localFont({
  src: "./fonts/JosefinSans-Variable.ttf",
  variable: "--font-josefin",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Macasoft — Software desde el sur del mundo",
  description:
    "Macasoft es una empresa de ingeniería de software e infraestructura cloud de Río Gallegos, Patagonia Argentina. Inspirada en la resiliencia del Macá Tobiano.",
  keywords: [
    "Macasoft",
    "software a medida",
    "Río Gallegos",
    "Patagonia Austral",
    "Macá Tobiano",
    "cloud infrastructure",
    "desarrollo web",
    "sistemas críticos",
  ],
  icons: {
    icon: "/brand/macasoft-symbol-color.svg",
    shortcut: "/app/favicon.ico",
  },
  openGraph: {
    title: "Macasoft — Software desde el sur del mundo",
    description:
      "Ingeniería de software de alta precisión desde Río Gallegos, Patagonia Austral.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${josefinSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0F172A] text-[#F8FAFC] selection:bg-[#0284C7]/40 selection:text-white">
        {children}
      </body>
    </html>
  );
}

