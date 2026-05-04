"use client"

import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Input } from "../ui/input"
import { Card, CardContent } from "../ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog"
import type { Lead, LeadStatus, Zone } from "../../lib/types"
import { Search, Upload, ChevronDown, ChevronRight, Trash2, Users, ExternalLink } from "lucide-react"
import { FadeIn } from "../shared/Animations"
import { useLeadsStore } from "../../store/useLeadsStore"

/**
 * Formats a phone string into a WhatsApp-compatible number.
 * Strips spaces, dashes, parentheses, and leading zeros from the area code.
 * Example: "011 3411 9699" → "1134119699"
 */
function formatWhatsAppNumber(phone: string): string {
  // Remove all non-digit characters
  let digits = phone.replace(/\D/g, "")
  // Remove leading 0 (common in Argentine local numbers: "011..." → "11...")
  digits = digits.replace(/^0+/, "")
  return digits
}

export function LeadsTable() {

  const { leads, niches, zones, updateLeadStatus, deleteLead, getnicheName, getzoneName, getzonesByniche, loadLeads } = useLeadsStore()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterniche, setFilterniche] = useState<string>(searchParams.get("niche") ?? "all")
  const [filterzone, setFilterzone] = useState<string>(searchParams.get("zone") ?? "all")
  const [filterstatus, setFilterstatus] = useState<string>("all")
  const [filteredZones, setFilteredZones] = useState<Zone[]>([])

  // Delete confirmation modal state
  const [leadToDelete, setLeadToDelete] = useState<Lead | null>(null)

  const filteredLeads = leads.filter((lead: Lead) => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesniche = filterniche === "all" || lead.nicheId === filterniche
    const matcheszone = filterzone === "all" || lead.zoneId === filterzone
    const matchesstatus = filterstatus === "all" || lead.status === filterstatus
    return matchesSearch && matchesniche && matcheszone && matchesstatus
  })

  const getStatusBadgeClass = (status: LeadStatus) => {
    switch (status) {
      case "nuevo": return "bg-status-nuevo text-status-nuevo-text hover:bg-zinc-600"
      case "contactado": return "bg-status-contactado text-status-contactado-text hover:bg-indigo-900"
      case "interesado": return "bg-status-interesado text-status-interesado-text hover:bg-primary/90"
    }
  }

  useEffect(() => {
    const fetchZones = async () => {
      if (filterniche === "all") {
        const response = await getzonesByniche("all");
        return setFilteredZones(response);
      };

      const response = await getzonesByniche(filterniche);
      setFilteredZones(response);
    }

    fetchZones();
  }, [filterniche])

  useEffect(() => {
    loadLeads()
  }, [leads.length, updateLeadStatus]);

  const currentNameNiche = (id: string) => niches.find(n => n.id === id)?.name ?? "";
  const currentNameZone = (id: string) => zones.find(z => z.id === id)?.name ?? "";

  const handleConfirmDelete = () => {
    if (leadToDelete) {
      deleteLead(leadToDelete.id)
      setLeadToDelete(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="font-heading text-2xl sm:text-3xl font-bold">Leads</h1>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90 glow-lime"
            asChild
          >
            <Link href="/dashboard/import">
              <Upload className="w-4 h-4 mr-2" />
              Importar CSV
            </Link>
          </Button>
        </div>
      </FadeIn>

      {/* Filters */}
      <FadeIn delay={100}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Select value={filterniche} onValueChange={(v) => { setFilterniche(v); setFilterzone("all"); }}>
            <SelectTrigger className="glass glass-border">
              <SelectValue placeholder="niche" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">Todos los nichos</SelectItem>
              {niches.map(niche => (
                <SelectItem key={niche.id} value={niche.id}>{niche.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterzone} onValueChange={setFilterzone}>
            <SelectTrigger className="glass glass-border">
              <SelectValue placeholder="zone" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">Todas las zonas</SelectItem>
              {filteredZones && (
                <>
                  {filteredZones.map(zone => (
                    <SelectItem key={zone.id} value={zone.id}>{zone.name}</SelectItem>
                  ))}
                </>
              )}
            </SelectContent>
          </Select>

          <Select value={filterstatus} onValueChange={setFilterstatus}>
            <SelectTrigger className="glass glass-border">
              <SelectValue placeholder="status" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="nuevo">Nuevo</SelectItem>
              <SelectItem value="contactado">Contactado</SelectItem>
              <SelectItem value="interesado">Interesado</SelectItem>
            </SelectContent>
          </Select>

          <div className="relative col-span-2 lg:col-span-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 glass glass-border"
            />
          </div>
        </div>
      </FadeIn>

      {/* Table */}
      <FadeIn delay={200}>
        {filteredLeads.length > 0 ? (
          <div className="glass glass-border rounded-xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Nombre</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Teléfono</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Website</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Estado</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">Nicho / Zona</th>
                    <th className="text-right p-4 text-sm font-medium text-muted-foreground">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors">
                      <td className="p-4">
                        <p className="font-medium">{lead.name}</p>
                        {/* Mobile: show phone inline with WhatsApp link */}
                        <p className="text-sm text-muted-foreground sm:hidden">
                          {lead.phone ? (
                            <span className="inline-flex items-center gap-1">
                              {lead.phone}
                              <a
                                href={`https://wa.me/${formatWhatsAppNumber(lead.phone)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:text-primary/80 transition-colors"
                                title="Contactar por WhatsApp"
                              >
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </span>
                          ) : "-"}
                        </p>
                      </td>

                      {/* Desktop: phone column with WhatsApp link */}
                      <td className="p-4 hidden sm:table-cell">
                        {lead.phone ? (
                          <span className="inline-flex items-center gap-2 text-muted-foreground">
                            {lead.phone}
                            <a
                              href={`https://wa.me/${formatWhatsAppNumber(lead.phone)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80 transition-colors"
                              title="Contactar por WhatsApp"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>

                      <td className="p-4 hidden sm:table-cell">
                        {lead.website ? (
                          <span className="inline-flex items-center gap-2 text-muted-foreground">
                            Sitio web
                            <a
                              href={lead.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80 transition-colors"
                              title="Contactar por WhatsApp"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="p-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="focus:outline-none">
                              <Badge className={`${getStatusBadgeClass(lead.status)} cursor-pointer transition-colors`}>
                                {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                                <ChevronDown className="w-3 h-3 ml-1" />
                              </Badge>
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-card border-border">
                            <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, "nuevo")}>
                              Nuevo
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, "contactado")}>
                              Contactado
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, "interesado")}>
                              Interesado
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                      <td className="p-4 text-muted-foreground hidden lg:table-cell">
                        {currentNameNiche(lead.nicheId)} <ChevronRight className="w-3 h-3 inline text-zinc-600" /> {currentNameZone(lead.zoneId)}
                      </td>
                      <td className="p-4 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          onClick={() => setLeadToDelete(lead)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <Card className="glass glass-border">
            <CardContent className="py-16 text-center">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading text-lg font-medium mb-2">No encontramos leads con ese filtro</h3>
              <p className="text-muted-foreground">Prueba ajustando los filtros o importando nuevos leads.</p>
            </CardContent>
          </Card>
        )}
      </FadeIn>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={!!leadToDelete} onOpenChange={(open) => { if (!open) setLeadToDelete(null) }}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar este lead?</AlertDialogTitle>
            <AlertDialogDescription>
              Estás por eliminar a <span className="font-medium text-foreground">{leadToDelete?.name}</span>. Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="glass glass-border">Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleConfirmDelete}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  )
}