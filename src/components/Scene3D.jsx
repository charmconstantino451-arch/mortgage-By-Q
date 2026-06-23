'use client';

import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';
import ModernHouse from './ModernHouse';

export default function Scene3D({ scrollProgress = 0 }) {
  const visible = scrollProgress >= 0.08;
  const opacity = visible ? Math.min(1, (scrollProgress - 0.08) * 15) : 0;

  return (
    <div 
      className="three-canvas-wrapper transition-opacity duration-300"
      style={{ 
        opacity,
        visibility: visible ? 'visible' : 'hidden'
      }}
    >
      <Canvas
        shadows
        camera={{ position: [12, 2, 20], fov: 42, near: 0.1, far: 200 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.85,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        {/* Scene Lighting */}
        <ambientLight intensity={0.12} color="#ffffff" />
        <directionalLight
          position={[20, 20, 10]}
          intensity={0.6}
          color="#e8d5b0"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={100}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        />
        <directionalLight position={[-10, 10, -10]} intensity={0.15} color="#4a6080" />

        {/* Night Sky Stars */}
        <Stars
          radius={80}
          depth={50}
          count={1200}
          factor={3}
          saturation={0}
          fade
          speed={0.3}
        />

        {/* Environment for IBL reflections */}
        <Environment preset="night" />

        {/* The procedural 3D modern house */}
        <ModernHouse scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
