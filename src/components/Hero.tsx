"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCheck, ChevronDown } from 'lucide-react';
import './Hero.css';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const roles = ["SDR", "vendedor", "atendente"];
const HERO_VIDEO_URL = "https://zqbteazpirbktxbmhzog.supabase.co/storage/v1/object/public/Mya%20-%20Sai/video1.mp4";
const HERO_VIDEO_SCROLL_DISTANCE = "+=35%";

const MESSAGES = [
  { type: 'bot', text: 'Olá! Eu sou a Mya, sua atendente virtual. Como posso te ajudar hoje?', time: '14:00' },
  { type: 'user', text: 'Oi Mya, gostaria de agendar uma consulta.', time: '14:01' },
  { type: 'bot', text: 'Perfeito! Sua consulta foi agendada para terça-feira às 14:00 horas. ✅', time: '14:01' },
];

const MSG_HEIGHT = 100; // Increased from 90 to match new padding and font size

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const secondLineRef = useRef<HTMLDivElement>(null);
  const innerChatRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  // Title rotation
  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(secondLineRef.current, {
        x: 40, opacity: 0, duration: 0.5, ease: "power2.in",
        onComplete: () => {
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          gsap.fromTo(secondLineRef.current,
            { x: -40, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
          );
        }
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // PUSH-UP EFFECT: Move the inner container UP as each message is added
  useEffect(() => {
    if (!innerChatRef.current) return;
    const inner = innerChatRef.current;
    const msgs = Array.from(inner.children) as HTMLElement[];

    // Hide all messages initially
    gsap.set(msgs, { opacity: 0, y: 20 });
    // Start the inner container pushed down so message 1 appears at bottom
    gsap.set(inner, { y: MSG_HEIGHT * (msgs.length - 1) });

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5, delay: 1 });

    // Step 1: Just show first message (already at bottom)
    tl.to(msgs[0], { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" })
      .to({}, { duration: 2.0 });

    // Step 2: Push container UP + Show message 2 SIMULTANEOUSLY
    tl.add("step2");
    tl.to(inner, { y: `-=${MSG_HEIGHT}`, duration: 0.85, ease: "power3.inOut" }, "step2");
    tl.to(msgs[1], { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "step2");
    tl.to({}, { duration: 2.0 });

    // Step 3: Push container UP + Show message 3 + Hide message 1 SIMULTANEOUSLY
    tl.add("step3");
    tl.to(inner, { y: `-=${MSG_HEIGHT}`, duration: 0.85, ease: "power3.inOut" }, "step3");
    tl.to(msgs[2], { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "step3");
    tl.to(msgs[0], { opacity: 0, y: -40, duration: 0.7, ease: "power2.inOut" }, "step3");
    tl.to({}, { duration: 3.0 });

    // Exit phase
    tl.to([msgs[1], msgs[2]], { opacity: 0, y: -30, duration: 0.8, ease: "power3.in" });

    // Reset
    tl.call(() => {
      gsap.set(msgs, { opacity: 0, y: 20 });
      gsap.set(inner, { opacity: 1, y: MSG_HEIGHT * (msgs.length - 1) });
    });

    // Floating arrow animation
    gsap.to(arrowRef.current, {
      y: 10,
      opacity: 0.6,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    return () => { 
      tl.kill(); 
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    let scrubTween: gsap.core.Tween | null = null;

    const setupVideoScrub = () => {
      scrubTween?.kill();

      if (!video.duration || Number.isNaN(video.duration)) return;

      video.pause();
      video.currentTime = 0;

      const playhead = { time: 0 };

      scrubTween = gsap.to(playhead, {
        time: Math.max(video.duration - 0.05, 0),
        ease: "none",
        onUpdate: () => {
          if (video.readyState >= 2) {
            video.currentTime = playhead.time;
          }
        },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: HERO_VIDEO_SCROLL_DISTANCE,
          scrub: 0.35,
          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.refresh();
    };

    const handleLoadedMetadata = () => {
      setupVideoScrub();
    };

    if (video.readyState >= 1) {
      setupVideoScrub();
    } else {
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      scrubTween?.scrollTrigger?.kill();
      scrubTween?.kill();
    };
  }, []);

  return (
    <section className="hero-section" ref={sectionRef}>
      <div className="hero-glass-background" />
      
      <div className="container hero-container">

        {/* Title Block */}
        <div className="hero-title-wrapper">
          <div className="static-line-container">
            <h1 className="line-one">Clone seu melhor</h1>
          </div>
          <div className="animated-line-container">
            <div className="line-two" ref={secondLineRef}>
              <span className="highlight-text">{roles[currentRoleIndex]}</span>
              <span className="static-text"> com IA</span>
            </div>
          </div>
        </div>

        {/* Content Row */}
        <div className="hero-content">

          {/* LEFT: Chat Push-Up */}
          <div className="hero-chat-viewport">
            <div className="hero-scroll-video-layer">
              <video
                ref={videoRef}
                className="hero-scroll-video"
                src={HERO_VIDEO_URL}
                muted
                playsInline
                preload="auto"
              />
            </div>

            <div className="hero-chat-inner hero-chat-inner--hidden" ref={innerChatRef} aria-hidden="true">
              {MESSAGES.map((msg, i) => (
                <div key={i} className={`floating-msg ${msg.type === 'user' ? 'user-message' : 'bot-message'}`}>
                  <p>{msg.text}</p>
                  <div className="msg-meta">
                    <span className="msg-time">{msg.time}</span>
                    {msg.type === 'user' && (
                      <span className="msg-status-checks"><CheckCheck size={13} /></span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Copy & CTA */}
          <div className="hero-copy">
            <p className="hero-description">
              Com a Mya, você pode construir agentes de IA que planejam, agem e colaboram de forma mais efetiva. <br className="hidden lg:block" /> Escale suas vendas sem aumentar sua equipe.
            </p>
            <div className="hero-actions">
              <a href="#pricing" className="btn-primary">Start building</a>
              <a href="#about" className="btn-secondary">Contact sales</a>
            </div>
          </div>

        </div> {/* closes hero-content */}
      </div> {/* closes hero-container */}

      {/* Floating Scroll Indicator - Moved outside container for fixed positioning */}
      <div className="scroll-indicator" ref={arrowRef}>
        <ChevronDown size={32} strokeWidth={1.5} />
      </div>
    </section>
  );
}
