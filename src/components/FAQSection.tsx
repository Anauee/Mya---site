"use client";

import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import './FAQSection.css';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Como a Mya se integra ao meu processo atual?",
    answer: "A Mya foi desenhada para ser plug-and-play. Ela se conecta nativamente com as principais ferramentas do mercado ou pode atuar como seu CRM central, eliminando a necessidade de múltiplas assinaturas e integrações complexas."
  },
  {
    question: "A IA realmente consegue qualificar leads sozinha?",
    answer: "Sim. Nossa IA SDR é treinada com base no seu playbook de vendas. Ela conversa de forma humana via WhatsApp, tira dúvidas técnicas e só agenda a reunião quando o lead preenche todos os critérios de qualificação definidos por você."
  },
  {
    question: "Quanto tempo leva para a Mya estar rodando?",
    answer: "A implementação básica leva menos de 24 horas. Em poucos cliques você configura sua conta, importa seus contatos e ativa sua primeira IA especialista."
  },
  {
    question: "Meus dados estão seguros na plataforma?",
    answer: "Segurança é nossa prioridade. Utilizamos criptografia de ponta a ponta e seguimos rigorosamente as normas da LGPD, garantindo que as informações do seu negócio e dos seus clientes estejam sempre protegidas."
  },
  {
    question: "A Mya funciona para qualquer tamanho de empresa?",
    answer: "Sim. Desde pequenas operações que precisam escalar sem contratar mais pessoas, até grandes times comerciais que buscam eficiência máxima e redução de CAC (Custo de Aquisição de Cliente)."
  }
];

const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        <div className="faq-header">
          <div className="faq-icon-wrapper">
            <HelpCircle size={48} strokeWidth={1.5} className="faq-top-icon" />
          </div>
          <h2 className="faq-title">Perguntas Frequentes</h2>
        </div>

        <div className="faq-list">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question-row">
                <h3 className="faq-question">{item.question}</h3>
                <div className="faq-toggle-icon">
                  {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </div>
              <div className="faq-answer-wrapper">
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
