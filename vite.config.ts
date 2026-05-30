import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      exclude: ['src/vite-env.d.ts', '**/*.test.*', '**/*.stories.*', 'src/playground.tsx']
    })
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'AniccaUI',
      fileName: (format) => `anicca-ui.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        assetFileNames: (asset) =>
          asset.name && asset.name.endsWith('.css') ? 'anicca-ui.css' : 'assets/[name][extname]',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime'
        }
      }
    }
  }
})
