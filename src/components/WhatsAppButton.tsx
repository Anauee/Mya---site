"use client";

import React, { useState, useEffect } from "react";
import "./WhatsAppButton.css";

// Configure your WhatsApp link and initial message here
const WHATSAPP_NUMBER = "554196635378"; // Replace with real company WhatsApp number
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
          width="38" 
          height="38" 
          className="whatsapp-icon"
        >
          {/* Outer Speech Bubble (Solid White) */}
          <path 
            d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" 
            fill="#ffffff" 
          />
          {/* Perfectly Centered Handset (WhatsApp Dark Green) */}
          <path 
            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" 
            fill="#128c7e" 
            transform="translate(6, 6) scale(0.5)"
          />
        </svg>
      </a>
    </div>
  );
}
