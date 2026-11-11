import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const ici = (p: string) => fileURLToPath(new URL(p, import.meta.url));

// Banc d'essai : les composants Wix tels quels, les SDK Wix remplacés par des données de la maquette.
export default defineConfig({
  plugins: [react()],
  publicDir: ici('../../'), // la maquette (assets/, data/) servie à la même origine
  resolve: {
    alias: {
      '@wix/stores': ici('./src/mocks/stores.ts'),
      '@wix/categories': ici('./src/mocks/categories.ts'),
      '@wix/ecom': ici('./src/mocks/ecom.ts'),
    },
    dedupe: ['react', 'react-dom', 'gsap', 'lenis', 'ogl'],
  },
  server: { fs: { allow: [ici('../../')] } },
});
