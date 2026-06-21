'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { usePerformanceTier, useReducedMotion } from '@/lib/hooks';
import { INDUSTRY_NODES } from '@/lib/content';
import { sampleInsideAustralia } from '@/lib/australia';

const W = 13;
const H = 9.5;

function mapXY(nx: number, ny: number): [number, number] {
  return [(nx - 0.5) * W, (0.5 - ny) * H];
}

const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vFade;
  uniform float uTime;
  uniform float uPixelRatio;
  void main() {
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float twinkle = 0.75 + 0.25 * sin(uTime * 1.5 + position.x * 1.3 + position.y * 0.7);
    vFade = twinkle;
    gl_PointSize = aSize * uPixelRatio * twinkle * (420.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vFade;
  uniform float uOpacity;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.04, d) * uOpacity * vFade;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function Particles({
  progressRef,
  tier,
  reduced,
}: {
  progressRef: React.MutableRefObject<number>;
  tier: 'low' | 'high';
  reduced: boolean;
}) {
  const count = tier === 'high' ? 18000 : 9000;
  const pointsRef = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const { geometry, targets, jitter } = useMemo(() => {
    const scatter = new Float32Array(count * 3);
    const australia = new Float32Array(count * 3);
    const network = new Float32Array(count * 3);
    const grid = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const jitter = new Float32Array(count * 3);

    // --- Scatter (volumetric cloud) ---
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 9;
      const v = new THREE.Vector3().randomDirection().multiplyScalar(r);
      scatter[i * 3] = v.x;
      scatter[i * 3 + 1] = v.y * 0.7;
      scatter[i * 3 + 2] = v.z * 0.6;
    }

    // --- Australia (filled silhouette) ---
    const aus = sampleInsideAustralia(count);
    for (let i = 0; i < count; i++) {
      const [nx, ny] = aus[i];
      const [x, y] = mapXY(nx, ny);
      australia[i * 3] = x;
      australia[i * 3 + 1] = y;
      australia[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
    }

    // --- Network (particles flowing along edges between hubs) ---
    const nodes = INDUSTRY_NODES.map((n) => mapXY(n.x, n.y));
    const edges: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      const dists = nodes
        .map((_, j) => ({
          j,
          d: Math.hypot(nodes[i][0] - nodes[j][0], nodes[i][1] - nodes[j][1]),
        }))
        .filter((o) => o.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 3);
      dists.forEach(({ j }) => edges.push([i, j]));
    }
    for (let i = 0; i < count; i++) {
      if (i % 9 === 0) {
        // cluster at a hub
        const n = nodes[i % nodes.length];
        network[i * 3] = n[0] + (Math.random() - 0.5) * 0.5;
        network[i * 3 + 1] = n[1] + (Math.random() - 0.5) * 0.5;
      } else {
        const e = edges[i % edges.length];
        const a = nodes[e[0]];
        const b = nodes[e[1]];
        const t = Math.random();
        network[i * 3] = a[0] + (b[0] - a[0]) * t + (Math.random() - 0.5) * 0.18;
        network[i * 3 + 1] =
          a[1] + (b[1] - a[1]) * t + (Math.random() - 0.5) * 0.18;
      }
      network[i * 3 + 2] = (Math.random() - 0.5) * 1.2;
    }

    // --- Grid (engineering lattice) ---
    const cols = Math.ceil(Math.sqrt(count * (W / H)));
    const rows = Math.ceil(count / cols);
    for (let i = 0; i < count; i++) {
      const cx = i % cols;
      const cy = Math.floor(i / cols);
      grid[i * 3] = (cx / (cols - 1) - 0.5) * W;
      grid[i * 3 + 1] = (cy / (rows - 1) - 0.5) * H;
      grid[i * 3 + 2] = 0;
    }

    // --- Per-particle colour (champagne gold spectrum) + size + jitter ---
    const cLight = new THREE.Color('#ddc07c');
    const cGold = new THREE.Color('#c9a961');
    const cDeep = new THREE.Color('#9a7e3f');
    const cWhite = new THREE.Color('#fff6df');
    const tmp = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const r = Math.random();
      if (r > 0.93) tmp.copy(cWhite);
      else if (r > 0.6) tmp.copy(cLight);
      else if (r > 0.25) tmp.copy(cGold);
      else tmp.copy(cDeep);
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
      sizes[i] = 2.0 + Math.random() * 3.4;
      jitter[i * 3] = (Math.random() - 0.5) * 2;
      jitter[i * 3 + 1] = (Math.random() - 0.5) * 2;
      jitter[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(scatter.slice(), 3)
    );
    geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

    return {
      geometry,
      targets: [scatter, australia, network, grid],
      jitter,
    };
  }, [count]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = THREE.MathUtils.clamp(progressRef.current, 0, 1);
    const phase = p * (targets.length - 1);
    const idx = Math.min(targets.length - 2, Math.floor(phase));
    const f = smoothstep(phase - idx);
    const A = targets[idx];
    const B = targets[idx + 1];

    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    const breath = reduced ? 0 : 1;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const jx = jitter[ix];
      const jy = jitter[ix + 1];
      const jz = jitter[ix + 2];
      // organic drift — stronger in scatter, calmer once formed
      const settle = 0.25 + 0.75 * Math.abs(f - 0.5) * 2; // ~1 at target, ~0.25 mid-morph
      const driftAmp = breath * (0.12 + (1 - p) * 0.5) * (1.2 - settle * 0.6);
      const dx = Math.sin(t * 0.5 + jx * 4) * driftAmp;
      const dy = Math.cos(t * 0.45 + jy * 4) * driftAmp;
      const dz = Math.sin(t * 0.6 + jz * 4) * driftAmp;
      arr[ix] = A[ix] + (B[ix] - A[ix]) * f + dx;
      arr[ix + 1] = A[ix + 1] + (B[ix + 1] - A[ix + 1]) * f + dy;
      arr[ix + 2] = A[ix + 2] + (B[ix + 2] - A[ix + 2]) * f + dz;
    }
    pos.needsUpdate = true;

    if (pointsRef.current) {
      // settle rotation as forms resolve; lively while scattered
      const targetRot = -0.25 + p * 0.35;
      pointsRef.current.rotation.x +=
        (targetRot - pointsRef.current.rotation.x) * 0.04;
      pointsRef.current.rotation.y = reduced ? 0 : t * 0.03 * (1 - p * 0.7);
    }
    if (matRef.current) {
      matRef.current.uniforms.uTime.value = t;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uOpacity: { value: 0.95 },
          uPixelRatio: {
            value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1,
          },
        }}
      />
    </points>
  );
}

function Rig({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  useFrame((state) => {
    mouse.current.x = state.pointer.x;
    mouse.current.y = state.pointer.y;
    const p = progressRef.current;
    const targetZ = THREE.MathUtils.lerp(16.5, 12.5, p);
    camera.position.x += (mouse.current.x * 1.4 - camera.position.x) * 0.04;
    camera.position.y += (mouse.current.y * 0.9 + 0.4 - camera.position.y) * 0.04;
    camera.position.z += (targetZ - camera.position.z) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function ParticleMorph({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  const tier = usePerformanceTier();
  const reduced = useReducedMotion();
  return (
    <Canvas
      dpr={tier === 'high' ? [1, 2] : [1, 1.3]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0.4, 16.5], fov: 50 }}
    >
      <color attach="background" args={['#0a1320']} />
      <fog attach="fog" args={['#0a1320', 15, 34]} />
      <Particles progressRef={progressRef} tier={tier} reduced={reduced} />
      <Rig progressRef={progressRef} />
      {!reduced && (
        <EffectComposer>
          <Bloom
            intensity={tier === 'high' ? 1.3 : 0.95}
            luminanceThreshold={0.06}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.2} darkness={0.92} />
        </EffectComposer>
      )}
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
