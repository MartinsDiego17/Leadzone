"use client"

import { useState, useEffect } from "react"
import { cn } from "../../../client/lib/utils"

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])
  
  return (
    <div 
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
    >
      {children}
    </div>
  )
}

interface SlideInProps {
  children: React.ReactNode
  direction?: "left" | "right"
  delay?: number
  className?: string
}

export function SlideIn({ children, direction = "left", delay = 0, className }: SlideInProps) {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])
  
  const translateClass = direction === "left" ? "-translate-x-12" : "translate-x-12"
  
  return (
    <div 
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-x-0" : `opacity-0 ${translateClass}`,
        className
      )}
    >
      {children}
    </div>
  )
}
