import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const SITE_URL = "https://macasoft.com.ar";

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

export const viewport: Viewport = {
  themeColor: "#080D1A",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Macasoft — Ingeniería de Software & Sistemas Críticos | Patagonia Argentina",
    template: "%s | Macasoft",
  },
  description:
    "Empresa de ingeniería de software, plataformas B2B, sistemas críticos de código robusto y punto de venta Offline-First (Ventus) desde Río Gallegos, Santa Cruz, Patagonia Argentina.",
  applicationName: "Macasoft",
  authors: [{ name: "Macasoft", url: SITE_URL }],
  creator: "Macasoft",
  publisher: "Macasoft",
  category: "technology",
  keywords: [
    "Macasoft",
    "desarrollo de software Río Gallegos",
    "empresa de software Santa Cruz",
    "software Patagonia Argentina",
    "software a medida",
    "código robusto",
    "sistemas críticos",
    "Ventus POS",
    "sistema punto de venta offline",
    "POS offline-first",
    "plataformas B2B",
    "e-commerce B2B Argentina",
    "arquitectura cloud",
    "consultoría de ingeniería de software",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "es-AR": "/",
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/brand/macasoft-symbol-color-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
    apple: [
      { url: "/brand/macasoft-symbol-color-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    siteName: "Macasoft",
    title: "Macasoft — Ingeniería de Software & Sistemas Críticos desde la Patagonia",
    description:
      "Desarrollamos ecosistemas de código robusto, plataformas comerciales B2B y sistemas POS Offline-First (Ventus) desde Río Gallegos, Santa Cruz.",
    images: [
      {
        url: "/videos/maca-tobiano-poster.jpg",
        width: 1280,
        height: 720,
        alt: "Macasoft — Ingeniería de software concebida en la Patagonia Austral",
      },
      {
        url: "/brand/macasoft-logo-color-whitebg.png",
        width: 1200,
        height: 630,
        alt: "Logo Oficial de Macasoft",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Macasoft — Ingeniería de Software desde la Patagonia Austral",
    description:
      "Sistemas críticos, código robusto, plataformas B2B y sistema POS Offline-First Ventus. Río Gallegos, Santa Cruz.",
    images: ["/videos/maca-tobiano-poster.jpg"],
  },
  other: {
    "geo.region": "AR-Z",
    "geo.placename": "Río Gallegos, Santa Cruz, Argentina",
    "geo.position": "-51.6322;-69.2189",
    ICBM: "-51.6322, -69.2189",
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE_URL}/#organization`,
      name: "Macasoft",
      alternateName: "Macasoft",
      url: SITE_URL,
      logo: `${SITE_URL}/brand/macasoft-logo-color-whitebg.png`,
      image: `${SITE_URL}/videos/maca-tobiano-poster.jpg`,
      description:
        "Empresa de ingeniería de software, sistemas críticos de código robusto, plataformas B2B e infraestructura cloud desde Río Gallegos, Santa Cruz, Patagonia Argentina.",
      email: "hola@macasoft.com.ar",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Río Gallegos",
        addressRegion: "Santa Cruz",
        addressCountry: "AR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -51.6322,
        longitude: -69.2189,
      },
      areaServed: [
        {
          "@type": "Country",
          name: "Argentina",
        },
        {
          "@type": "AdministrativeArea",
          name: "Patagonia Argentina",
        },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "hola@macasoft.com.ar",
        contactType: "customer support",
        availableLanguage: ["Spanish"],
      },
      knowsAbout: [
        "Ingeniería de Software",
        "Sistemas Críticos",
        "Arquitectura Offline-First",
        "Plataformas E-commerce B2B",
        "Infraestructura Cloud",
        "Java",
        "Spring Boot",
        "PostgreSQL",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Macasoft",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      inLanguage: "es-AR",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#ventus`,
      name: "Ventus",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, Windows, Linux, macOS",
      description:
        "Sistema POS Offline-First con sincronización automática en la nube y panel backoffice para control de ventas, cajas, productos y sucursales en tiempo real.",
      creator: {
        "@id": `${SITE_URL}/#organization`,
      },
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        areaServed: "AR",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es-AR"
      className={`${geistSans.variable} ${geistMono.variable} ${josefinSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0F172A] text-[#F8FAFC] selection:bg-[#0284C7]/40 selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
        {children}
      </body>
    </html>
  );
}

