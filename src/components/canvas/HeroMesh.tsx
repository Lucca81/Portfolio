import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import type { Mesh, Group, BufferAttribute } from 'three';
import * as THREE from 'three';

/* ══════════════════════════════════════════════
   TOROIDE WIREFRAME INTERATIVO
   Reage ao mouse e rota lentamente
   ══════════════════════════════════════════════ */

interface HeroMeshProps {
    mouse: { x: number; y: number };
}

/** Anel de partículas orbitando o toroide */
function OrbitalParticles({ count = 200 }: { count?: number }) {
    const ref = useRef<THREE.Points>(null);

    const [positions, sizes] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const szs = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            // Distribuir em torno de um toro
            const angle = Math.random() * Math.PI * 2;
            const radius = 3 + Math.random() * 2.5;
            const y = (Math.random() - 0.5) * 3;
            pos[i * 3] = Math.cos(angle) * radius;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = Math.sin(angle) * radius;
            szs[i] = Math.random() * 2 + 0.5;
        }
        return [pos, szs];
    }, [count]);

    useFrame((_state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.08;
            ref.current.rotation.z += delta * 0.02;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-size"
                    args={[sizes, 1]}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#00f0ff"
                size={0.04}
                transparent
                opacity={0.6}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

/** Partículas flutuantes dispersas pelo espaço */
function FloatingDust({ count = 150 }: { count?: number }) {
    const ref = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return pos;
    }, [count]);

    useFrame((state) => {
        if (ref.current) {
            const posAttr = ref.current.geometry.attributes.position as BufferAttribute;
            const arr = posAttr.array as Float32Array;
            for (let i = 0; i < count; i++) {
                // Movimento suave vertical
                arr[i * 3 + 1] += Math.sin(state.clock.elapsedTime * 0.3 + i) * 0.001;
            }
            posAttr.needsUpdate = true;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#a855f7"
                size={0.025}
                transparent
                opacity={0.4}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

/** Toroide principal com wireframe neon */
export default function HeroMesh({ mouse }: HeroMeshProps) {
    const groupRef = useRef<Group>(null);
    const torusRef = useRef<Mesh>(null);
    const innerRef = useRef<Mesh>(null);

    // Target suave para follow do mouse
    const smoothMouse = useRef({ x: 0, y: 0 });

    useFrame((_state, delta) => {
        // Suavizar posição do mouse (lerp)
        smoothMouse.current.x += (mouse.x * 0.5 - smoothMouse.current.x) * delta * 2;
        smoothMouse.current.y += (mouse.y * 0.3 - smoothMouse.current.y) * delta * 2;

        if (groupRef.current) {
            // Rotação base + reação ao mouse
            groupRef.current.rotation.y += delta * 0.1;
            groupRef.current.rotation.x = smoothMouse.current.y * 0.4;
            groupRef.current.rotation.z = smoothMouse.current.x * 0.15;

            // Parallax suave na posição
            groupRef.current.position.x = smoothMouse.current.x * 0.8;
            groupRef.current.position.y = smoothMouse.current.y * 0.5;
        }

        if (torusRef.current) {
            torusRef.current.rotation.x += delta * 0.2;
        }

        if (innerRef.current) {
            innerRef.current.rotation.y -= delta * 0.3;
            innerRef.current.rotation.z += delta * 0.1;
        }
    });

    return (
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
            <group ref={groupRef}>
                {/* Toroide principal — cyan wireframe */}
                <mesh ref={torusRef}>
                    <torusGeometry args={[2.5, 0.6, 16, 48]} />
                    <meshStandardMaterial
                        color="#00f0ff"
                        wireframe
                        transparent
                        opacity={0.2}
                        emissive="#00f0ff"
                        emissiveIntensity={0.4}
                    />
                </mesh>

                {/* Toroide interno — purple, contra-rotação */}
                <mesh ref={innerRef}>
                    <torusGeometry args={[1.8, 0.3, 12, 36]} />
                    <meshStandardMaterial
                        color="#a855f7"
                        wireframe
                        transparent
                        opacity={0.12}
                        emissive="#a855f7"
                        emissiveIntensity={0.3}
                    />
                </mesh>

                {/* Esfera núcleo — glow sutil */}
                <mesh>
                    <sphereGeometry args={[0.6, 16, 16]} />
                    <meshStandardMaterial
                        color="#00f0ff"
                        transparent
                        opacity={0.05}
                        emissive="#00f0ff"
                        emissiveIntensity={1.0}
                    />
                </mesh>

                {/* Partículas orbitais */}
                <OrbitalParticles count={200} />
            </group>

            {/* Partículas flutuantes do ambiente */}
            <FloatingDust count={150} />
        </Float>
    );
}
