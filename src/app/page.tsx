import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/layout/BackToTop';
import { Hero } from '@/components/landing/Hero';
import { StatsBand } from '@/components/landing/StatsBand';
import { ValueProposition } from '@/components/landing/ValueProposition';
import { SportsShowcase } from '@/components/landing/SportsShowcase';
import { AthleteFocus } from '@/components/landing/AthleteFocus';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { ProfilePreview } from '@/components/landing/ProfilePreview';
import { Ecosystem } from '@/components/landing/Ecosystem';
import { FinalCta } from '@/components/landing/FinalCta';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsBand />
        <ValueProposition />
        <SportsShowcase />
        <AthleteFocus />
        <HowItWorks />
        <ProfilePreview />
        <Ecosystem />
        <FinalCta />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
