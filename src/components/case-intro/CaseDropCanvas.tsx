import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export type CasePhase =
  | 'sky'
  | 'falling'
  | 'impact'
  | 'charging'
  | 'unlocking'
  | 'opening'
  | 'revealed';

interface CaseDropCanvasProps {
  phase: CasePhase;
  unlockStep: number; // 0, 1, or 2
  impactPulse: number;
}

const CaseModel: React.FC<{ phase: CasePhase; unlockStep: number; impactPulse: number }> = ({
  phase,
  unlockStep,
  impactPulse,
}) => {
  const caseGroupRef = useRef<THREE.Group>(null);
  const lidGroupRef = useRef<THREE.Group>(null);
  const lockLeftRef = useRef<THREE.Mesh>(null);
  const lockRightRef = useRef<THREE.Mesh>(null);
  const coreLightRef = useRef<THREE.PointLight>(null);
  const beamRef = useRef<THREE.Mesh>(null);
  const shockwaveRef = useRef<THREE.Mesh>(null);
  const dustRef = useRef<THREE.Points>(null);

  const { camera } = useThree();
  const yPosRef = useRef(13);
  const velocityRef = useRef(0);
  const shockScaleRef = useRef(0.1);
  const shockOpacityRef = useRef(0);
  const dustTimeRef = useRef(0);
  const lastImpactRef = useRef(0);

  // Dust burst geometry
  const dustGeo = useMemo(() => {
    const count = 90;
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 0.6 + Math.random() * 0.9;
      positions[i * 3] = Math.cos(a) * r;
      positions[i * 3 + 1] = -0.55;
      positions[i * 3 + 2] = Math.sin(a) * r;

      const speed = 1.6 + Math.random() * 3.4;
      velocities[i * 3] = Math.cos(a) * speed;
      velocities[i * 3 + 1] = 0.6 + Math.random() * 2.2;
      velocities[i * 3 + 2] = Math.sin(a) * speed;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));
    return geo;
  }, []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;

    // Trigger shockwave & dust reset on impactPulse change
    if (impactPulse !== lastImpactRef.current && impactPulse > 0) {
      lastImpactRef.current = impactPulse;
      shockScaleRef.current = 0.25;
      shockOpacityRef.current = 0.95;
      dustTimeRef.current = 0.01;
    }

    // 1. Vertical drop physics
    if (caseGroupRef.current) {
      if (phase === 'sky') {
        yPosRef.current = 11.5;
        velocityRef.current = 0;
        caseGroupRef.current.position.y = yPosRef.current;
        caseGroupRef.current.rotation.set(0.35, -0.45 + Math.sin(t) * 0.08, 0.12);
      } else if (phase === 'falling') {
        velocityRef.current += 42 * dt;
        yPosRef.current = Math.max(-0.55, yPosRef.current - velocityRef.current * dt);
        caseGroupRef.current.position.y = yPosRef.current;
        caseGroupRef.current.rotation.x = THREE.MathUtils.lerp(caseGroupRef.current.rotation.x, 0.05, 8 * dt);
        caseGroupRef.current.rotation.y = THREE.MathUtils.lerp(caseGroupRef.current.rotation.y, 0, 6 * dt);
        caseGroupRef.current.rotation.z = THREE.MathUtils.lerp(caseGroupRef.current.rotation.z, 0, 8 * dt);
      } else {
        // Seated on metallic platform (or gently elevated when revealed)
        const targetY = phase === 'revealed' ? -1.45 : -0.55;
        yPosRef.current = THREE.MathUtils.lerp(yPosRef.current, targetY, 5 * dt);
        caseGroupRef.current.position.y = yPosRef.current;
        caseGroupRef.current.rotation.x = THREE.MathUtils.lerp(caseGroupRef.current.rotation.x, 0.08, 5 * dt);
        caseGroupRef.current.rotation.y = THREE.MathUtils.lerp(
          caseGroupRef.current.rotation.y,
          phase === 'revealed' ? Math.sin(t * 0.4) * 0.12 : Math.sin(t * 0.6) * 0.08,
          4 * dt
        );
        caseGroupRef.current.rotation.z = THREE.MathUtils.lerp(caseGroupRef.current.rotation.z, 0, 5 * dt);
      }
    }

    // 2. Camera shake & framing
    if (phase === 'impact') {
      const shakeAmp = 0.18;
      camera.position.x = (Math.random() - 0.5) * shakeAmp;
      camera.position.y = 1.45 + (Math.random() - 0.5) * shakeAmp;
      camera.position.z = 6.2;
    } else {
      const targetCamY = phase === 'revealed' ? 1.85 : 1.45;
      const targetCamZ = phase === 'revealed' ? 7.1 : 6.2;
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, 0, 5 * dt);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 3 * dt);
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 3 * dt);
    }
    camera.lookAt(0, phase === 'revealed' ? -0.3 : 0.15, 0);

    // 3. Sequential Locks Unlocking
    if (lockLeftRef.current) {
      const unlocked1 = unlockStep >= 1 || phase === 'opening' || phase === 'revealed';
      lockLeftRef.current.position.y = THREE.MathUtils.lerp(
        lockLeftRef.current.position.y,
        unlocked1 ? 0.34 : 0.08,
        9 * dt
      );
      lockLeftRef.current.rotation.x = THREE.MathUtils.lerp(
        lockLeftRef.current.rotation.x,
        unlocked1 ? -0.75 : 0,
        9 * dt
      );
    }
    if (lockRightRef.current) {
      const unlocked2 = unlockStep >= 2 || phase === 'opening' || phase === 'revealed';
      lockRightRef.current.position.y = THREE.MathUtils.lerp(
        lockRightRef.current.position.y,
        unlocked2 ? 0.34 : 0.08,
        9 * dt
      );
      lockRightRef.current.rotation.x = THREE.MathUtils.lerp(
        lockRightRef.current.rotation.x,
        unlocked2 ? -0.75 : 0,
        9 * dt
      );
    }

    // 4. Dramatic Lid Opening
    if (lidGroupRef.current) {
      const targetLidRot = phase === 'opening' || phase === 'revealed' ? -1.85 : 0;
      lidGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        lidGroupRef.current.rotation.x,
        targetLidRot,
        3.2 * dt
      );
    }

    // 5. Core Energy & Light Beam
    const isGlowing =
      phase === 'charging' || phase === 'unlocking' || phase === 'opening' || phase === 'revealed';
    const isOpen = phase === 'opening' || phase === 'revealed';

    if (coreLightRef.current) {
      const targetIntensity = isOpen ? 16 + Math.sin(t * 5) * 2.5 : isGlowing ? 5.5 : 0.6;
      coreLightRef.current.intensity = THREE.MathUtils.lerp(
        coreLightRef.current.intensity,
        targetIntensity,
        4 * dt
      );
    }

    if (beamRef.current) {
      const mat = beamRef.current.material as THREE.MeshBasicMaterial;
      const targetOp = isOpen ? 0.36 : 0;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, targetOp, 3.5 * dt);
      beamRef.current.scale.y = THREE.MathUtils.lerp(beamRef.current.scale.y, isOpen ? 1 : 0.1, 3.5 * dt);
      beamRef.current.rotation.y += dt * 0.6;
    }

    // 6. Shockwave Ring
    if (shockwaveRef.current) {
      const mat = shockwaveRef.current.material as THREE.MeshBasicMaterial;
      if (shockOpacityRef.current > 0.01) {
        shockScaleRef.current += dt * 9.5;
        shockOpacityRef.current = Math.max(0, shockOpacityRef.current - dt * 1.45);
      }
      shockwaveRef.current.scale.set(shockScaleRef.current, shockScaleRef.current, 1);
      mat.opacity = shockOpacityRef.current;
    }

    // 7. Dust & Sparks Burst
    if (dustRef.current && dustTimeRef.current > 0 && dustTimeRef.current < 1.6) {
      dustTimeRef.current += dt;
      const posAttr = dustGeo.getAttribute('position') as THREE.BufferAttribute;
      const velAttr = dustGeo.getAttribute('velocity') as THREE.BufferAttribute;
      for (let i = 0; i < posAttr.count; i++) {
        posAttr.setX(i, posAttr.getX(i) + velAttr.getX(i) * dt);
        posAttr.setY(i, posAttr.getY(i) + velAttr.getY(i) * dt);
        posAttr.setZ(i, posAttr.getZ(i) + velAttr.getZ(i) * dt);
        velAttr.setY(i, velAttr.getY(i) - 3.8 * dt);
      }
      posAttr.needsUpdate = true;
      const mat = dustRef.current.material as THREE.PointsMaterial;
      mat.opacity = Math.max(0, 1 - dustTimeRef.current / 1.6);
    }
  });

  const energyIntensity =
    phase === 'charging' || phase === 'unlocking' || phase === 'opening' || phase === 'revealed'
      ? 2.6
      : phase === 'impact'
        ? 1.5
        : 0.45;

  return (
    <>
      {/* Ground Metallic Stage */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.98, 0]} receiveShadow>
        <circleGeometry args={[18, 64]} />
        <meshStandardMaterial
          color="#06080f"
          metalness={0.85}
          roughness={0.32}
        />
      </mesh>

      {/* Subtle circular platform ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.96, 0]}>
        <ringGeometry args={[2.1, 2.22, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.96, 0]}>
        <ringGeometry args={[3.4, 3.45, 64]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.25} />
      </mesh>

      {/* Impact Shockwave Ring */}
      <mesh ref={shockwaveRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.93, 0]}>
        <ringGeometry args={[0.9, 1.3, 48]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      {/* Impact Spark/Dust Burst */}
      <points ref={dustRef} geometry={dustGeo}>
        <pointsMaterial color="#7dd3fc" size={0.09} transparent opacity={0} sizeAttenuation />
      </points>

      {/* CS2-Inspired Mystery Weapon Case */}
      <group ref={caseGroupRef} position={[0, 11.5, 0]}>
        {/* Lower Main Chassis */}
        <mesh position={[0, -0.04, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.65, 0.72, 1.68]} />
          <meshStandardMaterial color="#111622" metalness={0.85} roughness={0.3} />
        </mesh>

        {/* Metallic Silver Armor Ribs (Bottom) */}
        {[-0.95, -0.32, 0.32, 0.95].map((x) => (
          <mesh key={x} position={[x, -0.04, 0]}>
            <boxGeometry args={[0.14, 0.76, 1.74]} />
            <meshStandardMaterial color="#64748b" metalness={0.92} roughness={0.22} />
          </mesh>
        ))}

        {/* Corner Reinforced Brackets */}
        {[
          [-1.3, -0.36, 0.82],
          [1.3, -0.36, 0.82],
          [-1.3, -0.36, -0.82],
          [1.3, -0.36, -0.82],
        ].map(([x, y, z], idx) => (
          <mesh key={idx} position={[x, y, z]}>
            <boxGeometry args={[0.16, 0.16, 0.16]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.18} />
          </mesh>
        ))}

        {/* Side Heavy Handles */}
        {[-1.38, 1.38].map((x) => (
          <mesh key={x} position={[x, 0.02, 0]}>
            <boxGeometry args={[0.12, 0.16, 0.65]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.25} />
          </mesh>
        ))}

        {/* Glowing Electric Blue-Purple Energy Seam */}
        <mesh position={[0, 0.325, 0]}>
          <boxGeometry args={[2.68, 0.045, 1.71]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#6366f1"
            emissiveIntensity={energyIntensity}
            toneMapped={false}
          />
        </mesh>

        {/* Interior Holographic Core Glow Pad */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[2.25, 0.05, 1.35]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#a855f7"
            emissiveIntensity={phase === 'opening' || phase === 'revealed' ? 4 : 0.5}
            toneMapped={false}
          />
        </mesh>

        {/* Core Point Light & Volumetric Light Beam */}
        <pointLight
          ref={coreLightRef}
          position={[0, 0.75, 0]}
          color="#60a5fa"
          intensity={0.6}
          distance={9}
        />

        <mesh ref={beamRef} position={[0, 2.35, 0]} scale={[1, 0.1, 1]}>
          <cylinderGeometry args={[2.4, 0.85, 4.2, 32, 1, true]} />
          <meshBasicMaterial
            color="#7dd3fc"
            transparent
            opacity={0}
            side={THREE.DoubleSide}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Front Lock Left & Right */}
        <mesh ref={lockLeftRef} position={[-0.65, 0.08, 0.88]}>
          <boxGeometry args={[0.26, 0.42, 0.1]} />
          <meshStandardMaterial
            color={unlockStep >= 1 ? '#38bdf8' : '#cbd5e1'}
            emissive={unlockStep >= 1 ? '#38bdf8' : '#000000'}
            emissiveIntensity={unlockStep >= 1 ? 2.2 : 0}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        <mesh ref={lockRightRef} position={[0.65, 0.08, 0.88]}>
          <boxGeometry args={[0.26, 0.42, 0.1]} />
          <meshStandardMaterial
            color={unlockStep >= 2 ? '#a855f7' : '#cbd5e1'}
            emissive={unlockStep >= 2 ? '#a855f7' : '#000000'}
            emissiveIntensity={unlockStep >= 2 ? 2.2 : 0}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* Hinged Upper Lid */}
        <group ref={lidGroupRef} position={[0, 0.34, -0.84]}>
          <group position={[0, 0.18, 0.84]}>
            <mesh castShadow>
              <boxGeometry args={[2.68, 0.34, 1.7]} />
              <meshStandardMaterial color="#161c2c" metalness={0.88} roughness={0.25} />
            </mesh>
            {/* Top Silver Emblem Plate */}
            <mesh position={[0, 0.185, 0]}>
              <boxGeometry args={[1.15, 0.04, 0.62]} />
              <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.16} />
            </mesh>
            {/* Glowing Top Crest Strip */}
            <mesh position={[0, 0.21, 0]}>
              <boxGeometry args={[0.78, 0.025, 0.14]} />
              <meshStandardMaterial
                color="#38bdf8"
                emissive="#a855f7"
                emissiveIntensity={energyIntensity}
                toneMapped={false}
              />
            </mesh>
          </group>
        </group>
      </group>

      {/* Atmospheric Particles */}
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <Sparkles
          count={75}
          scale={[14, 7, 10]}
          size={2.2}
          speed={0.45}
          color="#7dd3fc"
          opacity={0.55}
        />
      </Float>
      <Sparkles
        count={45}
        scale={[12, 6, 8]}
        size={2.6}
        speed={0.3}
        color="#c084fc"
        opacity={0.45}
      />
    </>
  );
};

export const CaseDropCanvas: React.FC<CaseDropCanvasProps> = ({
  phase,
  unlockStep,
  impactPulse,
}) => {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 1.45, 6.2], fov: 44 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      className="h-full w-full"
    >
      <fog attach="fog" args={['#040508', 6, 22]} />
      <ambientLight intensity={0.42} color="#94a3b8" />
      <directionalLight position={[4, 9, 5]} intensity={1.8} color="#e0f2fe" />
      <directionalLight position={[-5, 6, -4]} intensity={1.4} color="#a855f7" />
      <spotLight position={[0, 9, 2]} angle={0.45} penumbra={0.8} intensity={2.6} color="#38bdf8" />
      <CaseModel phase={phase} unlockStep={unlockStep} impactPulse={impactPulse} />
    </Canvas>
  );
};
