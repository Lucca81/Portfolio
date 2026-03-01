import Scene3D from './components/canvas/Scene3D';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';
import Footer from './components/sections/Footer';

function App() {
  return (
    <>
      {/* Canvas 3D — background fixo */}
      <Scene3D />

      {/* Overlay HTML — scrollável por cima do canvas */}
      <main className="page-content grid-bg">
        {/* Hero Section */}
        <HeroSection />

        {/* Sobre Mim & Mentoria */}
        <AboutSection />

        {/* Vitrine de Projetos */}
        <ProjectsSection />

        {/* Rodapé Dinâmico */}
        <Footer />
      </main>
    </>
  );
}

export default App;
