"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './WorkflowSteps.css';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    id: 1,
    title: "Disparo Inteligente via WhatsApp",
    subtitle: "AUMENTE SUA TAXA DE CONVERSÃO",
    description: "Inicie conversas de forma automática e personalizada com seus leads. Nossa tecnologia garante que cada mensagem pareça única, aumentando drasticamente o engajamento e garantindo que nenhum lead esfrie. Esqueça disparos genéricos; foque em conexões reais que convertem em vendas.",
    icon: "📱",
    videoUrl: "https://zqbteazpirbktxbmhzog.supabase.co/storage/v1/object/public/Mya%20-%20Sai/mya-intelligent-dispatch_2026-05-16_15-09-26.mp4"
  },
  {
    id: 2,
    title: "Mya: Sua IA SDR Especialista",
    subtitle: "ATENDIMENTO HUMANO E ESCALÁVEL",
    description: "Uma inteligência artificial treinada especificamente para o seu negócio. A Mya entende objeções, responde dúvidas complexas e qualifica leads em tempo real, 24 horas por dia. Ela não apenas responde, ela conduz o lead até o agendamento, agindo como o melhor vendedor do seu time.",
    icon: "✨",
    videoUrl: "https://zqbteazpirbktxbmhzog.supabase.co/storage/v1/object/public/Mya%20-%20Sai/mya-sdr-especialista_2026-05-16_15-02-27.mp4"
  },
  {
    id: 3,
    title: "CRM Integrado para Gestão Total",
    subtitle: "CONTROLE ABSOLUTO DO SEU FUNIL",
    description: "Gerencie todo o fluxo de vendas em uma interface intuitiva e poderosa. Acompanhe a jornada de cada cliente, desde o primeiro contato via WhatsApp até o fechamento. Com dados precisos e automações de funil, você terá a visão clara de onde investir para escalar seus resultados.",
    icon: "📊",
    videoUrl: "https://zqbteazpirbktxbmhzog.supabase.co/storage/v1/object/public/Mya%20-%20Sai/mya-crm-gestao_2026-05-16_14-16-14.mp4"
  }
];

const WorkflowSteps: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // 1. Timeline Progress & Node Activation Sync
    const timelineST = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top center",
      end: "bottom center",
      scrub: 0.5,
      onUpdate: (self) => {
        // Update line height
        if (progressRef.current) {
          gsap.set(progressRef.current, { height: `${self.progress * 100}%` });
        }

        // Activate nodes based on progress line reach
        nodesRef.current.forEach((node) => {
          if (!node || !sectionRef.current) return;
          
          const nodeRect = node.getBoundingClientRect();
          const sectionRect = sectionRef.current.getBoundingClientRect();
          
          // Node center relative to section top
          const nodeCenterRelative = (nodeRect.top + nodeRect.height / 2) - sectionRect.top;
          
          const sectionHeight = sectionRef.current.offsetHeight;
          const railTotalHeight = sectionHeight - 180; // Matching the CSS bottom: 180px
          const currentProgressY = self.progress * railTotalHeight;

          if (currentProgressY >= nodeCenterRelative) {
            node.classList.add('active');
          } else {
            node.classList.remove('active');
          }
        });
      }
    });

    const triggers: ScrollTrigger[] = [timelineST];
    
    // 2. Image "Hitting the Wall" Animations
    STEPS.forEach((_, index) => {
      const block = blocksRef.current[index];
      const image = imagesRef.current[index];

      if (block && image) {
        const st = ScrollTrigger.create({
          trigger: block,
          start: "top 85%",
          end: "center center",
          scrub: 1,
          animation: gsap.fromTo(image, 
            { y: -120, opacity: 0 },
            { y: 0, opacity: 1, ease: "power2.out" }
          )
        });
        triggers.push(st);
      }
    });

    return () => {
      triggers.forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="workflow-section" ref={sectionRef}>
      <div className="workflow-container">
        
        {/* Timeline Rail */}
        <div className="timeline-rail">
          <div className="timeline-progress" ref={progressRef} />
        </div>

        {/* Steps */}
        {STEPS.map((step, index) => (
          <div 
            key={step.id} 
            className={`workflow-block ${index % 2 !== 0 ? 'even' : ''}`}
            ref={el => { blocksRef.current[index] = el; }}
          >
            <div className="workflow-content">
              <div className="text-col">
                <span className="step-subtitle">{step.subtitle}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>

              <div className="image-col">
                <div className="image-wrapper">
                  <div 
                    className="mockup-image"
                    ref={el => { imagesRef.current[index] = el; }}
                  >
                    {step.videoUrl ? (
                      <video 
                        src={step.videoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="step-video"
                      />
                    ) : (
                      <span className="placeholder-icon">{step.icon}</span>
                    )}
                  </div>
                  <div className="step-wall" />
                </div>
              </div>
            </div>

            {/* Central Node */}
            <div 
              className="timeline-node" 
              ref={el => { nodesRef.current[index] = el; }}
            />
          </div>
        ))}

        {/* Final CTA */}
        <div className="workflow-cta">
          <button className="cta-button">
            Começar Agora
          </button>
        </div>

      </div>
    </section>
  );
};

export default WorkflowSteps;
