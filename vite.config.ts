import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts', 
  },
  server: {
    port: 3000,
    proxy: {
      // forward calls starting with /api to backend
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
    
  }
  
});
