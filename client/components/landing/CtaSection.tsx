"use client"

import Link from "next/link"
import { FadeIn } from "../shared/Animations"
import { GoogleIcon } from "../shared/GoogleIcon"
import { Button } from "../ui/button"

export function CTASection() {
  return (
    <section id="cta" className="py-20  sm:py-32 relative overflow-hidden">

      <div className="w-full  mx-auto relative z-10">
        <FadeIn>
          <div className="cta-section relative py-20  w-full border bg-transparent overflow-hidden">

            <div className="relative z-10 px-8 py-16 sm:px-16 text-center flex flex-col items-center gap-5">

              {/* Label */}
              <p className="text-primary text-xs font-semibold tracking-[0.2em] uppercase">
                Empieza gratis
              </p>

              {/* Heading */}
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                Empieza a organizar tus leads hoy
              </h2>

              {/* Subtext */}
              <p className="text-muted-foreground text-base max-w-sm">
                Gratis hasta 200 leads. Sin tarjeta de crédito.
              </p>

              {/* CTA button */}
              <Link href="/login">
                <button
                  className="button-rounded group relative flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold cursor-pointer overflow-hidden transition-all duration-300 opacity-90 hover:opacity-100 active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg, var(--lime-light) 0%, var(--lime-dark) 100%)",
                    color: "var(--primary-foreground)",
                    boxShadow: "0 0 0 1px color-mix(in srgb, var(--lime) 30%, transparent), 0 4px 24px var(--lime-glow-strong), inset 0 1px 0 rgba(255,255,255,0.25)",
                  }}
                >
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)",
                      backgroundSize: "200% 100%",
                      animation: "shine 1.5s ease-in-out infinite",
                    }}
                  />
                  <GoogleIcon className="relative size-5" />
                  Empezar gratis con Google
                </button>
              </Link>

            </div>

          </div>
        </FadeIn>
      </div>
    </section>
  )
}