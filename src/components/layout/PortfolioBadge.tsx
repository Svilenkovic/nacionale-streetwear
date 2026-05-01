"use client";

import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'obelisk_portfolio_badge_dismissed_v1';
const AUTO_DISMISS_MS = 4500;
const FADE_MS = 600;

export default function PortfolioBadge() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let alreadyDismissed = false;
    try { alreadyDismissed = window.sessionStorage.getItem(STORAGE_KEY) === '1'; } catch {}
    if (alreadyDismissed) return;

    setMounted(true);
    const fadeIn = window.setTimeout(() => setVisible(true), 80);
    const startFadeOut = window.setTimeout(() => setVisible(false), AUTO_DISMISS_MS);
    const removeFromDom = window.setTimeout(() => {
      try { window.sessionStorage.setItem(STORAGE_KEY, '1'); } catch {}
      setMounted(false);
    }, AUTO_DISMISS_MS + FADE_MS);

    return () => {
      window.clearTimeout(fadeIn);
      window.clearTimeout(startFadeOut);
      window.clearTimeout(removeFromDom);
    };
  }, []);

  const dismiss = () => {
    try { window.sessionStorage.setItem(STORAGE_KEY, '1'); } catch {}
    setVisible(false);
    window.setTimeout(() => setMounted(false), FADE_MS);
  };

  if (!mounted) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-20 left-1/2 -translate-x-1/2 md:top-4 md:left-auto md:right-4 md:translate-x-0 z-[55] flex items-center gap-3 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 backdrop-blur-md text-[10px] md:text-xs uppercase tracking-widest font-heading text-primary transition-opacity duration-500 motion-reduce:transition-none ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <span aria-hidden="true">●</span>
      <span className="whitespace-nowrap">Portfolio Demo</span>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Sakrij portfolio obaveštenje"
        className="ml-1 -mr-1 w-5 h-5 flex items-center justify-center rounded-full hover:bg-primary/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  );
}
