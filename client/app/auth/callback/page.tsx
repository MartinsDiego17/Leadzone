"use client";

import { useEffect } from "react";
import { useRouter } from 'next/navigation'
import { useAuthStore } from "../../../store/useAuthStore";
import { Spinner } from "../../../components/ui/spinner";

export default function AuthCallback() {

    const router = useRouter()
    const currentSession = useAuthStore(state => state.session);

    useEffect(() => {

        if (currentSession) {
            router.push("/dashboard");
        } 
    }, [currentSession]);

    return (
        <div className="h-screen w-screen flex place-items-center justify-center">
            <Spinner className="size-20" color="var(--color-primary)" />
        </div>
    )
}