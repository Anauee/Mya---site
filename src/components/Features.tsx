"use client";

import React, { useState, useRef, useEffect, useTransition } from 'react';
import gsap from 'gsap';
import { BarChart2, Users, MessageSquare, Megaphone, UserCheck, Layers, Settings, ChevronLeft, Plus, BarChart, Search, Filter } from 'lucide-react';
import './Features.css';

const SESSIONS = [
  { id: 'dashboard', label: 'Dashboard', title: 'Dashboard', description: 'Monitore todos os seus indicadores de performance em um só lugar.' },
  { id: 'pipeline', label: 'Pipeline', title: 'Pipeline de Vendas', description: 'Acompanhe o progresso de cada negociação no seu funil de vendas.' },
  { id: 'conversas', label: 'Conversas', title: 'Central de Atendimento', description: 'Interaja com seus leads em tempo real através de múltiplos canais.' },
  { id: 'contatos', label: 'Contatos', title: 'Base de Leads Qualificados', description: 'Gerencie sua lista de contatos e visualize o histórico completo de interações.' },
];

const CONTACT_FILTERS = [
  'API não oficial', 'API oficial', 'Not on WhatsApp', 'On Whatsapp', 'SP', 'enviado', 'envio 1', 'envio 2', 'respondeu', 'teste'
];

const CONTACTS_DATA = [
  { id: 1, name: 'Carlos Ferreira', phone: '+5521986939005', ddd: '21', tags: ['On Whatsapp', 'enviado', 'API oficial'], status: 'opt-in', lastSend: '12/05/2026, 08:23:06', color: '#64748b' },
  { id: 2, name: 'Mariana Santos', phone: '+5584996537183', ddd: '84', tags: ['On Whatsapp', 'enviado', 'API não oficial'], status: 'opt-in', lastSend: '08/05/2026, 16:34:29', color: '#94a3b8' },
  { id: 3, name: 'João Silva', phone: '+5547991911940', ddd: '47', tags: ['On Whatsapp', 'enviado', 'API não oficial'], status: 'opt-in', lastSend: '06/05/2026, 16:21:05', color: '#10b981' },
  { id: 4, name: 'Ana Oliveira', phone: '+552730664002', ddd: '27', tags: ['Not on WhatsApp'], status: 'opt-in', lastSend: '--', color: '#3b82f6' },
  { id: 5, name: 'Roberto Lima', phone: '+5561986524232', ddd: '61', tags: ['Not on WhatsApp'], status: 'opt-in', lastSend: '--', color: '#f59e0b' },
  { id: 6, name: 'Fernanda Costa', phone: '+5561998926081', ddd: '61', tags: ['enviado', 'API oficial', 'On Whatsapp'], status: 'opt-in', lastSend: '05/05/2026, 11:34:15', color: '#8b5cf6' },
  { id: 7, name: 'Lucas Pereira', phone: '+5561998550634', ddd: '61', tags: ['enviado', 'API não oficial', 'On Whatsapp'], status: 'opt-in', lastSend: '06/05/2026, 13:28:20', color: '#ec4899' },
  { id: 8, name: 'Beatriz Souza', phone: '+553130466171', ddd: '31', tags: ['enviado', 'On Whatsapp'], status: 'opt-in', lastSend: '05/05/2026, 08:31:14', color: '#06b6d4' },
  { id: 9, name: 'Ricardo Alves', phone: '+5516988122895', ddd: '16', tags: ['enviado', 'On Whatsapp'], status: 'opt-in', lastSend: '05/05/2026, 08:31:19', color: '#10b981' },
];

function RollingNumber({ value }: { value: string | number }) {
  const digits = String(value).split('');
  
  return (
    <div className="rolling-number">
      {digits.map((digit, idx) => {
        if (isNaN(parseInt(digit))) return <span key={idx} className="rolling-char">{digit}</span>;
        return (
          <div key={idx} className="rolling-digit-container">
            <div className="rolling-digit-strip" data-digit={digit}>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
                <span key={n}>{n}</span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface PipelineCard {
  name: string;
  phone: string;
  tags: string[];
  val?: string;
  highlight?: string;
}

interface PipelineColumn {
  title: string;
  color: string;
  value: string;
  count: number;
  cards: PipelineCard[];
}

export default function Features() {
  const [activeTab, setActiveTab] = useState('pipeline');
  const [isPending, startTransition] = useTransition();
  const contentRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (tabId: string) => {
    startTransition(() => {
      setActiveTab(tabId);
    });
  };

  useEffect(() => {
    console.log("Current active tab:", activeTab);
    // Transition animation when tab changes
    if (contentRef.current) {
      const tl = gsap.timeline();
      
      tl.fromTo(contentRef.current, 
        { opacity: 0, y: 20, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
      );

      if (activeTab === 'dashboard') {
        // Rolling numbers animation
        tl.fromTo(".rolling-digit-strip", 
          { y: 0 },
          { 
            y: (i, target) => {
              const digit = parseInt(target.dataset.digit);
              return `-${digit * 10}%`;
            },
            duration: 1.5,
            ease: "power4.out",
            stagger: 0.05
          }, 
          "-=0.4"
        );

        // Progress bars animation
        tl.to(".funnel-bar-fill", {
          width: (i, target) => `${target.dataset.percent}%`,
          duration: 1,
          ease: "power2.out",
          stagger: 0.05
        }, "-=1");

        // Chart line animation
        gsap.set(".chart-line", { strokeDasharray: 1000, strokeDashoffset: 1000 });
        tl.to(".chart-line", {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.out",
          stagger: 0.2
        }, "-=1.2");
      }

      // Animation for ALL tabs
      // Clear previous animations state for the active view
      const headerSelector = ".content-header .header-titles > *";
      gsap.set(headerSelector, { opacity: 0, y: 20, visibility: "hidden" });

      // 1. Header Animation (Common to all) - START IMMEDIATELY
      tl.to(headerSelector, {
        opacity: 1,
        y: 0,
        visibility: "visible",
        duration: 0.4, // Faster
        stagger: 0.1,
        ease: "power2.out"
      }, 0.1); // Start almost immediately

      if (activeTab === 'pipeline') {
        gsap.set(".mya-column, .mya-card", { opacity: 0, y: 20, visibility: "hidden" });
        gsap.set(".mya-header-actions > *", { opacity: 0, scale: 0.5, visibility: "hidden" });

        // 2. Buttons Animation - SPRING FROM BACK
        tl.to(".mya-header-actions > *", {
          opacity: 1,
          scale: 1,
          visibility: "visible",
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(3)" // Stronger spring effect
        }, "-=0.3");

        // 3. Columns Animation
        tl.to(".mya-column", {
          opacity: 1,
          y: 0,
          visibility: "visible",
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out"
        }, "-=0.3");

        // 4. Cards Animation
        tl.to(".mya-card", {
          opacity: 1,
          y: 0,
          visibility: "visible",
          duration: 0.4,
          stagger: 0.05,
          ease: "back.out(1.2)"
        }, "-=0.4");
      } else if (activeTab === 'conversas') {
        gsap.set(".conversas-view-real", { opacity: 0, y: 30, visibility: "hidden" });
        gsap.set(".chat-item", { opacity: 0, scale: 0.9, visibility: "hidden" });
        gsap.set(".message-bubble", { opacity: 0, y: 30, visibility: "hidden" });

        tl.to(".conversas-view-real", {
          opacity: 1,
          y: 0,
          visibility: "visible",
          duration: 0.6,
          ease: "power3.out"
        }, "-=0.2");

        tl.to(".chat-item", {
          opacity: 1,
          scale: 1,
          visibility: "visible",
          duration: 0.4,
          stagger: 0.1,
          ease: "back.out(1.5)"
        }, "-=0.3");

        tl.to(".message-bubble", {
          opacity: 1,
          y: 0,
          visibility: "visible",
          duration: 0.6,
          stagger: 1.2, // Delay to simulate "conversation" flow
          ease: "power2.out"
        }, "-=0.1");
      } else if (activeTab === 'contatos') {
        gsap.set(".contatos-view-real", { opacity: 0, y: 50, visibility: "hidden" });
        gsap.set(".contacts-top-bar > *, .contacts-actions > *", { opacity: 0, scale: 0.7, visibility: "hidden" });
        gsap.set(".contacts-table tr", { opacity: 0, y: 30, visibility: "hidden" });
        gsap.set(".tag-pill", { filter: "grayscale(100%)", opacity: 0, rotationX: -90, z: 20 });

        tl.to(".contatos-view-real", {
          opacity: 1,
          y: 0,
          visibility: "visible",
          duration: 1.2,
          ease: "power4.out"
        }, "-=0.2");

        tl.to(".contacts-top-bar > *, .contacts-actions > *", {
          opacity: 1,
          scale: 1,
          visibility: "visible",
          duration: 1,
          stagger: 0.1,
          ease: "back.out(1.4)"
        }, "-=0.8");

        tl.to(".contacts-table tr", {
          opacity: 1,
          y: 0,
          visibility: "visible",
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out"
        }, "-=0.6");

        tl.to(".tag-pill", {
          opacity: 1,
          filter: "grayscale(0%)",
          rotationX: 0,
          z: 0,
          duration: 1.2,
          stagger: 0.03,
          ease: "back.out(1.7)"
        }, "-=0.9");
      } else if (activeTab === 'dashboard') {
        // Only animate header for Dashboard, keep rest as is
      } else {
        // Fallback for other tabs
        gsap.set(".content-grid > *", { opacity: 0, y: 20, visibility: "hidden" });
        tl.to(".content-grid > *", {
          opacity: 1,
          y: 0,
          visibility: "visible",
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.4");
      }
    }
  }, [activeTab]);

  return (
    <section className="features-section">
      <div className="container features-container">
        
        {/* Integrated Grid Navigation */}
        <div className="tabs-grid">
          {SESSIONS.map((session) => (
            <button
              key={session.id}
              className={`tab-item ${activeTab === session.id ? 'active' : ''}`}
              onClick={() => handleTabChange(session.id)}
            >
              <span className="tab-label">{session.label}</span>
              {activeTab === session.id && <div className="tab-active-line" />}
            </button>
          ))}
        </div>

        {/* Mockup Container */}
        <div className={`crm-mockup-wrapper ${activeTab}-active`}>
          <div className="mockup-window">
            
            {/* Fixed Sidebar */}
            <aside className="mockup-sidebar">
              <div className="sidebar-header">
                <div className="sidebar-logo-container">
                  <img 
                    src="https://zqbteazpirbktxbmhzog.supabase.co/storage/v1/object/public/Mya%20-%20Sai/sai-crm.png" 
                    alt="SAI CRM" 
                    className="sidebar-logo-img"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="sidebar-brand-text">CRM</span>
                </div>
                <ChevronLeft size={16} className="sidebar-toggle-icon" />
              </div>
              
              <div className="sidebar-nav">
                <div className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => handleTabChange('dashboard')}>
                  <BarChart2 size={18} />
                  <span>Dashboard</span>
                </div>
                <div className={`nav-item ${activeTab === 'contatos' ? 'active' : ''}`} onClick={() => handleTabChange('contatos')}>
                  <Users size={18} />
                  <span>Contatos</span>
                </div>
                <div className={`nav-item ${activeTab === 'conversas' ? 'active' : ''}`} onClick={() => handleTabChange('conversas')}>
                  <MessageSquare size={18} />
                  <span>Conversas</span>
                </div>
                <div className="nav-item">
                  <Megaphone size={18} />
                  <span>Campanhas</span>
                </div>
                <div className="nav-item">
                  <UserCheck size={18} />
                  <span>Clientes</span>
                </div>
                <div className={`nav-item ${activeTab === 'pipeline' ? 'active' : ''}`} onClick={() => handleTabChange('pipeline')}>
                  <Layers size={18} />
                  <span>Pipeline</span>
                </div>
              </div>

              <div className="sidebar-footer">
                <div className="nav-item">
                  <Settings size={18} />
                  <span>Configurações</span>
                </div>
                <div className="user-profile">
                  <div className="user-info">
                    <span className="user-name">Anaue Schultz</span>
                    <span className="user-role">Membro</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Dynamic Content Area */}
            <main className="mockup-main" ref={contentRef}>
              {activeTab !== 'pipeline' && (
                <div className="content-header">
                  <div className="header-titles">
                    <h2>{SESSIONS.find(s => s.id === activeTab)?.title}</h2>
                    <p>{SESSIONS.find(s => s.id === activeTab)?.description}</p>
                  </div>
                </div>
              )}
              
              <div className="content-grid">
                {activeTab === 'dashboard' && (
                  <div className="dashboard-view-real">
                    <div className="dash-stats-grid">
                      <div className="stat-card">
                        <span className="stat-label">Total Clientes</span>
                        <h3 className="stat-value"><RollingNumber value={60} /></h3>
                      </div>
                      <div className="stat-card">
                        <span className="stat-label">Negócios Abertos</span>
                        <h3 className="stat-value"><RollingNumber value={34} /></h3>
                      </div>
                      <div className="stat-card">
                        <span className="stat-label">Valor no Pipeline</span>
                        <h3 className="stat-value">R$ <RollingNumber value="3.981" />,00</h3>
                      </div>
                      <div className="stat-card">
                        <span className="stat-label">Tarefas Pendentes</span>
                        <h3 className="stat-value"><RollingNumber value={0} /></h3>
                      </div>
                    </div>

                    <div className="dash-main-grid">
                      <div className="chart-container-card">
                        <span className="chart-title">Vendas por Mês</span>
                        <div className="chart-svg-wrapper">
                          <svg viewBox="0 0 400 200" className="dashboard-chart">
                            {/* Grid Lines */}
                            <line x1="0" y1="0" x2="400" y2="0" stroke="#f1f5f9" />
                            <line x1="0" y1="50" x2="400" y2="50" stroke="#f1f5f9" />
                            <line x1="0" y1="100" x2="400" y2="100" stroke="#f1f5f9" />
                            <line x1="0" y1="150" x2="400" y2="150" stroke="#f1f5f9" />
                            
                            {/* Green Line */}
                            <path 
                              className="chart-line green" 
                              d="M0,180 L40,160 L80,120 L120,190 L160,110 L200,60 L240,130 L280,130 L320,80 L360,50 L400,20" 
                              fill="none" 
                              stroke="#10b981" 
                              strokeWidth="3" 
                            />
                            {/* Pink Line */}
                            <path 
                              className="chart-line pink" 
                              d="M0,195 L40,170 L80,150 L120,180 L160,140 L200,120 L240,180 L280,160 L320,180 L360,140 L400,160" 
                              fill="none" 
                              stroke="#fda4af" 
                              strokeWidth="3" 
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="funnel-container-card">
                        <span className="chart-title">Funil de Conversão</span>
                        <div className="funnel-list">
                          {[
                            { label: 'Lead', val: 21, percent: 95 },
                            { label: 'Reunião agendada', val: 0, percent: 0 },
                            { label: 'No-Show', val: 3, percent: 20 },
                            { label: 'Follow Pós Reunião', val: 3, percent: 25 },
                            { label: 'Contrato', val: 2, percent: 15 },
                            { label: 'Implementando', val: 3, percent: 20 },
                            { label: 'Ganhos', val: 4, percent: 30 }
                          ].map((item, idx) => (
                            <div key={idx} className="funnel-item">
                              <div className="funnel-info">
                                <span>{item.label}</span>
                                <span>{item.val}</span>
                              </div>
                              <div className="funnel-bar-bg">
                                <div 
                                  className="funnel-bar-fill" 
                                  data-percent={item.percent}
                                  style={{ width: '0%' }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'pipeline' && (
                  <div className="mya-pipeline-full-view">
                    <div className="content-header mya-pipeline-header">
                      <div className="header-titles">
                        <h2>Pipeline de Vendas</h2>
                        <p>Acompanhe o progresso de cada negociação.</p>
                      </div>
                      <div className="mya-header-actions">
                        <div className="mya-toggle-group">
                          <button className="mya-toggle-btn active">
                            <BarChart2 size={16} />
                            Kanban
                          </button>
                          <button className="mya-toggle-btn">
                            <Layers size={16} />
                            Lista
                          </button>
                        </div>
                        <button className="mya-primary-btn">
                          <Plus size={16} />
                          Novo Negócio
                        </button>
                      </div>
                    </div>

                    <div className="pipeline-board mya-new-board">
                      {( [
                        { title: 'Lead', color: '#f1f5f9', value: 'R$ 280,00', count: 21, cards: [{ name: 'Alex', phone: '(41) 8834-0534', tags: ['Disparos', 'Não gerado'] }, { name: '4motion academia', phone: '(86) 9438-9166', tags: ['Disparos', 'Não gerado'] }] },
                        { title: 'Reunião agendada', color: '#eff6ff', value: 'R$ 540,00', count: 1, cards: [{ name: 'Studio Fitness', phone: '(11) 98765-4321', tags: ['SDR', 'Reunião'], val: 'R$ 540,00' }] },
                        { title: 'No-Show', color: '#fefce8', value: 'R$ 280,00', count: 3, cards: [{ name: 'Jean Marry', phone: '(98) 98162-3734', tags: ['Google Ads', 'Não gerado'], highlight: '#fee2e2' }] }
                      ] as PipelineColumn[]).map((col, idx) => (
                        <div key={idx} className="mya-column" style={{ backgroundColor: col.color }}>
                          <div className="column-header">
                            <div className="column-info">
                              <h4>{col.title}</h4>
                              <span className="column-value">{col.value}</span>
                            </div>
                            <span className="column-count">{col.count}</span>
                          </div>
                          <div className="column-cards">
                            {col.cards.map((card, cIdx) => (
                              <div key={cIdx} className="mya-card">
                                <div className="card-top-info">
                                  <span className="card-name">{card.name}</span>
                                  <div className="card-row">
                                    <span className="card-phone">{card.phone}</span>
                                    <div className="card-icons-right">
                                      <div className="tiny-icon-box"><Layers size={10} /></div>
                                    </div>
                                  </div>
                                  {card.val && <span className="card-val">{card.val}</span>}
                                </div>
                                <div className="card-tags">
                                  {card.tags.map((tag, tIdx) => (
                                    <span key={tIdx} className={`card-tag ${tag === 'Google Ads' || tag === 'Reunião' ? 'red-tag' : ''}`}>{tag}</span>
                                  ))}
                                </div>
                                <div className="card-footer-icons">
                                  <div className="status-badge">
                                    <MessageSquare size={10} />
                                    <span>{idx === 1 ? 'Agendado' : 'Não gerado'}</span>
                                  </div>
                                  <div className="yellow-doc-icon">
                                    <Layers size={10} />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === 'conversas' && (
                  <div className="conversas-view-real">
                    <aside className="chat-sidebar">
                      <div className="chat-sidebar-header">
                        <div className="chat-search-box">
                          <Plus size={16} />
                          <span>Nova Conversa</span>
                        </div>
                      </div>
                      <div className="chat-list">
                        {[
                          { name: 'Academia Bem Estar', msg: 'Até as 18h! 🏋️‍♂️', time: '09:06', active: true, color: '#10b981' },
                          { name: 'Circuito Fitness', msg: 'Pode deixar, aviso sim.', time: 'Ontem', color: '#3b82f6' },
                          { name: 'Chakaruna Store', msg: 'Obrigado pelo retorno!', time: '14/05', color: '#f59e0b' },
                          { name: 'Studio Move', msg: 'Vou conferir os horários.', time: '12/05', color: '#ef4444' }
                        ].map((chat, i) => (
                          <div key={i} className={`chat-item ${chat.active ? 'active' : ''}`}>
                            <div className="chat-avatar" style={{ backgroundColor: chat.color }}>
                              {chat.name[0]}
                            </div>
                            <div className="chat-info">
                              <div className="chat-info-top">
                                <span className="chat-name">{chat.name}</span>
                                <span className="chat-time">{chat.time}</span>
                              </div>
                              <p className="chat-last-msg">{chat.msg}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </aside>

                    <section className="chat-main">
                      <header className="chat-header">
                        <div className="chat-header-info">
                          <div className="chat-avatar" style={{ backgroundColor: '#10b981' }}>A</div>
                          <div className="chat-header-text">
                            <h4>Academia Bem Estar</h4>
                            <div className="chat-status">
                              <div className="status-dot" />
                              <span>Mya Ativa • Online</span>
                            </div>
                          </div>
                        </div>
                        <div className="chat-header-actions">
                          <div className="tiny-icon-box"><Users size={14} /></div>
                          <div className="tiny-icon-box"><Settings size={14} /></div>
                        </div>
                      </header>

                      <div className="chat-messages">
                        <div className="message-bubble user">
                          <p>Olá! Gostaria de saber os horários de funcionamento da academia hoje.</p>
                          <span className="message-time">09:00</span>
                        </div>
                        <div className="message-bubble bot">
                          <p>Olá! 😊 Funcionamos hoje das 06h às 22h. Além disso, temos turmas de Crossfit às 18h e 19h.</p>
                          <span className="message-time">09:01</span>
                        </div>
                        <div className="message-bubble bot">
                          <p>Gostaria de agendar uma aula experimental gratuita para um desses horários?</p>
                          <span className="message-time">09:01</span>
                        </div>
                        <div className="message-bubble user">
                          <p>Pode ser as 18h! Vou levar um amigo também.</p>
                          <span className="message-time">09:05</span>
                        </div>
                        <div className="message-bubble bot">
                          <p>Perfeito! Já reservei as duas vagas para as 18h. Estaremos esperando vocês! 🏋️‍♂️</p>
                          <span className="message-time">09:06</span>
                        </div>
                      </div>

                      <footer className="chat-footer">
                        <div className="chat-input-wrapper">
                          <input type="text" placeholder="Digite sua resposta..." disabled />
                          <button className="chat-send-btn">
                            <Plus size={18} />
                          </button>
                        </div>
                      </footer>
                    </section>
                  </div>
                )}
                {activeTab === 'contatos' && (
                  <div className="contatos-view-real">
                    <div className="contacts-top-bar">
                      <div className="search-and-filter">
                        <div className="mya-search-wrapper">
                          <Search size={16} />
                          <input type="text" placeholder="Buscar por nome, telefone..." />
                        </div>
                        <div className="mya-select-wrapper">
                          <select>
                            <option>Todos</option>
                          </select>
                        </div>
                      </div>
                      <div className="contacts-actions">
                        <button className="mya-secondary-btn">Importar</button>
                        <button className="mya-secondary-btn">Verificar WhatsApp</button>
                        <button className="mya-primary-btn">
                          <Plus size={16} />
                          Novo contato
                        </button>
                      </div>
                    </div>

                    <div className="filters-strip">
                      <span className="filter-label">Filtro por tag:</span>
                      <div className="filter-tags-scroll">
                        {CONTACT_FILTERS.map((filter, idx) => (
                          <button key={idx} className="filter-tag-pill">
                            {filter}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="contacts-table-container">
                      <table className="contacts-table">
                        <thead>
                          <tr>
                            <th className="col-check"><input type="checkbox" readOnly /></th>
                            <th className="col-name">NOME ▲</th>
                            <th className="col-phone">TELEFONE</th>
                            <th className="col-ddd">DDD</th>
                            <th className="col-tags">TAGS</th>
                            <th className="col-status">STATUS</th>
                            <th className="col-last">ÚLTIMO ENVIO</th>
                          </tr>
                        </thead>
                        <tbody>
                          {CONTACTS_DATA.map((contact) => (
                            <tr key={contact.id}>
                              <td><input type="checkbox" readOnly /></td>
                              <td>
                                <div className="contact-name-cell">
                                  <div className="contact-avatar-small" style={{ backgroundColor: contact.color }}>
                                    {contact.name[0] === '#' ? '?' : contact.name[0]}
                                  </div>
                                  <span>{contact.name}</span>
                                </div>
                              </td>
                              <td>{contact.phone}</td>
                              <td>{contact.ddd}</td>
                              <td>
                                <div className="contact-tags-cell">
                                  {contact.tags.map((tag, tIdx) => (
                                    <span key={tIdx} className={`tag-pill ${tag.toLowerCase().replace(/ /g, '-')}`}>
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td>
                                <span className="status-pill-optin">{contact.status}</span>
                              </td>
                              <td className="last-send-cell">{contact.lastSend}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </main>
          </div>

          {/* Fog Effect Overlays */}
          <div className="mockup-fog" />
          <div className="mockup-fog-right" />
        </div>

      </div>
    </section>
  );
}
