import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import reactRefresh from "@vitejs/plugin-react-refresh";
import svgr from "vite-plugin-svgr";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    port: 3000,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
    coverage: {
      reporter: ["html", "json", "text"],
      provider: "istanbul",
      enabled: true,
      all: true,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/theme/theme.scss";`,
      },
    },
  },
  build: {
    outDir: "build",
  },
  plugins: [svgr(), react(), reactRefresh()],
});
