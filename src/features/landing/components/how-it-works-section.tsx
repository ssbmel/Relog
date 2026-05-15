import { Plus, PenLine, LayoutDashboard } from "lucide-react"

const steps = [
  {
    icon: Plus,
    title: "연락처 등록",
    description: "거래처, 파트너, 프리랜서를 빠르게 등록하세요. 이름, 회사, 연락처만으로 충분합니다.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    preview: [
      { label: "이름", value: "김지훈" },
      { label: "회사", value: "에이전시 A" },
      { label: "연락처", value: "010-1234-5678" },
    ],
  },
  {
    icon: PenLine,
    title: "이력 기록",
    description: "미팅, 계약, 협업 내용을 날짜와 함께 기록하세요. 중요한 순간을 절대 잊지 않습니다.",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    preview: [
      { label: "3월 20일", value: "계약 협의 미팅" },
      { label: "3월 15일", value: "제안서 전달" },
      { label: "3월 8일", value: "첫 컨택" },
    ],
  },
  {
    icon: LayoutDashboard,
    title: "현황 파악",
    description: "진행 중인 작업과 완료된 이력을 대시보드에서 한눈에 확인하고 우선순위를 정하세요.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    preview: [
      { label: "진행 중", value: "7건" },
      { label: "완료", value: "38건" },
      { label: "이번 달 신규", value: "3건" },
    ],
  },
]

export function HowItWorksSection() {
  return (
    <section className="relative border-t border-border px-6 h-full flex flex-col justify-center">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            How it works
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            3단계로 시작하는
            <br />
            <span className="text-muted-foreground font-normal">관계 관리의 새로운 방법</span>
          </h2>
        </div>

        <div className="relative grid gap-8 md:grid-cols-3">
          <div
            className="pointer-events-none absolute top-8 left-0 hidden w-full md:flex items-center"
            aria-hidden
          >
            <div className="mx-[calc(16.67%+28px)] h-px flex-1 border-t border-dashed border-border" />
          </div>

          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center text-center">
              <div className={`relative mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${step.bg} ring-1 ring-border`}>
                <step.icon className={`h-7 w-7 ${step.color}`} />
                <span className={`absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-[11px] font-bold ${step.color}`}>
                  {i + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground max-w-[220px]">
                {step.description}
              </p>
              <div className="mt-5 w-full rounded-xl border border-border bg-card/70 p-4 backdrop-blur">
                <div className="space-y-2">
                  {step.preview.map((row) => (
                    <div key={row.label} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{row.label}</span>
                      <span className="font-medium text-foreground">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
