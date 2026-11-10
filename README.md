# Macasoft — Landing Page Oficial

Plataforma web oficial de **Macasoft**, empresa de ingeniería de software e infraestructura cloud concebida en Río Gallegos, Santa Cruz, Patagonia Austral (51°37′S 69°13′W).

Inspirada en la resiliencia y templanza del **Macá Tobiano** (*Podiceps gallardoi*).

---

## 🎨 Identidad Visual Austral
- **Pizarra Austral**: `#080D1A` / `#0F172A`
- **Azul Austral**: `#0284C7` / `#0EA5E9`
- **Cobrizo Patagónico**: `#D9531E`
- **Rojo Rubí**: `#E11D48`
- **Blanco Nieve**: `#F8FAFC`
- **Tipografía**: Josefin Sans (`app/fonts/JosefinSans-Variable.ttf`) + Geist

---

## 📁 Estructura del Proyecto

```
├── app/
│   ├── layout.tsx         # Metadatos, fuentes y configuración global
│   ├── page.tsx           # Entrada principal: renderiza la Landing Page Austral
│   └── globals.css        # Tokens de Tailwind CSS v4 y scrollbar austral
│
├── components/
│   ├── HeroCards.tsx      # Tarjetas editables del Hero (textos, CTAs y métricas)
│   └── LandingPage.tsx    # Estructura completa de la Landing Page
│
├── public/
│   ├── brand/             # Logotipos y símbolos oficiales en SVG y PNG
│   └── videos/            # Video del Macá Tobiano (100vw, uncropped)
```

---

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Compilación de producción
npm run build
```

El sitio estará disponible en [http://localhost:3000](http://localhost:3000).

---

## ✍️ ¿Cómo editar contenidos?

- **Tarjetas del Hero**: Abre [`components/HeroCards.tsx`](components/HeroCards.tsx) y edita directamente las constantes `defaultPrimaryCardData`, `defaultHeroFeatureCards`, o los badges.
- **Portafolio y Secciones**: Abre [`components/LandingPage.tsx`](components/LandingPage.tsx) para ajustar los pilares de ingeniería, sistemas en producción o la narrativa territorial.
