import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "react-pro-sidebar/dist/styles.css":
        "node_modules/react-pro-sidebar/dist/styles.css",
      "@mui/material/styles": "@mui/material/esm/styles",
    },
  },
});
