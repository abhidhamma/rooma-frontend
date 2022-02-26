import { useState, useEffect } from 'react'

export function useScroll() {
  const [scrollY, setScrollY] = useState(0)
  const [canScrollCheck, setCanScrollCheck] = useState(true)

  const listener = () => {
    if (canScrollCheck) {
      setScrollY(window.pageYOffset)
      setCanScrollCheck(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', listener, { once: true })
    return () => window.removeEventListener('scroll', listener)
  })

  return {
    scrollY,
    canScrollCheck,
  }
}
