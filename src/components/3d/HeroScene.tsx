"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Sparkles } from '@react-three/drei';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';

const TShirt = React.lazy(() => import('./TShirt'));

export default function HeroScene() {
  const caps = useDeviceCapabilities();

  if (caps.reducedMotion) {
    return (
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.18)_0%,transparent_60%),linear-gradient(180deg,#051024_0%,#0a1733_100%)]" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none" />
      </div>
    );
  }

  const sparkleCount = Math.max(20, Math.floor(150 * caps.particleScale));

  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas
        shadows={!caps.isMobile}
        dpr={caps.dpr}
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: !caps.isMobile, powerPreference: 'high-performance' }}
        frameloop={caps.isLowPower ? 'demand' : 'always'}
      >
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <directionalLight
            castShadow={!caps.isMobile}
            position={[10, 10, 5]}
            intensity={1.5}
            shadow-mapSize={caps.isMobile ? [512, 512] : [1024, 1024]}
          />
          <directionalLight position={[-10, 10, -5]} intensity={0.5} color="#c9a84c" />

          <TShirt abstract={true} color="#111111" />

          {sparkleCount > 0 && (
            <Sparkles count={sparkleCount} scale={12} size={2} speed={0.4} opacity={0.3} color="#c9a84c" />
          )}
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background pointer-events-none" />
    </div>
  );
}
