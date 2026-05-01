"use client";

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Sparkles, ContactShadows } from '@react-three/drei';
import GarmentModel from './GarmentModel';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';

export default function ScrollExperience() {
  const caps = useDeviceCapabilities();

  if (caps.reducedMotion) {
    return (
      <div className="fixed inset-0 w-full h-[100svh] bg-background -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.15)_0%,transparent_55%),linear-gradient(135deg,#051024_0%,#0a1733_100%)]" aria-hidden="true" />
      </div>
    );
  }

  const goldSparkles = Math.max(60, Math.floor(1500 * caps.particleScale));
  const whiteSparkles = Math.max(30, Math.floor(800 * caps.particleScale));

  return (
    <div className="fixed inset-0 w-full h-[100svh] bg-background -z-10 pointer-events-none">
      <Canvas
        shadows={!caps.isMobile}
        dpr={caps.dpr}
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: !caps.isMobile, powerPreference: 'high-performance' }}
        frameloop={caps.isLowPower ? 'demand' : 'always'}
      >
        <Suspense fallback={null}>
          <Environment preset="night" environmentIntensity={1.2} />
          <ambientLight intensity={1.4} color="#1b2c5a" />
          <hemisphereLight args={['#e0eaff', '#0a1733', 0.6]} />
          <directionalLight
            castShadow={!caps.isMobile}
            position={[10, 10, 5]}
            intensity={3}
            shadow-mapSize={caps.isMobile ? [512, 512] : [1024, 1024]}
            color="#e0eaff"
          />
          <directionalLight position={[-10, 5, -5]} intensity={1.8} color="#c9a84c" />
          <pointLight position={[0, 0, 6]} intensity={2} color="#d4b65a" distance={20} />
          <pointLight position={[0, -5, 0]} intensity={2} color="#16264a" />

          <GarmentModel lowDetail={caps.isMobile || caps.isLowPower} />

          <Sparkles count={goldSparkles} scale={25} size={3} speed={0.4} opacity={0.6} color="#c9a84c" noise={0.1} />
          <Sparkles count={whiteSparkles} scale={15} size={1.5} speed={0.6} opacity={0.8} color="#ffffff" noise={0.2} />
          {!caps.isMobile && (
            <ContactShadows position={[0, -3.0, 0]} opacity={0.8} scale={30} blur={4} far={10} color="#051024" />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
