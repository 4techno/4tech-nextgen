# ⚡ 4TECH NextGen Engineering Platform

<div align="center">

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-0.186-black?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![Matter.js](https://img.shields.io/badge/Matter.js-2D_Physics-4B5563?style=for-the-badge)](https://brm.io/matter-js/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-5.2-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**Next-generation immersive engineering platform featuring cinematic 3D WebGL scenes, rigid-body physics simulations, and automated RF/Robotics enquiry pipelines.**

[Platform Architecture](#-architecture) · [Interactive Scenes](#-interactive-3d-scenes) · [Getting Started](#-getting-started) · [API Engine](#-backend-services)

</div>

---

## ⚡ Overview

**4TECH NextGen** represents a technological evolution in hardware & systems engineering showcases. Merging GPU-accelerated WebGL with interactive rigid-body physics (Matter.js), real-time PDF contract synthesis, and chapter-based cinematic storytelling, this platform provides an experiential walkthrough of advanced robotics, embedded systems, and RF antenna research.

### ✨ Highlights & Innovations

- **Cinematic 3D Intro (`CinematicIntro3D`)**: Real-time volumetric particle camera sweeps, procedural chromatic transitions, and dynamic spatial sound stage coordination.
- **Physical Simulation Engine (`Matter.js`)**: Interactive rigid-body physical gravity fields responding directly to cursor acceleration and window boundaries.
- **Museum & Sculpture Gallery (`MuseeApp`, `MuseeSculptureScene`)**: Virtual 3D spatial exhibition exploring articulated robotics joints, RF feeds, and custom micro-controller PCB architectures.
- **Automated Specification Synthesis (`InquiryBuilder`)**: Dynamic engineering enquiry builder generating automated project estimates and PDF specifications via server-side streaming (`PDFKit`).
- **Modern Full-Stack Backbone**: Ultra-fast hot module replacement via Vite 8 and React 19, styled with Tailwind CSS v4 and served by Express 5.

---

## 🏗️ Architecture

```
4tech-nextgen/
├── public/                 # Static assets, 3D icons, vector marks
├── src/
│   ├── components/
│   │   ├── scenes/           # Specialized WebGL canvas subscenes
│   │   ├── CinematicIntro3D.jsx # Volumetric Three.js introduction sequence
│   │   ├── GalaxyStage.jsx   # Orbital particle galaxy viewport
│   │   ├── MuseeApp.jsx      # Spatial virtual gallery application
│   │   ├── MuseeSculptureScene.jsx # Interactive 3D physical artifacts
│   │   ├── ChapterAbout.jsx  # Engineering philosophy & background
│   │   ├── ChapterDisciplines.jsx # Hardware, RF, Firmware & Web ecosystems
│   │   ├── ChapterMethod.jsx # Rigorous design-to-production pipeline
│   │   ├── ChapterProjects.jsx # Interactive production project showcase
│   │   ├── InquiryBuilder.jsx# Dynamic scope calculator & quote builder
│   │   ├── ResumeModal.jsx   # Interactive resume viewer & exporter
│   │   ├── CustomCursor.jsx  # Magnetic interactive custom cursor
│   │   ├── Header.jsx        # Telemetry navigation header
│   │   └── AtelierFooter.jsx # Systems status & contact links
│   ├── App.jsx             # Top-level chapter orchestration & state
│   ├── main.jsx            # React 19 entrypoint
│   └── index.css           # Tailwind CSS v4 design tokens
├── server.js               # Express 5 backend API & PDF generation engine
├── vite.config.js          # Vite 8 configuration with React plugin
└── package.json            # Scripts & dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18+` (Recommended: `v20+` or `v26+`)
- **npm** or **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/4techno/4tech-nextgen.git
cd 4tech-nextgen

# Install dependencies
npm install
```

### Development

Run both the frontend development server and backend API concurrently:

```bash
npm run dev
```

Or run services individually:

```bash
# Start frontend client (http://localhost:5174)
npm run dev:frontend

# Start backend services (http://localhost:3001)
npm run dev:backend
```

### Production Build

```bash
# Compile and bundle production assets
npm run build

# Preview production build locally
npm run preview
```

---

## 🔌 Backend Services

The Express server handles real-time project enquiries and dynamic document generation:

| Method | Route | Description |
|---|---|---|
| `GET` | `/api/health` | Service uptime and system health metrics |
| `POST` | `/api/inquiries` | Submit engineering inquiries with parameters |
| `POST` | `/api/export-pdf` | Synthesize instant PDF engineering briefs via PDFKit |

---

## 🛠️ Tech Stack

- **Frontend Core**: [React 19](https://react.dev/)
- **3D Graphics**: [Three.js](https://threejs.org/)
- **Physics Engine**: [Matter.js](https://brm.io/matter-js/)
- **Build Tooling**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Document Engine**: [PDFKit](https://pdfkit.org/)
- **Backend API**: [Express 5](https://expressjs.com/)

---

## 👤 Author

**Mohammed Vashir**  
*Systems, Robotics & AI Architect · Full-Stack Engineer*

- **GitHub**: [@4techno](https://github.com/4techno)
- **Live Platform**: [4tech-9cy.pages.dev](https://4tech-9cy.pages.dev)
- **LinkedIn**: [Mohammed Vashir](https://www.linkedin.com/in/mohammed-vashir-793b89378/)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
