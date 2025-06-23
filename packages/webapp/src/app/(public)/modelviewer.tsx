"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import React, { useRef } from "react";

function Model() {
  const gltf = useGLTF("models/daily-walk.glb");
  return <primitive object={gltf.scene} scale={1} />;
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
      <Model />
      <ControlsLogger />
    </Canvas>
  );
}
