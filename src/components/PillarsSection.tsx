"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import './PillarsSection.css';

const pillarsData = [
  {
    num: "Pilar 01",
    title: "SEU CLIENTE MAIS FELIZ",
    highlightLines: [
      "96% mais rapidez no",
      "tempo de resposta"
    ],
    text: "O seu cliente não espera mais na fila. A Inteligência Artificial atende no mesmo segundo, dia e noite. Você para de perder vendas para o concorrente só porque a sua equipe estava ocupada."
  },
  {
    num: "Pilar 02",
    title: "AMPLIE SUAS CHANCES DE VENDER",
    highlightLines: [
      "46% de crescimento em",
      "potenciais clientes"
    ],
    text: "Sem limites de atendimento, a sua empresa absorve todos os contatos que chegam. Nenhuma mensagem é esquecida ou ignorada, transformando cada clique em uma oportunidade real de negócio."
  },
  {
    num: "Pilar 03",
    title: "SEU VENDEDOR VENDE MAIS",
    highlightLines: [
      "67% de aumento no desempenho",
      "da equipe comercial"
    ],
    text: "O vendedor tem que vender, não apenas tirar dúvidas básicas. A IA assume o trabalho repetitivo de recepção, deixando a sua equipe com tempo livre para focar 100% em negociar e fechar contratos."
  },
  {
    num: "Pilar 04",
    title: "VOCÊ ECONOMIZA DINHEIRO TODO DIA",
    highlightLines: [
      "42% de redução no tempo",
      "perdido com curiosos"
    ],
    text: "O sistema funciona como um filtro inteligente. A IA responde perguntas de preços e informações gerais sozinha, entregando para o seu time apenas os clientes que já estão prontos para comprar."
  },
  {
    num: "Pilar 05",
    title: "AMPLIE SEU LUCRO TODOS OS MESES",
    highlightLines: [
      "32% de taxa de conversão",
      "em vendas finais"
    ],
    text: "Atendimento imediato somado a clientes bem filtrados gera apenas uma coisa: mais lucro. A sua empresa aumenta o número de fechamentos reais no fim do mês, escalando o faturamento sem precisar contratar mais ninguém."
  }
];

export default function PillarsSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.pillar-stack-card');
    
    // Create the GSAP animation for stacking cards
    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        // Animate the yellow underlines sequentially
        const paths = card.querySelectorAll('.pillar-underline-path');
        if (paths.length > 0) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 10%",
              scrub: 3,
            }
          });

          paths.forEach(path => {
            const svgPath = path as SVGPathElement;
            const length = svgPath.getTotalLength() || 450; // Fallback to 450 in case it's display: none
            gsap.set(svgPath, { strokeDasharray: length, strokeDashoffset: length });
            
            tl.to(svgPath, {
              strokeDashoffset: 0,
              ease: "none",
            });
          });
        }

        // Animate the card shrinking
        if (i < cards.length - 1) {
          gsap.to(card, {
            scale: 0.95,
            opacity: 0.45,
            scrollTrigger: {
              trigger: cards[i + 1],
              start: 'top 40%',
              end: 'top 20%',
              scrub: true,
              invalidateOnRefresh: true
            }
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="pillars-section" id="beneficios" ref={containerRef}>
      <div className="pillars-header">
        <h2 className="pillars-main-title">
          O Impacto Real de Uma Máquina de Vendas no Seu Negócio
        </h2>
      </div>

      <div className="pillars-cards-container">
        {pillarsData.map((pillar, index) => (
          <div key={index} className={`pillar-stack-card card-color-${index + 1}`}>
            <div className="pillar-content">
              <h3 className="pillar-title">{pillar.title}</h3>
              <div className="pillar-highlight">
                {/* Desktop Version */}
                <div className="pillar-highlight-desktop">
                  <span className="pillar-highlight-wrapper">
                    {pillar.highlightLines.join(' ')}
                    <svg className="pillar-underline-svg" viewBox="0 0 450 40" preserveAspectRatio="none">
                      <path
                        className="pillar-underline-path"
                        d="M 10,25 C 150,15 300,35 440,25"
                        fill="none"
                        stroke="#FFD700"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>

                {/* Mobile Version */}
                <div className="pillar-highlight-mobile">
                  {pillar.highlightLines.map((line, idx) => (
                    <div key={idx} className="pillar-highlight-line-group">
                      {line}
                      <svg className="pillar-underline-svg" viewBox="0 0 450 40" preserveAspectRatio="none">
                        <path
                          className="pillar-underline-path"
                          d="M 10,25 C 150,15 300,35 440,25"
                          fill="none"
                          stroke="#FFD700"
                          strokeWidth="8"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="pillar-text">{pillar.text}</p>
          </div>
        ))}
      </div>

      <div className="pillars-cta-container">
        <p className="pillars-cta-text">
          Teste na sua empresa com 30 dias totalmente gratuitos!
        </p>
        <button className="pillars-cta-btn">
          <span>Começar teste gratuito</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}
