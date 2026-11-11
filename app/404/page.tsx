import NotFound from "@/app/not-found";

export const metadata = {
  title: "404 — Ruta no encontrada",
  description: "La ruta solicitada no existe o fue reubicada en la infraestructura de Macasoft.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page404() {
  return <NotFound />;
}

