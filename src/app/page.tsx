import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import WorkflowSteps from '@/components/WorkflowSteps';
import ImpactQuote from '@/components/ImpactQuote';
import ScrollReveal from '@/components/ScrollReveal';

export default function Home() {
  return (
    <main>
      <Header />
      <ScrollReveal>
        <Hero />
        <Features />
      </ScrollReveal>

      <WorkflowSteps />
      <ImpactQuote />
    </main>
  );
}
