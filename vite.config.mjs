import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";

export default defineConfig({
  base: "/", // root deployment
  plugins: [tsconfigPaths(), react(), tagger()],
  build: {
    outDir: "dist", // Vercel default for static deployments
    chunkSizeWarningLimit: 2000,
  },
  server: {
    port: 4028,
    host: "0.0.0.0",
    strictPort: true,
  },
});
