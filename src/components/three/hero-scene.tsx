"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Line,
  OrbitControls,
  PerspectiveCamera,
  RoundedBox,
  Sparkles,
  useTexture,
} from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function TechGrid() {
  const groupRef = useRef<THREE.Group>(null);

  const links = useMemo(
    () =>
      [
        [new THREE.Vector3(-3, 1.55, -1.15), new THREE.Vector3(3, 1.55, -1.15)],
        [new THREE.Vector3(-3, 0.95, -1.1), new THREE.Vector3(3, 0.95, -1.1)],
        [new THREE.Vector3(-3, 0.35, -1.05), new THREE.Vector3(3, 0.35, -1.05)],
        [new THREE.Vector3(-3, -0.25, -1), new THREE.Vector3(3, -0.25, -1)],
        [new THREE.Vector3(-3, -0.85, -0.95), new THREE.Vector3(3, -0.85, -0.95)],
        [new THREE.Vector3(-3, -1.45, -0.9), new THREE.Vector3(3, -1.45, -0.9)],
        [new THREE.Vector3(-2.5, -2, -0.85), new THREE.Vector3(-2.5, 2, -0.85)],
        [new THREE.Vector3(-1.5, -2, -0.9), new THREE.Vector3(-1.5, 2, -0.9)],
        [new THREE.Vector3(-0.5, -2, -0.95), new THREE.Vector3(-0.5, 2, -0.95)],
        [new THREE.Vector3(0.5, -2, -1), new THREE.Vector3(0.5, 2, -1)],
        [new THREE.Vector3(1.5, -2, -1.05), new THREE.Vector3(1.5, 2, -1.05)],
        [new THREE.Vector3(2.5, -2, -1.1), new THREE.Vector3(2.5, 2, -1.1)],
      ] as const,
    [],
  );

  const points = useMemo(
    () =>
      [
        new THREE.Vector3(-2.5, 1.55, -0.75),
        new THREE.Vector3(-0.5, 1.55, -0.8),
        new THREE.Vector3(1.5, 1.55, -0.86),
        new THREE.Vector3(2.5, 0.95, -0.95),
        new THREE.Vector3(-2.5, 0.35, -0.9),
        new THREE.Vector3(-1.5, -0.25, -0.95),
        new THREE.Vector3(0.5, -0.85, -1),
        new THREE.Vector3(1.5, -1.45, -1.08),
      ] as const,
    [],
  );

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      {links.map((link, index) => (
        <Line
          key={index}
          points={link}
          color={index % 2 === 0 ? "#4dd8ff" : "#7eacff"}
          transparent
          opacity={0.26}
          lineWidth={1}
        />
      ))}

      {points.map((point, index) => (
        <mesh key={`point-${index}`} position={point}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshBasicMaterial
            color={index % 2 === 0 ? "#81edff" : "#9ec4ff"}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

function TechPanels() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.06;
    }
  });

  return (
    <group ref={groupRef}>
      {[
        { position: [-2.55, 1.2, -0.1] as const, color: "#153251" },
        { position: [2.55, 0.45, -0.15] as const, color: "#142d49" },
        { position: [-2.5, -0.85, -0.12] as const, color: "#12344a" },
      ].map((panel, index) => (
        <Float
          key={`panel-${index}`}
          speed={1.3 + index * 0.25}
          rotationIntensity={0.14}
          floatIntensity={0.3}
        >
          <group position={panel.position}>
            <RoundedBox args={[1.15, 0.78, 0.1]} radius={0.12} smoothness={8}>
              <meshStandardMaterial color={panel.color} metalness={0.22} roughness={0.42} />
            </RoundedBox>

            <mesh position={[0, 0.2, 0.06]}>
              <planeGeometry args={[0.82, 0.04]} />
              <meshBasicMaterial color="#4dd8ff" transparent opacity={0.78} />
            </mesh>

            <mesh position={[0, 0, 0.06]}>
              <planeGeometry args={[0.52, 0.03]} />
              <meshBasicMaterial color="#9ec4ff" transparent opacity={0.6} />
            </mesh>
          </group>
        </Float>
      ))}
    </group>
  );
}

function PortraitNode() {
  const texture = useTexture("/ameen-main.png");
  const portraitGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (portraitGroup.current) {
      portraitGroup.current.position.y = Math.sin(state.clock.elapsedTime * 1.15) * 0.06;
    }
  });

  return (
    <group ref={portraitGroup}>
      <RoundedBox args={[3.46, 3.46, 0.14]} radius={0.2} smoothness={8} position={[0, 0, -0.26]}>
        <meshStandardMaterial color="#0a1526" metalness={0.24} roughness={0.42} />
      </RoundedBox>

      <RoundedBox args={[3.22, 3.22, 0.04]} radius={0.17} smoothness={8} position={[0, 0, -0.14]}>
        <meshStandardMaterial color="#10233a" emissive="#175169" emissiveIntensity={0.22} />
      </RoundedBox>

      <mesh position={[0, 1.36, -0.08]}>
        <planeGeometry args={[2.62, 0.05]} />
        <meshBasicMaterial color="#4dd8ff" transparent opacity={0.8} />
      </mesh>

      <mesh position={[0, -1.36, -0.08]}>
        <planeGeometry args={[2.62, 0.05]} />
        <meshBasicMaterial color="#4dd8ff" transparent opacity={0.55} />
      </mesh>

      <Float speed={1.2} rotationIntensity={0.04} floatIntensity={0.12}>
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[2.92, 2.92]} />
          <meshBasicMaterial map={texture} toneMapped={false} side={THREE.DoubleSide} />
        </mesh>
      </Float>
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas dpr={[1, 1.8]}>
      <PerspectiveCamera makeDefault position={[0, 0.15, 6.5]} fov={40} />
      <color attach="background" args={["#030915"]} />
      <fog attach="fog" args={["#030915", 5.5, 14]} />
      <ambientLight intensity={1.2} />
      <pointLight position={[3, 4, 3]} color="#4dd8ff" intensity={14} distance={20} />
      <pointLight position={[-4, 2, 2]} color="#8da6ff" intensity={7} distance={18} />
      <spotLight position={[0, 6, 6]} angle={0.35} penumbra={0.8} intensity={16} color="#ffffff" />
      <TechGrid />
      <TechPanels />
      <PortraitNode />
      <Sparkles
        count={80}
        speed={0.4}
        size={2}
        opacity={0.45}
        scale={[8, 6, 8]}
        color="#86ecff"
      />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} autoRotate={false} />
    </Canvas>
  );
}
