"use client";

import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ScrollReveal from '@/components/ScrollReveal';

// Dynamic imports (Code Splitting) for heavy client components below the fold
const WaveMarquee = dynamic(() => import('@/components/WaveMarquee'), { ssr: false });
const WorkflowSteps = dynamic(() => import('@/components/WorkflowSteps'), { ssr: false });
const ImpactQuote = dynamic(() => import('@/components/ImpactQuote'), { ssr: false });
const CTASection = dynamic(() => import('@/components/CTASection'), { ssr: false });
const FAQSection = dynamic(() => import('@/components/FAQSection'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

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
