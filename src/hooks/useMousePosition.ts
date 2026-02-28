import { useState, useEffect, useCallback } from 'react';

interface MousePosition {
    /** Posição X normalizada de -1 a 1 */
    x: number;
    /** Posição Y normalizada de -1 a 1 */
    y: number;
    /** Posição X em pixels */
    clientX: number;
    /** Posição Y em pixels */
    clientY: number;
}

/**
 * Hook que rastreia a posição do mouse normalizada (-1 a 1).
 * Usado pelos objetos 3D para reagir ao movimento do mouse.
 */
export function useMousePosition(): MousePosition {
    const [position, setPosition] = useState<MousePosition>({
        x: 0,
        y: 0,
        clientX: 0,
        clientY: 0,
    });

    const handleMouseMove = useCallback((e: MouseEvent) => {
        setPosition({
            x: (e.clientX / window.innerWidth) * 2 - 1,
            y: -(e.clientY / window.innerHeight) * 2 + 1,
            clientX: e.clientX,
            clientY: e.clientY,
        });
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    return position;
}
