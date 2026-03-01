import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            style={{
                width: '100%',
                padding: '2rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                background: 'rgba(5, 5, 10, 0.8)',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                zIndex: 10,
                marginTop: '4rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                color: '#aaaacc',
                fontFamily: 'var(--font-sans)',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    textAlign: 'center',
                }}
            >
                <p style={{ fontSize: '0.9rem', margin: 0 }}>
                    &copy; {currentYear} <span style={{ color: '#00f0ff', fontWeight: 500 }}>Lucca Nascimento</span>. Todos os direitos reservados.
                </p>

                <p style={{ fontSize: '0.8rem', color: '#777799', margin: 0, marginTop: '0.5rem' }}>
                    Desenvolvido com{' '}
                    <span style={{ color: '#61dafb' }}>React</span>,{' '}
                    <span style={{ color: '#3178c6' }}>TypeScript</span>,{' '}
                    <span style={{ color: '#00f0ff' }}>Three.js</span>,{' '}
                    <span style={{ color: '#88ce02' }}>GSAP</span> &{' '}
                    <span style={{ color: '#38bdf8' }}>Tailwind CSS</span>
                </p>
            </div>

            {/* Linha decorativa subtil */}
            <div
                style={{
                    height: '1px',
                    width: '40px',
                    background: 'linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.5), transparent)',
                    marginTop: '0.5rem',
                }}
            />
        </footer>
    );
};

export default Footer;
