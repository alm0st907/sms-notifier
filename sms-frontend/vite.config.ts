import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

dotenv.config(); // load env vars from .env


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    REACT_APP_CLERK_PUBLISHABLE_KEY: `"${process.env.REACT_APP_CLERK_PUBLISHABLE_KEY}"`,
    BACKEND_URL: `"${process.env.BACKEND_URL}"`,
  },
  server: {
    open: true,
    origin: 'http://localhost:5173',
    cors: true
  },

})
