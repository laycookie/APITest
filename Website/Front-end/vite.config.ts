import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/discordOAuth": {
        target: "http://127.0.0.1:5000",
      },
      "/apiTest": {
        target: "http://127.0.0.1:5000",
      },
    },
  },
});
