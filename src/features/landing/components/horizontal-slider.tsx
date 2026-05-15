"use client"

import { Children, useEffect, useRef } from "react"

interface Props {
  children: React.ReactNode
}

export function HorizontalSlider({ children }: Props) {
  const childArray = Children.toArray(children)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const root = document.getElementById("landing-scroll")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("section-visible", entry.isIntersecting)
        })
      },
      { threshold: 0.4, root }
    )

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <>
      {childArray.map((child, i) => (
        <div
          key={i}
          ref={(el) => { itemRefs.current[i] = el }}
          className="h-screen snap-start section-snap"
        >
          {child}
        </div>
      ))}
    </>
  )
}
