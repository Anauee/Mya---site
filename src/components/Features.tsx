"use client";

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import './Features.css';

const SESSIONS = [
  { id: 'agents', label: 'Agentes SDR', title: 'Gerencie seus clones de IA', description: 'Configure e monitore seus agentes SDR em tempo real.' },
  { id: 'pipeline', label: 'Pipeline', title: 'Visão clara do funil', description: 'Acompanhe cada lead enquanto a Mya qualifica e agenda.' },
  { id: 'workflows', label: 'Automações', title: 'Fluxos inteligentes', description: 'Crie réguas de contato automáticas baseadas no comportamento.' },
  { id: 'analytics', label: 'Relatórios', title: 'Dados que convertem', description: 'Insights profundos sobre a performance do seu time de IA.' },
];

export default function Features() {
  const [activeTab, setActiveTab] = useState(SESSIONS[0].id);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Transition animation when tab changes
    if (contentRef.current) {
      gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 20, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
      );
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
              onClick={() => setActiveTab(session.id)}
            >
              <span className="tab-label">{session.label}</span>
              {activeTab === session.id && <div className="tab-active-line" />}
            </button>
          ))}
        </div>

        {/* Mockup Container */}
        <div className="crm-mockup-wrapper">
          <div className="mockup-window">
            
            {/* Fixed Sidebar */}
            <aside className="mockup-sidebar">
              <div className="sidebar-logo">
                <div className="logo-circle" />
                <span>Mya CRM</span>
              </div>
              <div className="sidebar-items">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="sidebar-item-skeleton" />
                ))}
              </div>
            </aside>

            {/* Dynamic Content Area */}
            <main className="mockup-main" ref={contentRef}>
              <div className="content-header">
                <h2>{SESSIONS.find(s => s.id === activeTab)?.title}</h2>
                <p>{SESSIONS.find(s => s.id === activeTab)?.description}</p>
              </div>
              
              <div className="content-grid">
                {activeTab === 'agents' && (
                  <div className="agents-view">
                    <div className="view-card" />
                    <div className="view-card" />
                    <div className="view-card highlight" />
                  </div>
                )}
                {activeTab === 'pipeline' && (
                  <div className="pipeline-view">
                    <div className="column" />
                    <div className="column" />
                    <div className="column" />
                  </div>
                )}
                {activeTab === 'workflows' && (
                  <div className="workflows-view">
                    <div className="flow-step" />
                    <div className="flow-line" />
                    <div className="flow-step" />
                  </div>
                )}
                {activeTab === 'analytics' && (
                  <div className="analytics-view">
                    <div className="chart-large" />
                    <div className="chart-small" />
                    <div className="chart-small" />
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
