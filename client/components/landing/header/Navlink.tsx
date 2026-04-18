"use client"

interface NavLinkProps {
  label: string
  onClick: () => void
  fullWidth?: boolean
}

export function NavLink({ label, onClick, fullWidth = false }: NavLinkProps) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer relative px-3 py-1.5 text-sm transition-colors duration-200 rounded-lg group ${fullWidth ? "w-full text-left" : ""}`}
      style={{ color: "var(--muted-foreground)" }}
      onMouseEnter={e => {
        e.currentTarget.style.color = "var(--foreground)"
        if (fullWidth) e.currentTarget.style.background = "color-mix(in srgb, var(--foreground) 5%, transparent)"
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color = "var(--muted-foreground)"
        if (fullWidth) e.currentTarget.style.background = "transparent"
      }}
    >
      {label}
      {!fullWidth && (
        <span
          className="absolute bottom-0.5 left-3 right-3 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"
          style={{ background: "var(--lime)" }}
        />
      )}
    </button>
  )
}