import { StatusErrorView } from "@/components/StatusErrorView";

export const metadata = {
  title: "403 — Acceso Restringido · Macasoft",
  description: "Acceso restringido por política perimetral en la infraestructura de Macasoft.",
};

export default function Forbidden() {
  return (
    <StatusErrorView
      statusCode="403"
      badgeText="Código HTTP 403 // Acceso Restringido"
      badgeType="ruby"
      title="Acceso Restringido por Seguridad Perimetral"
      description="No dispones de credenciales criptográficas, sesión autorizada o nivel de privilegio suficiente para inspeccionar este subsistema protegido de Macasoft."
      diagnostics={[
        { label: "Política de Acceso", value: "Zero-Trust / Aislamiento Estricto" },
        { label: "Estado HTTP", value: "403 Forbidden Access" },
        { label: "Barrera Perimetral", value: "Macasoft Austral Sentinel v4" },
        { label: "Acción Recomendada", value: "Validar credenciales en base" },
      ]}
      primaryCta={{ label: "Regresar a la Base", href: "/" }}
      secondaryCta={{ label: "Solicitar Autorización Técnica", href: "/#contacto" }}
    />
  );
}

