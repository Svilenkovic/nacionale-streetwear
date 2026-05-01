"use client";

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Preloader from '@/components/animations/Preloader';
import ScrollExperience from '@/components/3d/ScrollExperience';
import TextReveal from '@/components/animations/TextReveal';
import Button from '@/components/ui/Button';
import { sceneScrollProxy } from '@/lib/scrollProxy';
import { mockProducts } from '@/lib/mockData';
import { useCart } from '@/hooks/useCart';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const addItem = useCart(state => state.addItem);

  useGSAP(() => {
    if (!containerRef.current) return;

    const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduced) {
      gsap.fromTo(sceneScrollProxy,
        { introScale: 0 },
        { introScale: 1, duration: 3.5, ease: 'elastic.out(1, 0.7)', delay: 1.5 }
      );
    } else {
      gsap.set(sceneScrollProxy, { introScale: 1 });
    }

    gsap.to(sceneScrollProxy, {
      progress: 1,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });

    gsap.utils.toArray('.product-image-container').forEach((container: any, i: number) => {
      const img = container.querySelector('.product-image');
      if (!img) return;

      const isEven = i % 2 === 0;
      const xOffset = isEven ? 150 : -150;

      gsap.fromTo(img,
        {
          borderRadius: "50%",
          scale: 0.6,
          x: xOffset,
          opacity: 0.5
        },
        {
          borderRadius: "16px",
          scale: 1,
          x: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.parentElement,
            start: "top 75%",
            end: "center 50%",
            scrub: true,
          }
        }
      );
    });

    gsap.utils.toArray('.reveal-up').forEach((elem: any) => {
      gsap.fromTo(elem,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: {
            trigger: elem,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, { scope: containerRef });

  const handleAdd = (p: typeof mockProducts[0]) => {
      let size = "L", color = "#000";
      try { size = JSON.parse(p.sizes)[0]; color = JSON.parse(p.colors)[0]; } catch(e){}
      addItem(p as any, size, color, 1);
  };

  return (
    <>
      <Preloader />
      <ScrollExperience />

      <div ref={containerRef} className="relative z-10 w-full flex flex-col items-center">

        {/* PAGE 1: HERO */}
        <section className="scroll-section w-full h-[100svh] flex flex-col items-center justify-center text-center px-4 sm:px-6 pointer-events-none mix-blend-difference mb-32 relative">
           <TextReveal
            elementType="h1"
            text="OBELISK"
            className="text-[clamp(2.75rem,16vw,12rem)] font-heading font-bold text-white tracking-[0.08em] sm:tracking-[0.1em] lg:tracking-[0.15em] uppercase leading-none mb-4"
           />
           <div className="reveal-up flex flex-col items-center">
             <span className="text-primary text-4xl mb-2 font-serif" aria-hidden="true">&ldquo;</span>
             <h2 className="text-white/90 text-sm sm:text-base md:text-2xl font-body font-light tracking-widest uppercase italic max-w-lg px-2">
                Geometrija svetla, tišina forme
             </h2>
           </div>
        </section>

        {/* PAGE 2: BRAND ESSENCE */}
        <section data-petlja="left" className="scroll-section w-full min-h-[80vh] max-w-screen-2xl mx-auto flex items-center justify-center md:justify-end px-4 sm:px-6 md:px-12 pointer-events-none mix-blend-plus-lighter mb-32 relative">
           <div className="max-w-3xl text-center md:text-right reveal-up">
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-heading font-light uppercase tracking-widest mb-8 md:mb-10 text-white leading-tight">
                  Oblikovan<br/><span className="italic text-primary font-serif normal-case opacity-90">Kroz svetlost</span>
              </h2>
              <p className="text-base md:text-2xl text-white/90 leading-relaxed font-light mx-auto md:ml-auto md:mr-0 mb-6">
                  Studijski koncept <strong className="text-primary font-heading tracking-widest uppercase">OBELISK</strong> spaja precizno typography sa
                  realtime WebGL render-om. Svaka sekcija je nezavisna scena u jednom kontinualnom kadru.
              </p>
              <p className="text-sm md:text-xl text-white/70 leading-relaxed font-light mx-auto md:ml-auto md:mr-0">
                  Naša namera nije da vam nešto prodamo — ovaj sajt je portfolio demonstracija.
                  Brand i artikli su izmišljeni; tehnika i taste su stvarni.
              </p>
           </div>
        </section>

        {/* PAGES 3+: PRODUCTS — VISUAL DEMO */}
        {mockProducts.map((product, i) => {
           const isEven = i % 2 === 0;
           const petljaPos = isEven ? 'left' : 'right';

           const sectionAlign = isEven
              ? 'justify-center md:justify-start'
              : 'justify-center md:justify-end';
           const cardTextAlign = isEven
              ? 'text-center md:text-left'
              : 'text-center md:text-right';
           const headerRowAlign = isEven
              ? 'justify-center md:justify-start'
              : 'justify-center md:justify-end';
           const paraAlign = isEven
              ? 'mx-auto md:mr-auto md:ml-0'
              : 'mx-auto md:ml-auto md:mr-0';
           const priceRowAlign = isEven
              ? 'justify-center md:justify-start'
              : 'justify-center md:justify-end';
           const priceTextAlign = isEven
              ? 'text-center md:text-left'
              : 'text-center md:text-right';

           return (
             <section key={product.id} data-petlja={petljaPos} className={`scroll-section w-full min-h-[90vh] max-w-screen-2xl mx-auto flex items-center ${sectionAlign} px-4 sm:px-6 md:px-12 relative mb-32 md:mb-48`}>

                <div className={`absolute top-1/2 -translate-y-1/2 ${isEven ? 'right-[-5vw]' : 'left-[-5vw]'} z-[-1] pointer-events-none opacity-[0.05] hidden md:block`} aria-hidden="true">
                     <h2 className="text-[15vw] font-heading font-bold whitespace-nowrap text-white tracking-widest reveal-up">{product.design_image}</h2>
                </div>

                <div className={`flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-10 md:gap-12 w-full ${isEven ? '' : 'lg:flex-row-reverse'} z-10 pointer-events-auto relative`}>

                    <div className="product-image-container w-full lg:w-1/2 flex items-center justify-center reveal-up z-20">
                       <img
                          src={product.image_url!}
                          alt={`${product.name} — vizuelni mock-up`}
                          loading="lazy"
                          decoding="async"
                          className="product-image w-full h-[42vh] sm:h-[52vh] md:h-[70vh] object-cover shadow-2xl glass border border-[#16264a] will-change-transform"
                       />
                    </div>

                    <div className={`product-card w-full lg:w-1/2 p-5 sm:p-8 md:p-12 glass rounded-2xl bg-[#0a1733]/90 backdrop-blur-3xl border border-[#16264a] shadow-2xl reveal-up ${cardTextAlign} relative z-30`}>
                       <div className={`flex items-center mb-5 md:mb-6 ${headerRowAlign}`}>
                           <span className="text-[10px] md:text-xs tracking-[0.3em] font-heading uppercase text-primary block">
                               Demo prikaz
                           </span>
                       </div>

                       <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-light uppercase tracking-widest mb-5 md:mb-6 text-white">
                           <a href={`/products/?slug=${product.slug}`} className="hover:text-primary transition-colors">{product.name}</a>
                       </h2>

                       <p className={`text-sm md:text-xl text-text-secondary mb-8 md:mb-10 font-light leading-relaxed max-w-md ${paraAlign}`}>
                           {product.description}
                       </p>

                       <div className={`flex flex-col sm:flex-row items-center sm:items-center gap-6 sm:gap-8 pt-6 border-t border-[#16264a] ${priceRowAlign}`}>
                           <div className={`${priceTextAlign} w-full sm:w-auto`}>
                              {product.discount_price && <span className="text-xs md:text-sm line-through text-text-secondary block mb-1">{product.price.toLocaleString('sr-RS')} RSD</span>}
                              <span className="font-heading text-2xl md:text-4xl font-medium text-white tracking-widest">{(product.discount_price ?? product.price).toLocaleString('sr-RS')} RSD</span>
                           </div>
                           <Button onClick={() => handleAdd(product)} variant="outline" className="text-xs px-6 sm:px-8 py-3 sm:py-4 border-primary text-primary hover:bg-primary hover:text-[#051024] pointer-events-auto w-full sm:w-auto">
                               Dodaj u demo korpu
                           </Button>
                       </div>
                    </div>
                </div>
             </section>
           );
        })}

        <div className="h-32 w-full flex items-center justify-center pointer-events-none opacity-50" aria-hidden="true">
            <span className="w-1 h-32 bg-gradient-to-b from-primary to-transparent block"></span>
        </div>

      </div>
    </>
  );
}
