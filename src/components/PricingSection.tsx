"use client";

import React from 'react';
import './PricingSection.css';

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

export default function PricingSection() {
  const WHATSAPP_NUMBER = "554196635378"; // Can be replaced later
  const WHATSAPP_LINK_ATENDER = `https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1,%20gostaria%20de%20contratar%20o%20plano%20Atender.`;
  const WHATSAPP_LINK_ESCALAR = `https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1,%20gostaria%20de%20contratar%20o%20plano%20Escalar.`;
  const WHATSAPP_LINK_FIDELIZAR = `https://wa.me/${WHATSAPP_NUMBER}?text=Ol%C3%A1,%20gostaria%20de%20contratar%20o%20plano%20Fidelizar.`;

  return (
    <section className="pricing-section" id="planos">
      <div className="pricing-bg-blur"></div>
      <div className="pricing-bg-blur-2"></div>
      
      <div className="pricing-header">
        <h2 className="pricing-title">O único sistema de IA que você precisa para <span style={{ color: 'var(--accent-color)' }}>vender mais com muito menos esforço!</span></h2>
      </div>

      <div className="pricing-cards-container">
        
        {/* Card 1: Atender */}
        <div className="pricing-card">
          <div className="card-subtitle">IA de atendimento</div>
          <h3 className="card-title">Atender</h3>
          <p className="card-desc">Para parar de perder lead por demora ou falta de resposta no WhatsApp.</p>
          
          <div className="card-price-container">
            <span className="price-value">R$280</span>
            <span className="price-period">/mês</span>
          </div>
          <div className="setup-fee">Implementação assistida: R$500</div>
          
          <ul className="features-list">
            <li className="feature-item">
              <span className="feature-icon"><CheckIcon /></span>
              Atendimento humanizado 24/7 no WhatsApp
            </li>
            <li className="feature-item">
              <span className="feature-icon"><CheckIcon /></span>
              Agendamento automático de reuniões e compromissos
            </li>
            <li className="feature-item">
              <span className="feature-icon"><CheckIcon /></span>
              Follow-up automático para leads sem resposta
            </li>
            <li className="feature-item">
              <span className="feature-icon"><CheckIcon /></span>
              Painel de configuração do atendimento por IA
            </li>
          </ul>
          
          <a href={WHATSAPP_LINK_ATENDER} target="_blank" rel="noopener noreferrer" className="pricing-btn btn-primary">
            <WhatsAppIcon /> Começar teste gratuito
          </a>
          <div className="risk-free-text">Sem cartão e sem riscos!</div>
        </div>

        {/* Card 2: Escalar (Highlight) */}
        <div className="pricing-card highlight">
          <div className="highlight-badge">Mais escolhido</div>
          <div className="card-subtitle">Atendimento + Gestão + Atração</div>
          <h3 className="card-title">Escalar</h3>
          <p className="card-desc">Para times que precisam vender com CRM e gerar novas oportunidades.</p>
          
          <div className="card-price-container">
            <span className="price-value">R$550</span>
            <span className="price-period">/mês</span>
          </div>
          <div className="setup-fee">Implementação assistida: R$750</div>
          
          <ul className="features-list">
            <li className="feature-item">
              <span className="feature-icon"><CheckIcon /></span>
              Tudo do plano Atender
            </li>
            <li className="feature-item">
              <span className="feature-icon"><CheckIcon /></span>
              Funil visual de vendas em Kanban
            </li>
            <li className="feature-item">
              <span className="feature-icon"><CheckIcon /></span>
              Cadastro centralizado de clientes e histórico
            </li>
            <li className="feature-item">
              <span className="feature-icon"><CheckIcon /></span>
              Dashboard visual do funil em tempo real
            </li>
            <li className="feature-item">
              <span className="feature-icon"><CheckIcon /></span>
              Extrator de leads para Google e Instagram
            </li>
            <li className="feature-item">
              <span className="feature-icon"><CheckIcon /></span>
              Disparador de mensagens WhatsApp para campanhas
            </li>
          </ul>
          
          <a href={WHATSAPP_LINK_ESCALAR} target="_blank" rel="noopener noreferrer" className="pricing-btn btn-white">
            <WhatsAppIcon /> Começar teste gratuito
          </a>
          <div className="risk-free-text">Sem cartão e sem riscos!</div>
        </div>

        {/* Card 3: Fidelizar */}
        <div className="pricing-card">
          <div className="card-subtitle">Atendimento + Gestão + Atração + Retenção</div>
          <h3 className="card-title">Fidelizar</h3>
          <p className="card-desc">Para empresas que também querem retenção, renovação e pós-venda ativo.</p>
          
          <div className="card-price-container">
            <span className="price-value">R$780</span>
            <span className="price-period">/mês</span>
          </div>
          <div className="setup-fee">Implementação assistida: R$1.000</div>
          
          <ul className="features-list">
            <li className="feature-item">
              <span className="feature-icon"><CheckIcon /></span>
              Tudo do plano Escalar
            </li>
            <li className="feature-item">
              <span className="feature-icon"><CheckIcon /></span>
              Aviso de vencimento de contrato
            </li>
            <li className="feature-item">
              <span className="feature-icon"><CheckIcon /></span>
              Mensagem automática de aniversário
            </li>
            <li className="feature-item">
              <span className="feature-icon"><CheckIcon /></span>
              Pesquisa de satisfação após atendimento
            </li>
            <li className="feature-item">
              <span className="feature-icon"><CheckIcon /></span>
              Rotinas para renovação, reativação e relacionamento
            </li>
          </ul>
          
          <a href={WHATSAPP_LINK_FIDELIZAR} target="_blank" rel="noopener noreferrer" className="pricing-btn btn-primary">
            <WhatsAppIcon /> Começar teste gratuito
          </a>
          <div className="risk-free-text">Sem cartão e sem riscos!</div>
        </div>

      </div>
      
      <div className="pricing-footer">
        <p>Implementação assistida pela equipe SAI. A implementação substitui a primeira mensalidade.</p>
      </div>
    </section>
  );
}
