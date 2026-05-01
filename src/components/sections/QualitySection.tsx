"use client";

import React, { useRef } from 'react';
import ScrollReveal from '../animations/ScrollReveal';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = ({ end, suffix = "", prefix = "" }: { end: number, suffix?: string, prefix?: string }) => {
    const counterRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        if(!counterRef.current) return;

        gsap.to(counterRef.current, {
            innerHTML: end,
            duration: 2.5,
            ease: "power2.out",
            snap: { innerHTML: 1 },
            scrollTrigger: {
                trigger: counterRef.current,
                start: "top 85%",
            }
        });
    }, { scope: counterRef });

    return <span className="font-heading text-5xl lg:text-6xl text-primary mb-4 block font-light tracking-tight">{prefix}<span ref={counterRef}>0</span>{suffix}</span>;
}

export default function QualitySection() {
  return (
    <section id="quality" className="py-32 md:py-48 relative bg-[#0a0a0a]">
       <div className="absolute inset-0 opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] mix-blend-overlay" aria-hidden="true"></div>
       <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-surface to-transparent" aria-hidden="true"></div>

       <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal animation="fade-up" className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
             <h2 className="text-3xl md:text-5xl font-heading font-bold uppercase tracking-wider mb-8 text-text-primary">
                Beskompromisni<br/><span className="text-primary italic font-normal normal-case">standard</span>
             </h2>
             <p className="text-text-secondary text-lg">Svaki detalj je pažljivo promišljen — od izbora typography weight-a do finalne post-processing nijanse. Performance budget je tvrd; pristupačnost (a11y) nije "kasnije", nego baza.</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
             <ScrollReveal animation="scale" delay={0}>
                <div className="glass hover:bg-white/[0.05] transition-colors duration-500 p-10 rounded-2xl h-full flex flex-col justify-center border border-white/5">
                    <AnimatedCounter end={90} suffix="+" />
                    <h3 className="font-heading font-bold text-lg uppercase tracking-widest mb-4">PSI cilj</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">Svi PageSpeed Insights stubovi (Performance, A11y, Best Practices, SEO) ciljaju 90+ na mobilnom i desktopu.</p>
                </div>
             </ScrollReveal>

             <ScrollReveal animation="scale" delay={0.15}>
                <div className="glass border-primary/30 bg-primary/[0.02] hover:bg-primary/[0.05] transition-colors duration-500 p-10 rounded-2xl h-full flex flex-col justify-center transform lg:-translate-y-8">
                    <AnimatedCounter end={100} suffix="%" />
                    <h3 className="font-heading font-bold text-lg uppercase tracking-widest mb-4 text-primary">In-house</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">Dizajn, 3D, frontend i deployment — sve u kući. Bez page builder-a, bez gotovih tema. Ručno tipovan TypeScript od HTML-a do nginx config-a.</p>
                </div>
             </ScrollReveal>

             <ScrollReveal animation="scale" delay={0.3}>
                <div className="glass hover:bg-white/[0.05] transition-colors duration-500 p-10 rounded-2xl h-full flex flex-col justify-center border border-white/5">
                    <AnimatedCounter end={0} suffix=" CLS" />
                    <h3 className="font-heading font-bold text-lg uppercase tracking-widest mb-4">Nula pomeranja</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">Cumulative Layout Shift u target zoni 0.0 — font fallback metrics, rezervisani slotovi, no shift na učitavanju.</p>
                </div>
             </ScrollReveal>
          </div>
       </div>
    </section>
  );
}
