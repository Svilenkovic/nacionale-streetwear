"use client";

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { sceneScrollProxy } from '@/lib/scrollProxy';

interface Props {
  lowDetail?: boolean;
}

export default function GarmentModel({ lowDetail = false }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);
  const viewportWidth = useThree((state) => state.viewport.width);

  useFrame((state) => {
    if (!meshRef.current) return;

    const r1 = sceneScrollProxy.progress;
    const time = state.clock.elapsedTime;

    // Razdvojeni faktori: meshScale drži petlju vidljivom (min 0.6 na mobile),
    // motionScale ograničava amplitudu sin-talasa da nikad ne pređe pola širine ekrana.
    // Camera fov 45 @ z=8 → viewport.width ~3 na mobile portrait, ~16 na desktop.
    const meshScaleFactor = Math.min(1, Math.max(0.6, viewportWidth / 5));
    const motionScaleFactor = Math.min(1, Math.max(0.25, viewportWidth / 12));

    const amplitude = Math.min(r1 * 10, 1) * 3 * motionScaleFactor;
    meshRef.current.position.x = Math.sin(r1 * Math.PI * 6) * -amplitude;

    const startZ = THREE.MathUtils.lerp(3, 0, Math.min(r1 * 5, 1));
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, startZ, 0.05);

    meshRef.current.position.y = THREE.MathUtils.lerp(0.5, -3.5, r1);

    const pulse = Math.abs(Math.sin(time * 0.5)) * 0.05;
    const baseScale = THREE.MathUtils.lerp(0.35, 0.49, Math.abs(Math.sin(r1 * Math.PI * 4)));
    const scale = (baseScale + pulse) * meshScaleFactor;
    meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.05);

    meshRef.current.rotation.y = r1 * Math.PI * 4 + Math.sin(time * 0.4) * 0.2;
    meshRef.current.rotation.x = r1 * Math.PI * 0.5 + Math.cos(time * 0.3) * 0.2;

    const material = meshRef.current.material as THREE.MeshPhysicalMaterial;
    if (r1 < 0.20) {
       material.color.lerp(new THREE.Color('#0a1733'), 0.05);
    } else if (r1 < 0.4) {
       material.color.lerp(new THREE.Color('#16264a'), 0.05);
    } else if (r1 < 0.7) {
       material.color.lerp(new THREE.Color('#c9a84c'), 0.05);
    } else {
       material.color.lerp(new THREE.Color('#111111'), 0.05);
    }

    material.metalness = THREE.MathUtils.lerp(0.4, 0.9, r1);
    material.roughness = THREE.MathUtils.lerp(0.6, 0.1, r1);
  });

  // Mobilna verzija: znatno manje tubularnih segmenata + radial; izgleda isto, 4-5x lakša.
  const tubularSegments = lowDetail ? 96 : 300;
  const radialSegments = lowDetail ? 24 : 80;

  return (
    <mesh ref={meshRef} castShadow={!lowDetail} receiveShadow={!lowDetail}>
      <torusKnotGeometry args={[1.5, 0.45, tubularSegments, radialSegments, 2, 5]} />
      <meshPhysicalMaterial
        color="#c9a84c"
        roughness={0.2}
        metalness={0.9}
        clearcoat={lowDetail ? 0.45 : 0.6}
        clearcoatRoughness={0.2}
        envMapIntensity={2.5}
      />
    </mesh>
  );
}
