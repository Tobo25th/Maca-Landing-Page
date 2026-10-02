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

export const metadata: Metadata = {
  title: "Macasoft — Software desde el sur del mundo",
  description:
    "Macasoft es una startup tecnológica boutique de Río Gallegos, Patagonia Argentina. Desarrollamos software a medida, plataformas de alto impacto para productores y emprendimientos, y soluciones digitales con identidad patagónica.",
  keywords: [
    "Macasoft",
    "software a medida",
    "Río Gallegos",
    "Patagonia",
    "desarrollo web",
    "productores y emprendimientos",
    "soluciones digitales",
    "startup tecnológica",
  ],
  openGraph: {
    title: "Macasoft — Software desde el sur del mundo",
    description:
      "Startup tecnológica boutique de Río Gallegos, Patagonia Argentina.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0C0C0C] text-[#F3F4F6] selection:bg-[#FFB300]/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
