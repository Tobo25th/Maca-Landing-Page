import Forbidden from "@/app/forbidden";

export const metadata = {
  title: "403 — Acceso Restringido",
  description: "Acceso restringido por política perimetral en la infraestructura de Macasoft.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page403() {
  return <Forbidden />;
}

