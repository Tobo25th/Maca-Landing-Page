"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HeroCards,
  HeroSpeciesCard,
  HeroLocationBadge,
} from "@/components/HeroCards";

/* ─────────────────────────────────────────────
   MOTION PRESETS (DISCIPLINED & RESTRAINED)
   ───────────────────────────────────────────── */

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: easeOutExpo },
  }),
};

/* ─────────────────────────────────────────────
   NAVIGATION BAR (EDITORIAL & MINIMALIST)
   ───────────────────────────────────────────── */

export function EditorialNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Ingeniería", href: "/#ingenieria" },
    { label: "Sistemas Robustos", href: "/#sistemas" },
    { label: "Bitácora Austral", href: "/#bitacora" },
    { label: "Contacto", href: "/#contacto" },
  ];

  return (
    <nav className="sticky top-0 z-40 bg-[#080D1A]/90 backdrop-blur-xl border-b border-slate-800/80 px-6 md:px-12 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Lockup */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative w-36 sm:w-44 h-8">
            <Image
              src="/brand/macasoft-logo-dark.svg"
              alt="Macasoft — Software desde la Patagonia Austral"
              fill
              priority
              className="object-contain object-left"
            />
          </div>
          <span className="hidden xl:inline-block font-mono text-[10px] tracking-widest text-[#0EA5E9] bg-sky-950/60 border border-sky-500/20 px-2 py-0.5 rounded">
            51°37′S 69°13′W
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-sans text-slate-300 hover:text-white transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/#contacto"
            className="text-xs font-sans font-semibold uppercase tracking-wider text-white bg-[#0284C7] hover:bg-[#0369A1] px-5 py-2.5 rounded-lg transition-colors duration-200"
          >
            Iniciar Consulta
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-slate-300 p-2 rounded-lg border border-slate-700 bg-slate-900"
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span
              className={`block h-0.5 bg-white transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-[4px]" : ""
                }`}
            />
            <span
              className={`block h-0.5 bg-white transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-[4px]" : ""
                }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-[#080D1A] border-t border-slate-800 mt-4 py-6 flex flex-col gap-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-josefin font-bold text-slate-200 hover:text-[#0EA5E9]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-[#0284C7] text-white text-center py-3 rounded-lg font-semibold mt-2"
            >
              Iniciar Consulta
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   HERO WITH INTEGRATED FULL-WIDTH 100VW VIDEO BACKGROUND
   Video sits directly behind "Ingeniería de software concebida en el fin del mundo"
   without cropping or obstructing the bird on the right.
   ───────────────────────────────────────────── */

export function HeroWithIntegratedVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => { });
        }
      });
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative w-full min-h-[90vh] lg:min-h-[94vh] flex flex-col justify-between pt-5 pb-10 px-6 md:px-12 overflow-hidden border-b border-slate-800/80 bg-[#080D1A]">
      {/* 100vw Full-Width Video Background Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          poster="/videos/maca-tobiano-poster.jpg"
          onLoadedData={() => setIsLoaded(true)}
          className={`w-full h-full object-cover object-[62%_58%] transition-opacity duration-1000 ${isLoaded ? "opacity-90 md:opacity-95" : "opacity-30"
            }`}
        >
          <source src="/videos/maca-tobiano.mp4" type="video/mp4" />
          <source src="/videos/maca-tobiano.webm" type="video/webm" />
        </video>

        {/* Calibrated Gradient Overlays: Dark on left to protect text, clear on right so the bird is 100% visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080D1A]/95 via-[#080D1A]/75 to-transparent md:to-[#080D1A]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080D1A] via-transparent to-[#080D1A]/50" />
      </div>

      {/* Top Tag: Biological & Geographical Coordinates */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <HeroLocationBadge />
      </div>

      {/* Main Headline & Narrative: Positioned on Left so the Bird is 100% Visible on Right */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Left Column: The Big Punchy Headline */}
          <div className="lg:col-span-8 space-y-6 max-w-3xl">
            <h1 className="font-josefin font-bold text-4xl sm:text-6xl lg:text-7xl xl:text-[5.2rem] text-[#F8FAFC] tracking-tight leading-[1.02] drop-shadow-[0_8px_32px_rgba(0,0,0,0.95)]">
              Soluciones de software concebidas en los vientos fuertes del sur.
            </h1>

            {/* Hero Cards: Componente editable */}
            <HeroCards />
          </div>

          {/* Right Column: Open space where the Macá Tobiano is swimming */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-end pointer-events-none">
            <HeroSpeciesCard />
          </div>
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between gap-4 pt-4 border-t border-slate-800/60">
        <div className="text-xs font-mono text-slate-400">
          Santa Cruz, Patagonia Austral · <span className="text-slate-300">51°37′56″S 69°13′08″W</span>
        </div>

        {/* Video Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono uppercase bg-[#0F172A]/85 hover:bg-[#0284C7] text-white border border-sky-500/30 transition-all cursor-pointer shadow-lg"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-[#E11D48] animate-pulse" : "bg-slate-500"
                }`}
            />
            <span>{isPlaying ? "Pausar Video" : "Reproducir"}</span>
          </button>

          <button
            onClick={toggleMute}
            type="button"
            className="p-1.5 rounded-lg text-xs bg-[#0F172A]/85 hover:bg-[#0284C7] text-white border border-sky-500/30 transition-all cursor-pointer shadow-lg"
            title={isMuted ? "Activar audio" : "Silenciar"}
          >
            {isMuted ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ENGINEERING DISCIPLINES (NO CARTOONISH NUMBERS)
   ───────────────────────────────────────────── */

export function EngineeringPillars() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const pillars = [
    {
      title: "Sistemas Críticos & Código Robusto",
      summary:
        "Arquitectura concebida desde cero para entornos que no admiten latencias imprevistas ni caídas en cascada.",
      capabilities: [
        "Modelos de concurrencia aislada",
        "Tolerancia a particiones (CAP)",
        "Transacciones ACID distribuidas",
        "Cold-start ultra bajo",
      ],
      borderAccent: "border-sky-500/40",
    },
    {
      title: "Plataformas de Producto & E-commerce B2B",
      summary:
        "Sistemas web y móviles para distribuidores, productores locales y empresas que demandan transacciones sin fricción.",
      capabilities: [
        "Renderizado híbrido de alta velocidad",
        "Microinteracciones funcionales",
        "Logística y stock en tiempo real",
        "Integración con ERPs y banca local",
      ],
      borderAccent: "border-[#D9531E]/40",
    },
  ];

  return (
    <section id="ingenieria" ref={ref} className="py-24 md:py-32 px-6 md:px-12 bg-[#080D1A] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto mb-16 space-y-4 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-[#0EA5E9] font-semibold block">
            Metodología de Desarrollo
          </span>
          <h2 className="font-josefin font-bold text-3xl md:text-5xl text-[#F8FAFC] tracking-tight leading-tight">
            Pilares de ingeniería con foco en robustez antes que ornamentación.
          </h2>
        </div>

        {/* 2 Centered Editorial Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto justify-center">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              className={`p-8 rounded-2xl bg-[#0F172A]/70 border border-slate-800 hover:${pillar.borderAccent} transition-all duration-300 flex flex-col justify-between space-y-8 cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-sky-950/40`}
              variants={fadeInUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              whileHover={{ y: -8, scale: 1.015 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              custom={i}
            >
              <div className="space-y-4">
                <h3 className="font-josefin font-bold text-2xl text-white leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {pillar.summary}
                </p>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-800/80">
                <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
                  Especificación Técnica
                </span>
                <ul className="space-y-2">
                  {pillar.capabilities.map((cap) => (
                    <li key={cap} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PORTAFOLIO DE SISTEMAS (CENTRADOS)
   ───────────────────────────────────────────── */

const proprietarySystems = [
  {
    id: "ventus",
    name: "Ventus",
    category: "Gestión Operativa & Comercial",
    tagline: "Cobra al instante y sin interrupciones, con o sin conexión a internet. Toda la actividad de tus cajas se actualiza de forma automática y segura en la nube, dándote control total de tus productos, ventas y sucursales en tiempo real.",
    stack: "Java · Spring-Boot · PostgreSQL",
    architecture:
      "Sistema POS centralizado en la premisa de Offline First con un panel backoffice para la gestión de las ventas y stock",
    status: "En Producción",
    statusDot: "bg-emerald-400",
    color: "#0284C7",
  },
];

export function SystemsDossier() {
  return (
    <section id="sistemas" className="py-24 md:py-32 px-6 md:px-12 bg-[#0F172A] border-t border-slate-800">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="max-w-3xl mx-auto space-y-4 text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-[#D9531E] font-semibold block">
            Portafolio de Sistemas
          </span>
          <h2 className="font-josefin font-bold text-3xl md:text-5xl text-white tracking-tight leading-tight">
            Plataformas desarrolladas para entornos reales.
          </h2>
          <p className="text-slate-300 text-base md:text-lg font-light">
            Sistemas robustos en operación, concebidos con foco en resiliencia, alta disponibilidad y continuidad operativa.
          </p>
        </div>

        {/* Centered Ventus Card */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-2xl">
            {proprietarySystems.map((item) => (
              <div
                key={item.id}
                className="bg-[#080D1A]/90 border border-slate-800/90 hover:border-sky-500/50 rounded-2xl p-7 md:p-9 flex flex-col justify-between space-y-6 transition-all duration-300 group hover:-translate-y-1 shadow-xl hover:shadow-sky-950/20"
              >
                <div className="space-y-5">
                  {/* Status + Category Header */}
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-800/80">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                      {item.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-[10px] font-mono text-slate-200">
                      <span className={`w-1.5 h-1.5 rounded-full ${item.statusDot}`} />
                      <span>{item.status}</span>
                    </span>
                  </div>

                  {/* Title & Accent */}
                  <div className="space-y-1">
                    <h3 className="font-josefin font-bold text-2xl md:text-3xl text-white group-hover:text-sky-300 transition-colors">
                      {item.name}
                    </h3>
                    <div
                      className="w-10 h-0.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>

                  {/* Tagline */}
                  <p className="text-slate-200 text-sm md:text-base leading-relaxed font-sans">
                    {item.tagline}
                  </p>

                  {/* Architecture Brief */}
                  <div className="p-4 rounded-xl bg-[#0F172A]/70 border border-slate-800 space-y-1.5">
                    <span className="font-mono text-[10px] uppercase text-[#0EA5E9] tracking-wider block font-semibold">
                      Topología
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.architecture}
                    </p>
                  </div>
                </div>

                {/* Stack + CTA Footer */}
                <div className="pt-4 border-t border-slate-800/80 space-y-4">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] uppercase text-slate-400 tracking-wider block">
                      Stack Principal
                    </span>
                    <p className="font-mono text-xs text-slate-200 font-medium">
                      {item.stack}
                    </p>
                  </div>

                  <a
                    href="#contacto"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#0EA5E9] group-hover:text-white transition-colors"
                  >
                    <span>Consultar caso de despliegue</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   BITÁCORA AUSTRAL: PATAGONIA & SÍMBOLO OFICIAL
   ───────────────────────────────────────────── */

export function FieldNotesSection() {
  return (
    <section id="bitacora" className="py-24 md:py-32 px-6 md:px-12 bg-[#080D1A] border-t border-slate-800 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Territorial Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="font-mono text-xs uppercase tracking-widest text-[#0EA5E9] font-semibold">
                Territorio & Filosofía de Ingeniería
              </span>
              <h2 className="font-josefin font-bold text-3xl md:text-5xl text-white tracking-tight leading-tight">
                La Patagonia como estándar de resiliencia de software.
              </h2>
            </div>

            <div className="space-y-5 text-slate-300 leading-relaxed text-base md:text-lg pt-4 border-t border-slate-800/80 font-light">
              <p>
                El <strong className="text-white font-medium">Macá Tobiano</strong> (<em>Podiceps gallardoi</em>) habita las mesetas basálticas de Santa Cruz a más de 1.200 metros sobre el nivel del mar, en un entorno donde los vientos catabáticos superan regularmente los 110 kilómetros por hora. No emigra hacia latitudes cálidas: bucea, resiste y nidifica en las aguas australes más implacables.
              </p>

              <p>
                Esa misma tenacidad guía la ingeniería de <strong className="text-white font-medium">Macasoft</strong>. Operar desde Río Gallegos nos impone diseñar sistemas que toleren desconexiones físicas de enlace, particiones de red y demandas de tráfico sin margen de falla.
              </p>

              <p>
                No construimos software frágil que dependa de condiciones ideales de laboratorio. Escribimos arquitectura sólida, con aislamiento estricto de errores y código pensado para perdurar.
              </p>
            </div>
          </div>

          {/* Right Column: Official Symbol Showcase */}
          <div className="lg:col-span-5">
            <div className="relative bg-[#0F172A]/80 border border-slate-800/90 hover:border-sky-500/40 transition-colors duration-300 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-md flex flex-col items-center text-center space-y-6">
              {/* Corner crosshairs */}
              <span className="absolute top-3 left-3 text-slate-700 font-mono text-xs select-none">+</span>
              <span className="absolute top-3 right-3 text-slate-700 font-mono text-xs select-none">+</span>
              <span className="absolute bottom-3 left-3 text-slate-700 font-mono text-xs select-none">+</span>
              <span className="absolute bottom-3 right-3 text-slate-700 font-mono text-xs select-none">+</span>

              {/* The Official Symbol SVG */}
              <div className="relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center p-3 rounded-2xl bg-[#080D1A]/70 border border-slate-800/80 shadow-inner group">
                <div className="absolute inset-0 bg-sky-500/10 rounded-2xl blur-xl pointer-events-none" />
                <Image
                  src="/brand/macasoft-symbol-dark.svg"
                  alt="Símbolo Oficial de Macasoft"
                  width={176}
                  height={176}
                  className="relative z-10 w-full h-full object-contain drop-shadow-[0_12px_24px_rgba(2,132,199,0.3)] group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Identity & Origin */}
              <div className="space-y-1.5">
                <span className="font-mono text-[11px] uppercase tracking-widest text-[#0EA5E9] block font-semibold">
                  Símbolo Oficial
                </span>
                <h3 className="font-josefin font-bold text-2xl text-white tracking-wide">
                  MACASOFT
                </h3>
                <p className="text-xs text-slate-400 font-mono leading-relaxed max-w-xs">
                  Inspirado en la silueta y tenacidad del Macá Tobiano frente al viento austral.
                </p>
              </div>

              <div className="w-full pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Río Gallegos, Santa Cruz</span>
                <span className="text-[#0EA5E9]">51°37′S 69°13′W</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TECHNICAL CONSULTATION TERMINAL (REPLACES 3-INPUT FORM)
   ───────────────────────────────────────────── */

export function ConsultationTerminal() {
  const [selectedScopes, setSelectedScopes] = useState<string[]>([
    "Sistemas Críticos & Código Robusto",
  ]);
  const [formData, setFormData] = useState({
    nombre: "",
    organizacion: "",
    email: "",
    mensaje: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const scopeOptions = [
    "Sistemas Críticos & Código Robusto",
    "Plataforma Web / Móvil de Alto Rendimiento",
    "Auditoría Técnica, Latencia & Seguridad",
  ];

  const toggleScope = (scope: string) => {
    if (selectedScopes.includes(scope)) {
      if (selectedScopes.length > 1) {
        setSelectedScopes(selectedScopes.filter((s) => s !== scope));
      }
    } else {
      setSelectedScopes([...selectedScopes, scope]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ nombre: "", organizacion: "", email: "", mensaje: "" });
  };

  return (
    <section id="contacto" className="py-24 md:py-32 px-6 md:px-12 bg-[#0F172A] border-t border-slate-800">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="max-w-3xl space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-[#0EA5E9] font-semibold">
            Consulta de Ingeniería
          </span>
          <h2 className="font-josefin font-bold text-3xl md:text-5xl text-white tracking-tight leading-tight">
            Inicia un requerimiento o evaluación arquitectónica.
          </h2>
          <p className="text-slate-300 text-base">
            Analizamos tu infraestructura, requerimientos de concurrencia y modelo de despliegue.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Scope & Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-6 rounded-2xl bg-[#080D1A] border border-slate-800 space-y-4">
              <span className="font-mono text-xs uppercase tracking-wider text-slate-400 block font-semibold">
                Alcance Técnico
              </span>
              <div className="space-y-2">
                {scopeOptions.map((scope) => {
                  const active = selectedScopes.includes(scope);
                  return (
                    <button
                      key={scope}
                      type="button"
                      onClick={() => toggleScope(scope)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-mono transition-all flex items-center justify-between border ${active
                        ? "bg-[#0284C7]/20 border-[#0284C7] text-white font-medium"
                        : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                    >
                      <span>{scope}</span>
                      <span>{active ? "✓" : "+"}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#080D1A] border border-slate-800 space-y-4 text-xs font-mono">
              <div>
                <span className="text-slate-500 uppercase block mb-1">Correo Directo</span>
                <a href="mailto:hola@macasoft.com.ar" className="text-base font-sans text-white hover:text-[#0EA5E9]">
                  hola@macasoft.com.ar
                </a>
              </div>
              <div className="pt-3 border-t border-slate-800">
                <span className="text-slate-500 uppercase block mb-1">Base de Operaciones</span>
                <p className="text-slate-300 font-sans">
                  Río Gallegos, Santa Cruz, Patagonia Argentina
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-8 md:p-10 rounded-2xl bg-[#080D1A] border border-slate-800 space-y-6 shadow-xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="form-nombre" className="font-mono text-xs uppercase tracking-wider text-slate-300 block mb-2">
                    Tu Nombre
                  </label>
                  <input
                    id="form-nombre"
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#0284C7] transition-colors"
                    placeholder="Ej. Martín Gallardo"
                  />
                </div>

                <div>
                  <label htmlFor="form-org" className="font-mono text-xs uppercase tracking-wider text-slate-300 block mb-2">
                    Organización o Empresa
                  </label>
                  <input
                    id="form-org"
                    type="text"
                    required
                    value={formData.organizacion}
                    onChange={(e) => setFormData({ ...formData, organizacion: e.target.value })}
                    className="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#0284C7] transition-colors"
                    placeholder="Ej. Distribuidora Patagónica"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="form-email" className="font-mono text-xs uppercase tracking-wider text-slate-300 block mb-2">
                  Correo Electrónico
                </label>
                <input
                  id="form-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#0284C7] transition-colors"
                  placeholder="martin@empresa.com.ar"
                />
              </div>

              <div>
                <label htmlFor="form-msg" className="font-mono text-xs uppercase tracking-wider text-slate-300 block mb-2">
                  Desafío Técnico o Proyecto
                </label>
                <textarea
                  id="form-msg"
                  required
                  rows={4}
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  className="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#0284C7] transition-colors resize-none"
                  placeholder="Describe el flujo actual, volumen de datos o arquitectura esperada..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#0284C7] hover:bg-[#0369A1] text-white font-sans text-sm font-semibold tracking-wide py-4 rounded-lg transition-colors cursor-pointer"
              >
                {submitted ? "✓ Requerimiento recibido · Evaluaremos los parámetros técnicos" : "Enviar Solicitud Técnica"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   COLOPHON & FOOTER
   ───────────────────────────────────────────── */

export function EditorialFooter() {
  return (
    <footer className="border-t border-slate-800 bg-[#080D1A] px-6 md:px-12 py-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="relative w-28 h-7 block">
              <Image
                src="/brand/macasoft-logo-dark.svg"
                alt="Macasoft"
                fill
                className="object-contain object-left"
              />
            </Link>
            <span className="text-slate-500 font-mono text-xs">
              © {new Date().getFullYear()} Macasoft S.R.L. Río Gallegos, Santa Cruz.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs font-mono text-slate-400">
            <Link
              href="/terminos"
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Términos y Condiciones
            </Link>
            <span className="text-slate-700">·</span>
            <Link
              href="/#bitacora"
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Filosofía Austral
            </Link>
            <span className="text-slate-700">·</span>
            <Link
              href="/#contacto"
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Contacto
            </Link>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>
            Patagonia Austral Argentina — 51°37′56″S 69°13′08″W
          </p>
          <p className="text-slate-400">
            Ingeniería de software con foco en resiliencia, alta disponibilidad y código robusto.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   MACASOFT AUSTRAL LANDING PAGE (DISEÑO OFICIAL)
   ───────────────────────────────────────────── */

export function LandingPage() {
  return (
    <div className="relative min-h-screen bg-[#080D1A] text-[#F8FAFC]">
      <EditorialNavbar />
      {/* Video de fondo 100vw situado detrás de "Ingeniería de software concebida en el fin del mundo" */}
      <HeroWithIntegratedVideo />
      <EngineeringPillars />
      <SystemsDossier />
      <FieldNotesSection />
      <ConsultationTerminal />
      <EditorialFooter />
    </div>
  );
}

export const NewDesignView = LandingPage;
export default LandingPage;
