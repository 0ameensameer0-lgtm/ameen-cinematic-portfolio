"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Billboard,
  Float,
  Html,
  Line,
  OrbitControls,
  PerspectiveCamera,
  Points,
  PointMaterial,
  Sparkles,
  useTexture,
} from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function NetworkField() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => {
        const angle = (index / 18) * Math.PI * 2;
        const radius = 2.6 + (index % 3) * 0.55;
        return new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.sin(angle * 1.6) * 1.4,
          Math.sin(angle) * 1.2,
        );
      }),
    [],
  );

  const points = useMemo(() => {
    const random = new Float32Array(600);
    for (let index = 0; index < random.length; index += 3) {
      random[index] = (Math.random() - 0.5) * 12;
      random[index + 1] = (Math.random() - 0.5) * 7;
      random[index + 2] = (Math.random() - 0.5) * 8;
    }
    return random;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, index) => {
        const next = nodes[(index + 1) % nodes.length];
        return (
          <group key={index}>
            <mesh position={node}>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshBasicMaterial color={index % 2 === 0 ? "#4dd8ff" : "#a259ff"} />
            </mesh>
            <Line
              points={[node, next]}
              color={index % 2 === 0 ? "#4dd8ff" : "#89a7ff"}
              transparent
              opacity={0.3}
              lineWidth={1}
            />
          </group>
        );
      })}

      <Points positions={points} stride={3}>
        <PointMaterial transparent size={0.03} color="#7af2ff" sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  );
}

function PortraitNode() {
  const texture = useTexture("/ameen-cutout.png");
  const haloTexture = useTexture("/ameen-cinematic.png");
  const portraitGroup = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const backdropRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (portraitGroup.current) {
      portraitGroup.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.12;
      portraitGroup.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.18;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -state.clock.elapsedTime * 0.3;
    }
    if (backdropRef.current) {
      backdropRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={portraitGroup}>
      <mesh ref={backdropRef} position={[0, 0.1, -0.55]}>
        <circleGeometry args={[1.68, 64]} />
        <meshBasicMaterial transparent opacity={0.32} map={haloTexture} />
      </mesh>

      <mesh ref={ringRef} position={[0, 0, -0.18]}>
        <torusGeometry args={[1.95, 0.03, 24, 100]} />
        <meshStandardMaterial color="#4dd8ff" emissive="#4dd8ff" emissiveIntensity={0.8} />
      </mesh>

      <mesh ref={innerRingRef} position={[0, 0, -0.12]}>
        <torusGeometry args={[1.55, 0.04, 24, 100]} />
        <meshStandardMaterial color="#a259ff" emissive="#a259ff" emissiveIntensity={0.65} />
      </mesh>

      <Float speed={2.2} rotationIntensity={0.16} floatIntensity={0.4}>
        <Billboard position={[0, -0.2, 0.1]} follow lockX={false} lockY={false} lockZ={false}>
          <mesh>
            <planeGeometry args={[2.45, 4.2]} />
            <meshBasicMaterial transparent map={texture} toneMapped={false} />
          </mesh>
        </Billboard>
      </Float>

      <Html position={[0, -1.8, 0.5]} center>
        <div className="pointer-events-none rounded-full border border-white/10 bg-black/35 px-4 py-2 text-[10px] uppercase tracking-[0.35em] text-cyan-200/80 backdrop-blur-md">
          Access Node: Ameen
        </div>
      </Html>
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas dpr={[1, 1.8]}>
      <PerspectiveCamera makeDefault position={[0, 0.2, 6.8]} fov={42} />
      <color attach="background" args={["#030915"]} />
      <fog attach="fog" args={["#030915", 5, 15]} />
      <ambientLight intensity={1.25} />
      <pointLight position={[3, 4, 3]} color="#4dd8ff" intensity={17} distance={20} />
      <pointLight position={[-4, 2, 2]} color="#a259ff" intensity={9} distance={18} />
      <spotLight position={[0, 6, 6]} angle={0.4} penumbra={0.8} intensity={20} color="#ffffff" />
      <NetworkField />
      <PortraitNode />
      <Sparkles
        count={120}
        speed={0.45}
        size={2.2}
        opacity={0.55}
        scale={[10, 7, 8]}
        color="#86ecff"
      />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.18} />
    </Canvas>
  );
}
