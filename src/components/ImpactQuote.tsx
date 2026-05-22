"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ImpactQuote.css';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

interface Testimonial {
  initials: string;
  name: string;
  stars: number;
  time: string;
  text: React.ReactNode;
  color: string;
}

const testimonials: Testimonial[] = [
  { initials: "JG", name: "Juliana Gelesky", stars: 5, time: "Há 15 semanas", color: "#4285F4", text: <>Excelente experiência. <strong>O atendimento é extremamente ágil, claro e eficiente.</strong> A equipe responde rápido, entende de verdade o problema. Recomendo de olhos fechados.</> },
  { initials: "RM", name: "Rafael Mendonça", stars: 5, time: "Há 8 semanas", color: "#EA4335", text: <>A Mya transformou completamente a forma como gerenciamos nossos leads. O CRM é intuitivo e a automação economizou horas. <strong>Resultado visível já na primeira semana.</strong></> },
  { initials: "CS", name: "Camila Santos", stars: 5, time: "Há 12 semanas", color: "#FBBC04", text: <>Já testei várias soluções no mercado e nenhuma chegou perto. <strong>A integração com WhatsApp é perfeita.</strong> Sem dúvida, a melhor até agora.</> },
  { initials: "AL", name: "André Lima", stars: 5, time: "Há 6 semanas", color: "#34A853", text: <>Nosso time comercial adotou a Mya em menos de um dia. <strong>A curva de aprendizado é quase zero.</strong> Ferramenta indispensável.</> },
  { initials: "MP", name: "Marina Pellegrini", stars: 5, time: "Há 10 semanas", color: "#8E24AA", text: <>O que mais me impressionou foi a personalização. <strong>A IA sugere ações que realmente fazem sentido.</strong> Parece que a Mya conhece meu negócio.</> },
  { initials: "FT", name: "Felipe Torres", stars: 5, time: "Há 4 semanas", color: "#00897B", text: <>Migrei do Pipedrive para a Mya e não me arrependo. <strong>Nível enterprise com simplicidade.</strong> A interface é muito mais moderna.</> },
  { initials: "LR", name: "Larissa Rocha", stars: 5, time: "Há 20 semanas", color: "#E65100", text: <>Desde que implementamos, <strong>nossa taxa de conversão subiu 40%.</strong> O kanban é viciante de usar. Crescimento real, não promessa.</> },
  { initials: "DV", name: "Daniel Vieira", stars: 5, time: "Há 3 semanas", color: "#1565C0", text: <><strong>A IA da Mya aprende o tom de voz da minha empresa.</strong> As mensagens parecem escritas por um humano. Tecnologia de outro nível.</> },
];

const waveOffsetsDesktop = [0, -25, 8, -30, 15, -20, 5, -28];
const waveOffsetsMobile = [0, -10, 4, -12, 6, -8, 3, -10];

const ImpactQuote: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const words = [
    "“Consigo", "atender", "mais", "de", "300", "pessoas", "por", "dia",
    "no", "meu", "WhatsApp", "da", "empresa,", "realmente", "depois", "que",
    "comecei", "a", "usar", "o", "sistema", "e", "a", "IA", "de",
    "atendimento", "meu", "processo", "de", "vendas", "facilitou", "muito!”"
  ];

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !cardsRef.current) return;

    const wordElements = textRef.current.querySelectorAll('.quote-word');
    if (wordElements.length === 0) return;

    const isMobile = window.innerWidth <= 768;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: isMobile ? "+=180%" : "+=350%", // Fast, responsive scroll height on mobile
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // Phase 1: Paint each word sequentially
      wordElements.forEach((word) => {
        tl.to(word, {
          color: "#0f172a",
          duration: 0.35,
          ease: "none",
        });
      });

      // Phase 2: Fade in author
      tl.from(".quote-author", {
        opacity: 0,
        y: 20,
        duration: 2,
      });

      // Phase 3: Small pause for impact
      tl.to({}, { duration: 1 });

      // Phase 4: Cards invade from below
      tl.fromTo(cardsRef.current,
        { y: "100vh", opacity: 0 },
        { y: isMobile ? -20 : 0, opacity: 1, duration: 6, ease: "power2.out" }
      );

      // Phase 5: Push quote text up to make room (stays visible!)
      tl.to(".quote-container", {
        y: isMobile ? -130 : -120,
        scale: isMobile ? 0.85 : 0.95,
        duration: 6,
        ease: "power2.out",
      }, "<");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="impact-quote-section" id="depoimentos" ref={sectionRef}>
      <div className="quote-container">
        <h2 className="quote-text" ref={textRef}>
          {words.map((word, i) => (
            <span key={i} className="quote-word">
              {word}{" "}
            </span>
          ))}
        </h2>

        <div className="quote-author">
          <span className="author-name">Carlos Oliveira</span>
          <span className="author-meta">Proprietário &bull; Carlos Hamburgueria</span>
        </div>
      </div>

      {/* Testimonial cards that will invade */}
      <div className="cards-invasion" ref={cardsRef}>
        <div className="marquee-row">
          <div className="marquee-track marquee-wave">
            {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
              <div
                key={`wave-${i}`}
                className={`testimonial-card wave-${i % 8}`}
              >
                <div className="testimonial-header">
                  <div className="testimonial-avatar" style={{ background: t.color }}>
                    {t.initials}
                  </div>
                  <div className="testimonial-meta">
                    <span className="testimonial-name">{t.name}</span>
                    <div className="testimonial-rating-row">
                      <div className="testimonial-stars">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <span key={j} className={`star ${j < t.stars ? 'filled' : ''}`}>&#9733;</span>
                        ))}
                      </div>
                      <span className="testimonial-time">{t.time}</span>
                    </div>
                  </div>
                </div>
                <p className="testimonial-body">
                  {t.text}
                </p>
                <div className="testimonial-google">
                  <svg viewBox="0 0 48 48" width="20" height="20">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactQuote;
