import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/mtg_card_explorer_frontend/",
  build: {
    outDir: "dist",
  },
  server: {
    port: 3000,
  },
});
