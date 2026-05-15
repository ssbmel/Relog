"use client"

import { useEffect, useRef } from "react"

const N = 90        // 파티클 수
const SECTIONS = 7  // 섹션 수

type P = { x: number; y: number }

/** 결정론적 seeded random — 새로고침마다 같은 배치 */
function mkRng(seed: number) {
  let s = seed | 0
  return () => {
    s = Math.imul(s ^ (s >>> 15), s | 1) ^ Math.imul(s ^ (s >>> 7), s | 61)
    return ((s ^ (s >>> 14)) >>> 0) / 0x100000000
  }
}

function clamp01(v: number) {
  return Math.max(0.03, Math.min(0.97, v))
}

function buildFormations(): P[][] {
  const r = mkRng(0xc0ffee)
  const sp = (base: number, spread: number) => clamp01(base + (r() - 0.5) * spread)

  return [
    // 0 Hero — 네트워크 노드 클러스터
    (() => {
      const hubs = [
        [0.07,0.26],[0.13,0.13],[0.20,0.46],[0.27,0.31],
        [0.33,0.46],[0.45,0.26],[0.53,0.09],[0.57,0.57],
        [0.70,0.20],[0.65,0.80],[0.42,0.89],[0.78,0.49],
      ]
      return Array.from({ length: N }, (_, i) => {
        const h = hubs[i % hubs.length]
        return { x: sp(h[0], 0.10), y: sp(h[1], 0.10) }
      })
    })(),

    // 1 Stats — 4 클러스터
    Array.from({ length: N }, (_, i) => ({
      x: sp([0.20,0.40,0.60,0.80][i % 4], 0.14),
      y: sp(0.50, 0.40),
    })),

    // 2 Features — 3 수직 컬럼
    Array.from({ length: N }, (_, i) => ({
      x: sp([0.25,0.50,0.75][i % 3], 0.10),
      y: sp(0.15 + r() * 0.70, 0.04),
    })),

    // 3 How it works — 사인파 흐름
    Array.from({ length: N }, (_, i) => {
      const t = i / N
      return {
        x: clamp01(0.08 + t * 0.84 + (r() - 0.5) * 0.04),
        y: clamp01(0.45 + Math.sin(t * Math.PI * 3) * 0.22 + (r() - 0.5) * 0.10),
      }
    }),

    // 4 Testimonials — 3 유기적 군집
    Array.from({ length: N }, (_, i) => ({
      x: sp([0.22,0.50,0.78][i % 3], 0.16),
      y: sp(0.25 + r() * 0.50, 0.04),
    })),

    // 5 Pricing — 3 구조화된 컬럼
    Array.from({ length: N }, (_, i) => ({
      x: sp([0.25,0.50,0.75][i % 3], 0.07),
      y: clamp01(0.10 + (Math.floor(i / 3) / (N / 3)) * 0.80),
    })),

    // 6 CTA — 나선형 버스트
    Array.from({ length: N }, (_, i) => {
      const angle = (i / N) * Math.PI * 8
      const radius = (i / N) * 0.34
      return {
        x: clamp01(0.50 + Math.cos(angle) * radius),
        y: clamp01(0.45 + Math.sin(angle) * radius),
      }
    }),
  ]
}

/** 모듈 로드 시 1회 계산 (새로고침마다 동일) */
const FORMATIONS = buildFormations()
/** 파티클별 lerp 속도 — 약간씩 다르게 해서 유기적 느낌 */
const SPEEDS = Array.from({ length: N }, (_, i) => 0.05 + (i % 11) * 0.006)

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const posRef   = useRef<P[]>(FORMATIONS[0].map(p => ({ ...p })))
  const rafRef   = useRef(0)
  const scrollRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const container = document.getElementById("landing-scroll")
    const onScroll = () => { if (container) scrollRef.current = container.scrollTop }
    container?.addEventListener("scroll", onScroll, { passive: true })

    const draw = () => {
      const W = canvas.width, H = canvas.height
      const sectionF = scrollRef.current / window.innerHeight
      const si   = Math.min(Math.floor(sectionF), SECTIONS - 2)
      const prog = sectionF - Math.floor(sectionF)

      const FROM = FORMATIONS[si]
      const TO   = FORMATIONS[si + 1]
      const pos  = posRef.current

      const dark  = document.documentElement.classList.contains("dark")
      const baseC   = dark ? "200,210,255" : "30,40,80"   // 파란빛 도는 기본색
      const accentC = "59,130,246"                         // primary blue

      ctx.clearRect(0, 0, W, H)

      // 각 파티클의 목표 위치를 두 섹션 사이에서 선형 보간
      for (let i = 0; i < N; i++) {
        const tx = FROM[i].x + (TO[i].x - FROM[i].x) * prog
        const ty = FROM[i].y + (TO[i].y - FROM[i].y) * prog
        pos[i].x += (tx - pos[i].x) * SPEEDS[i]
        pos[i].y += (ty - pos[i].y) * SPEEDS[i]
      }

      // 가까운 파티클끼리 연결선
      ctx.lineWidth = 0.7
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = (pos[i].x - pos[j].x) * W
          const dy = (pos[i].y - pos[j].y) * H
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < 90) {
            const a = (1 - d / 90) * (dark ? 0.18 : 0.13)
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${baseC},${a})`
            ctx.moveTo(pos[i].x * W, pos[i].y * H)
            ctx.lineTo(pos[j].x * W, pos[j].y * H)
            ctx.stroke()
          }
        }
      }

      // 파티클 그리기
      for (let i = 0; i < N; i++) {
        const px = pos[i].x * W
        const py = pos[i].y * H

        const tx = FROM[i].x + (TO[i].x - FROM[i].x) * prog
        const ty = FROM[i].y + (TO[i].y - FROM[i].y) * prog
        const moving = Math.hypot((tx - pos[i].x) * W, (ty - pos[i].y) * H)
        const glow   = Math.min(moving / 70, 1)

        const isAccent = i % 7 === 0
        const color    = isAccent ? accentC : baseC
        const opacity  = isAccent
          ? 0.55 + glow * 0.45
          : (dark ? 0.25 : 0.20) + glow * 0.35
        const size = isAccent ? 2.8 : 1.8

        // 이동 중인 파티클에 글로우 효과
        if (glow > 0.12) {
          ctx.beginPath()
          ctx.arc(px, py, size + 4, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${color},${glow * 0.12})`
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(px, py, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color},${opacity})`
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
      container?.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: -1 }}
    />
  )
}
