import { defineConfig } from "vite-plus";

export default defineConfig({
  test: {
    environment: "edge-runtime",
    coverage: {
      include: ["convex/**/*.ts"],
      exclude: ["convex/_generated/**", "convex/schema.ts"],
    },
  },
});
