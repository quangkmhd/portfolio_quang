# Portfolio Configuration Guide

## 1. Overview
The portfolio is a static frontend application built with Vite. Configuration is divided into build-time tooling configurations (`vite.config.js`, `eslint.config.js`), dependency management (`package.json`), and application-level content configuration. Since the app is completely client-side, there are minimal runtime environment variables.

## 2. Build Tooling Configuration

### 2.1 `vite.config.js`
This file controls how Vite bundles and serves the application.
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Common additions for portfolios:
  // base: '/your-repo-name/', // Required if deploying to GitHub Pages
  // build: {
  //   chunkSizeWarningLimit: 1000, // 3D libraries are large, this suppresses warnings
  // },
})
```
*   **`plugins`:** Integrates the standard `@vitejs/plugin-react` for Fast Refresh and Babel transformations.
*   **Deployment Note:** If you deploy to a subpath (like GitHub pages: `username.github.io/repo/`), you **must** add `base: '/repo/'` to this config.

### 2.2 `eslint.config.js`
Manages code quality and formatting rules. It uses the new "flat config" format for ESLint 9+.
*   It extends recommended rules for JavaScript (`@eslint/js`) and React hooks.
*   **Key Plugins:** `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`.
*   **Why it matters:** Ensures consistent code style before pushing to production, especially critical when mixing imperative Three.js code with declarative React code.

## 3. Dependency Management (`package.json`)

The `package.json` defines the core libraries that make the 3D experience possible.

### 3.1 Scripts
*   `npm run dev`: Starts the Vite local development server with Hot Module Replacement (HMR).
*   `npm run build`: Compiles the React application and 3D assets into highly optimized static HTML/CSS/JS in the `dist/` folder.
*   `npm run preview`: Bootstraps a local static web server to preview the `dist/` folder exactly as it will behave in production.
*   `npm run lint`: Runs ESLint across the codebase.

### 3.2 Critical Dependencies
*   `three` (^0.182.0): The core WebGL library. Must be kept in sync with the React-Three fiber version.
*   `@react-three/fiber` (^9.5.0): The React reconciler for Three.js.
*   `@react-three/drei` (^10.7.7): Essential helpers (cameras, controls, loaders).
*   `motion` (^12.33.0): Framer Motion for buttery-smooth DOM and 3D animations.
*   `react-icons` (^5.5.0): Used for social and UI icons.

## 4. Application Content Configuration

Instead of a database, the portfolio's content is configured statically via JavaScript files. This is by design to ensure maximum performance.

### 4.1 Content Configuration (`src/constants/index.js` or similar)
All textual content should be edited in a central constants file.
*   **Profile Details:** Update your name, tagline, and about me text.
*   **Projects Array:**
    ```javascript
    export const projects = [
      {
        title: "AI Meeting Assistant",
        description: "A real-time ASR and GraphRAG system.",
        technologies: ["React", "FastAPI", "Neo4j"],
        image: "/assets/project1.png", // Path relative to the public/ directory
        source_code_link: "https://github.com/...",
      }
    ];
    ```
*   **3D Models:** Place your `.glb` or `.gltf` files in the `/public/models/` directory. They can then be referenced directly by path (e.g., `useGLTF('/models/my_model.glb')`). Do not place massive models in `src/assets/` as Vite will attempt to base64 inline them if they are small, or add unnecessary processing overhead.

## 5. Environment Variables
If you need to connect the contact form to a service like EmailJS or Formspree, you will need to use Vite's environment variables.
*   Create a `.env` file in the root.
*   Variables **must** be prefixed with `VITE_` to be exposed to the client.
    ```ini
    VITE_EMAILJS_SERVICE_ID=your_service_id
    VITE_EMAILJS_TEMPLATE_ID=your_template_id
    VITE_EMAILJS_PUBLIC_KEY=your_public_key
    ```
*   Access them in code via `import.meta.env.VITE_EMAILJS_SERVICE_ID`.
