"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { NAV_SECTIONS } from "../../../lib/navsections"
import { useNavScroll } from "../../../hooks/useNavSroll"
import { NavLink } from "./Navlink"
import { SessionCTA } from "./SessionCta"
import { MobileDrawer } from "./MobileDrawer"
import { useNavbarScroll } from "../../../hooks/useNavbarScroll"
import { Logo } from "../../shared/Logo"

export function NavbarNavLinks() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrolled } = useNavbarScroll()
  const { handleSection } = useNavScroll(() => setMobileOpen(false))

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={scrolled ? {
          background: "color-mix(in srgb, var(--background) 80%, transparent)",
          backdropFilter: "blur(24px)",
          borderBottom: "1px solid color-mix(in srgb, var(--foreground) 5%, transparent)",
          boxShadow: "0 1px 0 0 color-mix(in srgb, var(--foreground) 3%, transparent), 0 8px 32px rgba(0,0,0,0.6)",
        } : {}}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link
              href="/"
              onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) }}
              className="shrink-0 focus-visible:outline-none"
            >
              <Logo className="text-xl sm:text-2xl" />
            </Link>

            {/* Desktop links */}
            <ul className="hidden sm:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
              {NAV_SECTIONS.map(({ label, id }) => (
                <li key={id}>
                  <NavLink label={label} onClick={() => handleSection(id)} />
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <SessionCTA variant="navbar" />
            </div>

            {/* Mobile hamburger */}
            <button
              className="sm:hidden p-2 transition-colors"
              style={{ color: "var(--muted-foreground)" }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--foreground)" }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--muted-foreground)" }}
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
      </nav>

      <style>{`
        @keyframes navShine {
          0%   { background-position: -200% 0; opacity: 0; }
          20%  { opacity: 1; }
          100% { background-position: 200% 0; opacity: 0; }
        }
      `}</style>
    </>
  )
}