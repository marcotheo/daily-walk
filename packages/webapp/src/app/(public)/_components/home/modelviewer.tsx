"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { MathUtils } from "three";

function Model() {
  const gltf = useGLTF("models/daily-walk.glb");
  return <primitive object={gltf.scene} scale={1} />;
}

function ModelWrapper() {
  const groupRef = useRef<any>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!groupRef.current) return;

      // Normalize mouse position to [-0.5, 0.5]
      const mouseX = event.clientX / window.innerWidth - 0.5;
      const mouseY = event.clientY / window.innerHeight - 0.5;

      // Convert to rotation range
      const rotationY = MathUtils.clamp(
        mouseX * Math.PI,
        -Math.PI / 30,
        Math.PI / 30
      );
      const rotationX = MathUtils.clamp(
        mouseY * Math.PI * 0.2,
        -Math.PI / 60,
        Math.PI / 60
      );

      groupRef.current.rotation.y = rotationY;
      groupRef.current.rotation.x = rotationX;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <group ref={groupRef}>
      <Model />
    </group>
  );
}

function ControlsLogger() {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();

  return (
    <OrbitControls
      ref={controlsRef}
      onChange={() => {
        console.log("Camera position:", camera.position.toArray());
        console.log("Camera target:", controlsRef.current?.target.toArray());
      }}
      enableZoom={false}
      enableRotate={false}
    />
  );
}

export default function ModelViewer() {
  return (
    <Canvas
      className="absolute h-screen w-full"
      camera={{
        position: [
          0.3599565417799856, 0.34939783731927687, -1.6760651117441758,
        ],
        fov: 30,
      }}
    >
      <ambientLight intensity={2} />
      <directionalLight position={[2, 2, 2]} intensity={2} />
      <ModelWrapper />
      <ControlsLogger />
    </Canvas>
  );
}
