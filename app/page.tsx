"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, FormEvent } from "react";

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
   ───────────────────────────────────────────── */

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

const letterReveal = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.04,
      ease,
    },
  }),
};

const lineExpand = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, ease },
  },
};

/* ─────────────────────────────────────────────
   REUSABLE COMPONENTS
   ───────────────────────────────────────────── */

function SectionWrapper({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.section>
  );
}

function AnimatedLine() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="h-px bg-neutral-800 origin-left"
      variants={lineExpand}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    />
  );
}

function RevealText({
  text,
  className = "",
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");

  return (
    <Tag className={className} ref={ref as React.RefObject<HTMLHeadingElement>}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.3em] overflow-hidden"
          variants={letterReveal}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={i}
        >
          <span className="inline-block">{word}</span>
        </motion.span>
      ))}
    </Tag>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="w-4 h-4 inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   NAVIGATION
   ───────────────────────────────────────────── */

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    { label: "Servicios", href: "#servicios" },
    { label: "Productos", href: "#productos" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0C0C0C]/80 border-b border-neutral-900"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 group"
          id="nav-logo"
        >
          <span className="text-[#FFB300] font-mono text-xs tracking-widest uppercase">
            ◉
          </span>
          <span className="font-sans font-black text-lg tracking-tighter text-[#F3F4F6]">
            MACASOFT
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              id={`nav-${link.label.toLowerCase()}`}
              className="text-neutral-400 font-mono text-xs tracking-widest uppercase hover:text-[#FFB300] transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            id="nav-cta"
            className="bg-[#FFB300] text-[#0C0C0C] font-mono text-xs tracking-widest uppercase px-5 py-2 hover:bg-[#F59E0B] transition-colors duration-300 font-bold"
          >
            Hablemos
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#F3F4F6] p-2"
          id="nav-mobile-toggle"
          aria-label="Abrir menú"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span
              className={`block h-px bg-[#F3F4F6] transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[3.5px]" : ""
                }`}
            />
            <span
              className={`block h-px bg-[#F3F4F6] transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
                }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-[#0C0C0C] border-t border-neutral-900"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-[#F3F4F6] font-sans font-black text-3xl tracking-tighter hover:text-[#FFB300] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={() => setIsOpen(false)}
                className="bg-[#FFB300] text-[#0C0C0C] font-mono text-xs tracking-widest uppercase px-5 py-3 text-center font-bold mt-4"
              >
                Hablemos
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─────────────────────────────────────────────
   HERO SECTION
   ───────────────────────────────────────────── */

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-10 pt-32 overflow-hidden"
    >
      {/* Background Video Layer - Macá Tobiano Seamless Loop */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/videos/maca-tobiano-poster.jpg"
          className="w-full h-full object-cover object-center opacity-85 md:opacity-90 transform-gpu will-change-transform transition-opacity duration-1000"
        >
          <source src="/videos/maca-tobiano.mp4" type="video/mp4" />
          <source src="/videos/maca-tobiano.webm" type="video/webm" />
        </video>

        {/* Soft gradient overlays for perfect text contrast without hiding the video */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/40 to-[#0C0C0C]/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0C0C]/70 via-[#0C0C0C]/20 to-transparent" />
      </div>

      {/* Background grid subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] z-[1] pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,179,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,179,0,0.4) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Label & Video Live Indicator */}
        <motion.div
          className="mb-8 md:mb-12 flex flex-wrap items-center justify-between gap-4"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <div className="flex items-center gap-3 bg-[#0C0C0C]/60 backdrop-blur-md px-3.5 py-1.5 border border-neutral-800">
            <span className="inline-block w-2 h-2 rounded-full bg-[#FFB300] animate-pulse" />
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#F3F4F6]">
              Río Gallegos, Patagonia Argentina — 51°37′S
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-400 hidden sm:inline-block border border-neutral-800 px-3 py-1.5 bg-[#0C0C0C]/70 backdrop-blur-md">
              Ave Patagónica · Podiceps gallardoi
            </span>
            <button
              onClick={togglePlay}
              type="button"
              className="pointer-events-auto font-mono text-[10px] tracking-widest uppercase text-neutral-400 hover:text-[#FFB300] border border-neutral-800 px-3 py-1.5 bg-[#0C0C0C]/70 backdrop-blur-md transition-colors cursor-pointer"
              title={isPlaying ? "Pausar video de fondo" : "Reproducir video de fondo"}
            >
              {isPlaying ? "❚❚ Pausar" : "▶ Reproducir"}
            </button>
          </div>
        </motion.div>

        {/* Main title */}
        <div className="overflow-hidden">
          <motion.h1
            className="font-sans font-black text-[clamp(2.8rem,8vw,8rem)] leading-[0.9] tracking-tighter text-[#F3F4F6] max-w-6xl drop-shadow-[0_8px_32px_rgba(0,0,0,0.85)]"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Software
            <br />
            desde el sur
            <br />
            <span className="text-[#FFB300] drop-shadow-[0_4px_24px_rgba(255,179,0,0.35)]">
              del mundo.
            </span>
          </motion.h1>
        </div>

        {/* Subtitle + CTA row */}
        <div className="mt-10 md:mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <motion.p
            className="text-[#F3F4F6]/90 text-base md:text-lg max-w-md leading-relaxed font-sans bg-[#0C0C0C]/40 backdrop-blur-sm p-4 border-l border-[#FFB300]/60 drop-shadow-[0_4px_16px_rgba(0,0,0,0.7)]"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            Somos una startup tecnológica boutique.
            <br />
            Construimos software con la precisión del viento patagónico
            y la resiliencia del Macá Tobiano.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
          >
            <a
              href="#contacto"
              id="hero-cta"
              className="group inline-flex items-center gap-3 bg-[#FFB300] text-[#0C0C0C] font-mono text-sm tracking-widest uppercase px-8 py-4 font-bold hover:bg-[#F59E0B] transition-all duration-300 hover:gap-5"
            >
              Iniciar proyecto
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-px h-12 bg-neutral-800" />
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SERVICES SECTION
   ───────────────────────────────────────────── */

const services = [
  {
    number: "01",
    title: "Software a Medida",
    tagline: "Ingeniería Propietaria & Sistemas Críticos",
    description:
      "Diseñamos ecosistemas de software concebidos desde cero. Utilizamos arquitectura de alta precisión donde la resiliencia del clima patagónico y la elegancia técnica convergen en código puro, escalable y robusto ante cualquier demanda.",
    tags: ["Arquitectura Propietaria", "Sistemas Críticos", "Código Artesanal"],
  },
  {
    number: "02",
    title: "Desarrollo Web",
    tagline: "Productores, Emprendimientos & Marcas Globales",
    description:
      "Experiencias digitales diseñadas a medida para cualquier productor, marca o emprendimiento. Transformamos la visión de creadores y proyectos locales en artefactos digitales de alto rendimiento que cautivan en el escenario regional e internacional.",
    tags: ["Productores & Marcas", "Emprendimientos", "Ultra Performance"],
  },
  {
    number: "03",
    title: "Apps Móviles",
    tagline: "Experiencias Nativas & Multiplataforma",
    description:
      "Aplicaciones diseñadas para un rendimiento optimizado en iOS y Android. Interfaces fluidas, sincronización offline y ergonomía digital precisa.",
    tags: ["iOS & Android", "Resiliencia Offline", "Micro-interacciones"],
  },
  {
    number: "04",
    title: "Consultoría Técnica",
    tagline: "Auditoría Arquitectónica & Estrategia",
    description:
      "Diagnósticos de profundidad y reingeniería para organizaciones que no pueden permitirse fallas. Elevamos la seguridad, optimizamos latencias y blindamos infraestructuras para el crecimiento exponencial.",
    tags: ["Auditoría de Código", "Optimización de Latencia", "Escala Global"],
  },
];

function ServicesSection() {
  return (
    <SectionWrapper id="servicios" className="py-24 md:py-40 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16 md:mb-24">
          <motion.div className="md:col-span-4" variants={fadeUp} custom={0}>
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#FFB300]">
              Servicios
            </span>
          </motion.div>
          <motion.div className="md:col-span-8" variants={fadeUp} custom={1}>
            <RevealText
              text="Construimos soluciones que escalan."
              className="font-sans font-black text-3xl md:text-5xl lg:text-6xl tracking-tighter text-[#F3F4F6] leading-[1.05]"
            />
          </motion.div>
        </div>

        <AnimatedLine />

        {/* Service items */}
        {services.map((service, index) => (
          <ServiceItem key={service.number} service={service} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}

function ServiceItem({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref}>
      <motion.div
        className="group relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-10 md:py-14 px-3 md:px-6 -mx-3 md:-mx-6 rounded-2xl cursor-default transition-all duration-500 hover:bg-neutral-900/40"
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        custom={index * 0.4}
      >
        {/* Number & Tagline */}
        <div className="md:col-span-2 flex flex-col justify-start gap-2">
          <span className="font-mono text-xs text-neutral-400 tracking-[0.25em] group-hover:text-[#FFB300] transition-colors duration-300">
            /{service.number}
          </span>
          <span className="font-mono text-[11px] text-neutral-400 tracking-wider uppercase leading-snug">
            {service.tagline}
          </span>
        </div>

        {/* Title */}
        <div className="md:col-span-5 flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <h3 className="font-sans font-black text-2xl md:text-4xl lg:text-5xl tracking-tighter text-[#F3F4F6] group-hover:text-[#FFB300] transition-all duration-500 group-hover:translate-x-1.5 leading-[1.1]">
              {service.title}
            </h3>
            <span className="hidden md:inline-block opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#FFB300] text-xl font-light">
              ↗
            </span>
          </div>
        </div>

        {/* Description & Tags */}
        <div className="md:col-span-5 flex flex-col justify-center gap-4">
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
            {service.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] md:text-[11px] tracking-wider uppercase px-2.5 py-1 rounded-full border border-neutral-800 bg-neutral-900/60 text-neutral-400 group-hover:border-neutral-700 group-hover:text-neutral-300 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
      <AnimatedLine />
    </div>
  );
}

/* ─────────────────────────────────────────────
   PRODUCTS SECTION
   ───────────────────────────────────────────── */

const products = [
  {
    name: "Ventus",
    tag: "Gestión de turnos",
    description:
      "Sistema inteligente de asignación y gestión de turnos para instituciones públicas y privadas.",
  },
  {
    name: "Glaciar",
    tag: "Monitoreo IoT",
    description:
      "Plataforma de monitoreo en tiempo real para sensores ambientales y dispositivos industriales.",
  },
  {
    name: "Estepa",
    tag: "E-commerce B2B",
    description:
      "Marketplace vertical para distribuidores y comercios patagónicos con logística integrada.",
  },
  {
    name: "Cauquén",
    tag: "Gestión documental",
    description:
      "Digitalización y automatización de flujos documentales con firma electrónica.",
  },
  {
    name: "Austral",
    tag: "Analytics dashboard",
    description:
      "Paneles de datos personalizados con IA para la toma de decisiones en tiempo real.",
  },
  {
    name: "Tehuelche",
    tag: "CRM a medida",
    description:
      "Gestión de clientes y pipeline comercial adaptado a las necesidades de cada empresa.",
  },
];

function ProductsSection() {
  return (
    <SectionWrapper id="productos" className="py-24 md:py-40 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16 md:mb-24">
          <motion.div className="md:col-span-4" variants={fadeUp} custom={0}>
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#FFB300]">
              Productos
            </span>
          </motion.div>
          <motion.div className="md:col-span-8" variants={fadeUp} custom={1}>
            <RevealText
              text="Soluciones que ya funcionan."
              className="font-sans font-black text-3xl md:text-5xl lg:text-6xl tracking-tighter text-[#F3F4F6] leading-[1.05]"
            />
          </motion.div>
        </div>

        {/* Products Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-800">
          {products.map((product, index) => (
            <ProductCard key={product.name} product={product} index={index} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="group bg-[#0C0C0C] p-8 md:p-10 flex flex-col justify-between min-h-[280px] relative overflow-hidden cursor-default"
      variants={fadeIn}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
    >
      {/* Hover background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFB300]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative z-10">
        {/* Tag */}
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-400 border border-neutral-800 px-3 py-1 inline-block">
          {product.tag}
        </span>

        {/* Name */}
        <h3 className="font-sans font-black text-3xl md:text-4xl tracking-tighter text-[#F3F4F6] mt-6 group-hover:text-[#FFB300] transition-colors duration-500">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-neutral-400 text-sm leading-relaxed mt-4 max-w-xs">
          {product.description}
        </p>
      </div>

      {/* Demo link */}
      <div className="relative z-10 mt-8">
        <a
          href="#"
          id={`product-${product.name.toLowerCase()}-demo`}
          className="group/link inline-flex items-center text-neutral-400 hover:text-[#FFB300] transition-colors duration-300 font-mono text-xs tracking-widest uppercase"
        >
          Ver demo
          <ArrowIcon />
        </a>
      </div>

      {/* Corner accent on hover */}
      <div className="absolute top-0 right-0 w-0 h-0 border-t-[2px] border-r-[2px] border-transparent group-hover:border-[#FFB300] transition-all duration-500 group-hover:w-8 group-hover:h-8" />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MANIFESTO / ABOUT SECTION
   ───────────────────────────────────────────── */

function ManifestoSection() {
  return (
    <SectionWrapper className="py-24 md:py-40 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <AnimatedLine />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 py-16 md:py-24">
          <motion.div
            className="md:col-span-5"
            variants={fadeUp}
            custom={0}
          >
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#FFB300] mb-6 block">
              Manifiesto
            </span>
            <RevealText
              text="Código con raíces en el fin del mundo."
              className="font-sans font-black text-3xl md:text-5xl tracking-tighter text-[#F3F4F6] leading-[1.05]"
            />
          </motion.div>

          <motion.div
            className="md:col-span-6 md:col-start-7 flex flex-col justify-end gap-8"
            variants={fadeUp}
            custom={2}
          >
            <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
              Desde la latitud 51° sur, donde el viento moldea la estepa y el hielo
              esculpe montañas, construimos tecnología con la misma tenacidad.
              Cada línea de código que escribimos lleva la marca de la Patagonia:
              robusta, eficiente y hecha para perdurar.
            </p>
            <p className="text-neutral-400 text-base md:text-lg leading-relaxed">
              Nuestro nombre rinde homenaje al Macá Tobiano, un ave endémica
              de Santa Cruz — rara, resiliente y extraordinaria. Como ella,
              creemos que las mejores soluciones nacen donde nadie espera encontrarlas.
            </p>
            <div className="flex gap-12 mt-4">
              <div>
                <span className="font-sans font-black text-4xl md:text-5xl tracking-tighter text-[#FFB300]">
                  5+
                </span>
                <p className="text-neutral-400 font-mono text-xs tracking-widest uppercase mt-2">
                  Años de experiencia
                </p>
              </div>
              <div>
                <span className="font-sans font-black text-4xl md:text-5xl tracking-tighter text-[#FFB300]">
                  40+
                </span>
                <p className="text-neutral-400 font-mono text-xs tracking-widest uppercase mt-2">
                  Proyectos entregados
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <AnimatedLine />
      </div>
    </SectionWrapper>
  );
}

/* ─────────────────────────────────────────────
   CONTACT SECTION
   ───────────────────────────────────────────── */

function ContactSection() {
  const [formState, setFormState] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormState({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <SectionWrapper id="contacto" className="py-24 md:py-40 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16 md:mb-24">
          <motion.div className="md:col-span-4" variants={fadeUp} custom={0}>
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#FFB300]">
              Contacto
            </span>
          </motion.div>
          <motion.div className="md:col-span-8" variants={fadeUp} custom={1}>
            <RevealText
              text="Hagamos algo extraordinario."
              className="font-sans font-black text-3xl md:text-5xl lg:text-6xl tracking-tighter text-[#F3F4F6] leading-[1.05]"
            />
          </motion.div>
        </div>

        {/* Contact grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6">
          {/* Info column */}
          <motion.div
            className="md:col-span-4"
            variants={fadeUp}
            custom={0}
          >
            <div className="space-y-8">
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-400 mb-2">
                  Email
                </p>
                <a
                  href="mailto:hola@macasoft.ar"
                  className="text-[#F3F4F6] hover:text-[#FFB300] transition-colors duration-300 text-lg"
                >
                  hola@macasoft.ar
                </a>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-400 mb-2">
                  Ubicación
                </p>
                <p className="text-[#F3F4F6] text-lg">
                  Río Gallegos, Santa Cruz
                  <br />
                  <span className="text-neutral-400 text-base">
                    Patagonia Argentina
                  </span>
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-400 mb-2">
                  Redes
                </p>
                <div className="flex gap-6">
                  {["LinkedIn", "GitHub", "X"].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="text-neutral-400 hover:text-[#FFB300] transition-colors duration-300 font-mono text-xs tracking-widest uppercase"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div
            className="md:col-span-7 md:col-start-6"
            variants={fadeUp}
            custom={2}
          >
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Nombre */}
              <div className="relative">
                <label
                  htmlFor="contact-nombre"
                  className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-400 block mb-4"
                >
                  Nombre
                </label>
                <input
                  id="contact-nombre"
                  type="text"
                  required
                  value={formState.nombre}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, nombre: e.target.value }))
                  }
                  className="w-full bg-transparent border-b border-neutral-800 text-[#F3F4F6] text-lg py-3 focus:outline-none focus:border-[#FFB300] transition-colors duration-300 placeholder:text-neutral-700"
                  placeholder="Tu nombre"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <label
                  htmlFor="contact-email"
                  className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-400 block mb-4"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, email: e.target.value }))
                  }
                  className="w-full bg-transparent border-b border-neutral-800 text-[#F3F4F6] text-lg py-3 focus:outline-none focus:border-[#FFB300] transition-colors duration-300 placeholder:text-neutral-700"
                  placeholder="tu@email.com"
                />
              </div>

              {/* Mensaje */}
              <div className="relative">
                <label
                  htmlFor="contact-mensaje"
                  className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-400 block mb-4"
                >
                  Mensaje
                </label>
                <textarea
                  id="contact-mensaje"
                  required
                  rows={4}
                  value={formState.mensaje}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, mensaje: e.target.value }))
                  }
                  className="w-full bg-transparent border-b border-neutral-800 text-[#F3F4F6] text-lg py-3 focus:outline-none focus:border-[#FFB300] transition-colors duration-300 resize-none placeholder:text-neutral-700"
                  placeholder="Contanos sobre tu proyecto..."
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                id="contact-submit"
                className="w-full bg-[#FFB300] text-[#0C0C0C] font-mono text-sm tracking-widest uppercase py-5 font-bold hover:bg-[#0C0C0C] hover:text-[#FFB300] border-2 border-[#FFB300] transition-all duration-500 cursor-pointer"
                whileTap={{ scale: 0.98 }}
              >
                {submitted ? "✓ Mensaje enviado" : "Enviar mensaje"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
   ───────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-neutral-900 px-6 md:px-10 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-[#FFB300] font-mono text-xs">◉</span>
          <span className="font-sans font-black text-sm tracking-tighter text-[#F3F4F6]">
            MACASOFT
          </span>
          <span className="text-neutral-400 font-mono text-xs ml-2">
            © {new Date().getFullYear()}
          </span>
        </div>

        <p className="text-neutral-400 font-mono text-xs tracking-widest uppercase">
          Río Gallegos, Patagonia Argentina — 51°37′S 69°13′O
        </p>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE
   ───────────────────────────────────────────── */

export default function Home() {
  return (
    <main className="bg-[#0C0C0C] min-h-screen text-[#F3F4F6]">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ProductsSection />
      <ManifestoSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
