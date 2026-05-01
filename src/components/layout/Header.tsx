"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useCart } from '@/hooks/useCart';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const cartBadgeRef = useRef<HTMLSpanElement>(null);
  const totalItems = useCart((state) => state.getTotalItems());
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (totalItems > 0 && cartBadgeRef.current) {
      gsap.fromTo(cartBadgeRef.current,
        { scale: 0.5, y: -10 },
        { scale: 1, y: 0, duration: 0.5, ease: 'bounce.out' }
      );
    }
  }, [totalItems]);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'py-4 bg-background/80 backdrop-blur-md border-b border-white/5' : 'py-6 bg-transparent'
        } ${isMobileMenuOpen ? '!bg-transparent !border-transparent delay-200' : ''}`}
      >
        <div className="absolute top-0 left-0 h-[2px] bg-primary origin-left z-50" style={{ width: `${scrollProgress * 100}%` }} aria-hidden="true" />

        <div className="container mx-auto px-6 h-full flex items-center justify-between relative z-50">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} aria-label="OBELISK — početna" className="font-heading font-bold text-2xl tracking-[0.2em] uppercase origin-left z-50 relative pointer-events-auto">
            Obelisk
          </Link>

          <nav className="hidden md:flex items-center gap-10" aria-label="Glavna navigacija">
            <Link href="/" className="text-sm font-heading font-medium tracking-widest hover:text-primary transition-colors relative group">
              POČETNA
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/#about" className="text-sm font-heading font-medium tracking-widest hover:text-primary transition-colors relative group">
              KONCEPT
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/#quality" className="text-sm font-heading font-medium tracking-widest hover:text-primary transition-colors relative group">
              KVALITET
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          <div className="flex items-center gap-6 z-50 relative pointer-events-auto">
            <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)} aria-label={`Korpa${totalItems > 0 ? ` (${totalItems} stavki)` : ''}`} className="relative group flex items-center gap-2">
              <span className="text-sm font-heading font-medium tracking-widest group-hover:text-primary transition-colors">KORPA</span>
              {totalItems > 0 && (
                <span
                  ref={cartBadgeRef}
                  className="absolute -top-3 -right-4 w-5 h-5 flex items-center justify-center bg-primary text-background text-[10px] font-bold rounded-full"
                  aria-hidden="true"
                >
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Zatvori meni" : "Otvori meni"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className={`w-6 h-[2px] bg-text-primary transition-all duration-300 origin-center ${isMobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
              <span className={`w-6 h-[2px] bg-text-primary transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-6 h-[2px] bg-text-primary transition-all duration-300 origin-center ${isMobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
