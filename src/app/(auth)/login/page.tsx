import LoginForm from '@/src/features/auth/components/login-form';
import { Suspense } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { ParticleBackground } from '@/src/features/landing/components/particle-background';

const highlights = [
  '연락처별 작업 이력 관리',
  '진행 중 / 완료 상태 추적',
  '거래처·프리랜서 모두 사용 가능',
];

export default function LoginPage() {
  return (
    <div className="flex h-screen">
      <ParticleBackground />
      {/* ── 좌측 70%: 히어로와 동일한 구조 ── */}
      <div className="hidden lg:flex lg:w-[65%] flex-col items-center justify-center overflow-auto px-6 pt-20 pb-8 text-center bg-background relative">
        {/* 뱃지 */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-sm font-medium text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          B2B 관계 관리의 새로운 기준
        </div>

        {/* 헤드라인 */}
        <h1 className="text-balance text-4xl font-bold leading-[1.15] tracking-tight text-foreground md:text-5xl lg:text-6xl">
          연락처가 아니라
          <br />
          <span className="bg-linear-to-r from-primary to-violet-400 bg-clip-text text-transparent">
            관계
          </span>
          를 기록하세요
        </h1>

        {/* 서브카피 */}
        <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground">
          영업팀, 프리랜서, 외주 개발팀을 위한 관계 중심 CRM.
          <br />
          거래처·파트너와 무슨 일을 했는지{' '}
          <strong className="font-medium text-foreground">
            잊지 않기
          </strong>{' '}
          위해 만들었습니다.
        </p>

        {/* 체크리스트 */}
        <ul className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:gap-5">
          {highlights.map((item) => (
            <li
              key={item}
              className="flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        {/* 미리보기 카드 */}
        <div className="mt-8 w-full max-w-2xl">
          <div className="rounded-xl border border-border bg-card/80 shadow-2xl shadow-black/10 backdrop-blur overflow-hidden">
            {/* 가짜 툴바 */}
            <div className="flex items-center gap-1.5 border-b border-border bg-muted/40 px-3 py-2">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              <div className="ml-3 h-4 flex-1 max-w-xs rounded-md bg-muted/60 text-[10px] flex items-center justify-center text-muted-foreground">
                app.relog.io/dashboard
              </div>
            </div>
            {/* 통계 카드 */}
            <div className="grid grid-cols-4 gap-2 p-3">
              {[
                {
                  label: '전체 연락처',
                  value: '24',
                  color: 'bg-blue-500/10 text-blue-500',
                },
                {
                  label: '진행 중 작업',
                  value: '7',
                  color: 'bg-amber-500/10 text-amber-500',
                },
                {
                  label: '완료된 작업',
                  value: '38',
                  color: 'bg-emerald-500/10 text-emerald-500',
                },
                {
                  label: '이번 달 신규',
                  value: '3',
                  color: 'bg-violet-500/10 text-violet-500',
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg border border-border bg-background/60 p-2.5"
                >
                  <p className="text-[9px] text-muted-foreground">{s.label}</p>
                  <p className={`mt-0.5 text-lg font-bold ${s.color}`}>
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
            {/* 연락처 리스트 */}
            <div className="grid grid-cols-2 gap-2 px-3 pb-3">
              {[
                { name: '김철수', company: '에이전시 A', date: '3월 20일' },
                { name: '이영희', company: '스타트업 B', date: '3월 18일' },
                { name: '박지민', company: '프리랜서', date: '3월 15일' },
              ].map((c) => (
                <div
                  key={c.name}
                  className="flex items-center gap-2 rounded-lg border border-border bg-background/60 px-2.5 py-2"
                >
                  <div className="h-6 w-6 rounded-md bg-primary/20 text-[10px] font-bold text-primary flex items-center justify-center shrink-0">
                    {c.name[0]}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-foreground truncate">
                      {c.name}
                    </p>
                    <p className="text-[9px] text-muted-foreground truncate">
                      {c.company}
                    </p>
                  </div>
                  <span className="ml-auto text-[9px] text-muted-foreground shrink-0">
                    {c.date}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-2 rounded-lg border border-border bg-background/60 px-2.5 py-2 opacity-40">
                <div className="h-6 w-6 rounded-md bg-muted shrink-0" />
                <div className="flex-1 space-y-1">
                  <div className="h-1.5 w-14 rounded bg-muted" />
                  <div className="h-1.5 w-9 rounded bg-muted" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 우측 30%: 로그인 폼 ── */}
      <div className="flex w-full lg:w-[35%] items-center justify-center bg-background border-l border-border px-6">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
