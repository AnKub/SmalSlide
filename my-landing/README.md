🖼️ My Landing – Interactive Digital Museum Experience
My Landing is a modern, interactive web application designed to deliver a museum-style experience directly in the browser. Combining elegant visuals, real-time weather updates, and curated articles from the New York Times, this application offers users a rich multimedia journey into knowledge, culture, and design.

🚀 Features
🎨 Dynamic Theming – Easily switch between multiple visual themes with smooth transitions.

🗽 Curated News Feed – Stay informed with the latest articles from the New York Times related to art, museums, and culture.

🌦️ Live Weather Integration – Displays current weather data to enhance the atmospheric experience of the virtual museum.

📸 Gallery-Like UI – Interactive and animated image sections mimicking real museum displays.

🎯 Optimized for UX – Responsive design, animated menus, and an immersive content layout.

🛠️ Tech Stack
🌐 Frontend
React 19 – Core framework for building modern UI.

React Router DOM v7 – Handles navigation between pages.

Vite – Fast bundler for lightning-speed development and production builds.

TypeScript – Ensures type safety and better DX (developer experience).

SCSS – Used for writing structured and modular styles.

Mantine UI – Provides a powerful UI library with customizable components.

Tabler Icons – Clean and consistent icon set integrated with Mantine.

🔄 Animations & Interactivity
Embla Carousel – Smooth, touch-friendly image carousels for showcasing museum items.

Swiper – Lightweight slider for content blocks.

Custom Circle Menu – Animated floating menu that allows quick theme switching with delay-staggered item reveal.

📡 API Integrations
Axios – For making API requests.

New York Times API – Pulls cultural and museum-related news articles.

Weather API (optional) – Displays real-time weather conditions to simulate the external environment of the digital museum.

📁 Project Structure
bash
Копировать код
src/
│
├── components/         # Reusable UI components (carousel, menus, etc.)
├── pages/              # Main pages like Home, Library, News
├── styles/             # SCSS styling with animations and themes
├── utils/              # Utility functions (e.g., fetch weather/news)
└── main.tsx            # App entry point
📦 Scripts
Script	Description
npm run dev	Starts the development server via Vite
npm run build	Compiles TypeScript and builds the app
npm run lint	Runs ESLint to check for code issues
npm run preview	Previews the production build

📷 UI Highlights
Responsive sections with alternating text and image blocks

Hover animations for interactive feedback

Smooth transitions when selecting a new theme

Menu that appears from the right, revealing options in staggered sequence

Mobile-friendly layouts for seamless viewing on any device

🌈 Theme Logic
Themes are implemented using a floating circle menu that appears on click. Each item in the menu is revealed with an animation delay, and selecting a theme instantly applies the new style while automatically closing the menu.

🔐 Linting & Code Quality
ESLint with @eslint/js, react-hooks, and typescript-eslint plugins

Type-safe codebase with TypeScript

Modular and readable structure

📅 Future Enhancements
🔎 Searchable art & exhibit database

🗺️ Interactive museum map

🧠 AI-powered tour guide or chatbot (planned)

📌 Requirements
Node.js v18+

Modern browser with JavaScript enabled

✍️ Author
Created by Andriy Kulyk – a passionate frontend developer bringing creativity and interactivity to life through code.