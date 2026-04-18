"use client"

import { NAV_SECTIONS } from "../../../lib/navsections"
import { NavLink } from "./Navlink"
import { SessionCTA } from "./SessionCta"
import { useNavScroll } from "../../../hooks/useNavSroll"

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
}

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const { handleSection } = useNavScroll(onClose)

  return (
    <div
      className={`sm:hidden transition-all duration-300 overflow-hidden ${
        open ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div
        className="px-4 py-4 space-y-1"
        style={{
          background: "color-mix(in srgb, var(--background) 95%, transparent)",
          backdropFilter: "blur(24px)",
          borderTop: "1px solid color-mix(in srgb, var(--foreground) 5%, transparent)",
        }}
      >
        {NAV_SECTIONS.map(({ label, id }) => (
          <NavLink
            key={id}
            label={label}
            onClick={() => handleSection(id)}
            fullWidth
          />
        ))}

        <div className="pt-2 w-full [&>*]:w-full [&>button]:justify-center">
          <SessionCTA variant="navbar" onNavigate={onClose} />
        </div>
      </div>
    </div>
  )
}