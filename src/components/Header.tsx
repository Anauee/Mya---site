"use client";

import React, { useEffect, useState, useRef, useId } from 'react';
import { Sparkles, Menu, X, LayoutGrid, Sun, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Header.css';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function GlassDistortionFilter({ id }: { id: string }) {
  const displacementMap = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAZABkAAD/2wCEAAQDAwMDAwQDAwQGBAMEBgcFBAQFBwgHBwcHBwgLCAkJCQkICwsMDAwMDAsNDQ4ODQ0SEhISEhQUFBQUFBQUFBQBBQUFCAgIEAsLEBQODg4UFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFP/CABEIAQABAAMBEQACEQEDEQH/xAAxAAEBAQEBAQAAAAAAAAAAAAADAgQIAQYBAQEBAQEBAQAAAAAAAAAAAAMCBAEACAf/2gADE+OTeRT6X/MvsMqOamKiamKmKOKM7ErErAUzAmYLyZ0y50yZ0yZkyZ7yBeULzBeYazl0T6R9KPRPYj0T2J9B9Ppj8x+wjo4qY7M9iKmKg6MrIrErALzBeYEyZ0y50yZkyZ7y50yheXPeUbzjWcqA6I+lHYnsT6J7E9iOx0z+YfYBUc1MdmexHZjsHRlRBRDYBecEzZ7yAmXNeTOmTOmPOmXOmULyjeYbzlYnQxRx057E9mexPYij6a/L/r86OOzPpjsR6Y7B9MqIaILDPYZ7zZ0y57y50yZ0x5kyAmXPeUEyjeYUznQnYnRTUTUT2JqJ7EUfTn5d9fFRx2Z9EdmPTHjLsF0h6I2OegzXmzJmzplz3lzJjzpkBMudMoplBM5JnOwOyiimzmomomonsHRdO/l318VFHYj0x6I9McgumXiHpDQ56DPebMmbNebMmXMmQEy50yguQEzCmYkA7GLGEKaObibiaOKOKPp38s+vCsj7EeiPTHIP0Hwx6ReMKDP0M95895syZ815cy5c6ZQTKCZRXMKZiQDQYQYsps5uJs5qIsjounvyz68KyLpx4z9Mcg+GXoLxl4g6IUGes+a8+e82ZM2dMuZMoJmBcwrlJM5IBoMKMoUWc2c3E0cWRUXT/wCV/XQ2R0RdiPQfDPkFwy9BeIOiHQz0Ges+e82dM2ZM2dMwLmBcwpmJc5qBoMIUIUoU2c2cWZ0R0PT/5V9dFYjZFRF0z8ZeM+QPDLxD4Q6OfoBQhefPeYEz50ziucUzCoEuclCEKFGUKEKLOLI7E6EqHqD8o+uhsRsisSoi6ZeM+QPiHhj0R8IUIdALALzgmcEzimcVAlzioGomgyhQgwhRZHZFQHQlQ9Qfk/10NiVkNiNiVGXiPxj4x8Q9IfCFCPRCwC84oA3nFQFM5KBKJIMKEIUWRoUUJWJUJ0BUPUH5L9dDZFYigjYjZHRF0x8Q9IvEHRHojQjQhecUAUAkEkziomgGgkoxZGgxZFQFQlYnQHRdPfj/10KCSCKESCNiVkViPSLpD0h6I0Q0I0A2IoBWBIJIBKBIJoJIJ2R2J0JWBUJ0JUB0XTv479dFZDYiglYigkhEgjZFQjRFQjRFQjQigFYigHYigmgEgmglYlYnQlQlYlQHQlQnQ9P/kf1yVkNiNCNkNiVENiNiViNEViNkVCVgKCViViViSCViSCVgdCViVCViVCdgVCVCdD1D+U/XBWQ2I0I2Q2JUQ2I0JWQ0I2JUQ2I0JWQ0I2JUQ2JUI2JUI2J0JWJWJWA2R0BWJ0I2JUJ2BUJUJ0P//EABkQAQEBAQEBAAAAAAAAAAAAAAECABEDEP/aAAgBAQABAgB1atWrVq1atWrVq1atWrVq1atWrVq1atWrVq+OrVq1atWrVq1atWrVq1atWrVq1atWrVq1atXxVppppppdWrVq1atWrVq1NNNNNNNNNNNPVWmmmmms6tWrVq1atWpppppppppppppp6q0000uc51atWrVq1ammmmmmmmmmmmmt1Vpppc5znVq1atWrVqaaaaaaaaaaaaaeqtNLnOc51atWrVq1ammmmmmmmmmmmmnqrS5znOc6tWrVq16222mmmmmmlVppp6tKuc5znOrVq1a9TbbbbTTTTTSq000qtLnOc5zq1atWrW0222200000qqqtKqrnOc5zq1atTbbbbbbbbTTTSqqqqqq5znOc6tTTTbbbbbbbbTTTSqqqqrlVznOctNNNtttttttttNNNNKqqqrqznKqrTTTTbbbbbbbbbTTTSqqqqrqznOc5aaaabbbbbbbbbaaaaVVVVVdWc5znVq1NNttttttttttNNKqqqqudWc5znVq16tbbbbbbbbbbTTSqqqq5XVnOc6tWrVrb1tttttttttNNKqqqqrWrK5VWmmm2230bbbbbbaaaXOc5zlVa1KuVVppptttt9G22222mmlzlVznK6tWVVWmmmm2222222222mlznOc5znLWppVVWmmm22222229bTWrOc5znOc|/9k=";

  return (
    <svg
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      aria-hidden="true"
    >
      <defs>
        <filter
          id={id}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="140"
            xChannelSelector="R"
            yChannelSelector="G"
            result="liquid"
          />
          <feImage
            x="0" y="0"
            width="100%" height="100%"
            result="DISP_MAP"
            href={displacementMap}
            preserveAspectRatio="xMidYMid slice"
          />
          <feDisplacementMap
            in="liquid"
            in2="DISP_MAP"
            scale="90"
            xChannelSelector="R"
            yChannelSelector="B"
            result="refracted"
          />
          <feGaussianBlur in="refracted" stdDeviation="1.2" />
        </filter>
      </defs>
    </svg>
  );
}

export default function Header() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const desktopLinksRef = useRef<HTMLDivElement>(null);
  const pillControlsRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const navContentRef = useRef<HTMLDivElement>(null);
  const glassLayerRef = useRef<HTMLSpanElement>(null);
  const filterId = useId().replace(/:/g, '_');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleScroll = () => {
      if (window.innerWidth <= 768) return; // Skip scroll logic on mobile
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isMobile) {
        // STATIC MOBILE PILL - NO ANIMATION
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
        
        // DESKTOP SCROLLED STATE (ANIMATED)
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
        // DESKTOP FULL STATE
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
    });

    return () => ctx.revert();
  }, [isScrolled, isMobile, filterId]);

  // CLICK ANIMATION: Expands the pill to show links (dropdown style for mobile)
  useEffect(() => {
    if (!isScrolled && !isMobile) return;
    
    const tl = gsap.timeline();
    
    if (isExpanded) {
      if (isMobile) {
        // MOBILE DROP DOWN
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
        // DESKTOP EXPAND
        tl.to(navRef.current, { maxWidth: "1100px", duration: 0.5, ease: "back.out(1.2)" })
          .to(desktopLinksRef.current, { 
            width: "auto", 
            opacity: 1, 
            scale: 1, 
            margin: "0 25px",
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
        maxWidth: isMobile ? "1000px" : "1000px", 
        borderRadius: "60px",
        duration: 0.4, 
        ease: "power2.inOut" 
      }, "-=0.2");
    }
  }, [isExpanded, isScrolled, isMobile]);

  return (
    <header className="header-main">
      <GlassDistortionFilter id={filterId} />
      
      <nav className="nav-container" ref={navRef}>
        <span 
          className="glass-frost-layer" 
          ref={glassLayerRef} 
          style={{ filter: `url(#${filterId})` }}
        />

        <div className="nav-content" ref={navContentRef}>
          {/* Left: Brand */}
          <div className="brand" ref={brandRef}>
            <span className="brand-text">Mya</span>
            <Sparkles size={16} className="brand-icon" />
          </div>

          {/* Center: Nav Links (Drawer/Dropdown) */}
          <div className={`desktop-links ${isMobile ? 'mobile-menu' : ''}`} ref={desktopLinksRef}>
            <a href="#about" className="nav-link">About</a>
            <a href="#work" className="nav-link">Work</a>
            <a href="#blog" className="nav-link">Blog</a>
          </div>

          {/* Right: Menu + CTA */}
          <div className="nav-controls">
            <div className="pill-controls" ref={pillControlsRef}>
              <button 
                className={`icon-btn grid-btn ${isExpanded ? 'active' : ''}`}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <LayoutGrid size={18} />
              </button>
            </div>
            
            <button className="cta-btn" ref={ctaRef}>Start a project</button>
          </div>
        </div>
      </nav>
    </header>
  );
}
