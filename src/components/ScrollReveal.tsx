"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollReveal({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const childrenArray = React.Children.toArray(children);

  useEffect(() => {
    // Parallax wall lift: we slide the sticky Hero up as the user scrolls
    gsap.to(heroRef.current, {
      yPercent: -100,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%", // 100vh scroll
        scrub: true,
      }
    });

  }, []);

  return (
    <div ref={containerRef} className="reveal-container" style={{ position: 'relative' }}>
      
      {/* 
        The Hero stays sticky at the top of the screen. 
        It naturally acts as a wall that covers whatever is scrolling underneath it. 
        GSAP will translate it UP on the Y-axis to lift the wall.
      */}
      <div 
        ref={heroRef} 
        style={{ 
          position: 'sticky', 
          top: 0, 
          height: '100vh', 
          zIndex: 2, 
          overflow: 'hidden',
          backgroundColor: '#fff' // Ensure it's opaque
        }}
      >
        {childrenArray[0]}
      </div>
      
      {/* 
        The second section is pulled up to be behind the Hero when the page loads.
        As the user scrolls, it naturally moves UP, but is hidden by the Hero.
        Because its content has 100vh of paddingTop, the actual content only enters the viewport
        exactly as the Hero slides up!
      */}
      <div style={{ position: 'relative', zIndex: 1, marginTop: '-100vh', paddingTop: '100vh' }}>
        {childrenArray[1]}
      </div>

    </div>
  );
}
