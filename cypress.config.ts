import { defineConfig } from "cypress";

export default defineConfig({
  viewportHeight: 800,
  viewportWidth: 1400,
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
