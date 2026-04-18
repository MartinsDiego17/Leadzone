"use client"

import Link from "next/link"
import { NavLinks } from "./header/NavLinks"
import { Logo } from "../shared/Logo"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Logo className="text-xl text-foreground" />
          </div>
          <div>
            <NavLinks />
          </div>
        </div>

        <div className="mt-8 pt-8  flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-zinc-500 text-sm">© {year} Leadzone. Casi los derechos reservados.</p>
          <p className="text-zinc-500 text-sm">
            Desarrollado por{" "}
            <Link
              href="https://portfolio-cyan-delta-17.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-lime-light transition-colors duration-200"
            >
              Diego Martins
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}