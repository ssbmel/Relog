"use client"

import { useEffect, useRef, useState } from "react"
import { Users, FileText, Star, Zap } from "lucide-react"

const stats = [
  {
    value: 1200,
    suffix: "+",
    label: "활성 사용자",
    description: "영업팀, 프리랜서, 스타트업이 함께 사용 중",
    icon: Users,
    color: "text-blue-500",
    gradientFrom: "from-blue-500/15",
    gradientTo: "to-blue-500/3",
    border: "border-blue-500/25",
    glow: "hover:shadow-blue-500/15",
    iconBg: "bg-blue-500/10",
  },
  {
    value: 48000,
    suffix: "+",
    label: "관리된 연락처",
    description: "거래처, 파트너, 프리랜서 전체",
    icon: FileText,
    color: "text-violet-500",
    gradientFrom: "from-violet-500/15",
    gradientTo: "to-violet-500/3",
    border: "border-violet-500/25",
    glow: "hover:shadow-violet-500/15",
    iconBg: "bg-violet-500/10",
  },
  {
    value: 98,
    suffix: "%",
    label: "고객 만족도",
    description: "실제 사용자 설문 기반",
    icon: Star,
    color: "text-amber-500",
    gradientFrom: "from-amber-500/15",
    gradientTo: "to-amber-500/3",
    border: "border-amber-500/25",
    glow: "hover:shadow-amber-500/15",
    iconBg: "bg-amber-500/10",
  },
  {
    value: 5,
    suffix: "분",
    label: "평균 온보딩",
    description: "바로 시작, 복잡한 설정 없음",
    icon: Zap,
    color: "text-emerald-500",
    gradientFrom: "from-emerald-500/15",
    gradientTo: "to-emerald-500/3",
    border: "border-emerald-500/25",
    glow: "hover:shadow-emerald-500/15",
    iconBg: "bg-emerald-500/10",
  },
]

function useCountUp(target: number, duration: number, enabled: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!enabled) return
    let startTime: number | null = null

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(target * eased))
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [target, duration, enabled])

  return count
}

type Stat = typeof stats[0]

function StatCard({ stat, animate }: { stat: Stat; animate: boolean }) {
  const count = useCountUp(stat.value, 2200, animate)

  return (
    <div
      className={`group relative flex flex-col items-center overflow-hidden rounded-3xl border ${stat.border} bg-gradient-to-b ${stat.gradientFrom} ${stat.gradientTo} p-8 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${stat.glow}`}
    >
      {/* 배경 장식 원 */}
      <div className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full ${stat.iconBg} blur-2xl opacity-60`} />

      {/* 아이콘 */}
      <div className={`relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${stat.iconBg} ring-1 ${stat.border}`}>
        <stat.icon className={`h-6 w-6 ${stat.color}`} />
      </div>

      {/* 숫자 */}
      <p className={`text-5xl font-bold tabular-nums tracking-tight ${stat.color}`}>
        {count.toLocaleString()}
        {stat.suffix}
      </p>

      {/* 구분선 */}
      <div className={`my-3 h-px w-10 rounded-full opacity-40 ${stat.iconBg}`} />

      {/* 레이블 */}
      <p className="text-base font-semibold text-foreground">{stat.label}</p>

      {/* 설명 */}
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{stat.description}</p>
    </div>
  )
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative border-t border-border px-6 h-full flex flex-col justify-center">
      {/* 배경 */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-secondary/20 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/4 blur-3xl" />

      <div className="mx-auto w-full max-w-5xl">
        {/* 섹션 헤더 */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            Numbers
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            신뢰할 수 있는 숫자들
            <br />
            <span className="font-normal text-muted-foreground">직접 확인해보세요</span>
          </h2>
        </div>

        {/* 스탯 그리드 */}
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} animate={animate} />
          ))}
        </div>
      </div>
    </section>
  )
}
