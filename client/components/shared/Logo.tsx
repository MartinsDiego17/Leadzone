import { cn } from "../../../client/lib/utils"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <span className={cn("font-heading font-bold tracking-tight", className)}>
      Lead<span className="text-primary">z</span>one
    </span>
  )
}
