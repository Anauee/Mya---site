'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WaveMarquee.css';

const WaveMarquee = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const text = "EMPRESAS LUCRANDO 238% MAIS COM IA • REDUÇÃO DE 70% NO TEMPO DE RESPOSTA • CONVERSÃO EM DOBRO • ";
  const repeatedText = text + text + text;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    if (!wrapperRef.current) return;

    const chars = wrapperRef.current.querySelectorAll('.wave-char');
    
    // 1. Constant Horizontal Movement
    const horizontalAnim = gsap.to(wrapperRef.current, {
      x: "-33.33%",
      duration: 15,
      repeat: -1,
      ease: "none"
    });

    const st = ScrollTrigger.create({
      trigger: ".wave-marquee-section",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
      animation: gsap.to(wrapperRef.current, {
        xPercent: -20,
        ease: "none"
      })
    });

    // 3. Wave Vertical Movement (Fluid & Smooth)
    chars.forEach((char, i) => {
      gsap.to(char, {
        y: 40,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.06
      });
    });

    return () => {
      horizontalAnim.kill();
      st.kill();
    };
  }, []);

  const renderText = () => {
    return repeatedText.split('').map((char, index) => {
      const isNumber = /[0-9%]/.test(char);
      const isBullet = char === '•';
      return (
        <span 
          key={index} 
          className={`wave-char ${isNumber ? 'highlight' : ''} ${isBullet ? 'bullet' : ''}`}
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };

  return (
    <div className="wave-marquee-section">
      <div className="wave-marquee-wrapper" ref={wrapperRef}>
        {renderText()}
      </div>
    </div>
  );
};

export default WaveMarquee;
