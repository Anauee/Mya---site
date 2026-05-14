"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollReveal({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = containerRef.current?.querySelectorAll('section');
    if (!sections || sections.length < 2) return;

    const firstSection = sections[0] as HTMLElement;
    const secondSection = sections[1] as HTMLElement;

    // CONFIG FOR REVEAL
    gsap.set(containerRef.current, { position: 'relative' });
    
    // First section is the "wall" on top
    gsap.set(firstSection, { 
      position: 'relative', 
      zIndex: 2,
      backgroundColor: 'white' 
    });

    // Second section is "underneath"
    gsap.set(secondSection, { 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100vh',
      zIndex: 1,
      opacity: 0,
      pointerEvents: 'none'
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%", 
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          if (self.progress > 0) {
            gsap.set(secondSection, { opacity: 1, pointerEvents: 'auto' });
          } else {
            gsap.set(secondSection, { opacity: 0, pointerEvents: 'none' });
          }
        }
      }
    });

    // WALL SLIDES UP
    tl.to(firstSection, {
      yPercent: -100,
      ease: "none"
    });

    // Subtle parallax reveal for the second section content
    const revealTarget = secondSection.firstElementChild || secondSection;
    tl.fromTo(revealTarget, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, ease: "none" },
      0
    );

    // Cleanup transition at the end
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "bottom top",
      onEnter: () => {
        gsap.set(secondSection, { position: 'relative', opacity: 1, pointerEvents: 'auto' });
      },
      onLeaveBack: () => {
        gsap.set(secondSection, { position: 'fixed', opacity: 1, pointerEvents: 'auto' });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === containerRef.current) t.kill();
      });
    };
  }, []);

  return (
    <div ref={containerRef} className="reveal-container">
      {children}
    </div>
  );
}
