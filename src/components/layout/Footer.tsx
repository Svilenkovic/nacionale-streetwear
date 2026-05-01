"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <footer className="bg-surface-light border-t border-white/5 pt-20 pb-10 relative z-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-heading font-bold text-2xl tracking-[0.2em] mb-6 uppercase">Obelisk</h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-md">
              Imersivni 3D e-commerce koncept — portfolio demonstracija scroll choreografije,
              real-time WebGL render-a i moderne typography. Brend i proizvodi su izmišljeni;
              ovo je showcase web razvoja, ne aktivna prodavnica.
            </p>
            <p className="text-xs text-text-secondary/80 leading-relaxed max-w-md">
              Dizajn, razvoj i 3D realizacija:&nbsp;
              <Link href="https://svilenkovic.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-hover transition-colors font-medium">
                Dimitrije Svilenković · svilenkovic.com
              </Link>
            </p>
          </div>

          <div className="col-span-1">
            <h4 className="font-heading text-sm text-text-primary font-bold tracking-widest mb-6 uppercase">Sajt</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-text-secondary hover:text-primary transition-colors text-sm font-medium relative group inline-block">
                  Početna
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-[70%]"></span>
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-text-secondary hover:text-primary transition-colors text-sm font-medium relative group inline-block">
                  Koncept
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-[70%]"></span>
                </Link>
              </li>
              <li>
                <Link href="/#quality" className="text-text-secondary hover:text-primary transition-colors text-sm font-medium relative group inline-block">
                  Kvalitet
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-[70%]"></span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-heading text-sm text-text-primary font-bold tracking-widest mb-6 uppercase">Pravno</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-text-secondary hover:text-primary transition-colors text-sm font-medium relative group inline-block">
                  Politika privatnosti
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-[70%]"></span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-text-secondary hover:text-primary transition-colors text-sm font-medium relative group inline-block">
                  Uslovi korišćenja
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-[70%]"></span>
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-text-secondary hover:text-primary transition-colors text-sm font-medium relative group inline-block">
                  Kolačići
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-[70%]"></span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-8 gap-4">
          <div className="text-center md:text-left">
            <p className="text-xs text-text-secondary tracking-wider font-heading uppercase">
              © {new Date().getFullYear()} OBELISK · DEMO PORTFOLIO
            </p>
            <p className="text-[10px] text-text-secondary/80 tracking-wider font-heading uppercase mt-2">
              Dizajn i razvoj —{" "}
              <Link
                href="https://svilenkovic.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                svilenkovic.com
              </Link>
            </p>
          </div>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Povratak na vrh stranice"
            className="text-xs font-heading font-medium uppercase tracking-widest text-text-secondary hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-2 py-1"
          >
            Povratak na vrh ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
