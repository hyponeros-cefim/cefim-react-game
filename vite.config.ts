import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/cefim-react-game/', // Mettre le nom du dépôt GitHub ici
  plugins: [react(), tailwindcss()],
});

// Installer path et :
// resolve: {
//   alias: {
//     '@': path.resolve(__dirname, 'src'),
//   },
