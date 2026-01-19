import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/uzairurrahman.github.io/", // <-- Only used for GitHub Pages build
});
