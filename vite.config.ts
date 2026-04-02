import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules/three") || id.includes("@react-three")) {
            return "three";
          }
          if (id.includes("node_modules/gsap")) {
            return "gsap";
          }
          if (id.includes("node_modules/react-icons")) {
            return "ui";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    target: "esnext",
  },
});
