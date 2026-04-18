"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts"
import { MapPin } from "lucide-react"
import { FadeIn } from "../shared/Animations"
import { useLeadsStore } from "../../store/useLeadsStore"
import { Zone } from "../../lib/types"

export function Statistics() {
  const { leads, niches, getzonesByniche } = useLeadsStore()
  const [selectednicheForzones, setSelectednicheForzones] = useState(niches[0]?.id || "")
  const [filteredZones, setFilteredZones] = useState<Zone[]>();

  const statusData = [
    { name: "Nuevos", value: leads.filter(l => l.status === "nuevo").length, color: "var(--zinc-500)" },
    { name: "Contactados", value: leads.filter(l => l.status === "contactado").length, color: "var(--indigo)" },
    { name: "Interesados", value: leads.filter(l => l.status === "interesado").length, color: "var(--lime)" },
  ]
  useEffect(() => {
    const fetchZones = async () => {
        const response = await getzonesByniche("all");
        return setFilteredZones(response);
    }
    fetchZones();
  }, [])

  const nicheData = niches.map(niche => ({
    name: niche.name,
    leads: leads.filter(l => l.nicheId === niche.id).length
  }))

  const zoneData = filteredZones?.map(zone => ({
    name: zone.name,
    leads: leads.filter(l => l.zoneId === zone.id).length
  }))

  const stats = [
    { label: "Total de leads", value: leads.length },
    { label: "Sin gestionar", value: leads.filter(l => l.status === "nuevo").length },
    { label: "Interesados", value: leads.filter(l => l.status === "interesado").length },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <FadeIn>
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold">Tu pipeline de prospección</h1>
          <p className="text-muted-foreground mt-1">Visualiza el estado de todos tus leads</p>
        </div>
      </FadeIn>

      {/* Stats */}
      <FadeIn delay={100}>
        <div className="grid sm:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="glass glass-border">
              <CardContent className="p-6 text-center">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </FadeIn>

      {/* Charts Row */}
      <FadeIn delay={200}>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <Card className="glass glass-border">
            <CardHeader>
              <CardTitle className="font-heading text-lg">Distribución por estado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--zinc-800)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'var(--zinc-50)'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                {statusData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-muted-foreground">{item.name} ({item.value})</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bar Chart - By niche */}
          <Card className="glass glass-border">
            <CardHeader>
              <CardTitle className="font-heading text-lg">Leads por nicho</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={nicheData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--zinc-800)" />
                    <XAxis type="number" stroke="var(--zinc-500)" />
                    <YAxis dataKey="name" type="category" stroke="var(--zinc-500)" width={100} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--zinc-800)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'var(--zinc-50)'
                      }}
                    />
                    <Bar dataKey="leads" fill="var(--lime)" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </FadeIn>

      <FadeIn delay={300}>
        <Card className="glass glass-border">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="font-heading text-lg">Leads por zona</CardTitle>
              <Select value={selectednicheForzones} onValueChange={setSelectednicheForzones}>
                <SelectTrigger className="w-[180px] bg-secondary/50 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {niches.map(n => (
                    <SelectItem key={n.id} value={n.id}>{n.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            {
              zoneData && (
                <>
                  {zoneData.length > 0 ? (
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={zoneData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--zinc-800)" />
                          <XAxis dataKey="name" stroke="var(--zinc-500)" />
                          <YAxis stroke="var(--zinc-500)" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'var(--zinc-800)',
                              border: 'none',
                              borderRadius: '8px',
                              color: 'var(--zinc-50)'
                            }}
                          />
                          <Bar dataKey="leads" fill="var(--lime)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No hay zones para este niche</p>
                      </div>
                    </div>
                  )}
                </>
              )
            }
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  )
}
