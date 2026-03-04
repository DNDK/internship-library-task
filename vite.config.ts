import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "inject-css",
      closeBundle() {
        const distDir = path.resolve(__dirname, "dist");
        const cssFile = path.join(distDir, "bundle.css");
        const jsFile = path.join(distDir, "bundle.js");

        if (!fs.existsSync(cssFile)) return;

        const css = fs.readFileSync(cssFile, "utf-8").replace(/`/g, "\\`");
        const inject = `
(function(){
  const s = document.createElement('style');
  s.textContent = \`${css}\`;
  document.head.appendChild(s);
})();
`;
        const js = fs.readFileSync(jsFile, "utf-8");
        fs.writeFileSync(jsFile, inject + js);
        fs.unlinkSync(cssFile); // удаляем .css файл
      },
    },
  ],

  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: () => "bundle",
        entryFileNames: "bundle.js",
        chunkFileNames: "bundle.js",
        assetFileNames: "bundle.[ext]",
      },
    },
  },

  server: {
    proxy: {
      "/api": {
        target: "https://openlibrary.org/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/img": {
        target: "https://covers.openlibrary.org/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/img/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
