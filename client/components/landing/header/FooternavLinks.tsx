"use client"

import { NAV_SECTIONS } from "../../../lib/navsections"
import { useNavScroll } from "../../../hooks/useNavSroll"
import { NavLink } from "./Navlink"
import { SessionCTA } from "./SessionCta"

export function FooterNavLinks() {
  const { handleSection } = useNavScroll()

  return (
    <nav className="flex items-center gap-1">
      {NAV_SECTIONS.map(({ label, id }) => (
        <NavLink key={id} label={label} onClick={() => handleSection(id)} />
      ))}
      <SessionCTA variant="footer" />
    </nav>
  )
}