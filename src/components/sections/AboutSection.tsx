import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════
   DADOS DAS SKILLS
   ══════════════════════════════════════════════ */
interface Skill {
    icon: string;
    title: string;
    description: string;
    tags: string[];
    color: string;
}

const skills: Skill[] = [
    {
        icon: '⚙️',
        title: 'Backend & Arquitetura',
        description:
            'Desenvolvimento de APIs REST robustas, microsserviços e sistemas distribuídos com foco em escalabilidade e clean architecture.',
        tags: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
        color: '#00f0ff',
    },
    {
        icon: '🎨',
        title: 'Frontend',
        description:
            'Desenvolvimento de interfaces web responsivas e dinâmicas. União de código e design visual para prototipar e construir aplicações com foco em uma experiência de usuário intuitiva e acessível.',
        tags: ['React', 'TypeScript', 'JavaScript', 'HTML/CSS'],
        color: '#a855f7',
    },
    {
        icon: '🚀',
        title: 'Infraestrutura & Ferramentas',
        description:
            'Gerenciamento de ambientes de desenvolvimento consistentes e organizados. Experiência com conteinerização de aplicações, controle de versão eficiente e estruturação e migração de bancos de dados.',
        tags: ['Docker', 'Docker Compose', 'Git', 'PostgreSQL', 'Flyway'],
        color: '#3b82f6',
    },
    {
        icon: '🧠',
        title: 'Inovações & Inteligência Artificial',
        description:
            'Exploração de tecnologias emergentes aplicadas a problemas reais. Experiência prática com o consumo e integração de APIs de Inteligência Artificial, implementação de agentes inteligentes e estruturação de lógicas de sistemas complexas.',
        tags: ['IA Generativa', 'Integração de APIs', 'Agentes de IA'],
        color: '#ec4899',
    },
];

/* ══════════════════════════════════════════════
   COMPONENTE: Skill Card com Glassmorphism
   ══════════════════════════════════════════════ */
function SkillCard({ skill, index }: { skill: Skill; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                el,
                {
                    y: 60,
                    opacity: 0,
                    scale: 0.95,
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    delay: index * 0.15,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        end: 'top 50%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );
        });

        return () => ctx.revert();
    }, [index]);

    return (
        <div
            ref={cardRef}
            style={{
                opacity: 0,
                padding: '2rem',
                borderRadius: '16px',
                background: 'rgba(15, 15, 35, 0.6)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = `${skill.color}33`;
                el.style.transform = 'translateY(-4px)';
                el.style.boxShadow = `0 8px 32px ${skill.color}15, 0 0 0 1px ${skill.color}20`;
            }}
            onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
            }}
        >
            {/* Glow corner accent */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '80px',
                    height: '80px',
                    background: `radial-gradient(circle at top left, ${skill.color}10, transparent)`,
                    pointerEvents: 'none',
                }}
            />

            {/* Icon */}
            <div
                style={{
                    fontSize: '2rem',
                    marginBottom: '1rem',
                }}
            >
                {skill.icon}
            </div>

            {/* Title */}
            <h3
                style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: '#f0f0f8',
                    marginBottom: '0.75rem',
                }}
            >
                {skill.title}
            </h3>

            {/* Description */}
            <p
                style={{
                    color: '#9999bb',
                    fontSize: '0.9rem',
                    lineHeight: 1.7,
                    marginBottom: '1.25rem',
                }}
            >
                {skill.description}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {skill.tags.map((tag) => (
                    <span
                        key={tag}
                        style={{
                            fontSize: '0.7rem',
                            fontWeight: 500,
                            letterSpacing: '0.05em',
                            padding: '0.3rem 0.7rem',
                            borderRadius: '999px',
                            border: `1px solid ${skill.color}30`,
                            color: skill.color,
                            background: `${skill.color}08`,
                        }}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════
   COMPONENTE: Stat Counter
   ══════════════════════════════════════════════ */
function StatItem({
    value,
    label,
    color,
}: {
    value: string;
    label: string;
    color: string;
}) {
    return (
        <div style={{ textAlign: 'center' }}>
            <div
                style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    fontWeight: 700,
                    color,
                    lineHeight: 1,
                    marginBottom: '0.5rem',
                    textShadow: `0 0 20px ${color}40`,
                }}
            >
                {value}
            </div>
            <div
                style={{
                    color: '#8888aa',
                    fontSize: '0.8rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                }}
            >
                {label}
            </div>
        </div>
    );
}

/* ══════════════════════════════════════════════
   SEÇÃO SOBRE MIM
   ══════════════════════════════════════════════ */
export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const bioRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading parallax entry
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
                        end: 'top 50%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Bio text entry
            gsap.fromTo(
                bioRef.current,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: bioRef.current,
                        start: 'top 85%',
                        end: 'top 50%',
                        toggleActions: 'play none none reverse',
                    },
                }
            );

            // Stats entry
            gsap.fromTo(
                statsRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: 'top 85%',
                        end: 'top 55%',
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
            id="about"
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
                    width: '60%',
                    height: '1px',
                    background:
                        'linear-gradient(90deg, transparent, rgba(0,240,255,0.3), rgba(168,85,247,0.3), transparent)',
                }}
            />

            <div
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}
            >
                {/* ── Heading ── */}
                <div ref={headingRef} style={{ opacity: 0, marginBottom: '4rem' }}>
                    <p
                        style={{
                            color: '#00f0ff',
                            fontFamily: 'var(--font-sans)',
                            fontSize: '0.8rem',
                            letterSpacing: '0.3em',
                            textTransform: 'uppercase',
                            fontWeight: 500,
                            marginBottom: '1rem',
                        }}
                    >
                        Sobre Mim
                    </p>
                    <h2
                        style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            fontWeight: 700,
                            color: '#f0f0f8',
                            lineHeight: 1.1,
                            maxWidth: '600px',
                        }}
                    >
                        Desenvolvedor versátil com paixão por{' '}
                        <span
                            style={{
                                color: '#a855f7',
                                textShadow: '0 0 20px rgba(168,85,247,0.4)',
                            }}
                        >
                            excelência técnica
                        </span>
                    </h2>
                </div>

                {/* ── Layout Assimétrico: Bio + Stats ── */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '3rem',
                        marginBottom: '5rem',
                        alignItems: 'start',
                    }}
                >
                    {/* Bio text */}
                    <div ref={bioRef} style={{ opacity: 0 }}>
                        <p
                            style={{
                                color: '#aaaacc',
                                fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)',
                                lineHeight: 1.8,
                                marginBottom: '1.5rem',
                            }}
                        >
                            Atuo como desenvolvedor focado em criar{' '}
                            <span style={{ color: '#f0f0f8', fontWeight: 500 }}>
                                soluções tecnológicas versáteis
                            </span>
                            , participando desde a estruturação de sistemas com arquiteturas limpas até a construção de interfaces dinâmicas. Minha vivência prática inclui o desenvolvimento de plataformas de gestão, simulação de fluxos de pagamento e a{' '}
                            <span style={{ color: '#ec4899', fontWeight: 500 }}>
                                integração de APIs de Inteligência Artificial
                            </span>{' '}
                            para análise de dados.
                        </p>
                        <p
                            style={{
                                color: '#aaaacc',
                                fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)',
                                lineHeight: 1.8,
                            }}
                        >
                            Valorizo o desenvolvimento colaborativo organizado em squads ágeis e o aprendizado contínuo, buscando sempre aplicar as{' '}
                            <span style={{ color: '#00f0ff', fontWeight: 500 }}>
                                melhores práticas de mercado
                            </span>{' '}
                            para entregar sistemas eficientes e de alto impacto.
                        </p>
                    </div>

                    {/* Stats */}
                    <div
                        ref={statsRef}
                        style={{
                            opacity: 0,
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '2.5rem',
                            padding: '2.5rem',
                            borderRadius: '16px',
                            background: 'rgba(15, 15, 35, 0.4)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255,255,255,0.06)',
                        }}
                    >
                        <StatItem value="+160h" label="Horas de Certificações Técnicas" color="#00f0ff" />
                        <StatItem value="10+" label="Tecnologias e Ferramentas Dominadas" color="#a855f7" />
                        <StatItem value="100%" label="Foco em Qualidade e Arquitetura" color="#ec4899" />
                        <StatItem value="∞" label="Linhas de Código" color="#3b82f6" />
                    </div>
                </div>

                {/* ── Grid de Skills ── */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '1.5rem',
                    }}
                >
                    {skills.map((skill, index) => (
                        <SkillCard key={skill.title} skill={skill} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
