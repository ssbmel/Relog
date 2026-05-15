import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "../../../components/ui/button"

export function CtaSection() {
  return (
    <section className="relative overflow-hidden border-t border-border px-6 h-full flex flex-col justify-center">
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
          <Sparkles className="h-3.5 w-3.5" />
          지금 바로 시작하세요
        </div>
        <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          더 나은 B2B 관계 관리,
          <br />
          <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
            오늘부터 시작하세요
          </span>
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          신용카드 없이 무료로 시작할 수 있습니다.
          <br className="hidden md:block" />
          5분 안에 첫 번째 연락처를 등록해보세요.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg" className="h-12 rounded-full px-8 text-base shadow-lg shadow-primary/20">
            <Link href="/signup">
              무료로 시작하기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 rounded-full px-8 text-base bg-transparent">
            <Link href="/login">이미 계정이 있나요?</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
