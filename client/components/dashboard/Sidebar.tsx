"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, Users, Upload, BarChart3, LogOut } from "lucide-react"
import { Logo } from "../shared/Logo"
import { Button } from "../ui/button"
import { LogoutModal } from "../shared/ModalLogout"
import { useState } from "react"
import { useAuthStore } from "../../store/useAuthStore"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/leads", label: "Leads", icon: Users },
  { href: "/dashboard/import", label: "Importar", icon: Upload },
  { href: "/dashboard/statistics", label: "Estadisticas", icon: BarChart3 },
]

export function Sidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const infoUser = useAuthStore(state => state.infoUser);
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card/95 backdrop-blur-xl border-r border-border flex flex-col z-40 hidden lg:flex">
      <div className="p-6 border-b border-border">
        <Link
          href="/"
          className="shrink-0 focus-visible:outline-none"
        >
          <Logo className="text-xl sm:text-2xl" />
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href))
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary text-sm font-medium">
              {infoUser?.fullname[0]}
              {infoUser?.fullname.split(" ")[1][0] ?? infoUser?.fullname[0]}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{infoUser?.fullname}</p>
            <p className="text-xs text-muted-foreground truncate">{infoUser?.email}</p>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="cursor-pointer button-rounded bg-transparent hover:bg-transparent transition-all duration-200 text-foreground active:scale-[0.97] "
          >
            <LogOut size={14} />
          </Button>

          <LogoutModal open={open} onClose={() => setOpen(false)} />
        </div>
      </div>
    </aside>
  )
}
