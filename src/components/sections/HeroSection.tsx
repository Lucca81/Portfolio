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
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

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
                    marginLeft: isMobile ? '0' : 'clamp(2rem, 8vw, 10rem)',
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
                        marginBottom: '2rem',
                    }}
                >
                    Transformando ideias complexas em experiências digitais de{' '}
                    <span style={{ color: '#a855f7', fontWeight: 500 }}>alta performance</span>.
                    Arquitetura de sistemas e design de interfaces.
                </p>

                {/* Social Links */}
                <div
                    style={{
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        opacity: 0,
                        animation: 'fadeInUp 0.8s ease forwards 1.6s', // GSAP can also animate this, but keyframes keep it simple or we can just append to timeline
                    }}
                    ref={(el) => {
                        // Podemos usar o ref aqui para animar junto com o descRef no useEffect
                        if (el) {
                            gsap.fromTo(
                                el,
                                { y: 30, opacity: 0 },
                                { y: 0, opacity: 1, duration: 0.8, delay: 1.6, ease: 'power3.out' }
                            );
                        }
                    }}
                >
                    {/* GitHub */}
                    <a
                        href="https://github.com/Lucca81"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '45px',
                            height: '45px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#e0e0f0',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.4)';
                            e.currentTarget.style.color = '#00f0ff';
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(0, 240, 255, 0.2)';
                            e.currentTarget.style.transform = 'translateY(-3px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.color = '#e0e0f0';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                        title="GitHub"
                    >
                        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                    </a>

                    {/* LinkedIn */}
                    <a
                        href="https://linkedin.com/in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '45px',
                            height: '45px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            color: '#e0e0f0',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)';
                            e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.4)';
                            e.currentTarget.style.color = '#a855f7';
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.2)';
                            e.currentTarget.style.transform = 'translateY(-3px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.color = '#e0e0f0';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                        title="LinkedIn"
                    >
                        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                    </a>
                </div>

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
