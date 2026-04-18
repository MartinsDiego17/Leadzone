"use client"

import { useCallback } from "react"
import { scrollToId } from "../../client/lib/navsections"
import { usePathname } from "next/navigation"

export function useNavScroll(onNavigate?: () => void) {
  const pathname = usePathname()
  const isHome = pathname === "/"

  const handleSection = useCallback((id: string) => {
    onNavigate?.()
    if (isHome) {
      scrollToId(id)
    } else {
      window.location.href = `/#${id}`
    }
  }, [isHome, onNavigate])

  return { handleSection }
}