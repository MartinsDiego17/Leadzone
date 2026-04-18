"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";

export const useRedirectUser = () => {
    const session = useAuthStore((state) => state.session);

    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleRedirect = async () => {

            // Sin sesión en rutas privadas → login
            if (!session && (pathname.startsWith("/dashboard"))) {
                router.replace("/login");
                return;
            }

            // Con sesión → redirección a dashboard
            if (session) {
                // En rutas públicas → redirigir según rol
                if (pathname === "/login") {
                    router.replace("/dashboard");
                    return;
                }
            }
        };

        handleRedirect();
    }, [session, pathname, router]);
};