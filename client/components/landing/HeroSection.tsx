"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { FadeIn, SlideIn } from "../shared/Animations"
import { GoogleIcon } from "../shared/GoogleIcon"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[30%] right-[20%] w-[700px] h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, var(--lime-glow) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "breathe 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-[20%] left-[15%] w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, var(--lime-glow) 0%, transparent 70%)",
            filter: "blur(100px)",
            animation: "breathe 11s ease-in-out infinite reverse",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--background)_100%)]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-7">
            <FadeIn delay={100}>
              <h1
                className="font-heading text-[2.6rem] sm:text-[3.4rem] lg:text-[3.8rem] font-black text-foreground"
                style={{ lineHeight: "1.05", letterSpacing: "-0.03em" }}
              >
                Tus leads de{" "}
                <span
                  className="relative inline-block"
                  style={{
                    color: "var(--lime)",
                    textShadow: "0 0 40px var(--lime-glow-strong)",
                  }}
                >
                  Google Maps
                </span>
                ,<br />
                organizados y listos<br />
                <span className="text-muted-foreground">para convertir.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={200}>
              <p className="text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed">
                Importa CSVs de G-Maps Extractor, organízalos por niche y zone,
                y haz seguimiento de cada contacto desde un solo lugar.
              </p>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
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

                <button
                  className="button-rounded group cursor-pointer flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 hover:text-foreground"
                  style={{
                    color: "var(--muted-foreground)",
                    border: "1px solid var(--border)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "var(--zinc-600)"
                    e.currentTarget.style.background = "color-mix(in srgb, var(--zinc-900) 60%, transparent)"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "var(--border)"
                    e.currentTarget.style.background = "transparent"
                  }}
                  onClick={() => document.getElementById("como-funciona")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Ver cómo funciona
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                </button>
              </div>
            </FadeIn>
          </div>

          <SlideIn direction="right" delay={400}>
            <div className="relative group">
              <div
                className="absolute -inset-6 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: "radial-gradient(ellipse at center, var(--lime-glow-strong) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              <div
                className="relative rounded-2xl p-3 overflow-hidden"
                style={{
                  background: "color-mix(in srgb, var(--card) 85%, transparent)",
                  border: "1px solid color-mix(in srgb, var(--foreground) 7%, transparent)",
                  boxShadow: "0 0 0 1px color-mix(in srgb, var(--lime) 6%, transparent), 0 30px 80px rgba(0,0,0,0.7), inset 0 1px 0 color-mix(in srgb, var(--foreground) 4%, transparent)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
                  className="flex items-center gap-2 mb-3 pb-3"
                  style={{ borderBottom: "1px solid color-mix(in srgb, var(--border) 60%, transparent)" }}
                >
                  <div className="flex gap-1.5">
                    {(["hover:bg-red-500", "hover:bg-yellow-500", "hover:bg-lime-500"] as const).map((hov, i) => (
                      <div
                        key={i}
                        className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-colors ${hov}`}
                        style={{ background: "var(--zinc-800)" }}
                      />
                    ))}
                  </div>
                  <div
                    className="flex-1 rounded-md h-6 flex items-center px-3 gap-2"
                    style={{ background: "color-mix(in srgb, var(--zinc-900) 70%, transparent)" }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: "color-mix(in srgb, var(--lime) 60%, transparent)",
                        boxShadow: "0 0 4px var(--lime-glow-strong)",
                      }}
                    />
                    <span className="text-[10px] font-mono" style={{ color: "var(--zinc-600)" }}>
                      app.leadzone.com/dashboard
                    </span>
                  </div>
                </div>

                <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
                  <Image
                    src="/images/dashboard-mockup.jpeg"
                    alt="Leadzone Dashboard"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </div>

      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.6; }
        }
        @keyframes shine {
          0% { background-position: -100% 0; opacity: 0; }
          20% { opacity: 1; }
          100% { background-position: 200% 0; opacity: 0; }
        }
      `}</style>
    </section>
  )
}