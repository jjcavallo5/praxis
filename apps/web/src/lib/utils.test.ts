import { cn } from "./utils";
import { test, expect } from "vite-plus/test";

test("cn merges classes", () => {
  const result = cn("classA", "classB");
  expect(result).toBe("classA classB");
});
