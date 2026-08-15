"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  Line,
  OrbitControls,
  PerspectiveCamera,
  RoundedBox,
  Sparkles,
  useTexture,
} from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useSite } from "@/components/providers/site-provider";

function TechGrid({ isLight }: { isLight: boolean }) {
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
          color={isLight ? (index % 2 === 0 ? "#76baff" : "#b8d7ff") : (index % 2 === 0 ? "#4dd8ff" : "#7eacff")}
          transparent
          opacity={0.26}
          lineWidth={1}
        />
      ))}

      {points.map((point, index) => (
        <mesh key={`point-${index}`} position={point}>
          <sphereGeometry args={[0.04, 12, 12]} />
          <meshBasicMaterial
            color={isLight ? "#5aaaff" : (index % 2 === 0 ? "#81edff" : "#9ec4ff")}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    camera.position.z = size.width < 640 ? 7.8 : 6.5;
    camera.updateProjectionMatrix();
  }, [camera, size.width]);

  return null;
}

function PortraitNode({ isLight }: { isLight: boolean }) {
  const texture = useTexture("/ameen-portrait-new.png");
  const portraitGroup = useRef<THREE.Group>(null);

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  useFrame((state) => {
    if (portraitGroup.current) {
      portraitGroup.current.position.y = Math.sin(state.clock.elapsedTime * 1.15) * 0.06;
      portraitGroup.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.35) * 0.012;
    }
  });

  return (
    <group ref={portraitGroup}>
      <mesh position={[0, 0, -0.24]}>
        <circleGeometry args={[1.7, 64]} />
        <meshStandardMaterial color={isLight ? "#eef6ff" : "#050c16"} metalness={0.18} roughness={0.45} />
      </mesh>

      <mesh position={[0, 0, -0.16]}>
        <torusGeometry args={[1.61, 0.026, 12, 80]} />
        <meshBasicMaterial color={isLight ? "#4da3ff" : "#52d7ff"} transparent opacity={0.95} />
      </mesh>

      <mesh position={[0, 0, -0.08]}>
        <torusGeometry args={[1.74, 0.012, 10, 80]} />
        <meshBasicMaterial color={isLight ? "#b6d9ff" : "#279bc6"} transparent opacity={0.72} />
      </mesh>

      <mesh position={[0, 0, -0.04]}>
        <circleGeometry args={[1.55, 64]} />
        <meshBasicMaterial color={isLight ? "#ffffff" : "#06101b"} />
      </mesh>

      <Float speed={1.2} rotationIntensity={0.04} floatIntensity={0.12}>
        <mesh position={[0, 0, 0.06]}>
          <circleGeometry args={[1.52, 64]} />
          <meshBasicMaterial
            map={texture}
            color="#ffffff"
            alphaTest={0.08}
            toneMapped={false}
            fog={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>
    </group>
  );
}

export function HeroScene() {
  const { theme } = useSite();
  const isLight = theme === "light";

  return (
    <Canvas dpr={[1, 1.8]}>
      <PerspectiveCamera makeDefault position={[0, 0.15, 6.5]} fov={40} />
      <ResponsiveCamera />
      <color attach="background" args={[isLight ? "#f7fbff" : "#03070d"]} />
      <fog attach="fog" args={[isLight ? "#f7fbff" : "#03070d", 5.5, 14]} />
      <ambientLight intensity={1.2} />
      <pointLight position={[3, 4, 3]} color="#4dd8ff" intensity={14} distance={20} />
      <pointLight position={[-4, 2, 2]} color="#8da6ff" intensity={7} distance={18} />
      <spotLight position={[0, 6, 6]} angle={0.35} penumbra={0.8} intensity={16} color="#ffffff" />
      <TechGrid isLight={isLight} />
      <PortraitNode isLight={isLight} />
      <Sparkles
        count={80}
        speed={0.4}
        size={2}
        opacity={0.45}
        scale={[8, 6, 8]}
        color={isLight ? "#8ac4ff" : "#86ecff"}
      />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} autoRotate={false} />
    </Canvas>
  );
}
