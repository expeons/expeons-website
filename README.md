# Expeons Platform - Precision Process Engineering Portal

Welcome to the official repository for **Expeons**, a state-of-the-art corporate web application for high-precision process engineering, Aspen HYSYS simulation services, and EPC-ready documentation delivery.

This portal combines premium, minimal typography, slick glassmorphism layouts, and hardware-accelerated WebGL fluid dynamics to present an immersive brand landing page experience.

---

## 🛠️ The Technical Stack

The project is built using a modern, performant, and type-safe front-end architecture:

1. **Core Framework**: **React (v18.2.0)** inside a robust **TypeScript (v5.2.2)** environment.
2. **Build Tool & Bundler**: **Vite (v5.0.8)** with fast hot-reloading and optimized production tree-shaking.
3. **Styling Engine**: **Tailwind CSS (v4.0.0)** leveraging compile-time CSS injections for utility styles.
4. **Interactive Animations**:
   - **GSAP (GreenSock Animation Platform)**: Powering high-performance mouse-responsive timelines, dynamic hover effects, and uniform shader interpolation.
   - **Framer Motion (v10.16.0)**: Delivering smooth transitions, layout adjustments, and semantic page routings.
5. **Routing**: **React Router DOM (v6.21.0)** managing single-page application navigation.
6. **Form Handling & Validation**: **React Hook Form** paired with **Zod** schema validations for robust user input and query submission.
7. **Vector Assets & Icons**: **Lucide React** supplying responsive SVG icons.

---

## 🔬 Core Engineering & Optimization Features

### 1. Ref-Based WebGL Animation Rendering
- **The Challenge**: High-frequency mouse movements tracking across a canvas naturally trigger constant React component state changes, which force full DOM reconciliations and bottleneck the CPU.
- **The Optimization**: Replaced standard React component states inside the WebGL shader with local React Refs (`globalIntensityRef`). Uniform updates and mouse decay are handled directly inside a single continuous `requestAnimationFrame` render loop, bypassing React's virtual DOM completely. This yields a hardware-accelerated, lag-free **60fps** fluid reaction with zero CPU strain.

### 2. Fullscreen Mobile Glassmorphic Overlay
- **The Challenge**: Stacking multi-column layouts into portrait viewports on mobile can result in text and interactive items overlapping directly with bright WebGL colors.
- **The Optimization**: Implemented a responsive mobile-only backdrop layer (`backdrop-blur-[6px] bg-neutral-950/45`) between the canvas and texts. This softens the background swirls and boosts visual contrast so all elements are 100% readable.

### 3. Dynamic Scroll-Responsive Navigation
- **The Challenge**: A fixed header overlaying the dark Hero section on landing creates visual noise.
- **The Optimization**: Configured a scroll observer in the global `Navbar` component. It hides the navigation bar entirely with smooth translation transitions when the visitor is at the top of the homepage, and slides it back into view as soon as they scroll down past the Hero fold.

---

## 📂 Directory Architecture

```bash
├── public/
│   └── brand/             # Official Expeons logos, symbols, and light/dark assets
├── src/
│   ├── components/
│   │   ├── home/          # Homepage sections (Hero, Services, WhyExpeons, Stats)
│   │   ├── layout/        # Global wrappers (Navbar, Footer)
│   │   └── ui/            # Reusable primitives (AnimatedSection, Buttons, Badge)
│   ├── data/              # Static page datasets and schema constants
│   ├── pages/             # Route templates (Home, Services, About, Insights, Contact)
│   ├── App.tsx            # Main application router and routes mapping
│   ├── index.css          # Styling tokens, font settings, and Tailwind imports
│   └── main.tsx           # Application compiler mountpoint
├── tailwind.config.ts     # Utility tokens and custom design system extensions
├── tsconfig.json          # TypeScript configurations and path mappings (@/*)
└── vite.config.ts         # Vite server settings and path alias resolvers
```

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install all node packages:
```bash
npm install
```

### 2. Development Server
Start the local hot-reloading development server:
```bash
npm run dev
```

### 3. Production Build
Compile and bundle the project with strict TypeScript and minification checks:
```bash
npm run build
```

### 4. Local Preview
Preview the built production bundle locally:
```bash
npm run preview
```
