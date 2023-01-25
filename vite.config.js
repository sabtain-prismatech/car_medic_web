import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components/"),
      "@config": path.resolve(__dirname, "src/config/"),
      "@helper": path.resolve(__dirname, "src/helper/"),
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@axios": path.resolve(__dirname, "src/axios/"),
      "@pages": path.resolve(__dirname, "src/pages/"),
      "@routes": path.resolve(__dirname, "src/routes/"),
      "@services": path.resolve(__dirname, "src/services/"),
      "@slice": path.resolve(__dirname, "src/slice/"),
      "@store": path.resolve(__dirname, "src/store/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
    },
  },
});
