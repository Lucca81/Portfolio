<h1 align="center">
  🚀 Meu Portfólio Futurista 3D
</h1>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
  <img alt="TypeScript" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="TailwindCSS" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img alt="Three.js" src="https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white" />
  <img alt="GSAP" src="https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" />
</p>

<p align="center">
  Ambiente imersivo, responsivo e de alta performance desenvolvido como cartão de visitas digital. Focado na demonstração de habilidades Full Stack e na construção de interfaces premium de alto impacto.
</p>

---

## 📸 Preview

https://portfolio-luccadev.vercel.app/

## ✨ Principais Funcionalidades

- **Experiência 3D Imersiva:** Background interativo renderizado via WebGL (Three.js e React Three Fiber) com estrelas orgânicas, fog volumétrico e um toroide neon reativo ao cursor do mouse.
- **Glassmorphism Design:** Interface transparente e moderna utilizando *backdrop-filters* com bordas retro-iluminadas (glow hover states).
- **Animações Cinematográficas (GSAP):** Animações escalonadas de timeline, revelação de texto na rolagem (ScrollTrigger) e transições fluídas entre as seções.
- **Micro-interações Tilt 3D:** Cards de projetos e habilidades que inclinam dinamicamente conforme a perspectiva do cursor do usuário (*requestAnimationFrame*).
- **Responsividade e Performance Mobile:** Adaptação via CSS Grid (Single-Column em telas menores) e redução inteligente do limite de hardware para dispositivos móveis (queda simulada do Device Pixel Ratio para manter 60 FPS consistentes).

## 🛠️ Stack Tecnológica

O projeto foi construído utilizando as ferramentas de mercado mais modernas:

- **Core:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler:** [Vite](https://vitejs.dev/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animações (UX):** [GSAP (GreenSock)](https://gsap.com/)
- **WebGL / 3D:** [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) + [@react-three/drei](https://github.com/pmndrs/drei)

## 📂 Estrutura do Projeto

O código está estruturado para facilitar a manutenção e escalabilidade dos componentes:

```bash
📦 src
 ┣ 📂 components
 ┃ ┣ 📂 canvas            # Elementos renderizados pela GPU (Three.js/R3F)
 ┃ ┃ ┣ 📜 HeroMesh.tsx    # O toroide interativo principal
 ┃ ┃ ┗ 📜 Scene3D.tsx     # O "Universo" / Mundo e restrições de DPR
 ┃ ┗ 📂 sections          # Blocos de interface UI em HTML/CSS Overlay
 ┃   ┣ 📜 AboutSection.tsx 
 ┃   ┣ 📜 HeroSection.tsx
 ┃   ┗ 📜 ProjectsSection.tsx
 ┣ 📂 hooks              # Lógica de controle e cálculo puro
 ┃ ┣ 📜 useMousePosition.ts # Normaliza ponteiro (X/Y) na tela
 ┃ ┗ 📜 useTilt3D.ts        # Cálculo avançado de inclinação 3D nos Cards 
 ┣ 📜 App.tsx             # Compositor central (Overlays vs Canvas)
 ┣ 📜 index.css           # Tokens globais da paleta Neon, Fontes e Tailwind
 ┗ 📜 main.tsx            # Entry point do React Root
```

## 🚀 Como Executar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão >= 18) instalado.
- NPM ou Yarn ou Bun.

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Lucca81/Portfolio.git
```

2. Acesse a pasta do projeto:
```bash
cd Portfolio
```

3. Instale as dependências:
```bash
npm install
```

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

5. O projeto estará disponível na porta `http://localhost:5173`.


## 🤝 Como Contribuir

Fique à vontade para copiar e melhorar este projeto ou reportar problemas!
1. Faça um **Fork** deste repositório
2. Crie sua branch (`git checkout -b feature/MinhaNovaFuncionalidade`)
3. Faça suas mudanças e commite seguindo os Padrões (`git commit -m 'feat: Adiciona x funcionalidade'`)
4. Faça o Push para a branch (`git push origin feature/MinhaNovaFuncionalidade`)
5. Abra um **Pull Request** para eu dar uma olhada.

---

<p align="center">
  Feito com ⚡ por <a href="https://github.com/Lucca81">Lucca</a>
</p>
