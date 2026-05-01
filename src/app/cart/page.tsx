"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Button from '@/components/ui/Button';

export default function CartPage() {
  const router = useRouter();
  const { items, getTotal, removeItem, updateQuantity, clearCart } = useCart();
  const total = getTotal();

  const [formData, setFormData] = useState({
      ime: '',
      telefon: '',
      adresa: '',
      grad: '',
      postanskiBroj: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleCheckout = (e: React.FormEvent) => {
      e.preventDefault();
      if(items.length === 0) return;
      setIsSubmitting(true);

      // Portfolio demo: ne šaljemo ništa serveru, ne čuvamo lične podatke.
      // Simuliramo obradu samo radi UI demonstracije.
      window.setTimeout(() => {
          clearCart();
          const demoId = Math.floor(100000 + Math.random() * 900000);
          router.push(`/order/?id=${demoId}&phone=${encodeURIComponent(formData.telefon)}`);
      }, 700);
  };

  if (items.length === 0) {
      return (
          <div className="min-h-screen pt-40 flex flex-col items-center text-center px-6 pb-20">
              <ScrollReveal animation="fade-up">
                  <h1 className="font-heading text-4xl md:text-5xl uppercase tracking-wider mb-6">Vaša demo korpa je prazna</h1>
                  <p className="text-text-secondary mb-10 max-w-md mx-auto">Dodajte par OBELISK komada da vidite kako radi vizuelni checkout. Ne brinite — ništa neće biti naručeno.</p>
                  <Button href="/" variant="primary" className="text-sm">Povratak na početnu</Button>
              </ScrollReveal>
          </div>
      );
  }

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6">
        <ScrollReveal animation="fade-up" className="mb-10 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-wider text-text-primary">
             Vaša demo korpa
          </h1>
          <p className="mt-4 text-sm uppercase tracking-widest text-primary font-heading">
             Demo režim — kupovina nije aktivna, podaci se ne šalju serveru
          </p>
        </ScrollReveal>

        <div className="flex flex-col xl:flex-row gap-12 xl:gap-20">
           <div className="w-full xl:w-3/5">
              <ScrollReveal animation="fade-up" delay={0.1}>
                 <div className="hidden border-b border-white/10 pb-4 mb-6 md:grid grid-cols-12 gap-4 text-xs font-heading tracking-widest uppercase text-text-secondary font-bold">
                    <div className="col-span-6">Proizvod</div>
                    <div className="col-span-2 text-center">Cena</div>
                    <div className="col-span-2 text-center">Količina</div>
                    <div className="col-span-2 text-right">Ukupno</div>
                 </div>

                 <div className="flex flex-col gap-6">
                    {items.map((item) => {
                       const price = item.product.discount_price ?? item.product.price;
                       const itemTotal = price * item.quantity;
                       return (
                           <div key={`${item.product.id}-${item.size}-${item.color}`} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-white/5 pb-6">
                               <div className="col-span-1 md:col-span-6 flex items-center gap-6">
                                   <div className="w-20 h-24 bg-surface-light rounded-md flex-shrink-0 flex items-center justify-center relative overflow-hidden group" aria-hidden="true">
                                       <span className="font-heading text-[8px] text-text-secondary opacity-50 absolute rotate-[-45deg] scale-150 whitespace-nowrap">{item.product.name}</span>
                                       <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors"></div>
                                   </div>
                                   <div>
                                       <h2 className="font-heading text-lg text-text-primary uppercase tracking-wide mb-1">
                                            <a href={`/products/?slug=${item.product.slug}`} className="hover:text-primary transition-colors">{item.product.name}</a>
                                       </h2>
                                       <div className="text-text-secondary text-xs flex flex-wrap gap-4 uppercase tracking-widest font-heading mt-2">
                                           <span>Vel: {item.size}</span>
                                           <div className="flex items-center gap-2">
                                              Boja: <span className="w-3 h-3 rounded-full inline-block border border-white/20" style={{backgroundColor: item.color}} aria-label={`boja ${item.color}`}></span>
                                           </div>
                                       </div>
                                       <button type="button" onClick={() => removeItem(item.product.id, item.size, item.color)} className="text-xs text-primary underline underline-offset-4 mt-3 hover:text-primary-hover transition-colors md:hidden uppercase tracking-widest font-heading">Ukloni</button>
                                   </div>
                               </div>

                               <div className="col-span-1 md:col-span-2 md:text-center text-text-secondary">
                                   <span className="md:hidden text-xs uppercase tracking-widest mr-2 font-heading">Cena:</span>
                                   {price.toLocaleString('sr-RS')} RSD
                               </div>

                               <div className="col-span-1 md:col-span-2 flex items-center md:justify-center gap-3" role="group" aria-label={`Količina za ${item.product.name}`}>
                                   <button type="button" aria-label="Smanji količinu" onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">−</button>
                                   <span className="w-6 text-center text-sm font-heading" aria-live="polite">{item.quantity}</span>
                                   <button type="button" aria-label="Povećaj količinu" onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center border border-white/10 text-white/50 hover:text-white hover:border-white/30 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">+</button>
                               </div>

                               <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center">
                                   <span className="font-heading text-primary font-medium">{itemTotal.toLocaleString('sr-RS')} RSD</span>
                                   <button type="button" onClick={() => removeItem(item.product.id, item.size, item.color)} className="hidden md:block w-8 h-8 group ml-4" title="Ukloni" aria-label={`Ukloni ${item.product.name} iz korpe`}>
                                       <svg className="w-5 h-5 text-text-secondary group-hover:text-red-500 transition-colors mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                       </svg>
                                   </button>
                               </div>
                           </div>
                       );
                    })}
                 </div>
              </ScrollReveal>
           </div>

           <div className="w-full xl:w-2/5">
              <ScrollReveal animation="fade-up" delay={0.2}>
                  <div className="glass p-6 md:p-8 rounded-2xl sticky top-32">
                      <h2 className="font-heading text-xl uppercase tracking-widest text-text-primary mb-2 font-bold">Pregled (Demo)</h2>
                      <p className="text-xs text-text-secondary mb-6 leading-relaxed">
                        Ovo je portfolio sajt. Forma ne šalje podatke serveru, neće biti porudžbine ni kontakta.
                        Polja možete ostaviti prazna ili upisati &quot;test&quot;.
                      </p>

                      <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/10">
                          <span className="text-text-secondary uppercase tracking-widest text-xs font-bold font-heading">Ukupno (demo)</span>
                          <span className="font-heading text-3xl text-primary font-medium">{total.toLocaleString('sr-RS')} RSD</span>
                      </div>

                      <form onSubmit={handleCheckout} className="space-y-5" noValidate>
                          <div>
                              <label htmlFor="cart-ime" className="block text-xs uppercase tracking-widest text-text-secondary mb-2 font-heading">Ime i Prezime</label>
                              <input id="cart-ime" name="ime" autoComplete="name" value={formData.ime} onChange={handleChange} className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-white" />
                          </div>
                          <div>
                              <label htmlFor="cart-telefon" className="block text-xs uppercase tracking-widest text-text-secondary mb-2 font-heading">Telefon</label>
                              <input id="cart-telefon" type="tel" name="telefon" autoComplete="tel" value={formData.telefon} onChange={handleChange} className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-white" />
                          </div>
                          <div>
                              <label htmlFor="cart-adresa" className="block text-xs uppercase tracking-widest text-text-secondary mb-2 font-heading">Ulica i Broj</label>
                              <input id="cart-adresa" name="adresa" autoComplete="street-address" value={formData.adresa} onChange={handleChange} className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-white" />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                  <label htmlFor="cart-grad" className="block text-xs uppercase tracking-widest text-text-secondary mb-2 font-heading">Grad</label>
                                  <input id="cart-grad" name="grad" autoComplete="address-level2" value={formData.grad} onChange={handleChange} className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-white" />
                              </div>
                              <div>
                                  <label htmlFor="cart-zip" className="block text-xs uppercase tracking-widest text-text-secondary mb-2 font-heading">Poštanski broj</label>
                                  <input id="cart-zip" name="postanskiBroj" autoComplete="postal-code" inputMode="numeric" value={formData.postanskiBroj} onChange={handleChange} className="w-full bg-background/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors text-white" />
                              </div>
                          </div>

                          <Button type="submit" variant="primary" className="w-full mt-4 text-sm" disabled={isSubmitting}>
                              {isSubmitting ? 'OBRADA...' : 'POTVRDI (DEMO)'}
                          </Button>
                          <p className="text-[10px] text-text-secondary/70 text-center uppercase tracking-widest font-heading">
                            Klikom potvrđujete da znate da je sajt portfolio demo
                          </p>
                      </form>
                  </div>
              </ScrollReveal>
           </div>
        </div>
      </div>
    </div>
  );
}
