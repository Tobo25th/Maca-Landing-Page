import type { Metadata } from "next";
import Link from "next/link";
import { EditorialNavbar, EditorialFooter } from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Términos y Condiciones Generales",
  description:
    "Términos y condiciones generales de servicio, licenciamiento de software, SLA y acuerdos de nivel operativo de Macasoft en Río Gallegos, Santa Cruz, Patagonia Argentina.",
  alternates: {
    canonical: "/terminos",
  },
  openGraph: {
    title: "Términos y Condiciones Generales | Macasoft",
    description:
      "Marco legal, propiedad intelectual, acuerdos de nivel de servicio (SLA) y licenciamiento de software de Macasoft.",
    url: "https://macasoft.com.ar/terminos",
    type: "article",
    locale: "es_AR",
  },
};

const termsSections = [
  {
    id: "objeto",
    number: "01",
    title: "Identificación Legal & Objeto del Servicio",
    content: (
      <>
        <p className="text-slate-300 leading-relaxed">
          Los presentes Términos y Condiciones regulan la contratación, acceso y uso de los servicios de ingeniería de software, arquitectura cloud y plataformas operativas provistos por <strong className="text-white font-medium">Macasoft</strong>, con domicilio legal y base de operaciones en la ciudad de Río Gallegos, Provincia de Santa Cruz, Patagonia Argentina.
        </p>
        <p className="text-slate-300 leading-relaxed mt-3">
          Toda relación contractual o consulta técnica formalizada a través de esta plataforma implica la aceptación plena de estas cláusulas por parte de la persona humana o jurídica contratante (en adelante, el &ldquo;Cliente&rdquo;).
        </p>
      </>
    ),
  },
  {
    id: "codigo-robusto",
    number: "02",
    title: "Estándar de Ingeniería & Código Robusto",
    content: (
      <>
        <p className="text-slate-300 leading-relaxed">
          Macasoft diseña y construye software bajo el principio fundacional de <strong className="text-white font-medium">código robusto</strong>: arquitecturas concebidas desde cero con aislamiento estricto de fallas, baja latencia, cold-start mínimo y resiliencia ante entornos hostiles o con conectividad inestable.
        </p>
        <p className="text-slate-300 leading-relaxed mt-3">
          Salvo acuerdo técnico en contrario expresado en la Orden de Trabajo (ODT), los entregables de software serán provistos bajo especificaciones tipadas, libres de dependencias superfluas o librerías huérfanas, garantizando estabilidad y mantenibilidad a largo plazo.
        </p>
      </>
    ),
  },
  {
    id: "sistemas-ventus",
    number: "03",
    title: "Plataformas Propias & Operación Offline-First (Ventus)",
    content: (
      <>
        <p className="text-slate-300 leading-relaxed">
          Para los sistemas desarrollados y operados directamente por Macasoft —incluyendo el sistema de punto de venta y gestión comercial <strong className="text-white font-medium">Ventus</strong>— rige la premisa de <strong className="text-sky-400 font-mono">Offline-First</strong>.
        </p>
        <ul className="mt-3 space-y-2 text-slate-300 text-sm">
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] mt-2 shrink-0" />
            <span>Las terminales de cobro y registro operan de forma autónoma aun ante la pérdida prolongada de enlace a Internet.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] mt-2 shrink-0" />
            <span>La sincronización de datos con el panel backoffice se efectúa de manera diferencial, criptográfica y automática una vez restablecida la conectividad.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] mt-2 shrink-0" />
            <span>El Cliente es responsable de la custodia de sus credenciales maestras y de la provisión de energía eléctrica ininterrumpida para sus terminales locales.</span>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "propiedad-intelectual",
    number: "04",
    title: "Propiedad Intelectual & Licenciamiento de Entregables",
    content: (
      <>
        <p className="text-slate-300 leading-relaxed">
          En los proyectos de desarrollo a medida, los derechos patrimoniales sobre el código fuente específicamente creado para el Cliente serán cedidos de forma no exclusiva o exclusiva (según conste en el acuerdo comercial particular) una vez cancelada la totalidad de los honorarios pactados.
        </p>
        <p className="text-slate-300 leading-relaxed mt-3">
          Macasoft conserva la titularidad indiscutible sobre sus componentes, librerías utilitarias genéricas y metodologías preexistentes, otorgando sobre ellos una licencia de uso perpetua, irrevocable y no transferible para el funcionamiento de la solución entregada.
        </p>
      </>
    ),
  },
  {
    id: "sla-disponibilidad",
    number: "05",
    title: "Nivel de Servicio (SLA) & Contingencias Australes",
    content: (
      <>
        <p className="text-slate-300 leading-relaxed">
          Macasoft se compromete a mantener una disponibilidad objetivo del <strong className="text-white font-medium">90%</strong> en sus servicios y APIs gestionadas.
        </p>
        <p className="text-slate-300 leading-relaxed mt-3">
          Se consideran causales eximentes de responsabilidad los cortes generales en los enlaces troncales de fibra óptica interprovinciales, inclemencias climáticas extraordinarias en la zona, cortes masivos de red de alta tensión o eventos de fuerza mayor ajenos a la órbita de control de Macasoft.
        </p>
      </>
    ),
  },
  {
    id: "privacidad-datos",
    number: "06",
    title: "Privacidad, Confidencialidad & Datos Personales",
    content: (
      <>
        <p className="text-slate-300 leading-relaxed">
          Macasoft da estricto cumplimiento a la <strong className="text-white font-medium">Ley N° 25.326 de Protección de los Datos Personales</strong> de la República Argentina y normativa complementaria de la Agencia de Acceso a la Información Pública (AAIP).
        </p>
        <p className="text-slate-300 leading-relaxed mt-3">
          Toda información transaccional, contable, inventario o datos sensibles transferidos a través de nuestros sistemas son cifrados en tránsito (TLS 1.3) y en reposo (AES-256). Macasoft jamás comercializará, cederá ni explotará datos de los clientes sin autorización expresa por escrito.
        </p>
      </>
    ),
  },
  {
    id: "responsabilidad",
    number: "07",
    title: "Limitación de Responsabilidad",
    content: (
      <>
        <p className="text-slate-300 leading-relaxed">
          En ningún caso Macasoft será responsable por lucro cesante, daños indirectos, pérdida de negocio o daños emergentes derivados de fallas en proveedores de pasarelas de pago bancarias de terceros, configuraciones defectuosas ejecutadas por personal del Cliente o accesos indebidos causados por negligencia en el resguardo de credenciales.
        </p>
      </>
    ),
  },
  {
    id: "jurisdiccion",
    number: "08",
    title: "Ley Aplicable & Jurisdicción Competente",
    content: (
      <>
        <p className="text-slate-300 leading-relaxed">
          Estos Términos y Condiciones se rigen e interpretan de conformidad con las leyes de la <strong className="text-white font-medium">República Argentina</strong>.
        </p>
        <p className="text-slate-300 leading-relaxed mt-3">
          Ante cualquier diferendo, controversia o reclamo judicial derivado de la interpretación o ejecución de los servicios, las partes se someten a la competencia exclusiva de los <strong className="text-white font-medium">Tribunales Ordinarios de la Primera Circunscripción Judicial de la Provincia de Santa Cruz</strong>, con sede en la ciudad de Río Gallegos, renunciando expresamente a cualquier otro fuero o jurisdicción que pudiera corresponderles.
        </p>
      </>
    ),
  },
];

export default function TerminosPage() {
  return (
    <div className="relative min-h-screen bg-[#080D1A] text-[#F8FAFC]">
      <EditorialNavbar />

      <main className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Breadcrumb & Navigation */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 hover:text-sky-400 transition-colors"
            >
              <span>←</span>
              <span>Volver a la Base Principal</span>
            </Link>

            <div className="space-y-4 pt-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[#0EA5E9] font-semibold block">
                Marco Legal · Contratación &amp; Operación
              </span>
              <h1 className="font-josefin font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
                Términos y Condiciones Generales
              </h1>
              <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed max-w-3xl">
                Parámetros legales, estándares de entrega de código robusto, políticas de operación offline y régimen de responsabilidad aplicable a los servicios prestados por Macasoft S.R.L.
              </p>
            </div>

            {/* Metadata Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-4 text-xs font-mono">
              <span className="px-3 py-1.5 rounded-lg bg-[#0F172A] border border-slate-800 text-slate-300">
                Última revisión: <strong className="text-white">Noviembre 2026</strong>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#0F172A] border border-slate-800 text-slate-300">
                Jurisdicción: <strong className="text-white">Río Gallegos, Santa Cruz</strong>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#0F172A] border border-slate-800 text-slate-300">
                Versión: <strong className="text-[#0EA5E9]">v1.0 (Producción)</strong>
              </span>
            </div>
          </div>

          {/* Sections List */}
          <div className="space-y-8">
            {termsSections.map((sec) => (
              <section
                key={sec.id}
                id={sec.id}
                className="p-6 md:p-8 rounded-2xl bg-[#0F172A]/70 border border-slate-800 hover:border-slate-700 transition-colors duration-200 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#0EA5E9] bg-sky-950/60 border border-sky-500/20 px-2.5 py-1 rounded">
                    {sec.number}
                  </span>
                  <h2 className="font-josefin font-bold text-xl md:text-2xl text-white tracking-tight">
                    {sec.title}
                  </h2>
                </div>

                <div className="pt-2 text-sm md:text-base border-t border-slate-800/80">
                  {sec.content}
                </div>
              </section>
            ))}
          </div>

          {/* Custom SLA / Legal Support Callout */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#080D1A] border border-sky-500/30 space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#0EA5E9] block font-semibold">
                Contratación Corporativa &amp; SLA a Medida
              </span>
              <h3 className="font-josefin font-bold text-2xl text-white">
                ¿Tu organización requiere cláusulas de servicio o custodia técnica específicas?
              </h3>
              <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
                Diseñamos acuerdos de nivel de servicio (SLA) con ventanas de guardia 24/7, aislamiento criptográfico dedicado y convenios de confidencialidad (NDA) adaptados a grandes distribuidoras e industrias críticas.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/#contacto"
                className="bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-mono uppercase tracking-wider font-semibold px-6 py-3.5 rounded-lg transition-colors cursor-pointer"
              >
                Iniciar Consulta Legal / Técnica
              </Link>
              <a
                href="mailto:hola@macasoft.com.ar"
                className="text-slate-300 hover:text-white text-xs font-mono uppercase tracking-wider border border-slate-700 hover:border-slate-500 px-5 py-3.5 rounded-lg transition-colors"
              >
                hola@macasoft.com.ar
              </a>
            </div>
          </div>
        </div>
      </main>

      <EditorialFooter />
    </div>
  );
}

