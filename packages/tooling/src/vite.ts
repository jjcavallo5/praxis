import { defineConfig } from "vite-plus";

const ignorePatterns = ["**/routeTree.gen.ts", "**/convex/_generated/**"];

export default defineConfig({
  fmt: { ignorePatterns },
  lint: {
    ignorePatterns,
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
});
