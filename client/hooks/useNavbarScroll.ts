"use client"

import { useState, useEffect } from "react"

const SCROLL_THRESHOLD = 24

export function useNavbarScroll() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return { scrolled }
}