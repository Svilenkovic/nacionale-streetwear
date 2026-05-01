"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-surface-light border-t border-white/5 pt-16 pb-10 relative z-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <h3 className="font-heading font-bold text-2xl tracking-[0.2em] mb-6 uppercase">Obelisk</h3>
            <p className="text-text-secondary text-sm leading-relaxed max-w-md">
              Studijski koncept — istraživanje 3D render-a, scroll choreografije i precizne typography.
              Brand i artikli su izmišljeni; ovo je portfolio demonstracija, ne aktivna prodavnica.
            </p>
          </div>

          <div className="md:text-right">
            <h4 className="font-heading text-sm text-text-primary font-bold tracking-widest mb-6 uppercase">Pravno</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-text-secondary hover:text-primary transition-colors text-sm font-medium">
                  Politika privatnosti
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-text-secondary hover:text-primary transition-colors text-sm font-medium">
                  Uslovi korišćenja
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-text-secondary hover:text-primary transition-colors text-sm font-medium">
                  Kolačići
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-6 gap-2">
          <p className="text-xs text-text-secondary tracking-wider font-heading uppercase">
            © 2026 OBELISK · Demo portfolio
          </p>
          <p className="text-xs text-text-secondary tracking-wider font-heading uppercase">
            Dizajn i razvoj —{" "}
            <Link
              href="https://svilenkovic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              D. Svilenković
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
