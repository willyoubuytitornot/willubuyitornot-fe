import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Backend CORS whitelists http://localhost:5173 only, so pin the dev server to
  // that port and fail loudly if it's taken (instead of silently using 5174).
  server: {
    port: 5173,
    strictPort: true,
  },
});
