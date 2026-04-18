"use client";
import { useEffect } from "react";
import { MobileHeader } from "./MobileHeader"
import { Sidebar } from "./Sidebar"
import { useAuthStore } from "../../store/useAuthStore";

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {

  const setInfoUser = useAuthStore(state => state.setInfoUser);

  useEffect(() => {
    setInfoUser();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileHeader />
      <main className="lg:ml-64 min-h-screen pt-16 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
