import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "../../../components/ui/button"

const plans = [
  {
    name: "무료",
    price: null,
    description: "처음 시작하는 개인 사용자",
    features: ["연락처 최대 30개", "작업 이력 무제한", "기본 대시보드", "모바일 접근"],
    cta: "무료로 시작하기",
    href: "/signup",
    highlight: false,
  },
  {
    name: "프로",
    price: "19,900",
    description: "성장하는 개인 전문가를 위해",
    features: ["연락처 무제한", "작업 이력 무제한", "고급 필터 & 검색", "CSV 내보내기", "우선 지원"],
    cta: "프로 시작하기",
    href: "/signup?plan=pro",
    highlight: true,
    badge: "인기",
  },
  {
    name: "팀",
    price: "49,900",
    description: "함께 일하는 팀을 위해",
    features: ["팀원 최대 5명", "연락처 무제한", "팀 공유 대시보드", "역할 권한 관리", "전담 지원"],
    cta: "팀 시작하기",
    href: "/signup?plan=team",
    highlight: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="relative border-t border-border px-6 h-full flex flex-col justify-center">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-background via-secondary/20 to-background" />
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            Pricing
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            합리적인 요금제로
            <br />
            <span className="text-muted-foreground font-normal">지금 바로 시작하세요</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
                plan.highlight
                  ? "border-primary bg-card shadow-lg shadow-primary/10"
                  : "border-border bg-card"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground shadow">
                  {plan.badge}
                </span>
              )}

              <div className="mb-8">
                <h3 className={`text-lg font-semibold ${plan.highlight ? "text-primary" : "text-foreground"}`}>
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-4 flex items-end gap-1">
                  {plan.price ? (
                    <>
                      <span className="text-4xl font-bold tracking-tight text-foreground">₩{plan.price}</span>
                      <span className="mb-1 text-sm text-muted-foreground">/월</span>
                    </>
                  ) : (
                    <span className="text-4xl font-bold tracking-tight text-foreground">무료</span>
                  )}
                </div>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <Check className={`h-4 w-4 shrink-0 ${plan.highlight ? "text-primary" : "text-emerald-500"}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                asChild
                variant={plan.highlight ? "default" : "outline"}
                className={`h-11 rounded-full ${plan.highlight ? "shadow-md shadow-primary/20" : "bg-transparent"}`}
              >
                <Link href={plan.href} className="flex items-center justify-center gap-2">
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
