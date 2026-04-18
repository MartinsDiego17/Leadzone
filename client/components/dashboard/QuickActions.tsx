"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import { Upload, BarChart3 } from "lucide-react"
import { FadeIn } from "../shared/Animations"

export function QuickActions() {
  return (
    <FadeIn delay={400}>
      <div className="grid sm:grid-cols-2 gap-4">
        <Button 
          size="lg" 
          className="h-auto py-6 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold glow-lime hover:shadow-[0_0_30px_var(--lime-glow-strong)] transition-all"
          asChild
        >
          <Link href="/dashboard/import">
            <Upload className="w-5 h-5 mr-2" />
            Importar CSV
          </Link>
        </Button>
        <Button 
          size="lg" 
          variant="outline"
          className="h-auto py-6 border-zinc-700 hover:bg-secondary hover:border-zinc-600 transition-all"
          asChild
        >
          <Link href="/dashboard/statistics">
            <BarChart3 className="w-5 h-5 mr-2" />
            Ver estadisticas
          </Link>
        </Button>
      </div>
    </FadeIn>
  )
}
