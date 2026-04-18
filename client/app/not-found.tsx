import Link from "next/link";
import "./globals.css";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden select-none">

            {/* Glow de fondo centrado */}
            <div
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                aria-hidden
            >
                <div
                    className="w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[120px]"
                    style={{ background: "var(--color-primary)" }}
                />
            </div>

            {/* 404 gigante como fondo tipográfico */}
            <span
                className="pointer-events-none absolute font-extrabold leading-none select-none"
                style={{
                    fontSize: "clamp(160px, 28vw, 380px)",
                    color: "transparent",
                    WebkitTextStroke: "1px color-mix(in srgb, var(--color-primary) 15%, transparent)",
                    letterSpacing: "-0.04em",
                }}
                aria-hidden
            >
                404
            </span>

            {/* Contenido principal */}
            <div className="relative z-10 flex flex-col items-center text-center px-6 gap-5">
                <div
                    className="text-xs font-semibold tracking-[0.2em] uppercase px-3 py-1 rounded-full border"
                    style={{
                        color: "var(--color-primary)",
                        borderColor: "color-mix(in srgb, var(--color-primary) 30%, transparent)",
                        background: "color-mix(in srgb, var(--color-primary) 8%, transparent)",
                    }}
                >
                    Página no encontrada
                </div>

                <h1
                    className="font-extrabold leading-tight"
                    style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                >
                    Esta ruta no existe
                </h1>

                <p
                    className="max-w-sm text-base leading-relaxed"
                    style={{ color: "var(--color-text-secondary, #ccc)" }}
                >
                    Es posible que la página haya sido eliminada, movida, o que la URL esté mal escrita.
                </p>

                <Link
                    href="/"
                    className="mt-2 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
                    style={{
                        background: "var(--color-primary)",
                        color: "#000",
                    }}
                >
                    <ArrowLeft size={15} />
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
}