"use client"

import { FileSpreadsheet, RefreshCw, Layers } from "lucide-react"
import { FadeIn } from "../shared/Animations"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

const painPoints = [
  {
    icon: FileSpreadsheet,
    title: "Leads dispersos ",
    description: "Cada campaña termina en un Excel diferente sin estructura ni visibilidad.",
    number: "01"
  },
  {
    icon: RefreshCw,
    title: "No sabes cuales ya contactaste",
    description: "Pierdes tiempo revisando filas para recordar qué hiciste con cada prospecto.",
    number: "02"
  },
  {
    icon: Layers,
    title: "Datos de scraping sin orden",
    description: "Los CSVs de G-Maps no distinguen entre niches, zones ni statuss de contacto.",
    number: "03"
  }
]

export function PainPointsSection() {
  return (
    <section id="problemas" className="py-24 sm:py-36 relative overflow-hidden bg-background">

      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px"
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,var(--lime-glow),transparent)] opacity-50" />

      <div className="absolute opacity-50 top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
      <div className="absolute opacity-50 bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <FadeIn>
          <div className="text-center mb-16">
            <p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              ¿Te suena?
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
              ¿Te suena familiar?
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {painPoints.map((point, index) => (
            <FadeIn key={index} delay={index * 80}>
              <Card className="flex flex-col gap-y-3 min-h-62.5 bg-zinc-900/30 backdrop-blur-sm border border-transparent transition-all duration-300 group hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20  transition-all ">
                    <point.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="mt-2 font-heading text-lg">{point.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{point.description}</p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}