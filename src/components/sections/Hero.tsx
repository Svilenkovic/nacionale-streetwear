"use client";

import React, { useRef } from 'react';
import HeroScene from '../3d/HeroScene';
import TextReveal from '../animations/TextReveal';
import Button from '../ui/Button';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll('.hero-fade');
    gsap.fromTo(elements,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, delay: 0.8, ease: 'power3.out' }
    );

    const scrollLine = containerRef.current.querySelector('.scroll-line-inner');
    if (scrollLine) {
       gsap.to(scrollLine, {
          yPercent: 200,
          duration: 1.5,
          repeat: -1,
          ease: "expo.inOut"
       });
    }

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-[100svh] flex items-center justify-center overflow-hidden pt-20">
      <HeroScene />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center mt-10 md:mt-20 pointer-events-none">
        <TextReveal
          elementType="h1"
          text="OBELISK"
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-heading font-bold text-text-primary tracking-[0.15em] lg:tracking-[0.2em] uppercase leading-none mb-6"
        />

        <p className="hero-fade text-text-secondary text-base md:text-xl max-w-2xl font-body mb-10 opacity-0 px-4">
          Imersivni 3D koncept za web. Forma, svetlost i scroll — sintetisani u jedan kontinualan kadar.
        </p>

        <div className="hero-fade opacity-0 pointer-events-auto">
            <Button href="/#about" variant="primary" className="text-sm">
              Istraži koncept
            </Button>
        </div>
      </div>

      <div className="hero-fade absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-0">
         <span className="text-[10px] font-heading tracking-widest uppercase text-text-secondary">Scroll</span>
         <div className="w-[1px] h-12 md:h-16 bg-white/10 relative overflow-hidden">
            <div className="scroll-line-inner absolute top-[-100%] left-0 w-full h-full bg-primary"></div>
         </div>
      </div>
    </section>
  );
}
