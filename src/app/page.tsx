import { FeaturesSection } from '../features/landing/components/features-section';
import { HeroSection } from '../features/landing/components/hero-section';
import { StatsSection } from '../features/landing/components/stats-section';
import { HowItWorksSection } from '../features/landing/components/how-it-works-section';
import { TestimonialsSection } from '../features/landing/components/testimonials-section';
import { PricingSection } from '../features/landing/components/pricing-section';
import { CtaSection } from '../features/landing/components/cta-section';
import { LandingFooter } from '../components/layout/landing/landing-footer';
import { LandingNav } from '../components/layout/landing/landing-nav';
import { ParticleBackground } from '../features/landing/components/particle-background';
import { HorizontalSlider } from '../features/landing/components/horizontal-slider';
import { createClient } from '@/src/utils/supabase/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const session = await getServerSession(authOptions);

  if (user || session) {
    redirect('/dashboard');
  }

  return (
    <div id="landing-scroll" className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <ParticleBackground />

      {/* 공용 배경 블롭 — 모든 섹션에 걸쳐 고정 표시 */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <div
          className="absolute left-1/2 top-0 h-150 w-200 rounded-full bg-primary/10 blur-3xl"
          style={{ animation: 'hero-blob-1 13s ease-in-out infinite' }}
        />
        <div
          className="absolute left-1/4 top-1/3 h-80 w-80 rounded-full bg-violet-500/8 blur-3xl"
          style={{ animation: 'hero-blob-2 15s ease-in-out infinite' }}
        />
        <div
          className="absolute right-1/4 top-1/4 h-80 w-80 rounded-full bg-blue-500/8 blur-3xl"
          style={{ animation: 'hero-blob-3 17s ease-in-out infinite' }}
        />
      </div>

      <LandingNav />

      {/* HorizontalSlider 내부에 N * 100vh 높이가 있어 스크롤 범위 확보 */}
      <HorizontalSlider>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection />
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <CtaSection />
          </div>
          <LandingFooter />
        </div>
      </HorizontalSlider>
    </div>
  );
}
