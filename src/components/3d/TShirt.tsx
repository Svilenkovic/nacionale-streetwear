"use client";

import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, ContactShadows } from '@react-three/drei';

export default function TShirt({ color = '#000000', abstract = true }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const viewportWidth = useThree((state) => state.viewport.width);

  // Skala: desktop hero (~16 wide) → 1.0; mobile portrait (~3) → 0.6 min.
  // Float pokret se skalira proporcionalno da ne istisne mesh van vidljivog kadra.
  const scale = Math.min(1, Math.max(0.6, viewportWidth / 5));

  const texture = useMemo(() => {
    if (typeof document === 'undefined') return null; // SSR fallback
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    if (context) {
      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, 512, 512);
      for (let i = 0; i < 50000; i++) {
        context.fillStyle = `rgba(0,0,0,${Math.random() * 0.1})`;
        context.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(10, 10);
    tex.needsUpdate = true;
    return tex;
  }, []);

  useFrame((state) => {
    if (meshRef.current && abstract) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5 * scale} floatIntensity={0.8 * scale}>
      <mesh ref={meshRef} scale={scale} castShadow receiveShadow>
        {abstract ? (
          <torusKnotGeometry args={[1, 0.4, 128, 32, 2, 3]} />
        ) : (
          <cylinderGeometry args={[0.8, 0.8, 2.2, 64, 32, false]} />
        )}
        <meshStandardMaterial
          color={color}
          roughness={0.9}
          metalness={0.1}
          {...(texture && { bumpMap: texture, bumpScale: 0.005 })}
          envMapIntensity={1.2}
        />
      </mesh>
      <ContactShadows position={[0, -2 * scale, 0]} opacity={0.6} blur={2.5} scale={10 * scale} far={10} color="#000000" />
    </Float>
  );
}
