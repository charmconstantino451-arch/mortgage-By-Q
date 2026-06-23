'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function ModernHouse({ scrollProgress = 0, hoveredSection = null }) {
  const groupRef = useRef();
  const interiorLight1 = useRef();
  const interiorLight2 = useRef();
  const interiorLight3 = useRef();

  // Materials
  const concreteMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a1a1a',
    roughness: 0.88,
    metalness: 0.05,
  }), []);

  const darkConcreteMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0d0d0d',
    roughness: 0.92,
    metalness: 0.0,
  }), []);

  const metalMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#1a1a1a',
    roughness: 0.18,
    metalness: 0.92,
  }), []);

  const groundMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0a0a0a',
    roughness: 0.95,
    metalness: 0.0,
  }), []);

  const lightWoodMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#2a1f14',
    roughness: 0.75,
    metalness: 0.0,
  }), []);

  // Camera animation based on scroll progress
  useFrame(({ camera }) => {
    if (!groupRef.current) return;

    // Gentle ambient rotation
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      scrollProgress * Math.PI * 0.35 - 0.2,
      0.04
    );

    // Section-based camera positions
    let targetX, targetY, targetZ, targetLookY;

    if (scrollProgress < 0.12) {
      // Hero: centered front eye level
      targetX = 0; targetY = 1.6; targetZ = 18; targetLookY = 0.3;
    } else if (scrollProgress < 0.25) {
      // Metrics: zoom into glass panels
      targetX = 4; targetY = 1; targetZ = 12; targetLookY = 0.5;
    } else if (scrollProgress < 0.38) {
      // Broker edge: pull back wide
      targetX = 0; targetY = 6; targetZ = 32; targetLookY = 0;
    } else if (scrollProgress < 0.50) {
      // 3-step: front, slight overhead
      targetX = 0; targetY = 5; targetZ = 22; targetLookY = -1;
    } else if (scrollProgress < 0.63) {
      // Service matrix: side pan, reveal wing
      targetX = -14; targetY = 2; targetZ = 18; targetLookY = 0;
    } else if (scrollProgress < 0.76) {
      // Reviews: soft pan, night mode
      targetX = 8; targetY = 1; targetZ = 16; targetLookY = 0;
    } else {
      // FAQ: bird's eye
      targetX = 0; targetY = 26; targetZ = 14; targetLookY = 0;
    }

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.035);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.035);
    camera.lookAt(0, targetLookY, 0);

    // Night mode lights (reviews section)
    const nightProgress = scrollProgress > 0.63 && scrollProgress < 0.76
      ? (scrollProgress - 0.63) / 0.13
      : scrollProgress >= 0.76 ? 1 : 0;

    if (interiorLight1.current) {
      interiorLight1.current.intensity = 0.4 + nightProgress * 2.2;
    }
    if (interiorLight2.current) {
      interiorLight2.current.intensity = 0.3 + nightProgress * 1.8;
    }
    if (interiorLight3.current) {
      interiorLight3.current.intensity = 0.2 + nightProgress * 1.4;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      {/* Interior Lights — Champagne Gold */}
      <pointLight ref={interiorLight1} position={[-2, 1.5, 0]} color="#D4A843" intensity={0.5} distance={10} />
      <pointLight ref={interiorLight2} position={[3, 1.0, 1]} color="#F0C872" intensity={0.3} distance={8} />
      <pointLight ref={interiorLight3} position={[0, 2.5, -1]} color="#D4A843" intensity={0.2} distance={6} />

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.82, 0]} receiveShadow>
        <planeGeometry args={[80, 60]} />
        <primitive object={groundMat} attach="material" />
      </mesh>

      {/* ========================================
          MAIN VOLUME — Primary Concrete Body
          Width: 10, Height: 4, Depth: 6
      ======================================== */}
      <mesh position={[-2, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[10, 4, 6]} />
        <primitive object={concreteMat} attach="material" />
      </mesh>

      {/* Roof slab overhanging */}
      <mesh position={[-2, 2.15, 0]} castShadow>
        <boxGeometry args={[10.8, 0.2, 6.6]} />
        <primitive object={darkConcreteMat} attach="material" />
      </mesh>

      {/* ========================================
          GLASS WALL — Front Facade (Z+ face)
          Multiple stacked panes with metal frames
      ======================================== */}
      {/* Frame top horizontal */}
      <mesh position={[-2, 1.8, 3.1]}>
        <boxGeometry args={[10, 0.08, 0.06]} />
        <primitive object={metalMat} attach="material" />
      </mesh>
      {/* Frame mid horizontal */}
      <mesh position={[-2, 0, 3.1]}>
        <boxGeometry args={[10, 0.06, 0.06]} />
        <primitive object={metalMat} attach="material" />
      </mesh>
      {/* Frame bottom horizontal */}
      <mesh position={[-2, -1.8, 3.1]}>
        <boxGeometry args={[10, 0.08, 0.06]} />
        <primitive object={metalMat} attach="material" />
      </mesh>
      {/* Vertical frame dividers */}
      {[-5.5, -2.5, 0.5, 3.5].map((x, i) => (
        <mesh key={i} position={[x + 0.75, 0, 3.1]}>
          <boxGeometry args={[0.06, 4, 0.06]} />
          <primitive object={metalMat} attach="material" />
        </mesh>
      ))}

      {/* Glass Panes (upper and lower rows) */}
      {[-4.75, -1.75, 1.25, 4.25].map((x, i) => (
        <group key={i}>
          {/* Upper pane */}
          <mesh position={[x, 0.9, 3.08]}>
            <planeGeometry args={[2.4, 1.6]} />
            <MeshTransmissionMaterial
              color="#4a8fa8"
              transmission={0.92}
              thickness={0.5}
              roughness={0.02}
              metalness={0.1}
              chromaticAberration={0.03}
              anisotropicBlur={0.05}
              distortion={0.1}
              distortionScale={0.2}
              temporalDistortion={0.02}
              iridescence={0.3}
              iridescenceIOR={1.5}
              iridescenceThicknessRange={[0, 1400]}
              transparent
              opacity={0.7}
            />
          </mesh>
          {/* Lower pane */}
          <mesh position={[x, -0.9, 3.08]}>
            <planeGeometry args={[2.4, 1.6]} />
            <MeshTransmissionMaterial
              color="#4a8fa8"
              transmission={0.92}
              thickness={0.5}
              roughness={0.02}
              metalness={0.1}
              chromaticAberration={0.03}
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      ))}

      {/* ========================================
          SECONDARY WING — Right cantilevered volume
          Width: 5, Height: 2.5, Depth: 5
      ======================================== */}
      <mesh position={[7, -0.75, 0.5]} castShadow receiveShadow>
        <boxGeometry args={[5, 2.5, 5]} />
        <primitive object={concreteMat} attach="material" />
      </mesh>
      {/* Wing roof slab */}
      <mesh position={[7, 0.4, 0.5]}>
        <boxGeometry args={[5.5, 0.15, 5.5]} />
        <primitive object={darkConcreteMat} attach="material" />
      </mesh>
      {/* Wing glass front */}
      <mesh position={[7, -0.5, 3.08]}>
        <planeGeometry args={[4.5, 2]} />
        <MeshTransmissionMaterial
          color="#4a8fa8"
          transmission={0.88}
          thickness={0.4}
          roughness={0.04}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* ========================================
          BALCONY & DECK — Upper level with railing
      ======================================== */}
      {/* Balcony slab */}
      <mesh position={[-2, 1.95, 4.2]}>
        <boxGeometry args={[7, 0.12, 2.5]} />
        <primitive object={darkConcreteMat} attach="material" />
      </mesh>
      {/* Railing glass panels */}
      <mesh position={[-2, 2.45, 5.4]}>
        <planeGeometry args={[7, 0.9]} />
        <MeshTransmissionMaterial
          color="#4a8fa8"
          transmission={0.95}
          thickness={0.2}
          roughness={0.0}
          transparent
          opacity={0.4}
        />
      </mesh>
      {/* Railing metal top bar */}
      <mesh position={[-2, 2.92, 5.4]}>
        <boxGeometry args={[7, 0.05, 0.04]} />
        <primitive object={metalMat} attach="material" />
      </mesh>

      {/* ========================================
          ENTRANCE — Door frame, pathway, steps
      ======================================== */}
      {/* Front door frame */}
      <mesh position={[-2, -0.8, 3.12]}>
        <boxGeometry args={[1.6, 2.4, 0.08]} />
        <primitive object={lightWoodMat} attach="material" />
      </mesh>
      {/* Entrance canopy */}
      <mesh position={[-2, 0.4, 4.0]}>
        <boxGeometry args={[2.5, 0.1, 2.0]} />
        <primitive object={metalMat} attach="material" />
      </mesh>
      {/* Entry steps */}
      {[0, 0.15, 0.30].map((y, i) => (
        <mesh key={i} position={[-2, -1.7 + y, 3.4 + i * 0.3]}>
          <boxGeometry args={[1.6, 0.15, 0.32]} />
          <primitive object={darkConcreteMat} attach="material" />
        </mesh>
      ))}
      {/* Driveway path */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2, -1.80, 8]}>
        <planeGeometry args={[3, 12]} />
        <primitive object={darkConcreteMat} attach="material" />
      </mesh>

      {/* ========================================
          LANDSCAPING — Geometric hedges & trees
      ======================================== */}
      {/* Left hedge */}
      <mesh position={[-8.5, -1.2, 2]}>
        <boxGeometry args={[0.6, 1.2, 3]} />
        <meshStandardMaterial color="#0a1a0a" roughness={0.95} />
      </mesh>
      {/* Right hedge */}
      <mesh position={[4.5, -1.2, 6.5]}>
        <boxGeometry args={[3, 0.8, 0.6]} />
        <meshStandardMaterial color="#0a1a0a" roughness={0.95} />
      </mesh>
      {/* Geometric tree left */}
      <group position={[-10, -1, 1]}>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.08, 0.12, 1.0, 6]} />
          <meshStandardMaterial color="#1a1000" roughness={1} />
        </mesh>
        <mesh position={[0, 1.5, 0]}>
          <coneGeometry args={[0.6, 2, 6]} />
          <meshStandardMaterial color="#0d1a0d" roughness={0.95} />
        </mesh>
      </group>
      {/* Geometric tree right */}
      <group position={[11, -1, -1]}>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.08, 0.12, 1.0, 6]} />
          <meshStandardMaterial color="#1a1000" roughness={1} />
        </mesh>
        <mesh position={[0, 1.8, 0]}>
          <coneGeometry args={[0.7, 2.4, 6]} />
          <meshStandardMaterial color="#0d1a0d" roughness={0.95} />
        </mesh>
      </group>
    </group>
  );
}
