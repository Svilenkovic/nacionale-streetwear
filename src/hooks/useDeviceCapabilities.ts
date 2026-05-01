"use client";

import { useEffect, useState } from 'react';

export interface DeviceCapabilities {
  isMobile: boolean;
  isLowPower: boolean;
  reducedMotion: boolean;
  /** Cap za @react-three/fiber dpr prop. */
  dpr: [number, number];
  /** Skalar za particle/sparkle counts (0..1). */
  particleScale: number;
  /** Da li uopšte renderovati teške 3D scene. */
  enableHeavyScenes: boolean;
}

const DEFAULT: DeviceCapabilities = {
  isMobile: false,
  isLowPower: false,
  reducedMotion: false,
  dpr: [1, 2],
  particleScale: 1,
  enableHeavyScenes: true,
};

export function useDeviceCapabilities(): DeviceCapabilities {
  const [caps, setCaps] = useState<DeviceCapabilities>(DEFAULT);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mq = window.matchMedia('(max-width: 768px)');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const compute = (): DeviceCapabilities => {
      const isMobile = mq.matches;
      const reducedMotion = motion.matches;
      const cores = (typeof navigator !== 'undefined' && 'hardwareConcurrency' in navigator) ? navigator.hardwareConcurrency : 4;
      const memory = (typeof navigator !== 'undefined' && 'deviceMemory' in (navigator as any)) ? (navigator as any).deviceMemory : 8;
      const isLowPower = cores <= 4 || memory <= 4;

      const dpr: [number, number] = isMobile ? [1, 1.5] : isLowPower ? [1, 1.5] : [1, 2];

      let particleScale = 1;
      if (reducedMotion) particleScale = 0;
      else if (isMobile) particleScale = 0.25;
      else if (isLowPower) particleScale = 0.5;

      const enableHeavyScenes = !reducedMotion;

      return { isMobile, isLowPower, reducedMotion, dpr, particleScale, enableHeavyScenes };
    };

    setCaps(compute());

    const onChange = () => setCaps(compute());
    mq.addEventListener('change', onChange);
    motion.addEventListener('change', onChange);

    return () => {
      mq.removeEventListener('change', onChange);
      motion.removeEventListener('change', onChange);
    };
  }, []);

  return caps;
}
