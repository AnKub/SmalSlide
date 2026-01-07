import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Оптимізована конфігурація Vite для покращення швидкості завантаження
export default defineConfig({
  plugins: [react()],
  
  // Оптимізація build процесу
  build: {
    // Збільшення chunk size limit для великих компонентів
    chunkSizeWarningLimit: 1000,
    
    rollupOptions: {
      output: {
        // Розділення на окремі chunks для кращого кешування
        manualChunks: {
          // Основні React бібліотеки
          'react-vendor': ['react', 'react-dom'],
          
          // Mantine UI компоненти (великий розмір)
          'mantine': ['@mantine/core', '@mantine/hooks', '@mantine/notifications'],
          
          // Роутер
          'router': ['react-router-dom'],
          
          // API та утиліти
          'utils': ['axios', 'use-debounce'],
          
          // 3D та візуальні ефекти
          'graphics': ['three', 'swiper', 'embla-carousel-react', 'embla-carousel-autoplay'],
          
          // Іконки (окремий chunk для lazy loading)
          'icons': ['@tabler/icons-react']
        },
      },
    },
    
    // Налаштування для покращення швидкості
    sourcemap: false, // Відключення sourcemap у продакшені
    minify: 'esbuild', // Швидший мініфікатор
    target: 'es2015', // Підтримка сучасних браузерів
  },
  
  // Оптимізація dev режиму
  server: {
    // Кешування dependencies
    hmr: {
      overlay: false, // Відключення overlay при помилках
    },
    // Збільшення ліміту файлів для watch
    watch: {
      ignored: ['**/node_modules/**']
    }
  },
  
  // Попереднє завантаження залежностей
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@mantine/core',
      '@mantine/hooks',
      'react-router-dom',
      'axios'
    ],
    // Виключення проблемних пакетів з pre-bundling
    exclude: ['@tabler/icons-react']
  },
  
  // CSS обробка
  css: {
    // Мініфікація CSS
    devSourcemap: false,
  },
});