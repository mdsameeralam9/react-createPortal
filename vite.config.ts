import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    host: true,   // 0.0.0.0 inside container
    port: 5173,   // must match docker-compose
    // hmr: { clientPort: 5173 }, // uncomment if behind proxy or different external port
    // watch: { usePolling: true }, // optional alternative to CHOKIDAR_USEPOLLING
  },
});
