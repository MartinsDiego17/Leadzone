export const NAV_SECTIONS = [
  { label: "¿Te suena?", id: "problemas" },
  { label: "Funciones",  id: "funciones" },
  { label: "Empezar",    id: "cta"       },
]

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - 72
  window.scrollTo({ top: y, behavior: "smooth" })
}