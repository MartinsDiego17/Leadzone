export type LeadStatus = "nuevo" | "contactado" | "interesado"

export interface Lead {
  id: string
  name: string
  phone: string
  email: string
  address?: string
  website?: string
  status: LeadStatus
  nicheId: string
  zoneId: string
  userId: string
  createdAt: string
}

export interface Niche {
  id: string
  name: string
  userId: string
}

export interface Zone {
  id: string
  name: string
  nicheId: string
  userId: string
}

export interface InfoUser {
  id: string
  email: string
  fullname: string
}