// vite.config.js
import path from "path";
import react from "@vitejs/plugin-react";
// import tailwindcss from "tailwindcss"; // <-- REMOVE or COMMENT OUT this import
import { defineConfig } from "vite";
// import autoprefixer from "autoprefixer"; // <-- REMOVE or COMMENT OUT this import

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // REMOVE THE ENTIRE 'css' SECTION from here:
  // css: {
  //   postcss: {
  //     plugins: [
  //       tailwindcss(),
  //       autoprefixer(),
  //     ],
  //   },
  // },
  // ...to here.

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
