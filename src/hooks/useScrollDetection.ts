import { useState, useEffect, useRef } from "react"

export function useScrollDetection() {
  const [scrolled, setScrolled] = useState(false)
  const scrollRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const handler = () => setScrolled(el.scrollTop > 8)
    el.addEventListener("scroll", handler, { passive: true })
    return () => el.removeEventListener("scroll", handler)
  }, [])

  return { scrolled, scrollRef }
}
