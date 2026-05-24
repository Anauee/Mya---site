"use client";

import React from 'react';
import { Sparkles } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-main">
      <div className="footer-watermark">Strategic AI</div>
      
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-brand">
            <img src="https://zqbteazpirbktxbmhzog.supabase.co/storage/v1/object/public/Mya%20-%20Sai/fcdc3a68-dbea-4bed-86d8-5dc87c809ad1-removebg-preview.png" alt="Strategic AI Logo" className="brand-logo-img" />
            <span className="brand-name">Strategic AI</span>
          </div>
          <p className="copyright">© {currentYear} Strategic AI, Inc.</p>
          
          <div className="footer-socials">
            <a href="https://www.instagram.com/saitecnologia" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://share.google/DgkrpsP92VBls3EvD" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Google Meu Negócio">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="currentColor"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="currentColor"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="currentColor"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-right">
          <div className="footer-column">
            <h3>Links Rápidos</h3>
            <ul className="footer-links">
              <li><a href="#about">Sobre</a></li>
              <li><a href="#cta">Serviços</a></li>
              <li><a href="https://wa.me/5511964435210" target="_blank" rel="noopener noreferrer" className="utmify-checkout">Contato</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-tag">Elevating Business Intelligence</div>
      </div>
    </footer>
  );
}
