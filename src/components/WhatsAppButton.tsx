"use client";

import React, { useState, useEffect } from "react";
import "./WhatsAppButton.css";

// Configure your WhatsApp link and initial message here
const WHATSAPP_NUMBER = "5511999999999"; // Replace with real company WhatsApp number
const PREFILLED_TEXT = encodeURIComponent("Olá! Vim pelo site da Mya e gostaria de saber mais sobre as soluções de IA SDR.");
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${PREFILLED_TEXT}`;

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(true);

  // Auto-hide tooltip after 10 seconds to keep screen clean
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="whatsapp-float-container">
      {showTooltip && (
        <div className="whatsapp-tooltip">
          <div className="whatsapp-tooltip-content">
            <span className="tooltip-avatar">🤖</span>
            <div className="tooltip-text-wrapper">
              <span className="tooltip-title">Mya AI</span>
              <span className="tooltip-desc">Online! Fale conosco agora</span>
            </div>
            <button 
              className="tooltip-close" 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowTooltip(false);
              }}
              aria-label="Fechar"
            >
              &times;
            </button>
          </div>
          <div className="whatsapp-tooltip-arrow" />
        </div>
      )}

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
        aria-label="Fale conosco no WhatsApp"
        onClick={() => setShowTooltip(false)}
      >
        {/* Glow rings around button */}
        <div className="whatsapp-pulse-ring ring-1" />
        <div className="whatsapp-pulse-ring ring-2" />
        
        {/* WhatsApp Icon */}
        <svg 
          viewBox="0 0 24 24" 
          width="32" 
          height="32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="whatsapp-icon"
        >
          <path 
            fillRule="evenodd" 
            clipRule="evenodd" 
            d="M12.01 2C6.48 2 2 6.48 2 12c0 1.83.5 3.61 1.44 5.15L2 22l4.97-1.3C8.42 20.5 10.15 22 12.01 22c5.52 0 10-4.48 10-10S17.53 2 12.01 2zm6.2 15.15c-.25.7-.85 1.25-1.5 1.39-.75.15-1.65.1-2.9-.4-1.75-.7-3.15-2.25-4-3.5-.6-.9-1.2-2.1-1.2-3.3 0-1.2.6-1.8.85-2.1.25-.25.5-.3.75-.3h.5c.25 0 .5.05.7.45.2.5.7 1.7.75 1.8.05.1.1.25 0 .35-.05.1-.15.2-.25.3-.1.1-.25.25-.35.35-.1.1-.2.25-.1.4.15.3.7 1.25 1.5 1.95.8.7 1.5 1 1.8 1.1.15.05.3 0 .4-.1.35-.4.8-1 1.1-1.35.1-.15.3-.2.5-.1.2.1 1.2.6 1.45.7.25.1.4.2.5.25.1.05.2.2.1.4-.2.8-.7 1.5-1.2 1.85z" 
            fill="currentColor"
          />
        </svg>
      </a>
    </div>
  );
}
