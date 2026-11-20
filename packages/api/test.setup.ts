/// <reference types="vite-plus/client" />
export const modules = import.meta.glob([
  "./convex/**/*.{ts,js}",
  "!./convex/**/*.test.ts",
  "!./convex/**/*.d.ts",
]);
