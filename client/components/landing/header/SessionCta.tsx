"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, LogOut } from "lucide-react"
import { useAuthStore } from "../../../store/useAuthStore"
import { LogoutModal } from "../../shared/ModalLogout"
import { Button } from "../../ui/button"

interface SessionCTAProps {
  /** "navbar" renderiza el botón con gradiente lime y flecha.
   *  "footer" renderiza solo texto. */
  variant?: "navbar" | "footer"
  onNavigate?: () => void
}

export function SessionCTA({ variant = "navbar", onNavigate }: SessionCTAProps) {
  const [open, setOpen] = useState(false)
  const currentSession = useAuthStore(state => state.session)

  if (currentSession) {
    return (
      <>
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className="cursor-pointer px-3 py-1.5 text-sm transition-colors duration-200 rounded-lg"
          style={{ color: "var(--muted-foreground)" }}
          onMouseEnter={e => { e.currentTarget.style.color = "var(--foreground)" }}
          onMouseLeave={e => { e.currentTarget.style.color = "var(--muted-foreground)" }}
        >
          Dashboard
        </Link>

        <Button
          onClick={() => setOpen(true)}
          className="cursor-pointer flex  button-rounded items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border transition-all duration-200 text-foreground border-foreground/10 bg-foreground/5 active:scale-[0.97] hover:bg-foreground/7"
        >
          <LogOut size={14} />
          <span>Cerrar sesión</span>
        </Button>

        <LogoutModal open={open} onClose={() => setOpen(false)} />
      </>
    )
  }

  if (variant === "footer") {
    return (
      <Link
        href="/login"
        className="cursor-pointer px-3 py-1.5 text-sm button-rounded transition-colors duration-200"
        style={{ color: "var(--muted-foreground)" }}
        onMouseEnter={e => { e.currentTarget.style.color = "var(--foreground)" }}
        onMouseLeave={e => { e.currentTarget.style.color = "var(--muted-foreground)" }}
      >
        Iniciar sesión
      </Link>
    )
  }

  return (
    <Link href="/login" onClick={onNavigate}>
      <button
        className="button-rounded cursor-pointer relative group flex items-center gap-2 px-4 py-2 text-sm font-semibold overflow-hidden transition-all duration-200 opacity-90 hover:opacity-100 active:scale-[0.97]"
        style={{
          background: "linear-gradient(135deg, var(--lime-light) 0%, var(--lime-dark) 100%)",
          color: "var(--primary-foreground)",
          boxShadow: "0 0 0 1px color-mix(in srgb, var(--lime) 25%, transparent), 0 2px 12px var(--lime-glow-strong), inset 0 1px 0 rgba(255,255,255,0.2)",
        }}
      >
        <span
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{
            background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.25) 50%, transparent 65%)",
            animation: "navShine 1.4s ease-in-out infinite",
          }}
        />
        <span>Iniciar sesión</span>
        <ArrowRight size={14} />
      </button>
    </Link>
  )
}