"use client";

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import ScrollReveal from '@/components/ScrollReveal';
import PillarsSection from '@/components/PillarsSection';
import PricingSection from '@/components/PricingSection';

// Dynamic imports (Code Splitting) for heavy client components below the fold
const WaveMarquee = dynamic(() => import('@/components/WaveMarquee'), { ssr: false });
const WorkflowSteps = dynamic(() => import('@/components/WorkflowSteps'), { ssr: false });
const ImpactQuote = dynamic(() => import('@/components/ImpactQuote'), { ssr: false });
const CTASection = dynamic(() => import('@/components/CTASection'), { ssr: false });
const FAQSection = dynamic(() => import('@/components/FAQSection'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function Home() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href;
        
        if (targetId === '#about') {
          // Scroll precisely to the features reveal point underneath the slide reveal wall
          const scrollTarget = window.innerHeight * 1.2;
          window.scrollTo({
            top: scrollTarget,
            behavior: 'smooth'
          });
        } else {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            const offset = 90; // Spacing for dynamic floating navbar
            const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - offset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick, { passive: false });
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <main>
      <Header />
      <ScrollReveal>
        <Hero />
        <PillarsSection />
      </ScrollReveal>
      
      <CTASection />
      
      <WaveMarquee />

      <WorkflowSteps />
      <Features />
      <ImpactQuote />
      <PricingSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
