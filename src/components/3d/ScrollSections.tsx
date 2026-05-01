"use client";

import React from 'react';
import { Scroll } from '@react-three/drei';
import TextReveal from '../animations/TextReveal';
import Button from '../ui/Button';
import { useCart } from '@/hooks/useCart';

const inlineProducts = [
  {
    id: 101, name: "OBELISK Aether", slug: "obelisk-aether", price: 8500, description: "Mat crna sa gradijentom u dubini. Forma koja apsorbuje svetlost i pretvara je u tišinu.",
    discount_price: null, sizes: '["S", "L"]', colors: '["#111111"]', is_featured: 1, stock_status: "in_stock", design_image: "AETHER"
  },
  {
    id: 103, name: "OBELISK Aurora", slug: "obelisk-aurora", price: 11000, discount_price: 9500, description: "Zlatni preplet, robustna tekstura. Limitirani komad iz primarne edicije.",
    sizes: '["M", "L"]', colors: '["#c9a84c"]', is_featured: 1, stock_status: "in_stock", design_image: "AURORA"
  },
  {
    id: 105, name: "OBELISK Solstice", slug: "obelisk-solstice", price: 9000, description: "Maslinasti podtonovi. Lagani organski pamuk za prelazne dnevne trenutke.",
    discount_price: null, sizes: '["M", "L", "XL"]', colors: '["#4a503d"]', is_featured: 1, stock_status: "in_stock", design_image: "SOLSTICE"
  }
];

export default function ScrollSections() {
  const addItem = useCart(state => state.addItem);

  const handleAdd = (p: typeof inlineProducts[0]) => {
      let size = "L", color = "#000";
      try { size = JSON.parse(p.sizes)[0]; color = JSON.parse(p.colors)[0]; } catch(e){}
      addItem(p as any, size, color, 1);
  };

  return (
    <Scroll html style={{ width: '100vw' }}>

      {/* PAGE 1: HERO */}
      <section className="w-full h-screen flex flex-col items-center justify-center pointer-events-none text-center px-6 relative">
        <TextReveal
          elementType="h1"
          text="OBELISK"
          className="text-6xl md:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-heading font-bold text-white tracking-[0.1em] lg:tracking-[0.15em] uppercase leading-none mb-6 mix-blend-difference"
        />
        <h2 className="text-primary text-xl md:text-3xl font-heading tracking-widest uppercase mb-4 opacity-0 animate-[fadeIn_2s_ease_1s_forwards]">
            geometrija svetla
        </h2>
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 opacity-0 animate-[fadeIn_2s_ease_2s_forwards] mix-blend-difference">
            <span className="text-[10px] uppercase tracking-widest text-white font-heading px-6 py-3 border border-white/20 rounded-full">↓ Skroluj ↓</span>
        </div>
      </section>

      {/* PAGE 2: BRAND ESSENCE */}
      <section className="w-full h-screen flex items-center justify-end pointer-events-none px-6 md:px-32 relative overflow-hidden">
         <div className="max-w-2xl pointer-events-auto text-right mix-blend-plus-lighter z-10 w-full sm:w-auto">
            <h2 className="text-5xl md:text-7xl font-heading font-light uppercase tracking-widest mb-10 text-white leading-tight">
                Oblikovan<br/><span className="italic text-primary font-serif normal-case opacity-90">Kroz svetlost</span>
            </h2>
            <p className="text-lg md:text-2xl text-white/80 leading-relaxed mb-12 font-light ml-auto">
                Teget-zlatna paleta odražava dubinu noći i sjaj svitanja. Bezvremenske forme, bez praćenja sezone.
            </p>
         </div>
      </section>

      {/* PAGES 3, 4, 5: MOCK PRODUCTS INLINE */}
      {inlineProducts.map((product, i) => {
         const isEven = i % 2 === 0;
         return (
         <section key={product.id} className={`w-full h-screen flex items-center ${isEven ? 'justify-start' : 'justify-end'} pointer-events-none px-6 md:px-32 relative overflow-hidden`}>
            <div className={`max-w-2xl pointer-events-auto z-10 glass p-8 md:p-12 rounded-2xl bg-[#0a1733]/50 backdrop-blur-xl border border-[#16264a] shadow-2xl transition-all duration-500 hover:bg-[#0a1733]/80 ${isEven ? 'text-left' : 'text-right'}`}>
               <div className={`flex items-center mb-6 ${isEven ? 'justify-start gap-4' : 'justify-end gap-4 flex-row-reverse'}`}>
                   <span className="text-xs tracking-[0.3em] font-heading uppercase text-primary block">
                       Demo prikaz
                   </span>
                   <span className="font-heading text-text-secondary/50 text-sm tracking-widest">
                       {i+1} / 3
                   </span>
               </div>

               <h2 className="text-5xl md:text-7xl font-heading font-light uppercase tracking-widest mb-6 text-white">
                   <a href={`/products/?slug=${product.slug}`} className="hover:text-primary transition-colors">{product.name}</a>
               </h2>

               <p className={`text-base md:text-xl text-text-secondary mb-10 font-light leading-relaxed max-w-lg ${isEven ? 'mr-auto' : 'ml-auto'}`}>
                   {product.description}
               </p>

               <div className={`flex flex-col xl:flex-row items-end xl:items-center gap-8 pt-6 border-t border-[#16264a] ${isEven ? 'justify-start' : 'justify-end'}`}>
                   <div className={`${isEven ? 'text-left xl:text-left' : 'text-right xl:text-right'} w-full xl:w-auto`}>
                      {product.discount_price && <span className="text-sm line-through text-text-secondary block mb-1">{product.price.toLocaleString('sr-RS')} RSD</span>}
                      <span className="font-heading text-3xl md:text-4xl font-medium text-white tracking-widest">{(product.discount_price ?? product.price).toLocaleString('sr-RS')} RSD</span>
                   </div>
                   <Button onClick={() => handleAdd(product)} variant="outline" className={`text-xs px-8 py-4 border-primary text-primary hover:bg-primary hover:text-[#051024] pointer-events-auto w-full xl:w-auto ${isEven ? 'ml-0' : 'mr-0'}`}>
                       Dodaj u demo korpu
                   </Button>
               </div>
            </div>

            <div className={`absolute inset-y-0 ${isEven ? 'right-[-5vw]' : 'left-[-5vw]'} flex items-center justify-center z-[-1] pointer-events-none opacity-[0.03]`} aria-hidden="true">
                 <h3 className="text-[20vw] font-heading font-bold whitespace-nowrap text-white md:rotate-0 tracking-widest">{product.design_image}</h3>
            </div>
         </section>
      )})}

    </Scroll>
  );
}
