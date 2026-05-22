"use client";

import React from 'react';
import './Testimonials.css';

interface Testimonial {
  initials: string;
  name: string;
  stars: number;
  time: string;
  text: string;
  highlight?: string;
  color: string;
}

const testimonials: Testimonial[] = [
  {
    initials: "JG",
    name: "Juliana Gelesky",
    stars: 5,
    time: "H\u00E1 15 semanas",
    text: "Excelente experi\u00EAncia. O atendimento \u00E9 extremamente \u00E1gil, claro e eficiente. A equipe responde r\u00E1pido, entende de verdade o problema e entrega solu\u00E7\u00E3o n\u00E3o promessa.",
    highlight: "Recomendo de olhos fechados.",
    color: "#4285F4"
  },
  {
    initials: "RM",
    name: "Rafael Mendon\u00E7a",
    stars: 5,
    time: "H\u00E1 8 semanas",
    text: "A Mya transformou completamente a forma como gerenciamos nossos leads. O CRM \u00E9 intuitivo e a automa\u00E7\u00E3o de follow-ups economizou horas da minha equipe.",
    highlight: "Resultado vis\u00EDvel j\u00E1 na primeira semana.",
    color: "#EA4335"
  },
  {
    initials: "CS",
    name: "Camila Santos",
    stars: 5,
    time: "H\u00E1 12 semanas",
    text: "J\u00E1 testei v\u00E1rias outras solu\u00E7\u00F5es no mercado e nenhuma chegou perto. A integra\u00E7\u00E3o com WhatsApp \u00E9 perfeita, os disparos inteligentes realmente convertem.",
    highlight: "Sem d\u00FAvida, a melhor at\u00E9 agora.",
    color: "#FBBC04"
  },
  {
    initials: "AL",
    name: "Andr\u00E9 Lima",
    stars: 5,
    time: "H\u00E1 6 semanas",
    text: "Nosso time comercial adotou a Mya em menos de um dia. A curva de aprendizado \u00E9 quase zero e o suporte \u00E9 absurdamente r\u00E1pido.",
    highlight: "Ferramenta indispens\u00E1vel.",
    color: "#34A853"
  },
  {
    initials: "MP",
    name: "Marina Pellegrini",
    stars: 5,
    time: "H\u00E1 10 semanas",
    text: "O que mais me impressionou foi a personaliza\u00E7\u00E3o. Conseguimos adaptar todo o fluxo de vendas para o nosso nicho. A IA sugere a\u00E7\u00F5es que realmente fazem sentido.",
    highlight: "Parece que a Mya conhece meu neg\u00F3cio.",
    color: "#8E24AA"
  },
  {
    initials: "FT",
    name: "Felipe Torres",
    stars: 5,
    time: "H\u00E1 4 semanas",
    text: "Migrei do Pipedrive para a Mya e n\u00E3o me arrependo. A interface \u00E9 muito mais moderna e as automa\u00E7\u00F5es s\u00E3o infinitamente superiores.",
    highlight: "N\u00EDvel enterprise com simplicidade.",
    color: "#00897B"
  },
  {
    initials: "LR",
    name: "Larissa Rocha",
    stars: 5,
    time: "H\u00E1 20 semanas",
    text: "Desde que implementamos a Mya, nossa taxa de convers\u00E3o subiu 40%. O kanban de oportunidades \u00E9 viciante de usar.",
    highlight: "Crescimento real, n\u00E3o promessa.",
    color: "#E65100"
  },
  {
    initials: "DV",
    name: "Daniel Vieira",
    stars: 5,
    time: "H\u00E1 3 semanas",
    text: "Incr\u00EDvel como a IA da Mya aprende o tom de voz da minha empresa. As mensagens autom\u00E1ticas parecem escritas por um humano.",
    highlight: "Tecnologia de outro n\u00EDvel.",
    color: "#1565C0"
  },
];

// Wave offsets: alternating up/down to create a wave pattern
const waveOffsets = [0, -40, 10, -50, 20, -30, 5, -45];

const StarRating = ({ count }: { count: number }) => (
  <div className="testimonial-stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={`star ${i < count ? 'filled' : ''}`}>&#9733;</span>
    ))}
  </div>
);

const TestimonialCard = ({ t, offset }: { t: Testimonial; offset: number }) => (
  <div className="testimonial-card" style={{ transform: `translateY(${offset}px)` }}>
    <div className="testimonial-header">
      <div className="testimonial-avatar" style={{ background: t.color }}>
        {t.initials}
      </div>
      <div className="testimonial-meta">
        <span className="testimonial-name">{t.name}</span>
        <div className="testimonial-rating-row">
          <StarRating count={t.stars} />
          <span className="testimonial-time">{t.time}</span>
        </div>
      </div>
    </div>
    <p className="testimonial-body">
      {t.text}
      {t.highlight && <strong> {t.highlight}</strong>}
    </p>
  </div>
);

const Testimonials: React.FC = () => {
  // Triple the cards for seamless infinite loop
  const allCards = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="testimonials-section">
      <div className="marquee-row">
        <div className="marquee-track marquee-wave">
          {allCards.map((t, i) => (
            <TestimonialCard
              key={`wave-${i}`}
              t={t}
              offset={waveOffsets[i % waveOffsets.length]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
