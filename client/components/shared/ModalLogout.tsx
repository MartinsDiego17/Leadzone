"use client"

import { useState } from "react"
import { LogOut } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog"
import { useAuthStore } from "../../../client/store/useAuthStore"
import { Button } from "../ui/button"

interface LogoutModalProps {
  open: boolean
  onClose: () => void
}

export function LogoutModal({ open, onClose }: LogoutModalProps) {
  const [loading, setLoading] = useState(false)
  const logout = useAuthStore(state => state.logout)

  const handleLogout = async () => {
    setLoading(true)
    await logout()
    setLoading(false)
    onClose()
  }

  return (
    <>
      <Dialog open={open} onOpenChange={v => !v && onClose()}>
        <DialogContent>
          <DialogHeader className="pt-2">
            <div
              className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full"
              style={{ background: "color-mix(in srgb, var(--lime) 10%, transparent)" }}
            >
              <LogOut size={18} style={{ color: "var(--lime)" }} />
            </div>

            <DialogTitle
              className="text-center text-base font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              ¿Cerrar sesión?
            </DialogTitle>

            <DialogDescription
              className="text-center text-sm"
              style={{ color: "var(--muted-foreground)" }}
            >
              Tu sesión actual se cerrará. Podrás volver a iniciar sesión cuando quieras.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-2 flex-col gap-2 sm:flex-col">
            <Button
              onClick={handleLogout}
              disabled={loading}
              className="w-full font-semibold transition-all duration-200 active:scale-[0.98] relative overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, var(--lime-light) 0%, var(--lime-dark) 100%)",
                color: "var(--primary-foreground)",
                opacity: loading ? 0.7 : 1,
              }}
            >
              <span
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.2) 50%, transparent 65%)",
                  backgroundSize: "200% 100%",
                  animation: "navShine 1.4s ease-in-out infinite",
                }}
              />
              {loading ? "Cerrando sesión…" : "Sí, cerrar sesión"}
            </Button>

            <Button
              variant="ghost"
              onClick={onClose}
              disabled={loading}
              className="w-full text-sm transition-colors duration-150"
              style={{ color: "var(--muted-foreground)" }}
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}