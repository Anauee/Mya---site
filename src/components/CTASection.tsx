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
      let mm = gsap.matchMedia();

      // --- DESKTOP ANIMATION ---
      mm.add("(min-width: 769px)", () => {
        gsap.set(anchorCardRef.current, {
          left: "80px",
          top: "50%",
          yPercent: -50,
          xPercent: 0,
          scale: 1,
          opacity: 1,
          zIndex: 1,
          width: "45%",
          height: "650px"
        });

        gsap.set(sellCardRef.current, {
          right: "80px",
          left: "auto",
          top: "50%",
          yPercent: -50,
          xPercent: 0,
          zIndex: 10,
          width: "45%",
          height: "650px"
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
        gsap.set(anchorCardRef.current, {
          top: "42%", // Moved UP from 50%
          left: "50%",
          xPercent: -50,
          yPercent: -50,
          width: "92%",
          height: "auto",
          opacity: 1,
          zIndex: 1,
          scale: 1
        });

        gsap.set(sellCardRef.current, {
          top: "150%",
          left: "50%",
          xPercent: -50,
          yPercent: -50,
          width: "94%",
          height: "auto",
          zIndex: 10,
          opacity: 1
        });

        gsap.set(sellBgRef.current, { width: "100%", height: "100%", borderRadius: "24px" });
        gsap.set(sellOverlayRef.current, { opacity: 0.5 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 1,
          }
        });

        tl.to(sellCardRef.current, {
          top: "50%", // Covers with center alignment
          duration: 2,
          ease: "power2.out"
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="cta-full-section" id="pricing" ref={containerRef}>
      <div className="cta-cards-wrapper">

        {/* Anchor Card */}
        <div className="cta-card anchor-card" ref={anchorCardRef}>
          <div className="card-header">
            <span className="card-subtitle">Antes da Mya</span>
            <h3 className="card-title">Custo de ferramentas separadas</h3>
          </div>

          <div className="card-body">
            <div className="cost-item">
              <span className="item-name">CRM Tradicional</span>
              <span className="item-price">R$ 400/mês</span>
              <X size={16} className="icon-red" />
            </div>
            <div className="cost-item">
              <span className="item-name">Automação WhatsApp</span>
              <span className="item-price">R$ 350/mês</span>
              <X size={16} className="icon-red" />
            </div>
            <div className="cost-item">
              <span className="item-name">IA Chatbot (SDR)</span>
              <span className="item-price">R$ 500/mês</span>
              <X size={16} className="icon-red" />
            </div>
            <div className="cost-item">
              <span className="item-name">Analytics & BI</span>
              <span className="item-price">R$ 200/mês</span>
              <X size={16} className="icon-red" />
            </div>
          </div>

          <div className="card-footer">
            <div className="total-label">Total mensal</div>
            <div className="total-value">R$ 1.450,00</div>
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
              <span className="card-subtitle-alt">Depois da Mya</span>
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
                  <h4>CRM Nativo & Inteligente</h4>
                  <p>Gestão de leads com IA integrada.</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="check-circle">
                  <Check size={18} />
                </div>
                <div>
                  <h4>Automação de WhatsApp</h4>
                  <p>Disparos e conversas fluidas sem integrações complexas.</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="check-circle">
                  <Check size={18} />
                </div>
                <div>
                  <h4>IA SDR Especialista</h4>
                  <p>Qualificação e agendamento automático 24/7.</p>
                </div>
              </div>
            </div>

            <div className="card-footer">
              <button className="cta-final-btn">
                <span>Começar Agora</span>
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
