"use client";

import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'obelisk_portfolio_badge_dismissed_v1';

export default function PortfolioBadge() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      const isDismissed = window.sessionStorage.getItem(STORAGE_KEY) === '1';
      setDismissed(isDismissed);
    } catch {
      setDismissed(false);
    }
  }, []);

  const dismiss = () => {
    try { window.sessionStorage.setItem(STORAGE_KEY, '1'); } catch {}
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-4 right-4 z-[55] flex items-center gap-3 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 backdrop-blur-md text-[10px] md:text-xs uppercase tracking-widest font-heading text-primary"
    >
      <span aria-hidden="true">●</span>
      <span>Portfolio Demo · nije aktivna prodavnica</span>
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
