"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Sparkles, Menu, X, LayoutGrid, Sun, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import './Header.css';

export default function Header() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const desktopLinksRef = useRef<HTMLDivElement>(null);
  const pillControlsRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const navContentRef = useRef<HTMLDivElement>(null);
  const glassLayerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleScroll = () => {
      if (window.innerWidth <= 768) return;
      const scrollPos = window.scrollY;
      if (scrollPos > 40 && !isScrolled) {
        setIsScrolled(true);
      } else if (scrollPos <= 40 && isScrolled) {
        setIsScrolled(false);
        setIsExpanded(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isScrolled]);

  // SCROLL-DRIVEN HEADER TRANSITION
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isMobile) {
        gsap.set(navRef.current, {
          width: "90%",
          maxWidth: "1000px",
          borderRadius: "60px",
          top: "12px",
          padding: "8px 16px",
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.35)",
          boxShadow: "0 15px 50px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
        });
        gsap.set(glassLayerRef.current, { opacity: 1 });
        gsap.set(desktopLinksRef.current, { opacity: 0, scale: 0.8, width: 0, margin: 0 });
        gsap.set(brandRef.current, { scale: 0.8 });
        gsap.set(ctaRef.current, { 
          scale: 0.75, 
          padding: "6px 14px",
          fontSize: "0.75rem"
        });
        gsap.set(pillControlsRef.current, {
          width: "auto",
          opacity: 1,
          scale: 1,
          margin: "0 8px",
          pointerEvents: "auto"
        });
      } else if (isScrolled) {
        const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });
        
        tl.to(navRef.current, {
          width: "fit-content",
          maxWidth: "1000px",
          borderRadius: "60px",
          top: "20px",
          padding: "10px 32px",
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.35)",
          boxShadow: "0 15px 50px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
        })
        .to(glassLayerRef.current, {
          opacity: 1,
          duration: 0.8,
        }, 0)
        .to(desktopLinksRef.current, {
          opacity: 0,
          scale: 0.8,
          width: 0,
          margin: 0,
          duration: 0.6
        }, 0)
        .to(brandRef.current, { 
          scale: 0.85,
          duration: 1.2
        }, 0)
        .to(ctaRef.current, { 
          scale: 0.8, 
          padding: "6px 20px",
          fontSize: "0.8rem",
          duration: 1.2
        }, 0)
        .to(pillControlsRef.current, {
          width: "auto",
          opacity: 1,
          scale: 1,
          margin: "0 10px",
          pointerEvents: "auto",
          duration: 0.8
        }, 0.3);
      } else {
        const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.0 } });
        
        tl.to(navRef.current, {
          width: "100%",
          maxWidth: "100%",
          borderRadius: "0px",
          top: "0px",
          padding: "24px 80px",
          backgroundColor: "rgba(255, 255, 255, 0)",
          border: "1px solid rgba(0, 0, 0, 0)",
          boxShadow: "none",
        })
        .to(glassLayerRef.current, {
          opacity: 0,
          duration: 0.4,
        }, 0)
        .to(desktopLinksRef.current, {
          opacity: 1,
          scale: 1,
          width: "auto",
          margin: "0 36px",
          pointerEvents: "auto",
        }, 0)
        .to(brandRef.current, { scale: 1 }, 0)
        .to(ctaRef.current, { scale: 1, padding: "12px 26px", fontSize: "0.9rem" }, 0)
        .to(pillControlsRef.current, {
          width: 0,
          opacity: 0,
          scale: 0.8,
          margin: 0,
          pointerEvents: "none",
        }, 0);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isScrolled, isMobile]);

  useEffect(() => {
    if (!isScrolled && !isMobile) return;
    
    const tl = gsap.timeline();
    
    if (isExpanded) {
      if (isMobile) {
        tl.to(navRef.current, { borderRadius: "24px", duration: 0.4 })
          .to(desktopLinksRef.current, { 
            display: 'flex',
            flexDirection: 'column',
            width: "100%", 
            opacity: 1, 
            scale: 1, 
            margin: "20px 0 10px 0",
            pointerEvents: "auto", 
            duration: 0.3 
          }, "-=0.2");
      } else {
        tl.to(navRef.current, { maxWidth: "1300px", duration: 0.5, ease: "back.out(1.2)" })
          .to(desktopLinksRef.current, { 
            width: "auto", 
            opacity: 1, 
            scale: 1, 
            margin: "0 15px",
            pointerEvents: "auto", 
            duration: 0.3 
          }, "-=0.3");
      }
    } else {
      tl.to(desktopLinksRef.current, { 
        width: 0, 
        opacity: 0, 
        scale: 0.8, 
        margin: 0,
        pointerEvents: "none", 
        duration: 0.3 
      })
      .to(navRef.current, { 
        maxWidth: "1000px", 
        borderRadius: "60px",
        duration: 0.4, 
        ease: "power2.inOut" 
      }, "-=0.2");
    }
  }, [isExpanded, isScrolled, isMobile]);

  return (
    <header className={`header-main ${isScrolled ? 'scrolled' : ''}`} ref={containerRef}>
      <nav className="nav-container" ref={navRef}>
        <span 
          className="glass-frost-layer" 
          ref={glassLayerRef} 
        />

        <div className="nav-content" ref={navContentRef}>
          <div className="brand" ref={brandRef}>
            <span className="brand-text">Mya</span>
            <Sparkles size={16} className="brand-icon" />
          </div>

          <div className={`desktop-links ${isMobile ? 'mobile-menu' : ''}`} ref={desktopLinksRef}>
            <a href="#beneficios" className="nav-link">Benefícios</a>
            <a href="#economia" className="nav-link">Economia</a>
            <a href="#processo" className="nav-link">Processo</a>
            <a href="#recursos" className="nav-link">Recursos</a>
            <a href="#depoimentos" className="nav-link">Depoimentos</a>
            <a href="#planos" className="nav-link">Planos</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </div>

          <div className="nav-controls">
            <div className="pill-controls" ref={pillControlsRef}>
              <button 
                className={`icon-btn grid-btn ${isExpanded ? 'active' : ''}`}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <LayoutGrid size={18} />
              </button>
            </div>
            
            <button className="cta-btn" ref={ctaRef}>
              <span className="desktop-text">Começar gratuitamente</span>
              <span className="mobile-text">Começar</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
