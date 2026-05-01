"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useScrollProgress } from '@/hooks/useScrollProgress';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'py-4 bg-background/80 backdrop-blur-md border-b border-white/5' : 'py-6 bg-transparent'
      }`}
    >
      <div className="absolute top-0 left-0 h-[2px] bg-primary origin-left z-50" style={{ width: `${scrollProgress * 100}%` }} aria-hidden="true" />

      <div className="container mx-auto px-6 h-full flex items-center justify-center relative z-50">
        <Link
          href="/"
          aria-label="OBELISK — početna"
          className="font-heading font-bold text-2xl tracking-[0.2em] uppercase z-50 relative pointer-events-auto"
        >
          Obelisk
        </Link>
      </div>
    </header>
  );
}
