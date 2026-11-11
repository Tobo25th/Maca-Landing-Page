"use client";

import React from "react";
import Link from "next/link";
import { EditorialNavbar, EditorialFooter } from "@/components/LandingPage";

export interface StatusErrorViewProps {
  statusCode: "403" | "404";
  badgeText: string;
  badgeType?: "sky" | "ruby";
  title: string;
  description: string;
  diagnostics: Array<{ label: string; value: string }>;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export function StatusErrorView({
  statusCode,
  badgeText,
  badgeType = statusCode === "403" ? "ruby" : "sky",
  title,
  description,
  diagnostics,
  primaryCta = { label: "Volver a la Base Principal", href: "/" },
  secondaryCta = { label: "Explorar Sistemas en Producción", href: "/#sistemas" },
}: StatusErrorViewProps) {
  const isRuby = badgeType === "ruby";

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-[#080D1A] text-[#F8FAFC] overflow-hidden">
      <EditorialNavbar />

      <main className="relative flex-1 flex items-center justify-center py-20 md:py-28 px-6 md:px-12">
        {/* Ambient atmospheric glow */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full blur-3xl pointer-events-none ${
            isRuby ? "bg-rose-500/10" : "bg-sky-500/10"
          }`}
        />

        <div className="relative z-10 max-w-3xl w-full mx-auto text-center space-y-8">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0F172A]/90 border border-slate-700/80 backdrop-blur-md shadow-xl text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isRuby ? "bg-[#E11D48]" : "bg-[#0EA5E9]"
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isRuby ? "bg-[#E11D48]" : "bg-[#0EA5E9]"
                }`}
              />
            </span>
            <span className={isRuby ? "text-rose-400 font-semibold" : "text-[#0EA5E9] font-semibold"}>
              {badgeText}
            </span>
          </div>

          {/* Big Error Number Display */}
          <div className="space-y-3">
            <div className="relative inline-block select-none">
              <span
                className={`font-josefin font-bold text-8xl sm:text-9xl lg:text-[11rem] tracking-tight leading-none block text-transparent bg-clip-text ${
                  isRuby
                    ? "bg-gradient-to-b from-rose-200 via-rose-500 to-slate-900"
                    : "bg-gradient-to-b from-white via-slate-300 to-slate-800"
                }`}
              >
                {statusCode}
              </span>
            </div>

            <h1 className="font-josefin font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              {title}
            </h1>

            <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed max-w-xl mx-auto">
              {description}
            </p>
          </div>

          {/* Technical Terminal Diagnostics Card */}
          <div className="text-left bg-[#080D1A]/95 border border-slate-800 rounded-xl p-5 md:p-6 max-w-xl mx-auto shadow-2xl space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 text-slate-400 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-600" />
                <span className="w-2 h-2 rounded-full bg-slate-600" />
                <span className="w-2 h-2 rounded-full bg-slate-600" />
                <span className="ml-1 tracking-wider uppercase text-slate-400 font-semibold">
                  Registro de Topología
                </span>
              </div>
              <span className="text-slate-400">Río Gallegos · 51°37′S 69°13′W</span>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
              {diagnostics.map((diag) => (
                <div key={diag.label} className="space-y-0.5">
                  <dt className="text-slate-400 text-[10px] uppercase tracking-wider">
                    {diag.label}
                  </dt>
                  <dd className="font-semibold text-white break-all">
                    {diag.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Action CTAs (Flat color, no glow) */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href={primaryCta.href}
              className="bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-mono uppercase tracking-wider font-semibold px-6 py-3.5 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <span>{primaryCta.label}</span>
              <span>→</span>
            </Link>

            <Link
              href={secondaryCta.href}
              className="bg-[#0F172A] hover:bg-[#1E293B] border border-slate-700 text-slate-200 hover:text-white text-xs font-mono uppercase tracking-wider font-medium px-5 py-3.5 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>{secondaryCta.label}</span>
            </Link>
          </div>
        </div>
      </main>

      <EditorialFooter />
    </div>
  );
}

export default StatusErrorView;

