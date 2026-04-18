"use client"

import { Card, CardContent } from "../ui/card"
import { Users, Plus, RefreshCw, Check } from "lucide-react"
import { FadeIn } from "../shared/Animations"
import { Lead } from "../../lib/types"
import { useLeadsStore } from "../../store/useLeadsStore"

export function StatsCards() {

  const leads: Lead[] = useLeadsStore(state => state.leads);

  const stats = [
    { label: "Total de leads", value: leads.length, icon: Users, highlight: true },
    { label: "Nuevos", value: leads.filter(l => l.status === "nuevo").length, icon: Plus },
    { label: "Contactados", value: leads.filter(l => l.status === "contactado").length, icon: RefreshCw },
    { label: "Interesados", value: leads.filter(l => l.status === "interesado").length, icon: Check },
  ]

  return (
    <FadeIn delay={100}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="glass glass-border hover:border-zinc-700/50 transition-colors">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-5 h-5 ${stat.highlight ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              <p className={`text-2xl sm:text-3xl font-bold ${stat.highlight ? 'text-primary' : 'text-foreground'}`}>
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </FadeIn>
  )
}
