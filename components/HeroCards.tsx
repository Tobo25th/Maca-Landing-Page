"use client";

import React from "react";

/* ─────────────────────────────────────────────
   CONFIGURACIÓN EDITABLE DE LAS HERO CARDS
   Modifica aquí los textos, botones, enlaces y
   tarjetas secundarias del Hero para Macasoft.
   ───────────────────────────────────────────── */

export interface HeroPrimaryCardData {
  /** Texto descriptivo principal */
  description: string;
  /** Botón primario de acción */
  primaryButton: {
    label: string;
    href: string;
  };
  /** Botón secundario de exploración */
  secondaryButton: {
    label: string;
    href: string;
  };
}

export interface HeroFeatureCardItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  accentColor?: string;
}

export interface HeroLocationData {
  city: string;
  region: string;
  coordinates: string;
}

export interface HeroSpeciesData {
  scientificName: string;
  commonName: string;
  status: string;
}

/** Datos por defecto de la tarjeta principal del Hero */
export const defaultPrimaryCardData: HeroPrimaryCardData = {
  description:
    "Construimos ecosistemas de código robusto, sistemas de alta concurrencia e infraestructura cloud con la resiliencia y templanza del Macá Tobiano.",
  primaryButton: {
    label: "Consultar Disponibilidad",
    href: "#contacto",
  },
  secondaryButton: {
    label: "Ver Sistemas en Producción →",
    href: "#sistemas",
  },
};

/** Tarjetas secundarias / destacadas de ingeniería en el Hero */
export const defaultHeroFeatureCards: HeroFeatureCardItem[] = [
  {
    id: "resilience",
    tag: "Resiliencia Austral",
    title: "Tolerancia a Particiones",
    description: "Sincronización diferencial y operación offline-first.",
    accentColor: "#0EA5E9",
  },
  {
    id: "architecture",
    tag: "Código Robusto",
    title: "Arquitectura a Medida",
    description: "Ingeniería concebida sin capas de abstracción frágiles.",
    accentColor: "#D9531E",
  },
];

/** Datos de ubicación geográfica */
export const defaultLocationData: HeroLocationData = {
  city: "Río Gallegos",
  region: "Santa Cruz, Patagonia",
  coordinates: "51°37′S 69°13′W",
};

/** Datos del ave patagónica */
export const defaultSpeciesData: HeroSpeciesData = {
  scientificName: "Podiceps gallardoi",
  commonName: "Macá Tobiano",
  status: "Ave en hábitat",
};

/* ─────────────────────────────────────────────
   COMPONENTES MODULARES DE LAS HERO CARDS
   ───────────────────────────────────────────── */

/**
 * Tarjeta principal del Hero con la propuesta de valor y botones CTA.
 */
export function HeroMainCard({
  data = defaultPrimaryCardData,
  className = "",
}: {
  data?: Partial<HeroPrimaryCardData>;
  className?: string;
}) {
  const card = { ...defaultPrimaryCardData, ...data };

  return (
    <div
      className={`bg-[#080D1A]/80 backdrop-blur-md p-6 md:p-7 rounded-2xl border border-slate-700/60 max-w-2xl shadow-2xl space-y-5 ${className}`}
    >
      <p className="text-slate-200 text-base md:text-lg leading-relaxed font-sans font-light">
        {card.description}
      </p>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <a
          href={card.primaryButton.href}
          className="bg-[#0284C7] hover:bg-[#0369A1] text-white text-sm font-semibold tracking-wide px-6 py-3.5 rounded-xl transition-colors cursor-pointer inline-flex items-center gap-2"
        >
          <span>{card.primaryButton.label}</span>
        </a>
        <a
          href={card.secondaryButton.href}
          className="text-slate-200 hover:text-white bg-[#0F172A]/80 hover:bg-[#1E293B] border border-slate-700 text-sm font-medium px-5 py-3.5 rounded-xl transition-colors cursor-pointer inline-flex items-center gap-1.5"
        >
          <span>{card.secondaryButton.label}</span>
        </a>
      </div>
    </div>
  );
}

/**
 * Tarjeta individual de característica o métrica en el Hero.
 */
export function HeroFeatureCard({
  item,
  className = "",
}: {
  item: HeroFeatureCardItem;
  className?: string;
}) {
  return (
    <div
      className={`bg-[#080D1A]/75 backdrop-blur-md border border-slate-800/90 hover:border-sky-500/40 rounded-xl p-4 transition-all duration-300 shadow-lg flex flex-col justify-between space-y-2 group hover:-translate-y-0.5 ${className}`}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: item.accentColor || "#0EA5E9" }}
          />
          <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
            {item.tag}
          </span>
        </div>
        <h4 className="font-josefin font-bold text-sm text-white group-hover:text-sky-300 transition-colors">
          {item.title}
        </h4>
      </div>

      <p className="text-xs text-slate-300 font-sans leading-relaxed">
        {item.description}
      </p>
    </div>
  );
}

/**
 * Fila de tarjetas destacadas / métricas de ingeniería.
 */
export function HeroFeatureCards({
  items = defaultHeroFeatureCards,
  className = "",
}: {
  items?: HeroFeatureCardItem[];
  className?: string;
}) {
  if (!items || items.length === 0) return null;

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl ${className}`}>
      {items.map((item) => (
        <HeroFeatureCard key={item.id} item={item} />
      ))}
    </div>
  );
}

/**
 * Tarjeta de identificación biológica del Macá Tobiano (esquina derecha del Hero).
 */
export function HeroSpeciesCard({
  data = defaultSpeciesData,
  className = "",
}: {
  data?: Partial<HeroSpeciesData>;
  className?: string;
}) {
  const species = { ...defaultSpeciesData, ...data };

  return (
    <div
      className={`bg-[#0F172A]/85 backdrop-blur-md border border-sky-500/25 px-4 py-2.5 rounded-xl text-xs font-mono text-slate-300 shadow-xl hidden sm:block ${className}`}
    >
      <span className="text-[#0EA5E9] font-bold">{species.scientificName}</span>
      <span className="text-slate-400"> · {species.status}</span>
    </div>
  );
}

/**
 * Badge de coordenadas geográficas de Río Gallegos (cabecera del Hero).
 */
export function HeroLocationBadge({
  data = defaultLocationData,
  className = "",
}: {
  data?: Partial<HeroLocationData>;
  className?: string;
}) {
  const location = { ...defaultLocationData, ...data };

  return (
    <div
      className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#0F172A]/85 backdrop-blur-md border border-sky-500/30 text-xs font-mono tracking-wider text-slate-200 shadow-xl ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E11D48] opacity-80" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E11D48]" />
      </span>
      <span className="font-semibold text-white">{location.city}, {location.region.split(",")[0]}</span>
      <span className="text-slate-400">· {location.coordinates}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HEROCARDS (COMPONENTE COMPLETO)
   Integra la tarjeta principal y las tarjetas
   destacadas en un solo bloque listo para usar.
   ───────────────────────────────────────────── */

export interface HeroCardsProps {
  primaryCard?: Partial<HeroPrimaryCardData>;
  featureCards?: HeroFeatureCardItem[];
  /** Si deseas mostrar la fila de tarjetas secundarias de ingeniería */
  showFeatures?: boolean;
  className?: string;
}

export function HeroCards({
  primaryCard = defaultPrimaryCardData,
  featureCards = defaultHeroFeatureCards,
  showFeatures = true,
  className = "",
}: HeroCardsProps) {
  return (
    <div className={`space-y-3.5 ${className}`}>
      {/* Tarjeta narrativa y botones principales */}
      <HeroMainCard data={primaryCard} />

      {/* Tarjetas secundarias de características de ingeniería */}
      {showFeatures && <HeroFeatureCards items={featureCards} />}
    </div>
  );
}

export default HeroCards;
