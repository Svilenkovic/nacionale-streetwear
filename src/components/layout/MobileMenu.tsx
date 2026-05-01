"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const links = [
  { name: 'POČETNA', href: '/' },
  { name: 'KONCEPT', href: '/#about' },
  { name: 'KVALITET', href: '/#quality' },
  { name: 'KORPA', href: '/cart' },
];

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    if (!containerRef.current || !bgRef.current) return;

    if (isOpen) {
      gsap.to(containerRef.current, {
        autoAlpha: 1,
        duration: 0.1,
      });

      gsap.to(bgRef.current, {
        clipPath: 'circle(150% at 100% 0%)',
        duration: 0.8,
        ease: 'power3.inOut',
      });

      gsap.fromTo(
        linksRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, duration: 0.6, delay: 0.3, ease: 'power3.out' }
      );
    } else {
      gsap.to(linksRef.current, {
        x: 50,
        opacity: 0,
        stagger: 0.05,
        duration: 0.4,
        ease: 'power3.in',
      });

      gsap.to(bgRef.current, {
        clipPath: 'circle(0% at 100% 0%)',
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.inOut',
        onComplete: () => {
             if(containerRef.current) gsap.set(containerRef.current, { autoAlpha: 0 });
        }
      });
    }
  }, [isOpen]);

  return (
    <div
      id="mobile-menu"
      ref={containerRef}
      className="fixed inset-0 z-40 invisible"
      aria-hidden={!isOpen}
    >
      <div
        ref={bgRef}
        className="absolute inset-0 bg-background/95 backdrop-blur-xl"
        style={{ clipPath: 'circle(0% at 100% 0%)' }}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8" aria-label="Mobilna navigacija">
          {links.map((link, i) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={onClose}
              ref={(el) => { if (el) linksRef.current[i] = el; }}
              className="text-3xl font-heading font-medium tracking-widest text-text-primary hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
