"use client";

import React from 'react';
import ScrollReveal from '../animations/ScrollReveal';

export default function BrandStory() {
  return (
    <section id="about" className="py-32 md:py-48 relative bg-surface overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1">
            <ScrollReveal animation="fade-up" delay={0}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold uppercase tracking-wider mb-8 text-primary leading-tight">
                Forma u<br/>punoj svetlosti
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.2}>
              <div className="space-y-6 text-text-secondary text-base md:text-lg leading-relaxed">
                <p>
                  OBELISK je studijski koncept — istraživanje kako 3D render, scroll choreografija i precizna typography zajedno
                  formiraju trajan utisak na web platformi.
                </p>
                <p>
                  Svaka sekcija je gradiva sama za sebe: rezervisan layout, mat tkanina kao tekstura,
                  ritmovi otkrivanja koji prate prirodan tempo čitanja. Bez kompromisa u performansama, bez kompromisa u dostupnosti.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.4} className="mt-12">
               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-16 border-t border-white/5 pt-8">
                  <div>
                      <span className="block font-heading text-4xl text-text-primary mb-1">100%</span>
                      <span className="text-xs tracking-widest uppercase text-primary font-heading font-medium">Realtime WebGL</span>
                  </div>
                  <div className="hidden sm:block w-[1px] h-12 bg-white/10" aria-hidden="true"></div>
                  <div>
                      <span className="block font-heading text-4xl text-text-primary mb-1">0</span>
                      <span className="text-xs tracking-widest uppercase text-primary font-heading font-medium">Externih biblioteka za UI</span>
                  </div>
               </div>
            </ScrollReveal>
          </div>

          <div className="order-1 lg:order-2">
            <ScrollReveal animation="clip-path" duration={1.5}>
              <div className="aspect-square md:aspect-[4/5] bg-surface-light rounded-2xl relative overflow-hidden glass p-8 flex items-center justify-center group">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.08)_0%,transparent_70%)] transition-opacity duration-700 group-hover:opacity-50"></div>

                 <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background/80 to-transparent"></div>

                 <div className="relative z-10 text-center space-y-4 max-w-sm mx-auto">
                     <span className="text-7xl lg:text-8xl text-primary font-heading opacity-50 block leading-none mb-4 -ml-4" aria-hidden="true">&ldquo;</span>
                     <p className="text-2xl md:text-3xl lg:text-4xl font-heading text-text-primary leading-tight font-medium">
                         Geometrija svetla.<br/><span className="text-text-secondary">Tišina forme.</span>
                     </p>
                 </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
