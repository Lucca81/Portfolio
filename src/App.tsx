import Scene3D from './components/canvas/Scene3D';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ProjectsSection from './components/sections/ProjectsSection';

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
      </main>
    </>
  );
}

export default App;
