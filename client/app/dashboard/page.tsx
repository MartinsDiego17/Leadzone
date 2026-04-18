"use client"

import { StatsCards, LeadsProgress, NichesGrid, QuickActions } from "../../components/dashboard"
import { useEffect } from "react"
import { useLeadsStore } from "../../store/useLeadsStore"
import { useAuthStore } from "../../store/useAuthStore"
import { FadeIn } from "../../components/shared/Animations"

export default function DashboardPage() {
  const currentDate = new Date().toLocaleDateString('es-AR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const infoUser = useAuthStore(state => state.infoUser);

  const getNichesByUser = useLeadsStore(state => state.getNichesByUser);
  const niches = useLeadsStore(state => state.niches);
  const loadLeads = useLeadsStore(state => state.loadLeads);
  const leads = useLeadsStore(state => state.leads);

  useEffect(() => {
    getNichesByUser();
  }, [niches.length]);

  useEffect(() => {
    loadLeads()
  }, [leads.length]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <FadeIn>
        <div>
          <h1 className={`font-heading text-2xl sm:text-3xl font-bold ${!infoUser?.fullname.length && "opacity-0"}`}>Hola de nuevo, {infoUser?.fullname.split(" ")[0]}</h1>
          <p className="text-muted-foreground capitalize">{currentDate}</p>
        </div>
      </FadeIn>

      <StatsCards />
      <LeadsProgress />
      <NichesGrid />
      <QuickActions />
    </div>
  )
}
