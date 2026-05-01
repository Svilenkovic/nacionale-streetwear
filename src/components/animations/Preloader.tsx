"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !textRef.current) return;

    const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      gsap.set(containerRef.current, { display: 'none' });
      return;
    }

    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        gsap.set(containerRef.current, { display: 'none' });
      }
    });

    // paddingLeft animira zajedno sa letterSpacing da kompenzuje trailing spacing
    // (CSS letter-spacing dodaje prazno mesto i posle poslednjeg karaktera, što pomera
    // tekst u levo unutar text-center boxa; jednako padding-left vraća ga u centar.)
    tl.fromTo(textRef.current,
        { y: 120, opacity: 0, letterSpacing: '0.1em', paddingLeft: '0.1em' },
        { y: 0, opacity: 1, duration: 1.4, ease: 'power4.out' }
      )
      .to(textRef.current,
        { letterSpacing: '0.4em', paddingLeft: '0.4em', duration: 1.8, ease: 'power3.inOut' },
        '-=0.5'
      )
      .to(containerRef.current, { opacity: 0, duration: 1.2, ease: 'power2.inOut' }, '-=0.9');

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-50 grid place-items-center bg-[#051024] select-none pointer-events-none px-6"
    >
      <h1
        ref={textRef}
        className="font-heading text-[clamp(1.875rem,9vw,6rem)] md:text-7xl lg:text-8xl font-bold uppercase text-white text-center mix-blend-screen max-w-full"
      >
        OBELISK
      </h1>
    </div>
  );
}
