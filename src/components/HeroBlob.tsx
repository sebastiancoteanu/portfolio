'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Vector3, Color } from 'three';
import * as THREE from 'three';

// ── Animated Blob Mesh ──────────────────────────────────────────────────────
function MorphBlob() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const basePositions = useRef<Float32Array | null>(null);
  const clock = useRef(0);

  useEffect(() => {
    if (meshRef.current) {
      const geo = meshRef.current.geometry;
      basePositions.current = geo.attributes.position.array.slice() as Float32Array;
    }
  }, []);

  useFrame((_, delta) => {
    clock.current += delta;
    const mesh = meshRef.current;
    if (!mesh || !basePositions.current) return;

    const positions = mesh.geometry.attributes.position.array as Float32Array;
    const base = basePositions.current;
    const t = clock.current * 0.6;

    for (let i = 0; i < positions.length; i += 3) {
      const ox = base[i];
      const oy = base[i + 1];
      const oz = base[i + 2];

      // Smooth noise-like displacement
      const noise =
        Math.sin(ox * 2.5 + t) * Math.cos(oy * 2.5 + t * 0.7) * 0.15 +
        Math.sin(oz * 3.0 + t * 1.1) * Math.cos(ox * 1.8 + t * 0.5) * 0.1;

      const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
      const scale = 1 + noise;

      positions[i]     = (ox / len) * len * scale;
      positions[i + 1] = (oy / len) * len * scale;
      positions[i + 2] = (oz / len) * len * scale;
    }

    mesh.geometry.attributes.position.needsUpdate = true;
    mesh.geometry.computeVertexNormals();

    // Slow Y rotation
    mesh.rotation.y = t * 0.12;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.4, 4]} />
      <meshStandardMaterial
        color={new Color('#3b82f6')}
        emissive={new Color('#1d4ed8')}
        emissiveIntensity={0.3}
        roughness={0.3}
        metalness={0.5}
        wireframe={false}
      />
    </mesh>
  );
}

// ── Small floating accent orbs ──────────────────────────────────────────────
function FloatOrb({ offset, color, size }: { offset: Vector3; color: string; size: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  const clock = useRef(Math.random() * 10);

  useFrame((_, delta) => {
    clock.current += delta;
    const t = clock.current;
    ref.current.position.set(
      offset.x + Math.sin(t * 0.5 + offset.x) * 0.6,
      offset.y + Math.cos(t * 0.7 + offset.y) * 0.4,
      offset.z + Math.sin(t * 0.4 + offset.z) * 0.5
    );
  });

  return (
    <mesh ref={ref} position={offset}>
      <sphereGeometry args={[size, 12, 12]} />
      <meshStandardMaterial
        color={new Color(color)}
        emissive={new Color(color)}
        emissiveIntensity={0.6}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

// ── Scene wrapper ────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-3, -2, 3]} color="#8b5cf6" intensity={0.6} />

      <MorphBlob />
      <FloatOrb offset={new Vector3(2.2, 1.0, -0.5)} color="#8b5cf6" size={0.18} />
      <FloatOrb offset={new Vector3(-1.8, -1.2, 0.8)} color="#3b82f6" size={0.12} />
      <FloatOrb offset={new Vector3(0.5, 2.0, 1.2)} color="#f59e0b" size={0.1} />
    </>
  );
}

// ── Exported Canvas (lazy-loaded by the page) ───────────────────────────────
export default function HeroBlob() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      dpr={[1, 2]}
      frameloop="always"
    >
      <Scene />
    </Canvas>
  );
}
