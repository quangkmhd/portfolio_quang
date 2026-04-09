# Portfolio API & Component Reference

## 1. Overview
As a frontend React application, this project does not expose a traditional REST or GraphQL API. Instead, its "API" consists of the internal React component structure, custom hooks, and utility functions that drive the UI and 3D experiences. 

This document serves as a reference for developers looking to extend or modify the portfolio.

## 2. Core 3D Components (`src/components/canvas/`)

These components are exclusively rendered inside the `@react-three/fiber` `<Canvas>` context.

### `Scene.jsx`
The master container for the 3D environment.
*   **Props:** None.
*   **Functionality:** Sets up the global lighting (`<ambientLight>`, `<directionalLight>`), environment maps (`<Environment>`), and orchestrates child 3D elements.
*   **Dependencies:** `@react-three/fiber`, `@react-three/drei`.

### `HeroModel.jsx` (Example)
The primary 3D object displayed in the hero section.
*   **Props:**
    *   `scale` (number): Base scale multiplier.
    *   `position` ([x, y, z]): Initial position vector.
*   **Functionality:** Loads a GLTF/GLB model using Drei's `useGLTF`. May include floating animations via Drei's `<Float>` or custom `useFrame` logic.

### `CameraRig.jsx`
Manages camera movement based on user interaction or scroll.
*   **Functionality:** Uses `useFrame` to linearly interpolate (lerp) the camera's position or rotation towards the mouse pointer or scroll offset to create a parallax effect.

## 3. Core DOM Components (`src/components/ui/`)

These are standard React components that render HTML elements over or around the canvas.

### `Navbar.jsx`
The main site navigation.
*   **Props:** None.
*   **State:** Tracks scroll position to change styling (e.g., solid background when scrolled past hero). Manages mobile menu toggle state.

### `ProjectCard.jsx`
Displays individual project details.
*   **Props:**
    *   `project` (Object): Must contain `title` (str), `description` (str), `technologies` (Array[str]), `image` (str/URL), `githubUrl` (str), `liveUrl` (str).
    *   `index` (number): Used for staggered animation delays.
*   **Functionality:** Renders a responsive card. Uses `motion.div` to animate in when scrolled into view using the `whileInView` prop.

### `SectionWrapper.jsx`
A Higher-Order Component (HOC) or wrapper used to standardize padding and scroll animations across sections.
*   **Props:**
    *   `children` (ReactNode): The section content.
    *   `idName` (str): An ID used for anchor link scrolling.

## 4. Custom Hooks (`src/hooks/`)

### `useScrollProgress.jsx`
*   **Returns:** `number` (0 to 1).
*   **Functionality:** Tracks the global window scroll progress and returns a normalized value. Useful for tying 3D animations to the page scroll.

### `useWindowSize.jsx`
*   **Returns:** `{ width: number, height: number, isMobile: boolean }`.
*   **Functionality:** Debounced event listener that updates when the window resizes. `isMobile` is a convenient boolean flag based on a specific breakpoint (e.g., 768px).

## 5. Global Utilities (`src/utils/`)

### `motionVariants.js`
A centralized file exporting standardized `motion` animation variants to maintain visual consistency.
*   `fadeIn(direction, type, delay, duration)`: Returns a variant object for fading elements in from a specific direction (up, down, left, right).
*   `staggerContainer(staggerChildren, delayChildren)`: Returns a variant for a parent container to stagger the animation of its children.

### `constants.js`
Contains all static text and data for the portfolio.
*   `navLinks`: Array of `{id, title}` objects.
*   `projects`: Array of detailed project objects passed into `ProjectCard`.
*   `experiences`: Array of work history objects.
