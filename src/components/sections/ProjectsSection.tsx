import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTilt3D } from '../../hooks/useTilt3D';

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════
   DADOS DOS PROJETOS
   ══════════════════════════════════════════════ */
interface Project {
    title: string;
    subtitle: string;
    description: string;
    techStack: string[];
    apis: string[];
    color: string;
    accentGradient: string;
    icon: string;
    category: string;
    githubUrl: string;
    liveUrl?: string; // Opcional, para deployments como Vercel
}

const projects: Project[] = [
    {
        title: 'MovieFlix',
        subtitle: 'Plataforma de Streaming',
        description:
            'API RESTful desenvolvida em Spring Boot para o gerenciamento completo de catálogos. O sistema orquestra relacionamentos complexos entre obras, gêneros e plataformas de distribuição, garantindo a consistência e a organização dos conteúdos.',
        techStack: ['Spring Boot', 'PostgreSQL', 'Docker', 'Swagger', 'JWT', 'Spring Security', 'Flyway'],
        apis: ['Auth JWT', 'REST API',],
        color: '#00f0ff',
        accentGradient: 'linear-gradient(135deg, #00f0ff20, #3b82f620)',
        icon: '🎬',
        category: 'Back-end',
        githubUrl: 'https://github.com/Lucca81/MovieFlix',
    },
    {
        title: 'EventControl',
        subtitle: 'Sistema para gerenciamento de eventos',
        description:
            'API robusta em Java construída com foco em escalabilidade e Clean Architecture. O sistema gerencia o fluxo completo de eventos, aplicando regras de negócio consistentes para a administração estruturada de dados.',
        techStack: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'RESTful'],
        apis: ['REST API'],
        color: '#ec4899',
        accentGradient: 'linear-gradient(135deg, #ec489920, #a855f720)',
        icon: '🚨',
        category: 'Back-end',
        githubUrl: 'https://github.com/Lucca81/EventControl',
    },
    {
        title: 'Vortex',
        subtitle: 'Site de roupas',
        description:
            'Interface web responsiva e visualmente atraente desenvolvida para o nicho de e-commerce de vestuário. O projeto foca em uma navegação intuitiva e na apresentação fluida dos produtos, construído inteiramente com HTML, CSS e JavaScript vanilla.',
        techStack: ['HTML', 'CSS', 'JavaScript'],
        apis: ['***'],
        color: '#a855f7',
        accentGradient: 'linear-gradient(135deg, #a855f720, #ec489920)',
        icon: '💳',
        category: 'Front-end',
        githubUrl: 'https://github.com/Lucca81/Vortex', // Troque aqui se for outro repo
        liveUrl: 'https://vortex-pi-opal.vercel.app',
    },
    {
        title: 'Plataforma',
        subtitle: 'Plataforma de Pagamento',
        description:
            'API RESTful desenvolvida para a simulação e gestão de transações financeiras. O sistema orquestra o fluxo completo de carteiras virtuais (wallets), garantindo o processamento seguro e a validação de regras de negócio para depósitos e transferências entre contas.',
        techStack: ['Java', 'Spring Boot', 'RESTful', 'H2'],
        apis: ['REST API'],
        color: '#3b82f6',
        accentGradient: 'linear-gradient(135deg, #3b82f620, #00f0ff20)',
        icon: '🧠',
        category: 'Back-end',
        githubUrl: 'https://github.com/Lucca81/Plataforma-de-Pagamento',
    },
    {
        title: 'Portfólio',
        subtitle: 'Meu Portfolio',
        description:
            'Aplicação web desenvolvida para atuar como meu cartão de visitas digital. Estruturada com componentes reutilizáveis e estilização avançada, refletindo boas práticas de desenvolvimento front-end, componentização e otimização de performance.',
        techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Framer Motion'],
        apis: ['***'],
        color: '#3b82f6',
        accentGradient: 'linear-gradient(135deg, #3b82f620, #00f0ff20)',
        icon: '🧠',
        category: 'Front-end',
        githubUrl: 'https://github.com/Lucca81/Portfolio',
    },
    {
        title: 'Desafio Itaú',
        subtitle: 'Desafio de Transação do Itaú',
        description:
            'API REST de alta performance desenvolvida em Java e Spring Boot para o processamento de transações financeiras. O sistema garante a consistência dos dados e realiza o cálculo de estatísticas complexas em tempo real, priorizando a eficiência e a precisão das operações.',
        techStack: ['Java', 'Spring Boot', 'RESTful', 'H2'],
        apis: ['REST API'],
        color: '#3b82f6',
        accentGradient: 'linear-gradient(135deg, #3b82f620, #00f0ff20)',
        icon: '🧠',
        category: 'Back-end',
        githubUrl: 'https://github.com/Lucca81/desafio-transacao-itau',
    },
    {
        title: 'PostoCombustivel',
        subtitle: 'Posto de Combustivel',
        description:
            'API RESTful desenvolvida para o gerenciamento e controle de abastecimentos. O sistema permite o registro preciso e a consulta otimizada do histórico, facilitando o monitoramento de consumo, a gestão de custos e a extração de dados estruturados.',
        techStack: ['Java', 'Spring Boot', 'RESTful', 'H2'],
        apis: ['REST API'],
        color: '#3b82f6',
        accentGradient: 'linear-gradient(135deg, #3b82f620, #00f0ff20)',
        icon: '🧠',
        category: 'Back-end',
        githubUrl: 'https://github.com/Lucca81/PostoCombustivel',
    },
];

/* ══════════════════════════════════════════════
   PROJECT CARD — Glassmorphism + Tilt 3D
   ══════════════════════════════════════════════ */
function ProjectCard({
    project,
    index,
}: {
    project: Project;
    index: number;
}) {
    const { cardRef, handlers } = useTilt3D(12, 1.02);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                el,
                { y: 80, opacity: 0, scale: 0.95 },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.9,
                    ease: 'power3.out',
                    delay: index * 0.12,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 88%',
                        end: 'top 55%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        });

        return () => ctx.revert();
    }, [index]);

    return (
        <div ref={containerRef} style={{ opacity: 0 }}>
            <div
                ref={cardRef}
                {...handlers}
                onMouseEnter={(e) => {
                    setIsHovered(true);
                    handlers.onMouseMove(e);
                }}
                onMouseLeave={() => {
                    setIsHovered(false);
                    handlers.onMouseLeave();
                }}
                style={{
                    position: 'relative',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    background: 'rgba(12, 12, 30, 0.65)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: `1px solid ${isHovered ? `${project.color}40` : 'rgba(255,255,255,0.06)'}`,
                    transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
                    boxShadow: isHovered
                        ? `0 20px 60px ${project.color}15, 0 0 0 1px ${project.color}15, inset 0 1px 0 rgba(255,255,255,0.05)`
                        : 'inset 0 1px 0 rgba(255,255,255,0.03)',
                    cursor: 'default',
                    willChange: 'transform',
                }}
            >
                {/* ── Header com gradiente ── */}
                <div
                    style={{
                        padding: '2rem 2rem 1.5rem',
                        background: project.accentGradient,
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                        position: 'relative',
                    }}
                >
                    {/* Category badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                        <div
                            style={{
                                display: 'inline-block',
                                fontSize: '0.65rem',
                                fontWeight: 600,
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                padding: '0.25rem 0.7rem',
                                borderRadius: '999px',
                                border: `1px solid ${project.color}35`,
                                color: project.color,
                                background: `${project.color}10`,
                            }}
                        >
                            {project.category}
                        </div>

                        {/* Action Links Container (GitHub / Live) */}
                        <div style={{ display: 'flex', gap: '0.5rem', zIndex: 10 }}>
                            {/* GitHub Link */}
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        color: '#f0f0f8',
                                        transition: 'all 0.3s ease',
                                        opacity: isHovered ? 1 : 0.6,
                                        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                                        cursor: 'pointer',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = `${project.color}20`;
                                        e.currentTarget.style.borderColor = `${project.color}50`;
                                        e.currentTarget.style.color = project.color;
                                        e.currentTarget.style.boxShadow = `0 0 15px ${project.color}40`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                        e.currentTarget.style.color = '#f0f0f8';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                    title="Ver Repositório no GitHub"
                                >
                                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                    </svg>
                                </a>
                            )}

                            {/* Live Demo Link */}
                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '36px',
                                        height: '36px',
                                        borderRadius: '50%',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                        color: '#f0f0f8',
                                        transition: 'all 0.3s ease',
                                        opacity: isHovered ? 1 : 0.6,
                                        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                                        cursor: 'pointer',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = `${project.color}20`;
                                        e.currentTarget.style.borderColor = `${project.color}50`;
                                        e.currentTarget.style.color = project.color;
                                        e.currentTarget.style.boxShadow = `0 0 15px ${project.color}40`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                        e.currentTarget.style.color = '#f0f0f8';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                    title="Acessar Site (Live Demo)"
                                >
                                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                        <polyline points="15 3 21 3 21 9"></polyline>
                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Icon + Title */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '2rem' }}>{project.icon}</span>
                        <div>
                            <h3
                                style={{
                                    fontFamily: 'var(--font-display)',
                                    fontSize: '1.5rem',
                                    fontWeight: 700,
                                    color: '#f0f0f8',
                                    lineHeight: 1.2,
                                }}
                            >
                                {project.title}
                            </h3>
                            <p
                                style={{
                                    color: '#8888aa',
                                    fontSize: '0.85rem',
                                    marginTop: '0.15rem',
                                }}
                            >
                                {project.subtitle}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Body ── */}
                <div style={{ padding: '1.5rem 2rem 2rem' }}>
                    {/* Descrição */}
                    <p
                        style={{
                            color: '#aaaacc',
                            fontSize: '0.9rem',
                            lineHeight: 1.7,
                            marginBottom: '1.5rem',
                        }}
                    >
                        {project.description}
                    </p>

                    {/* Tech Stack reveal */}
                    <div
                        style={{
                            marginBottom: '1.25rem',
                            overflow: 'hidden',
                            maxHeight: isHovered ? '200px' : '0',
                            opacity: isHovered ? 1 : 0,
                            transition: 'max-height 0.5s ease, opacity 0.4s ease',
                        }}
                    >
                        <p
                            style={{
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                color: '#666688',
                                marginBottom: '0.6rem',
                            }}
                        >
                            Tech Stack
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                            {project.techStack.map((tech) => (
                                <span
                                    key={tech}
                                    style={{
                                        fontSize: '0.7rem',
                                        fontWeight: 500,
                                        padding: '0.25rem 0.6rem',
                                        borderRadius: '6px',
                                        background: 'rgba(255,255,255,0.05)',
                                        color: '#ccccdd',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                    }}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* APIs & Integrações */}
                    <div>
                        <p
                            style={{
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase',
                                color: '#666688',
                                marginBottom: '0.6rem',
                            }}
                        >
                            APIs & Integrações
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                            {project.apis.map((api) => (
                                <span
                                    key={api}
                                    style={{
                                        fontSize: '0.7rem',
                                        fontWeight: 500,
                                        padding: '0.25rem 0.6rem',
                                        borderRadius: '999px',
                                        border: `1px solid ${project.color}30`,
                                        color: project.color,
                                        background: `${project.color}08`,
                                    }}
                                >
                                    {api}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Glare overlay ── */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        pointerEvents: 'none',
                        opacity: isHovered ? 0.08 : 0,
                        transition: 'opacity 0.4s ease',
                        background: `radial-gradient(circle at 50% 50%, ${project.color}, transparent 60%)`,
                    }}
                />

                {/* ── Bottom accent line ── */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '10%',
                        right: '10%',
                        height: '2px',
                        background: `linear-gradient(90deg, transparent, ${project.color}60, transparent)`,
                        opacity: isHovered ? 1 : 0,
                        transition: 'opacity 0.4s ease',
                    }}
                />
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════
   SEÇÃO PROJETOS
   ══════════════════════════════════════════════ */
export default function ProjectsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                headingRef.current,
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="projects"
            style={{
                position: 'relative',
                padding: 'clamp(4rem, 10vw, 8rem) 2rem',
                overflow: 'hidden',
            }}
        >
            {/* Gradiente separador */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '50%',
                    height: '1px',
                    background:
                        'linear-gradient(90deg, transparent, rgba(168,85,247,0.3), rgba(0,240,255,0.3), transparent)',
                }}
            />

            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* ── Heading ── */}
                <div ref={headingRef} style={{ opacity: 0, marginBottom: '4rem' }}>
                    <p
                        style={{
                            color: '#a855f7',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.8rem',
                            letterSpacing: '0.3em',
                            textTransform: 'uppercase',
                            fontWeight: 500,
                            marginBottom: '1rem',
                        }}
                    >
                        Projetos
                    </p>
                    <h2
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            fontWeight: 700,
                            color: '#f0f0f8',
                            lineHeight: 1.1,
                            maxWidth: '650px',
                        }}
                    >
                        Construindo{' '}
                        <span
                            style={{
                                color: '#00f0ff',
                                textShadow: '0 0 20px rgba(0,240,255,0.4)',
                            }}
                        >
                            soluções reais
                        </span>{' '}
                        com tecnologia de ponta
                    </h2>
                    <p
                        style={{
                            color: '#8888aa',
                            fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)',
                            lineHeight: 1.7,
                            maxWidth: '550px',
                            marginTop: '1.25rem',
                        }}
                    >
                        Projetos que combinam arquitetura robusta, design intuitivo e
                        integrações complexas. Passe o mouse para revelar detalhes técnicos.
                    </p>
                </div>

                {/* ── Grid de Projetos ── */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '2rem',
                    }}
                >
                    {projects.map((project, index) => (
                        <ProjectCard key={project.title} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
