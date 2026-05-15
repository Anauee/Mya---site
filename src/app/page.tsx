import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import WaveMarquee from '@/components/WaveMarquee';
import WorkflowSteps from '@/components/WorkflowSteps';
import ImpactQuote from '@/components/ImpactQuote';
import ScrollReveal from '@/components/ScrollReveal';
import CTASection from '@/components/CTASection';

import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Header />
      <ScrollReveal>
        <Hero />
        <Features />
      </ScrollReveal>
      
      <WaveMarquee />

      <WorkflowSteps />
      <ImpactQuote />
      <CTASection />
      <FAQSection />
      <Footer />
    </main>
  );
}
