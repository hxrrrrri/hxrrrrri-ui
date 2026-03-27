import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/hxrrrrri-ui/index.ts',
      name: 'HXRRRRRIUI',
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
      cssFileName: 'style',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'framer-motion', 'react/jsx-runtime'],
    },
    sourcemap: true,
    emptyOutDir: true,
    target: 'es2020',
  },
})
