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

    tl.fromTo(textRef.current, { y: 150, opacity: 0 }, { y: 0, opacity: 1, duration: 1.5, ease: 'power4.out' })
      .to(textRef.current, { letterSpacing: '0.4em', duration: 2, ease: 'power3.inOut' }, "-=0.5")
      .to(containerRef.current, { opacity: 0, duration: 1.5, ease: 'power2.inOut' }, "-=1");

  }, { scope: containerRef });

  return (
    <div ref={containerRef} aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center bg-[#051024] select-none pointer-events-none">
       <h1 ref={textRef} className="font-heading text-4xl md:text-6xl lg:text-8xl font-bold uppercase text-white tracking-widest text-center mix-blend-screen">
          OBELISK
       </h1>
    </div>
  );
}
