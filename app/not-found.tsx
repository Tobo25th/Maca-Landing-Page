import { StatusErrorView } from "@/components/StatusErrorView";

export const metadata = {
  title: "404 — Ruta no encontrada · Macasoft",
  description: "La ruta solicitada no existe o fue reubicada en la infraestructura de Macasoft.",
};

export default function NotFound() {
  return (
    <StatusErrorView
      statusCode="404"
      badgeText="Código HTTP 404 // Extravío de Ruta"
      badgeType="sky"
      title="Extravío en la Estepa Austral"
      description="La ruta o coordenada digital solicitada no existe en este servidor, ha sido reubicada o se dispersó entre los fuertes vientos patagónicos."
      diagnostics={[
        { label: "Nodo de Origen", value: "MACA-PATAGONIA-EDGE-01" },
        { label: "Estado HTTP", value: "404 Resource Not Found" },
        { label: "Topología", value: "Offline-First Isolated Edge" },
        { label: "Resolución", value: "Retornar al mapa principal" },
      ]}
      primaryCta={{ label: "Volver a la Base Principal", href: "/" }}
      secondaryCta={{ label: "Ver Sistemas en Producción", href: "/#sistemas" }}
    />
  );
}

