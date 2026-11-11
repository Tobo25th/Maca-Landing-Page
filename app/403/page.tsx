import Forbidden from "@/app/forbidden";

export const metadata = {
  title: "403 — Acceso Restringido · Macasoft",
  description: "Acceso restringido por política perimetral en la infraestructura de Macasoft.",
};

export default function Page403() {
  return <Forbidden />;
}

