import { useRef, useEffect } from 'react';
import gsap from 'gsap';

/* ══════════════════════════════════════════════
   HERO SECTION — Tipografia + Animação GSAP
   ══════════════════════════════════════════════ */
export default function HeroSection() {
    const containerRef = useRef<HTMLElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const nameRef = useRef<HTMLSpanElement>(null);
    const titleRef = useRef<HTMLSpanElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const scrollIndicatorRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: 'power3.out' },
                delay: 0.3,
            });

            // Subtitle (tracking label)
            tl.fromTo(
                subtitleRef.current,
                { y: 30, opacity: 0, letterSpacing: '0.1em' },
                { y: 0, opacity: 1, letterSpacing: '0.3em', duration: 0.8 }
            );

            // "Olá, eu sou" text
            tl.fromTo(
                titleRef.current,
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.9 },
                '-=0.4'
            );

            // Name with glow
            tl.fromTo(
                nameRef.current,
                { y: 80, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 1.0 },
                '-=0.5'
            );

            // Description
            tl.fromTo(
                descRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                '-=0.4'
            );

            // Decorative line
            tl.fromTo(
                lineRef.current,
                { scaleX: 0, opacity: 0 },
                { scaleX: 1, opacity: 1, duration: 0.6 },
                '-=0.3'
            );

            // Scroll indicator
            tl.fromTo(
                scrollIndicatorRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6 },
                '-=0.2'
            );

            // Animação contínua do scroll indicator
            gsap.to(scrollIndicatorRef.current, {
                y: 10,
                repeat: -1,
                yoyo: true,
                duration: 1.5,
                ease: 'power1.inOut',
                delay: 2,
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            id="hero"
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                position: 'relative',
                padding: '2rem',
            }}
        >
            {/* Conteúdo textual — lado esquerdo, centralizado verticalmente */}
            <div
                style={{
                    position: 'relative',
                    zIndex: 10,
                    width: '100%',
                    maxWidth: '700px',
                    marginLeft: 'clamp(2rem, 8vw, 10rem)',
                }}
            >
                {/* Label superior */}
                <p
                    ref={subtitleRef}
                    style={{
                        opacity: 0,
                        color: '#9999bb',
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        fontSize: 'clamp(0.65rem, 1vw, 0.85rem)',
                        fontWeight: 500,
                        marginBottom: '1.5rem',
                        fontFamily: 'var(--font-sans)',
                    }}
                >
                    Engenheiro de Software & Desenvolvedor Full Stack
                </p>

                {/* Título principal */}
                <h1
                    style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        lineHeight: 1,
                        marginBottom: '2rem',
                    }}
                >
                    <span
                        ref={titleRef}
                        style={{
                            display: 'block',
                            opacity: 0,
                            color: '#e0e0f0',
                            fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
                            marginBottom: '0.5rem',
                        }}
                    >
                        Olá, eu sou
                    </span>
                    <span
                        ref={nameRef}
                        style={{
                            display: 'block',
                            opacity: 0,
                            color: '#00f0ff',
                            fontSize: 'clamp(3rem, 10vw, 8rem)',
                            textShadow:
                                '0 0 40px rgba(0, 240, 255, 0.6), 0 0 80px rgba(0, 240, 255, 0.3), 0 0 120px rgba(0, 240, 255, 0.15)',
                        }}
                    >
                        Lucca
                    </span>
                </h1>

                {/* Descrição */}
                <p
                    ref={descRef}
                    style={{
                        opacity: 0,
                        color: '#aaaacc',
                        fontSize: 'clamp(0.9rem, 1.5vw, 1.25rem)',
                        maxWidth: '550px',
                        lineHeight: 1.7,
                        fontFamily: 'var(--font-sans)',
                    }}
                >
                    Transformando ideias complexas em experiências digitais de{' '}
                    <span style={{ color: '#a855f7', fontWeight: 500 }}>alta performance</span>.
                    Arquitetura de sistemas e design de interfaces.
                </p>

                {/* Linha decorativa */}
                <div
                    ref={lineRef}
                    style={{
                        opacity: 0,
                        marginTop: '2.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                    }}
                >
                    <div
                        style={{
                            height: '1px',
                            width: '80px',
                            background: 'linear-gradient(90deg, rgba(0,240,255,0.7), transparent)',
                        }}
                    />
                    <div
                        style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(0, 240, 255, 0.8)',
                            boxShadow: '0 0 15px rgba(0, 240, 255, 0.6)',
                        }}
                    />
                    <div
                        style={{
                            height: '1px',
                            width: '80px',
                            background: 'linear-gradient(270deg, rgba(0,240,255,0.7), transparent)',
                        }}
                    />
                </div>
            </div>

            {/* Indicador de scroll — centralizado na base */}
            <div
                ref={scrollIndicatorRef}
                style={{
                    opacity: 0,
                    position: 'absolute',
                    bottom: '2.5rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                }}
            >
                <span
                    style={{
                        color: '#555577',
                        fontSize: '0.7rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                    }}
                >
                    Scroll
                </span>
                <div
                    style={{
                        width: '20px',
                        height: '32px',
                        borderRadius: '10px',
                        border: '1px solid rgba(85, 85, 119, 0.4)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        paddingTop: '6px',
                    }}
                >
                    <div
                        style={{
                            width: '3px',
                            height: '8px',
                            borderRadius: '2px',
                            backgroundColor: 'rgba(0, 240, 255, 0.7)',
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
