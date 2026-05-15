import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "기존 CRM은 너무 복잡했는데, Relog는 정말 필요한 것만 있어요. 거래처 히스토리를 팀원과 공유하는 게 이렇게 쉬울 줄 몰랐습니다.",
    name: "김지훈",
    role: "영업 팀장",
    company: "마케팅 에이전시",
    initial: "김",
    color: "bg-blue-500/15 text-blue-600",
  },
  {
    quote: "프리랜서로 여러 클라이언트를 관리하다 보면 누구와 무엇을 했는지 헷갈릴 때가 많았는데, 이제는 Relog 하나로 깔끔하게 정리됩니다.",
    name: "이수진",
    role: "UX 디자이너",
    company: "프리랜서",
    initial: "이",
    color: "bg-violet-500/15 text-violet-600",
  },
  {
    quote: "외주 개발팀을 운영하면서 파트너사별 작업 이력을 관리하는 게 항상 고민이었습니다. Relog 덕분에 온보딩 시간이 절반으로 줄었어요.",
    name: "박성민",
    role: "대표",
    company: "소프트웨어 스타트업",
    initial: "박",
    color: "bg-emerald-500/15 text-emerald-600",
  },
]

export function TestimonialsSection() {
  return (
    <section className="relative border-t border-border px-6 h-full flex flex-col justify-center">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-secondary/30 to-background" />
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            Testimonials
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            이미 사용 중인
            <br />
            <span className="text-muted-foreground font-normal">고객들의 이야기</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5"
            >
              <Quote className="mb-4 h-6 w-6 text-primary/25" />
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${t.color}`}>
                  {t.initial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role} · {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
