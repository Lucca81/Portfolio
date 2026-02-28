import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import type { Group } from 'three';
import HeroMesh from './HeroMesh';
import { useMousePosition } from '../../hooks/useMousePosition';

/* ──────────────────────────────────────────────
   Estrelas de fundo com rotação lenta
   ────────────────────────────────────────────── */
function BackgroundStars() {
    const ref = useRef<Group>(null);
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    useFrame((_state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.01;
            ref.current.rotation.x += delta * 0.005;
        }
    });

    return (
        <group ref={ref}>
            <Stars
                radius={80}
                depth={60}
                count={isMobile ? 1000 : 2500}
                factor={isMobile ? 3 : 4}
                saturation={0}
                fade
                speed={0.8}
            />
        </group>
    );
}

/* ──────────────────────────────────────────────
   Wrapper que passa mouse position para o canvas
   ────────────────────────────────────────────── */
function SceneContent({ mouse }: { mouse: { x: number; y: number } }) {
    return (
        <>
            <fog attach="fog" args={['#050510', 30, 100]} />

            {/* Iluminação */}
            <ambientLight intensity={0.15} />
            <directionalLight position={[5, 5, 5]} intensity={0.3} color="#00f0ff" />
            <pointLight position={[-5, -3, 5]} intensity={0.2} color="#a855f7" />
            <pointLight position={[0, 3, 3]} intensity={0.15} color="#3b82f6" />

            {/* Elementos 3D */}
            <BackgroundStars />
            <HeroMesh mouse={mouse} />
        </>
    );
}

/* ══════════════════════════════════════════════
   SCENE 3D — Canvas principal
   ══════════════════════════════════════════════ */
export default function Scene3D() {
    const mouse = useMousePosition();
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return (
        <div className="canvas-container">
            <Canvas
                dpr={isMobile ? [1, 1] : [1, 1.5]}
                camera={{ position: [0, 0, 12], fov: 55 }}
                performance={{ min: 0.5 }}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                }}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={null}>
                    <SceneContent mouse={{ x: mouse.x, y: mouse.y }} />
                </Suspense>
            </Canvas>
        </div>
    );
}
