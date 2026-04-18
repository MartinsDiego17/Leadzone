"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Logo } from "../shared/Logo"
import { GoogleIcon } from "../shared/GoogleIcon"
import Image from "next/image"
import "./login.css";
import dashboardMockupImg from "../../public/images/dashboard-mockup.jpeg";
import { ArrowLeft } from "lucide-react"
import { useAuthStore } from "../../../client/store/useAuthStore"
import { useRedirectUser } from "../../../client/lib/redirectUser"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

export function LoginForm() {
  const loginWithGoogle = useAuthStore(state => state.loginWithGoogle);
  useRedirectUser();


  return (
    <div className="min-h-screen bg-background flex">

      {/* ── Left: image panel 70vw ── */}
      <div className="hidden lg:flex lg:w-[70vw] relative overflow-hidden">
        <Image
          src={dashboardMockupImg.src}
          alt="Dashboard preview"
          className="blur-[10px] absolute inset-0 w-full h-full object-cover"
          width={2000}
          height={1500}
        />
        <div className="absolute inset-0 bg-zinc-950/80" />
        <div className="relative z-10 flex flex-col justify-end p-10 w-full">
          <div className="w-fit p-5 login-tagline space-y-2">
            <p className="text-white/80 text-xl font-heading font-semibold leading-snug max-w-sm">
              Organiza tus leads de Google Maps en minutos.
            </p>
            <p className="text-white/80 text-sm">
              Importa, clasifica y haz seguimiento desde un solo lugar.
            </p>
          </div>
        </div>
      </div>

      {/* ── Right: form panel 30vw ── */}
      <div className="w-full lg:w-[30vw] px-10 flex items-center justify-center p-8 relative overflow-hidden border-l border-zinc-800/60">


        <div className="pb-30 w-full max-w-xm relative z-10 flex flex-col items-center gap-6">

          <Link
            href="/"
            className="shrink-0 focus-visible:outline-none"
          >
            <Logo className="text-xl sm:text-2xl" />
          </Link>

          <Card className="w-full py-10 bg-transparent login-form-container">
            <CardHeader className="text-center pb-2">
              <CardTitle className="font-heading text-2xl font-bold tracking-tight">
                Bienvenido
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Inicia sesión para gestionar tus leads y acceder a tu cuenta
              </CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-5 pt-2">
              <div className="flex items-center gap-3">
                <Separator className="flex-1 bg-zinc-800" />
                <span className="text-zinc-600 text-xs tracking-widest uppercase">Continuar con</span>
                <Separator className="flex-1 bg-zinc-800" />
              </div>

              <Button
                className="login-form-button"
                onClick={loginWithGoogle}
              >
                <GoogleIcon className="relative" />
                Iniciar sesión con Google
              </Button>

              <p className="text-xs text-zinc-600 text-center leading-relaxed">
                Al iniciar sesión, aceptás nuestros{" "}
                <span className="text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer font-medium">
                  Términos de servicio
                </span>{" "}
                y{" "}
                <span className="text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer font-medium">
                  Política de privacidad
                </span>
                .
              </p>
            </CardContent>
          </Card>

          <Link
            href="/"
            className="flex place-items-center gap-x-1  text-zinc-600 hover:text-zinc-400 text-sm transition-all duration-200 hover:gap-x-2"
          >
            <span><ArrowLeft size={15} strokeWidth={1} /></span>
            <span>Volver al inicio</span>
          </Link>
        </div>
      </div>
    </div>
  )
}