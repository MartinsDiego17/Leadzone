"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { FadeIn } from "../shared/Animations"
import { Lead, Zone } from "../../lib/types"
import { useLeadsStore } from "../../store/useLeadsStore"

export function NichesGrid() {
  const { leads, niches, getzonesByniche } = useLeadsStore()
  const [zonesByNiche, setZonesByNiche] = useState<Record<string, Zone[]>>({})

  useEffect(() => {
    if (!niches.length) return;

    const fetchZones = async () => {
      const results: Record<string, Zone[]> = {}
      await Promise.all(
        niches.map(async (niche) => {
          const zones = await getzonesByniche(niche.id)
          results[niche.id] = zones
        })
      )
      setZonesByNiche(results)
    }

    fetchZones()
  }, [niches.length]) // ← solo cuando cambia la cantidad de niches

  const getnicheStats = (nicheId: string) => {
    const nicheLeads = leads.filter((l: Lead) => l.nicheId === nicheId)
    const zonesCount = zonesByNiche[nicheId]?.length ?? 0
    return { leadsCount: nicheLeads.length, zonesCount }
  }

  return (
    <FadeIn delay={300}>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xl font-bold">Tus nichos</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {niches.map((niche) => {
            const stats = getnicheStats(niche.id)
            return (
              <Card key={niche.id} className="glass glass-border hover:border-primary/30 transition-all duration-300 group">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">{niche.name}</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>{stats.zonesCount} zonas</p>
                    <p>{stats.leadsCount} leads</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-3 w-full text-primary hover:text-primary hover:bg-primary/10"
                    asChild
                  >
                    <Link href={`/dashboard/leads?niche=${niche.id}`}>Ver leads</Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </FadeIn>
  )
}