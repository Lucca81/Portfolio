import { useRef, useCallback } from 'react';

interface TiltState {
    rotateX: number;
    rotateY: number;
    scale: number;
    glareX: number;
    glareY: number;
}

/**
 * Hook que calcula a inclinação 3D de um card baseado na posição do mouse.
 * Retorna handlers de mouse e a transformação CSS.
 */
export function useTilt3D(maxTilt = 15, scale = 1.03) {
    const cardRef = useRef<HTMLDivElement>(null);
    const tiltRef = useRef<TiltState>({
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        glareX: 50,
        glareY: 50,
    });
    const rafRef = useRef<number | null>(null);

    const updateTransform = useCallback(() => {
        if (cardRef.current) {
            const { rotateX, rotateY, scale: s } = tiltRef.current;
            cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${s}, ${s}, ${s})`;
        }
    }, []);

    const onMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const el = cardRef.current;
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            tiltRef.current = {
                rotateX: ((y - centerY) / centerY) * -maxTilt,
                rotateY: ((x - centerX) / centerX) * maxTilt,
                scale,
                glareX: (x / rect.width) * 100,
                glareY: (y / rect.height) * 100,
            };

            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(updateTransform);
        },
        [maxTilt, scale, updateTransform]
    );

    const onMouseLeave = useCallback(() => {
        tiltRef.current = { rotateX: 0, rotateY: 0, scale: 1, glareX: 50, glareY: 50 };
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(updateTransform);
    }, [updateTransform]);

    return {
        cardRef,
        tiltState: tiltRef,
        handlers: { onMouseMove, onMouseLeave },
    };
}
