"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, X, ArrowRight } from 'lucide-react';
import './CTASection.css';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CTASection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const anchorCardRef = useRef<HTMLDivElement>(null);
  const sellCardRef = useRef<HTMLDivElement>(null);
  const sellBgRef = useRef<HTMLDivElement>(null);
  const sellOverlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scribbleRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !anchorCardRef.current || !sellCardRef.current || !sellBgRef.current || !sellOverlayRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // --- DESKTOP ANIMATION ---
      mm.add("(min-width: 769px)", () => {
        gsap.set(anchorCardRef.current, {
          position: "absolute",
          left: "30px",
          top: "50%",
          yPercent: -50,
          xPercent: 0,
          scale: 1,
          opacity: 1,
          zIndex: 1,
          width: "44%",
          height: "650px",
          margin: 0
        });

        gsap.set(sellCardRef.current, {
          position: "absolute",
          right: "30px",
          left: "auto",
          top: "50%",
          yPercent: -50,
          xPercent: 0,
          zIndex: 10,
          width: "44%",
          height: "650px",
          margin: 0
        });

        gsap.set(sellBgRef.current, { width: "100%", height: "100%", borderRadius: "32px" });
        gsap.set(sellOverlayRef.current, { opacity: 0 });

        scribbleRefs.current.forEach(path => {
          if (path) gsap.set(path, { strokeDashoffset: 1200, strokeDasharray: 1200 });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=250%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          }
        });

        tl.to(sellCardRef.current, {
          right: "50%",
          xPercent: 50,
          duration: 2,
          ease: "power2.inOut"
        }, "overlap");

        tl.to(anchorCardRef.current, {
          left: "50%",
          xPercent: -50,
          scale: 0.8,
          opacity: 0.9,
          duration: 2,
          ease: "power2.inOut"
        }, "overlap");

        scribbleRefs.current.forEach((path, index) => {
          if (path) {
            tl.to(path, {
              strokeDashoffset: 0,
              duration: 1.5,
              ease: "power1.inOut"
            }, `overlap+=${0.8 + (index * 0.4)}`);
          }
        });

        tl.to(sellCardRef.current, {
          width: "75vw",
          height: "690px",
          right: "50%",
          xPercent: 50,
          duration: 2.5,
          ease: "power3.inOut"
        }, "expand");

        tl.to(sellBgRef.current, {
          width: "100%",
          height: "100%",
          borderRadius: "40px",
          duration: 2.5,
          ease: "power3.inOut"
        }, "expand");

        tl.to(sellOverlayRef.current, {
          opacity: 1,
          duration: 2.5,
          ease: "power3.inOut"
        }, "expand");

        tl.to(videoRef.current, {
          opacity: 0.8,
          duration: 2.5,
          ease: "power3.inOut",
          onStart: () => {
            if (videoRef.current) videoRef.current.play();
          }
        }, "expand");

        tl.to(anchorCardRef.current, {
          opacity: 0,
          scale: 0.5,
          duration: 1.5,
        }, "expand");
      });

      // --- MOBILE ANIMATION ---
      mm.add("(max-width: 768px)", () => {
        // Rely purely on the new robust CSS for positioning anchor card
        gsap.set(anchorCardRef.current, {
          opacity: 1,
          zIndex: 1,
          scale: 1
        });

        // Setup the initial off-screen state for sell card
        gsap.set(sellCardRef.current, {
          top: "120%", 
          zIndex: 10,
          opacity: 1
        });

        gsap.set(sellBgRef.current, { width: "100%", height: "100%", borderRadius: "24px" });
        gsap.set(sellOverlayRef.current, { opacity: 0.5 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=80%",
            pin: true,
            scrub: 1,
          }
        });

        tl.to(sellCardRef.current, {
          top: "-16px", // Moved up more to fully cover the white card
          duration: 2,
          ease: "power2.out"
        }, "cover");

        tl.to(anchorCardRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 1.5,
          ease: "power2.out"
        }, "cover+=0.5");

        scribbleRefs.current.forEach((path, index) => {
          if (path) {
            const length = path.getTotalLength() || 450;
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
            
            tl.to(path, {
              strokeDashoffset: 0,
              duration: 1.5,
              ease: "power1.inOut"
            }, `cover+=${1.0 + (index * 0.5)}`);
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="cta-full-section" id="economia" ref={containerRef}>
      <div className="cta-section-title">
        <h2>Economize <span style={{ color: 'var(--accent-color)' }}>mais de mil reais</span> por mês utilizando o nosso sistema!</h2>
      </div>
      <div className="cta-cards-wrapper">

        {/* Anchor Card */}
        <div className="cta-card anchor-card" ref={anchorCardRef}>
          <div className="card-header">
            <span className="card-subtitle">Antes da Mya</span>
            <h3 className="card-title">Custo de ferramentas separadas</h3>
          </div>

          <div className="card-body">
            <div className="cost-item">
              <span className="item-name">CRM tradicional (complicado e confuso)</span>
              <span className="item-price">R$ 400/mês</span>
              <X size={16} className="icon-red" />
            </div>
            <div className="cost-item">
              <span className="item-name">Atendente de IA para WhatsApp</span>
              <span className="item-price">R$ 500/mês</span>
              <X size={16} className="icon-red" />
            </div>
            <div className="cost-item">
              <span className="item-name">Sistema para gerenciar conversas e vendas</span>
              <span className="item-price">R$ 400/mês</span>
              <X size={16} className="icon-red" />
            </div>
            <div className="cost-item">
              <span className="item-name">Disparador para remarketing de clientes</span>
              <span className="item-price">R$ 250/mês</span>
              <X size={16} className="icon-red" />
            </div>
          </div>

          <div className="card-footer">
            <div className="total-label">Total mensal</div>
            <div className="total-value">R$ 1.550,00</div>
            <p className="total-hint">+ Desperdício de tempo e dados soltos</p>
          </div>
        </div>

        {/* Sell Card */}
        <div className="cta-card sell-card" ref={sellCardRef}>
          <div className="sell-card-bg" ref={sellBgRef}>
            <video
              ref={videoRef}
              className="sell-video-bg"
              muted
              loop
              playsInline
              preload="metadata"
              style={{ opacity: 0 }}
            >
              <source src="https://zqbteazpirbktxbmhzog.supabase.co/storage/v1/object/public/Mya%20-%20Sai/e_prilepsky_pindown.io_1778849990.mp4" type="video/mp4" />
            </video>
            <div className="sell-card-overlay" ref={sellOverlayRef}></div>
          </div>

          <div className="sell-content">
            <div className="card-header relative">
              <span className="card-subtitle-alt highlight-subtitle">Com nosso sistema completo</span>
              <div className="title-lines-wrapper">
                <div className="title-line-group">
                  <h3 className="card-title-alt">Tudo o que você precisa</h3>
                  <svg className="underline-svg" viewBox="0 0 450 40" preserveAspectRatio="none">
                    <path
                      ref={el => { scribbleRefs.current[0] = el }}
                      d="M 10,20 C 150,15 300,35 440,20"
                      fill="none"
                      stroke="#FFD700"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="title-line-group">
                  <h3 className="card-title-alt">em um único lugar</h3>
                  <svg className="underline-svg" viewBox="0 0 350 40" preserveAspectRatio="none">
                    <path
                      ref={el => { scribbleRefs.current[1] = el }}
                      d="M 10,20 C 120,25 240,15 340,20"
                      fill="none"
                      stroke="#FFD700"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="card-body">
              <div className="benefit-item">
                <div className="check-circle">
                  <Check size={18} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 600, lineHeight: 1.4 }}>Organize de forma fácil todas as conversas e atendimentos</h4>
                </div>
              </div>
              <div className="benefit-item">
                <div className="check-circle">
                  <Check size={18} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 600, lineHeight: 1.4 }}>Resumo simplificado de tudo o que seu time comercial está fazendo</h4>
                </div>
              </div>
              <div className="benefit-item">
                <div className="check-circle">
                  <Check size={18} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 600, lineHeight: 1.4 }}>Gestão de clientes e vendas integrado com o WhatsApp e com a IA</h4>
                </div>
              </div>
            </div>

            <div className="card-footer">
              <button className="cta-final-btn">
                <span>Começar teste gratuito</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CTASection;
