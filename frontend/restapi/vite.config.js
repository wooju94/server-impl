import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default {
  server: {
    Proxy: {
      "/api": "http://localhost:8080",
    },
  },
};
