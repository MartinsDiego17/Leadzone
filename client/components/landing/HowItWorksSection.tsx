"use client"

import Image from "next/image"
import { FadeIn, SlideIn } from "../shared/Animations"

const steps = [
  {
    number: "01",
    title: "Exporta tu CSV desde G-Maps Extractor",
    description: "Busca tu niche y zone en la herramienta, exporta el CSV y tenlo listo para importar.",
    image: "/images/step-export.jpeg"
  },
  {
    number: "02",
    title: "Impórtalo en Leadzone con contexto",
    description: "Indica el niche y la zone, sube el CSV y previsualiza los registros antes de confirmar. Los duplicados se descartan solos.",
    image: "/images/step-import.jpeg"
  },
  {
    number: "03",
    title: "Gestiona y haz seguimiento",
    description: "Cambia el status de cada lead, filtra por niche o zone y consulta tus estadísticas en tiempo real.",
    image: "/images/step-manage.jpeg"
  }
]

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="py-20 sm:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <FadeIn>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-center mb-16">
            Tres pasos para tener tu pipeline listo
          </h2>
        </FadeIn>
        
        <div className="space-y-24">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}
            >
              <SlideIn direction={index % 2 === 0 ? "left" : "right"} delay={index * 100} className="flex-1 space-y-4">
                <span className="font-heading text-6xl font-bold text-primary/20">{step.number}</span>
                <h3 className="font-heading text-2xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground text-lg">{step.description}</p>
              </SlideIn>
              
              <SlideIn direction={index % 2 === 0 ? "right" : "left"} delay={index * 100 + 100} className="flex-1 w-full">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                  <div className="relative glass glass-border rounded-xl overflow-hidden shadow-2xl shadow-black/30">
                    <div className="aspect-video relative">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent" />
                    </div>
                  </div>
                </div>
              </SlideIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
