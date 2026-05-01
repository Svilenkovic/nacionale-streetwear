"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'obelisk_cookie_consent_v1';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) {
        const t = window.setTimeout(() => setShow(true), 1200);
        return () => window.clearTimeout(t);
      }
    } catch {
      // localStorage može biti blokiran (privatni prozor); tiho ne prikaži banner
    }
  }, []);

  const accept = (level: 'all' | 'essential') => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ level, ts: Date.now() }));
    } catch {}
    setShow(false);
    if (level === 'all' && typeof window !== 'undefined') {
      window.dispatchEvent(new Event('obelisk-cookie-consent-all'));
    }
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Saglasnost za kolačiće"
      aria-live="polite"
      className="fixed bottom-3 left-3 right-3 sm:left-4 sm:right-4 md:right-auto md:max-w-md max-w-[calc(100vw-1.5rem)] z-[100] bg-surface border border-primary/30 rounded-xl p-4 sm:p-5 md:p-6 shadow-2xl backdrop-blur-xl box-border"
    >
      <h2 className="font-heading text-sm sm:text-base uppercase tracking-widest mb-2 sm:mb-3 text-text-primary">Kolačići</h2>
      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-3 sm:mb-4">
        Sajt koristi samo neophodne kolačiće za osnovnu funkcionalnost (npr. demo korpa).
        Analitika nije aktivna. Više detalja u{' '}
        <Link href="/privacy" className="text-primary hover:text-primary-hover underline underline-offset-4">Politici privatnosti</Link>{' '}
        i{' '}
        <Link href="/cookies" className="text-primary hover:text-primary-hover underline underline-offset-4">stranici Kolačići</Link>.
      </p>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => accept('essential')}
          className="flex-1 px-3 py-2.5 border border-white/20 text-[11px] sm:text-xs uppercase tracking-widest font-heading hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
        >
          Samo neophodni
        </button>
        <button
          type="button"
          onClick={() => accept('all')}
          className="flex-1 px-3 py-2.5 bg-primary text-background text-[11px] sm:text-xs uppercase tracking-widest font-bold font-heading hover:bg-primary-hover transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded"
        >
          Prihvati sve
        </button>
      </div>
    </div>
  );
}
