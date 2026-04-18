"use client"

import { Card, CardContent } from "../ui/card"
import { Progress } from "../ui/progress"
import { FadeIn } from "../shared/Animations"
import { useLeadsStore } from "../../store/useLeadsStore"

const MAX_LEADS = 200

export function LeadsProgress() {
  const { leads } = useLeadsStore()
  const progressPercent = Math.min((leads.length / MAX_LEADS) * 100, 100)

  return (
    <FadeIn delay={200}>
      <Card className="glass glass-border">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Leads registrados</span>
            <span className="text-sm font-medium">{leads.length} / {MAX_LEADS}</span>
          </div>
          <Progress value={progressPercent} className="h-2 bg-secondary" />
        </CardContent>
      </Card>
    </FadeIn>
  )
}
