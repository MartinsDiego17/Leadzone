"use client"

import Link from "next/link"
import { NAV_SECTIONS } from "../../../lib/navsections"
import { useNavScroll } from "../../../hooks/useNavSroll"

export function NavLinks() {
  const { handleSection } = useNavScroll()

  return (
    <>
      {NAV_SECTIONS.map(({ label, id }) => (
        <button
          key={id}
          onClick={() => handleSection(id)}
          className="cursor-pointer relative px-3 py-1.5 text-sm transition-colors duration-200 rounded-lg group"
          style={{ color: "var(--muted-foreground)" }}
          onMouseEnter={e => { e.currentTarget.style.color = "var(--foreground)" }}
          onMouseLeave={e => { e.currentTarget.style.color = "var(--muted-foreground)" }}
        >
          {label}
          <span
            className="absolute bottom-0.5 left-3 right-3 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"
            style={{ background: "var(--lime)" }}
          />
        </button>
      ))}
      <Link
        href="/login"
        className="cursor-pointer px-3 py-1.5 text-sm rounded-lg transition-colors duration-200"
        style={{ color: "var(--muted-foreground)" }}
        onMouseEnter={e => { e.currentTarget.style.color = "var(--foreground)" }}
        onMouseLeave={e => { e.currentTarget.style.color = "var(--muted-foreground)" }}
      >
        Iniciar sesión
      </Link>
    </>
  )
}