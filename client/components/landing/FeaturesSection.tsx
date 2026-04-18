"use client"

import { Upload, FolderOpen, RefreshCw, ShieldCheck, BarChart3, Users } from "lucide-react"
import { FadeIn } from "../shared/Animations"

const features = [
  {
    icon: Upload,
    title: "Importación guiada",
    description: "Sube tu CSV de G-Maps Extractor en lotes de 10 con previsualización antes de confirmar.",
    colSpan: "md:col-span-2",
    rowSpan: "",
    large: true
  },
  {
    icon: FolderOpen,
    title: "Organización por niche y zone",
    description: "Estructura tus leads como Abogados > Quilmes para encontrar lo que buscas en segundos.",
    colSpan: "",
    rowSpan: "md:row-span-2",
    tall: true
  },
  {
    icon: RefreshCw,
    title: "statuss de contacto",
    description: "Marca cada lead como Nuevo, Contactado o Interesado con un solo clic.",
    colSpan: "",
    rowSpan: ""
  },
  {
    icon: ShieldCheck,
    title: "Detección de duplicados",
    description: "El sistema descarta automáticamente los repetidos y te avisa cuales ignoró.",
    colSpan: "",
    rowSpan: ""
  },
  {
    icon: BarChart3,
    title: "Estadísticas de tu pipeline",
    description: "Visualiza gráficos de distribución por status, niche y zone.",
    colSpan: "md:col-span-2",
    rowSpan: "",
    large: true
  },
  {
    icon: Users,
    title: "Tu cuenta de Google, tu data",
    description: "Autenticación con Google OAuth. Cada usuario ve solo sus propios leads.",
    colSpan: "",
    rowSpan: ""
  }
]

export function FeaturesSection() {
  return (
    <section id="funciones" className="py-20 sm:py-32 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              Funciones
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
              Todo lo que necesitas para prospectar mejor
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm">
              Herramientas diseñadas para freelancers que trabajan con leads de Google Maps.
            </p>
          </div>
        </FadeIn>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(160px,auto)] gap-4">

          {/* 1 — Importacion guiada: wide (col-span-2) */}
          <FadeIn delay={0} className="md:col-span-2">
            <BentoCard feature={features[0]} className="h-full" />
          </FadeIn>

          {/* 2 — Organizacion: tall (row-span-2) */}
          <FadeIn delay={80} className="md:row-span-2">
            <BentoCard feature={features[1]} className="h-full" tall />
          </FadeIn>

          {/* 3 — statuss */}
          <FadeIn delay={160}>
            <BentoCard feature={features[2]} className="h-full" />
          </FadeIn>

          {/* 4 — Duplicados */}
          <FadeIn delay={240}>
            <BentoCard feature={features[3]} className="h-full" />
          </FadeIn>

          {/* 5 — Estadisticas: wide (col-span-2) */}
          <FadeIn delay={320} className="md:col-span-2">
            <BentoCard feature={features[4]} className="h-full" wide />
          </FadeIn>

          {/* 6 — Google OAuth */}
          <FadeIn delay={400}>
            <BentoCard feature={features[5]} className="h-full" />
          </FadeIn>

        </div>
      </div>
    </section>
  )
}

/* ─── Bento card ─────────────────────────────────────────── */

type Feature = {
  icon: React.ElementType
  title: string
  description: string
}

function BentoCard({
  feature,
  className = "",
  tall = false,
  wide = false
}: {
  feature: Feature
  className?: string
  tall?: boolean
  wide?: boolean
}) {
  const Icon = feature.icon

  return (
    <div
      className={`
        group relative rounded-2xl border border-zinc-800 bg-zinc-900
        p-6 flex flex-col justify-between overflow-hidden
        hover:border-primary/30 hover:-translate-y-0.5
        transition-all duration-300 
        ${className}
      `}
    >
      {/* Subtle corner glow */}
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top: icon */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl bg-primary/10  flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>

      {/* Bottom: text */}
      <div className="flex flex-col gap-1.5">
        <h3 className="font-heading font-semibold text-foreground text-base leading-snug">
          {feature.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {feature.description}
        </p>
      </div>

    </div>
  )
}
