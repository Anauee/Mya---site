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
          width="28" 
          height="28" 
          fill="currentColor"
          className="whatsapp-icon"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.739-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.328 1.967 13.863 1.947 12 1.947c-5.439 0-9.865 4.37-9.869 9.8.001 1.737.476 3.427 1.38 4.911l-.988 3.606 3.731-.976zm12.115-6.812c-.33-.165-1.956-.965-2.256-1.074-.3-.11-.52-.165-.74.165-.22.33-.85 1.074-1.04 1.294-.19.22-.38.24-.71.075-.33-.165-1.393-.513-2.653-1.637-.98-.874-1.64-1.953-1.83-2.284-.19-.33-.02-.508.145-.673.15-.147.33-.38.495-.572.165-.19.22-.33.33-.55.11-.22.055-.41-.027-.572-.08-.165-.74-1.785-1.014-2.446-.268-.644-.54-.557-.74-.567-.19-.01-.41-.01-.63-.01-.22 0-.58.082-.885.413-.305.33-1.165 1.14-1.165 2.783 0 1.643 1.195 3.223 1.36 3.443.165.22 2.352 3.593 5.697 5.037.796.343 1.417.548 1.901.702.8.254 1.527.218 2.1.132.64-.096 1.955-.8 2.23-1.572.274-.773.274-1.433.19-1.572-.083-.14-.304-.223-.634-.388z" />
        </svg>
      </a>
    </div>
  );
}
